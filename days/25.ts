import '../extension-methods.ts';

const mapFromSnafu: { [key: string]: number } = {"=": -2, "-": -1, "0": 0, "1": 1, "2": 2,};
const mapToSnafu: { [key: number]: string } = {[-2]: "=", [-1]: "-", [0]: "0", [1]: "1", [2]: "2"};

export function p1(input: string) {
	const rows = input.split("\n");
	const msg = rows.reduce((acc, curr) => {
		curr.split('')
			.map(digit => mapFromSnafu[digit])
			.reverse()
			.forEach((digit, i) => {
				acc[i] ||= 0;
				acc[i] += digit;
			});
		return acc;
	}, Array.from({length: 20}, () => 0))

	return msg.reduce((acc, digitSum, i): number[] => {
		digitSum += acc[i];
		const digit = (digitSum + 252) % 5 - 2;
		const overflow = (digitSum - digit) / 5;
		acc[i] = digit;
		acc[i + 1] = overflow;
		return acc;
	}, [0]).map((n: number) => mapToSnafu[n]).reverse().join("").replace(/^0+/, "");
}

export const p2 = (input: string) => {
	return 'CHRISTMAS SAVED';
}