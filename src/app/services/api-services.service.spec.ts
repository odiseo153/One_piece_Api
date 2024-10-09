import { TestBed } from '@angular/core/testing';

import { ApiService } from './api-services.service';

describe('ApiServicesService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
