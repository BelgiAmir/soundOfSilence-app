export class Slide {
    imageUrl: string;
    SongTitle: string;
    tnt: string

    constructor(image: string, song: string, tnt: string) {
        this.imageUrl = image;
        this.SongTitle = song;
        this.tnt = tnt;
    }
}