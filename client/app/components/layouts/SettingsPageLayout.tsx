import * as React from 'react'
import logo from '@/assets/images/logo-white.svg'
import {
  FaGear,
  FaHouse,
  FaBoxArchive,
  FaCartShopping,
  FaEnvelope
} from 'react-icons/fa6'
import { IconType } from 'react-icons'

type Props = {
  children: React.ReactNode
}

type SidebarItem = {
  icon: IconType
  title: string
  isActive?: boolean
}

const sidebarTopItems: SidebarItem[] = [
  {
    title: 'Home',
    icon: FaHouse,
    isActive: false
  },
  {
    title: 'Products',
    icon: FaBoxArchive,
    isActive: false
  },
  {
    title: 'Checkout',
    icon: FaCartShopping,
    isActive: false
  },
  {
    title: 'Email',
    icon: FaEnvelope,
    isActive: false
  }
]

const sidebarBottomItems: SidebarItem[] = [
  {
    title: 'Settings',
    icon: FaGear,
    isActive: true
  }
]

const SettingsPageLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-dvh">
      <aside className="w-52 bg-primary">
        <div className="flex flex-col h-full">
          <div className="flex h-36 items-center justify-center">
            <img className="w-40" src={logo} alt="Creator avatar" />
          </div>

          {sidebarTopItems.map((item, index) => (
            <div
              key={index}
              className={`flex justify-start px-4  py-4 border-t border-t-primary-foreground gap-4 ${item.isActive ? 'text-accent' : 'text-primary-foreground'}`}
            >
              <item.icon className="mt-0.5" />
              <span>{item.title}</span>
            </div>
          ))}

          <div className="flex-1 border-t border-t-primary-foreground"></div>

          {sidebarBottomItems.map((item, index) => (
            <div
              key={index}
              className={`flex justify-start px-4  py-4 border-t border-t-primary-foreground gap-4 ${item.isActive ? 'text-accent' : 'text-primary-foreground'}`}
            >
              <item.icon className="mt-0.5" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </aside>

      <section className="flex-1 max-h-dvh flex flex-col">
        <header className="flex h-36 items-center start px-12">
          <h2 className="text-4xl">Settings</h2>
        </header>
        <main className="border-t border-t-primary flex-1 max-h-full overflow-y-auto">
          {children}
        </main>
      </section>
    </div>
  )
}

export { SettingsPageLayout }
