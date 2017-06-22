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
    private _imagesUrl = 'api/slides/Images.json';
    private _songsUrl = 'api/slides/Songs.json';

    constructor(private _http: Http) { }

    getSlides(): Observable<Slide[]> {
        let imagessObservable = this.ReadFromJson(this._imagesUrl);
        let songsObservable = this.ReadFromJson(this._songsUrl);

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
        let slides: Slide[] = [];

        for (let i = 0; i < images.length; i++) {

            slides[i] = new Slide(images[i], songs[i]);
        }

        this.shuffle(slides);
        return slides;
    }

    private shuffle<T>(array: T[]) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
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