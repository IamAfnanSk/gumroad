import { useApiRequest } from '@/hooks/useApiRequest'

type UpdateProfileSectionPositionResponseData = {
  message?: string
  data?: {
    idPositionMapping: Record<number, number>
  }
  errors?: string[]
}

type UpdateProfileSectionPositionProps = {
  direction: 'up' | 'down'
  sectionId: number
}

const useProfileSectionPositionUpdate = () => {
  const {
    data,
    errors,
    loading,
    sendRequest,
    downloadProgress,
    uploadProgress
  } = useApiRequest()

  const updateProfileSectionPosition = async ({
    sectionId,
    direction
  }: UpdateProfileSectionPositionProps) => {
    const fallbackErrorMessage = `Error updating section position`

    await sendRequest({
      url: `/profiles/${sectionId}/update_section_positions.json`,
      method: 'put',
      data: {
        section: {
          where_to_move: direction
        }
      },
      fallbackErrorMessage
    })
  }

  return {
    data: data as UpdateProfileSectionPositionResponseData | null,
    errors,
    loading,
    downloadProgress,
    uploadProgress,
    updateProfileSectionPosition
  }
}

export { useProfileSectionPositionUpdate }
