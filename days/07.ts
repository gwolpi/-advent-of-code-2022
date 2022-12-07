import '../extension-methods.ts';

const processInput = (input: string) => {
	const PARENT = Symbol('..');
	type File = { size?: number, [PARENT]?: Dir }
	type Dir = { [key: string | symbol]: File | Dir };
	let dirs: Array<Dir> = [{}], [activeDir] = dirs

	const [, ...result] = input.split(/\n\$\s/).map(cmd => cmd.split("\n"));
	result.forEach(([commandRow, ...output]) => {
		const [command, dir] = commandRow.split(/\s/);
		if (command === 'cd') {
			if (dir === '/') return activeDir = dirs[0];
			return activeDir = (dir === PARENT.description ? activeDir[PARENT]: activeDir[dir]) as Dir;
		}
		output.forEach((x: string) => {
			const [dirOrFile, name] = x.split(/\s/);
			const isFile = dirOrFile !== 'dir', size = +dirOrFile;
			if (isFile) return activeDir[name] = {size};
			activeDir[name] = {[PARENT]: activeDir};
			dirs.push(activeDir[name] as Dir);
		});
	});

	const getDirSize = (dir: Dir | File): number => Object.values(dir)
		.map((child: Dir | File) => PARENT in child ? getDirSize(child) : child.size).sum();
	return dirs.map(getDirSize);
}

export const p1 = (input: string): number => {
	return processInput(input).filter(size => size <= 100000).sum()
}

export const p2 = (input: string): number => {
	const [usedSpace, ...dirSizes] = processInput(input);
	return dirSizes.sortNums().find(size => size >= usedSpace + 30000000 - 70000000)!;
}