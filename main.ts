import { PuzzleFileHelper } from './utils/PuzzleFileHelper.ts';
import { PuzzleSolver } from './puzzle-solver/PuzzleSolver.ts';
import { CrooksSolver } from './puzzle-solver/CrooksSolver.ts'

const puzzleFileHelper = new PuzzleFileHelper();

for await (const file of Deno.readDir('SamplePuzzles/Input')) {
  if (file.name.includes('36x36') || file.name.includes('25x25')) { continue; }
  // console.log(file.name);
}
const puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/Puzzle-4x4-0001.txt`);
// const solver = new PuzzleSolver(puzzle);
// solver.solve();
// puzzle.print();

// puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/Puzzle-4x4-0001.txt`);
puzzle.print();
const crooks = new CrooksSolver(puzzle);
crooks.solve();
puzzle.print();
