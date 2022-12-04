import '../extension-methods.ts';
import {p1, p2} from './04.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8';

Deno.test('it should run the first part of day 04 correctly', () => {
	const result = p1(input);
	const expected = 2;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 04 correctly', () => {
	const result = p2(input);
	const expected = 4;
	assertEquals(result, expected);
});
