import { Component } from '@angular/core';
import { faPinterest, faSkype, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
  protected readonly faChevronRight = faChevronRight;
  protected readonly services: string[] = [
    'Прогулки в горы летом',
    'Зимние походы в горы',
    'Посещение храмов в горах',
    'Экстремальные виды туризма',
    'Походы в джунглях Амазонии',
    'Поездка в Африку'
  ]
  protected readonly importants: string[] = [
    'Как собрать в долгий поход?',
    'Жизненно важные предметы для похода',
    'Медицинская страховка, гарантии безопасности',
    'Если вы врач - загляните сюда',
  ]
}
