import '../extension-methods.ts';
import {p1, p2} from './14.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '498,4 -> 498,6 -> 496,6\n503,4 -> 502,4 -> 502,9 -> 494,9';

Deno.test('it should run the first part of day 14 correctly', () => {
	const result = p1(input);
	const expected = 24;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 14 correctly', () => {
	const result = p2(input);
	const expected = 93;
	assertEquals(result, expected);
});
