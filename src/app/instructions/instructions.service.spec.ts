import { TestBed, inject } from '@angular/core/testing';

import { InstructionsService } from './instructions.service';

describe('InstructionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstructionsService]
    });
  });

  it('should ...', inject([InstructionsService], (service: InstructionsService) => {
    expect(service).toBeTruthy();
  }));
});
