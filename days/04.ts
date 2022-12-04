import '../extension-methods.ts';

const processLines = (input: string): [number[], number[]][] =>
	[...input.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g)].map(([, min1, max1, min2, max2]) =>
		[Array.range(+min1, +max1), Array.range(+min2, +max2)]);

export const p1 = (input: string): number =>
	processLines(input).count(([pair1, pair2]) =>
		pair1.every(n => pair2.includes(n)) || pair2.every(n => pair1.includes(n)));

export const p2 = (input: string): number =>
	processLines(input).count(([pair1, pair2]) =>
		pair1.some(n => pair2.includes(n)) || pair2.some(n => pair1.includes(n)));
