import { PuzzleValidator, ValidationParams } from './PuzzleValidator.ts';

export class PuzzleCellValidator implements PuzzleValidator {
  validate(params: ValidationParams) {
    for (const cell of params.puzzle?.getAllCells()) {
      if (cell.symbol) {
        const symbol = cell.symbol;
        cell.symbol = null;
        if (!params.puzzle.getValidSymbols().has(symbol)) {
          throw new Error(`Cell ${cell.row}x${cell.col} has invalid symbol: ${cell.symbol}`);
        }
        if (!params.puzzle.isValidPlacement(cell, symbol)) {
          throw new Error(`Cell ${cell.row}x${cell.col} has started with an invalid state`);
        }
        cell.symbol = symbol;
      }
    }
  }
}
