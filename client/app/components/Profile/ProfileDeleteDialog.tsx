import * as React from 'react'
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
import { FaTrash } from 'react-icons/fa6'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import classNames from 'classnames'
import { useProfileSectionDelete } from '@/hooks/useProfileSectionDelete'

type Props = {
  sectionId: number
  alertDialogTriggerClassName?: string
  disabled?: boolean
}

const ProfileDeleteDialog = ({
  sectionId,
  alertDialogTriggerClassName,
  disabled
}: Props) => {
  const profilePageContext = React.useContext(ProfilePageContext)

  const {
    deleteProfileSection,
    errors: deleteProfileErrors,
    data: deleteProfileData,
    loading: deleteProfileLoading
  } = useProfileSectionDelete()

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  React.useEffect(() => {
    if (!deleteProfileLoading && !deleteProfileErrors && deleteProfileData) {
      const sectionIdPositionMap =
        deleteProfileData.data?.idPositionMapping || {}

      const sectionId = deleteProfileData.data?.deletedSectionId || 0

      profilePageContext.setProfileSections((profileSections) => {
        return profileSections
          .filter((profileSection) => profileSection.id !== sectionId)
          .map((profileSection) => {
            return {
              ...profileSection,
              position: sectionIdPositionMap[profileSection.id || 0]
            }
          })
      })
    }
  }, [deleteProfileData, deleteProfileErrors, deleteProfileLoading])

  const handleDeleteProfileSection = async (sectionId: number) => {
    await deleteProfileSection({ sectionId })
  }

  const isLoading = deleteProfileLoading || disabled

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className={classNames(
          'flex items-center justify-between px-4 py-3 cursor-pointer text-destructive',
          alertDialogTriggerClassName
        )}
      >
        <p className="font-medium">Delete</p>

        <div className="flex items-center gap-2">
          <FaTrash className="text-xs" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => handleDeleteProfileSection(sectionId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ProfileDeleteDialog }
