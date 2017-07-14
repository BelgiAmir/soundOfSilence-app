import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { InstructionsService } from '../instructions/instructions.service';
import { SlidesService } from '../slides/slides.service';
import { Slide } from '../slides/slide';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  slides: Slide[];
  errorMessage: string;
  constructor(private router: Router, private _sharedSrv: SharedService,
    private _instructionService: InstructionsService, private _slidesService: SlidesService) {
    _sharedSrv.SetStageTitleAndProgress('ברוכים הבאים', 0);
  }

  ngOnInit() {
    this._slidesService.getSlides()
      .subscribe(slides => {
        this.slides = slides;
      },
      error => this.errorMessage = <any>error);
  }

  continue() {
    const nextBtn = '\slides';
    const instructionText = 'בשלב זה, עליכם ללמוד 15 צמדים של תמונות ושמות של שירים מוכרים';
    this._instructionService.SetInstructions(instructionText, nextBtn);
    this.router.navigateByUrl('\instructions');
  }

  exit() {
    this.router.navigateByUrl('\exitSite');
  }
}
