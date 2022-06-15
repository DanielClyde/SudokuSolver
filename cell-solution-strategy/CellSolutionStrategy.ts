import { Cell } from '../puzzle-solver/Cell.ts';
import { Puzzle } from '../puzzle-solver/Puzzle.ts';
import { StrategyStats } from '../puzzle-solver/PuzzleSolver.ts';

export abstract class CellSolutionStrategy {
  get numUses() { return this._numUses; }
  get elapsedTime() { return this._elapsedTime; }
  private _numUses = 0;
  private _startedTime = 0;
  private _elapsedTime = 0;

  getStats(): StrategyStats {
    return {
      totalMS: this.elapsedTime,
      name: this.constructor.name,
      usedCount: this.numUses,
    }
  }

  execute(puzzle: Puzzle): { changeMade: boolean, cell: Cell | undefined } {
    this.startTimer();
    const cell = this.findApplicableCell(puzzle);
    let changeMade = false;
    if (cell) {
      this._numUses++;
      changeMade = this.applyChanges(puzzle, cell);
    }
    this.stopTimer();
    return { changeMade, cell };
  }

  protected abstract findApplicableCell(puzzle: Puzzle): Cell | undefined;
  protected abstract applyChanges(puzzle: Puzzle, cells: Cell): boolean;

  private startTimer() {
    this._startedTime = performance.now();
  }

  private stopTimer() {
    this._elapsedTime += (performance.now() - this._startedTime);
  }
}
