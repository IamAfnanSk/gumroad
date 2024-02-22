import '@/assets/styles/main.css'

import ReactOnRails from 'react-on-rails'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { RailsFlashes } from '@/components/RailsFlashes'

import { HomePage } from '@/components/pages/HomePage'
import { SettingsProfilePage } from '@/components/pages/SettingsProfilePage'
import { ProfilePage } from '@/components/pages/ProfilePage'
import { ProductsPage } from '@/components/pages/ProductsPage'
import { PostsPage } from '@/components/pages/PostsPage'

ReactOnRails.register({
  RailsFlashes,
  Button,
  Input,
  Label,
  HomePage,
  SettingsProfilePage,
  ProfilePage,
  ProductsPage,
  PostsPage
})
