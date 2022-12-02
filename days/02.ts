import '../extension-methods.ts';

const R = 1, P = 2, S = 3, L = 0, D = 3, W = 6;
const p1c = {R: 'A', P: 'B', S: 'C'};
const p2c = {R: 'X', P: 'Y', S: 'Z', L: 'X', D: 'Y', W: 'Z'};

export const p1 = (input: string): number => input
	.splitRows()
	.reduce((curr, [p1, , p2]) => {
		const choice: number = {[p2c.R]: R, [p2c.P]: P, [p2c.S]: S}[p2];
		const outcome: number = {
			[p1c.R]: {[p2c.R]: D, [p2c.P]: W, [p2c.S]: L},
			[p1c.P]: {[p2c.R]: L, [p2c.P]: D, [p2c.S]: W},
			[p1c.S]: {[p2c.R]: W, [p2c.P]: L, [p2c.S]: D}
		}[p1][p2];
		return curr + choice + outcome;
	}, 0);

export const p2 = (input: string): number => input
	.splitRows()
	.reduce((curr, [p1, , p2]) => {
		const choice: number = {
			[p1c.R]: {[p2c.L]: S, [p2c.D]: R, [p2c.W]: P},
			[p1c.P]: {[p2c.L]: R, [p2c.D]: P, [p2c.W]: S},
			[p1c.S]: {[p2c.L]: P, [p2c.D]: S, [p2c.W]: R}
		}[p1][p2];
		const outcome: number = {[p2c.L]: L, [p2c.D]: D, [p2c.W]: W}[p2];
		return curr + choice + outcome;
	}, 0);
