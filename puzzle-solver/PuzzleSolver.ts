import { Puzzle } from './Puzzle.ts';

export class PuzzleSolver {
  constructor(private puzzle: Puzzle) { }

  solve(): boolean {
    const cell = this.puzzle.findEmptyCell();
    if (!cell) { return true; }
    for (const symbol of cell.possibleValues) {
      if (this.puzzle.isValidPlacement(cell, symbol)) {
        cell.symbol = symbol;
        if (this.solve()) {
          return true;
        }
        cell.symbol = null;
      }
    }
    return false;
  }
}
