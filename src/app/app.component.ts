import {Component} from '@angular/core';
import './training';
import {Color} from '../enums/Color';
import {FormsModule} from '@angular/forms';
import {async} from 'rxjs';



interface HikeSearchForm {
  id: number;
  tour: string;
  date: string;
  participants: string[];
  classButton: string;
}

interface Feature {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ';
  module: string = 'watch';
  loaderClass: string = 'display_none';
  liveInput: string = '';
  liveOutput: string = 'Введенный текст';
  counter: number = 0;
  watch: string = '';




  hikeSearchForm: HikeSearchForm = {
    id: 1,
    tour: '',
    date: '',
    participants: [],
    classButton: 'disabled-button'
  }

  features: Feature[] = [
    {
      id: 1,
      imageUrl: '/images/offer/guide.png',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      imageUrl: '/images/offer/shield.png',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      imageUrl: '/images/offer/tag.png',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]

  constructor() {
    this.loader(2000)
    this.watchStart()
    this.setLastLogin();
    this.incrementPageView();
  }

  checkHikeSearchForm() {
    if (this.hikeSearchForm.date && this.hikeSearchForm.tour && this.hikeSearchForm.participants.length >= 4) {
      this.hikeSearchForm.classButton = 'primary-button';
    } else {
      this.hikeSearchForm.classButton = 'disabled-button';
    }
  }

  loader(timeout: number): void {
    this.loaderClass = 'loader';
    setTimeout(() => {
      this.loaderClass = 'display_none';
    }, timeout)
  }

  watchStart(): void {
    setInterval(() => {
      const date: Date = new Date();
      this.watch = `
      ${date.getMonth().toString().padStart(2, '0')}.
      ${date.getMonth().toString().padStart(2, '0')}.
      ${date.getFullYear()}
      ${date.getHours().toString().padStart(2, "0")}:
      ${date.getMinutes().toString().padStart(2, '0')}:
      ${date.getSeconds().toString().padStart(2, '0')}`;
    }, 1000);
  }
  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
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
