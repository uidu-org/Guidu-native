import { FC, ReactNode } from 'react';

type PresenceType = ('online' | 'busy' | 'focus' | 'offline') | ReactNode;

interface PresenceProps {
  // extends VariantProps<typeof presenceVariants>
  presence?: PresenceType;
  children?: ReactNode;
}

// const presenceLayout =

// const presenceVariants = cva(
//   'inline-flex items-center rounded-full border border-stone-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 dark:border-stone-800 dark:focus:ring-stone-300',
//   {
//     variants: {
//       variant: {
//         online:"border" ,
//         busy:"border" ,
//         focus: "border",
//         offline: "border",
//       },
//     },
//     defaultVariants: {
//       variant: 'online',
//     },
//     size: {
//       sm: 'p-1',
//       md: 'p-2',
//       lg: 'p-3',

//     }
//   }
// );

/* -------------------------------------------------------------------------- */
/*                                   PresenceWrapper                          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   getPresenceLayout                        */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   getPresenceSVG                           */
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

const BusyCircle: FC<React.SVGProps<SVGSVGElement>> = ({ cx, cy, r }) => (
  <circle
    className="fill-uiduThemes-red-300 dark:fill-uiduThemes-red-200"
    cx={cx}
    cy={cy}
    r={r}
  />
);
const BusyPath: FC<React.SVGProps<SVGSVGElement>> = ({ d }) => (
  <path
    className="fill-uiduThemes-neutral-0 dark:fill-uiduThemes-darkNeutral-30"
    d={d}
  />
);
const FocusPath: FC<React.SVGProps<SVGSVGElement>> = ({ d }) => (
  <path
    className="fill-uiduThemes-purple-300 dark:fill-uiduThemes-purple-100"
    d={d}
  />
);
const OfflineOuter: FC<React.SVGProps<SVGSVGElement>> = ({ d }) => (
  <path
    className="fill-uiduThemes-neutral-200 dark:fill-uiduThemes-darkNeutral-100"
    d={d}
  />
);
const OfflineInner: FC<React.SVGProps<SVGSVGElement>> = ({ d }) => (
  <path
    className="fill-uiduThemes-neutral-40 dark:fill-uiduThemes-darkNeutral-500"
    d={d}
  />
);
const OnlineCircle: FC<React.SVGProps<SVGSVGElement>> = ({ cx, cy, r }) => (
  <circle
    className="fill-uiduThemes-green-300 dark:fill-uiduThemes-green-200"
    cx={cx}
    cy={cy}
    r={r}
  />
);

const getPresenceSVG = (presence: PresenceType) => {
  switch (presence) {
    case 'busy':
      return (
        <Svg>
          <BusyCircle cx="4" cy="4" r="4" />
          <BusyPath d="M3.3,1.9l2.8,2.8c0.2,0.2,0.2,0.5,0,0.7L5.4,6.1c-0.2,0.2-0.5,0.2-0.7,0L1.9,3.3c-0.2-0.2-0.2-0.5,0-0.7l0.7-0.7C2.8,1.7,3.1,1.7,3.3,1.9z" />
        </Svg>
      );
    case 'focus':
      return (
        <Svg>
          <FocusPath d="M4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 C6.209139,0 8,1.790861 8,4 C8,6.209139 6.209139,8 4,8 Z M4,6.66666667 C5.47275933,6.66666667 6.66666667,5.47275933 6.66666667,4 C6.66666667,2.52724067 5.47275933,1.33333333 4,1.33333333 C2.52724067,1.33333333 1.33333333,2.52724067 1.33333333,4 C1.33333333,5.47275933 2.52724067,6.66666667 4,6.66666667 Z M4,5.33333333 C3.26362033,5.33333333 2.66666667,4.73637967 2.66666667,4 C2.66666667,3.26362033 3.26362033,2.66666667 4,2.66666667 C4.73637967,2.66666667 5.33333333,3.26362033 5.33333333,4 C5.33333333,4.73637967 4.73637967,5.33333333 4,5.33333333 Z" />
        </Svg>
      );
    case 'offline':
      return (
        <Svg>
          <OfflineOuter d="M4,8 C6.209139,8 8,6.209139 8,4 C8,1.790861 6.209139,0 4,0 C1.790861,0 0,1.790861 0,4 C0,6.209139 1.790861,8 4,8 Z M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" />
          <OfflineInner d="M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" />
        </Svg>
      );
    case 'online':
      return (
        <Svg>
          <OnlineCircle cx="4" cy="4" r="4" />
        </Svg>
      );
    default:
      return null;
  }
};

/* -------------------------------------------------------------------------- */
/*                                   Presence                                 */
/* -------------------------------------------------------------------------- */

export const Presence: FC<PresenceProps> = ({ presence, children }) => (
  <span
    id="outer"
    className="size-[100%] flex items-center justify-center border rounded-full box-border overflow-hidden "
  >
    <span
      id="inner"
      className="size-[100%] flex justify-center items-center overflow-hidden border rounded-full"
    >
      {children || (presence && getPresenceSVG(presence))}
    </span>
  </span>
);
