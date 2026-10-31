import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, defer, finalize, Observable, of, skip, tap } from 'rxjs';
import { DisplayMessagesService } from './display-messages.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly userApi: UserApiService = inject(UserApiService);
  private readonly messageService: DisplayMessagesService = inject(DisplayMessagesService);
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  private readonly storageService: StorageService = inject(StorageService);

  constructor() {

    this.usersSubject
      .pipe(skip(1))
      .subscribe((users: IUser[]) => this.storageService.set<IUser[]>('users', users));
  }

  setUsers(users: IUser[]) {
    this.usersSubject.next(users);
  }

  deleteUser(id: number) {
    this.usersSubject.next(this.usersSubject.value.filter(user => user.id !== id));
  }

  getUsers(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  createUser(user: IUser): void {
    this.usersSubject.next([user, ...this.usersSubject.value]);
  }

  loadUsers(): Observable<IUser[]> {
    return defer((): Observable<IUser[]> => {

      const Users: IUser[] | null = this.storageService.get<IUser[]>('users')
      if (Users !== null) {
        this.setUsers(Users);
        return of(Users);
      }
      this.loaderService.showLoader();
      return this.userApi.getUsers().pipe(
        tap((users: IUser[]) => this.setUsers(users)),
        catchError((): Observable<IUser[]> => {
          this.messageService.showError('Не удалось загрузить пользователей');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
    })
  }

}
