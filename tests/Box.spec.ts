import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { Cell } from '../puzzle-solver/Cell.ts';
import { Box } from '../puzzle-solver/PuzzleRegion.ts'

Deno.test('Getting box index 4x4', () => {
  // box 0
  let cell = new Cell(0, 0, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 0);
  cell = new Cell(0, 1, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 0);
  cell = new Cell(1, 0, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 0);
  cell = new Cell(1, 1, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 0);
  // box 1
  cell = new Cell(0, 2, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 1);
  cell = new Cell(0, 3, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 1);
  cell = new Cell(1, 2, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 1);
  cell = new Cell(1, 3, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 1);
  // box 2
  cell = new Cell(2, 0, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 2);
  cell = new Cell(2, 1, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 2);
  cell = new Cell(3, 0, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 2);
  cell = new Cell(3, 1, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 2);
  // box 3
  cell = new Cell(2, 2, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 3);
  cell = new Cell(2, 3, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 3);
  cell = new Cell(3, 2, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 3);
  cell = new Cell(3, 3, 'A');
  assertEquals(Box.GetBoxIndex(cell, 2), 3);
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

function checkBox(expectedBox: number, rows: number[], cols: number[]) {
  for (const r of rows) {
    for (const c of cols) {
      const cell = new Cell(r, c, 'A');
      assertEquals(Box.GetBoxIndex(cell, rows.length), expectedBox);
    }
  }
}
