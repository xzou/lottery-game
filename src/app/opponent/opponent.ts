export class Opponent {

  // Rate at which mean proportion drifts
  readonly rate: number = .04; 

  private _id: number;
  private _meanProp: number;
  private _name: string;
  private _proportion: number;

  constructor (
    id?: number,
    meanProp?: number,
    name?: string
  ) {
    this._id = id;
    this._meanProp = meanProp;
    this._name = name;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get meanProp(): number {
    return this._meanProp;
  }

  set meanProp(prop: number) {
    this._meanProp = prop;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get proportion(): number {
    return this._proportion;
  }

  /* 
   * Changes the mean proportion based on preset directions.
   * For the calculation, meanProp and rate are multiplied by 1000
   * in order to avoid JavaScript floating point precision issue.
   */
  drift(driftDirection: number): void {
    var meanPropShifted = this._meanProp * 1000; 
    var rate = this.rate * 1000;
    if (driftDirection < 0 && (meanPropShifted - rate) >= 0) {
      meanPropShifted -= rate;
      this._meanProp = meanPropShifted / 1000;
    } else if (driftDirection > 0 &&  (meanPropShifted + rate) <= 1000){
      meanPropShifted += rate;
      this._meanProp = meanPropShifted / 1000;
    }
  }

  getReturn(endowment: number) {
    this._proportion = +(this.getProp(this.meanProp)).toFixed(3);
    return +((this._proportion * (4 * endowment)).toFixed(2)); 
  }

  getProp(mean: number) {
    let min = mean - 0.02;
    let max = mean + 0.02;
    return Math.random() * (max - min) + min;
  }
}

