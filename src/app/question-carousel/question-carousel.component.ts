import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionsService } from '../services/questions-service/questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-carousel',
  templateUrl: './question-carousel.component.html',
  styleUrls: ['./question-carousel.component.css']
})
export class QuestionCarouselComponent implements OnInit {
  currentSlide: number = 0;
  warning: string = 'warning';
  striped: any = 'striped';
  ngOnInit(): void {
    this.sampleQuestions = this.questions.getQuestions();
  }
  constructor(private questions: QuestionsService, private router: Router) { }
  sampleQuestions: Question[] = []

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.currentSlide : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.sampleQuestions.length ? this.currentSlide : next;
    // when they reach the end, navigate to another component to show link to invite imocha
    if (next === this.sampleQuestions.length) this.router.navigate(['interview']);
  }
}
