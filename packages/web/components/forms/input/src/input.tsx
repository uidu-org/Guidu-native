import { FieldErrorText } from "@uidu/field-error-text-ui";
import { FieldHelperText } from "@uidu/field-helper-text-ui";
import { cn } from "@uidu/lib";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { FieldError } from "react-hook-form";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputVariants?: VariantProps<typeof inputVariants>
  disabled?: boolean;
  //label
  labelVariant?: VariantProps<typeof labelVariants>
  inLine?: boolean
  label?: string
  labelClassName?: string;
  //helper
  helperText?: string
  helperClassName?: string;
  //error
  error?: FieldError | string
  errorClassName?: string;
}

const labelVariants = cva(
  'peer checked:bg-none focus:ring-offset-background transition duration-200 ease-in-out',
  {
    variants: {

      variant: {
        outline:
          'bg-transparent border border-muted ring-[0.6px] ring-muted focus:ring-muted checked:!bg-primary checked:!border-primary hover:enabled:border-primary',
        flat: 'border-0 bg-muted/70 backdrop-blur hover:enabled:bg-muted focus:ring-muted checked:!bg-primary',
      },
      disabled: {
        true: 'disabled:bg-muted/70 disabled:backdrop-blur disabled:border-muted',
      },
      size: {
        sm: 'h-5 w-5',
        md: 'h-6 w-6',
        lg: 'h-7 w-7',
        xl: 'h-8 w-8',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded',
        lg: 'rounded-md',
        full: 'rounded-full',
      },
      activeIcon:
      {
        true: 'peer-checked:opacity-100 absolute opacity-0 top-0 left-0 text-primary-foreground'
      },
    },
    defaultVariants: {
      size: "md",
      variant: "outline"
    }
  }

)

const inputVariants = cva(
  'peer checked:bg-none focus:ring-offset-background transition duration-200 ease-in-out',
  {
    variants: {

      variant: {
        outline:
          'bg-transparent border border-muted ring-[0.6px] ring-muted focus:ring-muted checked:!bg-primary checked:!border-primary hover:enabled:border-primary',
        flat: 'border-0 bg-muted/70 backdrop-blur hover:enabled:bg-muted focus:ring-muted checked:!bg-primary',
      },
      disabled: {
        true: 'disabled:bg-muted/70 disabled:backdrop-blur disabled:border-muted',
      },
      size: {
        sm: 'h-5 w-5',
        md: 'h-6 w-6',
        lg: 'h-7 w-7',
        xl: 'h-8 w-8',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded',
        lg: 'rounded-md',
        full: 'rounded-full',
      },
      activeIcon:
      {
        true: 'peer-checked:opacity-100 absolute opacity-0 top-0 left-0 text-primary-foreground'
      },
    },
    defaultVariants: {
      size: "md",
      variant: "outline"
    }
  }

)

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, label, labelClassName, id, inLine = false, error, helperText, helperClassName, errorClassName, ...props }, ref) => {
    return (


      <div>
        <div className={"space-y-2 mb-1"}>

          {label && <label className={cn("", labelClassName)} htmlFor={id}>{label}</label>}

          <input
            id={id}
            type={type}
            className={cn(
              "flex h-8 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              !!error && "border-red-600",
              className
            )}
            ref={ref}
            disabled={disabled}

            {...props}
          />
        </div>

        {!error && helperText && (
          <FieldHelperText
            className={cn(
              disabled && 'text-muted-foreground',
              helperClassName
            )}
          >
            {helperText}
          </FieldHelperText>

        )}

        {error && (
          <FieldErrorText
            className={cn(errorClassName)}
            error={error}
          />
        )}

      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, InputProps };

