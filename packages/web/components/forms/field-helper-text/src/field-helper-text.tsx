import { cn } from '@uidu/lib';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import MessageCircleWarning from './icons/MessageCircleWarning';

const helperTextVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: 'text-[11px] mt-0.5',
        md: 'text-[13px] mt-0.5',
        lg: 'text-[13px] mt-1',
        xl: 'text-sm mt-1',
      },
    },
    defaultVariants: {
      size: "md"
    }
  }
)

export interface FieldHelperTextProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement>,
  VariantProps<typeof helperTextVariants> {
  as?: 'div' | 'span';
  className?: string;
}

export function FieldHelperText({
  size,
  as = 'div',
  children,
  className,
}: React.PropsWithChildren<FieldHelperTextProps>) {
  const Component = as;
  return (
    <Component
      role="alert"
      className={cn("border border-zinc-600 text-zinc-600 rounded-md px-1 text-sm flex gap-2", helperTextVariants({ size, className }))}
    >
      <MessageCircleWarning className='w-5 h-5' />
      {children}
    </Component>
  );
}

FieldHelperText.displayName = 'FieldHelperText';
