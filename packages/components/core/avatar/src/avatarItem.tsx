import { FC, ReactNode } from 'react';

interface ItemsProps {
  children: ReactNode;
  truncate?: boolean;
}

interface AvatarItemProps {
  children: ReactNode;
  href?: string;
  isDisabled?: boolean;
  primaryText?: ReactNode;
  secondaryText?: ReactNode;
  target?: '_blank' | '_self' | '_top' | '_parent';
  enableTextTruncate?: boolean;
}

const Content: FC<ItemsProps> = ({ truncate, children }) => (
  <div
    className={`flex-grow-1 flex-shrink-1 flex-basis-[100%] leading-1.4 pl-2 ${truncate && 'max-w-[100%] min-w-0'} `} // padding provvisorio da sistemare
  >
    {children}
  </div>
);
Content.displayName = 'Content';

const PrimaryText: FC<ItemsProps> = ({ truncate, children }) => (
  <div
    className={`text-uiduThemes-neutral-900 dark:text-uiduThemes-darkNeutral-600 ${truncate && 'truncate'}`}
  >
    {children}
  </div>
);
PrimaryText.displayName = 'PrimaryText';

const SecondaryText: FC<ItemsProps> = ({ truncate, children }) => (
  <div
    className={`text-uiduThemes-neutral-200 dark:text-uiduThemes-darkNeutral-300 text-[0.85rem] ${truncate && 'truncate'}`}
  >
    {children}
  </div>
);
SecondaryText.displayName = 'SecondaryText';

export const AvatarItem: FC<AvatarItemProps> = ({
  href,
  isDisabled = false,
  primaryText,
  secondaryText,
  target,
  enableTextTruncate = true,
  children,
  ...props
}) => (
  <div className="flex flex-row items-center">
    {children}
    <Content truncate={enableTextTruncate}>
      <PrimaryText truncate={enableTextTruncate}>{primaryText}</PrimaryText>
      <SecondaryText truncate={enableTextTruncate}>
        {secondaryText}
      </SecondaryText>
    </Content>
  </div>
);

AvatarItem.displayName = 'AvatarItem';
