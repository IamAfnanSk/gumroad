import * as React from 'react'
import logo from '@/assets/images/logo.svg'
import { LogOutButton } from '@/components/LogOutButton'
import { CurrentCreator } from '@/types'
import { urlBuilder } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Props = {
  currentCreator?: CurrentCreator
  profileUrl?: string
  settingsUrl?: string
}

const HomePage = (props: Props) => {
  return (
    <div className="container-margins">
      <header className="flex items-center justify-between">
        <div>
          <img className="w-40" src={logo} alt="Header logo" />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-6">
          {props.currentCreator?.username ? (
            <>
              <a href={urlBuilder(location, '/settings/profile', 'app')}>
                Settings
              </a>
              <a href={urlBuilder(location, '', props.currentCreator.username)}>
                Profile
              </a>

              <LogOutButton />
            </>
          ) : (
            <a href={urlBuilder(location, '/creators/login', 'app')}>
              <Button>Login</Button>
            </a>
          )}
        </div>
      </header>

      <div className="mt-10 text-center">
        <p className="text-xl md:text-3xl">Gumroad website builder</p>
        <p className="mt-2">
          by{' '}
          <a className="border-b border-dotted" href="https://afnan.dev">
            Afnan Shaikh
          </a>
        </p>
      </div>
    </div>
  )
}

export { HomePage }
