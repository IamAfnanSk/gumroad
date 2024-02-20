import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Creator, NavLink } from '@/types'
import { urlBuilder } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { FaCircleXmark } from 'react-icons/fa6'
import { DashboardPageLayout } from '@/components/layouts/DashboardPageLayout'
import { useCreatorUpdate } from '@/hooks/useCreatorUpdate'
import { MdOutlineSystemUpdateAlt } from 'react-icons/md'

const navLinks: NavLink[] = [
  { label: 'Settings', path: '' },
  { label: 'Profile', path: '/settings/profile' },
  { label: 'Team', path: '' },
  { label: 'Payments', path: '' }
]

const CreatorUpdateSchema = z.object({
  bio: z.optional(z.string().max(500, { message: 'Bio is too long' })),
  twitter_handle: z.string().refine(
    (value) => {
      // Check if the value is empty or a valid Twitter username without the "@" symbol
      return value === '' || /^[a-zA-Z0-9_]+$/.test(value)
    },
    {
      message: 'Invalid Twitter username'
    }
  ),
  name: z.optional(z.string().max(50, { message: 'Name is too long' })),
  username: z.string().min(3, { message: 'Username is too short' })
})

type Props = {
  creator: Creator
}

const SettingsProfile = ({ creator }: Props) => {
  const {
    updateCreator,
    data: updateCreatorData,
    errors: updateCreatorErrors,
    loading: updateCreatorLoading
  } = useCreatorUpdate()

  const avatarRef = React.useRef<HTMLInputElement>(null)

  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(
    creator.avatar_url || null
  )

  const [profileUrl, setProfileUrl] = React.useState<string>(
    urlBuilder('', creator.username)
  )

  const form = useForm<z.infer<typeof CreatorUpdateSchema>>({
    resolver: zodResolver(CreatorUpdateSchema),
    defaultValues: {
      bio: creator.bio || '',
      twitter_handle: creator.twitter_handle || '',
      name: creator.name || '',
      username: creator.username || ''
    }
  })

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'username') {
        setProfileUrl(urlBuilder('', value['username']))
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const handleCreatorUpdate = async (
    data: z.infer<typeof CreatorUpdateSchema>
  ) => {
    if (
      !form.formState.isDirty ||
      !Object.keys(form.formState.touchedFields).length
    )
      return

    await updateCreator({
      ...data,
      creatorId: creator.id,
      avatar: avatarRef.current?.files?.[0]
    })
  }

  React.useEffect(() => {
    if (!updateCreatorLoading && !updateCreatorErrors && updateCreatorData) {
      if (avatarRef.current?.files?.[0]) {
        setAvatarUrl(URL.createObjectURL(avatarRef.current.files[0]))
      }

      form.reset({ ...form.getValues() })
    }
  }, [updateCreatorData, updateCreatorErrors, updateCreatorLoading])

  return (
    <DashboardPageLayout
      navLinks={navLinks}
      headerCta={{
        label: 'Update settings',
        icon: MdOutlineSystemUpdateAlt,
        onClick: () => form.handleSubmit(handleCreatorUpdate)()
      }}
      title="Settings"
    >
      <div className="dashboard-container">
        <h1 className="text-2xl mb-8">Profile</h1>

        <Form {...form}>
          <form className="w-full md:w-2/3 space-y-6">
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
              <div className="relative h-36 group w-max">
                <img
                  className="w-full h-full object-contain"
                  src={avatarUrl}
                  alt="Creator avatar"
                />
                <FaCircleXmark
                  onClick={() => setAvatarUrl(null)}
                  className="absolute block cursor-pointer transform md:hidden group-hover:block -translate-x-1/2 -translate-y-1/2 top-0 left-full text-center rounded-full bg-white text-destructive"
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
          </form>
        </Form>
      </div>
    </DashboardPageLayout>
  )
}

export { SettingsProfile }
