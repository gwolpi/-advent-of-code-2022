import '../extension-methods.ts';

const processInput = (input: string): number[] => input.splitRows(2).map((elf) => elf.splitRows().sum());
export const p1 = (input: string): number => processInput(input).max();
export const p2 = (input: string): number => processInput(input).sortNums().slice(-3).sum()
