const processInput = (input: string): number[] => {
  return input.split('\n\n')
      .map((elf) => elf.split('\n').reduce((curr, next) => curr + +next, 0));
};

export const p1 = (input: string): number => Math.max(...processInput(input));

export const p2 = (input: string): number => {
  const [x, y, z] = processInput(input).sort((a, b) => b - a);
  return x + y + z;
}
