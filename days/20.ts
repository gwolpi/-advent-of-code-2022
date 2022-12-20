import '../extension-methods.ts';

type Node = {	value: number; next: Node; prev: Node; };

class LinkedList {
	private nodes: Array<Node>;
	private get lastNode(): Node { return this.nodes.at(-1)! }
	private get length(): number { return this.nodes.length	}

	constructor(values: Array<number>) {
		const [value, ...otherValues] = values;
		const node = { value } as Node;
		node.prev = node;
		node.next = node;
		this.nodes = [node as Node];
		otherValues.forEach(value => {
			const node: Node = {value, prev: this.lastNode, next: this.lastNode.next};
			this.lastNode.next.prev = node;
			this.lastNode.next = node;
			this.nodes.push(node);
			return node;
		});
	}

	mix(amount = 1): LinkedList {
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
		for (let i = 0; i < amount; i++)
			this.nodes.forEach((node) => {
				const moves = Math.abs(node.value) % (this.length - 1);
				for (let move = 0; move < moves; move++) swap(node, node.value > 0 ? 'next' : 'prev');
			});
		return this;
	}

	coords(): number {
		let node = this.nodes.find(node => node.value === 0)!;
		let coords = 0;
		for (let move = 1; move <= 3000; move++) {
			if (node.next) node = node.next;
			if (move % 1000 === 0) coords += node.value;
		}
		return coords;
	}
}

export const p1 = (input: string): number =>
	new LinkedList(input.splitRows().map(Number)).mix().coords();

export const p2 = (input: string): number =>
	new LinkedList(input.splitRows().map(x => +x * 811589153)).mix(10).coords();
