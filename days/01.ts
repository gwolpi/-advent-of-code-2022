const processInput = (input: string): number[] => {
	const elves = input.split('\n\n');
	return elves.map((elf) => elf.split('\n').reduce((sum, kcal) => sum + +kcal, 0));
}

export const p1 = (input: string): number => Math.max(...processInput(input));

export const p2 = (input: string): number => {
	const [x, y, z] = processInput(input).sort((a, b) => b - a);
	return x + y + z;
}
