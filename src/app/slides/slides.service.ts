import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ISlide} from './slide';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class SlidesService{
    private _slidesUrl = 'api/slides/slides.json';

    constructor(private _http: Http){}

    getSlides(): Observable<ISlide[]>{
       return this._http.get(this._slidesUrl)
       .map((response: Response) => <ISlide[]> response.json())
       .do(data => console.log('All: ' + JSON.stringify(data)))
       .catch(this.handleError);
    }

    getSlideById(id:string): Observable<ISlide>{
       return this._http.get(this._slidesUrl)
       .map((response: Response) => <ISlide[]> response.json())
       .map(slides=>slides.filter(slide=>slide.slideName == id)[0])
       .do(data => console.log('All: ' + JSON.stringify(data)))
       .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}