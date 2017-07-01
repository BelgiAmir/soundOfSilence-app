import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { InstructionsService } from '../instructions/instructions.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private _sharedSrv: SharedService,
    private _instructionService: InstructionsService) {
    _sharedSrv.SetStageTitleAndProgress('ברוכים הבאים', 0);
  }

  ngOnInit() {
  }
  continue() {
    let nextBtn = '\slides';
    let instructionText = 'בשלב זה, עליכם ללמוד 15 צמדים של תמונות ושמות של שירים מוכרים';
    this._instructionService.SetInstructions(instructionText, nextBtn);
    this.router.navigateByUrl('\instructions');
  }

  exit() {
    this.router.navigateByUrl('\exitSite');
  }
}
