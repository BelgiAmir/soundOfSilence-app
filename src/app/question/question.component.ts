import { Component, OnInit } from '@angular/core';
import { SlidesService } from 'app/slides/slides.service';
import { Slide } from 'app/slides/slide';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { MultipleChoiceQuestion } from 'app/question/MultipleChoiceQuestion'
import { Http, Response } from '@angular/http';

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  moduleId: module.id,
})
export class QuestionComponent implements OnInit {

  constructor(private _slidesService: SlidesService, private _http: Http) { }
  slides: Slide[];
  currSlide: Slide;
  Questions: MultipleChoiceQuestion[];
  currentAnswer: string;
  currentQuestionNumber: number;
  correctAnswersCount: number;
  examFinished: boolean;
  seasons = [
    'מיר מיר',
    'תמיד אוהב',
    'נוי נוי',
    'תמיד תמיד',
  ];

  ngOnInit() {
    this._slidesService.getSlides()
      .subscribe(slides => {
        this.slides = slides
        this.currSlide = slides[0];
        this.examFinished = false;
        this._http.get('api/slides/Questions.json')
          .map((response: Response) => <MultipleChoiceQuestion[]>response.json())
          .do(data => console.log('Questions: ' + JSON.stringify(data)))
          .subscribe(questions => this.Questions = questions);
        this.currentQuestionNumber = 0;
        this.correctAnswersCount = 0;
      },
      error => console.log(<any>error));
  }

  MoveToNextImage(): void {
    let currentQuestion = this.Questions[this.currentQuestionNumber];
    let isAnswerCorrect: boolean = currentQuestion.Answers[currentQuestion.CorretAnswerIndex] == this.currentAnswer;
    if (isAnswerCorrect) {
      this.correctAnswersCount++;
    }
    if (this.currentQuestionNumber == this.Questions.length - 1) {
      this.examFinished = true;
      return;
    }
    this.currentAnswer = "";
    this.currentQuestionNumber++;
  }

}
