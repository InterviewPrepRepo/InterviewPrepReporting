import { Component, Input, OnInit } from '@angular/core';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import { ScoreService } from '../services/score-service/score.service';
import { NotifyService } from '../services/notify-service/notify.service';
import { ImochaService } from '../services/imocha-service/imocha.service';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-report-answer-section',
  templateUrl: './report-answer-section.component.html',
  styleUrls: ['./report-answer-section.component.css']
})
export class ReportAnswerSectionComponent implements OnInit {
  @Input() questions: TestAttemptQuestion[] = []
  @Input() displayCorrectAnswer: boolean = true;

  currentQuestion: number = 1;
  videoUrl: string = "";

  constructor(private scoreService: ScoreService, private notify: NotifyService, private imocha: ImochaService) { }
  
  ngOnInit(): void {
    this.switchVideo();
  }

  switchVideo(index?: number) {
    if (!index) {
      index = this.questions.findIndex(q => q.questionStatus === 'Answered')
    }
    this.currentQuestion = index + 1;
    if (this.questions[index] && this.questions[index].questionStatus === 'Answered' && this.questions[index].candidateAnswer.videoAnswer) {
      this.videoUrl = this.questions[index].candidateAnswer.videoAnswer.videoUrl;
    }
    else {
      this.videoUrl = "";
    }
  }

  updateManualScore(question: TestAttemptQuestion, manualScore: NgModel) {
    if(manualScore.valid) {
      console.log(manualScore, question);
      if(manualScore.model === null) {
        manualScore.control.setErrors({'null': 'value is null'});
      }
      else {
        this.scoreService.updateManualScore(question).subscribe({
          next: (res) => {
            question.updateSuccess = true;
            question.manualScoreId = res[0].gradedQuestionId;
            this.notify.notifymanualGradeUpdate(question.testInvitationId);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }
  
  scoreStatus(status: string, score: number): string {
    if (score < 0) return "No Score";
    return "Score : " + score + "/100";
  }
}
