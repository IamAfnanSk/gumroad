import * as React from 'react'
import { Creator, Post, Product, Section } from '@/types'

export type ProfilePageContextProps = {
  sections: Partial<Section[]>
  creator?: Partial<Creator>
  posts?: Partial<Post[]>
  products?: Partial<Product[]>
  creatorIsOwner?: boolean
  setSections: React.Dispatch<React.SetStateAction<Section[]>>
  handleSectionDelete: (sectionId: number) => Promise<void>
  handleAddSection: (sectionType: string, position: number) => Promise<void>
}

export const ProfilePageContext = React.createContext<
  ProfilePageContextProps | undefined
>(undefined)
