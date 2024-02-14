import * as React from 'react'

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = React.useState<string>('')

  React.useEffect(() => {
    setCsrfToken(
      (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
        .content
    )
  }, [])

  return csrfToken
}
