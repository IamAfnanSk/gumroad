import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Section } from '@/types'
import { toast } from 'sonner'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  FaChevronLeft,
  FaChevronRight,
  FaLink,
  FaPencil,
  FaTrash
} from 'react-icons/fa6'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useCsrfToken } from '@/hooks/useCsrfToken'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import axios from 'axios'
import { ProfileSectionPositionMover } from '@/components/ProfileSectionPositionMover'
import { ProfileNewSection } from '@/components/ProfileNewSection'

type Props = {
  section: Section
}

const ProfileEmbedSection = ({ section }: Props) => {
  const [popOverTab, setPopoverTab] = React.useState<'name' | 'home' | 'embed'>(
    'home'
  )

  const csrfToken = useCsrfToken()

  const profilePageContext = React.useContext(ProfilePageContext)

  const [title, setTitle] = React.useState<string>(section.title)
  const [showTitle, setShowTitle] = React.useState<boolean>(section.show_title)
  const [embedUrl, setEmbedUrl] = React.useState<string>(section.embed_url)
  const [embedHeight, setEmbedHeight] = React.useState<string>(
    section.embed_height
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

    try {
      const response = await axios.put(
        `/profiles/${section.id}/update_section.json`,
        {
          section: {
            title,
            show_title: showTitle,
            embed_url: embedUrl,
            embed_height: embedHeight
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Csrf-Token': csrfToken
          }
        }
      )

      if (response.status === 200) {
        toast.success(response.data.message)

        profilePageContext.setSections((sections) => {
          return sections.map((s) => {
            if (s.id === section.id) {
              return {
                ...s,
                title,
                show_title: showTitle,
                embed_url: embedUrl,
                embed_height: embedHeight
              }
            }

            return s
          })
        })
      } else {
        toast.error('Error updating content')
        console.error('Error updating embed:', response.data)
      }
    } catch (error) {
      toast.error('Error updating content')
      console.error('Error updating embed:', error)
    }
  }

  return (
    <div key={section.id} className="border-t relative border-border w-full">
      {profilePageContext.creatorIsOwner && (
        <div className="absolute z-10 left-4 top-2">
          <Popover onOpenChange={handleSectionUpdate}>
            <PopoverTrigger>
              <Button size={'icon'}>
                <FaPencil />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0">
              {popOverTab === 'home' && (
                <div className="flex flex-col">
                  <div
                    onClick={() => setPopoverTab('name')}
                    className="flex cursor-pointer px-4 py-3 items-center justify-between"
                  >
                    <p className="font-medium">Name</p>

                    <div className="flex items-center gap-2">
                      <p className="text-sm">{title}</p>
                      <FaChevronRight className="text-xs" />
                    </div>
                  </div>

                  <div
                    onClick={() => setPopoverTab('embed')}
                    className="flex cursor-pointer px-4 py-3 items-center justify-between border-t border-border"
                  >
                    <p className="font-medium">Embed</p>

                    <div className="flex items-center gap-2">
                      <FaChevronRight className="text-xs" />
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger className="flex cursor-pointer px-4 text-destructive py-3 items-center justify-between border-t border-border">
                      <p className="font-medium">Delete</p>

                      <div className="flex items-center gap-2">
                        <FaTrash className="text-xs" />
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            profilePageContext.handleSectionDelete(section.id)
                          }
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}

              {popOverTab === 'name' && (
                <div className="px-4 py-3">
                  <div className="grid grid-cols-10 pt-3 pb-5 items-center">
                    <FaChevronLeft
                      onClick={() => setPopoverTab('home')}
                      className="col-span-1 cursor-pointer"
                    />
                    <h1 className="font-medium text-center w-full col-span-8">
                      Name
                    </h1>
                    <span className="col-span-1 block"></span>
                  </div>

                  <Input
                    name="title"
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                    type={'text'}
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
                  <div className="grid grid-cols-10 pt-3 pb-5 items-center">
                    <FaChevronLeft
                      onClick={() => setPopoverTab('home')}
                      className="col-span-1 cursor-pointer"
                    />
                    <h1 className="font-medium text-center w-full col-span-8">
                      Embed
                    </h1>
                    <span className="col-span-1 block"></span>
                  </div>

                  <div>
                    <Label htmlFor="embedHeight">Embed url</Label>
                    <p className="text-xs mt-1">
                      Any valid embed url, e.g. youtube, vimeo, etc
                    </p>
                    <Input
                      name="embedUrl"
                      value={embedUrl || ''}
                      onChange={(e) => setEmbedUrl(e.target.value)}
                      type={'text'}
                      className="mt-1"
                    />
                  </div>

                  <div className="mt-5">
                    <Label htmlFor="embedHeight">Embed height</Label>
                    <p className="text-xs mt-1">
                      Any valid css height string, defaults to 500px
                    </p>

                    <Input
                      name="embedHeight"
                      value={embedHeight || ''}
                      onChange={(e) => setEmbedHeight(e.target.value)}
                      type={'text'}
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
        {showTitle && <h2 className="text-2xl mb-5">{title}</h2>}

        <div className="flex items-center justify-center gap-3 md:border-none px-3 md:px-0">
          {embedUrl && (
            <iframe
              src={embedUrl}
              style={{
                width: '100%',
                border: 'none',
                overflow: 'hidden',
                height: embedHeight || '500px'
              }}
              title="Example"
            />
          )}

          {!embedUrl && (
            <div className="flex flex-col items-center justify-center">
              <FaLink className="text-4xl" />
              <p className="text-lg mt-2">No embed url to show</p>
            </div>
          )}
        </div>

        <ProfileSectionPositionMover
          sectionId={section.id}
          position={section.position}
        />

        <ProfileNewSection position={section.position} />
      </div>
    </div>
  )
}

export { ProfileEmbedSection }
