import * as React from 'react'
import { Tiptap } from '@/components/Tiptap/Tiptap'
import { Editor } from '@tiptap/core'
import { useContext } from 'react'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { useDebouncedCallback } from 'use-debounce'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { ProfileSectionEditPopover } from '@/components/Profile/ProfileSectionEditPopover'

const ProfileWysiwygSection = ({ section, children }: ProfileSectionProps) => {
  const profilePageContext = useContext(ProfilePageContext)

  const { updateProfileSection, loading: updateProfileSectionLoading } =
    useProfileSectionUpdate()

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
        sectionId: section.id || 0,
        json_content: JSON.stringify(editor.getJSON())
      })
    },
    2000
  )

  if (!content) {
    return null
  }

  return (
    <div className="relative w-full border-t">
      <ProfileSectionEditPopover
        disabled={updateProfileSectionLoading}
        sectionId={section.id || 0}
      />

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
