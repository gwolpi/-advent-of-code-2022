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
		otherValues.forEach(value => this.push(value));
	}

	mix(): LinkedList {
		this.nodes.forEach((node) => {
			const func = node.value > 0 ? this.swapNext : this.swapPrev;
			const moves = Math.abs(node.value) % (this.length - 1);
			for (let move = 0; move < moves; move++) func(node);
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

	private push(value: number) {
		const node: Node = {value, prev: this.lastNode, next: this.lastNode.next};
		this.lastNode.next.prev = node;
		this.lastNode.next = node;
		this.nodes.push(node);
		return node;
	}

	private swapNext(node: Node) {
		const swap = node.next;
		node.next = swap.next;
		swap.prev = node.prev;
		swap.next.prev = node;
		swap.next = node;
		node.prev.next = swap;
		node.prev = swap;
	}

	private swapPrev(node: Node) {
		const swap = node.prev;
		node.prev = swap.prev;
		swap.next = node.next;
		swap.prev.next = node;
		swap.prev = node;
		node.next.prev = swap;
		node.next = swap;
	}
}

export const p1 = (input: string): number =>
	new LinkedList(input.splitRows().map(Number)).mix().coords();

export const p2 = (input: string): number => {
	const list = new LinkedList(input.splitRows().map(x => +x * 811589153));
	for (let round = 1; round <= 10; round++) list.mix();
	return list.coords();
}