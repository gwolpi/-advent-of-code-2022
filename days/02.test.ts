import '../extension-methods.ts';
import {p1, p2} from './02.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = 'A Y\nB X\nC Z';

Deno.test('it should run the first part of day 02 correctly', () => {
	const result = p1(input);
	const expected = 15;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 02 correctly', () => {
	const result = p2(input);
	const expected = 12;
	assertEquals(result, expected);
});
