const processInput = (input: string): number[] => input.split('\n\n')
    .map((elf) => elf.split('\n').reduce((curr: number, next: string) => curr + +next, 0));

export const p1 = (input: string): number => Math.max(...processInput(input));

export const p2 = (input: string): number => {
  const [x, y, z] = processInput(input).sort((a, b) => b - a);
  return x + y + z;
}
