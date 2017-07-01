import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InstructionsService } from './instructions.service';
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  public instructions = this._instructService.instructStage;
  constructor(private router: Router, private _instructService: InstructionsService) { }

  ngOnInit() {

  }

  continue(): void {
    let nextStage = this._instructService.nextStage;
    this.router.navigateByUrl(nextStage);
  }
}
