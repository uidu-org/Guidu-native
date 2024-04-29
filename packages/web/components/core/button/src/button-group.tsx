import { ButtonProps } from './button';

export type ButtonGroupProps = ButtonProps;

export function ButtonGroup({
  variant,
  className,
  size,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div className="flex items-center justify-around gap-3">{children}</div>
  );
}
