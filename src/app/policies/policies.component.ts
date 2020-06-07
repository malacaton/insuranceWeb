import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Policy } from '@app/_models';
import { PolicyService } from '@app/_services';

import * as moment from 'moment';

@Component({
  templateUrl: 'policies.component.html'
})
export class PoliciesComponent implements OnInit {
  userName = '';
  policies: Policy[];

  constructor(
    private route: ActivatedRoute,
    private policyService: PolicyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userName = params.userName;
      this.getPoliciesByUserName(this.userName);
    });
  }

  getPoliciesByUserName(userName: string ) {
    this.policyService.getPoliciesByUserName(userName).pipe(first()).subscribe((policiesReceived) => {
      this.policies = policiesReceived;
    });
  }
}
