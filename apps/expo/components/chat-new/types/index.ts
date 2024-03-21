import {
  ImageSourcePropType,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'
import type { RecyclerListViewProps } from 'recyclerlistview'

export interface GUser {
  id: number
  username: string
  avatar: ImageSourcePropType
}

export interface GVideoOptions {
  [key: string]: any
  thumbnail?: string
  pictureInPicture?: boolean
  headers?: {
    [key: string]: any
  }
}

export enum MediaType {
  Image = 0,
  Video = 1,
  Audio = 2,
}

export interface GMedia {
  uri: string
  base64?: string
  type: MediaType
  videoOptions?: GVideoOptions
}

export interface GMessage {
  id: number
  itsMe: boolean
  user: GUser
  text: string
  createdAt: Date
  repliedTo?: GMessage
  status?: MessageStatus
  media?: GMedia[]
}

export enum MessageStatus {
  Sending = 'sending',
  Sent = 'sent',
  Delivered = 'delivered',
  Read = 'readed',
}

export interface ListRef {
  appendMessage: (message: GMessage | GMessage[], firstIndex?: boolean) => void
  removeMessage: (id: number) => void
  scrollToEnd: (animated?: boolean) => void
  setIsTyping: (isTyping?: boolean) => void
}

export interface GListProps
  extends Pick<
    RecyclerListViewProps,
    'onEndReached' | 'onEndReachedThreshold' | 'onScroll'
  > {
  rowRenderer?: (data: GMessage) => JSX.Element
  data: GMessage[]
  containerStyle?: ViewStyle
}

export interface GTypingStatusRef {
  setIsTyping: (isTyping: boolean) => void
}

export interface GUrlPreviewBubble {
  title: string
  image: string
  description: string
  url: string
}

export const LayoutType = {
  Normal: 0,
  Replied: 1,
  Dated: 2,
  Long: 3,
  Long2x: 4,
  Long3x: 5,
  ExtremeLong: 6,
  Media: 7,
  Media2x: 8,
}

export interface GFabRef {
  show: () => void
  hide: () => void
}

export interface GScrollToBottomProps
  extends Pick<TouchableOpacityProps, 'onPress'> {
  containerStyle?: ViewStyle
  content?: JSX.Element
}

export interface GPatternShape {
  type?: string
  pattern?: RegExp | string
  style: TextStyle
  onPress?: (pattern: string, index: number) => void
}

export interface GChatBubble {
  message?: GMessage
  replyDragElement?: JSX.Element
  trailingAccessory?: JSX.Element
  // actions?: GActionProps;
  enableCornerRounding?: boolean
  children?: JSX.Element
}

export interface GSwipeableBubble
  extends GChatBubble,
    Pick<GChatty, 'onReply'> {
  children?: JSX.Element
}

export interface GPatternProps {
  allowPatterns?: Array<'mention' | 'hashtag' | 'url'>
  customPatterns?: GPatternShape[]
}

export interface GChatty {
  messages: GMessage[]
  replyingTo?: GMessage
  bubbleProps?: Omit<GChatBubble, 'customContent'>
  enableHapticFeedback?: boolean
  enableImageUploads?: boolean
  showScrollToBottomButton?: boolean
  setDateLocale?: string | ILocale
  listProps?: Omit<GListProps, 'rowRenderer' | 'data'>
  enablePatterns?: boolean
  enableUrlPreviews?: boolean
  patternProps?: GPatternProps
  onReply?: (message: GMessage) => void
  renderBubble?: (props?: GMessage) => JSX.Element
}

// export interface GActionProps {
//   options: Pick<ContextMenuAction, 'title' | 'destructive' | 'systemIcon'>[];
//   cancelButtonLabel?: string;
// }
