import * as React from 'react'
import { SignOutButton } from '@/components/SignOutButton'
import { Button } from '@/components/ui/button'

type Props = {
  isSignedIn?: boolean
}

const HomeHeader = ({ isSignedIn }: Props) => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <img className="w-40" src="/images/logo.svg" alt="Header logo" />
      </div>

      <div>
        {/* TODO: Add dashboard link */}
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
