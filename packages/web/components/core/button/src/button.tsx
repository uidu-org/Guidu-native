import { Slot } from '@radix-ui/react-slot'
import { cn } from '@uidu/lib'
import { cva, VariantProps, } from 'class-variance-authority'
import * as React from 'react'
import Spinner from './icons/Spinner'



interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  asChild?: boolean
  isLoading?: boolean;
  isDisabled?: boolean;
  fitContent?: boolean;
  iconBefore?: React.ReactNode
  iconAfter?: React.ReactNode
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-400',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border rounded-xl border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      isLoading: {
        true: "pointer-events-none border-red-500 border-2"
      },
      fitContent: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: 'link',
      size: 'default',
    },
  }
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, asChild = false, isLoading = false, isDisabled = false, fitContent = false, iconAfter, iconBefore, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp disabled={isDisabled || isLoading} className={cn(buttonVariants({ variant, size, className, isLoading, fitContent }))} ref={ref} {...props}>
        {isLoading && <Spinner className='me-3 animate-spin' />}

        {iconBefore && !isLoading && (
          <span className={!!children ? "mr-3" : undefined}>
            {iconBefore}
          </span>
        )}

        {children}

        {iconAfter && !isLoading && (
          <span className={!!children || iconBefore ? "ms-3" : undefined} >
            {iconAfter}
          </span>
        )}

      </Comp>
    )
  }
)
Button.displayName = 'Button'


export { Button, buttonVariants }
export type { ButtonProps }

