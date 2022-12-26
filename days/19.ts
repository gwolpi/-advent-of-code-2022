import '../extension-methods.ts';

type Blueprint = {
	id: number,
	oreRobotOreCost: number,
	clayRobotOreCost: number,
	obsidianRobotOreCost: number,
	obsidianRobotClayCost: number,
	geodeRobotOreCost: number,
	geodeRobotObsidianCost: number
};

type BlueprintState = Blueprint & {
	ore: number,
	clay: number,
	obsidian: number,
	geode: number,
	oreRobots: number,
	clayRobots: number,
	obsidianRobots: number,
	geodeRobots: number
}

const processInput = (input: string): Blueprint[] => {
	return input.trim().matchMap(/^.+ (\d+):\s{3}.+ (\d+).+\.\s{3}.+ (\d+).+\.\s{3}.+ (\d+).+ (\d+).+\.\s{3}.+ (\d+).+ (\d+) .+\.$/gm,
		([, id, oreRobotOreCost, clayRobotOreCost, obsidianRobotOreCost, obsidianRobotClayCost, geodeRobotOreCost, geodeRobotObsidianCost]) => ({
			id: +id,
			oreRobotOreCost: +oreRobotOreCost,
			clayRobotOreCost: +clayRobotOreCost,
			obsidianRobotOreCost: +obsidianRobotOreCost,
			obsidianRobotClayCost: +obsidianRobotClayCost,
			geodeRobotOreCost: +geodeRobotOreCost,
			geodeRobotObsidianCost: +geodeRobotObsidianCost
		} as Blueprint));
}

const useBlueprint = (blueprint: Blueprint, steps: number, rankFn: (state: BlueprintState) => number, sliceCount: number) => {
	let currentStates = [{
		...blueprint,
		ore: 0,
		clay: 0,
		obsidian: 0,
		geode: 0,
		oreRobots: 1,
		clayRobots: 0,
		obsidianRobots: 0,
		geodeRobots: 0
	}];

	for (let step = 1; step <= steps; step++) {
		let nextStates = [];

		for (let state of currentStates) {
			state = {...state};
			const canBuildOreRobot = state.ore >= state.oreRobotOreCost && state.oreRobots < Math.max(state.oreRobotOreCost, state.clayRobotOreCost, state.obsidianRobotOreCost, state.geodeRobotOreCost);
			state.ore += state.oreRobots;
			const canBuildClayRobot = state.ore >= state.clayRobotOreCost && state.clayRobots < state.obsidianRobotClayCost;
			state.clay += state.clayRobots;
			const canBuildObsidianRobot = state.ore >= state.obsidianRobotOreCost && state.clay >= state.obsidianRobotClayCost && state.obsidianRobots < state.geodeRobotObsidianCost;
			state.obsidian += state.obsidianRobots;
			const canBuildGeodeRobot = state.ore >= state.geodeRobotOreCost && state.obsidian >= state.geodeRobotObsidianCost;
			state.geode += state.geodeRobots;

			nextStates.push(state);

			if (canBuildOreRobot) {
				const newState = {...state};
				newState.ore -= newState.oreRobotOreCost;
				newState.oreRobots++;
				nextStates.push(newState);
			}
			if (canBuildClayRobot) {
				const newState = {...state};
				newState.ore -= newState.clayRobotOreCost;
				newState.clayRobots++;
				nextStates.push(newState);
			}
			if (canBuildObsidianRobot) {
				const newState = {...state};
				newState.ore -= newState.obsidianRobotOreCost;
				newState.clay -= newState.obsidianRobotClayCost;
				newState.obsidianRobots++;
				nextStates.push(newState);
			}
			if (canBuildGeodeRobot) {
				const newState = {...state};
				newState.ore -= newState.geodeRobotOreCost;
				newState.obsidian -= newState.geodeRobotObsidianCost;
				newState.geodeRobots++;
				nextStates.push(newState);
			}
		}

		nextStates = nextStates
			.sort((a, b) => rankFn(b) - rankFn(a))
			.slice(0, sliceCount);
		currentStates = nextStates;
	}

	return currentStates.reduce((maxGeode, state) => Math.max(maxGeode, state.geode), 0);
}

export function p1(input: string) {
	const rankFunc = (state: BlueprintState): number =>
		1e6 * state.geodeRobots + 1e4 * state.obsidianRobots + 1e2 * state.clayRobots + state.oreRobots;
	return processInput(input)
		.map(blueprint => blueprint.id * useBlueprint(blueprint, 24, rankFunc, 3e5))
		.sum();
}

export function p2(input: string) {
	const rankFunc = (state: BlueprintState): number =>
		state.oreRobots - Math.max(state.oreRobotOreCost, state.clayRobotOreCost, state.obsidianRobotOreCost, state.geodeRobotOreCost) + state.clayRobots - state.clayRobotOreCost + state.obsidianRobots - state.geodeRobotObsidianCost + state.geodeRobots * 10 + state.geode
	return processInput(input)
		.slice(0, 3)
		.map((blueprint) => useBlueprint(blueprint, 32, rankFunc, 1e4))
		.product();
}
