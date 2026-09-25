import { MessageType } from "../enums/Message"
export interface IMessage {
  id: number;
  type: MessageType;
  message: string;
}
