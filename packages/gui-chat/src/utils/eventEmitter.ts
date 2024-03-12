import { EventEmitter } from 'eventemitter3';
import type TypedEmitter from 'typed-emitter';
import type { IMessage } from '../components/types/Chatty.types';

export type EventMap = {
  [key: string]: (...args: any[]) => void;
};

type ChatEvents = {
  patternPressed: (pattern: string, index: number, message: IMessage) => void;
  actionPressed: (index: number, message: IMessage) => void;
};

type ChatBubbleEvents = {
  replyBubblePressed: (messageId: number) => void;
};

const ChatEmitter = new EventEmitter() as TypedEmitter<ChatEvents>;
const ChatBubbleEmitter = new EventEmitter() as TypedEmitter<ChatBubbleEvents>;

export { ChatBubbleEmitter, ChatEmitter };
