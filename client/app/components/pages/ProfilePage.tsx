import * as React from 'react'

import { ProfilePageLayout } from '@/components/layouts/ProfilePageLayout'

import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProfileWysiwygSection } from '@/components/Profile/Sections/ProfileWysiwygSection'
import { ProfilePostsSection } from '@/components/Profile/Sections/ProfilePostsSection'
import { Creator, Post, Product, ProfileSection } from '@/types'
import { ProfileProductsSection } from '@/components/Profile/Sections/ProfileProductsSection'
import { ProfileSubscribeSection } from '@/components/Profile/Sections/ProfileSubscribeSection'
import { ProfileEmbedSection } from '@/components/Profile/Sections/ProfileEmbedSection'
import { useProfileSectionAdd } from '@/hooks/useProfileSectionAdd'
import { useProfileSectionDelete } from '@/hooks/useProfileSectionDelete'
import { ProfileSectionAdd } from '@/components/Profile/ProfileSectionAdd'
import { ProfileSectionPositionMover } from '@/components/Profile/ProfileSectionPositionMover'
import { ProfileImageCarouselSection } from '@/components/Profile/Sections/ProfileImageCarouselSection'
import { ProfileFeaturedProductsSection } from '@/components/Profile/Sections/ProfileFeaturedProductSection'
import { ProfileCustomHtmlSection } from '@/components/Profile/Sections/ProfileCustomHtmlSection'

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

      setProfileSections((profileSections) => {
        return profileSections
          .filter((profileSection) => profileSection.id !== sectionId)
          .map((profileSection) => {
            return {
              ...profileSection,
              position: sectionIdPositionMap[profileSection.id || 0]
            }
          })
      })
    }
  }, [deleteProfileData, deleteProfileErrors, deleteProfileLoading])

  React.useEffect(() => {
    if (!addProfileLoading && !addProfileErrors && addProfileData) {
      const sectionIdPositionMap = addProfileData.data?.idPositionMapping || {}
      const newSection = addProfileData.data?.profileSection || {}

      setProfileSections((profileSections) => {
        const updatedSections = profileSections.map<Partial<ProfileSection>>(
          (profileSection) => {
            return {
              ...profileSection,
              position: sectionIdPositionMap[profileSection.id || 0]
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
        ...props,
        profileSections,
        setProfileSections,
        handleAddProfileSection,
        handleDeleteProfileSection
      }}
    >
      <ProfilePageLayout>
        {sortedProfileSections.map((profileSection) => {
          const CommonSectionChildren = (
            <>
              <ProfileSectionPositionMover
                sectionId={profileSection.id || 0}
                position={profileSection.position || 0}
              />

              <ProfileSectionAdd
                position={(profileSection.position || 0) + 1}
              />
            </>
          )

          if (profileSection.section_type === 'wysiwyg') {
            return (
              <ProfileWysiwygSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileWysiwygSection>
            )
          }

          if (profileSection.section_type === 'post_list') {
            return (
              <ProfilePostsSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfilePostsSection>
            )
          }

          if (profileSection.section_type === 'product_list') {
            return (
              <ProfileProductsSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileProductsSection>
            )
          }

          if (profileSection.section_type === 'embed') {
            return (
              <ProfileEmbedSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileEmbedSection>
            )
          }

          if (profileSection.section_type === 'subscribe') {
            return (
              <ProfileSubscribeSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileSubscribeSection>
            )
          }

          if (profileSection.section_type === 'image_carousel') {
            return (
              <ProfileImageCarouselSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileImageCarouselSection>
            )
          }

          if (profileSection.section_type === 'featured_product') {
            return (
              <ProfileFeaturedProductsSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileFeaturedProductsSection>
            )
          }

          if (profileSection.section_type === 'custom_html') {
            return (
              <ProfileCustomHtmlSection
                key={profileSection.id}
                section={profileSection}
              >
                {CommonSectionChildren}
              </ProfileCustomHtmlSection>
            )
          }

          return null
        })}
      </ProfilePageLayout>
    </ProfilePageContext.Provider>
  )
}

export { ProfilePage }
