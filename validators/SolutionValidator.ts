import { PuzzleValidator, ValidationParams } from './PuzzleValidator.ts';

export class SolutionValidator implements PuzzleValidator {
  validate(params: ValidationParams) {
    if (!params?.solutions?.length) {
      throw new Error('No solution found');
    } else if (params?.solutions?.length > 1) {
      throw new Error(`Invalid puzzle, ${params.solutions.length} solutions possible`);
    }
  }
}
