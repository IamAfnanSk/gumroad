import * as React from 'react'
import { ProfileSection } from '@/types'
import axios from 'axios'
import { toast } from 'sonner'
import { useCsrfToken } from '@/hooks/useCsrfToken'

type AddProfileSectionResponseData = {
  message?: string
  data?: {
    profileSection: Partial<ProfileSection>
    idPositionMapping: Record<number, number>
  }
  errors?: string[]
}

type AddProfileSectionProps = {
  sectionType: string
  position: number
}

const useProfileSectionAdd = () => {
  const csrfToken = useCsrfToken()

  const [data, setData] = React.useState<AddProfileSectionResponseData | null>(
    null
  )
  const [errors, setErrors] = React.useState<string[] | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const addProfileSection = async ({
    sectionType,
    position
  }: AddProfileSectionProps) => {
    const errorMessage = `Error adding a new ${sectionType} section`
    const responseErrors: string[] = []

    try {
      setLoading(true)
      setErrors(null)
      setData(null)

      const response = await axios.post(
        `/profiles/add_section.json`,
        {
          section: {
            section_type: sectionType,
            position
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Csrf-Token': csrfToken
          }
        }
      )

      const responseData = response.data as AddProfileSectionResponseData

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
    addProfileSection
  }
}

export { useProfileSectionAdd }
