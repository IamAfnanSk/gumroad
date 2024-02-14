import '@/assets/styles/main.css'

import ReactOnRails from 'react-on-rails'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { RailsFlashes } from '@/components/RailsFlashes'

import { HomePage } from '@/components/pages/HomePage'
import { SettingsProfile } from '@/components/pages/SettingsProfile'
import { ProfilePage } from '@/components/pages/ProfilePage'

ReactOnRails.register({
  RailsFlashes,
  Button,
  Input,
  Label,
  HomePage,
  SettingsProfile,
  ProfilePage
})
