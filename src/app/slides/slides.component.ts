import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { SlidesService } from './slides.service';
import { ISlide } from './slide';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css'],
  providers:[{provide:CarouselConfig, useValue: {interval: 2500, noPause:true, noWrap:true}}]

})
export class SlidesComponent implements OnInit {
  slides: ISlide[];
  errorMessage: string;


  constructor(private _slidesService: SlidesService) { }

  ngOnInit(): void {
    this._slidesService.getSlides()
      .subscribe(slides => this.slides = slides,
      error => this.errorMessage = <any>error);
  }

}
