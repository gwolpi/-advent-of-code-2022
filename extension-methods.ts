declare global {
	export interface String {
		/**
		 * Splits the string into an array of strings based on the amount of newline-characters.
		 * @param length {number} The amount of newline characters between each row.
		 */
		splitRows(length?: number): string[];

		/**
		 * Returns an array of matches from the string.
		 * @param regex {RegExp} The regular expression to match.
		 * @param map {Function} A function that maps the matches to a new value.
		 */
		matchMap<T>(regex: RegExp, map: (match: RegExpMatchArray) => T): T[];
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
		 * Count the amount of elements which match the predicate
		 * @param predicate {Function} The predicate to match
		 */
		count(predicate?: (item: T) => boolean): number;
	}
}

String.prototype.splitRows = function (length = 1) {
	return this.trim().split(new RegExp(`\\n{${length}}`));
}

String.prototype.matchMap = function <T>(regex: RegExp, map: (match: RegExpMatchArray) => T) {
	return [...this.matchAll(regex)].map(map);
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

Array.prototype.count = function <T>(predicate?: (item: T) => boolean) {
	if (!predicate) return this.length;
	return this.filter(predicate).length;
}

export {};