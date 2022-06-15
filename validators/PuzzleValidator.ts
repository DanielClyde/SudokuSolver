import { Puzzle } from '../puzzle-solver/Puzzle.ts';

export interface ValidationParams {
  puzzle: Puzzle;
  solutions?: Puzzle[];
}

export interface PuzzleValidator {
  validate(params: ValidationParams): void;
}
