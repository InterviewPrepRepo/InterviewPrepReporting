import { Component, Input } from '@angular/core';
import { ImochaService } from 'src/app/services/imocha-service/imocha.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import TestInvitation from 'src/app/models/testInvitation';
import { NotifyService } from 'src/app/services/notify-service/notify.service';
import { Observable, forkJoin } from 'rxjs';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import ChartData from 'src/app/models/chartData';
@Component({
  selector: 'app-test-attempt-reports',
  templateUrl: './test-attempt-reports.component.html',
  styleUrls: ['./test-attempt-reports.component.css']
})
export class TestAttemptReportsComponent {

  constructor(private imocha: ImochaService, private auth: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private notify: NotifyService) { }

  activeTabIndex = 0;
  attempts: TestInvitation[] = [];
  attemptDetails: Record<number, { questions: TestAttemptQuestion[], testScore: number, scoreData: ChartData }> = {};
  loading: boolean = false;
  allAttemptSectionScore: { name: string, testInvitationId: number, data: number[] }[] = [];
  testId = 0;

  ngOnInit(): void {
    this.loading = true;

    this.activatedRoute.params.subscribe((params) => {
      this.testId = params['testId'];

      this.imocha.getTestAttempts(this.testId).subscribe({
        next: (res) => {
          this.attempts = res.filter((testAttempt: TestInvitation) => testAttempt.email.toLowerCase() === params['email']?.toLowerCase())
          let attemptRequestArr: Observable<{ testInvitationId: number, questions: TestAttemptQuestion[], testScore: number, scoreData: ChartData }>[] = [];

          this.attempts.map((testInvite: TestInvitation) => {
            attemptRequestArr.push(this.imocha.getQuestionsByTestAttemptId(testInvite.testInvitationId));
          })

          forkJoin(attemptRequestArr).subscribe((results) => {
            results.map((singleResult, idx: number) => {
              this.attemptDetails[singleResult.testInvitationId] = {
                questions: singleResult.questions,
                scoreData: singleResult.scoreData,
                testScore: singleResult.testScore
              }
              this.allAttemptSectionScore.push({
                name: `Attempt ${idx + 1}`,
                testInvitationId: singleResult.testInvitationId,
                data: singleResult.scoreData.values
              })
            })
            this.loading = false;
          })

        },
        error: (err) => {
          console.error(err);
          this.router.navigate(['invite'])
        }
      })
    })

    this.notify.manualGradeUpdateObservable$.subscribe((testInvitationId: number) => {
      const updatedScores = this.imocha.calculateScoreData(testInvitationId, this.attemptDetails[testInvitationId].questions);
      this.attemptDetails[testInvitationId].scoreData = updatedScores.scoreData;
      this.attemptDetails[testInvitationId].testScore = updatedScores.testScore;

      this.notify.notifyscoreUpdate(updatedScores);
    });
  }

  activeTab(i: number): void {
    this.activeTabIndex = i;
    this.notify.notifyTabSwitch(i);
  }
}
