import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavButtonComponent } from '../nav-button/nav-button.component';


@Component({
  selector: 'app-opponent-search',
  templateUrl: './opponent-search.component.html',
  styleUrls: ['./opponent-search.component.css']
})

export class OpponentSearchComponent implements OnInit {
  opponentFound: boolean = false;
  players: string[]; 
  
  constructor(private http: Http) {
    this.http.get('/assets/players.json')
        .subscribe(res => {
          this.players = res.json().map(player => player.name);
        });
  }

  ngOnInit() {
    setTimeout(() => this.opponentFound = true, 8000);
  }
}
