import '../extension-methods.ts';

const processInput = (input: string) => `noop\n${input}`
  .replace(/(addx -?\d+)/g, 'noop\n$1')
  .matchMap(/^(\w+)(?: (-?\d+))?$/gm,
    ([, operationName, value]) => ({ changeRegister: operationName === 'addx', value: +value }));

export const p1 = (input: string): number => {
  let register = 1;
  const cycles = processInput(input);
  return cycles.reduce((acc, { changeRegister, value }, index) => {
    const cycleNumber = index + 1;
    if (changeRegister) register += value;
    if (cycleNumber % 40 === 20) acc += register * cycleNumber;
    return acc;
  }, 0);
}

export const p2 = (input: string): string => {
  let register = 1;
  const cycles = processInput(input);
  return cycles.reduce((acc, { changeRegister, value }, cycleNumber) => {
    if (changeRegister) register += value;
    const pos = cycleNumber % 40;
    if (!pos) acc += '\n';
    acc += (Math.abs(register - pos) <= 1) ? '#' : ' ';
    return acc;
  }, '').trimEnd();
}