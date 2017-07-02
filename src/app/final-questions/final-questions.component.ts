import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-final-questions',
  templateUrl: './final-questions.component.html',
  styleUrls: ['./final-questions.component.css']
})
export class FinalQuestionsComponent implements OnInit {

  instructions = ` במידה וברצונכם לשמוע על מסקנותיו אנא שלחו לנו מייל ל
  stucksongs@gmail.com

  תודה רבה על השתתפותכם במחקר`;
  nextRoute = '/welcome';
  stageTitle = 'מבחן סופי';
  totalProgress = 95;
  isFinal = true;

  constructor(private _sharedService: SharedService, private _router: Router) {
    console.log('setting title');
    _sharedService.SetStageTitleAndProgress(this.stageTitle, this.totalProgress);
  }

  ngOnInit() {
  }

}
