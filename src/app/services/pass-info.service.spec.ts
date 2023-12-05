import { TestBed } from '@angular/core/testing';

import { PassInfoService } from './pass-info.service';

describe('PassInfoService', () => {
  let service: PassInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
