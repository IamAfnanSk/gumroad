import * as React from 'react'
import logo from '@/assets/images/logo.svg'
import { urlBuilder } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

type Props = {
  currentCreatorUsername?: string
} & React.HTMLProps<HTMLDivElement>

const HomePage = ({ currentCreatorUsername }: Props) => {
  const { logout } = useAuth()

  return (
    <div className="container-margins">
      <header className="flex items-center justify-between">
        <div>
          <img className="w-40" src={logo} alt="Header logo" />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-6">
          {currentCreatorUsername ? (
            <>
              <a href={urlBuilder('/settings/profile', 'app')}>Settings</a>
              <a href={urlBuilder('', currentCreatorUsername)}>Profile</a>
              <Button onClick={logout} variant={'destructive'} type="submit">
                Logout
              </Button>
            </>
          ) : (
            <a href={urlBuilder('/creators/login', 'app')}>
              <Button>Login</Button>
            </a>
          )}
        </div>
      </header>

      <div className="mt-10 text-center">
        <p className="text-xl md:text-3xl">Gumroad website builder</p>
        <p className="text-xl md:text-3xl">Login to continue</p>
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
