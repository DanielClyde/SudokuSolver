import { CellSolutionStrategy } from './CellSolutionStrategy.ts';
import { Cell } from '../puzzle-solver/Cell.ts';
import { Puzzle } from '../puzzle-solver/Puzzle.ts';

export class CrooksStrategy extends CellSolutionStrategy {
  protected findApplicableCell(puzzle: Puzzle): Cell | undefined {
    let cell: Cell | undefined = undefined;
    let i = 1;
    while (!cell && i < puzzle.size) {
      cell = this.findCellWithPossibleValues(puzzle, i);
      i++;
    }
    return cell;
  }

  protected applyChanges(puzzle: Puzzle, cell: Cell): boolean {
    const symbol = this.getSymbolGuess(puzzle, cell);
    if (symbol && puzzle.isValidPlacement(cell, symbol)) {
      cell.symbol = symbol;
      puzzle.print();
      return true;
    } else {
      return false;
    }
  }

  private getSymbolGuess(puzzle: Puzzle, cell: Cell): string | null {
    if (cell.possibleValues.size === 1) {
      return cell.possibleValues.values().next().value;
    }
    let symbol: string | null = null;
    for (const s of cell.possibleValues) {
      let neighborHasSymbol = false;
      for (const neighbor of puzzle.getBoxRegion(cell).iterator()) {
        if (neighbor !== cell && neighbor.possibleValues.has(s)) {
          neighborHasSymbol = true;
          break;
        }
      }
      for (const neighbor of puzzle.getRowRegion(cell).iterator()) {
        if (neighbor !== cell && neighbor.possibleValues.has(s)) {
          neighborHasSymbol = true;
          break;
        }
      }
      for (const neighbor of puzzle.getColumnRegion(cell).iterator()) {
        if (neighbor !== cell && neighbor.possibleValues.has(s)) {
          neighborHasSymbol = true;
          break;
        }
      }
      if (!neighborHasSymbol) {
        symbol = s;
        break;
      }
    }
    return symbol;
  }

  private findCellWithPossibleValues(puzzle: Puzzle, count: number) {
    return puzzle.getAllCells().find(c => c.possibleValues.size === count);
  }
}
