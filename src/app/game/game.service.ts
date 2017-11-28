import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  readonly totalTrials = 2;

  endowmentT0: number;
  endowmentT1: number;
  delayEvents = {
    isWaitingForOpp: false,
    isWaitingForReturn: false
  }
  oppIds: number[];

  constructor() { }

  checkGameOver(trial: number): boolean {
    return trial === this.totalTrials;
  }

  /**
   * Returns the index of the drift direction in the directions array.
   * The direction index depends on the trial number. 
   * E.g. during the first volatility period, the shift direction can be found
   * in directions[0].
   */
  getDirectionsIdx(trial: number) {
    return Math.floor(trial / 28);
  }

  getOppId(trial: number): number {
    if (trial % 3 === 1) {
      this.oppIds = this.randomizeOpponents();
    }
    return this.oppIds.shift();
  }

  getReactTime(): number {
    this.endowmentT1 = performance.now();
    return this.endowmentT1 - this.endowmentT0;
  }

  inVolatilityPeriod(trial: number): boolean {
    let remainder = trial % 24;
    return trial > 10 && ((remainder >= 0 && remainder < 4) || (remainder > 12 && remainder < 24));
  }

  randomizeOpponents(): number[] {
    let ids = [];
    let id: number;
    for (let i = 0; i < 3; i++) {
      do {
        id = Math.floor(Math.random() * 3);
      } while (ids.includes(id));
      ids.push(id); 
    }
    return ids;
  }

  setDelay(event: string, threshold: number, minTime: number): void {
    let prob = Math.random();
    if (prob <= threshold) {
      this.delayEvents[event] = true;
      let time = Math.random() * 3500 + minTime;
      setTimeout(() => {
        this.delayEvents[event] = false;
        this.setTime(event);
      }, time);
    } else {
      this.setTime(event);
    }
  }

  setTime(event: string): void {
    if (event === 'isWaitingForOpp') {
      this.endowmentT0 = performance.now();
    }
  }
}
