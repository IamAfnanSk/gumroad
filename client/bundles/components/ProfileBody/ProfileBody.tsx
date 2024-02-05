import * as React from 'react'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Link from '../../ui/Link'
import { Creator, PageSection, Post, Product } from '../../../types/types'
import Tiptap from '../TipTap/TipTap'

type Props = {
  creator: Creator
  posts: Post[]
  products: Product[]
  pageSections: PageSection[]
}

const ProfileHeader = (props: Props) => {
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const [sections, setSections] = React.useState<PageSection[]>(
    props.pageSections
  )

  React.useEffect(() => {
    const hideAllModals = (event) => {
      if (!event.target.closest('.close-button')) {
        setShowModal(false)
      }
    }

    document.body.addEventListener('click', hideAllModals)

    return () => {
      document.body.removeEventListener('click', hideAllModals)
    }
  }, [])

  return (
    <>
      {sections.map((section) => {
        const content = JSON.parse(section.text_json)
        const productIds = JSON.parse(section.shown_products_json)

        const products = props.products.filter((product) =>
          productIds?.includes(product.id)
        )

        return (
          <div key={section.id} className="border-b border-white">
            <div className="px-16 py-6 mx-auto max-w-7xl">
              {section.section_type === 'text' && <Tiptap content={content} />}

              {/* TODO: move to product component and use it here */}
              {section.section_type === 'product' && (
                <>
                  <h1 className="text-xl">{section.header}</h1>

                  <div className="grid grid-cols-3 gap-4">
                    {products.map((product) => {
                      return (
                        <div key={product.id} className="">
                          <div className="px-6 py-8 mt-5 border">
                            <div className="aspect-w-16 aspect-h-9">
                              <img
                                className="object-cover"
                                src={product.cover_url}
                                alt={product.name}
                              />
                            </div>
                            <p className="mt-3">{product.name}</p>
                            <p className="mt-3">
                              {product.currency} {product.price}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })}

      <div className="relative flex items-center px-16 py-6 mx-auto max-w-7xl">
        <div className="absolute top-0 mx-auto transform -translate-x-1/2 -translate-y-1/2 close-button left-1/2 bg-zinc-900">
          <Button onClick={() => setShowModal(true)}>
            {showModal ? 'x' : '+'}
          </Button>
        </div>

        {showModal && (
          <div className="absolute flex gap-2 px-4 py-3 transform -translate-x-1/2 -translate-y-1/2 border border-white rounded-md top-[140%] left-1/2 bg-zinc-900">
            <Button>Text</Button>
            <Button>Product</Button>
            <Button>Featured Product</Button>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileHeader
