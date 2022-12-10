import '../extension-methods.ts';

const processInput = (input: string) => `noop\n${input}`
  .replace(/(addx -?\d+)/g, 'noop\n$1')
  .matchMap(/^(\w+)(?: (-?\d+))?$/gm,
    ([, operationName, value]) => ({ changeRegister: operationName === 'addx', value: +value }));

export const p1 = (input: string): number => {
  const cycles = processInput(input);
  let register = 1;
  return cycles.reduce((acc, { changeRegister, value }, index) => {
    const cycleNumber = index + 1;
    if (changeRegister) register += value;
    if (cycleNumber % 40 === 20) {
      const signalStrength = register * cycleNumber;
      acc += signalStrength;
    }
    return acc;
  }, 0);
}

export const p2 = (input: string): string => {
  const cycles = processInput(input);
  let register = 1;
  return '\n' + cycles.reduce((acc, { changeRegister, value }, cycleNumber) => {
    if (changeRegister) register += value;
    const pos = cycleNumber % 40;
    acc += (Math.abs(register - pos) <= 1) ? '#' : ' ';
    if (pos === 39) acc += '\n';
    return acc;
  }, '').trimEnd();
}