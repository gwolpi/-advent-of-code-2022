import '../extension-methods.ts';

const compareOrder = (left: number, right: number): boolean | null => {
	if (typeof left === "number" && typeof right === "number") {
		return left < right ? true : left > right ? false : null;
	}
	const leftArray = Array.isArray(left) ? left : [left];
	const rightArray = Array.isArray(right) ? right : [right];
	for (let i = 0; i <= Math.min(leftArray.length, rightArray.length); i++) {
		if (i === leftArray.length && i === rightArray.length) return null;
		if (i === leftArray.length) return true;
		if (i === rightArray.length) return false;
		const result = compareOrder(leftArray[i], rightArray[i])
		if (result === null) continue;
		return result;
	}
	return null;
}

export const p1 = (input: string): number => {
	return input.splitRows(2)
		.map(line => line.splitRows().map((row) => JSON.parse(row)))
		.reduce((acc, [left, right], index) =>
				acc + (compareOrder(left, right) ? index + 1 : 0)
			, 0);
}

export const p2 = (input: string): number => {
	const dividerPacketOne = [[2]], dividerPacketTwo = [[6]];
	const signal = input.trim()
		.split(/\n+/).map((row) => JSON.parse(row))
		.concat([dividerPacketOne, dividerPacketTwo]);
	for (let i = 1; i < signal.length; i++) {
		const left = signal[i - 1], right = signal[i];
		if (compareOrder(left, right)) continue;
		[signal[i - 1], signal[i]] = [right, left];
		i = 0;
	}
	const findPacket = (packet: number[][]) => signal.findIndex((next) => next === packet) + 1;
	return findPacket(dividerPacketOne) * findPacket(dividerPacketTwo);
}