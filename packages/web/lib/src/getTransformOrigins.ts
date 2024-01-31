export type OverlayPlacement =
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'

export const getTransformOrigins = (placement: OverlayPlacement) => {
  const origins: Record<
    OverlayPlacement,
    {
      originX?: number
      originY?: number
    }
  > = {
    top: {
      originY: 1,
    },
    bottom: {
      originY: 0,
    },
    left: {
      originX: 1,
    },
    right: {
      originX: 0,
    },
    'top-start': {
      originX: 0,
      originY: 1,
    },
    'top-end': {
      originX: 1,
      originY: 1,
    },
    'bottom-start': {
      originX: 0,
      originY: 0,
    },
    'bottom-end': {
      originX: 1,
      originY: 0,
    },
    'right-start': {
      originX: 0,
      originY: 0,
    },
    'right-end': {
      originX: 0,
      originY: 1,
    },
    'left-start': {
      originX: 1,
      originY: 0,
    },
    'left-end': {
      originX: 1,
      originY: 1,
    },
  }

  return origins?.[placement] || {}
}
