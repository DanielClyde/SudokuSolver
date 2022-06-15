import { CellSolutionStrategy } from '../cell-solution-strategy/CellSolutionStrategy.ts';
import { Puzzle } from '../puzzle-solver/Puzzle.ts';
import { GuessStrategy } from '../cell-solution-strategy/GuessStrategy.ts';
import { Cell } from '../puzzle-solver/Cell.ts';
import { CrooksStrategy } from '../cell-solution-strategy/CrooksStrategy.ts';
import { SolutionValidator } from '../validators/SolutionValidator.ts';
import { PuzzleValidator } from '../validators/PuzzleValidator.ts';
import { PuzzleCellValidator } from '../validators/PuzzleCellValidator.ts';

export interface StrategyStats {
  totalMS: number;
  usedCount: number;
  name: string;
}

interface SolutionResult {
  error?: string;
  solution: Puzzle;
  stats: StrategyStats[];
}

export class PuzzleSolver {
  private cellSolutionStrategies: CellSolutionStrategy[] = [
    new GuessStrategy(),
    new CrooksStrategy(),
  ];
  private solutions: Puzzle[] = [];
  private recentlyChangedCells: Cell[] = [];
  private currentPuzzle?: Puzzle;
  private canBacktrack = true;
  private cellValidator = new PuzzleCellValidator();
  private solutionValidator = new SolutionValidator();

  setPuzzle(puzzle: Puzzle) {
    this.currentPuzzle = puzzle;
  }

  solve(): SolutionResult {
    if (!this.currentPuzzle) {
      throw new Error('Please set puzzle before attempting to solve');
    }
    try {
      this.cellValidator.validate({ puzzle: this.currentPuzzle })
    } catch (e) {
      return {
        error: e.message,
        solution: this.currentPuzzle,
        stats: [],
      }
    }
    while (this.currentPuzzle && !this.currentPuzzle?.isSolved() && this.canBacktrack) {
      // await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
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
    const res: SolutionResult = {
      stats: this.cellSolutionStrategies.map(s => s.getStats()),
      solution: this.solutions[0],
    }
    try {
      this.solutionValidator.validate({ puzzle: this.currentPuzzle, solutions: this.solutions });
    } catch (e) {
      res.error = e.message;
    }
    return res;
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
