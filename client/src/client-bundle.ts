import './main.css'

import ReactOnRails from 'react-on-rails'

import { RailsFlashes } from './components/RailsFlashes'
import { HomeHeader } from './components/HomeHeader'
import { AuthForm } from './components/AuthForm'

ReactOnRails.register({ RailsFlashes, HomeHeader, AuthForm })
