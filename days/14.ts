import '../extension-methods.ts';

enum Material { Air = '.', Rock = '#', Source = '+', Sand = 'o', Boundary = 'X' }

type Cell = { x: number, y: number, material: Material };
type Row = { [y: string]: Cell }
type Cave = { [x: string]: Row };

const printCave = (cave: Cave) => {
	const caveY = Object.keys(cave).map(Number).sort((a, b) => a - b);
	const caveX = Object.values(cave).flatMap((row) => Object.keys(row).map(Number)).sort((a, b) => a - b);
	const minX = caveX.min(), maxX = caveX.max(), minY = caveY.min(), maxY = caveY.max();

	for (let y = minY; y <= maxY; y++) {
		let line = '';
		for (let x = minX; x <= maxX; x++) {
			line += cave[y]?.[x]?.material ?? '';
		}
		console.log(line);
	}
}

const processInput = (input: string, caveFloorMaterial: Material) => {
	const caveInstructions = input.splitRows()
		.map((line) => line.split(' -> ')
			.map((range) => range.split(',').map(Number)));
	const caveRange = caveInstructions.flat();
	const caveX = caveRange.map(([x]) => x), caveY = caveRange.map(([, y]) => y);
	const minX = caveX.min(), maxX = caveX.max(), maxY = caveY.max() + 2;

	// Initialise grid
	const cave: Cave = {};
	for (let y = 0; y <= maxY; y++) {
		const caveY = (cave[y] ??= {})
		caveY[minX - 1] = {x: minX - 1, y, material: y === maxY ? caveFloorMaterial : Material.Boundary};
		caveY[maxX + 1] = {x: maxX + 1, y, material: y === maxY ? caveFloorMaterial : Material.Boundary};
		for (let x = minX; x <= maxX; x++) {
			caveY[x] = {x, y, material: y === maxY ? caveFloorMaterial : Material.Air};
		}
	}

	// Add sources
	const source = {x: 500, y: 0, material: Material.Source};
	cave[source.y][source.x] = source;
	caveInstructions.forEach((instruction) => {
		for (let i = 1; i < instruction.length; i++) {
			const [fromX, fromY] = instruction[i - 1], [toX, toY] = instruction[i];
			if (fromX === toX) {
				const [minY, maxY] = fromY < toY ? [fromY, toY] : [toY, fromY];
				for (let y = minY; y <= maxY; y++)
					cave[y][fromX].material = Material.Rock;
			} else if (fromY === toY) {
				const [minX, maxX] = fromX < toX ? [fromX, toX] : [toX, fromX];
				for (let x = minX; x <= maxX; x++)
					cave[fromY][x].material = Material.Rock;
			}
		}
	});
	return {cave, source, maxY};
}

export const p1 = (input: string): number => {
	const {cave, source} = processInput(input, Material.Boundary);

	const getCellBelow = ({x, y}: Cell): Cell | undefined => [
		cave[y + 1]?.[x],
		cave[y + 1]?.[x - 1],
		cave[y + 1]?.[x + 1],
	].find((cell) => cell?.material === Material.Air || cell?.material === Material.Boundary);

	for (let i = 0; ; i++) {
		let fallingSand: Cell | undefined = source;
		while (fallingSand) {
			const cellBelow = getCellBelow(fallingSand);
			if (!cellBelow) fallingSand.material = Material.Sand;
			if (cellBelow?.material === Material.Boundary) {
				printCave(cave);
				return i;
			}
			fallingSand = cellBelow;
		}
	}
}

export const p2 = (input: string): number => {
	const {cave, source, maxY} = processInput(input, Material.Rock);

	const getCellBelow = ({x, y}: Cell): Cell | undefined => {
		const result = [
			cave[y + 1][x - 1] ??= {x: x - 1, y: y + 1, material: maxY === y + 1 ? Material.Rock : Material.Air},
			cave[y + 1][x] ??= {x, y: y + 1, material: maxY === y + 1 ? Material.Rock : Material.Air},
			cave[y + 1][x + 1] ??= {x: x + 1, y: y + 1, material: maxY === y + 1 ? Material.Rock : Material.Air},
		].find((cell) => cell?.material === Material.Air || cell?.material === Material.Boundary);
		if (result?.material === Material.Boundary) result.material = Material.Air
		return result
	};

	for (let i = 1; ; i++) {
		let fallingSand: Cell | undefined = source;
		while (fallingSand) {
			const cellBelow = getCellBelow(fallingSand);
			if (!cellBelow && fallingSand === source) return i;
			if (!cellBelow) fallingSand.material = Material.Sand;
			fallingSand = cellBelow;
		}
	}
}

//27426