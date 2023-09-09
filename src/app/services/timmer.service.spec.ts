import { TestBed } from '@angular/core/testing';

import { TimmerService } from './timmer.service';

describe('TimmerService', () => {
  let service: TimmerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimmerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
