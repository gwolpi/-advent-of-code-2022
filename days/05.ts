import '../extension-methods.ts';

const processInput = (input: string, reverse: boolean): string =>{
    let [a, b] = input.split('\n\n');
    const emptyChars = /^ {4}| {5}| {4}$/gm;
    while (emptyChars.test(a)) a = a.replace(emptyChars, ' [?] ');
    const stacks = a.replace(/[\[\] \d]+/gm, '')
        .split('\n')
        .reduce((acc, curr) => {
            curr.split('').forEach((x, index) => {
                if (x && x !== '?') (acc[index + 1] ||= []).unshift(x);
                return acc;
            });
            return acc;
        }, {} as { [key: string]: string[] });
    const moves = b.matchMap(/move (\d+) from (\d+) to (\d+)/g, (x) => x.slice(1, 4).map(Number));
    moves.forEach(([amount, from, to]) =>  {
        const x = stacks[from].splice(-amount)
        if (reverse) x.reverse();
        stacks[to].push(...x)
    });
    return Object.values(stacks).reduce((acc, curr) => acc + curr.at(-1), '');
}

export const p1 = (input: string): string => processInput(input, true);

export const p2 = (input: string): string => processInput(input, false);

