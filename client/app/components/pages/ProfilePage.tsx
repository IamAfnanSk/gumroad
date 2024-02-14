import * as React from 'react'

import { ProfilePageLayout } from '@/components/layouts/ProfilePageLayout'

import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProfileWysiwygSection } from '@/components/ProfileWysiwygSection'
import { ProfilePostsSection } from '@/components/ProfilePostsSection'
import { Creator, Post, Product, Section } from '@/types'

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

  const sortedSections = sections.sort((a, b) => a.position - b.position)

  return (
    <ProfilePageContext.Provider value={{ ...props, setSections, sections }}>
      <ProfilePageLayout>
        {sortedSections.map((section) => {
          if (section.section_type === 'wysiwyg') {
            return <ProfileWysiwygSection key={section.id} section={section} />
          }

          if (section.section_type === 'post_list') {
            return <ProfilePostsSection section={section} key={section.id} />
          }

          if (section.section_type === 'product_list') {
            return (
              <div key={section.id} className="border-t border-border w-full">
                <div className="profile-container">
                  {section.show_title && (
                    <h2 className="text-2xl">{section.title}</h2>
                  )}
                </div>
              </div>
            )
          }

          return null
        })}
      </ProfilePageLayout>
    </ProfilePageContext.Provider>
  )
}

export { ProfilePage }
