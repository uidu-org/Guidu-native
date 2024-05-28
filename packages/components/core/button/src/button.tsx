import { Slot } from '@radix-ui/react-slot';
import { cn } from '@uidu/lib';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import Spinner from './icons/Spinner';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  asChild?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  fitContent?: boolean;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-100',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-brand-on-primary focus:ring-2 focus:ring-offset-1 focus:ring-primary hover:bg-primary/80 active:bg-primary-active',
        secondary:
          'bg-secondary text-brand-on-secondary focus:ring-2 focus:ring-offset-1 focus:ring-secondary hover:bg-secondary/80 active:bg-secondary-active',
        default:
          'bg-default text-brand-on-default focus:ring-2 focus:ring-offset-1 focus:ring-default hover:bg-default/80 active:bg-default-active',
        danger:
          'bg-danger text-brand-on-danger focus:ring-2 focus:ring-offset-1 focus:ring-danger hover:bg-danger/80 active:bg-danger-active',
        warning:
          'bg-warning text-brand-on-warning focus:ring-2 focus:ring-offset-1 focus:ring-warning hover:bg-warning/80 active:bg-warning-active',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
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
        true: 'pointer-events-none border-yellow-500 border-2',
      },
      isSelected: {
        true: 'bg-primary-active',
      },
      fitContent: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild = false,
      isLoading = false,
      isDisabled = false,
      fitContent = false,
      isSelected = false,
      iconAfter,
      iconBefore,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        disabled={isDisabled || isLoading}
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
            isLoading,
            fitContent,
            isSelected,
          })
        )}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <span className="flex items-center justify-center">
            <Spinner className="w-6 h-6 text-yellow-500 me-3 animate-spin" />
          </span>
        )}

        {iconBefore && !isLoading && (
          <span className={!!children || iconAfter ? 'mr-3' : undefined}>
            {iconBefore}
          </span>
        )}

        {children}

        {iconAfter && !isLoading && (
          <span className={!!children || iconBefore ? 'ms-3' : undefined}>
            {iconAfter}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
