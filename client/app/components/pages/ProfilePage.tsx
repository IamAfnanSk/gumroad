import * as React from 'react'

import { ProfilePageLayout } from '@/components/layouts/ProfilePageLayout'

import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProfileWysiwygSection } from '@/components/Profile/ProfileWysiwygSection'
import { ProfilePostsSection } from '@/components/Profile/ProfilePostsSection'
import { Creator, Post, Product, ProfileSection } from '@/types'
import { ProfileProductsSection } from '@/components/Profile/ProfileProductsSection'
import { ProfileSubscribeSection } from '@/components/Profile/ProfileSubscribeSection'
import { ProfileEmbedSection } from '@/components/Profile/ProfileEmbedSection'
import { useProfileSectionAdd } from '@/hooks/useProfileSectionAdd'
import { useProfileSectionDelete } from '@/hooks/useProfileSectionDelete'
import { ProfileSectionAdd } from '@/components/Profile/ProfileSectionAdd'
import { ProfileSectionPositionMover } from '@/components/Profile/ProfileSectionPositionMover'
import { ProfileImageCarouselSection } from '@/components/Profile/ProfileImageCarouselSection'
import { ProfileFeaturedProductsSection } from '@/components/Profile/ProfileFeaturedProductSection'

type Props = {
  profileSections?: Partial<ProfileSection>[]
  creator?: Partial<Creator>
  posts?: Partial<Post>[]
  products?: Partial<Product>[]
  creatorIsOwner?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const ProfilePage = (props: Props) => {
  const {
    addProfileSection,
    errors: addProfileErrors,
    data: addProfileData,
    loading: addProfileLoading
  } = useProfileSectionAdd()

  const {
    deleteProfileSection,
    errors: deleteProfileErrors,
    data: deleteProfileData,
    loading: deleteProfileLoading
  } = useProfileSectionDelete()

  const [profileSections, setProfileSections] = React.useState<
    Partial<ProfileSection>[]
  >(props.profileSections || [])

  const handleDeleteProfileSection = async (sectionId: number) => {
    await deleteProfileSection({ sectionId })
  }

  const handleAddProfileSection = async (
    sectionType: string,
    position: number
  ) => {
    await addProfileSection({ sectionType, position })
  }

  React.useEffect(() => {
    if (!deleteProfileLoading && !deleteProfileErrors && deleteProfileData) {
      const sectionIdPositionMap =
        deleteProfileData.data?.idPositionMapping || {}

      const sectionId = deleteProfileData.data?.deletedSectionId || 0

      setProfileSections((sections) => {
        return sections
          .filter((section) => section.id !== sectionId)
          .map((section) => {
            return {
              ...section,
              position: sectionIdPositionMap[section.id || 0]
            }
          })
      })
    }
  }, [deleteProfileData, deleteProfileErrors, deleteProfileLoading])

  React.useEffect(() => {
    if (!addProfileLoading && !addProfileErrors && addProfileData) {
      const sectionIdPositionMap = addProfileData.data?.idPositionMapping || {}
      const newSection = addProfileData.data?.profileSection || {}

      setProfileSections((sections) => {
        const updatedSections = sections.map<Partial<ProfileSection>>(
          (section) => {
            return {
              ...section,
              position: sectionIdPositionMap[section.id || 0]
            }
          }
        )

        updatedSections.push(newSection)

        return updatedSections
      })
    }
  }, [addProfileData, addProfileErrors, addProfileLoading])

  const sortedProfileSections = profileSections.sort(
    (a, b) => (a.position || 0) - (b.position || 0)
  )

  return (
    <ProfilePageContext.Provider
      value={{
        profileSections,
        setProfileSections,
        handleAddProfileSection,
        handleDeleteProfileSection,
        ...props
      }}
    >
      <ProfilePageLayout>
        {sortedProfileSections.map((profileSection) => {
          let Section = null

          const CommonSectionChildren = (
            <>
              <ProfileSectionPositionMover
                sectionId={profileSection.id || 0}
                position={profileSection.position || 0}
              />

              <ProfileSectionAdd position={profileSection.position || 0} />
            </>
          )

          if (profileSection.section_type === 'wysiwyg') {
            Section = (
              <ProfileWysiwygSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileWysiwygSection>
            )
          }

          if (profileSection.section_type === 'post_list') {
            Section = (
              <ProfilePostsSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfilePostsSection>
            )
          }

          if (profileSection.section_type === 'product_list') {
            Section = (
              <ProfileProductsSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileProductsSection>
            )
          }

          if (profileSection.section_type === 'embed') {
            Section = (
              <ProfileEmbedSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileEmbedSection>
            )
          }

          if (profileSection.section_type === 'subscribe') {
            Section = (
              <ProfileSubscribeSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileSubscribeSection>
            )
          }

          if (profileSection.section_type === 'image_carousel') {
            Section = (
              <ProfileImageCarouselSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileImageCarouselSection>
            )
          }

          if (profileSection.section_type === 'featured_product') {
            Section = (
              <ProfileFeaturedProductsSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileFeaturedProductsSection>
            )
          }

          return Section
        })}

        {profileSections.length > 0 && (
          <ProfileSectionAdd position={profileSections.length} />
        )}
      </ProfilePageLayout>
    </ProfilePageContext.Provider>
  )
}

export { ProfilePage }
