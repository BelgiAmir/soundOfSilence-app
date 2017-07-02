import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { SlidesService } from '../slides/slides.service';
import { Slide } from 'app/slides/slide';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-exterminate',
  templateUrl: './exterminate.component.html',
  styleUrls: ['./exterminate.component.css']
})
export class ExterminateComponent {

  showTitle = false;
  instructions = ' בשלב הבא, מוצג משחק טטריס לחמש דקות, תהנו';
  nextRoute = '/tetris';
  stageTitle = 'שלב תחשוב/אל תחשוב';
  totalProgress = 50;
  repetitions = 5;

  constructor(private _sharedService: SharedService, private _router: Router) {
    console.log('setting title');
    _sharedService.SetStageTitleAndProgress(this.stageTitle, this.totalProgress);
  }

}
