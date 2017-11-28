import { Component, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';

import { NavButtonComponent } from '../nav-button/nav-button.component';
import { ParticipantService } from '../participant/participant.service';
import { CurParticipantService } from '../participant/cur-participant.service';

@Component({
  selector: 'tg-payoff',
  templateUrl: './payoff.component.html',
  styleUrls: ['./payoff.component.css'],
  providers: [ ParticipantService ]
})

export class PayoffComponent implements OnDestroy, AfterViewInit {
  idx1: number;
  idx2: number;
  payoff: number; 
  netGains: number[]; 

  constructor(private participantService: ParticipantService,
              private curParticipantService: CurParticipantService,
              private elementRef: ElementRef) {
    this.netGains = this.curParticipantService.netGains; 
    this.idx1 = this.generateIndex(this.netGains.length); 
    do {
      this.idx2 = this.generateIndex(this.netGains.length); 
    } while (this.idx2 === this.idx1)

    this.payoff = +((this.netGains[this.idx1] + this.netGains[this.idx2]).toFixed(2));
    this.curParticipantService.payoff = this.payoff;
    this.curParticipantService.isComplete = true;  
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#3bd4f2';
  }

  ngOnDestroy() {
    this.participantService.updateParticipant(this.curParticipantService.participant)
                            .subscribe(() => console.log('Success'));
  }

  /* 
   * Helper functions
   */

  generateIndex(len: number): number {
    return Math.floor(Math.random() * len);
  }
}
