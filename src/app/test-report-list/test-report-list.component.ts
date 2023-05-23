import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../services/imocha-service/imocha.service';
import { ActivatedRoute, Router } from '@angular/router';
import TestInvitation from '../models/testInvitation';

@Component({
  selector: 'app-test-report-list',
  templateUrl: './test-report-list.component.html',
  styleUrls: ['./test-report-list.component.css']
})
export class TestReportListComponent implements OnInit{
  test: any;
  testId : number = 0;
  testAttempts : TestInvitation[] = [];
  constructor(public imocha : ImochaService, private activeRoute : ActivatedRoute, private router : Router) {
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.testId = params['testId'];

      this.imocha.getTestDetailByTestId(this.testId).subscribe((res) => {
        this.test = res;
      })

      if(Object.keys(this.imocha.organizedTestAttempts).length === 0) {
        this.testAttempts = this.imocha.organizedTestAttempts[this.testId];

        const today = new Date();
        const aMonthAgo = new Date(today);
        aMonthAgo.setMonth(today.getMonth() - 1);
  
        this.imocha.getTestAttempts(aMonthAgo, today).subscribe({
          next: (res) => {
            this.imocha.organizedTestAttempts = this.imocha.processAttempts(res);
            this.testAttempts = this.imocha.organizedTestAttempts[this.testId];
        console.log(this.testAttempts)

          },
          error: (err) => {
            console.error(err);
          }
        });
      }
      else {
        this.testAttempts = this.imocha.organizedTestAttempts[this.testId];
      }
    })
    
  }
}
