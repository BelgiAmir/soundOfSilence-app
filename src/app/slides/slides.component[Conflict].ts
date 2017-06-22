import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { SlidesService } from './slides.service';
import { Slide } from './slide';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

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
  timerSub: Subscription

  constructor(private _slidesService: SlidesService) { }

  ngOnInit(): void {
    this._slidesService.getSlides()
      .subscribe(slides => {
        this.slides = slides
        let timer = Observable.timer(2000, 1000);
        this.timerSub = timer.subscribe(t => this.OnTimerEvent());

        this.currentImageNumber = 0;
        this.currentImage = this.slides[this.currentImageNumber];
      },
      error => this.errorMessage = <any>error);


  }

  OnTimerEvent(): void {
    this.currentImageNumber++;
    this.currentImage = this.slides[this.currentImageNumber];
    if (this.currentImageNumber == this.slides.length - 1) {
      this.timerSub.unsubscribe();
    }
  }
}
