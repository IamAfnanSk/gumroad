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
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { gumroadTheme } from '@/components/Profile/gumroadTheme'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useCsrfToken } from '@/hooks/useCsrfToken'
import { toast } from 'sonner'

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
  creator: Partial<Creator>
  creatorHasPostsAndProducts: boolean
}

const SettingsProfilePage = ({
  creator,
  creatorHasPostsAndProducts
}: Props) => {
  const {
    updateCreator,
    data: updateCreatorData,
    errors: updateCreatorErrors,
    loading: updateCreatorLoading
  } = useCreatorUpdate()

  const avatarRef = React.useRef<HTMLInputElement>(null)

  const csrfToken = useCsrfToken()

  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(
    creator.avatar_url || null
  )

  const [profileUrl, setProfileUrl] = React.useState<string>(
    urlBuilder('', creator.username)
  )

  const [theme, setTheme] = React.useState<Record<string, string>>({})
  const [isThemeDirty, setIsThemeDirty] = React.useState<boolean>(false)

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

  React.useEffect(() => {
    try {
      const themeData = creator.theme ? JSON.parse(creator.theme) : null
      setTheme(themeData || gumroadTheme)
      if (!themeData) setIsThemeDirty(true)
    } catch (error) {
      setTheme(gumroadTheme)
      setIsThemeDirty(true)
    }
  }, [])

  React.useEffect(() => {
    const themeDivs = document.querySelectorAll('.theme-preview')
    if (themeDivs.length) {
      Object.entries(theme).forEach(([key, value]) => {
        themeDivs.forEach((themeDiv) => {
          ;(themeDiv as HTMLElement).style.setProperty(key, value)
        })
      })
    }
  }, [theme])

  const handleCreatorUpdate = async (
    data: z.infer<typeof CreatorUpdateSchema>
  ) => {
    if (
      !(
        form.formState.isDirty ||
        Object.keys(form.formState.touchedFields).length
      ) &&
      !avatarRef.current?.files?.length &&
      !isThemeDirty
    )
      return

    await updateCreator({
      ...data,
      creatorId: creator.id || 0,
      avatar: avatarRef.current?.files?.[0],
      theme: JSON.stringify(theme)
    })
  }

  React.useEffect(() => {
    if (!updateCreatorLoading && !updateCreatorErrors && updateCreatorData) {
      if (avatarRef.current?.files?.[0]) {
        setAvatarUrl(URL.createObjectURL(avatarRef.current.files[0]))
      }

      form.reset({ ...form.getValues() })

      setIsThemeDirty(false)
    }
  }, [updateCreatorData, updateCreatorErrors, updateCreatorLoading])

  const handleLoadSampleProductsAndPosts = async () => {
    const errorMessage = `Error loading dummy data`
    const responseErrors: string[] = []

    try {
      const response = await axios.post(
        `/creators/add_dummy_posts_and_products.json`,
        {},
        {
          headers: {
            'X-Csrf-Token': csrfToken
          }
        }
      )

      const responseData = response.data

      if (response.status === 200 && responseData) {
        toast.success(responseData.message)
      } else {
        responseErrors.push(...(responseData.errors || [errorMessage]))
      }
    } catch (error) {
      // @ts-expect-error error is unknown
      if (error.response?.data?.errors?.length) {
        // @ts-expect-error error is unknown
        responseErrors.push(...error.response.data.errors)
      } else {
        responseErrors.push(errorMessage)
      }
    } finally {
      if (responseErrors.length) {
        toast.error(responseErrors.join(', '))
      }
    }
  }

  return (
    <DashboardPageLayout
      navLinks={navLinks}
      headerCta={{
        label: 'Update settings',
        icon: MdOutlineSystemUpdateAlt,
        onClick: () => form.handleSubmit(handleCreatorUpdate)()
      }}
      title="Settings"
      creator={creator}
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
                    <Input
                      ref={avatarRef}
                      accept="image/png, image/jpeg, image/jpg"
                      id="avatar"
                      type="file"
                    />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>

        {!creatorHasPostsAndProducts && (
          <div className="mt-10">
            <Button
              onClick={handleLoadSampleProductsAndPosts}
              className=""
              variant={'primary'}
            >
              * Load sample products and posts
            </Button>

            <p className="mt-4">
              Click this button to load some dummy products and posts to your
              account
            </p>
          </div>
        )}
      </div>

      <div className="dashboard-container pt-0">
        <h1 className="text-2xl mb-8">Theme</h1>

        <div className="w-full flex-col md:flex-row flex items-start justify-between">
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(theme).map((key, index) => {
                return (
                  <div key={index}>
                    <Label
                      htmlFor={key}
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      {key.substring(2)} color
                    </Label>
                    <Input
                      type="color"
                      value={theme[key]}
                      className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                      id={key}
                      onChange={(e) => {
                        setTheme({ ...theme, [key]: e.target.value })
                        setIsThemeDirty(true)
                      }}
                    />
                  </div>
                )
              })}
            </div>

            <Button
              onClick={() => {
                setTheme(gumroadTheme)
                setIsThemeDirty(true)
              }}
              className="mt-10"
              variant={'destructive'}
            >
              Reset
            </Button>
          </div>

          <div className="inline-flex w-full md:w-1/3 theme-preview flex-col p-4 bg-background text-foreground border gap-5">
            <p className="font-bold">Theme preview</p>

            <Input placeholder="input" type="text" />

            <Textarea placeholder="text area" />

            <Button>Button</Button>

            <Button variant={'primary'}>Primary Button</Button>

            <Button variant={'accent'}>Accent Button</Button>

            <Button variant={'destructive'}>Destructive Button</Button>

            <div className="bg-muted text-muted-foreground border rounded-lg p-2">
              Muted
            </div>

            <Popover open={true}>
              <PopoverTrigger>
                <Button asChild>
                  <span>Popover toggle</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent avoidCollisions={false} className="theme-preview">
                <div>Popover content</div>
              </PopoverContent>
            </Popover>

            <div className="border rounded-lg p-2 mt-14">
              Div with border and radius
            </div>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  )
}

export { SettingsProfilePage }
