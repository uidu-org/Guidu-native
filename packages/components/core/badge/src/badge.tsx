import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { FormatValue } from './FormatValue';

import { cn } from '@holo/lib';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-stone-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 dark:border-stone-800 dark:focus:ring-stone-300',
  {
    variants: {
      variant: {
        // outline: 'text-stone-950 dark:text-stone-50',

        default:
          'border-transparent bg-uiduThemes-neutral-40 text-uiduThemes-neutral-800 hover:bg-uiduThemes-neutral-40/80 dark:bg-uiduThemes-darkNeutral-70 dark:text-uiduThemes-darkNeutral-900 dark:hover:bg-uiduThemes-darkNeutral-70/80',
        added:
          'border-transparent bg-uiduThemes-green-50 text-uiduThemes-green-500 hover:bg-uiduThemes-green-50/80',
        important:
          'border-transparent bg-uiduThemes-red-400 text-uiduThemes-neutral-0 hover:bg-uiduThemes-red-400/80',
        primary:
          'border-transparent bg-uiduThemes-blue-400 text-uiduThemes-neutral-0 hover:bg-uiduThemes-blue-400/80 dark:bg-uiduThemes-blue-100 dark:text-uiduThemes-darkNeutral-0 dark:hover:bg-uiduThemes-blue-100/80',
        primaryInverted:
          'border-transparent bg-uiduThemes-neutral-0 text-uiduThemes-blue-500 hover:bg-uiduThemes-neutral-0/80 dark:bg-uiduThemes-darkNeutral-400 dark:text-uiduThemes-darkNeutral-0 dark:hover:bg-uiduThemes-darkNeutral-400/80',
        removed:
          'border-transparent bg-uiduThemes-red-50 text-uiduThemes-red-500 hover:bg-uiduThemes-red-50/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: number | string;
  max?: number;
  testId?: string;
}

function Badge({
  className,
  variant,
  children = 0,
  max = 99,
  testId,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {typeof children === 'string' ? (
        children
      ) : (
        <FormatValue max={max}>{children}</FormatValue>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
