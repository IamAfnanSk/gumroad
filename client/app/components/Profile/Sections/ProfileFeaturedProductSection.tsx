import * as React from 'react'
import { FaBoxArchive, FaStar } from 'react-icons/fa6'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ProfileSectionEditPopover } from '@/components/Profile/ProfileSectionEditPopover'
import { urlBuilder } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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

  const featuredProduct = profilePageContext.creatorIsOwner
    ? profilePageContext.products?.find(
        (product) => product.id === featuredProductId
      )
    : section.featured_product

  return (
    <div className="border-t w-full relative">
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
            name: 'products',
            label: 'Featured product',
            body: (
              <>
                {(profilePageContext.products?.length || 0) > 0 && (
                  <div className="max-h-96 overflow-y-auto">
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
                            className="flex items-center justify-between border py-3 px-4 rounded"
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

                {profilePageContext.products?.length === 0 && (
                  <div>
                    <p>
                      Nothing to select here, please create some products from{' '}
                      <a
                        className="border-b border-dashed"
                        href={urlBuilder('/settings/profile', 'app')}
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

      <div className="profile-container">
        {showTitle && <h2 className="text-2xl mb-4">{title}</h2>}

        <div className="flex justify-center items-center">
          <div className="w-full">
            {featuredProduct ? (
              <div className="w-full border">
                <div className="aspect-w-16 aspect-h-7">
                  <img
                    src={featuredProduct.cover_image_url}
                    className="w-full h-full object-cover"
                    alt="Product"
                  />
                </div>
                <div className="grid md:grid-cols-3 border-t">
                  <div className="md:col-span-2">
                    <div className="border-b">
                      <h3 className="text-3xl py-4 px-5 mt-2">
                        {featuredProduct.name}
                      </h3>
                    </div>
                    <div className="flex items-center border-b">
                      <div className="py-4 px-5">${featuredProduct.price}</div>
                      <div className="border-l py-4 px-5 flex items-center gap-2">
                        <img
                          src={
                            featuredProduct.creator?.avatar_url ||
                            'https://gravatar.com/avatar'
                          }
                          alt={featuredProduct.creator?.name}
                          className="w-6 h-6 rounded-full"
                        />

                        <a
                          className="border-b"
                          href={urlBuilder(
                            '',
                            featuredProduct.creator?.username
                          )}
                        >
                          {featuredProduct.creator?.name}
                        </a>
                      </div>
                      <div className="border-l py-4 px-5">
                        <div className="flex-1 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                          <p>2 ratings</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-4 px-5">
                      <p className="text-base">{featuredProduct.description}</p>
                    </div>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l md:col-span-1">
                    <div className="py-4 px-5">
                      <Button variant="primary" className="w-full">
                        Add to cart
                      </Button>

                      <div className="border rounded mt-4 p-2">
                        <p>
                          lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                    <div className="py-4 px-5 border-t">Ratings</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex col-span-3 flex-col items-center justify-center">
                <FaBoxArchive className="text-4xl" />
                <p className="text-lg mt-2">No featured product to show</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

export { ProfileFeaturedProductsSection }
