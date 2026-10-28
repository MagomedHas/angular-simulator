import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/Message';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayMessagesService {

  windowTime: number = 5000;

  private readonly messagesSubject =
    new BehaviorSubject<IMessage[]>([]);
  readonly messages$ = this.messagesSubject.asObservable();
  private readonly timers = new Map<number, Subscription>();
  private nextId: number = 1;
  closeMessages(): void {
    this.messagesSubject.next([])
    this.timers.forEach(timer => timer.unsubscribe());
    this.timers.clear();
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

  closeMessage(id: number): void {
    this.messagesSubject.next(
      this.messagesSubject.getValue()
        .filter((msg) => msg.id !== id)
    )
    this.timers.get(id)?.unsubscribe();
    this.timers.delete(id);
  }

  showInfo(message: string): void {
    this.addMessage(message, MessageType.INFO);
  }

  private addMessage(message: string, type: MessageType): void {
    const id: number = this.nextId;
    this.messagesSubject.next(
      [ ...this.messagesSubject.value,

        {
        id: id,
        type: type,
        message: message
        }
      ]
    )

    const subscription: Subscription = timer(this.windowTime).subscribe(() => {
      this.closeMessage(id);
    })

    this.timers.set(id, subscription);
    this.nextId++;
  }

}
