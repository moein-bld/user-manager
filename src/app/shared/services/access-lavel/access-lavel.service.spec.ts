import { TestBed } from '@angular/core/testing';

import { AccessLavelService } from './access-lavel.service';

describe('AccessLavelService', () => {
  let service: AccessLavelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessLavelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
