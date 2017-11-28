import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Participant } from './participant';

@Injectable()
export class ParticipantService {
  private participantsUrl = 'api/participants';

  constructor(private http: Http) { }
  
  // Get all participants
  getParticipants(): Observable<Array<Participant>> {
    return this.http
                .get(this.participantsUrl)
                .map(res => res.json())
                .catch(this.handleError);
  }

  // Add a new Participant
  addParticipant(participant: Participant): Observable<Participant> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
            .post(this.participantsUrl, JSON.stringify(participant), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
  }

  // Update a Participant
  updateParticipant(participant: Participant): Observable<Participant> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
            .put(this.participantsUrl + '/' + participant._id, JSON.stringify(participant), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

}
