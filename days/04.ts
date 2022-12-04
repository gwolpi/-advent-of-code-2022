import '../extension-methods.ts';

const processLines = (input: string): [number[], number[]][] =>
	[...input.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g)].map(([, min1, max1, min2, max2]) => {
		const pair1 = Array.from({length: +max1 - +min1 + 1}, (_, i) => +min1 + i);
		const pair2 = Array.from({length: +max2 - +min2 + 1}, (_, i) => +min2 + i);
		return [pair1, pair2];
	});

export const p1 = (input: string): number =>
	processLines(input).filter(([pair1, pair2]) =>
		pair1.every(n => pair2.includes(n)) || pair2.every(n => pair1.includes(n))).length;

export const p2 = (input: string): number =>
	processLines(input).filter(([pair1, pair2]) =>
		pair1.some(n => pair2.includes(n)) || pair2.some(n => pair1.includes(n))).length;
