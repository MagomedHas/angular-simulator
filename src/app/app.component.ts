import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import {MessagesComponent} from '../messages/messages.component';
import {LoaderComponent} from '../loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, HeaderComponent, FooterComponent, RouterOutlet, MessagesComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'РУМТИБЕТ';
  loaderClass: string = 'display_none';
  clock: string = '';

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
