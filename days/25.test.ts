import '../extension-methods.ts';
import {p1, p2} from './25.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '1=-0-2\n12111\n2=0=\n21\n2=01\n111\n20012\n112\n1=-1=\n1-12\n12\n1=\n122';

Deno.test('it should run the first part of day 25 correctly', () => {
	const result = p1(input);
	const expected = '2=-1=0';
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 25 correctly', () => {
	const result = p2(input);
	const expected = 'CHRISTMAS SAVED';
	assertEquals(result, expected);
});
