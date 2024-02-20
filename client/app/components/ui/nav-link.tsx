import { NavLink } from '@/types'
import { isActivePath } from '@/lib/utils'
import * as React from 'react'

type Props = {
  link: NavLink
  activeClass?: string
} & React.HTMLProps<HTMLAnchorElement>

const NavLinkItem = ({ link, activeClass }: Props) => {
  return (
    <a
      className={`${
        isActivePath({
          path: link.path,
          activePaths: link.activePaths
        })
          ? `${activeClass} border border-border`
          : 'border-transparent'
      } rounded-3xl flex-shrink-0 px-3.5 pt-2 pb-1.5 hover:border-border border`}
      href={link.path}
    >
      {link.label}
    </a>
  )
}

export { NavLinkItem }
