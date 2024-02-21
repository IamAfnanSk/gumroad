import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { ProfileSectionEditPopover } from '@/components/Profile/ProfileSectionEditPopover'

const ProfileSubscribeSection = ({
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

  const handleSectionUpdate = async (isOpened: boolean) => {
    if (isOpened) {
      return
    }

    if (title === section.title && showTitle === section.show_title) {
      return
    }

    await updateProfileSection({
      id: section.id,
      title,
      show_title: showTitle
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
              show_title: showTitle
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
    }
  }, [
    updateProfileSectionData,
    updateProfileSectionErrors,
    updateProfileSectionLoading
  ])

  const handleSubscribe = () => {
    toast.success('Fake subscribed!')
  }

  return (
    <div className="border-t relative border-border w-full">
      <ProfileSectionEditPopover
        sectionId={section.id || 0}
        handleSectionUpdate={handleSectionUpdate}
        popoverTabsData={[
          {
            name: 'description',
            label: 'Description',
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
                  <Label htmlFor="show_title" className="cursor-pointer">
                    Display above section
                  </Label>
                </div>
              </>
            )
          }
        ]}
      />

      <div className="profile-container">
        {showTitle && <h2 className="text-2xl mb-5">{title}</h2>}

        <div className="flex items-center gap-3 md:border-none px-3 md:px-0">
          <Input
            className="w-full"
            type="text"
            placeholder="Your email address"
          />

          <Button onClick={handleSubscribe}>Subscribe</Button>
        </div>

        {children}
      </div>
    </div>
  )
}

export { ProfileSubscribeSection }
