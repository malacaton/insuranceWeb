import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Role } from '@app/_models';
import { UserService } from '@app/_services';

import * as Shared from '@app/_helpers';

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user: User = new User();

  page = 1;
  pageSize = 15;
  collectionSize = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.users = Shared.getUsers();
    this.collectionSize = this.users.length;

    if (this.users.length === 0) {
      this.userService.getAll().pipe(first()).subscribe((usersReceived) => {
        this.users = usersReceived;
        this.collectionSize = this.users.length;
        Shared.setUsers(this.users);
      });
    }
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get getPage(): User[] {
    return this.users
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
