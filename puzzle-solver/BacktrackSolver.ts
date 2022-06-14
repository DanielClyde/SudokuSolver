import { Solver } from './Solver.ts';
import { Puzzle } from './Puzzle.ts';
import { Cell } from './Cell.ts';

export class BacktrackSolver extends Solver {
  constructor(puzzle: Puzzle) {
    super(puzzle);
  }

  protected getNextCandidateCell(): Cell | undefined {
    return this.puzzle.findEmptyCell();
  }

  protected getSymbolGuessForCell(cell: Cell): string | null {
    return cell.possibleValues.values().next()?.value || null;
  }
}
