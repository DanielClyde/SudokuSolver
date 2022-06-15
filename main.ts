import { PuzzleFileHelper } from './utils/PuzzleFileHelper.ts';
import { PuzzleSolver } from './puzzle-solver/PuzzleSolver.ts';

const puzzleFileHelper = new PuzzleFileHelper();

const puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/Puzzle-4x4-0904.txt`);
puzzle.print();
const solver = new PuzzleSolver();
solver.setPuzzle(puzzle);
const res = solver.solve();
if (res.error) {
  console.log('FAIL');
  console.log(res.error);
} else {
  console.log('SOLVED');
  res.solution.print();
  console.log(res.stats);
}
