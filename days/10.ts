import '../extension-methods.ts';

const processInput = (input: string) => `noop\n${input}`
  // Add a noop operation before each addx operation to simulate two cycles
  .replace(/(addx -?\d+)/g, 'noop\n$1')
  .matchMap(/^\w+(?: (-?\d+))?$/gm, ([, value]) => +value);

export const p1 = (input: string): number => {
  let register = 1;
  const cycles = processInput(input);
  return cycles.reduce((acc, value, cycleNumber) => {
    // Add the signal strength to the accumulator if the cycle number is 20, 60, 100, 140, 180 or 220
    if (cycleNumber % 40 === 20) acc += register * cycleNumber;
    // if value is a valid number, it is an addx operation and should be added to the register
    if (!isNaN(value)) register += value;
    return acc;
  }, 0);
}

export const p2 = (input: string): string => {
  let register = 1;
  const cycles = processInput(input);
  return cycles.reduce((acc, value, cycleNumber) => {
    // if value is a valid number, it is an addx operation and should be added to the register
    if (!isNaN(value)) register += value;
    const pos = cycleNumber % 40;
    // Position reached the end of a row, add a newline character
    if (!pos) acc += '\n';
    // When the pixel is -1, 0 or 1, lit the pixel else leave it dark
    acc += (Math.abs(register - pos) <= 1) ? '#' : ' ';
    return acc;
  }, '').trimEnd();
}