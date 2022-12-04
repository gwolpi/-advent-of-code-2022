import '../extension-methods.ts';

export const p1 = (input: string): number => {
  const lines = input.splitRows().map(Number);
  return lines.length;
}

export const p2 = (input: string): number => {
  const lines = input.splitRows().map(Number);
  return lines.length;
}