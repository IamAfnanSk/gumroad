import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/logo.svg'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'

type Props = {
  children?: React.ReactNode
}

const links = [
  { href: '#', label: 'Products', isActive: false },
  { href: '#', label: 'Posts', isActive: false },
  { href: '#', label: 'About', isActive: true }
]

const ProfilePageLayout = ({ children }: Props) => {
  const profilePageContext = React.useContext(ProfilePageContext)

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageLayout is not within a ProfilePageContext.Provider'
    )
  }

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center md:px-16 md:py-6 mx-auto max-w-7xl">
        <div className="flex items-center py-4 px-3 md:flex-1 gap-3 md:p-0">
          <img
            className="object-contain w-8 h-8 border border-white rounded-full"
            src={
              profilePageContext.creator?.avatarUrl ||
              'https://gravatar.com/avatar'
            }
            alt={`${profilePageContext.creator?.name}'s avatar`}
          />
          <p className="text-lg">{profilePageContext.creator.name || 'User'}</p>
        </div>

        <div className="flex items-center gap-3 md:border-none border-t border-border py-4 px-3 md:p-0">
          <Input type="text" placeholder="Your email address" />

          <Button>Subscribe</Button>
        </div>
      </header>

      <header className="border-t border-border">
        <div className="md:px-16 md:py-8 mx-auto max-w-7xl py-6 px-3">
          <p className="text-4xl">{profilePageContext.creator?.bio}</p>

          <div className="mt-4 flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                className={`box-border inline-block ${
                  link.isActive && 'border px-3.5 py-2 border-border'
                } rounded-3xl`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="border-t border-border">
        <div className="md:px-16 md:py-8 mx-auto max-w-7xl py-6 px-3">
          {children}
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="flex items-center gap-2 md:px-16 md:py-8 mx-auto max-w-7xl py-6 px-3">
          <p className="text-sm">Powered by</p>
          <img src={logo} alt="Gumroad" className="w-24 " />
        </div>
      </footer>
    </>
  )
}

export { ProfilePageLayout }
