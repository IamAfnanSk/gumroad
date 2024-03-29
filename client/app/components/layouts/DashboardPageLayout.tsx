import * as React from 'react'
import logo from '@/assets/images/logo-white.svg'
import {
  FaGear,
  FaHouse,
  FaBoxArchive,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa6'
import { IconType } from 'react-icons'
import { Creator, NavLink } from '@/types'
import { isActivePath, urlBuilder } from '@/lib/utils'
import { NavLinkItem } from '@/components/ui/nav-link'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { AiOutlineLogout, AiOutlineShop } from 'react-icons/ai'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'

type Props = {
  children?: React.ReactNode
  navLinks?: NavLink[]
  title: string
  headerCta?: {
    label: string
    icon: IconType
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean
  }
  creator?: Partial<Creator>
} & React.HTMLProps<HTMLDivElement>

type SidebarItem = NavLink & {
  icon: IconType
}

const sidebarTopItems: SidebarItem[] = [
  {
    label: 'Home',
    icon: FaHouse,
    path: urlBuilder('', '')
  },
  {
    label: 'Products',
    icon: FaBoxArchive,
    path: '/products'
  },
  {
    label: 'Emails',
    icon: FaEnvelope,
    path: '/posts'
  }
]

const sidebarBottomItems: SidebarItem[] = [
  {
    label: 'Settings',
    icon: FaGear,
    path: '/settings/profile'
  }
]

const DashboardPageLayout = ({
  children,
  navLinks,
  headerCta,
  title,
  creator
}: Props) => {
  const { logout } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const [isAccountPopoverOpen, setIsAccountPopoverOpen] = React.useState(false)

  const SidebarNav = (items: SidebarItem[]) => (
    <>
      {items.map((item, index) => (
        <a
          key={index}
          className={`flex cursor-pointer justify-start px-5 py-4 border-t border-t-neutral-500 gap-4 ${
            isActivePath({
              path: item.path,
              activePaths: item.activePaths
            })
              ? 'text-accent'
              : 'text-primary-foreground'
          }`}
          href={item.path}
        >
          <item.icon className="mt-0.5" />
          <span>{item.label}</span>
        </a>
      ))}
    </>
  )

  const SideBar = (
    <>
      {SidebarNav(sidebarTopItems)}
      <div className="flex-1 border-t border-t-neutral-500"></div>
      {SidebarNav(sidebarBottomItems)}

      <div className="border-t border-t-neutral-500">
        <Popover onOpenChange={(isOpen) => setIsAccountPopoverOpen(isOpen)}>
          <PopoverTrigger className="flex items-center cursor-pointer text-primary-foreground px-5 py-4 w-full gap-4">
            <img
              className="w-6 h-6 border border-primary-foreground rounded-full"
              src={creator?.avatar_url || 'https://gravatar.com/avatar'}
              alt={`${creator?.username}'s avatar`}
            />
            <span className="flex-1 text-left">{creator?.username}</span>
            {isAccountPopoverOpen ? <FaChevronUp /> : <FaChevronDown />}
          </PopoverTrigger>
          <PopoverContent className="max-w-none w-dvw md:max-w-48 p-2">
            <a
              href={urlBuilder('', creator?.username)}
              className="flex items-center gap-2 px-2 py-1 hover:bg-input cursor-pointer"
            >
              <AiOutlineShop />
              <p>Profile</p>
            </a>
            <button
              onClick={logout}
              className="flex w-full items-center gap-2 px-2 py-1 hover:bg-input cursor-pointer"
            >
              <AiOutlineLogout />
              <p>Logout</p>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )

  return (
    <div className="flex min-h-dvh">
      <aside className="w-52 bg-primary hidden md:block">
        <div className="flex flex-col h-full">
          <div className="flex h-36 items-center justify-center">
            <img className="w-40" src={logo} alt="Creator avatar" />
          </div>

          {SideBar}
        </div>
      </aside>

      <section className="flex-1 max-h-dvh flex flex-col">
        <div
          className={`${isMenuOpen ? 'top-0 left-0 w-full h-full bg-foreground z-10 fixed flex flex-col' : 'sticky'} md:hidden`}
        >
          <div className="items-center grid grid-cols-[auto_1fr_auto] text-background justify-between px-5 py-4 bg-foreground">
            <img
              className="w-7"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODEiIGhlaWdodD0iODEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQzLjc0MSA4MC4xODZjMjAuNDU1IDAgMzcuMDM3LTE2LjU4MiAzNy4wMzctMzcuMDM3UzY0LjE5NiA2LjExMiA0My43NDEgNi4xMTIgNi43MDQgMjIuNjk0IDYuNzA0IDQzLjE0OXMxNi41ODIgMzcuMDM3IDM3LjAzNyAzNy4wMzdaIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTM4LjYwNSA3Ni40MzNjMjAuODkyIDAgMzcuODI4LTE2LjkzNiAzNy44MjgtMzcuODI4IDAtMjAuODktMTYuOTM2LTM3LjgyNy0zNy44MjgtMzcuODI3QzE3LjcxNS43NzguNzc5IDE3LjcxNC43NzkgMzguNjA2YzAgMjAuODkgMTYuOTM2IDM3LjgyNyAzNy44MjggMzcuODI3WiIgZmlsbD0iI0ZGOTBFOCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuNTU3Ii8+PHBhdGggZD0iTTM1LjM5MiA1Ny4yNzJjLTEwLjg0OSAwLTE3LjIzLTguNzAxLTE3LjIzLTE5LjUyNiAwLTExLjI0OSA3LjAyLTIwLjM3NSAyMC40MjEtMjAuMzc1IDEzLjgyOCAwIDE4LjUwOCA5LjMzOSAxOC43MiAxNC42NDVoLTkuOTk4Yy0uMjEzLTIuOTcyLTIuNzY1LTcuNDI5LTguOTM1LTcuNDI5LTYuNTk0IDAtMTAuODQ5IDUuNzMtMTAuODQ5IDEyLjczNSAwIDcuMDA0IDQuMjU1IDEyLjczNCAxMC44NSAxMi43MzQgNS45NTYgMCA4LjUwOS00LjY3IDkuNTcyLTkuMzM4SDM4LjM3di0zLjgyaDIwLjA4N3YxOS41MjVoLTguODEydi0xMi4zMWMtLjYzOCA0LjQ1OC0zLjQwNCAxMy4xNi0xNC4yNTMgMTMuMTZaIiBmaWxsPSIjMDAwIi8+PC9zdmc+"
              alt="Gumroad logo"
            />

            <p className="text-center">{title}</p>

            {!isMenuOpen && (
              <FiMenu
                className="text-2xl cursor-pointer"
                onClick={() => setIsMenuOpen(true)}
              />
            )}

            {isMenuOpen && (
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </div>
          {isMenuOpen && SideBar}
        </div>

        <header
          className={`flex flex-col md:py-[3.25rem] start dashboard-container ${navLinks?.length ? 'md:pb-[1.98rem]' : 'md:pb-[2.85rem]'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-4xl py-[0.19rem] hidden md:block">{title}</h2>

            {headerCta && (
              <Button
                className="w-full md:w-max mb-4 md:mb-0"
                variant={'accent'}
                onClick={headerCta.onClick}
                disabled={headerCta.disabled}
              >
                {headerCta.disabled && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <headerCta.icon className="text-xl mr-2" />
                <p>{headerCta.label}</p>
              </Button>
            )}
          </div>

          {navLinks && (
            <div className="flex items-center overflow-x-auto gap-2 md:mt-[1.95rem]">
              {navLinks.map((link, index) => (
                <NavLinkItem key={index} link={link} activeClass="bg-white" />
              ))}
            </div>
          )}
        </header>
        <main className="border-t border-t-primary flex-1 max-h-full overflow-y-auto">
          {children}
        </main>
      </section>
    </div>
  )
}

export { DashboardPageLayout }
