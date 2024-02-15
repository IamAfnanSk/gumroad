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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { ProfileNewSection } from '@/components/ProfileNewSection'

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

  return (
    <div className="relative w-full border-t border-border">
      {profilePageContext.creatorIsOwner && (
        <div className="absolute z-10 left-4 top-2">
          <Popover>
            <PopoverTrigger>
              <Button size={'icon'}>
                <FaPencil />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-72">
              <div className="flex flex-col">
                <AlertDialog>
                  <AlertDialogTrigger className="flex items-center justify-between px-4 py-3 cursor-pointer text-destructive">
                    <p className="font-medium">Delete</p>

                    <div className="flex items-center gap-2">
                      <FaTrash className="text-xs" />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          profilePageContext.handleSectionDelete(section.id)
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="profile-container">
        {content && (
          <Tiptap
            content={content}
            onUpdate={debouncedHandleOnUpdate}
            editable={profilePageContext.creatorIsOwner}
          />
        )}
      </div>

      <ProfileSectionPositionMover
        sectionId={section.id}
        position={section.position}
      />

      <ProfileNewSection position={section.position} />
    </div>
  )
}

export { ProfileWysiwygSection }
