import * as React from 'react'
import { HomeHeader } from '../components/HomeHeader'

type Props = {
  isSignedIn?: boolean
}

const HomePage = ({ isSignedIn }: Props) => {
  return (
    <>
      <HomeHeader isSignedIn={isSignedIn} />

      <div className="mt-5 text-center">
        <p className="text-lg">Gumroad website builder</p>
        <p className="mt-2">
          by{' '}
          <a className="text-blue-700" href="https://afnan.dev">
            Afnan Shaikh
          </a>
        </p>
      </div>
    </>
  )
}

export { HomePage }
