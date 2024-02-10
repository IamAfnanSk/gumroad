import '@/assets/styles/main.css'

import ReactOnRails from 'react-on-rails'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { SignOutButton } from '@/components/SignOutButton'
import { RailsFlashes } from '@/components/RailsFlashes'

ReactOnRails.register({
  RailsFlashes,
  Button,
  SignOutButton,
  Input,
  Label
})
