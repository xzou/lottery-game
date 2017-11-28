import { Component } from '@angular/core';

import { CurParticipantService } from './participant/cur-participant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ CurParticipantService ]
})

export class AppComponent {
  title = 'Iterated Trust Game';
}
