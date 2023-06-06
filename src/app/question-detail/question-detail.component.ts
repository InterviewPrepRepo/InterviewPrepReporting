import { Component, Input } from '@angular/core';
import { Question } from '../models/question';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  @Input() question: Question = {
    question: '',
    options: [],
    answer: ''
  };

  questionForm = new FormGroup({
    answer: new FormControl(this.question.options[0])
  }
  );
}
