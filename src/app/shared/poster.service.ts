import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { SelfReport } from '../self-report/selfReport.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';


@Injectable()
export class PosterService {
  public fileName = '';
  public countStage = 0;
  constructor(private _http: Http) {
    this.fileName = (Math.floor(Date.now() / 1000)) + '.json';
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.fields || {};
  }

  private handleError(error: any) {
    console.error('post error: ', error);
    return Observable.throw(error.statusText);
  }
  postSelfReport(any: any): Observable<any> {
    const body = JSON.stringify(any);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.countStage++;
    const inData = JSON.stringify({ 'body': any, 'fileName': this.fileName + this.countStage.toString() });

    return this._http.post('http://sosserver.azurewebsites.net/api/add', inData, options)
      .map(this.extractData).catch(this.handleError);
  }
}
