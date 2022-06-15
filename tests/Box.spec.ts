import { assertEquals, assertExists } from 'https://deno.land/std/testing/asserts.ts';
import { Cell } from '../puzzle-solver/Cell.ts';
import { Box } from '../puzzle-solver/PuzzleRegion.ts'
import { PuzzleFileHelper } from '../utils/PuzzleFileHelper.ts';

Deno.test('Getting box index 4x4', () => {
  // box 0
  let cell = new Cell(0, 0, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 0);
  cell = new Cell(0, 1, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 0);
  cell = new Cell(1, 0, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 0);
  cell = new Cell(1, 1, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 0);
  // box 1
  cell = new Cell(0, 2, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 1);
  cell = new Cell(0, 3, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 1);
  cell = new Cell(1, 2, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 1);
  cell = new Cell(1, 3, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 1);
  // box 2
  cell = new Cell(2, 0, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 2);
  cell = new Cell(2, 1, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 2);
  cell = new Cell(3, 0, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 2);
  cell = new Cell(3, 1, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 2);
  // box 3
  cell = new Cell(2, 2, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 3);
  cell = new Cell(2, 3, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 3);
  cell = new Cell(3, 2, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 3);
  cell = new Cell(3, 3, 'A');
  assertEquals(Box.GetBoxIndex(cell, 4), 3);
});

Deno.test('Getting box index 9x9', () => {
  // box 0
  checkBox(0, [0, 1, 2], [0, 1, 2]);
  // box 1
  checkBox(1, [0, 1, 2], [3, 4, 5]);
  // box 2
  checkBox(2, [0, 1, 2], [6, 7, 8]);
  // box 3
  checkBox(3, [3, 4, 5], [0, 1, 2]);
  // box 4
  checkBox(4, [3, 4, 5], [3, 4, 5]);
  // box 5
  checkBox(5, [3, 4, 5], [6, 7, 8]);
  // box 6
  checkBox(6, [6, 7, 8], [0, 1, 2]);
  // box 7
  checkBox(7, [6, 7, 8], [3, 4, 5]);
  // box 8
  checkBox(8, [6, 7, 8], [6, 7, 8]);
});

Deno.test('4x4 puzzle', async () => {
  const helper = new PuzzleFileHelper();
  const puzzle = await helper.readPuzzleFromFile('SamplePuzzles/Input/Puzzle-4x4-0101.txt');
  assertEquals(puzzle.size, 4);
  const cell00 = puzzle.getAllCells().find(c => c.col === 0 && c.row === 0);
  const cell01 = puzzle.getAllCells().find(c => c.col === 1 && c.row === 0);
  const cell02 = puzzle.getAllCells().find(c => c.col === 2 && c.row === 0);
  const cell03 = puzzle.getAllCells().find(c => c.col === 3 && c.row === 0);
  const cell10 = puzzle.getAllCells().find(c => c.col === 0 && c.row === 1);
  const cell11 = puzzle.getAllCells().find(c => c.col === 1 && c.row === 1);
  const cell12 = puzzle.getAllCells().find(c => c.col === 2 && c.row === 1);
  const cell13 = puzzle.getAllCells().find(c => c.col === 3 && c.row === 1);
  const cell20 = puzzle.getAllCells().find(c => c.col === 0 && c.row === 2);
  const cell21 = puzzle.getAllCells().find(c => c.col === 1 && c.row === 2);
  const cell22 = puzzle.getAllCells().find(c => c.col === 2 && c.row === 2);
  const cell23 = puzzle.getAllCells().find(c => c.col === 3 && c.row === 2);
  const cell30 = puzzle.getAllCells().find(c => c.col === 0 && c.row === 3);
  const cell31 = puzzle.getAllCells().find(c => c.col === 1 && c.row === 3);
  const cell32 = puzzle.getAllCells().find(c => c.col === 2 && c.row === 3);
  const cell33 = puzzle.getAllCells().find(c => c.col === 3 && c.row === 3);
  assertExists(puzzle.getBoxRegion(cell00!));
  assertEquals(puzzle.getBoxRegion(cell00!), puzzle.getBoxRegion(cell01!));
  assertEquals(puzzle.getBoxRegion(cell00!), puzzle.getBoxRegion(cell10!));
  assertEquals(puzzle.getBoxRegion(cell00!), puzzle.getBoxRegion(cell11!));
  assertExists(puzzle.getBoxRegion(cell02!));
  assertEquals(puzzle.getBoxRegion(cell02!), puzzle.getBoxRegion(cell03!));
  assertEquals(puzzle.getBoxRegion(cell02!), puzzle.getBoxRegion(cell12!));
  assertEquals(puzzle.getBoxRegion(cell02!), puzzle.getBoxRegion(cell13!));
  assertExists(puzzle.getBoxRegion(cell20!));
  assertEquals(puzzle.getBoxRegion(cell20!), puzzle.getBoxRegion(cell21!));
  assertEquals(puzzle.getBoxRegion(cell20!), puzzle.getBoxRegion(cell30!));
  assertEquals(puzzle.getBoxRegion(cell20!), puzzle.getBoxRegion(cell31!));
  assertExists(puzzle.getBoxRegion(cell22!));
  assertEquals(puzzle.getBoxRegion(cell22!), puzzle.getBoxRegion(cell23!));
  assertEquals(puzzle.getBoxRegion(cell22!), puzzle.getBoxRegion(cell32!));
  assertEquals(puzzle.getBoxRegion(cell22!), puzzle.getBoxRegion(cell33!));

})

function checkBox(expectedBox: number, rows: number[], cols: number[]) {
  for (const r of rows) {
    for (const c of cols) {
      const cell = new Cell(r, c, 'A');
      assertEquals(Box.GetBoxIndex(cell, rows.length * rows.length), expectedBox);
    }
  }
}
