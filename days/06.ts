import '../extension-methods.ts';

const processInput = (input: string, charMarker: number): number => {
	const regexArray = Array.from({length: charMarker - 1},
		(_, i) => `(\\w)(?!\\w{0,${charMarker - i - 2}}\\${i + 1})`);
	return (input.match(new RegExp(regexArray.join('')))?.index ?? 0) + charMarker;
}

export const p1 = (input: string): number => processInput(input, 4);

export const p2 = (input: string): number => processInput(input, 14);