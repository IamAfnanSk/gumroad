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
import { Checkbox } from '@/components/ui/checkbox'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProductCard } from '@/components/ProductCard'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { ProfileDeleteDialog } from '@/components/Profile/ProfileDeleteDialog'

const ProfileProductsSection = ({ section, children }: ProfileSectionProps) => {
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

  const [title, setTitle] = React.useState<string>(section.title || '')
  const [showTitle, setShowTitle] = React.useState<boolean>(
    section.show_title || false
  )
  const [showFilters, setShowFilters] = React.useState<boolean>(
    section.show_filters || false
  )
  const [addNewProductsByDefault, setAddNewProductsByDefault] =
    React.useState<boolean>(section.add_new_products_by_default || false)

  const [selectedProductIds, setSelectedProductIds] = React.useState<number[]>(
    section.products?.map((product) => product.id || 0) || []
  )

  const handleSectionUpdate = async (isOpened: boolean) => {
    if (isOpened) {
      return
    }

    if (
      title === section.title &&
      showTitle === section.show_title &&
      showFilters === section.show_filters &&
      addNewProductsByDefault === section.add_new_products_by_default &&
      selectedProductIds.length === section.products?.length &&
      selectedProductIds.every((id) =>
        section.products?.map((product) => product.id).includes(id)
      )
    ) {
      return
    }

    await updateProfileSection({
      id: section.id,
      title,
      show_title: showTitle,
      show_filters: showFilters,
      add_new_products_by_default: addNewProductsByDefault,
      product_ids: selectedProductIds
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
              show_filters: showFilters,
              add_new_products_by_default: addNewProductsByDefault,
              products: profilePageContext.products?.filter((product) =>
                selectedProductIds.includes(product.id || 0)
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
      setShowFilters(section.show_filters || false)
      setAddNewProductsByDefault(section.add_new_products_by_default || false)
      setSelectedProductIds(
        section.products?.map((product) => product.id || 0) || []
      )
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
                    <p className="font-medium">Products</p>

                    <div className="flex items-center gap-2">
                      <p className="text-sm">
                        {selectedProductIds.length} products
                      </p>
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
                      Products
                    </h1>
                    <span className="col-span-1 block"></span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Switch
                      checked={showFilters}
                      onCheckedChange={() => setShowFilters(!showFilters)}
                      id="show_filters"
                    />
                    <Label htmlFor="show_filters">Show product filter</Label>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <Switch
                      checked={addNewProductsByDefault}
                      onCheckedChange={() =>
                        setAddNewProductsByDefault(!addNewProductsByDefault)
                      }
                      id="add_new_products_by_default"
                    />
                    <Label htmlFor="add_new_products_by_default">
                      Add new products by default
                    </Label>
                  </div>

                  <div className="flex flex-col gap-1 mt-4">
                    {profilePageContext.products?.map((product) => {
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between border border-border py-3 px-4 rounded"
                        >
                          <Label htmlFor={`product-${product.id}`}>
                            {product.name}
                          </Label>

                          <Checkbox
                            id={`product-${product.id}`}
                            checked={selectedProductIds.includes(
                              product.id || 0
                            )}
                            onCheckedChange={() => {
                              if (
                                selectedProductIds.includes(product.id || 0)
                              ) {
                                setSelectedProductIds(
                                  selectedProductIds.filter(
                                    (id) => id !== product.id
                                  )
                                )
                              } else {
                                setSelectedProductIds([
                                  ...(selectedProductIds || []),
                                  product.id || 0
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

      <div className="profile-container">
        {showTitle && <h2 className="text-2xl mb-4">{title}</h2>}

        <div className="flex flex-col">
          {showFilters && (
            <div className="flex w-full px-4 rounded py-3 mt-4 border border-border gap-4 mb-5">
              placeholder for filters
            </div>
          )}

          <div className="grid gap-4 flex-1 grid-cols-1 md:grid-cols-3">
            {section.products?.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })}

            {section.products?.length === 0 && (
              <div className="flex col-span-3 flex-col items-center justify-center">
                <FaBoxArchive className="text-4xl" />
                <p className="text-lg mt-2">No products to show</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

export { ProfileProductsSection }
