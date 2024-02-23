import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ProfileDeleteDialog } from '@/components/Profile/ProfileDeleteDialog'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { BsThreeDots } from 'react-icons/bs'

export type ProfileSectionsEditPopoverTabName =
  | 'name'
  | 'embed'
  | 'home'
  | 'description'
  | 'products'
  | 'posts'
  | 'subscribe'

type Props = {
  handleSectionUpdate?: (isOpened: boolean) => void
  popoverTabsData?: {
    label: string
    name: Omit<ProfileSectionsEditPopoverTabName, 'home'>
    description?: string
    body: React.ReactNode
  }[]
  sectionId: number
  disabled?: boolean
}

const ProfileSectionEditPopover = ({
  handleSectionUpdate,
  popoverTabsData,
  sectionId,
  disabled
}: Props) => {
  const profilePageContext = React.useContext(ProfilePageContext)

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  const [popOverTab, setPopoverTab] =
    React.useState<ProfileSectionsEditPopoverTabName>('home')

  return (
    <>
      {profilePageContext.creatorIsOwner && (
        <div className="absolute z-10 left-4 top-2">
          <Popover onOpenChange={handleSectionUpdate}>
            <PopoverTrigger>
              <Button className="p-3" asChild size={'icon'}>
                <BsThreeDots />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-72">
              {popOverTab === 'home' && (
                <div className="flex flex-col">
                  {popoverTabsData?.map((tab, index) => {
                    return (
                      <button
                        disabled={disabled}
                        key={index}
                        onClick={() =>
                          setPopoverTab(
                            tab.name as ProfileSectionsEditPopoverTabName
                          )
                        }
                        className={`${index !== 0 ? 'border-t' : ''} flex items-center justify-between px-4 py-3 cursor-pointer`}
                      >
                        <p className="font-medium">{tab.label}</p>

                        <div className="flex items-center gap-2">
                          {tab.description && (
                            <p className="text-sm">{tab.description}</p>
                          )}
                          <FaChevronRight className="text-xs" />
                        </div>
                      </button>
                    )
                  })}

                  <ProfileDeleteDialog
                    alertDialogTriggerClassName={`${(popoverTabsData?.length || 0) > 0 ? 'border-t' : ''}`}
                    sectionId={sectionId}
                    disabled={disabled}
                  />
                </div>
              )}

              {popoverTabsData?.map((tab, index) => {
                return (
                  popOverTab === tab.name && (
                    <div key={index} className="px-4 py-3">
                      <div className="grid items-center grid-cols-10 pt-3 pb-5">
                        <button
                          disabled={disabled}
                          onClick={() => setPopoverTab('home')}
                          className="col-span-1"
                        >
                          <FaChevronLeft />
                        </button>
                        <h1 className="w-full col-span-8 font-medium text-center">
                          {tab.label}
                        </h1>
                        <span className="block col-span-1"></span>
                      </div>

                      {tab.body}
                    </div>
                  )
                )
              })}
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  )
}

export { ProfileSectionEditPopover }
