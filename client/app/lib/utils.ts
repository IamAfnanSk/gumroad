import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const urlBuilder = (
  location: Location,
  path: string,
  subDomain?: string,
  popSubdomain?: boolean
) => {
  const { host, protocol } = location

  if (popSubdomain) {
    const parts = host.split('.')
    parts.shift()
    return subDomain
      ? `${protocol}//${subDomain}.${parts.join('.')}${path}`
      : path
  }

  return subDomain ? `${protocol}//${subDomain}.${host}${path}` : path
}
