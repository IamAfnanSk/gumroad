import * as React from 'react'

type Props = {
  href: string
  isSelected: boolean
  children: React.ReactNode
}

const Link = (props: Props) => {
  return (
    <a
      className={`px-3 py-3 ${
        props.isSelected && 'border border-white'
      } rounded-3xl`}
      href={props.href}
    >
      {props.children}
    </a>
  )
}

export default Link
