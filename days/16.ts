type Valve = { name: string, rate: number, neighbours: string[] };
type ValveGraph = { [key: string]: Valve };

const processInput = (input: string): ValveGraph => {
	return input.matchMap(/^Valve (\w{2}).+=(\d+);.+es? ([\w, ]+)$/gm,
		([, name, rate, to]): Valve => ({name, rate: +rate, neighbours: to.split(', ')}))
		.reduce((acc, valve) => {
			acc[valve.name] = valve;
			return acc;
		}, {} as { [key: string]: Valve });
};

function processTrack(distances: Map<string, number>, start: string, time: number, toOpen: string[], opened = {} as { [key: string]: number }
) {
	return toOpen.reduce((acc, end) => {
		const remainingTime = time - distances.get(`${start}|${end}`)! - 1;
		if (remainingTime < 1) return acc;
		const newOpened = {...opened};
		newOpened[end] = remainingTime;
		const newNodesLeft = [...toOpen.filter((valve) => valve !== end)];
		acc.push(...processTrack(distances, end, remainingTime, newNodesLeft, newOpened));
		return acc;
	}, [opened] as { [key: string]: number }[])
}


const breadthFirstSearch = (start: string, end: string, graph: ValveGraph) => {
	const queue = [] as string[][];
	const visited = new Set<string>();

	if (start === end) return [start];
	queue.push([start]);

	while (queue.length) {
		const path = queue.shift()!, node = path.at(-1)!;
		if (visited.has(node)) continue;
		visited.add(node);
		const neighbours = graph[node]!.neighbours;
		for (const neighbour of neighbours) {
			if (neighbour === end) return path.concat(neighbour);
			queue.push(path.concat(neighbour));
		}
	}

	return [];
};

const constructDistanceMap = (graph: ValveGraph) => {
	const valveNames = Object.keys(graph);
	return valveNames.reduce((acc, startValve) => {
		valveNames.forEach((endValve) => {
			if (acc.has(`${startValve}|${endValve}`)) return;
			const track = breadthFirstSearch(startValve, endValve, graph);
			acc.set(`${startValve}|${endValve}`, track.length - 1);
		});
		return acc;
	}, new Map<string, number>());
};

export const p1 = (input: string) => {
	const graph = processInput(input);
	const valvesWithFlow = Object.entries(graph).filter(([, {rate}]) => rate > 0).map(([name]) => name);
	const distanceMap = constructDistanceMap(graph);
	const allTracks = processTrack(distanceMap, "AA", 30, [...valvesWithFlow]);
	return allTracks.map((x) =>
		Object.entries(x).reduce((a, [node, minute]) => a + minute * graph[node]!.rate, 0)
	).sort((a, b) => a - b).at(-1);
};

export const p2 = (input: string) => {
	const graph = processInput(input);
	const valvesWithFlow = [...Object.entries(graph)].filter(([, {rate}]) => rate > 0).map(([name]) => name);
	const distanceMap = constructDistanceMap(graph);
	const allTracks = processTrack(distanceMap, "AA", 26, [...valvesWithFlow]);

	const calculatePressurePerTrack = (track: { [key: string]: number }) => {
		return Object.entries(track).reduce((acc, [key, value]) => acc + graph[key]!.rate * value, 0);
	};

	const maxPressurePerTrack =
		allTracks.reduce((acc, x) => {
			const path = Object.keys(x).sort().join("|");
			acc[path] = Math.max(acc[path] || 0, calculatePressurePerTrack(x));
			return acc
		}, {} as { [key: string]: number });

	const trackNames = Object.keys(maxPressurePerTrack);
	return trackNames.reduce((acc, yourTrack) => {
		trackNames.forEach((elephantTrack) => {
			const yourTrackSplit = yourTrack.split("|");
			const elephantTrackSplit = elephantTrack.split("|");
			const tracksIntersect = yourTrackSplit.some((x) => elephantTrackSplit.includes(x))
			if (tracksIntersect) return;
			acc = Math.max(acc, maxPressurePerTrack[yourTrack] + maxPressurePerTrack[elephantTrack]);
		});
		return acc;
	}, 0);
};