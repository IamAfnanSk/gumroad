import { useApiRequest } from '@/hooks/useApiRequest'

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
  const {
    data,
    errors,
    loading,
    downloadProgress,
    uploadProgress,
    sendRequest
  } = useApiRequest()

  const deleteProfileSection = async ({
    sectionId
  }: DeleteProfileSectionProps) => {
    const fallbackErrorMessage = `Error deleting section`

    await sendRequest({
      url: `/profiles/${sectionId}/delete_section.json`,
      method: 'delete',
      fallbackErrorMessage
    })
  }

  return {
    data: data as DeleteProfileSectionResponseData | null,
    errors,
    loading,
    downloadProgress,
    uploadProgress,
    deleteProfileSection
  }
}

export { useProfileSectionDelete }
