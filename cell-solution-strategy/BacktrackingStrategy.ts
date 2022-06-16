import { CellSolutionStrategy } from './CellSolutionStrategy.ts';
import { Cell } from '../puzzle-solver/Cell.ts';
import { Puzzle } from '../puzzle-solver/Puzzle.ts';

export class BacktrackingStrategy extends CellSolutionStrategy {
  protected findApplicableCell(puzzle: Puzzle): { cell: Cell, otherParams?: any } | undefined {
    const cell = puzzle.findEmptyCell();
    return cell ? { cell } : undefined;
  }

  protected applyChanges(puzzle: Puzzle, cell: Cell): boolean {
    for (const symbol of cell.possibleValues) {
      if (puzzle.isValidPlacement(cell, symbol)) {
        cell.symbol = symbol;
        return true;
      }
    }
    return false;
  }
}
