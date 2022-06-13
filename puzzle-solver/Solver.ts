import { Puzzle } from './Puzzle.ts';
import { Cell } from './Cell.ts';

interface SolveResult {
  solved: boolean;
  timeMs: number;
}

export abstract class Solver {
  private started = performance.now();
  private ended = performance.now();
  constructor(protected puzzle: Puzzle) { }

  solve(): SolveResult {
    this.startTimer();
    let updated = true;
    while (updated && !this.puzzle.isSolved()) {
      const cell = this.getNextCandidateCell();
      if (cell) {
        const symbol = this.getSymbolGuessForCell(cell);
        if (symbol) {
          cell.symbol = symbol;
          cell.possibleValues.delete(symbol);
          updated = true;
        }
      }
    }
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
}
