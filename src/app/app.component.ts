import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  progress = 0;
  errorMessage: string;
  constructor(private _sharedSrv: SharedService) {
    this.title = _sharedSrv.stageTitle;
    this._sharedSrv.getTitle().subscribe(title => {
      this.title = title;
    },
      error => this.errorMessage = <any>error);
    this._sharedSrv.getProgress().subscribe(progress => {
      this.progress = progress;
    },
      error => this.errorMessage = <any>error);
  }
}
