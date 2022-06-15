import { PuzzleFileHelper } from './utils/PuzzleFileHelper.ts';
import { PuzzleSolver, SolutionResult } from './puzzle-solver/PuzzleSolver.ts';
import { Puzzle } from './puzzle-solver/Puzzle.ts';

const puzzleFileHelper = new PuzzleFileHelper();
const solver = new PuzzleSolver();

for await (const file of Deno.readDir('SamplePuzzles/Input')) {
  let puzzle: Puzzle;
  let res: SolutionResult = {};
  console.log('solving', file.name);
  try {
    puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/${file.name}`);
  } catch (e) {
    await failedToReadPuzzle(e, res, file.name);
    continue;
  }
  solver.setPuzzle(puzzle);
  res = solver.solve();
  await puzzleFileHelper.writePuzzleSolutionToFile(`SamplePuzzles/Output/${file.name}`, res);
}

async function failedToReadPuzzle(e: Error, res: SolutionResult, fileName: string) {
  res = {
    error: e.message,
  };
  await puzzleFileHelper.writePuzzleSolutionToFile(`SamplePuzzles/Output/${fileName}`, res);
}
