import * as React from 'react'
import { Creator, Post, Product, Section } from '@/types'

export type ProfilePageContextProps = {
  sections: Partial<Section[]>
  creator?: Partial<Creator>
  posts?: Partial<Post[]>
  products?: Partial<Product[]>
  creatorIsOwner?: boolean
  setSections: React.Dispatch<React.SetStateAction<Section[]>>
}

export const ProfilePageContext = React.createContext<
  ProfilePageContextProps | undefined
>(undefined)
