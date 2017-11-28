import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { InstructionComponent } from '../instruction/instruction.component';
import { NavButtonComponent } from '../nav-button/nav-button.component';

@Component({
  selector: 'tg-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})

export class InstructionsComponent implements OnInit {
  page: number = 1;
  instructions: {page: number, text: string, imgSrc: string}[];
  maxPage: number; 

  constructor(private http: Http) {
    this.http.get('/assets/instructions.json')
              .subscribe(res => {
                this.instructions = res.json();
                this.maxPage = this.instructions.length;
              }); 
  }

  ngOnInit() {
  }

  setPage(page: number): void {
    this.page = page;
  }

  pageChange(page: number): void{
    this.page = page;
  }
}
