import { Cell } from './Cell.ts';

export interface PuzzleSolvingStrategy {
  getNextCandidate(): Cell;

}
