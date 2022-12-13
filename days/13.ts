import '../extension-methods.ts';

type Signal = number | Array<Signal>;

const compareOrder = (left: Signal, right: Signal): boolean | null => {
	if (typeof left === "number" && typeof right === "number")
		return {[-1]: true, [0]: null, [1]: false}[Math.sign(left - right)] ?? null;
	const leftArray = Array.isArray(left) ? left : [left];
	const rightArray = Array.isArray(right) ? right : [right];
	for (let i = 0; i <= Math.min(leftArray.length, rightArray.length); i++) {
		if (i === leftArray.length && i === rightArray.length) return null;
		if (i === leftArray.length) return true;
		if (i === rightArray.length) return false;
		const result = compareOrder(leftArray[i], rightArray[i])
		if (result !== null) return result;
	}
	return null;
}

export const p1 = (input: string): number =>
	input.splitRows(2)
		.map(line => line.splitRows().map((row) => JSON.parse(row)))
		.reduce((acc, [left, right], index) =>
			acc + (compareOrder(left, right) ? index + 1 : 0), 0);

export const p2 = (input: string): number => {
	const dividerPacketOne = [[2]], dividerPacketTwo = [[6]];
	const signals = input.trim()
		.split(/\n+/).map((row) => JSON.parse(row) as Signal)
		.concat([dividerPacketOne, dividerPacketTwo])
		.sort((right, left) => +!compareOrder(right, left) - 1);
	const findPacket = (packet: number[][]) => signals.findIndex((next) => next === packet) + 1;
	return findPacket(dividerPacketOne) * findPacket(dividerPacketTwo);
}
