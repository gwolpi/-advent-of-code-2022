import '../extension-methods.ts';

type Cell = { char: string, x: number, y: number, z: number, steps?: number };
type Row = { [y: string]: Cell }
type Grid = { [x: string]: Row };

const transformCell = (cell: Cell, char: string): Cell => {
  cell.char = char;
  cell.z = char.charCodeAt(0);
  return cell;
}

const processInput = (input: string) => {
  let start: Cell | undefined, end: Cell;
  const grid = input.splitRows().reduce((rows, row, y) => {
    rows[y] = row.split('').reduce((cells, char, x) => {
      let z = char.charCodeAt(0);
      const cell: Cell = {char, x, y, z}
      if (char === 'S') start = transformCell(cell, 'a');
      if (char === 'E') end = transformCell(cell, 'z');
      cells[x] = cell;
      return cells;
    }, {} as Row);
    return rows;
  }, {} as Grid);

  let toVisit = [end!], steps = 0;
  while (toVisit.length) {
    toVisit = toVisit.reduce((toVisitNext, currentCell) => {
      if (currentCell?.steps !== undefined) return toVisitNext;
      currentCell.steps = steps;
      const { x, y, z } = currentCell!;
      const left = grid[y]?.[x - 1], right = grid[y]?.[x + 1], up = grid[y - 1]?.[x], down = grid[y + 1]?.[x];
      const eligibleDirs = [left, right, up, down].filter((neighbor) => neighbor && z - neighbor.z <= 1);
      toVisitNext.push(...eligibleDirs);
      return toVisitNext;
    }, [] as Cell[]);
    steps++;
  }

  return { grid, start };
}

export const p1 = (input: string): number => {
  const { start } = processInput(input);
  return start?.steps ?? 0;
}

export const p2 = (input: string): number => {
  const { grid } = processInput(input);
  const cells = Object.values(grid).flatMap(row => Object.values(row));
  const starterCells = cells.filter(cell => cell.char === 'a' && cell.steps);
  return starterCells.map(({ steps }) => steps).min();
}
