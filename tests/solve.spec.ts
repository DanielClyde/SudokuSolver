import { assertExists, assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { PuzzleFileHelper } from '../utils/PuzzleFileHelper.ts';
import { PuzzleSolver } from '../puzzle-solver/PuzzleSolver.ts';

export class SolverTests {
  private puzzleFileHelper = new PuzzleFileHelper();
  private solver = new PuzzleSolver();

  run() {
    Deno.test('Should be able to solve simple 4x4 with number symbols', async () => {
      const puzzle = await this.puzzleFileHelper.readPuzzleFromFile('SamplePuzzles/Input/Puzzle-4x4-0001.txt');
      this.solver.setPuzzle(puzzle);
      const res = this.solver.solve();
      assertExists(res);
      assertExists(res.solution);
      assertEquals(res.error, undefined);
    });

    Deno.test('Should be able to solve simple 4x4 with non-number symbols', async () => {
      const puzzle = await this.puzzleFileHelper.readPuzzleFromFile('SamplePuzzles/Input/Puzzle-4x4-0002.txt');
      this.solver.setPuzzle(puzzle);
      const res = this.solver.solve();
      assertExists(res);
      assertExists(res.solution);
      assertEquals(res.error, undefined);
    });

    Deno.test('Should be able to solve simple 4x4 that requires backtracking a lot', async () => {
      const puzzle = await this.puzzleFileHelper.readPuzzleFromFile('SamplePuzzles/Input/Puzzle-4x4-0902.txt');
      this.solver.setPuzzle(puzzle);
      const res = this.solver.solve();
      assertExists(res);
      assertExists(res.solution);
      assertEquals(res.error, undefined);
    });
  }
}
