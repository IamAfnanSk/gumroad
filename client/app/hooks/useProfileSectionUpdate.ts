import { CarouselImage, Product, ProfileSection } from '@/types'
import { useApiRequest } from '@/hooks/useApiRequest'

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
  | 'show_title'
  | 'show_filters'
  | 'embed_height'
  | 'embed_url'
  | 'json_content'
  | 'add_new_products_by_default'
  | 'featured_product_id'
  | 'raw_html'
> &
  Partial<{
    product_ids: number[]
    post_ids: number[]
    formData: FormData
  }> & {
    sectionId: number
  }

const useProfileSectionUpdate = () => {
  const {
    data,
    errors,
    loading,
    sendRequest,
    downloadProgress,
    uploadProgress
  } = useApiRequest()

  const updateProfileSection = async ({
    json_content,
    title,
    sectionId,
    show_title,
    show_filters,
    embed_height,
    embed_url,
    add_new_products_by_default,
    product_ids,
    post_ids,
    formData,
    featured_product_id,
    raw_html
  }: UpdateProfileSectionProps) => {
    const fallbackErrorMessage = `Error updating section`

    await sendRequest({
      url: `/profiles/${sectionId}/update_section.json`,
      method: 'put',
      data: formData
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
              featured_product_id,
              raw_html
            }
          },
      headers: {
        'Content-Type': formData ? 'multipart/form-data' : 'application/json'
      },
      fallbackErrorMessage
    })
  }

  return {
    data: data as UpdateProfileSectionResponseData | null,
    errors,
    loading,
    downloadProgress,
    uploadProgress,
    updateProfileSection
  }
}

export { useProfileSectionUpdate }
