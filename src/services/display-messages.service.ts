import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/Message';
import {
  BehaviorSubject,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  ReplaySubject,
  scan,
  Subject,
  takeUntil,
  timer
} from 'rxjs';

type Action =
  | { type: 'add'; msg: IMessage }
  | { type: 'remove'; id: number };

@Injectable({
  providedIn: 'root',
})
export class DisplayMessagesService {

  windowTime: number = 5000;
  private addMessages$: Subject<IMessage> = new Subject<IMessage>();
  private removeMessages$: Subject<number> = new Subject<number>();

  messages$: Observable<IMessage[]> = merge(
    this.addMessages$.pipe(
      mergeMap(msg => {
        const cancel$ = this.removeMessages$.pipe(filter(id => id === msg.id))
        return merge(
          of<Action>({type: 'add', msg}),
          timer(this.windowTime).pipe(
            map<number, Action>(() => ({type: 'remove', id: msg.id})),
            takeUntil(cancel$)
          ),
        );
      })
    ),
    this.removeMessages$.pipe(map<number, Action>(id=> ({type: 'remove', id})),)
  ).pipe(
    scan((acc, action) => {
      if (action.type === 'add') return [...acc, action.msg];
      return acc.filter(m => m.id !== action.id);
    }, [] as IMessage[]),
  );

  private nextId: number = 1;
  closeMessages(id: number): void {
    this.removeMessages$.next(id);
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
    this.addMessages$.next(
      {
        id: id,
        type: type,
        message: message
      }
    )
    this.nextId++;
  }
}
