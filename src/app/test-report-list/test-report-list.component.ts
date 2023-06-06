import { Component, OnInit } from '@angular/core';
import { ImochaService } from '../services/imocha-service/imocha.service';
import { ActivatedRoute } from '@angular/router';
import TestInvitation from '../models/testInvitation';
import { Observable, forkJoin } from 'rxjs';
import VideoTest from '../models/videoTest';

@Component({
  selector: 'app-test-report-list',
  templateUrl: './test-report-list.component.html',
  styleUrls: ['./test-report-list.component.css']
})
export class TestReportListComponent implements OnInit{
  test: VideoTest | undefined = undefined;
  testId : number = 0;
  testAttempts : TestInvitation[] = [];
  loading : boolean = true;

  constructor(public imocha : ImochaService, private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params) => {
      this.testId = params['testId'];

      //grab test detail from imocha
      this.imocha.getTestDetailByTestId(this.testId).subscribe((res) => {
        this.test = res;
      
        //we don't have cached data
        if(Object.keys(this.imocha.organizedTestAttempts).length === 0) {
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
          //there is cached data
          this.testAttempts = this.imocha.organizedTestAttempts[this.testId];
          
          //gonna call our backend one more time for each individual test attempts info so we can display the score
          this.getIndividualAttempts(this.testAttempts);
        }
      })
    })
  }

  //We need to individually get each attempt data because that's how we get the total score (for now...) (there is no total score, our backend has to manually calculate it from questions)
  private getIndividualAttempts(attemptArr: TestInvitation[]) : void{
    //if there is no attempt associated with this test, then do nothing
    if(!attemptArr || attemptArr.length === 0) {
      this.loading = false;
      return;
    }
    //assemble the call array for each test attempt
    let callArr : Observable<any>[] = [];
    attemptArr.forEach((attempt : TestInvitation) => {
      callArr.push(this.imocha.getTestAttemptByTestAttemptId(attempt.testInvitationId));
    });

    //Get the data from backend
    forkJoin<TestInvitation[]>(callArr).subscribe((responseArr) => {
      let responseMap : Record<number, TestInvitation> = {};
      
      //we are going to create a map for easy look up, because we are going to take a score from these and add to another one that's sharing the same testAttempt Id
      for(let response of responseArr) {
          responseMap[response.testInvitationId] = response;
      }

      //Loop through the attempt array for this particular test, and find the score from the corresponding responseMap object
      for(let attempt of attemptArr) {
        //If it exists (which means iMocha has processed it) and the score isn't -1 (which means interview bot has processed it), then calculate the score by taking the cumulative total and dividing them by the number of questions
        if(responseMap[attempt.testInvitationId] && responseMap[attempt.testInvitationId].score !== -1) {
          const scoreSum = responseMap[attempt.testInvitationId].score ?? 0
          const numQuestion = this.test ? this.test.questions : 1;

          //this nonsense is because we are trying to calculate average, and then to display it in 4 significant digit then assign the value back to number type property.
          //toPrecision gets us the significant digits, but it returns string to it needs to be converted back to number using parseFloat function
          attempt.score = parseFloat((scoreSum / numQuestion)?.toPrecision(4));
        }
        else {
          //if not (then someone is still processing this...) then just set the score to 0
          attempt.score = 0;
        }
      }

      //finally set this attempt array and set loading false
      this.testAttempts = attemptArr;
      this.loading = false;
    })
  }
}
