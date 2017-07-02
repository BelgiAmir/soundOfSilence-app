import { Component, OnInit, Input } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { SlidesService } from './slides.service';
import { Slide } from './slide';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { PosterService } from '../shared/poster.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { InstructionsService } from '../instructions/instructions.service';
@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css'],
  providers: [{ provide: CarouselConfig, useValue: { interval: 2500, noPause: true, noWrap: true } }]

})
export class SlidesComponent implements OnInit {
  slides: Slide[];
  errorMessage: string;
  currentImageNumber: number;
  currentImage: Slide;
  timerSub: Subscription;
  showNextButton: boolean;
  @Input() showTitle = true;
  @Input() nextBtn = '\questions';
  @Input() progress = 15;
  @Input() stageTitle = 'שלב הלמידה';
  @Input() instructions = 'בשלב הבא אתם תבחנו על הצמדים שלמדתם. רק בציון 80, תוכלו לעבור הלאה';
  @Input() repetitions = 1;
  constructor(private _http: Http, private _poster: PosterService, private _slidesService: SlidesService,
    private router: Router, private _sharedService: SharedService, private _instruction: InstructionsService) {
    console.log('setting title');
  }

  ngOnInit(): void {

    this._sharedService.SetStageTitleAndProgress(this.stageTitle, this.progress);
    this._slidesService.getSlides()
      .subscribe(slides => {
        this.slides = this.CreateSlidesWithRepitions(slides);
        const timer = Observable.timer(2500, 2500);
        this.timerSub = timer.subscribe(t => this.OnTimerEvent());

        this.currentImageNumber = 0;
        this.currentImage = this.slides[this.currentImageNumber];
      },
      error => this.errorMessage = <any>error);

    this.showNextButton = false;

  }
  CreateSlidesWithRepitions(slides: Slide[]): Slide[] {
    let slidesBuilt = slides;
    for (let i = 1; i < this.repetitions; i++) {
      slidesBuilt = slidesBuilt.concat(slides);
    }
    return slidesBuilt;

  }
  OnTimerEvent(): void {
    this.currentImageNumber++;
    this.currentImage = this.slides[this.currentImageNumber];
    if (this.currentImageNumber === this.slides.length - 1) {
      this.timerSub.unsubscribe();
      this.showNextButton = true;
    }
  }

  continue() {
    this._poster.postSelfReport(this.slides)
      .subscribe(
      data => console.log('success: ', data),
      err => console.log('error: ', err));

    this._instruction.SetInstructions(this.instructions, this.nextBtn);
    this.router.navigateByUrl('\instructions');
  }

  exit() {
    this.router.navigateByUrl('\exitSite');
  }

}
