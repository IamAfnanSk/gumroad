import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/logo.svg'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
import { ProfileSectionAdd } from '@/components/Profile/ProfileSectionAdd'
import { NavLink } from '@/types'
import { NavLinkItem } from '@/components/ui/nav-link'
import { useEmailSubscriber } from '@/hooks/useEmailSubscriber'

type Props = {
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const links: NavLink[] = [
  { path: '/products', label: 'Products' },
  { path: '/posts', label: 'Posts' },
  { path: '/', label: 'About' }
]

const ProfilePageLayout = ({ children }: Props) => {
  const profilePageContext = React.useContext(ProfilePageContext)
  const { subscribeEmail } = useEmailSubscriber()

  if (!profilePageContext) {
    throw new Error(
      'ProfilePageContext should be used inside ProfilePageContext.Provider'
    )
  }

  const [email, setEmail] = React.useState<string>('')

  const handleSubscribe = async () => {
    await subscribeEmail(email)
  }

  const creatorAvatarUrl =
    profilePageContext.creator?.avatar_url || 'https://gravatar.com/avatar'
  const creatorName = profilePageContext.creator?.name || 'User'

  // TODO: use route from backend
  const isImplemented = location.pathname === '/'

  return (
    <>
      <header className="flex flex-col px-0 py-0 mx-auto md:flex-row md:items-center md:py-6 md:px-16 max-w-7xl">
        <div className="flex items-center gap-3 px-3 py-4 md:flex-1 md:p-0">
          <img
            className="w-8 h-8 border rounded-full border-border"
            src={creatorAvatarUrl}
            alt={`${creatorName}'s avatar`}
          />
          <p className="text-lg">{creatorName}</p>
        </div>

        <div className="flex items-center gap-3 px-3 py-4 border-t md:border-none border-border md:p-0">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Your email address"
          />

          <Button className="shrink-0" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </div>
      </header>

      <header className="border-t border-border relative">
        <div className="profile-container">
          <p className="text-4xl">{profilePageContext.creator?.bio}</p>

          <div className="flex items-center gap-5 mt-4">
            {links.map((link, index) => (
              <NavLinkItem key={index} link={link} />
            ))}
          </div>
        </div>

        {isImplemented && <ProfileSectionAdd position={0} />}
      </header>

      {isImplemented ? (
        <main className="relative">{children}</main>
      ) : (
        <p className="text-center mb-10">Not implemented</p>
      )}

      <footer className="border-t border-border">
        <div className="flex items-center gap-2 profile-container">
          <p className="text-sm">Powered by</p>
          <img src={logo} alt="Gumroad" className="w-24 " />
          <p className="text-sm">
            or maybe <a href="https://afnan.dev">Afnan Shaikh</a> 😁
          </p>
        </div>
      </footer>
    </>
  )
}

export { ProfilePageLayout }
