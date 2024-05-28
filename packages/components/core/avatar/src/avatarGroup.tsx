import { Button } from '@uidu/button-ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@uidu/dropdown-menu-ui';
import { cn } from '@uidu/lib';
import { VariantProps, cva } from 'class-variance-authority';
import { FC } from 'react';
import { Avatar } from './avatar';
import { AvatarItem } from './avatarItem';

// Item Props
interface ItemProps {
  id: string;
  img: string;
  alt?: string;
  name?: string;
  shape?: 'square' | 'circle';
}

// Avatar Group props

interface AvatarGroupProps extends VariantProps<typeof avatarGroupVariants> {
  maxCount?: number;
  items: ItemProps[];
  onClickActions?: (id: string) => void;
  customAvatar?: FC<ItemProps>;
}

const avatarGroupVariants = cva('border', {
  variants: {
    variant: {
      grid: 'flex flex-wrap justify-start leading-none -mx-1 *:mb-2 *:px-1',
      stack: 'flex leading-none mr-2 *:-mr-2',
    },
  },
  defaultVariants: {
    variant: 'stack',
  },
});

/* -------------------------------------------------------------------------- */
/* Show hided Avatars */
/* -------------------------------------------------------------------------- */

const ShowMore: FC<AvatarGroupProps> = ({ items, maxCount }) => {
  const menuItems = items.slice(maxCount, items.length + 1).map((item) => (
    <DropdownMenuItem>
      <AvatarItem primaryText={item.name}>
        <Avatar
          key={item.id}
          // typeIconAction="remove"
          // onClickAction={() => onClickActions(item?.id)}
          src={item?.img}
          shape={item.shape}
        />
      </AvatarItem>
    </DropdownMenuItem>
  ));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{items.length - maxCount}+</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>{menuItems}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/* -------------------------------------------------------------------------- */
/* Avatar Group */
/* -------------------------------------------------------------------------- */

export const AvatarGroup: FC<AvatarGroupProps> = ({
  maxCount,
  variant,
  onClickActions,
  items,
  customAvatar,
}) => {
  const CustomAvatar = customAvatar;
  return (
    <div
      className={cn(
        avatarGroupVariants({
          variant,
        })
      )}
    >
      {items.slice(0, maxCount ?? items.length + 1).map(
        (item) =>
          // const Component: FC<AvatarProps> = () => component;
          !CustomAvatar ? (
            <Avatar
              key={item.id}
              // typeIconAction="remove"
              // onClickAction={() => onClickActions(item?.id)}
              src={item.img}
              shape={item.shape}
            />
          ) : (
            <CustomAvatar {...item} />
            // createElement(customAvatar, { src: item.img, shape: item.shape })
          )
        // <component key={item.id} src={item.img} shape={item.shape} />
      )}
      {items.length > maxCount && (
        <ShowMore items={items} maxCount={maxCount} />
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
