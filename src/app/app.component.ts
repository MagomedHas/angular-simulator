import { Component } from '@angular/core';
import './training';
import {Color} from '../enums/Color';
import {FormsModule} from '@angular/forms';

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
    setInterval(() => {
      console.log(this.hikeSearchForm.participants)}, 1000)
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
