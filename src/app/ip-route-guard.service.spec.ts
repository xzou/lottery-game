import { TestBed, inject } from '@angular/core/testing';

import { IpRouteGuardService } from './ip-route-guard.service';

describe('RouteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpRouteGuardService]
    });
  });

  it('should be created', inject([IpRouteGuardService], (service: IpRouteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
