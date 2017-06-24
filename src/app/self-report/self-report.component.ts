import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable'
import { SelfReport } from './selfReport.model';
import { PosterService } from '../shared/poster.service';
@Component({
  selector: 'app-self-report',
  templateUrl: './self-report.component.html',
  styleUrls: ['./self-report.component.css']
})
export class SelfReportComponent implements OnInit {
  formData = new SelfReport(true, '', '', '', '', true);
  constructor(private _http: Http, private _poster: PosterService) { }

  ngOnInit() {
  }
  submit(form: NgForm): void {
    this._poster.postSelfReport(form.value)
      .subscribe(
      data => console.log('success: ', data),
      err => console.log('error: ', err))
  }
}
