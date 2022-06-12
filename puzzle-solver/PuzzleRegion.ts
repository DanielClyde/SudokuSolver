import { Cell } from './Cell.ts';

export abstract class PuzzleRegion {
  protected cells: { [index: number]: Cell } = {};
  get size() { return Object.keys(this.cells).length; }

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
      yield this.cells[i];
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

  static GetBoxIndex(cell: Cell, boxWidth: number) {
    const col = Math.floor(cell.col / boxWidth);
    const row = Math.floor(cell.row / boxWidth);
    return col + (row * boxWidth);
  }

  addCell(cell: Cell) {
    this.cells[Box.GetBoxIndex(cell, Math.sqrt(this.size))] = cell;
  }
}
