import { Component, inject } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { FormsModule } from '@angular/forms';
import { IFeature }  from '../interfaces/IFeature';
import { IDestination } from '../interfaces/IDestination';
import { ITravel } from '../interfaces/ITravel';
import { NgTemplateOutlet } from '@angular/common';
import { DisplayMessagesService } from '../services/display-messages.service';
import { MessageType } from '../enums/Message';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  displayMessagingService: DisplayMessagesService = inject(DisplayMessagesService);
  DOLLAR_SIGN: string = '\u0024';
  companyName: string = 'РУМТИБЕТ';
  module: string = 'watch';
  loaderClass: string = 'display_none';
  liveInput: string = '';
  liveOutput: string = 'Введенный текст';
  counter: number = 0;
  clock: string = '';

  tourInput: string = '';
  dateInput: string = '';
  participantsInput: string[] = [];
  protected readonly MessageType: typeof MessageType = MessageType;

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

  constructor() {
    this.loader(2000);
    this.startClock();
    this.setLastLogin();
    this.incrementPageView();
  }

  loader(timeout: number): void {
    this.loaderClass = 'loader';
    setTimeout(() => {
      this.loaderClass = 'display_none';
    }, timeout)
  }

  startClock(): void {
    setInterval(() => {
      this.clock = new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(',', '')
    }, 1000);
  }

  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  isFormValid(): boolean {
    return !!(
      this.dateInput &&
      this.tourInput &&
      this.participantsInput.length >= 4
    );
  }

  incrementPageView(): void {
    let pageView: number = Number(localStorage.getItem('pageView'))
    if (pageView) {
      pageView++;
      localStorage.setItem('pageView', pageView.toString());
    } else {
      localStorage.setItem('pageView', '1');
    }
  }

  setLastLogin(): void {
    const date: Date = new Date();
    localStorage.setItem('lastLogin', date.toString());
  }

}
