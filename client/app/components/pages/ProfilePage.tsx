import * as React from 'react'

import { ProfilePageLayout } from '@/components/layouts/ProfilePageLayout'

import {
  ProfilePageContext,
  ProfilePageContextProps
} from '@/contexts/ProfilePageContext'
import { WysiwygSection } from '@/components/WysiwygSection'

type Props = ProfilePageContextProps

const ProfilePage = ({ products, sections, creator, posts }: Props) => {
  return (
    <ProfilePageContext.Provider value={{ sections, creator, posts, products }}>
      <ProfilePageLayout>
        <WysiwygSection />
      </ProfilePageLayout>
    </ProfilePageContext.Provider>
  )
}

export { ProfilePage }
