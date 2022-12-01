declare global {
	export interface String {
		splitRows(length?: number): string[];
	}

	export interface Array<T> {
		sum(): number;

		max(): number;

		min(): number;

		avg(): number;

		sortNums(): number[];

		take(amount: number): Array<T>;
	}
}

String.prototype.splitRows = function (length = 1) {
	return this.split(new RegExp(`\\n{${length}}`));
}

Array.prototype.sum = function () {
	return this.reduce((a, b) => a + +b, 0);
}

Array.prototype.max = function () {
	return Math.max(...this);
}

Array.prototype.min = function () {
	return Math.min(...this);
}

Array.prototype.avg = function () {
	return this.sum() / this.length;
}

Array.prototype.sortNums = function () {
	return this.sort((a, b) => a - b);
}

Array.prototype.take = function (amount) {
	return this.slice(amount);
}

export {};