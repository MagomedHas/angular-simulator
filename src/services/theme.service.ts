import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../enums/Theme';
import { StorageService } from './storage.service';
import { ColorMode } from '../enums/ColorMode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly storageService: StorageService = inject(StorageService);
  private readonly themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    this.storageService.getOrSet<Theme>("Theme", Theme.AURA)
  );
  private readonly colorModeSubject: BehaviorSubject<ColorMode> = new BehaviorSubject<ColorMode>(
    this.storageService.getOrSet<ColorMode>("ColorMode", ColorMode.LIGHT)
  );

  readonly colorMode$: Observable<ColorMode> = this.colorModeSubject.asObservable();
  readonly theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    this.themeSubject.subscribe(theme => {this.storageService.set("Theme", theme);});
    this.colorModeSubject.subscribe(mode => {this.storageService.set("ColorMode", mode);});
  }
  
  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
  }

  setColorMode(mode: ColorMode) {
    this.colorModeSubject.next(mode);
  }

}

