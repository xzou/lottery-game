import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  readonly totalTrials = 84;

  endowmentT0: number;
  endowmentT1: number;
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
    let reactTime = +(this.endowmentT1 - this.endowmentT0).toFixed(3);
    return reactTime;
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
}
