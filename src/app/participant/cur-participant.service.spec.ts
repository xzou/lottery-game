import { TestBed, inject } from '@angular/core/testing';

import { CurParticipantService } from './cur-participant.service';

describe('CurParticipantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurParticipantService]
    });
  });

  it('should be created', inject([CurParticipantService], (service: CurParticipantService) => {
    expect(service).toBeTruthy();
  }));
});
