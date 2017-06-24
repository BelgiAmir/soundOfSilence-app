import { Component, OnInit } from '@angular/core';
import { SlidesService } from 'app/slides/slides.service';
import { Slide } from 'app/slides/slide';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { MultipleChoiceQuestion } from 'app/question/MultipleChoiceQuestion'
import { Http, Response } from '@angular/http';
import { SharedService } from '../shared/shared.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  moduleId: module.id,
})
export class QuestionComponent implements OnInit {

  constructor(private _slidesService: SlidesService, private _sharedSrv: SharedService,
    private _http: Http, private _router: Router) {
    _sharedSrv.SetStageTitleAndProgress("שלב המבחן", 30);
  }

  slides: Slide[];
  currSlide: Slide;
  Questions: MultipleChoiceQuestion[];
  currentAnswer: string;
  currentQuestionNumber: number;
  correctAnswersCount: number;
  examFinished: boolean;
  typeOfAlert: string = "success";
  alertMessage: string;
  didPass = false;
  ngOnInit() {
    this.start();
  }

  start(): void {
    this._slidesService.getSlides()
      .subscribe(slides => {
        this.slides = slides
        this.currSlide = slides[0];
        this.examFinished = false;
        this._http.get('api/slides/Questions.1.json')
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
      if (this.DidPass()) {
        this.typeOfAlert = "success";
        this.didPass = true;
        this.alertMessage = "עברת את שלב המבחן"
      }
      else {
        this.typeOfAlert = "danger";
        this.alertMessage = " לא עברת, לכן עליך ללמוד שוב ולהבחן בשנית "
      }
      return;
    }
    this.currentAnswer = "";
    this.currentQuestionNumber++;
  }

  DidPass(): boolean {
    return (this.correctAnswersCount / this.Questions.length) * 100 >= 80;
  }

  continue() {
    this._router.navigateByUrl('\exetrminate');
  }
  tryAgain() {
    this.start();
  }
  study() {
    this._router.navigateByUrl('\slides');
  }

}
