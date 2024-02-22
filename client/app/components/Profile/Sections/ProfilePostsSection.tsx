import * as React from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { FiArrowUpRight } from 'react-icons/fi'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { BiNews } from 'react-icons/bi'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { ProfileSectionEditPopover } from '@/components/Profile/ProfileSectionEditPopover'
import { urlBuilder } from '@/lib/utils'

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

  const selectedPosts = profilePageContext.posts?.filter((post) =>
    selectedPostIds.includes(post.id || 0)
  )

  return (
    <div className="relative w-full border-t">
      <ProfileSectionEditPopover
        sectionId={section.id || 0}
        handleSectionUpdate={handleSectionUpdate}
        popoverTabsData={[
          {
            name: 'name',
            label: 'Name',
            description: title,
            body: (
              <>
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
              </>
            )
          },
          {
            name: 'posts',
            label: 'Posts',
            description: `${selectedPostIds.length} posts`,
            body: (
              <>
                {(profilePageContext.posts?.length || 0) > 0 && (
                  <div className="max-h-96 overflow-y-auto flex flex-col gap-1 mt-4">
                    {profilePageContext.posts?.map((post) => {
                      return (
                        <div
                          key={post.id}
                          className="flex items-center justify-between px-4 py-3 border rounded"
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
                )}

                {profilePageContext.posts?.length === 0 && (
                  <div>
                    <p>
                      Nothing to select here, please create some posts from{' '}
                      <a
                        className="border-b border-dashed"
                        href={urlBuilder('/posts', 'app')}
                      >
                        dashboard
                      </a>{' '}
                      to see them here
                    </p>
                  </div>
                )}
              </>
            )
          }
        ]}
      />

      <div
        className={`${selectedPosts?.length ? '!pb-0' : ''} profile-container`}
      >
        {showTitle && <h2 className="text-2xl">{title}</h2>}

        <div className={selectedPosts?.length ? 'mt-10' : ''}>
          {selectedPosts?.map((post) => {
            return (
              <div
                onClick={() => toast('Post page is WIP 🚧')}
                className="w-full py-8 mx-auto border-t cursor-pointer"
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

          {selectedPosts?.length === 0 && (
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
