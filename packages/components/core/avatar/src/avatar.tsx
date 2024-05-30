'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { Button } from '@uidu/button-ui';
import { cn } from '@uidu/lib';
import { VariantProps, cva } from 'class-variance-authority';
import Loading from './icons/Loading';
import PencilIcon from './icons/Pencil';
import RemoveIcon from './icons/Remove';
import User from './icons/User';
import { Presence, PresenceType } from './presence';
import { Status, StatusType } from './status';

/* ------------------------- extend AvatarProps here ------------------------ */
interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  shape?: 'square' | 'circle';
  src: string;
  alt?: string;
  onClickAction?: () => void;
  typeIconAction?: 'remove' | 'edit' | React.ReactNode;
  typeFallback?: 'user' | 'loading';
  status?: StatusType;
  presence?: PresenceType;
  presenceCorner?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  presenceSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  statusSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  statusCorner?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  showStatus?: boolean;
  showPresence?: boolean;
}

/* ------------------------- extend AvatarImageProps here ------------------------ */
interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
    VariantProps<typeof avatarImageVariants> {
  appearance?: React.ReactNode | boolean;
  onClickAction?: () => void;
  typeIconAction?: 'remove' | 'edit' | React.ReactNode;
}

/* ------------------------- extend AvatarFallbackProps here ------------------------ */
interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  children?: React.ReactNode;
  typeFallback?: 'user' | 'loading';
}

/* ------------------------------ CSS Variants ------------------------------ */
const avatarVariants = cva('relative flex h-10 w-10 shrink-0 bg-transparent', {
  variants: {
    size: {
      xsmall: 'size-[16px]',
      small: 'size-[24px]',
      medium: 'size-[32px]',
      large: 'size-[40px]',
      xlarge: 'size-[96px]',
      xxlarge: 'size-[128px]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const avatarImageVariants = cva('relative overflow-hidden', {
  variants: {
    shape: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
  },
  defaultVariants: {
    shape: 'circle',
  },
});

/* -------------------------------------------------------------------------- */
/*                                   Avatar                                   */
/* -------------------------------------------------------------------------- */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      size,
      shape = 'circle',
      src,
      alt,
      onClickAction,
      typeIconAction = 'remove',
      typeFallback,
      status,
      presence,
      presenceCorner = 'topLeft',
      presenceSize = 'md',
      statusCorner = 'topLeft',
      statusSize = 'md',
      showStatus = false,
      showPresence = false,
      ...props
    },
    ref
  ) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      <AvatarImage
        shape={shape}
        src={src}
        alt={alt}
        onClickAction={onClickAction}
        typeIconAction={typeIconAction}
      />
      <AvatarFallback typeFallback={typeFallback} />
      {showPresence && (
        <Presence
          presence={presence}
          corner={presenceCorner}
          size={presenceSize}
        />
      )}
      {showStatus && (
        <Status status={status} corner={statusCorner} size={statusSize} />
      )}
    </AvatarPrimitive.Root>
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

/* -------------------------------------------------------------------------- */
/*                                 AvatarImage                                */
/* -------------------------------------------------------------------------- */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(
  (
    {
      className,
      appearance,
      shape,
      onClickAction,
      typeIconAction = 'remove',
      ...props
    },
    ref
  ) => {
    type IconType = 'remove' | 'edit';
    const iconComponents: Record<IconType, React.ReactElement> = {
      remove: (
        <RemoveIcon className="w-6 h-6 bg-red-600 absolute right-0 bottom-0 p-0.5 rounded-full" />
      ),
      edit: (
        <PencilIcon className="w-6 h-6 bg-yellow-400 absolute right-0 bottom-0 p-0.5 rounded-full" />
      ),
    };

    const isJsx = React.isValidElement(appearance);
    const isBool = typeof appearance === 'boolean';

    const isFunction = typeof onClickAction === 'function';
    const Icon =
      iconComponents[typeIconAction as IconType] ||
      (React.isValidElement(typeIconAction) &&
        (typeIconAction as React.ReactNode));

    return (
      <div className={cn(avatarImageVariants({ shape }))}>
        <AvatarPrimitive.Image
          ref={ref}
          className="w-full h-full aspect-square"
          {...props}
        />

        {isJsx && !isBool && React.cloneElement(appearance)}
        {isBool && !isJsx && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-600" />
        )}

        {isFunction && <Button onClick={onClickAction} iconAfter={Icon} />}
      </div>
    );
  }
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/* -------------------------------------------------------------------------- */
/*                               AvatarFallback                               */
/* -------------------------------------------------------------------------- */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, children, typeFallback, ...props }, ref) => {
  const isChild = !!children || !!typeFallback;

  const RenderTypeFallback = () =>
    typeFallback === 'user' ? (
      <User className="absolute inset-0 z-[99999]" />
    ) : (
      <Loading className="animate-spin bg-stone-100 absolute inset-0 z-[99999] rounded-full overflow-hidden" />
    );

  return (
    <AvatarPrimitive.Fallback
      asChild={isChild}
      ref={ref}
      className={cn(
        'absolute inset-0 flex h-full w-full items-center justify-center dark:bg-stone-800 z-[9999] bg-stone-100',
        className
      )}
      {...props}
    >
      {(isChild && children) || <RenderTypeFallback />}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
