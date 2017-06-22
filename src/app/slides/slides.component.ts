import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { SlidesService } from './slides.service';
import { Slide } from './slide';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

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
  stageTitle: string;

  constructor(private _slidesService: SlidesService, private router: Router, private _sharedService: SharedService) {
    console.log("setting title");
    _sharedService.SetStageTitleAndProgress("שלב הלמידה", 15);
  }

  ngOnInit(): void {
    
    this._slidesService.getSlides()
      .subscribe(slides => {
        this.slides = slides
        let timer = Observable.timer(2500, 2500);
        this.timerSub = timer.subscribe(t => this.OnTimerEvent());

        this.currentImageNumber = 0;
        this.currentImage = this.slides[this.currentImageNumber];
      },
      error => this.errorMessage = <any>error);

    this.showNextButton = false;

  }

  OnTimerEvent(): void {
    this.currentImageNumber++;
    this.currentImage = this.slides[this.currentImageNumber];
    if (this.currentImageNumber == this.slides.length - 1) {
      this.timerSub.unsubscribe();
      this.showNextButton = true;
    }
  }

  continue() {
    this.router.navigateByUrl('\questions');
  }

  exit() {
    this.router.navigateByUrl('\exitSite');
  }

}
