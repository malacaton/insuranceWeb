import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  user: User = new User();

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
