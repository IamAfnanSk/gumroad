import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const urlBuilder = (path: string, subDomain?: string) => {
  const { host, protocol } = location

  if (subDomain !== undefined) {
    const parts = host.split('.')
    if (parts.length === 3) parts.shift()
    const domain = parts.join('.')
    if (subDomain !== '') return `${protocol}//${subDomain}.${domain}${path}`
    return `${protocol}//${domain}${path}`
  }

  return `${protocol}//${host}${path}`
}

export const isActivePath = ({
  activePaths,
  path
}: {
  activePaths?: string[]
  path: string
}) => {
  return (activePaths || [path]).some(
    (activePath) =>
      location.pathname === activePath || location.pathname === `${activePath}/`
  )
}
