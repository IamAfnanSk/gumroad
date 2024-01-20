import * as React from 'react'
import { useState } from 'react'

const HelloWorld = (props: { name: string }) => {
  const [name, setName] = useState(props.name)

  return (
    <div className="container">
      <h3 className="text-xl">Hello, {name}!</h3>

      <form className="mt-5">
        <label className="block" htmlFor="name">
          Say hello to:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  )
}

export default HelloWorld
