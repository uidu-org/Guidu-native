import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface AvatarGroupProps {
  maxCount?: number;
  onClickActions: (id: string) => void;
  items: { id: string; img: string }[];
}

export function AvatarGroup({
  maxCount,
  onClickActions,
  items,
}: AvatarGroupProps) {
  return (
    <>
      {items.slice(0, maxCount ?? items.length + 1).map((item) => (
        <Avatar key={item.id}>
          <AvatarImage
            typeIconAction="remove"
            onClickAction={() => onClickActions(item?.id)}
            src={item?.img}
          />
          <AvatarFallback typeFallback="loading" />
        </Avatar>
      ))}
    </>
  );
}
