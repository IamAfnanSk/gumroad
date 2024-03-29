import { Button } from '@/components/ui/button'
import {
  FaBoxOpen,
  FaHtml5,
  FaImages,
  FaPlus,
  FaRegNewspaper
} from 'react-icons/fa6'
import * as React from 'react'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { FaBoxes } from 'react-icons/fa'
import { MdOutlineWysiwyg } from 'react-icons/md'
import { ImEmbed } from 'react-icons/im'
import { LuMails } from 'react-icons/lu'
import { toast } from 'sonner'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar'
import { ProfileSection } from '@/types'
import { useProfileSectionAdd } from '@/hooks/useProfileSectionAdd'

type Props = {
  position: number
}

const profileSectionItems = [
  {
    icon: <MdOutlineWysiwyg className="text-md" />,
    title: 'WYSIWYG editor',
    type: 'wysiwyg'
  },
  {
    icon: <FaBoxes className="text-md" />,
    title: 'Products',
    type: 'product_list'
  },
  {
    icon: <FaBoxOpen className="text-md" />,
    title: 'Featured product',
    type: 'featured_product',
    isWIP: false
  },
  {
    icon: <FaRegNewspaper className="text-md" />,
    title: 'Posts',
    type: 'post_list'
  },
  {
    icon: <FaImages className="text-md" />,
    title: 'Image carousel',
    type: 'image_carousel',
    isWIP: false
  },
  {
    icon: <ImEmbed className="text-md" />,
    title: 'Embed',
    type: 'embed'
  },
  {
    icon: <LuMails className="text-md" />,
    title: 'Subscribe',
    type: 'subscribe'
  },
  {
    icon: <FaHtml5 className="text-md" />,
    title: 'Custom HTML',
    type: 'custom_html'
  }
]

const ProfileSectionAdd = ({ position }: Props) => {
  const profilePageContext = React.useContext(ProfilePageContext)

  const {
    addProfileSection,
    errors: addProfileErrors,
    data: addProfileData,
    loading: addProfileLoading
  } = useProfileSectionAdd()

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  React.useEffect(() => {
    if (!addProfileLoading && !addProfileErrors && addProfileData) {
      const sectionIdPositionMap = addProfileData.data?.idPositionMapping || {}
      const newSection = addProfileData.data?.profileSection || {}

      profilePageContext.setProfileSections((profileSections) => {
        const updatedSections = profileSections.map<Partial<ProfileSection>>(
          (profileSection) => {
            return {
              ...profileSection,
              position: sectionIdPositionMap[profileSection.id || 0]
            }
          }
        )

        updatedSections.push(newSection)

        return updatedSections
      })
    }
  }, [addProfileData, addProfileErrors, addProfileLoading])

  const handleAddProfileSection = async (
    sectionType: string,
    position: number
  ) => {
    await addProfileSection({ sectionType, position })
  }

  if (!profilePageContext.creatorIsOwner) {
    return null
  }

  return (
    <div className="absolute z-10 transform -translate-x-1/2 left-1/2 -bottom-5 bg-background">
      <Menubar className="p-0 border-none">
        <MenubarMenu>
          <MenubarTrigger
            disabled={addProfileLoading}
            className="p-0 cursor-pointer focus:bg-background focus:foreground data-[state=open]:bg-background data-[state=open]:text-foreground"
          >
            <Button className="p-3" asChild size={'icon'}>
              <FaPlus />
            </Button>
          </MenubarTrigger>
          <MenubarContent className="space-y-1">
            {profileSectionItems.map((item, index) => (
              <MenubarItem
                className="focus:bg-input focus:text-foreground cursor-pointer"
                key={index}
                onClick={() => {
                  !item.isWIP
                    ? handleAddProfileSection(item.type, position)
                    : toast('This feature is WIP 🚧')
                }}
                disabled={addProfileLoading}
              >
                <div className={`flex items-center gap-3`}>
                  {item.icon}
                  <p className="">{item.title}</p>
                </div>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export { ProfileSectionAdd }
