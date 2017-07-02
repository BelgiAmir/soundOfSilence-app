import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { SelfReport } from './selfReport.model';
import { PosterService } from '../shared/poster.service';
import { InstructionsService } from '../instructions/instructions.service';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-self-report',
  templateUrl: './self-report.component.html',
  styleUrls: ['./self-report.component.css']
})
export class SelfReportComponent implements OnInit {
  formData = new SelfReport(true, '', '', '', '', true);
  constructor(private router: Router, private _http: Http,
    private _poster: PosterService, private _instructionsService: InstructionsService,
    private _sharedService: SharedService) { }

  ngOnInit() {
    this._sharedService.SetStageTitleAndProgress('שאלון דיווח עצמי', 80);
  }
  submit(form: NgForm): void {
    this._poster.postSelfReport(form.value)
      .subscribe(
      data => console.log('success: ', data),
      err => console.log('error: ', err));

    const nextBtn = 'final';
    const instructionText = 'בשלב האחרון, תבחן שוב על הזכרון של הצמדים שהוצגו קודם לכן ';
    this._instructionsService.SetInstructions(instructionText, nextBtn);
    this.router.navigateByUrl('\instructions');
  }
}
