import * as React from 'react'
import { useContext } from 'react'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { useDebouncedCallback } from 'use-debounce'
import { ProfileSectionProps } from '@/components/Profile/types'
import { useProfileSectionUpdate } from '@/hooks/useProfileSectionUpdate'
import { CodeMirrorEditor } from '@/components/CodeMirror/CodeMirrorEditor'
import * as DOMPurify from 'dompurify'
import ReactHtmlParser from 'react-html-parser'
import { ViewUpdate } from '@codemirror/view'
import { ProfileSectionEditPopover } from '@/components/Profile/ProfileSectionEditPopover'

const ProfileCustomHtmlSection = ({
  section,
  children
}: ProfileSectionProps) => {
  const profilePageContext = useContext(ProfilePageContext)

  const { updateProfileSection, loading: updateProfileSectionLoading } =
    useProfileSectionUpdate()

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  const [rawHtml, setRawHtml] = React.useState<string>(section.raw_html || '')

  const debouncedHandleOnUpdate = useDebouncedCallback(
    async (update: ViewUpdate) => {
      await updateProfileSection({
        sectionId: section.id || 0,
        raw_html: update.state.doc.toString()
      })
    },
    2000
  )

  const handleOnUpdate = async (update: ViewUpdate) => {
    if (update.docChanged) {
      debouncedHandleOnUpdate(update)
      setRawHtml(update.state.doc.toString())
    }
  }

  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    FORCE_BODY: true
  })

  return (
    <div className="relative w-full border-t">
      <ProfileSectionEditPopover
        disabled={updateProfileSectionLoading}
        sectionId={section.id || 0}
      />

      {profilePageContext.creatorIsOwner && (
        <div className="profile-container">
          <CodeMirrorEditor
            onUpdate={handleOnUpdate}
            content={section.raw_html || ''}
          />
        </div>
      )}

      <div className="profile-container">
        {profilePageContext.creatorIsOwner && (
          <>
            <p className="text-sm mb-1">
              * Warning: Use random classes for styling to prevent conflicts
              with this page&apos;s styles.
            </p>
            <p className="font-medium mb-4">Preview</p>
          </>
        )}
        <div className="prose">{ReactHtmlParser(cleanHtml)}</div>
      </div>

      {children}
    </div>
  )
}

export { ProfileCustomHtmlSection }
