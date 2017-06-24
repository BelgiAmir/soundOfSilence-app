import { TestBed, inject } from '@angular/core/testing';

import { PosterService } from './poster.service';

describe('PosterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PosterService]
    });
  });

  it('should ...', inject([PosterService], (service: PosterService) => {
    expect(service).toBeTruthy();
  }));
});
