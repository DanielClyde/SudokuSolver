import { Puzzle } from './Puzzle.ts';
import { Cell } from './Cell.ts';
import { Solver } from './Solver.ts';

export class CrooksSolver extends Solver {
  constructor(puzzle: Puzzle) {
    super(puzzle);
  }

  protected getNextCandidateCell(): Cell | undefined {
    let cell: Cell | undefined = undefined;
    let i = 1;
    while (!cell && i < this.puzzle.size) {
      cell = this.findCellWithPossibleValues(i);
      i++;
    }
    return cell;
  }

  protected getSymbolGuessForCell(cell: Cell): string | null {
    if (cell.possibleValues.size === 1) {
      return cell.possibleValues.values().next().value;
    }
    let symbol: string | null = null;
    for (const s of cell.possibleValues) {
      let neighborHasSymbol = false;
      for (const neighbor of this.puzzle.getBoxRegion(cell).iterator()) {
        if (neighbor !== cell && neighbor.possibleValues.has(s)) {
          neighborHasSymbol = true;
          break;
        }
      }
      for (const neighbor of this.puzzle.getRowRegion(cell).iterator()) {
        if (neighbor !== cell && neighbor.possibleValues.has(s)) {
          neighborHasSymbol = true;
          break;
        }
      }
      for (const neighbor of this.puzzle.getColumnRegion(cell).iterator()) {
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

  private findCellWithPossibleValues(count: number) {
    return this.puzzle.getAllCells().find(c => c.possibleValues.size === count);
  }


}
