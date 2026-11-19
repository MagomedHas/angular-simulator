import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isTheme, Theme } from '../enums/Theme';
import { StorageService } from './storage.service';
import { ColorMode, isColorMode } from '../enums/ColorMode';
import { usePreset } from '@primeuix/themes';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import type { Preset } from '@primeuix/themes/types';

const themePresets: Record<Theme, Preset> = {
  [Theme.AURA]: Aura,
  [Theme.LARA]: Lara,
  [Theme.NORA]: Nora,
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly darkModeClass: string = 'app-dark';
  private readonly storageService: StorageService = inject(StorageService);
  private readonly themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    this.storageService.getOrSet<Theme>("Theme", Theme.AURA, isTheme)
  );
  private readonly colorModeSubject: BehaviorSubject<ColorMode> = new BehaviorSubject<ColorMode>(
    this.storageService.getOrSet<ColorMode>("ColorMode", ColorMode.LIGHT, isColorMode)
  );

  readonly colorMode$: Observable<ColorMode> = this.colorModeSubject.asObservable();
  readonly theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    this.themeSubject.subscribe(theme => {
      this.storageService.set("Theme", theme);
      usePreset(themePresets[theme]);
    });
    this.colorModeSubject.subscribe(mode => {
      this.storageService.set("ColorMode", mode);

      document.documentElement.classList.toggle(
        this.darkModeClass,
        mode === ColorMode.DARK
      )});

  }

  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
  }

  setColorMode(mode: ColorMode) {
    this.colorModeSubject.next(mode);
  }

}

