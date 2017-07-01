import { Component, OnInit } from '@angular/core';
import { Timer } from 'angular-timer';
import { FocusModule } from 'angular2-focus';
import { AutofocusDirective } from '../shared/focus.directive';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {

  gameDuration = 5;
  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this._sharedService.SetStageTitleAndProgress('טטריס', 65);
  }

}
