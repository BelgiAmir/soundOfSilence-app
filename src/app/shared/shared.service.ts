import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SharedService {
  private subject: Subject<string> = new Subject<string>();
  private progress: Subject<number> = new Subject<number>();
  stageTitle = "hello";
  stageLevel = 0;
  constructor() { }

  SetStageTitleAndProgress(newTitle: string, newLevel: number) {
    this.stageTitle = newTitle;
    this.subject.next(newTitle);
    this.stageLevel = newLevel;
    this.progress.next(newLevel);
  }

  getProgress(): Observable<number> {
    return this.progress.asObservable();
  }



  getTitle(): Observable<string> {
    return this.subject.asObservable();
  }

}
