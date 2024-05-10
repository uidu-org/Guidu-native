import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'

import { Button } from '@uidu/button-ui'
import { cn } from '@uidu/lib'

export interface PopoverProps {
  children?: React.ReactNode
  content?: React.ReactNode
  offset?: number
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

const PopoverRoot = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-[999999] w-72 rounded-md border border-stone-200 bg-white p-4 text-stone-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const Popover = ({ children, content, offset = 5, placement }: PopoverProps) => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        {children ?? <Button variant={'default'}>HoverMe</Button>}
      </PopoverTrigger>
      <PopoverContent side={placement} sideOffset={offset}>
        {content}
      </PopoverContent>
    </PopoverRoot>
  )
}

export { Popover, PopoverContent, PopoverRoot, PopoverTrigger }
