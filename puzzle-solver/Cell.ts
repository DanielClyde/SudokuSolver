export class Cell {
  possibleValues = new Set<string>();
  get isEmpty() { return this.symbol === null; }
  constructor(
    readonly row: number,
    readonly col: number,
    public symbol: string | null,
  ) { }
}
