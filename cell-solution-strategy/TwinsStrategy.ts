import { CellSolutionStrategy } from './CellSolutionStrategy.ts'
import { Cell } from '../puzzle-solver/Cell.ts';
import { Puzzle } from '../puzzle-solver/Puzzle.ts';

export class TwinsStrategy extends CellSolutionStrategy {
  findApplicableCell(puzzle: Puzzle): { cell: Cell, otherParams?: any } | undefined {
    const twins = this.findTwins(puzzle);
    if (twins) {
      for (const cell of puzzle.getAllCells().filter(c => c !== twins[0] && c !== twins[1])) {
        for (const symbol of cell.possibleValues) {
          if (twins[0].possibleValues.has(symbol)) {
            return { cell, otherParams: { symbol } };
          }
        }
      }
    }
    return undefined;
  }

  applyChanges(puzzle: Puzzle, cell: Cell, otherParams: { symbol: string }): boolean {
    if (otherParams.symbol && cell.possibleValues.size === 2) {
      for (const symbol of cell.possibleValues) {
        if (symbol !== otherParams.symbol) {
          cell.symbol = symbol;
          return true;
        }
      }
    }
    return false;
  }

  private findTwins(puzzle: Puzzle): [Cell, Cell] | undefined {
    for (const cellA of puzzle.getAllCells()) {
      if (cellA.possibleValues.size !== 2) { continue; }
      for (const cellB of puzzle.getBoxRegion(cellA).iterator()) {
        if (this.setsMatch(cellA.possibleValues, cellB.possibleValues)) {
          return [cellA, cellB];
        }
      }

      for (const cellB of puzzle.getBoxRegion(cellA).iterator()) {
        if (this.setsMatch(cellA.possibleValues, cellB.possibleValues)) {
          return [cellA, cellB];
        }
      }

      for (const cellB of puzzle.getBoxRegion(cellA).iterator()) {
        if (this.setsMatch(cellA.possibleValues, cellB.possibleValues)) {
          return [cellA, cellB];
        }
      }
    }
    return undefined;
  }

  private setsMatch(setA: Set<string>, setB: Set<string>) {
    if (setA.size === setB.size) {
      for (const val of setA.values()) {
        if (!setB.has(val)) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
}
