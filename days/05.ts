import '../extension-methods.ts';

const processInput = (input: string): [{[p: string]: string[]}, number[][]] =>{
  const [a, b] = input.split('\n\n');
  const stacks = a
      .replace(/^ {4}\[|] \[|]? {3,}?\[?|] {4}$/gm, ',')
      .replace(/\[|]|[ \d]+/gm, '')
      .split('\n')
      .reduce((acc, curr) => {
        curr.split(',').forEach((x, index) => {
          if (!x) return;
          (acc[index + 1] ||= []).unshift(x);
          return acc;
        });
        return acc;
      }, {} as { [key: string]: string[] });
  const moves = b.matchMap(/move (\d+) from (\d+) to (\d+)/g, (x) => x.slice(1, 4).map(Number));
  return [stacks, moves];
}

export const p1 = (input: string): string => {
  const [stacks, moves] = processInput(input);
  moves.forEach(([amount, from, to]) =>  {
    stacks[to].push(...stacks[from].splice(-amount).reverse())
  });
  return Object.values(stacks).reduce((acc, curr) => acc + curr.at(-1), '');
}

export const p2 = (input: string): string => {
  const [stacks, moves] = processInput(input);
  moves.forEach(([amount, from, to]) =>  {
    stacks[to].push(...stacks[from].splice(-amount))
  });
  return Object.values(stacks).reduce((acc, curr) => acc + curr.at(-1), '');
}