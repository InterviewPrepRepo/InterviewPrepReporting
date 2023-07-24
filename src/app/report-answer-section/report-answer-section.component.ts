import { Component, Input, OnInit } from '@angular/core';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import { ScoreService } from '../services/score-service/score.service';
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

  constructor(private scoreService: ScoreService) { }
  
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

  updateManualScore(question: TestAttemptQuestion, manualScore: any) {
    console.log('updating manual score', question, manualScore);
    if(manualScore.valid) {
      this.scoreService.updateManualScore(question).subscribe({
        next: (res) => {
          console.log('score update worked!', res);
          question.updateSuccess = true;
          console.log(manualScore);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
  
  scoreStatus(status: string, score: number): string {
    if (score < 0) return "No Score";
    return "Score : " + score + "/100";
  }
}
