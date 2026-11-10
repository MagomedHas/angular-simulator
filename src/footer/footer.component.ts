import { Component } from '@angular/core';
import { faPinterest, faSkype, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  imports: [
    FaIconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  protected readonly faTelegram = faTelegram;
  protected readonly faVk = faVk;
  protected readonly faSkype = faSkype;
  protected readonly faPinterest = faPinterest;
}
