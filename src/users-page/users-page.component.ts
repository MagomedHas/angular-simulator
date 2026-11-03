import { Component, DestroyRef, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private readonly dr: DestroyRef = inject(DestroyRef);
  filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.getUsers();
  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.users$,
    this.filter$,
  ]).pipe(
    map(([users, search]) => {
      return users.filter(user =>{
        return user.name.trim().toLowerCase().includes(search)
      })
    }),
  );

  ngOnInit(): void {
    this.userService.loadUsers().pipe(
      takeUntilDestroyed(this.dr)
    ).subscribe()
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id)
  }

  createUser(user: IUser): void {
    this.userService.createUser(user)
  }

}
