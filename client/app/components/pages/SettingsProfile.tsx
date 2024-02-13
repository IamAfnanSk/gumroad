import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as React from 'react'
import { Creator } from '@/types'
import { toast } from 'sonner'
import { urlBuilder } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { FaCircleXmark } from 'react-icons/fa6'
import { SettingsPageLayout } from '@/components/layouts/SettingsPageLayout'

const CreatorUpdateSchema = z.object({
  bio: z.string().max(500).optional(),
  twitter_handle: z
    .string()
    .regex(/^[a-zA-Z0-9_]{1,15}$/)
    .optional(),
  name: z.string().optional(),
  username: z.string().min(3)
})

type Props = {
  creator: Creator
}

const SettingsProfile = (props: Props) => {
  console.log(props)

  const avatarRef = React.useRef<HTMLInputElement>(null)

  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(
    props.creator.avatar || null
  )

  const [profileUrl, setProfileUrl] = React.useState<string>(
    urlBuilder(location, '', props.creator.username, true)
  )

  const [csrfToken, setCsrfToken] = React.useState<string>('')

  React.useEffect(() => {
    setCsrfToken(
      (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
        .content
    )
  }, [])

  const form = useForm<z.infer<typeof CreatorUpdateSchema>>({
    resolver: zodResolver(CreatorUpdateSchema),
    defaultValues: {
      bio: props.creator.bio || '',
      twitter_handle: props.creator.twitter_handle || '',
      name: props.creator.name || '',
      username: props.creator.username || ''
    }
  })

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'username') {
        setProfileUrl(urlBuilder(location, '', value['username'], true))
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const onSubmit = async (data: z.infer<typeof CreatorUpdateSchema>) => {
    try {
      const formData = new FormData()

      formData.append('creator[bio]', data.bio)
      formData.append('creator[twitter_handle]', data.twitter_handle)
      formData.append('creator[name]', data.name)
      formData.append('creator[username]', data.username)

      if (avatarRef.current?.files?.[0]) {
        formData.append('creator[avatar]', avatarRef.current.files[0])
      }

      const response = await axios.put(
        `/creators/${props.creator.id}.json`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Csrf-Token': csrfToken
          }
        }
      )

      if (response.status === 200) {
        toast.success(response.data.message)
        if (avatarRef.current?.files?.[0]) {
          setAvatarUrl(URL.createObjectURL(avatarRef.current.files[0]))
        }
      } else {
        console.log(response.data)
        console.error('Error updating creator:', response.data)
      }
    } catch (error) {
      toast.error('Error updating creator')
      console.error('Error updating creator:', error)
    }
  }

  return (
    <SettingsPageLayout>
      <div className="px-12  py-16">
        <h1 className="text-2xl mb-8">Profile</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    View your profile at:{' '}
                    <a
                      className="underline"
                      href={profileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profileUrl}
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter_handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter handle</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="iamafnansk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {avatarUrl ? (
              <div className="relative group w-max">
                <img className="" src={avatarUrl} alt="Creator avatar" />
                <FaCircleXmark
                  onClick={() => setAvatarUrl(null)}
                  className="absolute cursor-pointer transform hidden group-hover:block -translate-x-1/2 -translate-y-1/2 top-0 left-0 text-center rounded-full bg-white text-destructive"
                />
              </div>
            ) : (
              <FormField
                name="avatar"
                render={() => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <Input ref={avatarRef} id="avatar" type="file" />
                  </FormItem>
                )}
              />
            )}

            <Button variant={'primary'} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </SettingsPageLayout>
  )
}

export { SettingsProfile }
