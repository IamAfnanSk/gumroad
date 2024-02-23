import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { useCsrfToken } from '@/hooks/useCsrfToken'
import * as React from 'react'

type ApiRequestConfig = AxiosRequestConfig & {
  fallbackErrorMessage?: string
}

const useApiRequest = () => {
  const csrfToken = useCsrfToken()

  const [data, setData] = useState<unknown | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [downloadProgress, setDownloadProgress] = useState<number>(0)

  const [cancelSource, setCancelSource] = useState<CancelTokenSource | null>(
    null
  )

  React.useEffect(() => {
    return () => {
      if (cancelSource) {
        cancelSource.cancel('Request canceled by cleanup')
      }
    }
  }, [cancelSource])

  const sendRequest = async ({
    url,
    method,
    data: requestData,
    headers,
    fallbackErrorMessage
  }: ApiRequestConfig) => {
    const errorMessage = fallbackErrorMessage || `Error processing request`
    const responseErrors: string[] = []

    if (cancelSource) {
      cancelSource.cancel('Request canceled')
    }

    const source = axios.CancelToken.source()
    setCancelSource(source)

    try {
      setLoading(true)
      setErrors(null)
      setData(null)
      setUploadProgress(0)
      setDownloadProgress(0)

      const response = await axios({
        url,
        method,
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          'X-Csrf-Token': csrfToken,
          ...headers
        },
        onUploadProgress: (progressEvent) => {
          // update uploadProgress up till 2 decimal places only
          setUploadProgress(
            parseFloat(((progressEvent.progress || 0) * 100).toFixed(2))
          )
        },
        onDownloadProgress: (progressEvent) => {
          parseFloat(((progressEvent.progress || 0) * 100).toFixed(2))
        },
        cancelToken: source.token
      })

      const responseData = response.data

      if (response.status === 200 && responseData) {
        toast.success(responseData.message)
        setData(responseData)
      } else {
        responseErrors.push(...(responseData.errors || [errorMessage]))
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      } else if (axios.isAxiosError(error)) {
        const response = error.response
        if (response && response.data.errors.length) {
          responseErrors.push(...response.data.errors)
        } else {
          responseErrors.push(errorMessage)
        }
      } else {
        responseErrors.push(errorMessage)
      }
    } finally {
      setLoading(false)

      if (responseErrors.length) {
        toast.error(responseErrors.join(', '))
        setErrors(responseErrors)
      }

      setUploadProgress(0)
      setDownloadProgress(0)
    }
  }

  return {
    data,
    errors,
    loading,
    uploadProgress,
    downloadProgress,
    sendRequest
  }
}

export { useApiRequest }
