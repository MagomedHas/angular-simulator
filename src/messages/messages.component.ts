import {Component, inject} from '@angular/core';
import {AsyncPipe, NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {Observable} from 'rxjs';
import {IMessage} from '../interfaces/IMessage';
import {DisplayMessagesService} from '../services/display-messages.service';

@Component({
  selector: 'app-messages',
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    NgOptimizedImage
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {

  protected displayMessagingService: DisplayMessagesService = inject(DisplayMessagesService);
  messages$: Observable<IMessage[]> = this.displayMessagingService.messages$

}
