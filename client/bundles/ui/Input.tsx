import * as React from 'react'

type Props = {
  placeholder?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  type: React.HTMLInputTypeAttribute
}

const Input = (props: Props) => {
  return (
    <input
      className="px-4 py-3 bg-transparent border border-white rounded-md placeholder:text-zinc-500"
      type={props.type}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
      placeholder={props.placeholder}
    />
  )
}

export default Input
