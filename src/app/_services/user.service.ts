import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject: BehaviorSubject<User[]>;
  public users: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.usersSubject = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem('users')));
    this.users = this.usersSubject.asObservable();
  }

  public get usersValue(): User[] {
    return this.usersSubject.value;
  }

  getAll() {
    console.log('voy a 2');
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
      .pipe(map(users => {
        console.log('yeeep 2:', users);
        localStorage.setItem('users', JSON.stringify(users));

        this.usersSubject.next(users);
        return users;
      }));
  }
}
