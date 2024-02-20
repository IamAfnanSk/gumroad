import * as React from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { FiArrowUpRight } from 'react-icons/fi'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FaChevronLeft, FaChevronRight, FaPencil } from 'react-icons/fa6'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { BiNews } from 'react-icons/bi'
import { ProfileSectionProps } from '@/components/Profile/types'
import { ProfileDeleteDialog } from '@/components/Profile/ProfileDeleteDialog'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'

const ProfilePostsSection = ({ section, children }: ProfileSectionProps) => {
  const profilePageContext = React.useContext(ProfilePageContext)

  const {
    updateProfileSection,
    data: updateProfileSectionData,
    errors: updateProfileSectionErrors,
    loading: updateProfileSectionLoading
  } = useProfileSectionUpdate()

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  const [popOverTab, setPopoverTab] = React.useState<'name' | 'posts' | 'home'>(
    'home'
  )

  const [title, setTitle] = React.useState<string>(section.title || '')
  const [showTitle, setShowTitle] = React.useState<boolean>(
    section.show_title || false
  )

  const [selectedPostIds, setSelectedPostIds] = React.useState<number[]>(
    section.posts?.map((post) => post.id || 0) || []
  )

  const handleSectionUpdate = async (isOpened: boolean) => {
    if (isOpened) {
      return
    }

    if (
      title === section.title &&
      showTitle === section.show_title &&
      selectedPostIds.length === section.posts?.length &&
      selectedPostIds.every((id) =>
        section.posts?.map((post) => post.id).includes(id)
      )
    ) {
      return
    }

    await updateProfileSection({
      id: section.id,
      title,
      show_title: showTitle,
      post_ids: selectedPostIds
    })
  }

  React.useEffect(() => {
    if (
      !updateProfileSectionLoading &&
      !updateProfileSectionErrors &&
      updateProfileSectionData
    ) {
      profilePageContext.setProfileSections((profileSections) => {
        return profileSections.map((oldSection) => {
          if (oldSection.id === section.id) {
            return {
              ...oldSection,
              title,
              show_title: showTitle,
              posts: profilePageContext.posts?.filter((post) =>
                selectedPostIds.includes(post.id || 0)
              )
            }
          }

          return oldSection
        })
      })
    }

    if (
      !updateProfileSectionLoading &&
      updateProfileSectionErrors &&
      !updateProfileSectionData
    ) {
      setTitle(section.title || '')
      setShowTitle(section.show_title || false)
      setSelectedPostIds(section.posts?.map((post) => post.id || 0) || [])
    }
  }, [
    updateProfileSectionData,
    updateProfileSectionErrors,
    updateProfileSectionLoading
  ])

  const getFormattedPostDate = (date: string) => {
    return format(new Date(date), 'MMMM dd, yyyy')
  }

  return (
    <div className="relative w-full border-t border-border">
      {profilePageContext.creatorIsOwner && (
        <div className="absolute z-10 left-4 top-2">
          <Popover onOpenChange={handleSectionUpdate}>
            <PopoverTrigger>
              <Button className="p-3" asChild size={'icon'}>
                <FaPencil />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-72">
              {popOverTab === 'home' && (
                <div className="flex flex-col">
                  <div
                    onClick={() => setPopoverTab('name')}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  >
                    <p className="font-medium">Name</p>

                    <div className="flex items-center gap-2">
                      <p className="text-sm">{title}</p>
                      <FaChevronRight className="text-xs" />
                    </div>
                  </div>
                  <div
                    onClick={() => setPopoverTab('posts')}
                    className="flex items-center justify-between px-4 py-3 border-t cursor-pointer border-border"
                  >
                    <p className="font-medium">Posts</p>

                    <div className="flex items-center gap-2">
                      <p className="text-sm">{selectedPostIds.length} posts</p>
                      <FaChevronRight className="text-xs" />
                    </div>
                  </div>

                  <ProfileDeleteDialog
                    sectionId={section.id || 0}
                    alertDialogTriggerClassName={'border-t border-border'}
                  />
                </div>
              )}

              {popOverTab === 'name' && (
                <div className="px-4 py-3">
                  <div className="grid items-center grid-cols-10 pt-3 pb-5">
                    <FaChevronLeft
                      onClick={() => setPopoverTab('home')}
                      className="col-span-1 cursor-pointer"
                    />
                    <h1 className="w-full col-span-8 font-medium text-center">
                      Name
                    </h1>
                    <span className="block col-span-1"></span>
                  </div>

                  <Input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                  />

                  <div className="flex items-center gap-4 mt-4">
                    <Switch
                      checked={showTitle}
                      onCheckedChange={() => setShowTitle(!showTitle)}
                      id="show_title"
                    />
                    <Label htmlFor="show_title">Display above section</Label>
                  </div>
                </div>
              )}

              {popOverTab === 'posts' && (
                <div className="px-4 py-3">
                  <div className="grid items-center grid-cols-10 pt-3 pb-5">
                    <FaChevronLeft
                      onClick={() => setPopoverTab('home')}
                      className="col-span-1 cursor-pointer"
                    />
                    <h1 className="w-full col-span-8 font-medium text-center">
                      Posts
                    </h1>
                    <span className="block col-span-1"></span>
                  </div>

                  <div className="flex flex-col gap-1 mt-4">
                    {profilePageContext.posts?.map((post) => {
                      return (
                        <div
                          key={post.id}
                          className="flex items-center justify-between px-4 py-3 border rounded border-border"
                        >
                          <Label htmlFor={`post-${post.id}`}>
                            {post.title}
                          </Label>

                          <Checkbox
                            id={`post-${post.id}`}
                            checked={selectedPostIds.includes(post.id || 0)}
                            onCheckedChange={() => {
                              if (selectedPostIds.includes(post.id || 0)) {
                                setSelectedPostIds(
                                  selectedPostIds.filter((id) => id !== post.id)
                                )
                              } else {
                                setSelectedPostIds([
                                  ...(selectedPostIds || []),
                                  post.id || 0
                                ])
                              }
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div
        className={`${section.posts?.length ? '!pb-0' : ''} profile-container`}
      >
        {showTitle && <h2 className="text-2xl">{title}</h2>}

        <div className={section.posts?.length ? 'mt-10' : ''}>
          {section.posts?.map((post) => {
            return (
              <div
                onClick={() => toast('Post page is WIP 🚧')}
                className="w-full py-8 mx-auto border-t cursor-pointer border-border"
                key={post.id}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-medium">{post.title}</h3>
                    <p className="mt-2">
                      {getFormattedPostDate(post.created_at || '')}
                    </p>
                  </div>

                  <div>
                    <FiArrowUpRight className="text-5xl" />
                  </div>
                </div>
              </div>
            )
          })}

          {section.posts?.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <BiNews className="text-4xl" />
              <p className="mt-2 text-lg">No posts to show</p>
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}

export { ProfilePostsSection }