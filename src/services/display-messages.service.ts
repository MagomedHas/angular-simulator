import {Injectable} from '@angular/core';
import {IMessage} from '../interfaces/IMessage';
import {MessageType} from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class DisplayMessagesService {

  messages: IMessage[] = [];
  private nextId: number = 1;

  closeMessages(id: number): void {
    this.messages = this.messages.filter(msg => msg.id !== id);
  }

  showWarn(message: string): void {
    this.addMessage(message, MessageType.WARNING);
  }

  showError(message: string): void {
    this.addMessage(message, MessageType.ERROR);
  }

  showSuccess(message: string): void {
    this.addMessage(message, MessageType.SUCCESS);
  }

  showInfo(message: string): void {
    this.addMessage(message, MessageType.INFO);
  }

  private addMessage(message: string, type: MessageType): void {
    const id: number = this.nextId;
    this.messages.push(
      {
        id: id,
        type: type,
        message: message
      }
    )
    setTimeout(() => {
        this.closeMessages(id);
      },
      5000
    )
    this.nextId++;
  }
}
