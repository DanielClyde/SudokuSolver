import { CellSolutionStrategy } from '../cell-solution-strategy/CellSolutionStrategy.ts';
import { Puzzle } from '../puzzle-solver/Puzzle.ts';
import { BacktrackingStrategy } from '../cell-solution-strategy/BacktrackingStrategy.ts';
import { Cell } from '../puzzle-solver/Cell.ts';
import { CrooksStrategy } from '../cell-solution-strategy/CrooksStrategy.ts';
import { TwinsStrategy } from '../cell-solution-strategy/TwinsStrategy.ts';

export interface StrategyStats {
  totalMS: number;
  usedCount: number;
  name: string;
}

export interface SolutionResult {
  error?: string;
  solution?: Puzzle;
  stats?: StrategyStats[];
}

export class PuzzleSolver {
  private cellSolutionStrategies: CellSolutionStrategy[] = [
    new TwinsStrategy(),
    new BacktrackingStrategy(),
    new CrooksStrategy(),
  ];
  private solutions: Puzzle[] = [];
  private recentlyChangedCells: Cell[] = [];
  private currentPuzzle?: Puzzle;
  private canBacktrack = true;

  setPuzzle(puzzle: Puzzle) {
    this.currentPuzzle = puzzle;
    this.solutions = [];
    this.recentlyChangedCells = [];
    this.canBacktrack = true;
  }

  solve(): SolutionResult {
    if (!this.currentPuzzle) {
      throw new Error('Please set puzzle before attempting to solve');
    }
    this.findSolutions();
    const res = this.getSolutionResult();
    this.checkSolutionsValid(res);
    return res;
  }

  private getSolutionResult(): SolutionResult {
    return {
      stats: this.cellSolutionStrategies.map(s => s.getStats()),
      solution: this.solutions[0],
    };
  }

  private checkSolutionsValid(res: SolutionResult) {
    if (this.solutions.length > 1) {
      res.error = `Invalid puzzle has ${this.solutions.length} solutions`;
    } else if (!this.solutions.length) {
      res.error = `No solutions found`;
    }
  }

  private findSolutions() {
    while (this.currentPuzzle && !this.currentPuzzle?.isSolved() && this.canBacktrack) {
      let updated = false;
      for (const strategy of this.cellSolutionStrategies) {
        const { changeMade, cell } = strategy.execute(this.currentPuzzle);
        if (changeMade && cell) {
          updated = true;
          this.saveToStack(cell);
          break;
        }
      }
      if (!updated) {
        this.backtrack();
      } else {
        if (this.currentPuzzle.isSolved()) {
          this.solutions.push(this.currentPuzzle.clone());
          this.backtrack();
        }
      }
    }
  }

  private saveToStack(cell: Cell) {
    cell.possibleValues.delete(cell.symbol!);
    if (cell.possibleValues.size) {
      this.recentlyChangedCells.push(cell);
    }
  }

  private backtrack() {
    if (!this.recentlyChangedCells.length) {
      this.canBacktrack = false;
      return;
    }
    this.canBacktrack = true;
    const lastTouchedCell = this.recentlyChangedCells.pop();
    if (lastTouchedCell) {
      lastTouchedCell.symbol = null;
    }
  }
}
