import { Component } from '@angular/core';
import './training';
import {Color} from '../enums/Color';
import {FormsModule} from '@angular/forms';
import {async} from 'rxjs';

class Service {
  private static nextId = 0;
  private path: string = '/images/offer';
  private format: string = 'png';
  id: number;
  image: string;
  title: string;
  text: string;
  src: string
  constructor(
  image: string,
  title: string,
  text: string,
 ) {
    this.id = Service.nextId++;
    this.image = image;
    this.title = title;
    this.text = text;
    this.src = this.path + '/' + image + '.' + this.format;
}
}

interface HikeSearchForm {
  id: number;
  tour: string;
  date: string;
  participants: string[];
  classButton: string;
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

  liveInput = {
    input: '',
    output: 'Введенный текст',
    mou() {
      this.output = this.input;
    }
  }

  artificialLoad = {
    onClass: 'artificial_load',
    offClass: 'display_none',
    class: 'display_none',
    start(timeout: number) {
      this.class = this.onClass
      setTimeout(() => {this.class = this.offClass}, timeout)
    }
  }

  watch = {
    output: '',
    start() {
      setInterval(() => {
        const padZero = (value: number): string => value.toString().padStart(2, '0');
        const date: Date = new Date();

        const year: string = date.getFullYear().toString();
        const month: string = padZero(date.getMonth());
        const day: string =  padZero(date.getDate());
        const hour: string = padZero(date.getHours());
        const minute: string = padZero(date.getMinutes());
        const second: string = padZero(date.getSeconds());
        this.output = `${month}.${day}.${year} ${hour}:${minute}:${second}`;
        console.log(this.output);
      }, 1000)
    }
  }

  counter = {
    count: 0,
    add() {
      this.count++;
    },
    sub() {
      this.count--;
    }
  };

  hikeSearchForm: HikeSearchForm = {
    id: 1,
    tour: '',
    date: '',
    participants: [],
    classButton: 'disabled-button'
  }
  services: Service[] = [
    new Service(
      'guide',
      'Опытный гид',
      'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    ),

    new Service(
      'shield',
       'Безопасный поход',
      'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    ),

    new Service(
      'tag',
      'Опытный гид',
      'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    )
  ]

  constructor() {
    this.artificialLoad.start(2000)
    this.watch.start()
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

  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  incrementPageView(): void {
    let pageView: number =  Number(localStorage.getItem('pageView'))
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
