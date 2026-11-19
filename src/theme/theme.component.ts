import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { ColorMode } from '../enums/ColorMode';
import { ThemeService } from '../services/theme.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { Theme } from '../enums/Theme';

@Component({
  selector: 'app-theme',
  imports: [
    FaIconComponent,
    AsyncPipe,
    ToggleSwitch,
    FormsModule,
    SelectButton
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent {

  protected readonly faMoon = faMoon;
  protected readonly ColorMode = ColorMode;
  protected readonly faSun = faSun;
  protected readonly Theme = Theme;
  themeService: ThemeService = inject(ThemeService)

  stateOptions: { label: string; value: Theme }[] = Object.values(Theme)
    .map( theme => ({ 'label': theme, value: theme }));
  
}
