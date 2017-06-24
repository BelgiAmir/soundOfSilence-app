import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
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
  ended: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.SetMinutesAndSeconds(this.totalSeconds);
    let timer: Observable<number> = Observable.timer(0, 1000);
    this.timerSub = timer.subscribe(t => this.OnTimerEvent());
  }

  OnTimerEvent(): void {
    this.totalSeconds--;
    this.SetMinutesAndSeconds(this.totalSeconds);
    if (this.totalSeconds == 0) {
      this.timerSub.unsubscribe();
      this.ended = true;
      this.router.navigateByUrl('\selfReport');
    }
  }

  SetMinutesAndSeconds(totalSeconds: number): void {
    this.minutes = Math.floor(totalSeconds / 60);
    this.seconds = totalSeconds - this.minutes * 60;
  }

}
