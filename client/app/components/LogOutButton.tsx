import * as React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { urlBuilder } from '@/lib/utils'
import { useCsrfToken } from '@/hooks/useCsrfToken'

type Props = {
  buttonVariant?: ButtonProps['variant']
}

const LogOutButton = ({ buttonVariant }: Props) => {
  const csrfToken = useCsrfToken()

  return (
    <div>
      <form
        className="button_to"
        method="post"
        action={urlBuilder('/creators/logout', 'app')}
      >
        <input type="hidden" name="_method" value="delete" autoComplete="off" />
        <Button variant={buttonVariant} type="submit">
          Log Out
        </Button>
        <input
          type="hidden"
          name="authenticity_token"
          value={csrfToken}
          autoComplete="off"
        />
      </form>
    </div>
  )
}

export { LogOutButton }
