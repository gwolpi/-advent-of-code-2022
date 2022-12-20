import '../extension-methods.ts';

const cubeToCoordinates = (cube: string): number[] => {
	return cube.split(",").map(Number);
}

const findNeighbours = (cube: string) => {
	const [x, y, z] = cubeToCoordinates(cube);
	return [
		`${x + 1},${y},${z}`,
		`${x - 1},${y},${z}`,
		`${x},${y + 1},${z}`,
		`${x},${y - 1},${z}`,
		`${x},${y},${z + 1}`,
		`${x},${y},${z - 1}`,
	];
}

export const p1 = (input: string): number =>
	input.splitRows().reduce((acc, cube, _, cubes) =>
			acc + findNeighbours(cube).count(cubeAround => !cubes.includes(cubeAround)),
		0)

export const p2 = (input: string): number => {
	const cubes = input.splitRows();
	const cubesAsNumbers = cubes.map(cubeToCoordinates);
	const xs = cubesAsNumbers.map(([p]) => p);
	const ys = cubesAsNumbers.map(([, p]) => p);
	const zs = cubesAsNumbers.map(([, , p]) => p);
	const minX = xs.min(), maxX = xs.max();
	const minY = ys.min(), maxY = ys.max();
	const minZ = zs.min(), maxZ = zs.max();

	let emptyCubes = new Set<string>();

	return cubes.reduce((acc, cube) => acc + findNeighbours(cube).count((coords) => {
		if (cubes.includes(coords) || emptyCubes.has(coords)) return false;

		let checkCubes = new Set([coords]);
		const checkedCubes = new Set<string>();

		while (true) {
			let checkCubesNext = new Set<string>();
			for (let cube of checkCubes) {
				checkedCubes.add(cube);
				for (let neighbour of findNeighbours(cube)) {
					if (!cubes.includes(neighbour) && !checkedCubes.has(neighbour)) {
						checkCubesNext.add(neighbour);
					}
				}
			}

			if (!checkCubesNext.size) {
				checkedCubes.forEach(cube => emptyCubes.add(cube));
				return false;
			}

			if ([...checkCubesNext].map(cubeToCoordinates).some(
				([x, y, z]) => x < minX || x > maxX || y < minY || y > maxY || z < minZ || z > maxZ)) {
				return true;
			}

			checkCubes = checkCubesNext;
		}
	}), 0);
}