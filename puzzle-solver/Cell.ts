export class Cell {
  get isEmpty() { return this.symbol === null; }
  constructor(
    readonly row: number,
    readonly col: number,
    public symbol: string | null,
  ) { }
}
