import * as React from 'react'
import { Button } from '@/components/ui/button'
import { FaArrowUp } from 'react-icons/fa'
import { FaArrowDown } from 'react-icons/fa6'
import axios from 'axios'
import { toast } from 'sonner'
import { useCsrfToken } from '@/hooks/useCsrfToken'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'

type Props = {
  sectionId: number
  position: number
}

const ProfileSectionPositionMover = ({ sectionId, position }: Props) => {
  const csrfToken = useCsrfToken()
  const profilePageContext = React.useContext(ProfilePageContext)

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  const handleMoveSection = async (direction: 'up' | 'down') => {
    const errorMessage = `Error updating position`
    const responseErrors: string[] = []

    try {
      const response = await axios.put(
        `/profiles/${sectionId}/update_section_positions.json`,
        {
          section: {
            where_to_move: direction
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
        profilePageContext.setProfileSections((profileSections) => {
          return profileSections.map((profileSection) => {
            const idPositionMapping = response.data.data.idPositionMapping

            return {
              ...profileSection,
              position: idPositionMapping[profileSection.id || 0]
            }
          })
        })
        toast.success(response.data.message)
      } else {
        responseErrors.push(...(response.data.errors || [errorMessage]))
      }
    } catch (error) {
      // @ts-expect-error error is unknown
      if (error.response?.data?.errors?.length) {
        // @ts-expect-error error is unknown
        responseErrors.push(...error.response.data.errors)
      } else {
        responseErrors.push(errorMessage)
      }
    } finally {
      if (responseErrors.length) {
        toast.error(responseErrors.join(', '))
      }
    }
  }

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
