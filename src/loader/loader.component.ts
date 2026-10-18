import { Component, inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [
    AsyncPipe
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  private loaderSrc: LoaderService = inject(LoaderService)
  activity:  Observable<boolean> = this.loaderSrc.activity

}
