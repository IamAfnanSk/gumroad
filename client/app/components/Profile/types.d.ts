import { ProfileSection } from '@/types'
import * as React from 'react'

export type ProfileSectionProps = {
  section: Partial<ProfileSection>
  children?: React.ReactNode
}
