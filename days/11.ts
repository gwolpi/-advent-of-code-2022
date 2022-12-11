import '../extension-methods.ts';

type Monkey = {id: number, items: number[], operator: string, operationVal: string | number, testDivision: number, conditionTrue: number, conditionFalse: number, acc: number };

const processInput = (input: string): Monkey[] => {
  const regex = /Monkey (\d+):\n {2}Starting items: ([\d, ]+)\n {2}Operation: new = old ([*+]) (\d+|\w+)\n {2}Test: divisible by (\d+)\n {4}If true: throw to monkey (\d+)\n {4}If false: throw to monkey (\d)/gm;
  return input.matchMap(regex, ([, id, items, operator, operationVal, testDivision, conditionTrue, conditionFalse]) => ({
    id: +id,
    items: items.split(', ').map(x => +x),
    operator,
    operationVal: isNaN(+operationVal) ? operationVal : +operationVal,
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
  const monkeys = processInput(input);
  for(let i = 0; i < 20; i++) {
    for (const monkey of Object.values(monkeys)) {
      monkey.items.forEach((worry) => {
        const operationValue = typeof monkey.operationVal === 'number' ? monkey.operationVal : worry
        const operators = {
          '*': () => worry *= operationValue,
          '+': () => worry += operationValue,
        }
        worry = Math.floor(operators[monkey.operator]() / 3);
        const targetMonkey = worry % monkey.testDivision === 0 ? monkey.conditionTrue : monkey.conditionFalse;
        monkeys[targetMonkey].items.push(worry);
        monkey.inspectionCount++;
      });
      // Prevent infinite loop
      monkey.items.length = 0;
    }
  }

  const [ a, b ] = Object.values(monkeys).map(x => x.inspectionCount).sort((a, b) => b - a);
  return a * b;
}

export const p2 = (input: string): number => {
  const monkeys = processInput(input);
  const safeDivisible = Object.values(monkeys).map(({ testDivision }) => testDivision).reduce((a, b) => a * b);
  for(let i = 0; i < 10000; i++) {
    for (const monkey of Object.values(monkeys)) {
      monkey.items.forEach((worry) => {
        const operationValue = typeof monkey.operationVal === 'number' ? monkey.operationVal : worry
        const operators = {
          '*': () => worry *= operationValue,
          '+': () => worry += operationValue,
        }
        worry = operators[monkey.operator]() % safeDivisible;
        const target = worry % monkey.testDivision === 0 ? monkey.conditionTrue : monkey.conditionFalse;
        monkeys[target].items.push(worry);
        monkey.inspectionCount++;
      });
      // Prevent infinite loop
      monkey.items.length = 0;
    }
  }

  const [ a, b ] = Object.values(monkeys).map(x => x.inspectionCount).sort((a, b) => b - a);
  return a * b;
}