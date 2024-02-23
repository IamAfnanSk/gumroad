import { ProfileSection } from '@/types'
import { useApiRequest } from '@/hooks/useApiRequest'

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
  const {
    data,
    errors,
    loading,
    downloadProgress,
    uploadProgress,
    sendRequest
  } = useApiRequest()

  const addProfileSection = async ({
    sectionType,
    position
  }: AddProfileSectionProps) => {
    const fallbackErrorMessage = `Error adding a new ${sectionType} section`

    await sendRequest({
      url: `/profiles/add_section.json`,
      method: 'post',
      data: {
        section: {
          section_type: sectionType,
          position
        }
      },
      fallbackErrorMessage
    })
  }

  return {
    data: data as AddProfileSectionResponseData | null,
    errors,
    loading,
    downloadProgress,
    uploadProgress,
    addProfileSection
  }
}

export { useProfileSectionAdd }
