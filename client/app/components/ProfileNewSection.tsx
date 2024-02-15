import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FaBoxOpen, FaImages, FaPlus, FaRegNewspaper } from 'react-icons/fa6'
import * as React from 'react'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { FaBoxes } from 'react-icons/fa'
import { MdOutlineWysiwyg } from 'react-icons/md'
import { ImEmbed } from 'react-icons/im'
import { LuMails } from 'react-icons/lu'
import { toast } from 'sonner'

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
    isWIP: true
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
    isWIP: true
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
  }
]

const ProfileNewSection = ({ position }: Props) => {
  const profilePageContext = React.useContext(ProfilePageContext)

  if (!profilePageContext.creatorIsOwner) {
    return null
  }

  return (
    <div className="absolute left-1/2 -bottom-5 bg-background z-10 transform -translate-x-1/2">
      <Popover>
        <PopoverTrigger>
          <Button size={'icon'}>
            <FaPlus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0">
          <div className="flex flex-col">
            {profileSectionItems.map((item, index) => (
              <div
                key={item.type}
                onClick={() =>
                  !item.isWIP
                    ? profilePageContext.handleAddSection(
                        item.type,
                        position + 1
                      )
                    : toast('This feature is WIP 🚧')
                }
                className={`flex cursor-pointer px-4 py-3 items-center gap-3 ${index === 0 ? '' : 'border-t border-border'}`}
              >
                {item.icon}
                <p className="">{item.title}</p>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { ProfileNewSection }
