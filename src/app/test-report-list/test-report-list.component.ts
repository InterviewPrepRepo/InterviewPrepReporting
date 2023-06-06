import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../services/imocha-service/imocha.service';
import { ActivatedRoute } from '@angular/router';
import TestInvitation from '../models/testInvitation';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-test-report-list',
  templateUrl: './test-report-list.component.html',
  styleUrls: ['./test-report-list.component.css']
})
export class TestReportListComponent implements OnInit{
  test: any;
  testId : number = 0;
  testAttempts : TestInvitation[] = [];
  loading : boolean = true;
  constructor(public imocha : ImochaService, private activeRoute : ActivatedRoute) { }
  ngOnInit(): void {

    this.activeRoute.params.subscribe((params) => {
      this.testId = params['testId'];

      this.imocha.getTestDetailByTestId(this.testId).subscribe((res) => {
        this.test = res;
      
        if(Object.keys(this.imocha.organizedTestAttempts).length === 0) {
          this.testAttempts = this.imocha.organizedTestAttempts[this.testId];

          this.imocha.getTestAttempts().subscribe({
            next: (res) => {
              this.imocha.organizedTestAttempts = this.imocha.processAttempts(res);
              this.testAttempts = this.imocha.organizedTestAttempts[this.testId];
              //gonna call our backend one more time for each individual test attempts info so we can display the score
              this.getIndividualAttempts(this.testAttempts);
            },
            error: (err) => {
              console.error(err);
              this.loading = false;
            }
          });
        }
        else {
          this.testAttempts = this.imocha.organizedTestAttempts[this.testId];
          //gonna call our backend one more time for each individual test attempts info so we can display the score
          this.getIndividualAttempts(this.testAttempts);

        }
      })
    })
  }

  private getIndividualAttempts(attemptArr: TestInvitation[]) : void{
    if(!attemptArr || attemptArr.length === 0) {
      this.loading = false;
      return;
    } 
    let callArr : Observable<any>[] = [];
    attemptArr.forEach((attempt : TestInvitation) => {
      callArr.push(this.imocha.getTestAttemptByTestAttemptId(attempt.testInvitationId));
    });

    forkJoin<TestInvitation[]>(callArr).subscribe((responseArr) => {
      let responseMap : Record<number, TestInvitation> = {};
      for(let response of responseArr) {
          responseMap[response.testInvitationId] = response;
      }

      for(let attempt of attemptArr) {

        if(responseMap[attempt.testInvitationId] && responseMap[attempt.testInvitationId].score !== -1) {
          attempt.score = parseFloat(((responseMap[attempt.testInvitationId].score ?? 0)/ this.test.questions)?.toPrecision(4));
        }
        else {
          attempt.score = 0;
        }
      }
      this.testAttempts = attemptArr;
      this.loading = false;
    })
  }
}
