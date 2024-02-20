import * as React from 'react'
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
import { CodeMirrorEditor } from '@/components/CodeMirror/CodeMirrorEditor'
import * as DOMPurify from 'dompurify'
import ReactHtmlParser from 'react-html-parser'
import { ViewUpdate } from '@codemirror/view'

const ProfileCustomHtmlSection = ({
  section,
  children
}: ProfileSectionProps) => {
  const profilePageContext = useContext(ProfilePageContext)

  const { updateProfileSection } = useProfileSectionUpdate()

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  const [rawHtml, setRawHtml] = React.useState<string>(section.raw_html || '')

  const debouncedHandleOnUpdate = useDebouncedCallback(
    async (update: ViewUpdate) => {
      await updateProfileSection({
        id: section.id,
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
        {ReactHtmlParser(cleanHtml)}
      </div>

      {children}
    </div>
  )
}

export { ProfileCustomHtmlSection }
