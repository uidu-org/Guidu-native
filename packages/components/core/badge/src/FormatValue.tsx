import { FC } from 'react';

interface Props {
  children?: number;
  max?: number;
}

export const FormatValue: FC<Props> = (props) => {
  let formattedValue: number | string = '';
  let { children = 0, max = 0 } = props;

  if (children < 0) {
    children = 0;
  }

  if (max < 0) {
    max = 0;
  }

  if (max && max < children) {
    formattedValue = `${max}+`;
  } else if (children === Infinity) {
    formattedValue = '∞';
  } else {
    formattedValue = children;
  }

  return <span>{formattedValue}</span>;
};
