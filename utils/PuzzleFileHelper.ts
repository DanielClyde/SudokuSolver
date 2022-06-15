import { PuzzleFactory } from '../puzzle-solver/PuzzleFactory.ts';
import { SolutionResult } from '../puzzle-solver/PuzzleSolver.ts';

export class PuzzleFileHelper {

  private puzzleFactory = new PuzzleFactory();

  async readPuzzleFromFile(path: string) {
    const text = await Deno.readTextFile(path);
    return this.puzzleFactory.puzzleFromText(text);
  }

  async writePuzzleSolutionToFile(path: string, res: SolutionResult) {
    if (res.error) {
      await Deno.writeTextFile(path, (res.solution?.toString() || '') + '\n' + res.error);
    } else {
      let text = res.solution?.toString() || '';
      text += '\n';
      if (res.stats?.length) {
        for (const s of res.stats) {
          text += `Strategy: ${s.name}\n`;
          text += `Time Elapsed: ${s.totalMS}\n`;
          text += `Used Count: ${s.usedCount}\n\n`;
        }
        await Deno.writeTextFile(path, text);
      }
    }
  }
}
