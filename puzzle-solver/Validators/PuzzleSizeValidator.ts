import { PuzzleValidator, ValidationParams } from './PuzzleValidator.ts';

export class SizeValidator implements PuzzleValidator {
  validate(params: ValidationParams) {
    const size = params.puzzle.size;
    if (!size || !this.sizeIsPerfectSquare(size)) {
      throw new Error('Puzzle size must be a perfect square');
    }
    for (let i = 0; i < size; i++) {
      if (params.puzzle.getRowRegion(i).size !== size) {
        throw new Error(`Each row in a ${size}x${size} puzzle must have exactly ${size} columns`);
      }
      if (params.puzzle.getColumnRegion(i).size !== size) {
        throw new Error(`Each column in a ${size}x${size} puzzle must have exactly ${size} rows`);
      }
    }
  }

  private sizeIsPerfectSquare(size: number) {
    return Math.sqrt(size) % 1 === 0;
  }
}
