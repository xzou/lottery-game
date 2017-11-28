import { Injectable } from '@angular/core';

import { Participant } from './participant';

@Injectable()
export class CurParticipantService {

  constructor() { }

  private _participant: Participant = {
    _id: '',
    age: 0,
    gender: '',
    ip: '',
    isComplete: false,
    isCorrect: false,
    mturkCode: '',
    name: '',
    payoff: 0,
    actualProportion: [],
    endowment: [],
    netGains: [],
    proportion: [],
    opponentNumber: [],
    reactionTime: [],
    returned: []
  };

  get participant(): Participant {
    return this._participant;
  }

  set id(id: string) {
    this._participant._id = id;
  }

  get age(): number {
    return this._participant.age;
  }

  set age(age: number) {
    this._participant.age = age;
  }

  get gender(): string {
    return this._participant.gender;
  }

  get code(): string {
    return this._participant.mturkCode;
  }

  set code(mturkCode: string) {
    this._participant.mturkCode = mturkCode;
  }

  set gender(gender: string) {
    this._participant.gender = gender;
  }

  get ip(): string {
    return this._participant.ip;
  }

  set ip(ip: string) {
    this._participant.ip = ip;
  }

  set isComplete(state: boolean) {
    this._participant.isComplete = state; 
  }

  get isCorrect(): boolean {
    return this._participant.isCorrect;
  }

  set isCorrect(state: boolean) {
    this._participant.isCorrect = state; 
  }

  get name(): string {
    return this._participant.name;
  }

  set name(firstName: string) {
    this._participant.name = firstName;
  }

  get payoff(): number {
    return this._participant.payoff;
  }

  set payoff(amount: number) {
    this._participant.payoff = amount;
  }

  get actualProportions(): number[] {
    return this._participant.actualProportion;
  }

  addActualProp(prop: number): void {
    this._participant.actualProportion.push(prop);
  }

  get netGains(): number[] {
    return this._participant.netGains;
  }

  addNetGain(amount: number): void {
    this._participant.netGains.push(amount);
  }

  get opponents(): number[] {
    return this._participant.opponentNumber;
  }

  addOpponent(num: number): void {
    this._participant.opponentNumber.push(num);
  }

  get endowments(): number[] {
    return this._participant.endowment; 
  }

  addEndowment(amount: number): void {
    this._participant.endowment.push(amount);
  }

  get returns(): number[] {
    return this._participant.returned;
  }

  addReturn(amount: number): void {
    this._participant.returned.push(amount);
  }

  get reactionTimes(): number[] {
    return this._participant.reactionTime;
  }

  addReactTime(time: number): void {
    this._participant.reactionTime.push(time);
  }

  get proportions(): number[] {
    return this._participant.proportion;
  }

  addProportion(proportion: number): void {
    this._participant.proportion.push(proportion);
  }
}
