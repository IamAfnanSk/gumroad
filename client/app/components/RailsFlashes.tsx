import * as React from 'react'
import { ExternalToast, toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

type Props = {
  notice?: string
  alert?: string
}

const RailsFlashes = ({ notice, alert }: Props) => {
  React.useEffect(() => {
    const flashConfig: ExternalToast = {
      duration: 5000,
      dismissible: true
    }

    if (notice) {
      toast.success(notice, flashConfig)
    }
    if (alert) {
      toast.error(alert, flashConfig)
    }
  }, [])

  return <Toaster position="bottom-center" richColors />
}

export { RailsFlashes }
