import * as React from 'react'
import { CarouselImage, Product, ProfileSection } from '@/types'
import axios from 'axios'
import { toast } from 'sonner'
import { useCsrfToken } from '@/hooks/useCsrfToken'

type UpdateProfileSectionResponseData = {
  message?: string
  data?: {
    carouselImages?: CarouselImage[]
    featuredProduct?: Partial<Product>
  }
  errors?: string[]
}

type UpdateProfileSectionProps = Pick<
  Partial<ProfileSection>,
  | 'title'
  | 'id'
  | 'show_title'
  | 'show_filters'
  | 'embed_height'
  | 'embed_url'
  | 'json_content'
  | 'add_new_products_by_default'
  | 'featured_product_id'
> &
  Partial<{
    product_ids: number[]
    post_ids: number[]
    formData: FormData
  }>

const useProfileSectionUpdate = () => {
  const csrfToken = useCsrfToken()

  const [data, setData] =
    React.useState<UpdateProfileSectionResponseData | null>(null)
  const [errors, setErrors] = React.useState<string[] | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const updateProfileSection = async ({
    json_content,
    title,
    id,
    show_title,
    show_filters,
    embed_height,
    embed_url,
    add_new_products_by_default,
    product_ids,
    post_ids,
    formData,
    featured_product_id
  }: UpdateProfileSectionProps) => {
    const errorMessage = `Error updating section`
    const responseErrors: string[] = []

    try {
      setLoading(true)

      const response = await axios.put(
        `/profiles/${id}/update_section.json`,
        formData
          ? formData
          : {
              section: {
                json_content,
                title,
                show_title,
                show_filters,
                embed_height,
                embed_url,
                add_new_products_by_default,
                product_ids,
                post_ids,
                featured_product_id
              }
            },
        {
          headers: {
            'Content-Type': formData
              ? 'multipart/form-data'
              : 'application/json',
            'X-Csrf-Token': csrfToken
          }
        }
      )

      const responseData = response.data as UpdateProfileSectionResponseData

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
    updateProfileSection
  }
}

export { useProfileSectionUpdate }
