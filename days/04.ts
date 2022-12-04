import '../extension-methods.ts';

const processLines = (input: string): [number, number, number, number][] =>
	input.matchMap(/(\d+)-(\d+),(\d+)-(\d+)/g, ([, min1, max1, min2, max2]) =>
		[+min1, +max1, +min2, +max2]);

export const p1 = (input: string): number =>
	processLines(input).reduce((acc, [min1, max1, min2, max2]) =>
		acc + +((min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1)), 0);

export const p2 = (input: string): number =>
	processLines(input).reduce((acc, [min1, max1, min2, max2]) =>
		acc + +((min1 >= max2 && min2 >= max1) || (max1 >= min2 && max2 >= min1)), 0);
