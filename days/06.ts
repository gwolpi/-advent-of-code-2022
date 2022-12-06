import '../extension-methods.ts';

const processInput = (input: string, charMarker: number): number => {
	let regex = `(.)(?!.?\\${charMarker - 2})(.)(?!\\${charMarker - 1})`;
	for (let i = 1; i < charMarker - 2; i++) regex = `(.)(?!.{0,${i + 1}}\\${charMarker - i - 2})${regex}`;
	return (input.match(new RegExp(regex))?.index ?? 0) + charMarker;
}
export const p1 = (input: string): number => processInput(input, 4);

export const p2 = (input: string): number => processInput(input, 14);