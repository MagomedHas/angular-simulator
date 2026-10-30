import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.getUsers();
  ngOnInit() {
    this.userService.loadUsers().subscribe()
  }

  deleteUser(id: number) {this.userService.deleteUser(id)}
}
