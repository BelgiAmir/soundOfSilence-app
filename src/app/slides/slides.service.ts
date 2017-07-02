import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Slide } from './slide';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class SlidesService {
  private _imagesUrl = 'public/Images.1.json';

  private images = [
    './assets/images/1.png',
    './assets/images/2.png',
    './assets/images/3.png',
    './assets/images/4.png',
    './assets/images/5.png',
    './assets/images/6.png',
    './assets/images/7.png',
    './assets/images/8.png',
    './assets/images/9.png',
    './assets/images/10.png',
    './assets/images/11.png',
    './assets/images/12.png',
    './assets/images/13.png',
    './assets/images/14.png',
    './assets/images/15.png'
  ];

  private _songsUrl = 'public/Songs.1.json';

  private songs = [
    'תתארו לכם עולם יפה',
    'הזהב של השכונה',
    'על כביש החוף',
    'טיסה 5325',
    'החיים שלנו תותים',
    'מתנות קטנות',
    'מי אוהב אותך יותר ממני',
    'יונתן הקטן',
    'ואיך שלא אפנה לראות',
    'איפה איפה איפה העוגה',
    'את אחלה חמודה',
    'רודוס, בלאגן רודוס',
    'עטור מצחך זהב שחור',
    'אין לי ארץ אחרת',
    'רעמים וברקים בליל חורף קר'
  ];
  constructor(private _http: Http) { }

  getSlides(): Observable<Slide[]> {


    const imagessObservable = Observable.of(this.images);
    const songsObservable = Observable.of(this.songs);

    return Observable.zip(imagessObservable, songsObservable,
      (images, songs) =>
        this.CombineImagesAndSongs(images, songs));
  }

  private ReadFromJson(path: string): Observable<string[]> {
    return this._http.get(path)
      .map((response: Response) => <string[]>response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private CombineImagesAndSongs
    (images: string[], songs: string[]): Slide[] {
    const slides: Slide[] = [];
    let tnt = 'אל תחשוב';
    for (let i = 0; i < images.length; i++) {
      if (i % 2 === 0) {
        tnt = 'חשוב';
      }
      // tslint:disable-next-line:one-line
      else {
        tnt = 'אל תחשוב';
      }

      slides[i] = new Slide(images[i], songs[i], tnt);
    }
    this.shuffle(slides);

    return slides;
  }

  private shuffle<T>(array: T[]) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }
}
