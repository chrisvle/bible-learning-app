import { TestBed, inject } from '@angular/core/testing';

import { BibleService } from './bible.service';

describe('BibleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BibleService]
    });
  });

  it('should be created', inject([BibleService], (service: BibleService) => {
    expect(service).toBeTruthy();
  }));
});
