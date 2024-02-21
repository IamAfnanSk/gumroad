import * as React from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useCsrfToken } from '@/hooks/useCsrfToken'

type DeleteProfileSectionResponseData = {
  message?: string
  data?: {
    idPositionMapping: Record<number, number>
    deletedSectionId: number
  }
  errors?: string[]
}

type DeleteProfileSectionProps = {
  sectionId: number
}

const useProfileSectionDelete = () => {
  const csrfToken = useCsrfToken()

  const [data, setData] =
    React.useState<DeleteProfileSectionResponseData | null>(null)
  const [errors, setErrors] = React.useState<string[] | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const deleteProfileSection = async ({
    sectionId
  }: DeleteProfileSectionProps) => {
    const errorMessage = `Error deleting section`
    const responseErrors: string[] = []

    try {
      setLoading(true)
      setErrors(null)
      setData(null)

      const response = await axios.delete(
        `/profiles/${sectionId}/delete_section.json`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Csrf-Token': csrfToken
          }
        }
      )

      const responseData = response.data as DeleteProfileSectionResponseData

      if (response.status === 200 && responseData) {
        toast.success(responseData.message)
        setData(responseData)
      } else {
        responseErrors.push(...(responseData.errors || [errorMessage]))
      }
    } catch (error) {
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
    deleteProfileSection
  }
}

export { useProfileSectionDelete }
