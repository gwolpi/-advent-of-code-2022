import '../extension-methods.ts';

const processInput = (input: string, charMarker: number): number => {
	let regex = `(\\w)(?!\\${charMarker - 1})`;
	for (let i = 1; i < charMarker - 1; i++) regex = `(\\w)(?!\\w{0,${i}}\\${charMarker - i - 1})${regex}`;
	return (input.match(new RegExp(regex))?.index ?? 0) + charMarker;
}
export const p1 = (input: string): number => processInput(input, 4);

export const p2 = (input: string): number => processInput(input, 14);