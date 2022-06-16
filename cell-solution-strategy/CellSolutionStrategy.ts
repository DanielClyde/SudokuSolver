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
    const res= this.findApplicableCell(puzzle);
    let changeMade = false;
    if (res) {
      this._numUses++;
      changeMade = this.applyChanges(puzzle, res.cell, res.otherParams);
    }
    this.stopTimer();
    return { changeMade, cell: res?.cell };
  }

  protected abstract findApplicableCell(puzzle: Puzzle): { cell: Cell, otherParams?: any } | undefined;
  protected abstract applyChanges(puzzle: Puzzle, cell: Cell, ...args: any[]): boolean;

  private startTimer() {
    this._startedTime = performance.now();
  }

  private stopTimer() {
    this._elapsedTime += (performance.now() - this._startedTime);
  }
}
