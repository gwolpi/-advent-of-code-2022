import '../extension-methods.ts';
import {p1, p2} from './17.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>';

Deno.test('it should run the first part of day 17 correctly', () => {
	const result = p1(input);
	const expected = 3068;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 17 correctly', () => {
	const result = p2(input);
	const expected = 1514285714288;
	assertEquals(result, expected);
});
