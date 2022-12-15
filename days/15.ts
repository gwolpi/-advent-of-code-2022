import '../extension-methods.ts';

const processInput = (input: string) => {
	return input.matchMap(/^.+x=(-?\d+).+y=(-?\d+).+x=(-?\d+).+y=(-?\d+)$/gm, ([, sensorX, sensorY, beaconX, beaconY]) => ({
		sensor: {x: +sensorX, y: +sensorY},
		beacon: {x: +beaconX, y: +beaconY},
	}));
}
export const p1 = (input: string, y = 2000000): number => {
	const covered = new Set(), beacons = new Set();
	processInput(input).forEach(({sensor, beacon}) => {
		const dist = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
		const yDiff = Math.abs(sensor.y - y);
		const minX = sensor.x - dist + yDiff;
		const maxX = sensor.x + dist - yDiff;
		for (let x = minX; x <= maxX; x++) {
			covered.add(`x${x}y${y}`);
			if (x === beacon.x && y === beacon.y) beacons.add(x);
		}
	});
	return covered.size - beacons.size;
}

export const p2 = (input: string, searchSpace = 4000000): number | undefined => {
	const processed = processInput(input);

	for (let y = 0; y <= searchSpace; y++) {
		const ranges: { min: number, max: number }[] = [];
		processed.forEach(({sensor, beacon}) => {
			const dist = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
			if (y < sensor.y - dist || y > sensor.y + dist) return;
			const yDiff = Math.abs(sensor.y - y);
			ranges.push({
				min: Math.max(sensor.x - dist + yDiff, 0),
				max: Math.min(sensor.x + dist - yDiff, searchSpace)
			});
		});

		const sortedRanges = ranges.sort((a, b) => a.min - b.min || a.max - b.max);
		let next = sortedRanges.shift()!;
		const range = sortedRanges.find((range) => {
			if (next.max < range.min - 1) return true;
			next = {min: Math.min(next.min, range.min), max: Math.max(next.max, range.max)};
			return false;
		});
		if (range) return (range!.min - 1) * 4000000 + y;
	}
}