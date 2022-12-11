import '../extension-methods.ts';

type Monkey = { id: number, items: number[], operator: string, operationValue: number, testDivision: number, conditionTrue: number, conditionFalse: number, inspectionCount: number };

const processInput = (input: string): { [key: number]: Monkey } => {
	const regex = /Monkey (\d+):\n {2}Starting items: ([\d, ]+)\n {2}Operation: new = old ([*+]) (\d+|\w+)\n {2}Test: divisible by (\d+)\n {4}If true: throw to monkey (\d+)\n {4}If false: throw to monkey (\d)/gm;
	return input.matchMap(regex, ([, id, items, operator, operationVal, testDivision, conditionTrue, conditionFalse]) => ({
		id: +id,
		items: items.split(', ').map(x => +x),
		operator,
		operationValue: +operationVal || 0,
		testDivision: +testDivision,
		conditionTrue: +conditionTrue,
		conditionFalse: +conditionFalse,
		inspectionCount: 0,
	} as Monkey)).reduce((acc, monkey) => {
		acc[monkey.id] = monkey;
		return acc;
	}, {} as { [key: number]: Monkey });
}

export const p1 = (input: string): number => {
	const monkeysMap = processInput(input), monkeysArray = Object.values(monkeysMap);
	for (let i = 0; i < 20; i++)
		for (const monkey of monkeysArray) {
			const {items, operator, operationValue, testDivision, conditionTrue, conditionFalse} = monkey;
			items.forEach((itemNumber: number) => {
				const operators: { [key: string]: () => number } = {
					'*': () => itemNumber * (operationValue || itemNumber),
					'+': () => itemNumber + (operationValue || itemNumber),
				}
				const worry = Math.floor(operators[operator]() / 3);
				const target = !(worry % testDivision) ? conditionTrue : conditionFalse;
				monkeysMap[target].items.push(worry);
				monkey.inspectionCount++;
			});
			// Prevent infinite loop
			items.length = 0;
		}

	const result = monkeysArray.map(x => x.inspectionCount).sortNums();
	return result.at(-1)! * result.at(-2)!;
}

export const p2 = (input: string): number => {
	const monkeysMap = processInput(input), monkeysArray = Object.values(monkeysMap);
	const safeDivisible = monkeysArray.map(({testDivision}) => testDivision).reduce((a, b) => a * b);
	for (let i = 0; i < 10000; i++)
		for (const monkey of monkeysArray) {
			const {items, operator, operationValue, testDivision, conditionTrue, conditionFalse} = monkey;
			items.forEach((itemNumber: number) => {
				const operators: { [key: string]: () => number } = {
					'*': () => itemNumber * (operationValue || itemNumber),
					'+': () => itemNumber + (operationValue || itemNumber),
				}
				const worry = operators[operator]() % safeDivisible;
				const target = !(worry % testDivision) ? conditionTrue : conditionFalse;
				monkeysMap[target].items.push(worry);
				monkey.inspectionCount++;
			});
			// Prevent infinite loop
			items.length = 0;
		}

	const result = monkeysArray.map(({inspectionCount}) => inspectionCount).sortNums();
	return result.at(-1)! * result.at(-2)!;
}
