import '../extension-methods.ts';

type Coord = { x: number, y: number };
type Rock = Array<Coord>;
type JetPattern = 1 | -1;

enum Type { None = '', ROCK = "#", FLOOR = "-", WALL = "|",}

const rocks: Rock[] = [
	[{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0},],
	[{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2},],
	[{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2},],
	[{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3},],
	[{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1},]
]

const processInput = (input: string): JetPattern[] =>
	input.trim().split('').map((x): JetPattern => x === '>' ? 1 : -1);

const checkCollision = (rock: Rock, settledRock: Set<string>) => {
	for (const {x, y} of rock) {
		if (settledRock.has(`x${x}y${y}`)) return Type.ROCK;
		if (y <= 0) return Type.FLOOR;
		if (x <= 0 || x >= 8) return Type.WALL;
	}
};

const updatePosition = (rock: Rock, tallestPoint: number) => {
	rock.forEach((piece) => {
		piece.y += tallestPoint + 4;
		piece.x += 3;
	});
	return rock;
};

const findTallestPoint = (rock: Rock, tallestPoint: number) => {
	return rock.reduce((acc, {y}) => (y > acc) ? y : acc, tallestPoint);
};


export const p1 = (input: string): number => {
	const jets = processInput(input);
	const settledRocks = new Set<string>();

	let remainingJets = [...jets];
	let tallestPoint = 0;
	for (let i = 0; i < 2022; i++) {
		const rocksClone = structuredClone(rocks);

		let rock = rocksClone[i % rocks.length];
		rock = updatePosition(rock, tallestPoint);

		let isFallNextMove = false;
		while (true) {
			if (isFallNextMove) {
				rock.forEach((piece: Coord) => {
					piece.y--;
				});
				const checkCollisionResult = checkCollision(rock, settledRocks);
				if (checkCollisionResult === Type.ROCK || checkCollisionResult === Type.FLOOR) {
					rock.forEach((piece: Coord) => {
						piece.y += 1;
						settledRocks.add(`x${piece.x}y${piece.y}`);
					});
					tallestPoint = findTallestPoint(rock, tallestPoint);
					break;
				}
			} else {
				const xMove = remainingJets.shift()!;
				if (remainingJets.length === 0) remainingJets = [...jets];
				rock.forEach((piece: Coord) => piece.x += xMove);
				const checkCollisionResult = checkCollision(rock, settledRocks);
				if (checkCollisionResult === Type.ROCK || checkCollisionResult === Type.WALL) {
					rock.forEach((piece: Coord) => piece.x -= xMove);
				}
			}
			isFallNextMove = !isFallNextMove;
		}
	}
	return tallestPoint;
}

export const p2 = (input: string): number => {
	const pattern = processInput(input);
	const settledRock = new Set<string>();

	let remainingPattern = [...pattern];
	let tallestPoint = 0;
	let i = 0;
	const solve = () => {
		const rocksCopy = structuredClone(rocks);

		let rock = rocksCopy[i++ % rocks.length];
		rock = updatePosition(rock, tallestPoint);

		let isFallNextMove = false;
		while (true) {
			if (isFallNextMove) {
				rock.forEach((piece: Coord) => {
					piece.y -= 1;
				});
				const checkCollisionResult = checkCollision(rock, settledRock);
				if (checkCollisionResult === Type.ROCK || checkCollisionResult === Type.FLOOR) {
					rock.forEach((piece: Coord) => {
						piece.y += 1;
						settledRock.add(`x${piece.x}y${piece.y}`);
					});
					tallestPoint = findTallestPoint(rock, tallestPoint);
					break;
				}
			} else {
				const xMove = remainingPattern.shift()!;
				if (remainingPattern.length === 0) remainingPattern = [...pattern];
				rock.forEach((piece: Coord) => piece.x += xMove);
				const checkCollisionResult = checkCollision(rock, settledRock);
				if (checkCollisionResult === Type.ROCK || checkCollisionResult === Type.WALL) {
					rock.forEach((piece: Coord) => piece.x -= xMove);
				}
			}
			isFallNextMove = !isFallNextMove;
		}
		return rock;
	};

	const cache = new Map();

	const checkClosedPattern = (rock: Rock) => {
		let pattern = [];

		let minY = Infinity;
		let maxY = 0;

		for (const piece of rock) {
			minY = Math.min(minY, piece.y);
			maxY = Math.max(maxY, piece.y);
		}

		for (let y = minY; y <= maxY; y++)
			for (let x = 1; x <= 7; x++)
				if (settledRock.has(`x${x}y${y}`)) pattern.push(`x:${x}`);

		for (let y = minY; y <= maxY; y++) {
			let isInRow = true;
			for (let x = 1; x <= 7; x++) {
				if (settledRock.has(`x${x}y${y}`)) continue;
				isInRow = false;
				break;
			}
			if (isInRow) return pattern;
		}
		return [];
	};

	let placed = 0;
	let startPoint = 0;
	let startPlaced = 0;
	while (true) {
		const placedRock = solve();
		placed++;
		const pattern = checkClosedPattern(placedRock);
		if (pattern) {
			if (cache.has(pattern.join(" "))) {
				const {nextBlock, upcomingPattern, tallestPointHistory, placedHistory} =
					cache.get(pattern.join(" "));
				if (
					placed % rocks.length === nextBlock &&
					upcomingPattern === remainingPattern.join("")
				) {
					startPoint = tallestPointHistory;
					startPlaced = placedHistory;
					break;
				}
			}
			cache.set(pattern.join(" "), {
				nextBlock: placed % rocks.length,
				upcomingPattern: remainingPattern.join(""),
				tallestPointHistory: tallestPoint,
				placedHistory: placed,
			});
		}
	}

	const remaining = 1_000_000_000_000 - placed;
	const gainedPer = tallestPoint - startPoint;
	const reps = Math.floor(remaining / (placed - startPlaced));
	const gained = reps * gainedPer;
	const remainder = remaining % (placed - startPlaced);
	for (let i = 0; i < remainder; i++) solve();
	return gained + tallestPoint;
}