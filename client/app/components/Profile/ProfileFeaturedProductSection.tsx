import * as React from 'react'
import {
  FaBoxArchive,
  FaChevronLeft,
  FaChevronRight,
  FaPencil
} from 'react-icons/fa6'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProductCard } from '@/components/ProductCard'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { ProfileDeleteDialog } from '@/components/Profile/ProfileDeleteDialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const ProfileFeaturedProductsSection = ({
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

  const [popOverTab, setPopoverTab] = React.useState<
    'name' | 'products' | 'home'
  >('home')

  const [showTitle, setShowTitle] = React.useState<boolean>(
    section.show_title || false
  )
  const [title, setTitle] = React.useState<string>(section.title || '')

  const [featuredProductId, setFeaturedProductId] = React.useState<
    number | null
  >(section.featured_product_id || null)

  const handleSectionUpdate = async (isOpened: boolean) => {
    if (isOpened) {
      return
    }

    if (
      title === section.title &&
      showTitle === section.show_title &&
      featuredProductId === section.featured_product_id
    ) {
      return
    }

    await updateProfileSection({
      id: section.id,
      title,
      show_title: showTitle,
      ...(featuredProductId ? { featured_product_id: featuredProductId } : {})
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
              ...(featuredProductId
                ? {
                    featured_product_id: featuredProductId
                  }
                : {}),
              ...(updateProfileSectionData.data?.featuredProduct
                ? {
                    featured_product:
                      updateProfileSectionData.data?.featuredProduct
                  }
                : {})
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
      setFeaturedProductId(section.featured_product_id || null)
    }
  }, [
    updateProfileSectionData,
    updateProfileSectionErrors,
    updateProfileSectionLoading
  ])

  return (
    <div className="border-t border-border w-full relative">
      {profilePageContext.creatorIsOwner && (
        <div className="absolute z-10 left-4 top-2">
          <Popover onOpenChange={handleSectionUpdate}>
            <PopoverTrigger>
              <Button className="p-3" asChild size={'icon'}>
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
                    onClick={() => setPopoverTab('products')}
                    className="flex cursor-pointer px-4 py-3 items-center justify-between border-t border-border"
                  >
                    <p className="font-medium">Featured product</p>

                    <div className="flex items-center gap-2">
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

              {popOverTab === 'products' && (
                <div className="px-4 py-3">
                  <div className="grid grid-cols-10 pt-3 pb-5 items-center">
                    <FaChevronLeft
                      onClick={() => setPopoverTab('home')}
                      className="col-span-1 cursor-pointer"
                    />
                    <h1 className="font-medium text-center w-full col-span-8">
                      Featured product
                    </h1>
                    <span className="col-span-1 block"></span>
                  </div>

                  <RadioGroup
                    defaultValue={`${featuredProductId}`}
                    onValueChange={(value) =>
                      setFeaturedProductId(parseInt(value))
                    }
                    className={'mt-4'}
                  >
                    {profilePageContext.products?.map((product) => {
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between border border-border py-3 px-4 rounded"
                        >
                          <div className="flex w-full items-center justify-between">
                            <Label htmlFor={`product-id-${product.id}`}>
                              {product.name}
                            </Label>
                            <RadioGroupItem
                              value={`${product.id}`}
                              id={`product-id-${product.id}`}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </RadioGroup>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="profile-container">
        {showTitle && <h2 className="text-2xl mb-4">{title}</h2>}

        <div className="flex justify-center items-center">
          <div className="w-72">
            {section.featured_product ? (
              <ProductCard
                key={section.featured_product.id}
                product={section.featured_product}
              />
            ) : (
              <div className="flex col-span-3 flex-col items-center justify-center">
                <FaBoxArchive className="text-4xl" />
                <p className="text-lg mt-2">No featured product to show</p>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs mt-4">
          * To save time I just reused the product card for featured product too
        </p>
      </div>

      {children}
    </div>
  )
}

export { ProfileFeaturedProductsSection }
