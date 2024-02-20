import * as React from 'react'
import { toast } from 'sonner'

const useEmailSubscriber = () => {
  const [busy, setBusy] = React.useState<boolean>(false)

  const subscribeEmail = async (email: string) => {
    setBusy(true)
    toast.success(`Fake subscribed ${email}!`)
    setBusy(false)
  }

  return {
    subscribeEmail,
    busy
  }
}

export { useEmailSubscriber }
