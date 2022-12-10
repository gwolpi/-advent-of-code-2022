import '../extension-methods.ts';

const processInput = (input: string) => `noop\n${input}`
  .replace(/(addx -?\d+)/g, 'noop\n$1')
  .matchMap(/^\w+(?: (-?\d+))?$/gm, ([, value]) => +value);

export const p1 = (input: string): number => {
  let register = 1;
  return processInput(input).reduce((acc, value, cycleNumber) => {
    if (cycleNumber % 40 === 20) acc += register * cycleNumber;
    if (value) register += value;
    return acc;
  }, 0);
}

export const p2 = (input: string): string => {
  let register = 1;
  return processInput(input).reduce((acc, value, cycleNumber) => {
    if (value) register += value;
    const pos = cycleNumber % 40;
    if (!pos) acc += '\n';
    return acc + ((Math.abs(register - pos) <= 1) ? '#' : '.');
  }, '');
}
