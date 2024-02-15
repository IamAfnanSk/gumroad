import * as React from 'react'

import { ProfilePageLayout } from '@/components/layouts/ProfilePageLayout'

import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProfileWysiwygSection } from '@/components/ProfileWysiwygSection'
import { ProfilePostsSection } from '@/components/ProfilePostsSection'
import { Creator, Post, Product, Section } from '@/types'
import { ProfileProductsSection } from '@/components/ProfileProductsSection'
import axios from 'axios'
import { toast } from 'sonner'
import { useCsrfToken } from '@/hooks/useCsrfToken'
import { ProfileSubscribeSection } from '@/components/ProfileSubscribeSection'
import { ProfileEmbedSection } from '@/components/ProfileEmbedSection'
import { ProfileImageCarouselSection } from '@/components/ProfileImageCarouselSection'

type Props = {
  sections: Partial<Section[]>
  creator?: Partial<Creator>
  posts?: Partial<Post[]>
  products?: Partial<Product[]>
  creatorIsOwner?: boolean
}

const ProfilePage = (props: Props) => {
  const [sections, setSections] = React.useState<Partial<Section[]>>(
    props.sections
  )

  const csrfToken = useCsrfToken()

  const sortedSections = sections.sort((a, b) => a.position - b.position)

  const handleSectionDelete = async (sectionId: number) => {
    try {
      const response = await axios.delete(
        `/profiles/${sectionId}/delete_section.json`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Csrf-Token': csrfToken
          }
        }
      )

      if (response.status === 200) {
        toast.success(response.data.message)

        setSections((sections) => {
          return sections
            .filter((section) => section.id !== sectionId)
            .map((section) => {
              return {
                ...section,
                position: response.data.data[section.id]
              }
            })
        })
      } else {
        toast.error('Error deleting section')
        console.error('Error deleting section:', response.data)
      }
    } catch (error) {
      toast.error('Error deleting section')
      console.error('Error deleting section:', error)
    }
  }

  const handleAddSection = async (sectionType: string, position: number) => {
    try {
      const response = await axios.post(
        `/profiles/add_section.json`,
        {
          section: {
            section_type: sectionType,
            position
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

        setSections((sections) => {
          const updatedSections = sections.map((section) => {
            return {
              ...section,
              position: response.data.data.id_position_mapping[section.id]
            }
          })

          updatedSections.push(response.data.data.section as Section)

          console.log(updatedSections)

          return updatedSections
        })
      } else {
        toast.error('Error adding section')
        console.error('Error adding section:', response.data)
      }
    } catch (error) {
      toast.error('Error adding section')
      console.error('Error adding section:', error)
    }
  }

  return (
    <ProfilePageContext.Provider
      value={{
        ...props,
        setSections,
        sections,
        handleSectionDelete,
        handleAddSection
      }}
    >
      <ProfilePageLayout>
        {sortedSections.map((section) => {
          if (section.section_type === 'wysiwyg') {
            return <ProfileWysiwygSection key={section.id} section={section} />
          }

          if (section.section_type === 'post_list') {
            return <ProfilePostsSection section={section} key={section.id} />
          }

          if (section.section_type === 'product_list') {
            return <ProfileProductsSection key={section.id} section={section} />
          }

          // if (section.section_type === 'featured_product') {
          //   return (
          //     <ProfileFeaturedProductSection
          //       key={section.id}
          //       section={section}
          //     />
          //   )
          // }
          //
          if (section.section_type === 'image_carousel') {
            return (
              <ProfileImageCarouselSection key={section.id} section={section} />
            )
          }

          if (section.section_type === 'embed') {
            return <ProfileEmbedSection key={section.id} section={section} />
          }

          if (section.section_type === 'subscribe') {
            return (
              <ProfileSubscribeSection key={section.id} section={section} />
            )
          }

          return null
        })}
      </ProfilePageLayout>
    </ProfilePageContext.Provider>
  )
}

export { ProfilePage }
