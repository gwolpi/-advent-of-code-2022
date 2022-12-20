import '../extension-methods.ts';

type Coord = {	value: number; next: Coord; prev: Coord; };

class EncryptedFile {
	private nodes: Array<Coord>;
	private get lastNode(): Coord { return this.nodes.at(-1)! }
	private get length(): number { return this.nodes.length	}

	constructor(input: string, encryptionKey = 1, mixAmount = 1) {
		const values = input.splitRows().map(x => +x * encryptionKey);
		const [value, ...otherValues] = values;
		const node = { value } as Coord;
		node.prev = node;
		node.next = node;
		this.nodes = [node as Coord];
		otherValues.forEach(value => {
			const node: Coord = {value, prev: this.lastNode, next: this.lastNode.next};
			this.lastNode.next.prev = node;
			this.lastNode.next = node;
			this.nodes.push(node);
			return node;
		});

		const swap = (node: Coord, dir: 'next' | 'prev') => {
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
			this.nodes.forEach((node) => {
				const moves = Math.abs(node.value) % (this.length - 1);
				for (let move = 0; move < moves; move++) swap(node, node.value > 0 ? 'next' : 'prev');
			});
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
	new EncryptedFile(input).coords();

export const p2 = (input: string): number =>
	new EncryptedFile(input, 811589153, 10).coords();
