import * as React from 'react'
import { SignOutButton } from './SignOutButton'
import { Button } from './ui/button'

type Props = {
  isSignedIn?: boolean
}

const HomeHeader = ({ isSignedIn }: Props) => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div>
        <img className="w-40" src="/images/logo.svg" alt="Header logo" />
      </div>

      <div>
        {isSignedIn ? (
          <SignOutButton />
        ) : (
          <a href="/creators/sign_in">
            <Button>Sign In</Button>
          </a>
        )}
      </div>
    </header>
  )
}

export { HomeHeader }
