import '../extension-methods.ts';

type Result = { [key: string]: number };
type ResultSet = { [key: string]: Result };

export const p1 = (input: string): number => {
	return input
		.splitRows()
		.reduce((curr, [p1, , p2]) => {
			const choice: Result = {X: 1, Y: 2, Z: 3};
			const outcomes: ResultSet = {
				A: {X: 3, Y: 6, Z: 0},
				B: {X: 0, Y: 3, Z: 6},
				C: {X: 6, Y: 0, Z: 3}
			};
			return curr + choice[p2] + outcomes[p1][p2];
		}, 0);
}

export const p2 = (input: string): number => {
	return input
		.splitRows()
		.reduce((curr, [p1, , p2]) => {
			const desire: ResultSet = {
				A: {X: 3, Y: 1, Z: 2},
				B: {X: 1, Y: 2, Z: 3},
				C: {X: 2, Y: 3, Z: 1}
			};
			const choice = desire[p1][p2];
			const outcome: Result = {X: 0, Y: 3, Z: 6};
			return curr + choice + outcome[p2];
		}, 0);
}