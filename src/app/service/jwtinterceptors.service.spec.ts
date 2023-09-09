import { TestBed } from '@angular/core/testing';

import { JwtinterceptorsService } from './jwtinterceptors.service';

describe('JwtinterceptorsService', () => {
  let service: JwtinterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtinterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
