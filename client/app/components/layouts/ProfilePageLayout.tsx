import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/logo.svg'
import { ProfilePageContext } from '@/contexts/ProfilePageContext'
// import { ProfileSectionAdd } from '@/components/Profile/ProfileSectionAdd'
// import { NavLink } from '@/types'
// import { NavLinkItem } from '@/components/ui/nav-link'
import { useEmailSubscriber } from '@/hooks/useEmailSubscriber'
import { FaPencil } from 'react-icons/fa6'
import { urlBuilder } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

type Props = {
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

// const links: NavLink[] = [
//   { path: '/products', label: 'Products' },
//   { path: '/posts', label: 'Posts' },
//   { path: '/', label: 'About' }
// ]

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
  // const isImplemented = location.pathname === '/'

  return (
    <>
      <header className="flex flex-col px-0 py-0 mx-auto md:flex-row md:items-center md:py-6 md:px-16 max-w-7xl">
        {profilePageContext.creatorIsOwner && (
          <a
            href={urlBuilder('/settings/profile', 'app')}
            className="absolute top-5 left-5"
          >
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="p-4" size={'smallIcon'}>
                    <FaPencil />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side={'right'}>
                  <p>Edit profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </a>
        )}

        <div className="flex items-center gap-3 px-3 py-4 md:flex-1 md:p-0">
          <img
            className="w-8 h-8 border rounded-full"
            src={creatorAvatarUrl}
            alt={`${creatorName}'s avatar`}
          />
          <p className="text-lg">{creatorName}</p>
        </div>

        <div className="flex items-center gap-3 px-3 py-4 border-t md:border-none md:p-0">
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

      <header className="relative border-t">
        <div className="profile-container">
          <p className="text-4xl">{profilePageContext.creator?.bio}</p>

          {/* <div className="flex items-center gap-5 mt-4">
            {links.map((link, index) => (
              <NavLinkItem key={index} link={link} />
            ))}
          </div> */}
        </div>

        {/* {isImplemented && <ProfileSectionAdd position={1} />} */}
      </header>

      {/* {isImplemented ? ( */}
      <main className="relative">{children}</main>
      {/* ) : (
        <p className="mb-10 text-center">Not implemented</p>
      )} */}

      <footer className="border-t">
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
