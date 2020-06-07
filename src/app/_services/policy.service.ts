﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Policy } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PolicyService {
  constructor(private http: HttpClient) {
  }

  getPoliciesByUserName(userName: string) {
    const url = `${environment.apiUrl}/policies/user/${userName}`;
    return this.http.get<Policy[]>(url)
      .pipe(map(policies => {
        return policies;
      }));
  }
}
