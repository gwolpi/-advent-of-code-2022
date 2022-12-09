import '../extension-methods.ts';

const processInput = (input: string) => {
	const lines = input.matchMap(/([A-Z])\s(\d+)/g, ([, dir, steps]) => ({dir, steps: +steps}));
	const head = {x: 0, y: 0};
	type DirFunctions = { [key: string]: () => void };
	const dirs: DirFunctions = {U: () => head.y--, D: () => head.y++, L: () => head.x--, R: () => head.x++};
	return {lines, head, dirs};
};

export const p1 = (input: string): number => {
	const {lines, head, dirs} = processInput(input);
	const tail = {x: 0, y: 0};
	return lines.reduce((acc, {dir, steps}) => {
		for (let step = 0; step < steps; step++) {
			dirs[dir]();
			const x = head.x - tail.x, y = head.y - tail.y;
			if (Math.abs(x) > 1) {
				tail.x += Math.sign(x);
				tail.y = head.y;
			} else if (Math.abs(y) > 1) {
				tail.y += Math.sign(y);
				tail.x = head.x;
			}
			const {x: tailX, y: tailY} = tail;
			acc.add(`x${tailX}y${tailY}`);
		}
		return acc
	}, new Set(["x0y0"])).size;
}

export const p2 = (input: string): number => {
	const {lines, head, dirs} = processInput(input);
	const tails = Array.from({length: 9}, () => ({x: 0, y: 0}));
	return lines.reduce((acc, {dir, steps}) => {
		for (let step = 0; step < steps; step++) {
			dirs[dir]();
			tails.forEach((tail, i) => {
				const prevTail = tails[i - 1] ?? head;
				const x = prevTail.x - tail.x, y = prevTail.y - tail.y;
				const xa = Math.abs(x) > 1, ya = Math.abs(y) > 1, xs = Math.sign(x), ys = Math.sign(y);
				if (xa && ya) {
					tail.x += xs;
					tail.y += ys;
				} else if (xa) {
					tail.x += xs;
					tail.y = prevTail.y;
				} else if (ya) {
					tail.y += ys;
					tail.x = prevTail.x;
				}
			});
			const {x: tailX, y: tailY} = tails.at(-1)!;
			acc.add(`x${tailX}y${tailY}`);
		}
		return acc
	}, new Set(["x0y0"])).size;
}