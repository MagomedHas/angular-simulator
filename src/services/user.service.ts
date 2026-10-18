import { Inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, defer, finalize, Observable, of, tap } from 'rxjs';
import { DisplayMessagesService } from './display-messages.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly userApi: UserApiService = Inject(UserApiService);
  private readonly messageService: DisplayMessagesService = Inject(DisplayMessagesService);
  private readonly loaderService: LoaderService = Inject(LoaderService);
  private readonly usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  setUsers(users: IUser[]) {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  loadUsers(): Observable<IUser[]> {
    return defer((): Observable<IUser[]> => {
      this.loaderService.showLoader();

      return this.userApi.getUsers().pipe(
        tap((users: IUser[]) => this.setUsers(users)),
        catchError((): Observable<IUser[]> => {
          this.messageService.showError('Не удалось загрузить пользователей');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
    });
  }

}
