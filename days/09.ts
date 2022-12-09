import '../extension-methods.ts';

type MotionMove = { dir: string, steps: number };
type Coord = { x: number, y: number };
type DirFunctions = { [key: string]: () => void };
type ProcessedInput = { head: Coord, dirs: DirFunctions, motionMoves?: MotionMove[], visited?: Set<string> };

const processInput = (input: string): ProcessedInput => {
	const head: Coord = {x: 0, y: 0};
	const dirs: DirFunctions = {U: () => head.y--, D: () => head.y++, L: () => head.x--, R: () => head.x++};
	const lines = input.matchMap(/([A-Z])\s(\d+)/g, ([, dir, steps]) => ({dir, steps: +steps}));
	const visited = new Set(['x0y0']);
	return {head, dirs, motionMoves: lines, visited};
};

const processStep = ({dir, steps}: MotionMove, {dirs, head}: ProcessedInput, tails: Coord[]): string => {
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
	return `x${x}y${y}`
}

export const p1 = (input: string): number => {
	const {head, dirs, motionMoves, visited} = processInput(input);
	const tail = {x: 0, y: 0};
	return motionMoves.reduce((acc, line) => {
		for (let step = 0; step < line.steps; step++)
			acc.add(processStep(line, {dirs, head}, [tail]));
		return acc
	}, visited).size;
}

export const p2 = (input: string): number => {
	const {head, dirs, motionMoves, visited} = processInput(input);
	const tails = Array.from({length: 9}, () => ({x: 0, y: 0}));
	return motionMoves.reduce((acc, line) => {
		for (let step = 0; step < line.steps; step++)
			acc.add(processStep(line, {dirs, head}, tails));
		return acc
	}, visited).size;
}
