import { Component, OnInit, Input } from '@angular/core';
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
  @Input() nextBtn = '\exetrminate';
  @Input() progress = 30;
  @Input() stageTitle = 'שלב המבחן';
  @Input() instructions = 'בשלב זה נבקש מכם בחלק מהתמונות לחשוב על השיר שהוצג עימו, ובחלק מן התמונות לא לחשוב על תמונות אלו. תצוגה זו תוצג לכם ארבע פעמים ברצף';
  @Input() final = false;
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
      'CorretAnswerIndex': 0,
      'ImageUrl': './assets/images/2.png'
    },
    {
      'Answers': [
        'טיסה 5325',
        'על כביש החוף',
        'יונתן הקטן',
        'מתנות קטנות'
      ],
      'CorretAnswerIndex': 1,
      'ImageUrl': './assets/images/3.png'
    },
    {
      'Answers': [
        'עטור מצחך זהב שחור',
        'אין לי ארץ אחרת',
        'טיסה 5325',
        'על כביש החוף'
      ],
      'CorretAnswerIndex': 2,
      'ImageUrl': './assets/images/4.png'
    },
    {
      'Answers': [
        'החיים שלנו תותים',
        'עטור מצחך זהב שחור',
        'הזהב של השכונה',
        'על כביש החוף'
      ],
      'CorretAnswerIndex': 0,
      'ImageUrl': './assets/images/5.png'
    },
    {
      'Answers': [
        'מי אוהב אותך יותר ממני',
        'מתנות קטנות',
        'איפה איפה איפה העוגה',
        'את אחלה חמודה'
      ],
      'CorretAnswerIndex': 1,
      'ImageUrl': './assets/images/6.png'
    },
    {
      'Answers': [
        'איפה איפה איפה העוגה',
        'רודוס, בלאגן ברודוס',
        'מי אוהב אותך יותר ממני',
        'יונתן הקטן'
      ],
      'CorretAnswerIndex': 2,
      'ImageUrl': './assets/images/7.png'
    },
    {
      'Answers': [
        'יונתן הקטן',
        'איפה איפה איפה העוגה',
        'רודוס, בלאגן ברודוס',
        'אין לי ארץ אחרת'
      ],
      'CorretAnswerIndex': 0,
      'ImageUrl': './assets/images/8.png'
    },
    {
      'Answers': [
        'יונתן הקטן',
        'אין לי ארץ אחרת',
        'רעמים וברקים בליל חורף קר',
        'ואיך שלא אפנה לראות'
      ],
      'CorretAnswerIndex': 3,
      'ImageUrl': './assets/images/9.png'
    },
    {
      'Answers': [
        'איפה איפה איפה העוגה',
        'תתארו לכם עולם יפה',
        'הזהב של השכונה',
        'עטור מצחך זהב שחור'
      ],
      'CorretAnswerIndex': 0,
      'ImageUrl': './assets/images/10.png'
    },
    {
      'Answers': [
        'את אחלה חמודה',
        'עטור מצחך זהב שחור',
        'אין לי ארץ אחרת',
        'רעמים וברקים בליל חורף קר'
      ],
      'CorretAnswerIndex': 0,
      'ImageUrl': './assets/images/11.png'
    },
    {
      'Answers': [
        'עטור מצחך זהב שחור',
        'איפה איפה איפה העוגה',
        'תתארו לכם עולם יפה',
        'רודוס, בלאגן רודוס'
      ],
      'CorretAnswerIndex': 3,
      'ImageUrl': './assets/images/12.png'
    },
    {
      'Answers': [
        'טיסה 5325',
        'על כביש החוף',
        'יונתן הקטן',
        'עטור מצחך זהב שחור'
      ],
      'CorretAnswerIndex': 3,
      'ImageUrl': './assets/images/13.png'
    },
    {
      'Answers': [
        'על כביש החוף',
        'אין לי ארץ אחרת',
        'איפה איפה איפה העוגה',
        'את אחלה חמודה'
      ],
      'CorretAnswerIndex': 1,
      'ImageUrl': './assets/images/14.png'
    },
    {
      'Answers': [
        'טיסה 5325',
        'הזהב של השכונה',
        'מי אוהב אותך יותר ממני',
        'רעמים וברקים בליל חורף קר'
      ],
      'CorretAnswerIndex': 3,
      'ImageUrl': './assets/images/15.png'
    }
  ];
  constructor(private _poster: PosterService, private _slidesService: SlidesService, private _sharedSrv: SharedService,
    private _http: Http, private _router: Router, private _instructionService: InstructionsService) {

  }


  ngOnInit() {
    this.start();
    this._sharedSrv.SetStageTitleAndProgress(this.stageTitle, this.progress);
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
    const isAnswerCorrect: boolean = currentQuestion.Answers[currentQuestion.CorretAnswerIndex] === this.currentAnswer;
    if (isAnswerCorrect) {
      this.correctAnswersCount++;
      this.correctAnswerTitle.push(answers[correctAnswerIndex]);
      this.correctAnswers++;
    }
    if (this.currentQuestionNumber === this.Questions.length - 1) {

      this.examFinished = true;
      this.typeOfAlert = 'danger';
      this.alertMessage = ' לא עברת, לכן עליך ללמוד שוב ולהבחן בשנית ';
      if (this.DidPass()) {
        this.typeOfAlert = 'success';
        this.didPass = true;
        this.alertMessage = 'עברת את שלב המבחן';
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

    this._instructionService.SetInstructions(this.instructions, this.nextBtn);
    this._router.navigateByUrl('\instructions');
  }
  tryAgain() {
    this.start();
  }
  study() {
    this._router.navigateByUrl('\slides');
  }

}
