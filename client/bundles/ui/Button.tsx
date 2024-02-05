import * as React from 'react'

type Props = {
  onClick?: Function
  children: React.ReactNode
}

const Button = (props: Props) => {
  return (
    <button
      className="px-4 py-3 bg-transparent border border-white rounded-md text-zinc-300 active:translate-x-0 active:translate-y-0 hover:-translate-x-[0.25rem] hover:-translate-y-[0.25rem] hover:shadow-[0.25rem_0.25rem_0] active:shadow-none transition-all ease-out delay-100"
      onClick={(e) => props.onClick && props.onClick(e)}
    >
      {props.children}
    </button>
  )
}

export default Button
