import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  FaChevronLeft,
  FaChevronRight,
  FaLink,
  FaPencil
} from 'react-icons/fa6'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { ProfileDeleteDialog } from '@/components/Profile/ProfileDeleteDialog'

const DEFAULT_EMBED_HEIGHT = '400px'

const ProfileEmbedSection = ({ section, children }: ProfileSectionProps) => {
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

  const [popOverTab, setPopoverTab] = React.useState<'name' | 'home' | 'embed'>(
    'home'
  )

  const [title, setTitle] = React.useState<string>(section.title || '')
  const [showTitle, setShowTitle] = React.useState<boolean>(
    section.show_title || false
  )
  const [embedUrl, setEmbedUrl] = React.useState<string>(
    section.embed_url || ''
  )
  const [embedHeight, setEmbedHeight] = React.useState<string>(
    section.embed_height || DEFAULT_EMBED_HEIGHT
  )

  const handleSectionUpdate = async (isOpened: boolean) => {
    if (isOpened) {
      return
    }

    if (
      title === section.title &&
      showTitle === section.show_title &&
      embedUrl === section.embed_url &&
      embedHeight === section.embed_height
    ) {
      return
    }

    await updateProfileSection({
      id: section.id,
      title,
      show_title: showTitle,
      embed_url: embedUrl,
      embed_height: embedHeight
    })
  }

  React.useEffect(() => {
    if (
      !updateProfileSectionLoading &&
      !updateProfileSectionErrors &&
      updateProfileSectionData
    ) {
      profilePageContext.setProfileSections((sections) => {
        return sections.map((oldSection) => {
          if (oldSection.id === section.id) {
            return {
              ...oldSection,
              title,
              show_title: showTitle,
              embed_url: embedUrl,
              embed_height: embedHeight
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
      setEmbedUrl(section.embed_url || '')
      setEmbedHeight(section.embed_height || DEFAULT_EMBED_HEIGHT)
    }
  }, [
    updateProfileSectionData,
    updateProfileSectionErrors,
    updateProfileSectionLoading
  ])

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
                    onClick={() => setPopoverTab('embed')}
                    className="flex items-center justify-between px-4 py-3 border-t cursor-pointer border-border"
                  >
                    <p className="font-medium">Embed</p>

                    <div className="flex items-center gap-2">
                      <FaChevronRight className="text-xs" />
                    </div>
                  </div>

                  <ProfileDeleteDialog
                    alertDialogTriggerClassName={'border-t border-border'}
                    sectionId={section.id || 0}
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

              {popOverTab === 'embed' && (
                <div className="px-4 py-3">
                  <div className="grid items-center grid-cols-10 pt-3 pb-5">
                    <FaChevronLeft
                      onClick={() => setPopoverTab('home')}
                      className="col-span-1 cursor-pointer"
                    />
                    <h1 className="w-full col-span-8 font-medium text-center">
                      Embed settings
                    </h1>
                    <span className="block col-span-1"></span>
                  </div>

                  <div>
                    <Label htmlFor="embedHeight">Embed url</Label>
                    <p className="mt-1 text-xs">
                      Any valid embed url, e.g. youtube, vimeo, etc
                    </p>
                    <Input
                      name="embedUrl"
                      value={embedUrl}
                      onChange={(e) => setEmbedUrl(e.target.value)}
                      type="text"
                      className="mt-1"
                    />
                  </div>

                  <div className="mt-5">
                    <Label htmlFor="embedHeight">Embed height</Label>
                    <p className="mt-1 text-xs">
                      Any valid css height string, eg 500px, 100%, etc
                    </p>

                    <Input
                      name="embedHeight"
                      value={embedHeight}
                      onChange={(e) => setEmbedHeight(e.target.value)}
                      type="text"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="profile-container">
        {showTitle && <h2 className="mb-5 text-2xl">{title}</h2>}

        <div className="flex items-center justify-center gap-3 px-3 md:border-none md:px-0">
          {embedUrl && (
            <iframe
              src={embedUrl}
              style={{
                width: '100%',
                border: 'none',
                overflow: 'hidden',
                height: embedHeight
              }}
              title="Example"
            />
          )}

          {!embedUrl && (
            <div className="flex flex-col items-center justify-center">
              <FaLink className="text-4xl" />
              <p className="mt-2 text-lg">No embed url to show</p>
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  )
}

export { ProfileEmbedSection }
