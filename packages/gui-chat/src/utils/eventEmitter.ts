import { EventEmitter } from 'eventemitter3'
import type TypedEmitter from 'typed-emitter'
import { GMessage } from '../types'

export type EventMap = {
  [key: string]: (...args: any[]) => void
}

type ChatEvents = {
  patternPressed: (pattern: string, index: number, message: GMessage) => void
  actionPressed: (index: number, message: GMessage) => void
}

type ChatBubbleEvents = {
  replyBubblePressed: (messageId: number) => void
}

const ChatEmitter = new EventEmitter() as TypedEmitter<ChatEvents>
const ChatBubbleEmitter = new EventEmitter() as TypedEmitter<ChatBubbleEvents>

export { ChatBubbleEmitter, ChatEmitter }
