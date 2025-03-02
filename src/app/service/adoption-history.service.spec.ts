import { TestBed } from '@angular/core/testing';

import { AdoptionHistoryService } from './adoption-history.service';

describe('AdoptionHistoryService', () => {
  let service: AdoptionHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptionHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
