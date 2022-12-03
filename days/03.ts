import '../extension-methods.ts';

export const p1 = (input: string): number => input.splitRows()
	.reduce((acc: number, rucksack: string) => {
		const c1 = rucksack.slice(0, rucksack.length / 2);
		const c2 = rucksack.slice(rucksack.length / 2);
		const letter = [...c1].find((letter: string) => c2.includes(letter));
		return acc + getBadgeNumber(letter ?? '');
	}, 0);

export const p2 = (input: string): number => input.splitRows()
	.reduce((acc, rucksack, i) => {
		if (!(i % 3)) acc.push([rucksack])
		else acc[acc.length - 1].push(rucksack);
		return acc;
	}, [] as string[][])
	.map((elfGroup: string[]) => [...elfGroup[0]].find(x => elfGroup.every(elf => elf.includes(x))))
	.reduce((acc, badge) => acc + getBadgeNumber(badge ?? ''), 0);

const getBadgeNumber = (letter: string): number => {
	const a = 'a'.charCodeAt(0) - 1, z = 'z'.charCodeAt(0);
	const A = 'A'.charCodeAt(0) - 1, Z = 'Z'.charCodeAt(0);
	const tokenNumber = letter?.charCodeAt(0) ?? 0;
	return tokenNumber - tokenNumber > A && tokenNumber <= Z ? A - (z - a) : a;
}