import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private switch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  activity:  Observable<boolean> = this.switch.asObservable()

  showLoader() {
    this.switch.next(true)
  };

  hideLoader() {
    this.switch.next(false);
  }

}
