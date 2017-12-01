/*
 * Component for the experiment's first page. The participant's
 * first name, age, gender, and IP are collected, and an entry is created
 * in the database. 
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Participant } from '../participant/participant';
import { ParticipantService } from '../participant/participant.service';
import { CurParticipantService } from '../participant/cur-participant.service';
import { IpService } from '../ip.service';

  @Component({
    selector: 'tg-name',
    templateUrl: './name.component.html',
    styleUrls: ['./name.component.css'],
    providers: [ ParticipantService ]
  })

export class NameComponent implements OnInit {

  constructor(private router: Router,
              private participantService: ParticipantService,
              private curParticipantService: CurParticipantService,
              private ipService: IpService) { }

  firstName: string = '';
  age: string = '';
  gender: string = '';
  genders: string[] = ['female', 'male'];
  ip: string = '';
  isComplete: boolean = false;

  ngOnInit() {
    this.ipService.getIp().subscribe(ip => this.ip = ip);
  }

  /* 
   * Saves the new participant to the database, and updates the participant's
   * information in the CurParticipantService which is shared across all
   * components. 
   */
  createParticipant(): void {
    const newParticipant = new Participant(this.firstName, parseInt(this.age), this.gender, this.ip, this.isComplete);
    this.participantService.addParticipant(newParticipant)
        .subscribe(participant => {
          this.curParticipantService.age = participant.age;
          this.curParticipantService.code = participant.mturkCode;
          this.curParticipantService.gender = participant.gender;
          this.curParticipantService.id = participant._id;
          this.curParticipantService.ip = participant.ip;
          this.curParticipantService.name = participant.name;

          this.router.navigateByUrl('/informed-consent', { replaceUrl: true });
        }); 
  } 

  isValid(): boolean {
    return this.firstName !== '' && this.age !== '' && this.gender !== '';
  }
}
