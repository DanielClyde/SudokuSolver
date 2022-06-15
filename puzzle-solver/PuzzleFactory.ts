import { Puzzle } from './Puzzle.ts';
import { Cell } from './Cell.ts';
import { PuzzleValidator } from '../validators/PuzzleValidator.ts';
import { CellValidator } from '../validators/PuzzleCellValidator.ts';
import { SizeValidator } from '../validators/PuzzleSizeValidator.ts';

const SIZE_INDEX = 0;
const VALID_SYMBOLS_INDEX = 1;

export class PuzzleFactory {
  private validators: PuzzleValidator[] = [
    new SizeValidator(),
    new CellValidator(),
  ];

  puzzleFromText(text: string): Puzzle {
    const textRows = text.split('\r\n');
    const size = this.getSizeFromRows(textRows);
    const validSymbols = this.getValidSymbolsFromRows(textRows);
    textRows.splice(0, 2);
    const cells = this.getCellsFromRows(textRows);
    const puzzle = new Puzzle(size, cells, validSymbols);
    for (const validator of this.validators) {
      validator.validate({ puzzle });
    }
    return puzzle;
  }

  private getSizeFromRows(rows: string[]): number {
    return +rows[SIZE_INDEX];
  }

  private getValidSymbolsFromRows(rows: string[]): string[] {
    return rows[VALID_SYMBOLS_INDEX].split(' ');
  }

  private getCellsFromRows(rows: string[]): Cell[] {
    const cells: Cell[] = [];
    rows.forEach((row, r) => {
      if (row.length) {
        row.split(' ').forEach((cell, c) => {
          cells.push(new Cell(r, c, !cell || cell === '-' ? null : cell));
        });
      }
    });
    return cells;
  }
}
