import * as React from 'react'
import { Button, ButtonProps } from './ui/button'

type Props = {
  buttonVariant?: ButtonProps['variant']
}

const SignOutButton = ({ buttonVariant }: Props) => {
  const [csrfToken, setCsrfToken] = React.useState<string>('')

  React.useEffect(() => {
    setCsrfToken((document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content)
  }, [])

  return (
    <div>
      <form className="button_to" method="post" action="/creators/sign_out">
        <input type="hidden" name="_method" value="delete" autoComplete="off" />
        <Button variant={buttonVariant} type="submit">
          Sign Out
        </Button>
        <input type="hidden" name="authenticity_token" value={csrfToken} autoComplete="off" />
      </form>
    </div>
  )
}

export { SignOutButton }
