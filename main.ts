import { PuzzleFileHelper } from './utils/PuzzleFileHelper.ts';
import { PuzzleSolver } from './puzzle-solver/PuzzleSolver.ts';

const puzzleFileHelper = new PuzzleFileHelper();

for await (const file of Deno.readDir('SamplePuzzles/Input')) {
  if (file.name.includes('36x36') || file.name.includes('25x25')) { continue; }
  // console.log(file.name);
}
const puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/Puzzle-4x4-0001.txt`);
puzzle.print();
const solver = new PuzzleSolver(puzzle);
const success = solver.solve();
console.log(success);
puzzle.print();
