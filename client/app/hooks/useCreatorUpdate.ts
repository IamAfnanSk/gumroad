import * as React from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useCsrfToken } from '@/hooks/useCsrfToken'

type UpdateCreatorResponseData = {
  message?: string
  errors?: string[]
}

type UpdateCreatorProps = {
  name?: string
  bio?: string
  twitter_handle?: string
  username: string
  creatorId: number
  avatar?: File
}

const useCreatorUpdate = () => {
  const csrfToken = useCsrfToken()

  const [data, setData] = React.useState<UpdateCreatorResponseData | null>(null)
  const [errors, setErrors] = React.useState<string[] | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const updateCreator = async ({
    name,
    bio,
    twitter_handle,
    username,
    creatorId,
    avatar
  }: UpdateCreatorProps) => {
    const errorMessage = 'Error updating creator'
    const responseErrors: string[] = []

    try {
      setLoading(true)
      setErrors(null)
      setData(null)

      const response = await axios.put(
        `/creators/${creatorId}.json`,
        {
          creator: {
            bio,
            twitter_handle,
            name,
            username,
            avatar
          }
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Csrf-Token': csrfToken
          }
        }
      )

      const responseData = response.data as UpdateCreatorResponseData

      if (response.status === 200 && responseData) {
        toast.success(responseData.message)
        setData(responseData)
      } else {
        responseErrors.push(...(responseData.errors || [errorMessage]))
      }
    } catch (error: unknown) {
      // @ts-expect-error error is unknown
      if (error.response?.data?.errors?.length) {
        // @ts-expect-error error is unknown
        responseErrors.push(...error.response.data.errors)
      } else {
        responseErrors.push(errorMessage)
      }
    } finally {
      setLoading(false)

      if (responseErrors.length) {
        toast.error(responseErrors.join(', '))
        setErrors(responseErrors)
      }
    }
  }

  return {
    data,
    errors,
    loading,
    updateCreator
  }
}

export { useCreatorUpdate }
