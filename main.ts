import { PuzzleFileHelper } from './utils/PuzzleFileHelper.ts';
import { PuzzleSolver, SolutionResult } from './puzzle-solver/PuzzleSolver.ts';
import { Puzzle } from './puzzle-solver/Puzzle.ts';

const puzzleFileHelper = new PuzzleFileHelper();

for await (const file of Deno.readDir('SamplePuzzles/Input')) {
  let puzzle: Puzzle;
  let res: SolutionResult = { };
  console.log('solving', file.name);
  try {
    puzzle = await puzzleFileHelper.readPuzzleFromFile(`SamplePuzzles/Input/${file.name}`);
  } catch (e) {
    res = {
      error: e.message,
    };
    await puzzleFileHelper.writePuzzleSolutionToFile(`SamplePuzzles/Output/${file.name}`, res);
    continue;
  }
  if (!res.error) {
    const solver = new PuzzleSolver();
    solver.setPuzzle(puzzle);
    res = solver.solve();
    console.log(!!res.error);
    await puzzleFileHelper.writePuzzleSolutionToFile(`SamplePuzzles/Output/${file.name}`, res);
  }
}
