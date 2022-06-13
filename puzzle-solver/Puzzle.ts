import { Cell } from './Cell.ts';
import { Row, Column, Box, PuzzleRegion } from './PuzzleRegion.ts'

export class Puzzle {
  private validSymbols: Set<string> = new Set();
  private cells: Cell[] = [];
  private rows: { [index: number]: Row } = {};
  private columns: { [index: number]: Column } = {};
  private boxes: { [index: number]: Box } = {};

  readonly boxSize: number;

  constructor(readonly size: number, cells: Cell[], validSymbols: Iterable<string>) {
    this.boxSize = Math.sqrt(size);
    this.initializeRegions();
    for (const symbol of validSymbols) {
      this.validSymbols.add(symbol);
    }
    for (const cell of cells) {
      this.addCell(cell);
    }
    this.initializePossibleValues();
  }

  isSolved() {
    return !this.findEmptyCell();
  }

  findEmptyCell(): Cell | undefined {
    return this.cells.find(c => c.isEmpty);
  }

  getValidSymbols(): Iterable<string> {
    return this.validSymbols;
  }

  getRowRegion(cell: Cell | number): PuzzleRegion {
    if (cell instanceof Cell) {
      return this.rows[cell.row];
    } else {
      return this.rows[cell];
    }
  }

  getColumnRegion(cell: Cell | number): PuzzleRegion {
    if (cell instanceof Cell) {
      return this.columns[cell.col];
    } else {
      return this.columns[cell];
    }
  }

  getBoxRegion(cell: Cell | number): PuzzleRegion {
    if (cell instanceof Cell) {
      return this.boxes[Box.GetBoxIndex(cell, this.boxSize)];
    } else {
      return this.boxes[cell];
    }
  }

  getAllCells(): Cell[] {
    return this.cells;
  }

  isValidPlacement(cell: Cell, symbol: string): boolean {
    return !this.symbolInRow(cell, symbol) &&
      !this.symbolInColumn(cell, symbol) &&
      !this.symbolInBox(cell, symbol);
  }

  private initializePossibleValues() {
    for (const cell of this.cells) {
      if (cell.isEmpty) {
        for (const symbol of this.validSymbols) {
          if (this.isValidPlacement(cell, symbol)) {
            cell.possibleValues.add(symbol);
          }
        }
      }
    }
  }

  private initializeRegions() {
    for (let i = 0; i < this.size; i++) {
      this.rows[i] = new Row(this.size);
      this.columns[i] = new Column(this.size);
      this.boxes[i] = new Box(this.size);
    }
  }

  private addCell(cell: Cell) {
    this.rows[cell.row].addCell(cell);
    this.columns[cell.col].addCell(cell);
    this.boxes[Box.GetBoxIndex(cell, this.boxSize)].addCell(cell);
    this.cells.push(cell);
  }

  private symbolInRow(cell: Cell, symbol: string): boolean {
    return this.getRowRegion(cell).contains(symbol);
  }

  private symbolInColumn(cell: Cell, symbol: string): boolean {
    return this.getColumnRegion(cell).contains(symbol);
  }

  private symbolInBox(cell: Cell, symbol: string): boolean {
    return this.getBoxRegion(cell).contains(symbol);
  }



  print() {
    console.log(`${this.size}x${this.size} puzzle`);
    console.log('valid symbols:', this.validSymbols);
    for (let i = 0; i < this.size; i++) {
      let rowString = '';
      for (const cell of this.rows[i].iterator()) {
        rowString += (cell.isEmpty ? '-' : cell.symbol) + '\t';
      }
      console.log(rowString);
    }
  }
}
