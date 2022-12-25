import '../extension-methods.ts';
import {Equation, parse} from "npm:algebra.js";

type VariableSet<T> = { [name: string]: T };
type VariableEquation = { a: string, op: string, b: string }

const processInput = (input: string): { solved: VariableSet<number>, unsolved: VariableSet<VariableEquation> } => {
	const calculations = input.matchMap(/^(\w+): (?:(\d+)|(\w+) ([*+/-]+) (\w+))$/gm,
		([, name, solvedNumber, a, op, b]) => ({name, solvedNumber: +solvedNumber, eq: {a, op, b}}));
	return calculations.reduce((acc, {name, solvedNumber, eq}) => {
		const {solved, unsolved} = acc;
		solvedNumber ? solved[name] = solvedNumber : unsolved[name] = eq;
		return acc;
	}, {solved: {}, unsolved: {}} as { solved: VariableSet<number>, unsolved: VariableSet<VariableEquation> });
}

const operatorMap: { [op: string]: (a: number, b: number) => number } = {
	"+": (a, b) => a + b,
	"-": (a, b) => a - b,
	"*": (a, b) => a * b,
	"/": (a, b) => a / b,
};

export const p1 = (input: string): number => {
	const {unsolved, solved} = processInput(input);
	while (Object.keys(unsolved).length) {
		for (const [name, {a, op, b}] of Object.entries(unsolved)) {
			if (!(op && a in solved && b in solved)) continue;
			solved[name] = operatorMap[op](solved[a], solved[b]);
			delete unsolved[name];
		}
	}
	return solved["root"];
};

export const p2 = (input: string): number => {
	const {unsolved, solved: onlyNumbersSolved} = processInput(input);
	const solved: VariableSet<number | string> = {...onlyNumbersSolved, 'humn': 'x'};
	delete unsolved['humn'];

	while (Object.keys(unsolved).length > 1) {
		for (const [name, {a, op, b}] of Object.entries(unsolved)) {
			if (!(op && a in solved && b in solved)) continue;
			const solvedA = solved[a], solvedB = solved[b];
			solved[name] = typeof solvedA === 'number' && typeof solvedB === 'number'
				? operatorMap[op](solvedA, solvedB)
				: `(${solvedA}) ${op} (${solvedB})`;
			delete unsolved[name];
		}
	}

	// Inspired by https://github.com/Thiesjoo/; thank you, I would have never figured this out on my own
	const {a, b} = unsolved['root'];
	const {numer, denom} = new Equation(parse(`(${solved[a]})`), solved[b]).solveFor("x");
	return numer / denom;
};