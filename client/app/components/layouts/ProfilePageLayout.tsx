import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/logo.svg'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { toast } from 'sonner'

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

  const fakeSubscribe = () => {
    toast.success('Fake subscribed!')
  }

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center px-0 py-0 md:py-6 md:px-16 mx-auto max-w-7xl">
        <div className="flex items-center py-4 px-3 md:flex-1 gap-3 md:p-0">
          <img
            className="w-8 h-8 border border-border rounded-full"
            src={
              profilePageContext.creator?.avatar_url ||
              'https://gravatar.com/avatar'
            }
            alt={`${profilePageContext.creator?.name}'s avatar`}
          />
          <p className="text-lg">{profilePageContext.creator.name || 'User'}</p>
        </div>

        <div className="flex items-center gap-3 md:border-none border-t border-border py-4 px-3 md:p-0">
          <Input type="text" placeholder="Your email address" />

          <Button onClick={fakeSubscribe}>Subscribe</Button>
        </div>
      </header>

      <header className="border-t border-border">
        <div className="profile-container">
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

      <main>{children}</main>

      <footer className="border-t border-border">
        <div className="flex items-center gap-2 profile-container">
          <p className="text-sm">Powered by</p>
          <img src={logo} alt="Gumroad" className="w-24 " />
        </div>
      </footer>
    </>
  )
}

export { ProfilePageLayout }
