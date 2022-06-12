import { PuzzleFactory } from '../puzzle-solver/PuzzleFactory.ts'

export class PuzzleFileHelper {

  private puzzleFactory = new PuzzleFactory();

  async readPuzzleFromFile(path: string) {
    const text = await Deno.readTextFile(path);
    return this.puzzleFactory.puzzleFromText(text);
  }

  async writePuzzleSolutionToFile(path: string) {
    await Deno.writeTextFile(path, 'test');
  }
}
