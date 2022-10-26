import { TestBed } from '@angular/core/testing';

import { RxjsLabService } from './rxjs-lab.service';

describe('RxjsLabService', () => {
  let service: RxjsLabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsLabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
