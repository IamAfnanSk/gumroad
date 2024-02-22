import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaImages, FaTrash } from 'react-icons/fa6'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { CarouselImage } from '@/types'
import { ProfileSectionEditPopover } from '@/components/Profile/ProfileSectionEditPopover'

const ProfileImageCarouselSection = ({
  section,
  children
}: ProfileSectionProps) => {
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
  const [carouselImages, setCarouselImages] = React.useState<CarouselImage[]>(
    section.carousel_images || []
  )

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSectionUpdate = async (isOpened: boolean) => {
    if (isOpened) {
      return
    }

    if (
      title === section.title &&
      showTitle === section.show_title &&
      section.carousel_images?.every(({ id }) =>
        carouselImages.some(({ id: compareId }) => compareId === id)
      ) &&
      !fileInputRef.current?.files?.length
    ) {
      return
    }

    const formData = new FormData()

    formData.append('section[title]', title)
    formData.append('section[show_title]', showTitle.toString())

    Array.from(carouselImages).forEach(({ id }) => {
      formData.append('section[existing_carousel_image_ids][]', id.toString())
    })

    Array.from(fileInputRef.current?.files || []).forEach((file) => {
      formData.append('section[carousel_images][]', file)
    })

    await updateProfileSection({
      id: section.id,
      formData
    })
  }

  React.useEffect(() => {
    if (
      !updateProfileSectionLoading &&
      updateProfileSectionData &&
      !updateProfileSectionErrors
    ) {
      const newCarouselImages =
        updateProfileSectionData.data?.carouselImages || []

      profilePageContext.setProfileSections((profileSections) => {
        return profileSections.map((profileSection) => {
          if (profileSection.id === section.id) {
            return {
              ...profileSection,
              title,
              show_title: showTitle,
              carousel_images: newCarouselImages
            }
          }

          return profileSection
        })
      })

      setCarouselImages(newCarouselImages)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    if (
      !updateProfileSectionLoading &&
      updateProfileSectionErrors &&
      !updateProfileSectionData
    ) {
      setTitle(section.title || '')
      setShowTitle(section.show_title || false)
      setCarouselImages(section.carousel_images || [])

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [
    updateProfileSectionData,
    updateProfileSectionErrors,
    updateProfileSectionLoading
  ])

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
            name: 'images',
            label: 'Images',
            description: `${carouselImages.length} images`,
            body: (
              <>
                {carouselImages.length > 0 && (
                  <div className="max-h-96 overflow-y-auto">
                    {carouselImages.map(({ url, id }) => (
                      <div key={id} className="flex items-center mb-4 gap-3">
                        <img
                          src={url}
                          alt="Image"
                          className="flex-1 object-contain h-20 border rounded-md"
                        />
                        <Button
                          className="shrink-0"
                          size={'smallIcon'}
                          onClick={() => {
                            setCarouselImages((carouselImage) => {
                              return carouselImage.filter(
                                ({ id: compareId }) => compareId !== id
                              )
                            })
                          }}
                        >
                          <FaTrash className="text-xs" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Input
                  ref={fileInputRef}
                  name="images"
                  type={'file'}
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={() => handleSectionUpdate(false)}
                />
              </>
            )
          }
        ]}
      />

      <div className="profile-container">
        {showTitle && <h2 className="mb-5 text-2xl">{title}</h2>}

        <div className="flex items-center justify-center gap-3 px-3 md:border-none md:px-0">
          {carouselImages.length ? (
            <Carousel className={'w-full'}>
              <CarouselContent>
                {carouselImages.map(({ url }, index) => (
                  <CarouselItem className={'w-full pl-8'} key={index}>
                    <div className={'aspect-w-16 aspect-h-9'}>
                      <img
                        src={url}
                        alt="Image"
                        className="object-contain w-full h-full rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="transform-none left-0" />
              <CarouselNext className="transform-none right-0" />
            </Carousel>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FaImages className="text-4xl" />
              <p className="mt-2 text-lg">No images to show</p>
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  )
}

export { ProfileImageCarouselSection }
