import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MessageType} from '../enums/Message';
import {DisplayMessagesService} from '../services/display-messages.service';
import {ITravel} from '../interfaces/ITravel';
import {IFeature} from '../interfaces/IFeature';
import {IDestination} from '../interfaces/IDestination';

@Component({
  selector: 'app-home-page',
  imports: [
    FormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  displayMessagingService: DisplayMessagesService = inject(DisplayMessagesService);
  DOLLAR_SIGN: string = '\u0024';
  tourInput: string = '';
  dateInput: string = '';
  participantsInput: string[] = [];
  liveInput: string = '';
  liveOutput: string = 'Введенный текст';

  travels: ITravel[] = [
    {
      id: 1,
      image: 'city_on_a_cliff',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: new Date(2023, 4, 1),
      url: '/'
    },
    {
      id: 2,
      image: 'view_from_an_airplane',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: new Date(2023, 4, 1),
      url: '/'
    },
    {
      id: 3,
      image: 'street',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: new Date(2023, 4, 1),
      url: '/'
    },
    {
      id: 4,
      image: 'Taj-Mahal',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: new Date(2023, 4, 1),
      url: '/'
    },

  ]

  features: IFeature[] = [
    {
      id: 1,
      image: 'guide',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      image: 'shield',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      image: 'tag',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    }
  ]

  destinations: IDestination[] = [
    {
      id: 1,
      image: 'lake_near_the_mountains',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      rating: 4.9,
      price: 480
    },
    {
      id: 2,
      image: 'night_in_the_Mountains',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      rating: 4.5,
      price: 500
    },
    {
      id: 3,
      image: 'stretching_in_the_mountains',
      title: 'Растяжка в горах',
      description: 'для тех, кто забоится о себе',
      rating: 5.0,
      price: 230
    }
  ]

  isFormValid(): boolean {
    return !!(
      this.dateInput &&
      this.tourInput &&
      this.participantsInput.length >= 4
    );
  }
  protected readonly MessageType = MessageType;
}
