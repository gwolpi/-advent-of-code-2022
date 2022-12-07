import '../extension-methods.ts';

const processInput = (input: string) => {
	const [,...result] = input.split(/\n\$\s/).map(cmd => cmd.split("\n"));
	const PARENT = Symbol('..');
	type File = { size?: number, [PARENT]?: Dir }
	type Dir = { [key: string | symbol]: File | Dir };
	const dirs: Array<Dir> = [{}]
	let [activeDir] = dirs

	result.forEach(([commandRow, ...output]) => {
		const [command, ...args] = commandRow.split(/\s/);
		switch (command) {
			case 'ls': {
				output.forEach((x: string) => {
					const [dirOrFile, name] = x.split(/\s/);
					const isDir = dirOrFile === 'dir', size = +dirOrFile;
					if (isDir) {
						activeDir[name] = {[PARENT]: activeDir};
						dirs.push(activeDir[name] as Dir);
						return;
					}
					activeDir[name] = {size};
				});
				break;
			}
			case 'cd': {
				const [dir] = args;
				activeDir = (dir === PARENT.description ? activeDir[PARENT]: activeDir[dir]) as Dir;
				break;
			}
		}
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