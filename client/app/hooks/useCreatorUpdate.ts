import { useApiRequest } from '@/hooks/useApiRequest'

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
  theme?: string
}

const useCreatorUpdate = () => {
  const {
    data,
    errors,
    loading,
    sendRequest,
    downloadProgress,
    uploadProgress
  } = useApiRequest()

  const updateCreator = async ({
    name,
    bio,
    twitter_handle,
    username,
    creatorId,
    avatar,
    theme
  }: UpdateCreatorProps) => {
    const fallbackErrorMessage = 'Error updating creator'

    await sendRequest({
      url: `/creators/${creatorId}.json`,
      method: 'put',
      data: {
        creator: {
          bio,
          twitter_handle,
          name,
          username,
          avatar,
          theme
        }
      },
      headers: {
        'Content-Type': avatar ? 'multipart/form-data' : 'application/json'
      },
      fallbackErrorMessage
    })
  }

  return {
    data: data as UpdateCreatorResponseData | null,
    errors,
    loading,
    downloadProgress,
    uploadProgress,
    updateCreator
  }
}

export { useCreatorUpdate }
