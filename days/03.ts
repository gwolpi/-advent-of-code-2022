import '../extension-methods.ts';

const getLetterNumber = (letter = ''): number => {
	const a = 'a'.charCodeAt(0) - 1, z = 'z'.charCodeAt(0);
	const A = 'A'.charCodeAt(0) - 1, Z = 'Z'.charCodeAt(0);
	const tokenNumber = letter?.charCodeAt(0) ?? 0;
	return tokenNumber - (tokenNumber > A && tokenNumber <= Z ? A - (z - a) : a);
};

export const p1 = (input: string): number => input.splitRows()
	.reduce((acc: number, rucksack: string) => {
		const c1 = [...rucksack];
		const c2 = c1.splice(0, rucksack.length / 2);
		const letter = c1.find((letter: string) => c2.includes(letter));
		return acc + getLetterNumber(letter);
	}, 0);

export const p2 = (input: string): number => input.splitRows()
	.reduce((acc, rucksack, i) => {
		if (!(i % 3)) acc.push([rucksack])
		else acc.at(-1)?.push(rucksack);
		return acc;
	}, [] as string[][])
	.map((elfGroup: string[]) => [...elfGroup[0]].find(x => elfGroup.every(elf => elf.includes(x))))
	.reduce((acc, badge) => acc + getLetterNumber(badge), 0);
