import { Cell } from './Cell.ts';

export abstract class PuzzleRegion {
  protected cells: { [index: number]: Cell } = {};
  get currentSize() { return Object.keys(this.cells).length; }

  constructor(protected maxSize: number) { }

  abstract addCell(cell: Cell): void;

  getCell(index: number): Cell {
    return this.cells[index];
  }

  contains(symbol: string): boolean {
    return Object.values(this.cells).findIndex(cell => cell.symbol === symbol) > -1;
  }

  public * iterator() {
    for (let i = 0; i < this.maxSize; i++) {
      const cell = this.cells[i];
      yield cell;
    }
  }
}

export class Row extends PuzzleRegion {
  addCell(cell: Cell) {
    this.cells[cell.col] = cell;
  }
}

export class Column extends PuzzleRegion {
  addCell(cell: Cell) {
    this.cells[cell.row] = cell;
  }
}

export class Box extends PuzzleRegion {

  static GetBoxIndex(cell: Cell, gridWidth: number) {
    const boxWidth = Math.ceil(Math.sqrt(gridWidth));
    const col = Math.floor(cell.col / boxWidth);
    const row = Math.floor(cell.row / boxWidth);
    const ret = col + (row * boxWidth);
    return ret;
  }

  addCell(cell: Cell) {
    const index = this.currentSize;
    this.cells[index] = cell;
  }
}
