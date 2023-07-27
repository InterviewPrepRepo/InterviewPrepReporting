import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../services/imocha-service/imocha.service';
import { ActivatedRoute } from '@angular/router';
import TestInvitation from '../models/testInvitation';
import VideoTest from '../models/videoTest';

@Component({
  selector: 'app-test-report-list',
  templateUrl: './test-report-list.component.html',
  styleUrls: ['./test-report-list.component.css']
})
export class TestReportListComponent implements OnInit {
  test: VideoTest | undefined = undefined;
  testId: number = 0;
  testAttempts: TestInvitation[] = [];
  loading: boolean = true;
  testAttemptees: Map<string, string> = new Map<string, string>;

  constructor(public imocha: ImochaService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params) => {
      this.testId = params['testId'];

      //grab test detail from imocha
      this.imocha.getTestDetailByTestId(this.testId).subscribe((res) => {
        this.test = res;

        //we don't have cached data
        if (Object.keys(this.imocha.organizedTestAttempts).length === 0) {
          this.imocha.getTestAttempts().subscribe({

            next: (res) => {
              this.imocha.organizedTestAttempts = this.imocha.processAttempts(res);
              this.testAttempts = this.imocha.organizedTestAttempts[this.testId];
              this.getCandidateInfo();
              this.loading = false;

              //gonna call our backend one more time for each individual test attempts info so we can display the score
              // this.getIndividualAttempts(this.testAttempts);
            },
            error: (err) => {
              console.error(err);

              this.loading = false;
            }
          });
        }
        else {
          //there is cached data
          this.testAttempts = this.imocha.organizedTestAttempts[this.testId];
          this.getCandidateInfo();
          this.loading = false;
          //gonna call our backend one more time for each individual test attempts info so we can display the score
          // this.getIndividualAttempts(this.testAttempts);
        }
      })
    })
  }
  private getCandidateInfo() {
    this.testAttempts?.forEach(attempt => {
      if (!this.testAttemptees.has(attempt.email)) this.testAttemptees.set(attempt.email, attempt.name);
    });
  }
}
