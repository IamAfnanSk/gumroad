import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const authFormSchema = z.object({
  'creator[email]': z.string().email().min(3),
  'creator[password]': z.string().min(3)
})

type Props = {
  type: 'signin' | 'signup' | 'password-reset'
}

const AuthForm = ({ type }: Props) => {
  const authForm = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      'creator[email]': '',
      'creator[password]': ''
    }
  })

  const [csrfToken, setCsrfToken] = React.useState<string>('')

  React.useEffect(() => {
    setCsrfToken(
      (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
        .content
    )
  }, [])

  return (
    <div className="">
      <h2 className="mt-12 text-2xl font-medium md:text-3xl">Sign in</h2>

      <Form {...authForm}>
        <form
          // onSubmit={authForm.handleSubmit(onSubmit)}
          className="mt-5 space-y-4"
          action="/creators/sign_in"
          acceptCharset="UTF-8"
          method="post"
        >
          <input
            type="hidden"
            name="authenticity_token"
            value={csrfToken}
            autoComplete="off"
          />

          <FormField
            control={authForm.control}
            name="creator[email]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={authForm.control}
            name="creator[password]"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  )
}

export { AuthForm }
