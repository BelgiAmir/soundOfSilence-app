import { Component, OnInit } from '@angular/core';
import { Timer } from 'angular-timer';
import { FocusModule } from 'angular2-focus';
import { AutofocusDirective } from '../shared/focus.directive';
@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {

  gameDuration: number = 5;
  constructor() { }

  ngOnInit() {
  }

}
