import '@/assets/styles/main.css'

import ReactOnRails from 'react-on-rails'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { LogOutButton } from '@/components/LogOutButton'
import { RailsFlashes } from '@/components/RailsFlashes'

import { HomePage } from '@/components/pages/HomePage'

ReactOnRails.register({
  RailsFlashes,
  Button,
  LogOutButton,
  Input,
  Label,
  HomePage
})
