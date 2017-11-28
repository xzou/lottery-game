import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { ParticipantService } from './participant/participant.service';

@Injectable()
export class IpService {

  constructor(private jsonp: Jsonp,
              private participantService: ParticipantService) { }

  isNewIp() {
    return Observable.forkJoin([
      this.getIp(),
      this.getParticipantIps()
    ])
    .map((data: any[]) => {
      let ip: string = data[0];
      let allIps: string[] = data[1];
      return !allIps.includes(ip);
    });
  }

  getIp(): Observable<any> {
    return this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
                      .map(res => res.json().ip) 
  }

  getParticipantIps(): Observable<string[]> {
    return this.participantService.getParticipants().map(res => {
      return res.map(participant => participant.ip);
    });
  }

  private handleError(error) {
    let errMsg = (error.message) ? error.message : 
      error.status ? `${error.status} - ${error.statusText}` : 
      'Server error happening'; 
    console.log(errMsg);
  }
}
