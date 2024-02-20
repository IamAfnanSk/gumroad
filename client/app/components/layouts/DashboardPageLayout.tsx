import * as React from 'react'
import logo from '@/assets/images/logo-white.svg'
import { FaGear, FaHouse, FaBoxArchive, FaEnvelope } from 'react-icons/fa6'
import { IconType } from 'react-icons'
import { NavLink } from '@/types'
import { isActivePath, urlBuilder } from '@/lib/utils'
import { NavLinkItem } from '@/components/ui/nav-link'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { Button } from '@/components/ui/button'

type Props = {
  children?: React.ReactNode
  navLinks?: NavLink[]
  title: string
  headerCta?: {
    label: string
    icon: IconType
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }
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
    path: ''
  },
  {
    label: 'Emails',
    icon: FaEnvelope,
    path: ''
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
  title
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

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
          className={`flex flex-col md:py-[3.25rem] start dashboard-container md:pb-8`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-4xl py-[0.19rem] hidden md:block">{title}</h2>

            {headerCta && (
              <Button
                className="w-full md:w-max mb-4 md:mb-0"
                variant={'accent'}
                onClick={headerCta.onClick}
              >
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
