import * as React from 'react'
import { Tiptap } from '@/components/Tiptap/Tiptap'
import { Editor } from '@tiptap/core'
import { useContext } from 'react'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { useDebouncedCallback } from 'use-debounce'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FaPencil } from 'react-icons/fa6'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { ProfileDeleteDialog } from '@/components/Profile/ProfileDeleteDialog'

const ProfileWysiwygSection = ({ section, children }: ProfileSectionProps) => {
  const profilePageContext = useContext(ProfilePageContext)

  const { updateProfileSection } = useProfileSectionUpdate()

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  const [content, setContent] = React.useState<string>('')

  React.useEffect(() => {
    try {
      setContent(JSON.parse(section.json_content || '{}'))
    } catch (error) {
      setContent('')
    }
  }, [section.json_content])

  const debouncedHandleOnUpdate = useDebouncedCallback(
    async (editor: Editor) => {
      await updateProfileSection({
        id: section.id,
        json_content: JSON.stringify(editor.getJSON())
      })
    },
    2000
  )

  if (!content) {
    return null
  }

  return (
    <div className="relative w-full border-t border-border">
      {profilePageContext.creatorIsOwner && (
        <div className="absolute z-10 left-4 top-2">
          <Popover>
            <PopoverTrigger>
              <Button className="p-3" asChild size={'icon'}>
                <FaPencil />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-72">
              <div className="flex flex-col">
                <ProfileDeleteDialog sectionId={section.id || 0} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="profile-container">
        <Tiptap
          content={content}
          onUpdate={debouncedHandleOnUpdate}
          editable={profilePageContext.creatorIsOwner}
        />
      </div>

      {children}
    </div>
  )
}

export { ProfileWysiwygSection }
