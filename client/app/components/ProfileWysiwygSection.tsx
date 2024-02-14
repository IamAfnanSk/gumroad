import * as React from 'react'
import { Tiptap } from '@/components/Tiptap/Tiptap'
import { Section } from '@/types'
import { Editor } from '@tiptap/core'
import { useContext } from 'react'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import axios from 'axios'
import { useCsrfToken } from '@/hooks/useCsrfToken'
import { useDebouncedCallback } from 'use-debounce'
import { toast } from 'sonner'
import { ProfileSectionPositionMover } from '@/components/ProfileSectionPositionMover'

type Props = {
  section: Section
}

const ProfileWysiwygSection = ({ section }: Props) => {
  const profilePageContext = useContext(ProfilePageContext)

  const [content, setContent] = React.useState<string>('')

  React.useEffect(() => {
    try {
      setContent(JSON.parse(section.json_content))
    } catch (e) {
      console.error('Error parsing section.json_content:', e)
      setContent('')
    }
  }, [section.json_content])

  const csrfToken = useCsrfToken()

  const debouncedHandleOnUpdate = useDebouncedCallback(
    async (editor: Editor) => {
      try {
        const response = await axios.put(
          `/profiles/${section.id}/update_section.json`,
          {
            section: {
              json_content: JSON.stringify(editor.getJSON())
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
        } else {
          toast.error('Error updating content')
          console.error('Error updating wysiwyg:', response.data)
        }
      } catch (error) {
        toast.error('Error updating content')
        console.error('Error updating wysiwyg:', error)
      }
    },
    2000
  )

  if (!content) {
    return null
  }

  return (
    <div className="border-t border-border w-full relative">
      <div className="profile-container">
        <Tiptap
          content={content}
          onUpdate={debouncedHandleOnUpdate}
          editable={profilePageContext.creatorIsOwner}
        />
      </div>

      <ProfileSectionPositionMover
        sectionId={section.id}
        position={section.position}
      />
    </div>
  )
}

export { ProfileWysiwygSection }
