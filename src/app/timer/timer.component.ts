import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { InstructionsService } from '../instructions/instructions.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() totalSeconds: number;
  timerSub: Subscription;
  minutes: number;
  seconds: number;
  ended = false;
  constructor(private router: Router, private _instructionsService: InstructionsService) { }

  ngOnInit() {
    this.SetMinutesAndSeconds(this.totalSeconds);
    const timer: Observable<number> = Observable.timer(0, 1000);
    this.timerSub = timer.subscribe(t => this.OnTimerEvent());
  }

  OnTimerEvent(): void {
    this.totalSeconds--;
    this.SetMinutesAndSeconds(this.totalSeconds);
    if (this.totalSeconds == 0) {
      this.timerSub.unsubscribe();
      this.ended = true;
      const instructionText = 'בשלב זה עליך למלא שאלון דיווח עצמי, אודות התהליך שעברת';
      this._instructionsService.SetInstructions(instructionText, '\selfReport');
      this.router.navigateByUrl('\instructions');
    }
  }

  SetMinutesAndSeconds(totalSeconds: number): void {
    this.minutes = Math.floor(totalSeconds / 60);
    this.seconds = totalSeconds - this.minutes * 60;
  }

}
