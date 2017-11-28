import { Component, OnInit } from '@angular/core';

import { CurParticipantService } from '../participant/cur-participant.service';

@Component({
  selector: 'tg-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})

export class CodeComponent implements OnInit {
  code: string;

  constructor(private curParticipantService: CurParticipantService) {
    this.code = this.curParticipantService.code;
  }

  ngOnInit() {
  }
}
