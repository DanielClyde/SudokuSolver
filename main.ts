import { PuzzleFileHelper } from './utils/PuzzleFileHelper.ts';
import { CrooksSolver } from './puzzle-solver/CrooksSolver.ts'
import { BacktrackSolver } from './puzzle-solver/BacktrackSolver.ts';

const puzzleFileHelper = new PuzzleFileHelper();

for await (const file of Deno.readDir('SamplePuzzles/Input')) {
  if (file.name.includes('36x36') || file.name.includes('25x25')) { continue; }
  // console.log(file.name);
}
let puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/Puzzle-4x4-0101.txt`);
// console.log('CROOKS');
// puzzle.print();
// const crooks = new CrooksSolver(puzzle);
// crooks.solve();
// puzzle.print();

console.log('BACKTRACK')
puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/Puzzle-4x4-0101.txt`);
puzzle.print();
const backtrack = new BacktrackSolver(puzzle);
backtrack.solve();
puzzle.print();
