import '../extension-methods.ts';

export const p1 = (input: string): number => {
	const rucksacks = input.splitRows();
	return rucksacks.reduce((acc: number, rucksack: string) => {
		const c1 = rucksack.slice(0, rucksack.length / 2);
		const c2 = rucksack.slice(rucksack.length / 2);
		const letter = [...c1].find((letter: string) => c2.includes(letter));
		const letterNumber = letter?.charCodeAt(0) ?? 0;
		const padding = letterNumber >= 65 && letterNumber <= 90 ? 64 - 26 : 96;
		const letterValue = letterNumber - padding;
		return acc + letterValue;
	}, 0);
}

export const p2 = (input: string): number => {
	return input
		.splitRows()
		.reduce((acc, rucksack, i) => {
			if (!(i % 3)) acc.push([rucksack])
			else acc[acc.length - 1].push(rucksack);
			return acc;
		}, [] as string[][])
		.map((elfGroup: string[]) => [...elfGroup[0]].find(x => elfGroup.every(elf => elf.includes(x))))
		.reduce((acc, badge) => {
			const tokenNumber = badge?.charCodeAt(0) ?? 0;
			const padding = tokenNumber >= 65 && tokenNumber <= 90 ? 64 - 26 : 96;
			return acc + tokenNumber - padding;
		}, 0)
}