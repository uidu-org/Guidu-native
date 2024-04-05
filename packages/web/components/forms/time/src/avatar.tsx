"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@uidu/lib";
import { VariantProps, cva } from 'class-variance-authority';
import Loading from "./icons/Loading";
import User from "./icons/User";


interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
    /* ------------------------- extend AvatarProps here ------------------------ */
}

interface AvatarImageProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
    /* ------------------------- extend AvatarImageProps here ------------------------ */
}

interface AvatarFallbackProps
    extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
    /* ------------------------- extend AvatarFallbackProps here ------------------------ */
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
            shape: "circle"
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
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
    />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName



/* -------------------------------------------------------------------------- */
/*                               AvatarFallback                               */
/* -------------------------------------------------------------------------- */
const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    AvatarFallbackProps
>(({ className, children, typeFallback, ...props }, ref) => {


    const isChild = !!children || !!typeFallback

    const RenderTypeFallback = () => typeFallback === "user" ? (<User />) : (<Loading className="animate-spin" />)

    return (
        <AvatarPrimitive.Fallback
            asChild={isChild}
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800",
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

