import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionsService } from '../services/questions-service/questions.service';

@Component({
  selector: 'app-question-carousel',
  templateUrl: './question-carousel.component.html',
  styleUrls: ['./question-carousel.component.css']
})
export class QuestionCarouselComponent implements OnInit {
  ngOnInit(): void {
    this.sampleQuestions = this.questions.getQuestions();
  }
  constructor(private questions: QuestionsService) { }
  sampleQuestions: Question[] = []


}
