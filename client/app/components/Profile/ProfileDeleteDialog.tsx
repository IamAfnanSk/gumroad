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

type Props = {
  sectionId: number
  alertDialogTriggerClassName?: string
}

const ProfileDeleteDialog = ({
  sectionId,
  alertDialogTriggerClassName
}: Props) => {
  const profilePageContext = React.useContext(ProfilePageContext)

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              profilePageContext?.handleDeleteProfileSection(sectionId)
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ProfileDeleteDialog }
