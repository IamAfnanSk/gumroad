import * as React from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowUp } from 'react-icons/fa'
import { FaArrowDown } from 'react-icons/fa6'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { useProfileSectionPositionUpdate } from '@/hooks/useProfileSectionPositionUpdate'

type Props = {
  sectionId: number
  position: number
}

const ProfileSectionPositionMover = ({ sectionId, position }: Props) => {
  const profilePageContext = React.useContext(ProfilePageContext)

  const {
    data: updateProfileSectionPositionData,
    errors: updateProfileSectionPositionErrors,
    loading: updateProfileSectionPositionLoading,
    updateProfileSectionPosition
  } = useProfileSectionPositionUpdate()

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  const handleMoveSection = async (direction: 'up' | 'down') => {
    await updateProfileSectionPosition({
      sectionId,
      direction
    })
  }

  React.useEffect(() => {
    if (
      !updateProfileSectionPositionLoading &&
      !updateProfileSectionPositionErrors &&
      updateProfileSectionPositionData
    ) {
      profilePageContext.setProfileSections((profileSections) => {
        return profileSections.map((profileSection) => {
          const idPositionMapping =
            updateProfileSectionPositionData.data?.idPositionMapping || {}

          return {
            ...profileSection,
            position: idPositionMapping[profileSection.id || 0]
          }
        })
      })
    }
  }, [
    updateProfileSectionPositionData,
    updateProfileSectionPositionErrors,
    updateProfileSectionPositionLoading
  ])

  if (!profilePageContext.creatorIsOwner) {
    return null
  }

  return (
    <div className="absolute flex flex-col right-0 gap-1 top-2 transform -translate-x-1/2 z-10">
      {position !== 1 && (
        <Button onClick={() => handleMoveSection('up')} size={'smallIcon'}>
          <FaArrowUp className="text-xs" />
        </Button>
      )}
      {position !== profilePageContext.profileSections.length && (
        <Button onClick={() => handleMoveSection('down')} size={'smallIcon'}>
          <FaArrowDown className="text-xs" />
        </Button>
      )}
    </div>
  )
}

export { ProfileSectionPositionMover }
