import { cn } from '@holo/lib';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

/* -------------------------------------------------------------------------- */
/*                                 Status Type                                */
/* -------------------------------------------------------------------------- */

export type StatusType = ('declined' | 'approved' | 'locked') | ReactNode;

/* -------------------------------------------------------------------------- */
/*                            StatusWrapper Props                             */
/* -------------------------------------------------------------------------- */

interface StatusProps extends FC, VariantProps<typeof statusVariants> {
  status: StatusType;
}

/* -------------------------------------------------------------------------- */
/*                                 Status Props                               */
/* -------------------------------------------------------------------------- */

interface StatusItemProps {
  status?: StatusType;
}

/* -------------------------------------------------------------------------- */
/*                                    Status                                  */
/* -------------------------------------------------------------------------- */

const statusVariants = cva('absolute pointer-events-none', {
  variants: {
    corner: {
      topLeft: 'top-0 left-0',
      topRight: 'top-0 right-0',
      bottomLeft: 'bottom-0 left-0',
      bottomRight: 'bottom-0 right-0',
    },
    size: {
      xs: 'size-0',
      sm: 'size-[12px]',
      md: 'size-[14px]',
      lg: 'size-[15px]',
      xl: 'size-[18px]',
      xxl: 'size-[0px]',
    },
  },
  defaultVariants: {
    corner: 'topLeft',
    size: 'md',
  },
});

export const Status: FC<StatusProps> = ({ corner, size, status }) => (
  <span
    className={cn(
      statusVariants({
        corner,
        size,
      })
    )}
  >
    <StatusItem status={status} />
  </span>
);
Status.displayName = 'Status';

/* -------------------------------------------------------------------------- */
/*                                   getStatusSVG                             */
/* -------------------------------------------------------------------------- */

const Svg: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    height="100%"
    version="1.1"
    viewBox="0 0 8 8"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
);
Svg.displayName = 'Svg';

const ApprovedCircle: FC<React.SVGProps<SVGSVGElement>> = ({ cx, cy, r }) => (
  <circle
    className="fill-uiduThemes-green-400 dark:fill-uiduThemes-green-300"
    cx={cx}
    cy={cy}
    r={r}
  />
);
ApprovedCircle.displayName = 'ApprovedCircle';

const ApprovedPath: FC<React.SVGProps<SVGSVGElement>> = ({ d }) => (
  <path
    className="fill-uiduThemes-neutral-0 dark:fill-uiduThemes-darkNeutral-30"
    d={d}
  />
);
ApprovedPath.displayName = 'ApprovedPath';

const DeclinedCircle: FC<React.SVGProps<SVGSVGElement>> = ({ cx, cy, r }) => (
  <circle
    className="fill-uiduThemes-red-400 dark:fill-uiduThemes-red-300"
    cx={cx}
    cy={cy}
    r={r}
  />
);
DeclinedCircle.displayName = 'DeclinedCircle';

const DeclinedPath: FC<React.SVGProps<SVGSVGElement>> = ({ d }) => (
  <path
    className="fill-uiduThemes-neutral-0 dark:fill-uiduThemes-darkNeutral-30"
    d={d}
  />
);
DeclinedPath.displayName = 'DeclinedPath';

const LockedCircle: FC<React.SVGProps<SVGSVGElement>> = ({ cx, cy, r }) => (
  <circle
    className="fill-uiduThemes-neutral-40 dark:fill-uiduThemes-darkNeutral-800"
    cx={cx}
    cy={cy}
    r={r}
  />
);
LockedCircle.displayName = 'LockedCircle';

const LockedPath: FC<React.SVGProps<SVGSVGElement>> = ({ d }) => (
  <path
    className="fill-uiduThemes-neutral-500 dark:fill-uiduThemes-darkNeutral-30"
    d={d}
  />
);
LockedPath.displayName = 'LockedPath';

const getStatusSVG = (status: StatusType) => {
  switch (status) {
    case 'approved':
      return (
        <Svg>
          <ApprovedCircle cx="4" cy="4" r="4" />
          <ApprovedPath d="M2.47140452,3.52859548 C2.21105499,3.26824595 1.78894501,3.26824595 1.52859548,3.52859548 C1.26824595,3.78894501 1.26824595,4.21105499 1.52859548,4.47140452 L2.86192881,5.80473785 C3.12227834,6.06508738 3.54438833,6.06508738 3.80473785,5.80473785 L6.47140452,3.13807119 C6.73175405,2.87772166 6.73175405,2.45561167 6.47140452,2.19526215 C6.21105499,1.93491262 5.78894501,1.93491262 5.52859548,2.19526215 L3.33333333,4.39052429 L2.47140452,3.52859548 Z" />
        </Svg>
      );
    case 'declined':
      return (
        <Svg>
          <DeclinedCircle cx="4" cy="4" r="4" />
          <DeclinedPath d="M4.890661,4.0088336 L5.81806461,3.07802178 C6.06167933,2.83351177 6.06048933,2.43826992 5.81540668,2.19522442 C5.57032402,1.95217891 5.17415651,1.95336612 4.93054179,2.19787613 L4.00765946,3.12415007 L3.06906871,2.18377143 C2.82523777,1.93947602 2.42906937,1.93863765 2.18420182,2.18189887 C1.93933427,2.42516008 1.93849394,2.82040282 2.18232488,3.06469822 L3.12544091,4.00961077 L2.20275024,4.93569234 C1.95913552,5.18020236 1.96032551,5.5754442 2.20540817,5.81848971 C2.45049083,6.06153521 2.84665833,6.060348 3.09027306,5.81583799 L4.00844245,4.89429431 L4.9092123,5.79678001 C5.15304324,6.04107541 5.54921164,6.04191379 5.79407919,5.79865257 C6.03894674,5.55539135 6.03978708,5.16014862 5.79595614,4.91585321 L4.890661,4.0088336 Z" />
        </Svg>
      );
    case 'locked':
      return (
        <Svg>
          <LockedCircle cx="4" cy="4" r="4" />
          <LockedPath d="M4.13074827,1.21766493 L4.10368158,1.21766493 C3.36340745,1.21766493 2.76388015,1.80793503 2.76388015,2.5367787 L2.76388015,3.21632216 L3.44054754,3.21632216 L3.44054754,2.54344089 C3.44054754,2.17901906 3.74031119,1.88388401 4.11044825,1.88388401 L4.1239816,1.88388401 C4.49411866,1.88388401 4.79388232,2.17901906 4.79388232,2.54344089 L4.79388232,3.21632216 L5.47054971,3.21632216 L5.47054971,2.5367787 C5.47054971,1.80793503 4.8710224,1.21766493 4.13074827,1.21766493 M2.76388015,3.21632216 L3.44054754,3.21632216 L3.44054754,3.88254123 L2.76388015,3.88254123 L2.76388015,3.21632216 Z M4.79388232,3.21632216 L5.47054971,3.21632216 L5.47054971,3.88254123 L4.79388232,3.88254123 L4.79388232,3.21632216 Z M4.79401765,3.88254123 L3.44068287,3.88254123 L2.76401548,3.88254123 C2.39049508,3.88254123 2.08734809,4.18100738 2.08734809,4.54876031 L2.08734809,5.54808892 C2.08734809,6.10000287 2.53735205,6.54741753 3.09094491,6.54741753 L5.14375561,6.54741753 C5.69802683,6.54741753 6.14735243,6.10385072 6.14735243,5.54808892 L6.14735243,4.54876031 C6.14735243,4.18100738 5.84420544,3.88254123 5.47068504,3.88254123 L4.79401765,3.88254123 Z" />
        </Svg>
      );
    default:
      return null;
  }
};

/* -------------------------------------------------------------------------- */
/*                               Status Item                                  */
/* -------------------------------------------------------------------------- */

export const StatusItem: FC<StatusItemProps> = ({ status }) => {
  const customStatus = typeof status === 'object' ? status : null;
  return (
    <span
      id="outer"
      className="size-[100%] flex items-center justify-center rounded-[50%] box-border overflow-hidden"
    >
      <span
        id="inner"
        className="size-[100%] flex justify-center items-center overflow-hidden rounded-[50%]"
      >
        {customStatus || (status && getStatusSVG(status))}
      </span>
    </span>
  );
};
StatusItem.displayName = 'StatusItem';
