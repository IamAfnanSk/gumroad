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

  const handleMoveSection = async (direction: 'up' | 'down') => {
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
        profilePageContext.setSections((sections) => {
          return sections.map((section) => {
            return { ...section, position: response.data.data[section.id] }
          })
        })
        toast.success(response.data.message)
      } else {
        toast.error('Error updating position')
        console.error('Error updating position:', response.data)
      }
    } catch (error) {
      toast.error('Error updating position')
      console.error('Error updating position:', error)
    }
  }

  if (!profilePageContext.creatorIsOwner) {
    return null
  }

  return (
    <div className="absolute flex flex-col right-0 gap-1 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {position !== 1 && (
        <Button onClick={() => handleMoveSection('up')} size={'smallIcon'}>
          <FaArrowUp className="text-xs" />
        </Button>
      )}
      {position !== profilePageContext.sections.length && (
        <Button onClick={() => handleMoveSection('down')} size={'smallIcon'}>
          <FaArrowDown className="text-xs" />
        </Button>
      )}
    </div>
  )
}

export { ProfileSectionPositionMover }
