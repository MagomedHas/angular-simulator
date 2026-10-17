import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private readonly document = inject(DOCUMENT);
  private readonly loadingSubject = new BehaviorSubject(false);

  readonly activity = this.loadingSubject.asObservable();

  private previousOverflow = '';

  showLoader(): void {
    if (this.loadingSubject.value) return;

    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.loadingSubject.next(true);
  }

  hideLoader(): void {
    if (!this.loadingSubject.value) return;

    this.document.body.style.overflow = this.previousOverflow;
    this.loadingSubject.next(false);
  }
  
}
