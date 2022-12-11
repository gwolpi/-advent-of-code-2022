import '../extension-methods.ts';

type Monkey = { id: number, items: number[], operator: string, operationValue: number, testDivision: number, conditionTrue: number, conditionFalse: number, inspectionCount: number };

const processInput = (input: string): Monkey[] =>
	input.matchMap(/^.+(\d+):\n.+:\s([\d, ]+)\n.+([*+])\s(\d+|old)\n.+y\s(\d+)\n.+y\s(\d+)\n.+y\s(\d+)$/gm,
		([, id, items, operator, operationVal, testDivision, conditionTrue, conditionFalse]) => ({
			id: +id,
			items: items.split(', ').map(x => +x),
			operator,
			operationValue: +operationVal,
			testDivision: +testDivision,
			conditionTrue: +conditionTrue,
			conditionFalse: +conditionFalse,
			inspectionCount: 0,
		} as Monkey));

const operators: { [key: string]: (itemNumber: number, operationValue: number) => number } = {
	'*': (itemNumber: number, operationValue: number) => itemNumber * (operationValue || itemNumber),
	'+': (itemNumber: number, operationValue: number) => itemNumber + (operationValue || itemNumber),
}

export const p1 = (input: string): number => {
	const monkeys = processInput(input);
	for (let i = 0; i < 20; i++)
		for (const monkey of monkeys) {
			const {items, operator, operationValue, testDivision, conditionTrue, conditionFalse} = monkey;
			items.forEach((itemNumber: number) => {
				const worry = Math.floor(operators[operator](itemNumber, operationValue) / 3);
				const target = !(worry % testDivision) ? conditionTrue : conditionFalse;
				monkeys.find(({id}) => id === target)!.items.push(worry);
				monkey.inspectionCount++;
			});
			// Prevent infinite loop
			// Emptying an array without breaking its references by making its length = 0;
			items.length = 0;
		}

	const result = monkeys.map(x => x.inspectionCount).sortNums();
	return result.at(-1)! * result.at(-2)!;
}

export const p2 = (input: string): number => {
	const monkeys = processInput(input);
	const safeDivision = monkeys.map(({testDivision}) => testDivision).reduce((a, b) => a * b);
	for (let i = 0; i < 10000; i++)
		for (const monkey of monkeys) {
			const {items, operator, operationValue, testDivision, conditionTrue, conditionFalse} = monkey;
			items.forEach((itemNumber: number) => {
				const worry = operators[operator](itemNumber, operationValue) % safeDivision;
				const target = !(worry % testDivision) ? conditionTrue : conditionFalse;
				monkeys.find(({id}) => id === target)!.items.push(worry);
				monkey.inspectionCount++;
			});
			// Prevent infinite loop
			// Emptying an array without breaking its references by making its length = 0;
			items.length = 0;
		}

	const result = monkeys.map(({inspectionCount}) => inspectionCount).sortNums();
	return result.at(-1)! * result.at(-2)!;
}
