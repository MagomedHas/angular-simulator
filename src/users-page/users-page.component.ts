import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.getUsers();

  ngOnInit(): void {
    this.userService.loadUsers().subscribe()
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id)
  }

  createUser(user: IUser): void {
    this.userService.createUser(user)
  }

}
