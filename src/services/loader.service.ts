import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private readonly document: any = inject(DOCUMENT);
  private readonly loadingSubject:  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly activity: Observable<boolean> = this.loadingSubject.asObservable();

  private previousOverflow: string = '';

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
