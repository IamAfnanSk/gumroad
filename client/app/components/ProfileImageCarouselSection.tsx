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
  FaImages,
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

type Props = {
  section: Section
}

const ProfileImageCarouselSection = ({ section }: Props) => {
  const [popOverTab, setPopoverTab] = React.useState<
    'name' | 'home' | 'images'
  >('home')

  const csrfToken = useCsrfToken()

  const profilePageContext = React.useContext(ProfilePageContext)

  const [title, setTitle] = React.useState<string>(section.title)
  const [showTitle, setShowTitle] = React.useState<boolean>(section.show_title)
  const [carouselImageUrls, setCarouselImageUrls] = React.useState<string[]>(
    section.carousel_images
  )

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSectionUpdate = async (isOpened: boolean) => {
    if (isOpened) {
      return
    }

    if (
      title === section.title &&
      showTitle === section.show_title &&
      carouselImageUrls.join(',') === section.carousel_images.join(',') &&
      fileInputRef.current?.files === null
    ) {
      return
    }

    try {
      const formData = new FormData()

      Array.from(fileInputRef.current?.files || []).forEach((file) => {
        formData.append('section[carousel_images][]', file)
      })

      formData.append('section[show_title]', showTitle ? 'true' : 'false')

      formData.append('section[title]', title || '')

      formData.append(
        'section[existing_carousel_image_urls]',
        carouselImageUrls.join(',')
      )

      const response = await axios.put(
        `/profiles/${section.id}/update_section.json`,
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

        profilePageContext.setSections((sections) => {
          return sections.map((s) => {
            if (s.id === section.id) {
              return {
                ...s,
                title,
                show_title: showTitle,
                carousel_images: response.data.data
              }
            }

            return s
          })
        })
      } else {
        toast.error('Error updating content')
        console.error('Error updating image carousel:', response.data)
      }
    } catch (error) {
      toast.error('Error updating content')
      console.error('Error updating image carousel:', error)
    }
  }

  return (
    <div key={section.id} className="relative w-full border-t border-border">
      {profilePageContext.creatorIsOwner && (
        <div className="absolute z-10 left-4 top-2">
          <Popover onOpenChange={handleSectionUpdate}>
            <PopoverTrigger>
              <Button size={'icon'}>
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
                    onClick={() => setPopoverTab('images')}
                    className="flex items-center justify-between px-4 py-3 border-t cursor-pointer border-border"
                  >
                    <p className="font-medium">Images</p>

                    <div className="flex items-center gap-2">
                      <FaChevronRight className="text-xs" />
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger className="flex items-center justify-between px-4 py-3 border-t cursor-pointer text-destructive border-border">
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

              {popOverTab === 'images' && (
                <div className="px-4 py-3">
                  <div className="grid items-center grid-cols-10 pt-3 pb-5">
                    <FaChevronLeft
                      onClick={() => setPopoverTab('home')}
                      className="col-span-1 cursor-pointer"
                    />
                    <h1 className="w-full col-span-8 font-medium text-center">
                      Images
                    </h1>
                    <span className="block col-span-1"></span>
                  </div>

                  {carouselImageUrls.map((imageUrl, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        src={imageUrl}
                        alt="Image"
                        className="flex-1 object-contain h-20 border rounded-md border-border"
                      />
                      <Button
                        className="shrink-0"
                        size={'smallIcon'}
                        onClick={() => {
                          setCarouselImageUrls((urls) => {
                            return urls.filter((url) => url !== imageUrl)
                          })
                        }}
                      >
                        <FaTrash className="text-xs" />
                      </Button>
                    </div>
                  ))}

                  <Input
                    ref={fileInputRef}
                    name="images"
                    type={'file'}
                    multiple
                    className="mt-5"
                  />
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="profile-container">
        {showTitle && <h2 className="mb-5 text-2xl">{title}</h2>}

        <div className="flex items-center justify-center gap-3 px-3 md:border-none md:px-0">
          {carouselImageUrls.length ? (
            <Carousel>
              <CarouselContent>
                {carouselImageUrls.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={imageUrl}
                      alt="Image"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="transform-none" />
              <CarouselNext className="transform-none" />
            </Carousel>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FaImages className="text-4xl" />
              <p className="mt-2 text-lg">No images to show</p>
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

export { ProfileImageCarouselSection }
