import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const urlBuilder = (
  location: Location,
  path: string,
  subDomain?: string
) => {
  const { host, protocol } = location

  return subDomain ? `${protocol}//${subDomain}.${host}${path}` : path
}
