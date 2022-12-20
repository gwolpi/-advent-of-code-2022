import '../extension-methods.ts';

type Node = { value: number; next: Node; prev: Node; };

const processInput = (input: string, encryptionKey = 1, mixAmount = 1): number => {
	const values = input.splitRows().map(x => +x * encryptionKey);
	const [value, ...otherValues] = values;
	const node = {value} as Node;
	node.prev = node;
	node.next = node;
	const nodes = [node as Node];
	otherValues.forEach(value => {
		const lastNode = nodes.at(-1)!
		const node: Node = {value, prev: lastNode, next: lastNode.next};
		lastNode.next.prev = node;
		lastNode.next = node;
		nodes.push(node);
	});

	const swap = (node: Node, dir: 'next' | 'prev') => {
		const xdir = dir === 'next' ? 'prev' : 'next';
		const swap = node[dir];
		node[dir] = swap[dir];
		swap[xdir] = node[xdir];
		swap[dir][xdir] = node;
		swap[dir] = node;
		node[xdir][dir] = swap;
		node[xdir] = swap;
	};
	for (let i = 0; i < mixAmount; i++)
		nodes.forEach((node) => {
			for (let move = 0; move < Math.abs(node.value) % (nodes.length - 1); move++)
				swap(node, node.value > 0 ? 'next' : 'prev');
		});

	let found = nodes.find(node => node.value === 0)!;
	let coords = 0;
	for (let move = 1; move <= 3000; move++) {
		if (found.next) found = found.next;
		if (move % 1000 === 0) coords += found.value;
	}
	return coords;
}

export const p1 = (input: string): number => processInput(input);

export const p2 = (input: string): number => processInput(input, 811589153, 10);
