import '../extension-methods.ts';

type MotionMove = { dir: string, steps: number };
type Coord = { x: number, y: number };
type DirFunctions = { [key: string]: () => void };
type ProcessedInput = { head: Coord, dirs: DirFunctions, motionMoves?: MotionMove[] };

const processInput = (input: string, tails: Coord[]): ProcessedInput => {
	const head: Coord = {x: 0, y: 0};
	const dirs: DirFunctions = {U: () => head.y--, D: () => head.y++, L: () => head.x--, R: () => head.x++};
	const motionMoves = input.matchMap(/([A-Z])\s(\d+)/g,
		([, dir, steps]): MotionMove => ({dir, steps: +steps}));
	return motionMoves.reduce((visited, {dir, steps}) => {
		for (let step = 0; step < steps; step++) {
			dirs[dir]();
			tails.forEach((tail, index) => {
				const prevTail = tails[index - 1] ?? head;
				const xDiff = prevTail.x - tail.x, yDiff = prevTail.y - tail.y;
				const xAbs = Math.abs(xDiff) > 1, yAbs = Math.abs(yDiff) > 1;
				if (!(xAbs || yAbs)) return;
				tail.x = xAbs ? tail.x + Math.sign(xDiff) : prevTail.x
				tail.y = yAbs ? tail.y + Math.sign(yDiff) : prevTail.y
			});
			const {x, y} = tails.at(-1)!;
			visited.add(`x${x}y${y}`);
		}
		return visited
	}, new Set(['x0y0'])).size;
};

export const p1 = (input: string): number =>
	processInput(input, [{x: 0, y: 0}]);

export const p2 = (input: string): number =>
	processInput(input, Array.from({length: 9}, () => ({x: 0, y: 0})))
