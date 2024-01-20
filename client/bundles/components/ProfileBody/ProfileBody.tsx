import * as React from 'react'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Link from '../../ui/Link'
import { Creator, Post, Product } from '../../../types/types'

type Props = {
  creator: Creator
  posts: Post[]
  product: Product[]
}

const ProfileHeader = (props: Props) => {
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const [sections, setSections] = React.useState([])

  React.useEffect(() => {
    const hideAllModals = (event) => {
      if (!event.target.closest('.close-button')) {
        setShowModal(false)
      }
    }

    document.body.addEventListener('click', hideAllModals)

    return () => {
      document.body.removeEventListener('click', hideAllModals)
    }
  }, [])

  return (
    <div className="relative flex items-center px-16 py-6 mx-auto max-w-7xl">
      <div className="absolute top-0 mx-auto transform -translate-x-1/2 -translate-y-1/2 close-button left-1/2 bg-zinc-900">
        <Button onClick={() => setShowModal(true)}>
          {showModal ? 'x' : '+'}
        </Button>
      </div>

      {showModal && (
        <div className="absolute flex gap-2 px-4 py-3 transform -translate-x-1/2 -translate-y-1/2 border border-white rounded-md top-[140%] left-1/2 bg-zinc-900">
          <Button>Text</Button>
          <Button>Product</Button>
          <Button>Featured Product</Button>
        </div>
      )}
    </div>
  )
}

export default ProfileHeader
