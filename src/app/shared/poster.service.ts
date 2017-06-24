import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { SelfReport } from '../self-report/selfReport.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';


@Injectable()
export class PosterService {

  constructor(private _http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.fields || {};
  }

  private handleError(error: any) {
    console.error('post error: ', error);
    return Observable.throw(error.statusText);
  }
  postSelfReport(selfReport: SelfReport): Observable<any> {
    let body = JSON.stringify(selfReport);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post('/add', body, options)
      .map(this.extractData).catch(this.handleError);
  }
}
