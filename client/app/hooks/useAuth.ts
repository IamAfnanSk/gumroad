import axios from 'axios'
import { toast } from 'sonner'
import { useCsrfToken } from '@/hooks/useCsrfToken'
import { urlBuilder } from '@/lib/utils'

const useAuth = () => {
  const csrfToken = useCsrfToken()

  const logout = async () => {
    const errorMessage = 'Error logging out'

    try {
      const response = await axios.delete(`/creators/logout.json`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Csrf-Token': csrfToken
        }
      })

      if (response.status === 204) {
        location.href = urlBuilder('', '')
      } else {
        toast.error(errorMessage)
      }
    } catch (error: unknown) {
      toast.error(errorMessage)
    }
  }

  return {
    logout
  }
}

export { useAuth }
