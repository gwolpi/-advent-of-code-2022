import '../extension-methods.ts';

const processInput = (input: string): number[][] =>
	input.splitRows().map(line => [...line].map(Number));

export const p1 = (input: string): number => {
	const rows = processInput(input);
	return rows.reduce((acc, row, y) => {
		return acc + row.reduce((acc, cell, x) => {
			const checkRow = (row: number): boolean => row < cell;
			const column = rows.map(row => row[x]);
			const l = row.slice(0, x).every(checkRow);
			const r = row.slice(x + 1).every(checkRow);
			const t = column.slice(0, y).every(checkRow);
			const d = column.slice(y + 1).every(checkRow);
			return acc + +(l || r || t || d);
		}, 0);
	}, 0);
}

export const p2 = (input: string): number => {
	const rows = processInput(input);
	return rows.reduce((acc, row, y) => {
		return [acc, row.reduce((acc, cell, x) => {
			const checkView = (view: number[]): number => (view.findIndex(r => r >= cell) + 1) || view.length;
			const column = rows.map(row => row[x]);
			const l = checkView(row.slice(0, x).reverse());
			const r = checkView(row.slice(x + 1));
			const t = checkView(column.slice(0, y).reverse());
			const b = checkView(column.slice(y + 1));
			return [acc, l * r * t * b].max();
		}, 0)].max();
	}, 0);
}
