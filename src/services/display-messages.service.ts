import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/Message';
import {BehaviorSubject, map, merge, mergeMap, Observable, of, ReplaySubject, scan, Subject, timer} from 'rxjs';

type Action =
  | { type: 'add'; msg: IMessage }
  | { type: 'remove'; id: number };

@Injectable({
  providedIn: 'root',
})
export class DisplayMessagesService {

  bufferSize: number = 10;
  windowTime: number = 5000;
  private messagesSubject$: Subject<IMessage> = new Subject<IMessage>();

  messages$: Observable<IMessage[]> = this.messagesSubject$.pipe(
    mergeMap(msg =>
      merge(
        of<Action>({ type: 'add', msg }),
        timer(this.windowTime).pipe(map<number, Action>(() => ({ type: 'remove', id: msg.id }))),
      ),
    ),
    scan((acc, action) => {
      if (action.type === 'add') return [...acc, action.msg];
      return acc.filter(m => m.id !== action.id);
    }, [] as IMessage[]),
  );
  private nextId: number = 1;
  closeMessages(id: number): void {
    this.messagesSubject$.complete();
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


  closeMessage(id: number): void {}
  showInfo(message: string): void {
    this.addMessage(message, MessageType.INFO);
  }

  private addMessage(message: string, type: MessageType): void {
    const id: number = this.nextId;
    this.messagesSubject$.next(
      {
        id: id,
        type: type,
        message: message
      }
    )
    this.nextId++;
  }
}
