import { toast } from 'sonner'

const useEmailSubscriber = () => {
  const subscribeEmail = async (email: string) => {
    toast.success(`Fake subscribed ${email}!`)
  }

  return {
    subscribeEmail
  }
}

export { useEmailSubscriber }
