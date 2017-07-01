import { Component, OnInit } from '@angular/core';
import { SlidesService } from 'app/slides/slides.service';
import { Slide } from 'app/slides/slide';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { MultipleChoiceQuestion } from 'app/question/MultipleChoiceQuestion';
import { Http, Response } from '@angular/http';
import { SharedService } from '../shared/shared.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PosterService } from '../shared/poster.service';

import { InstructionsService } from '../instructions/instructions.service';

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

  slides: Slide[];
  correctAnswers: number;
  currSlide: Slide;
  Questions: MultipleChoiceQuestion[];
  currentAnswer: string;
  currentQuestionNumber: number;
  correctAnswersCount: number;
  correctAnswerTitle: string[] = [];
  examFinished: boolean;
  typeOfAlert = 'success';
  alertMessage: string;
  didPass = false;
  questions: MultipleChoiceQuestion[] = [
    {
      'Answers': [
        'טיסה 5325',
        'את אחלה חמודה',
        'מי אוהב אותך יותר ממני',
        'תתארו לכם עולם יפה'
      ],
      'CorretAnswerIndex': 3,
      'ImageUrl': './assets/images/1.png'
    },
    {
      'Answers': [
        'הזהב של השכונה',
        'איפה איפה איפה העוגה',
        'רודוס, בלאגן ברודוס',
        'אין לי ארץ אחרת'
      ],
      'CorretAnswerIndex': 3,
      'ImageUrl': './assets/images/2.png'
    },
    {
      'Answers': [
        'טיסה 5325',
        'על כביש החוף',
        'יונתן הקטן',
        'מתנות קטנות'
      ],
      'CorretAnswerIndex': 3,
      'ImageUrl': './assets/images/3.png'
    }
  ];
  constructor(private _poster: PosterService, private _slidesService: SlidesService, private _sharedSrv: SharedService,
    private _http: Http, private _router: Router, private _instructionService: InstructionsService) {
    _sharedSrv.SetStageTitleAndProgress('שלב המבחן', 30);
  }


  ngOnInit() {
    this.start();
  }

  start(): void {
    this._slidesService.getSlides()
      .subscribe(slides => {
        this.slides = slides;
        this.currSlide = slides[0];
        this.examFinished = false;
        Observable.of(this.questions)
          .subscribe(questions => this.Questions = questions);
        this.currentQuestionNumber = 0;
        this.correctAnswersCount = 0;
        this.correctAnswers = 1;
      },
      error => console.log(<any>error));
  }
  MoveToNextImage(): void {
    const currentQuestion = this.Questions[this.currentQuestionNumber];
    const answers = currentQuestion.Answers;
    const correctAnswerIndex = currentQuestion.CorretAnswerIndex;
    const isAnswerCorrect: boolean = currentQuestion.Answers[currentQuestion.CorretAnswerIndex] == this.currentAnswer;
    if (isAnswerCorrect) {
      this.correctAnswersCount++;
      this.correctAnswerTitle.push(answers[correctAnswerIndex]);
      this.correctAnswers++;
    }
    if (this.currentQuestionNumber == this.Questions.length - 1) {

      this.examFinished = true;
      if (this.DidPass()) {
        this.typeOfAlert = 'success';
        this.didPass = true;
        this.alertMessage = 'עברת את שלב המבחן';
      }
      else {
        this.typeOfAlert = 'danger';
        this.alertMessage = ' לא עברת, לכן עליך ללמוד שוב ולהבחן בשנית ';
      }
      return;
    }
    this.currentAnswer = '';
    this.currentQuestionNumber++;
  }

  DidPass(): boolean {
    return (this.correctAnswersCount / this.Questions.length) * 100 >= 80;
  }

  continue() {
    this._poster.postSelfReport(this.correctAnswerTitle)
      .subscribe(
      data => console.log('success: ', data),
      err => console.log('error: ', err));

    let nextBtn = '\exetrminate';
    let instructionText = 'בשלב זה נבקש מכם לחשוב/לא לחשוב על השירים בהתאם לתמונות מספר פעמים ברצף';
    this._instructionService.SetInstructions(instructionText, nextBtn);
    this._router.navigateByUrl('\instructions');
  }
  tryAgain() {
    this.start();
  }
  study() {
    this._router.navigateByUrl('\slides');
  }

}
