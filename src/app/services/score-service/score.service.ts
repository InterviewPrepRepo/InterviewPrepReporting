import { Injectable } from '@angular/core';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private baseurl: string = environment.APIBaseURL + 'Grading/';

  constructor(private http: HttpClient) { }


  updateManualScore(q: TestAttemptQuestion): Observable<[{gradeQuestionId :number, questionId: number, testAttempt: number, grade: number}]>{
    return this.http.put<[{gradeQuestionId :number, questionId: number, testAttempt: number, grade: number}]>(this.baseurl, [{"gradedQuestionId": q.manualScoreId, "questionId": q.questionId, "testAttempt": q.testInvitationId, "grade": q.manualScore}]);
  }
}
