import * as React from 'react'
import { Creator, Post, Product, ProfileSection } from '@/types'

export type ProfilePageContextProps = {
  profileSections: Partial<ProfileSection>[]
  setProfileSections: React.Dispatch<
    React.SetStateAction<Partial<ProfileSection>[]>
  >
  creator?: Partial<Creator>
  posts?: Partial<Post>[]
  products?: Partial<Product>[]
  creatorIsOwner?: boolean
}

export const ProfilePageContext = React.createContext<
  ProfilePageContextProps | undefined
>(undefined)
