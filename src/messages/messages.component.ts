import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage';
import { DisplayMessagesService } from '../services/display-messages.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-messages',
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    FaIconComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {

  protected displayMessagingService: DisplayMessagesService = inject(DisplayMessagesService);
  messages$: Observable<IMessage[]> = this.displayMessagingService.messages$

  protected readonly faEnvelope = faEnvelope;
  protected readonly faCircleXmark = faCircleXmark;
}
