import '../extension-methods.ts';

const processInput = (input: string) => {
	const lines = input.matchMap(/([A-Z])\s(\d+)/g, ([, dir, steps]) => ({dir, steps: +steps}));
	const head = {x: 0, y: 0};
	type DirFunctions = { [key: string]: () => void };
	const dirs: DirFunctions = {U: () => head.y--, D: () => head.y++, L: () => head.x--, R: () => head.x++};
	const visited = new Set(['x0y0']);
	return {lines, head, dirs, visited};
};

export const p1 = (input: string): number => {
	const {lines, head, dirs, visited} = processInput(input);
	const tail = {x: 0, y: 0};
	return lines.reduce((acc, {dir, steps}) => {
		for (let step = 0; step < steps; step++) {
			dirs[dir]();
			const xDiff = head.x - tail.x, yDiff = head.y - tail.y;
			const xa = Math.abs(xDiff) > 1, ya = Math.abs(yDiff) > 1;
			if (xa || ya) {
				tail.x = xa ? tail.x + Math.sign(xDiff) : head.x
				tail.y = ya ? tail.y + Math.sign(yDiff) : head.y
			}
			const {x: tailX, y: tailY} = tail;
			acc.add(`x${tailX}y${tailY}`);
		}
		return acc
	}, visited).size;
}

export const p2 = (input: string): number => {
	const {lines, head, dirs, visited} = processInput(input);
	const tails = Array.from({length: 9}, () => ({x: 0, y: 0}));
	return lines.reduce((acc, {dir, steps}) => {
		for (let step = 0; step < steps; step++) {
			dirs[dir]();
			tails.forEach((tail, i) => {
				const prevTail = tails[i - 1] ?? head;
				const xDiff = prevTail.x - tail.x, yDiff = prevTail.y - tail.y;
				const xa = Math.abs(xDiff) > 1, ya = Math.abs(yDiff) > 1;
				if (xa || ya) {
					tail.x = xa ? tail.x + Math.sign(xDiff) : prevTail.x
					tail.y = ya ? tail.y + Math.sign(yDiff) : prevTail.y
				}
			});
			const {x: tailX, y: tailY} = tails.at(-1)!;
			acc.add(`x${tailX}y${tailY}`);
		}
		return acc
	}, visited).size;
}