import { assertEquals, assertFalse } from 'https://deno.land/std/testing/asserts.ts';
import { PuzzleFileHelper } from '../utils/PuzzleFileHelper.ts';

export class ValidationTests {
  private puzzleFileHelper = new PuzzleFileHelper();

  run() {
    Deno.test('Should know when puzzle is formatted incorrectly', async () => {
      try {
        const puzzle = await this.puzzleFileHelper.readPuzzleFromFile('SamplePuzzles/Input/Puzzle-4x4-0905.txt');
        assertFalse(true); // Should not reach here
      } catch (e) {
        assertEquals(e.message, 'Each column in a 4x4 puzzle must have exactly 4 rows');
      }
    });

    Deno.test('Should know when there are invalid symbols in the puzzle', async () => {
      try {
        const puzzle = await this.puzzleFileHelper.readPuzzleFromFile('SamplePuzzles/Input/Puzzle-4x4-0901.txt');
        assertFalse(true); // Should not reach here
      } catch (e) {
        assertEquals(e.message, 'Cell 0x1 has invalid symbol: 9');
      }
    });
  }
}
