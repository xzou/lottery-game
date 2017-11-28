import { Component, OnDestroy, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Http } from '@angular/http';

import { OpponentComponent } from '../opponent/opponent.component';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { ParticipantService } from '../participant/participant.service';
import { CurParticipantService } from '../participant/cur-participant.service';
import { GameService } from './game.service';

@Component({
  selector: 'tg-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [ ParticipantService,
               GameService 
  ],
  animations: [
    trigger('flip', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
      })),
      transition('inactive => active', animate('500ms ease-in'))
    ]),
  ]
})

export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(OpponentComponent) opponents: QueryList<OpponentComponent>

  endowment: number = 0.5;
  endowmentSubmitted: boolean;
  flip: string = 'inactive';
  isGameOver: boolean;
  inTrial: boolean;
  netGain: number = 0;
  opponent: OpponentComponent; 
  oppReturn: number; 
  playerImgPath: string = '/assets/images/player_purple.png';
  trialNumber: number = 1;
  imgPaths: string[] = [
    '/assets/images/player_blue.png',
    '/assets/images/player_yellow.png',
    '/assets/images/player_orange.png'
  ]
  oppSettings: {
    id: number,
    name: string,
    meanProp: number,
    directions: number[],
    img: string,
    highlight: string
  }[];
  pixelPaths: {} = {
    blue: '/assets/images/pixel_blue.png',
    yellow: '/assets/images/pixel_yellow.png',
    orange: '/assets/images/pixel_orange.png'
  }; 
  oppArray: OpponentComponent[]; 

  constructor(private participantService: ParticipantService,
              private curParticipantService: CurParticipantService,
              private gameService: GameService,
              private elementRef: ElementRef,
              private http: Http) {
    this.http.get('/assets/players.json')
        .subscribe(res => {
          this.oppSettings = res.json();
          this.setColors();
        });
  }

  /* 
   * Angular lifecycle hooks
   */

  ngAfterViewInit() {
    this.opponents.changes.subscribe(() => {
      this.oppArray = this.opponents.toArray();
    });
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FDFBEB';
  }

  ngOnDestroy() {
    this.participantService.updateParticipant(this.curParticipantService.participant)
                            .subscribe();
  }

  /*
   * Component functions called when buttons clicked
   */

  nextTrial(): void {
    this.inTrial = false;
    this.endowmentSubmitted = false;
    this.isGameOver = this.gameService.checkGameOver(this.trialNumber); 
    this.trialNumber++;
    this.flip = 'inactive';
  }

  selectOpponent(): void {
    setTimeout(() => {
        this.inTrial = true;
        this.oppSettings[oppId].highlight = 'white';
    }, 1200);
    let oppId = this.gameService.getOppId(this.trialNumber); 
    this.oppSettings[oppId].highlight = 'red';
    this.opponent = this.oppArray[oppId];
    this.drift();
    this.curParticipantService.addOpponent(oppId + 1);
    this.curParticipantService.addProportion(this.opponent.player.meanProp);
    this.gameService.setDelay('isWaitingForOpp', 0.5, 500);
  }

  setEndowment() {
    this.endowmentSubmitted = true;
    this.curParticipantService.addReactTime(this.gameService.getReactTime());
    this.oppReturn = this.opponent.player.getReturn(this.endowment);
    this.netGain = +((1 - this.endowment + this.oppReturn).toFixed(2));
    this.curParticipantService.addEndowment(this.endowment);
    this.curParticipantService.addReturn(this.oppReturn);
    this.curParticipantService.addNetGain(this.netGain);
    this.curParticipantService.addActualProp(this.opponent.player.proportion);
    this.gameService.setDelay('isWaitingForReturn', 1, 1000);
    this.flip = 'active';
  }
 
  /*
   * Helper functions
   */

  drift(): void {
    if (this.gameService.inVolatilityPeriod(this.trialNumber)) {
      let dirIdx = this.gameService.getDirectionsIdx(this.trialNumber);
      let direction = this.opponent.directions[dirIdx];
      this.opponent.player.drift(direction);
    }
  }

  setColors(): void {
    let oppOrder = this.gameService.randomizeOpponents();
    this.oppSettings.forEach((opponent, index) => {
      let oppId = oppOrder[index];
      opponent.img = this.imgPaths[oppId];
      opponent.id = oppId + 1;
    });
  }
}

