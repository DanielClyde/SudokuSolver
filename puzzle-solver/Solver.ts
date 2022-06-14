import { Puzzle } from './Puzzle.ts';
import { Cell } from './Cell.ts';

interface SolveResult {
  solved: boolean;
  timeMs: number;
}

export abstract class Solver {
  private started = performance.now();
  private ended = performance.now();
  private recentlyEditedCells: Cell[] = [];
  constructor(protected puzzle: Puzzle) { }

  solve(): SolveResult {
    this.startTimer();
    this.solvePuzzle();
    this.stopTimer();
    return {
      solved: this.puzzle.isSolved(),
      timeMs: this.getSolvedTime(),
    }
  }

  protected abstract getNextCandidateCell(): Cell | undefined;
  protected abstract getSymbolGuessForCell(cell: Cell): string | null;

  private getSolvedTime() {
    return this.ended - this.started;
  }

  private startTimer() {
    this.started = performance.now();
  }

  private stopTimer() {
    this.ended = performance.now();
  }

  private solvePuzzle(updated = true): boolean {
    if (this.puzzle.isSolved()) {
      return true;
    } else if (updated) {
      const cell = this.getNextCandidateCell();
      if (cell) {
        const symbol = this.getSymbolGuessForCell(cell);
        if (symbol && this.puzzle.isValidPlacement(cell, symbol)) {
          cell.symbol = symbol;
          cell.possibleValues.delete(symbol);
          if (this.solvePuzzle(true)) {
            return true;
          }
          cell.symbol = null;
          cell.possibleValues.add(symbol);
        } else {
          return this.solvePuzzle(false);
        }
      } else {
        return this.solvePuzzle(false);
      }
    }
    return false;
  }
}
