import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstructionsService {
  instructStage = '';
  nextStage = '*';
  constructor() { }

  SetInstructions(instructions: string, nextPage: string) {
    this.instructStage = instructions;
    this.nextStage = nextPage;
  }
}
