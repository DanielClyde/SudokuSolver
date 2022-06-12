import { Puzzle } from './Puzzle.ts';
import { Cell } from './Cell.ts';

export class PuzzleSolver {
  constructor(private puzzle: Puzzle) { }

  solve(): boolean {
    const cell = this.puzzle.findEmptyCell();
    if (!cell) { return true; }
    console.log('looking at', cell);
    for (const symbol of this.puzzle.getValidSymbols()) {
      if (this.isValidPlacement(cell, symbol)) {
        cell.symbol = symbol;
        if (this.solve()) { return true; }
        cell.symbol = null;
      }
    }
    return false;
  }

  private symbolInRow(cell: Cell, symbol: string): boolean {
    return this.puzzle.getRowRegion(cell).contains(symbol);
  }

  private symbolInColumn(cell: Cell, symbol: string): boolean {
    return this.puzzle.getColumnRegion(cell).contains(symbol);
  }

  private symbolInBox(cell: Cell, symbol: string): boolean {
    return this.puzzle.getBoxRegion(cell).contains(symbol);
  }


  private isValidPlacement(cell: Cell, symbol: string): boolean {
    return !this.symbolInRow(cell, symbol) &&
      !this.symbolInColumn(cell, symbol) &&
      !this.symbolInBox(cell, symbol);
  }
}
