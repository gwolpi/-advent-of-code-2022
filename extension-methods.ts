declare global {
	export interface String {
		/**
		 * Splits the string into an array of strings based on the amount of newline-characters.
		 * @param length {number} The amount of newline characters between each row.
		 */
		splitRows(length?: number): string[];
	}

	export interface Array<T> {
		/**
		 * Sums all the numbers in the array
		 */
		sum(): number;

		/**
		 * Returns the highest number in the array
		 */
		max(): number;

		/**
		 * Returns the lowest number in the array
		 */
		min(): number;

		/**
		 * Returns the average of all the numbers in the array
		 */
		avg(): number;

		/**
		 * Sorts the array numerically
		 */
		sortNums(): number[];

		/**
		 * Returns the first n elements of the array
		 * @param amount {number} The amount of elements to take
		 */
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