import * as React from 'react'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Link from '../../ui/Link'
import { Creator } from '../../../types/types'

type Props = {
  creator: Creator
  postCount: number
  productCount: number
}

const ProfileHeader = (props: Props) => {
  const [newsletterEmail, setNewsLetterEmail] = React.useState<string>('')

  return (
    <>
      <div className="border-b border-white">
        <div className="flex items-center px-16 py-6 mx-auto max-w-7xl">
          <div className="flex items-center flex-1 gap-3">
            <img
              className="object-contain w-8 h-8 border border-white rounded-full"
              src={props.creator.avatar_url}
              alt={`${props.creator.name}'s avatar`}
            />
            <p className="text-lg">{props.creator.name}</p>
          </div>

          <div className="flex items-center gap-3">
            <Input
              type="text"
              value={newsletterEmail}
              setValue={setNewsLetterEmail}
              placeholder="Your email address"
            />

            <Button>Subscribe</Button>
          </div>
        </div>
      </div>

      <div className="border-b border-white">
        <div className="px-16 py-6 mx-auto max-w-7xl">
          <p className="text-4xl">{props.creator.bio}</p>

          <div className="mt-6">
            <Link href="#" isSelected={false}>
              Products
            </Link>
            <Link href="#" isSelected={false}>
              Posts
            </Link>
            <Link href="#" isSelected={true}>
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader
