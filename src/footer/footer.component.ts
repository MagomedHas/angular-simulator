import { Component } from '@angular/core';
import { faPinterest, faSkype, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  imports: [FaIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  protected readonly faTelegram: IconDefinition = faTelegram;
  protected readonly faVk: IconDefinition = faVk;
  protected readonly faSkype: IconDefinition = faSkype;
  protected readonly faPinterest: IconDefinition = faPinterest;
}
