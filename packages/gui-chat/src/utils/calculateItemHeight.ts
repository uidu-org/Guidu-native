import { PixelRatio } from 'react-native'
import SIZES from '../constants'
import { GMessage } from '../types'

const averageCharWidth = Math.ceil(PixelRatio.get())

export const calculateMessageHeight = (
  message: GMessage,
  prevMessage: GMessage | null
) => {
  const textLength = message.text.length
  const thresholdPercentage = 0.5
  const padding = 20
  const margin = 20
  const maxWidth = SIZES.BUBBLE_CHAT_WIDTH - padding - margin

  const textWidth = textLength * averageCharWidth

  const wrappedText = message.text.split(/\r?\n/)

  let linesNumber = wrappedText.length
  for (const line of wrappedText) {
    linesNumber += Math.ceil((line.length * averageCharWidth) / maxWidth)
  }

  const lineHeight = 30
  const additionalPadding = 30

  let height = linesNumber * lineHeight + additionalPadding

  if (message?.media) {
    if (message.media.length > 2) {
      return (height += 205)
    }

    return (height += SIZES.IMAGE_HEIGHT)
  }
  return height
}
