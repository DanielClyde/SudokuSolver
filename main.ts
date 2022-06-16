import { PuzzleFileHelper } from './utils/PuzzleFileHelper.ts';
import { PuzzleSolver, SolutionResult } from './puzzle-solver/PuzzleSolver.ts';
import { Puzzle } from './puzzle-solver/Puzzle.ts';

const puzzleFileHelper = new PuzzleFileHelper();
const solver = new PuzzleSolver();

if (Deno.args.length) {
  for (const fileName of Deno.args) {
    await solvePuzzle(fileName);
  }
}


async function solvePuzzle(fileName: string) {
  let puzzle: Puzzle;
  let res: SolutionResult = {};
  try {
    puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/${fileName}`);
  } catch (e) {
    await failedToReadPuzzle(e, res, fileName);
    return;
  }
  solver.setPuzzle(puzzle);
  res = solver.solve();
  if (res.error) {
    console.log('Failed to solve: ', fileName, res.error);
  } else {
    console.log('Solved: ', fileName);
  }
  await puzzleFileHelper.writePuzzleSolutionToFile(`SamplePuzzles/Output/${fileName}`, res);
}

async function failedToReadPuzzle(e: Error, res: SolutionResult, fileName: string) {
  console.log('Invalid Puzzle: ', fileName, e.message);
  res = {
    error: e.message,
  };
  await puzzleFileHelper.writePuzzleSolutionToFile(`SamplePuzzles/Output/${fileName}`, res);
}
