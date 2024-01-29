"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { FieldErrorText } from "@uidu/field-error-text-ui"
import { FieldHelperText } from "@uidu/field-helper-text-ui"
import { cn } from "@uidu/lib"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"
import Check from "./icons/Check"

//todo: checked | value

/* ------------------------ extend CheckboxBase here ------------------------ */
interface CheckboxBaseProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  //checkbox
  disabled?: boolean;
  checkboxVariant?: VariantProps<typeof checkboxVariants>
  value?: any
  checked?: boolean
  //icon
  icon?: React.ReactNode
  iconClassName?: string
  //label
  labelVariant?: VariantProps<typeof labelVariants>
  labelPlacement?: "top" | "right" | "left"
  label?: string
  labelClassName?: string;
  //helper
  helperText?: string
  helperClassName?: string;
  //error
  error?: string
  errorClassName?: string;
}

const checkboxVariants = cva(
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



const CheckboxBase = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxBaseProps
>(({ className, disabled, icon = <Check className="h-3 w-3" />, checked,
  id,
  name,
  labelVariant,
  labelPlacement = "right",
  label,
  labelClassName,
  helperClassName,
  helperText,
  error,
  errorClassName,
  ...props }, ref) => {

  return (
    <div>
      <div className="flex items-center mb-1">
        <CheckboxPrimitive.Root
          ref={ref}
          disabled={disabled}
          style={{
            width: 20,
            height: 20
          }}
          className={cn(
            "bg-transparent border-2 border-black rounded-md flex items-center justify-center shadow-md focus:border-black focus:shadow-black", !!error && "border-red-600", className
          )}
          id={id}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn("checked:bg-black focus:shadow-md transition duration-400 ease-in-out")}
          >
            {icon}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>


        {label && <label className={cn("ms-3", labelClassName)} htmlFor={id}>{label}</label>}
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
        >
          {error}
        </FieldErrorText>
      )}
    </div>
  )
})
CheckboxBase.displayName = CheckboxPrimitive.Root.displayName

export { CheckboxBase }
