import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { CurParticipantService } from '../participant/cur-participant.service';

@Component({
  selector: 'tg-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})

export class InstructionComponent implements OnInit {
  @Input() page: number;
  @Input() text: string;
  @Input() imgSrc: string;
  @Input() maxPage: number;

  @Output() pageChange = new EventEmitter<number>();

  constructor(private curParticipantService: CurParticipantService) { }

  ngOnInit() {
  }

  setPage(page: number): void {
    this.page = page;
    this.pageChange.emit(this.page);
  }
}
