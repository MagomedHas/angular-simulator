import { Component, inject, input, InputSignal } from '@angular/core';
import { IPage } from '../interfaces/IPage';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { ColorMode } from '../enums/ColorMode';
import { FormsModule } from '@angular/forms';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { ThemeComponent } from '../theme/theme.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    ThemeComponent,
    FormsModule,


  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {


  protected readonly ColorMode = ColorMode;
  protected readonly faSun = faSun;
  protected readonly faMoon = faMoon;

  themeService: ThemeService = inject(ThemeService)
  companyName: InputSignal<string> = input<string>('companyName');
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
