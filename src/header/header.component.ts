import {Component, input} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {


  companyName = input<string>('companyName');
  module: string = 'watch';
  clock: string = '';
  counter: number = 0;

  pages: IPage[] = [
    {
      id: 0,
      name: 'Главная',
      href: ''
    },
    {
      id: 1,
      name: 'Пользователи',
      href: 'users'
    }
  ];

  constructor() {
    this.startClock();
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

}
