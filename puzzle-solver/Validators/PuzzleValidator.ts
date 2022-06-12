import { Puzzle } from '../Puzzle.ts';

export interface ValidationParams {
  puzzle: Puzzle;
}

export interface PuzzleValidator {
  validate(params: ValidationParams): void;
}
