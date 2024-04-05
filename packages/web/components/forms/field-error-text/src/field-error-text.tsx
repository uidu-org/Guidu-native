import { cn } from '@uidu/lib'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import { FieldError } from 'react-hook-form'
import AlertCircle from './icons/AlertCircle'

const helperTextVariants = cva('', {
  variants: {
    size: {
      sm: 'text-[11px] mt-0.5',
      md: 'text-[13px] mt-0.5',
      lg: 'text-[13px] mt-1',
      xl: 'text-sm mt-1',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface FieldErrorTextProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement>,
    VariantProps<typeof helperTextVariants> {
  as?: 'div' | 'span'
  className?: string
  error?: FieldError | string
}

export function FieldErrorText({
  size,
  as = 'div',
  children,
  error,
  className,
}: React.PropsWithChildren<FieldErrorTextProps>) {
  const Component = as
  return (
    <Component
      role="alert"
      className={cn(
        'border border-red-600 text-red-600 rounded-md px-1 text-sm flex gap-2',
        helperTextVariants({ size, className })
      )}
    >
      <AlertCircle className="w-5 h-5" />
      {error as string}
    </Component>
  )
}

FieldErrorText.displayName = 'FieldErrorText'
