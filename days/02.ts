import '../extension-methods.ts';

type Result = { [key: string]: number };
type ResultSet = { [key: string]: Result };

const R = 1, P = 2, S = 3;
const W = 6, L = 0, D = 3;

export const p1 = (input: string): number => input
	.splitRows()
	.reduce((curr, [p1, , p2]) => {
		const choice: Result = {X: R, Y: P, Z: S};
		const outcomes: ResultSet = {
			A: {X: D, Y: W, Z: L},
			B: {X: L, Y: D, Z: W},
			C: {X: W, Y: L, Z: D}
		};
		return curr + choice[p2] + outcomes[p1][p2];
	}, 0);

export const p2 = (input: string): number => input
	.splitRows()
	.reduce((curr, [p1, , p2]) => {
		const outcome: Result = {X: L, Y: D, Z: W};
		const choices: ResultSet = {
			A: {X: S, Y: R, Z: P},
			B: {X: R, Y: P, Z: S},
			C: {X: P, Y: S, Z: R}
		};
		return curr + choices[p1][p2] + outcome[p2];
	}, 0);
