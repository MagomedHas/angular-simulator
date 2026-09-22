import { Injectable } from '@angular/core';
import {IMessage} from '../interfaces/IMessage';
import {MessageType} from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class DisplayMessagesService {
  messages: IMessage[] = [];
  private static nextId: number = 1;

  addMessage(message: string , type: MessageType): void {
    const id: number = DisplayMessagesService.nextId++;
    this.messages.push(
      {
        id: id,
        type: type,
        message: message
      }
    )
    setTimeout( () => {
      this.closeMessages(id);
        console.log(id);
      } ,
      5000
    )
    console.log(DisplayMessagesService.nextId);
    DisplayMessagesService.nextId++;
  }


  closeMessages(id: number): void {
    this.messages = this.messages.filter(msg => msg.id !== id);
  }
}
