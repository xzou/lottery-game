import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { Opponent } from './opponent'; 

@Component({
  selector: 'tg-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.css'],
  animations: [
    trigger('highlight', [
      state('white', style({
        background: 'white'
      })),
      state('red', style({
        background: '#f71b44'
      })),
      transition('white => red', animate('300ms ease-in'))
    ])
  ]
})

export class OpponentComponent implements OnInit {
  @Input() id: number;
  @Input() meanProp: number;
  @Input() name: string;
  @Input() directions: number[];
  @Input() img: string; 
  @Input() highlight: string;

  private _player: Opponent;

  pixelPaths: {} = {
    blue: '/assets/images/pixel_blue.png',
    yellow: '/assets/images/pixel_yellow.png',
    orange: '/assets/images/pixel_orange.png'
  }; 

  constructor() {
  }

  get player(): Opponent {
    return this._player;
  }

  ngOnInit() {
    this._player = new Opponent(this.id, this.meanProp, this.name);
  }
}
