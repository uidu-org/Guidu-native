"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { Button } from "@uidu/button-ui";
import { cn } from "@uidu/lib";
import { VariantProps, cva } from 'class-variance-authority';
import Loading from "./icons/Loading";
import PencilIcon from "./icons/Pencil";
import RemoveIcon from "./icons/Remove";
import User from "./icons/User";


/* ------------------------- extend AvatarProps here ------------------------ */
interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
}

/* ------------------------- extend AvatarImageProps here ------------------------ */
interface AvatarImageProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
    appearance?: React.ReactNode | boolean;
    onClickAction?: () => void
    typeIconAction?: "remove" | "edit" | React.ReactNode
}

/* ------------------------- extend AvatarFallbackProps here ------------------------ */
interface AvatarFallbackProps
    extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
    children?: React.ReactNode;
    typeFallback?: "user" | "loading"
}


/* ------------------------------ CSS Variants ------------------------------ */
const avatarVariants = cva(
    "relative flex h-10 w-10 shrink-0 overflow-hidden",
    {
        variants: {
            size: {
                small: " h-8  w-8",
                medium: "h-16 w-16",
                large: "h-28 w-28",
            },
            shape: {
                circle: "rounded-full",
                square: "rounded-none"
            }
        },
        defaultVariants: {
            size: "medium",
            shape: "square"
        }
    }
)


/* -------------------------------------------------------------------------- */
/*                                   Avatar                                   */
/* -------------------------------------------------------------------------- */
const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(({ className, shape, size, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn(
            avatarVariants({ shape, size }),
            className
        )}
        {...props}
    />
))
Avatar.displayName = AvatarPrimitive.Root.displayName



/* -------------------------------------------------------------------------- */
/*                                 AvatarImage                                */
/* -------------------------------------------------------------------------- */
const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    AvatarImageProps
>(({ className, appearance, onClickAction, typeIconAction = "remove", ...props }, ref) => {

    type IconType = "remove" | "edit";
    const iconComponents: Record<IconType, React.ReactElement> = {
        remove: <RemoveIcon className="w-6 h-6 bg-red-600 absolute right-0 bottom-0 p-0.5 rounded-full" />,
        edit: <PencilIcon className="w-6 h-6 bg-yellow-400 absolute right-0 bottom-0 p-0.5 rounded-full" />,
    };

    const isJsx = React.isValidElement(appearance)
    const isBool = typeof appearance === "boolean"

    const isFunction = typeof onClickAction === "function"
    const Icon = iconComponents[typeIconAction as IconType] || (React.isValidElement(typeIconAction) && typeIconAction as React.ReactNode);

    return (
        <div className="relative">

            <AvatarPrimitive.Image
                ref={ref}
                className={cn("aspect-square h-full w-full rounded-full", className)}
                {...props}
            />

            {isJsx && !isBool && React.cloneElement(appearance)}
            {isBool && !isJsx && < span className="absolute top-0 right-0 bg-green-600 w-4 h-4 rounded-full" />}

            {isFunction && (
                <Button onClick={onClickAction} iconAfter={Icon} />
            )}

        </div>
    )
}
)
AvatarImage.displayName = AvatarPrimitive.Image.displayName



/* -------------------------------------------------------------------------- */
/*                               AvatarFallback                               */
/* -------------------------------------------------------------------------- */
const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    AvatarFallbackProps
>(({ className, children, typeFallback, ...props }, ref) => {


    const isChild = !!children || !!typeFallback

    const RenderTypeFallback = () => typeFallback === "user" ? (<User className="absolute inset-0 z-[99999]" />) : (<Loading className="animate-spin bg-stone-100 absolute inset-0 z-[99999] rounded-full overflow-hidden" />)

    return (
        <AvatarPrimitive.Fallback
            asChild={isChild}
            ref={ref}
            className={cn(
                "absolute inset-0 flex h-full w-full items-center justify-center dark:bg-stone-800 z-[9999] bg-stone-100",
                className
            )}
            {...props}
        >
            {isChild && children || <RenderTypeFallback />}
        </AvatarPrimitive.Fallback>
    )
}
)
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage };

