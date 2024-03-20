import { ImageSourcePropType } from 'react-native'

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
  id: string
  itsMe: boolean
  user: GUser
  text: string
  createdAt: Date
  repliedTo?: GMessage
  status?: MessageStatus
  media?: GMedia[]
}

enum MessageStatus {
  Sending = 'sending',
  Sent = 'sent',
  Delivered = 'delivered',
  Read = 'readed',
}
