import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LoadingSpinnerSVG } from './icons/loading-spinner'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { LoadingSpinnerSVG, cn }
