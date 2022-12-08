import '../extension-methods.ts';
import {p1, p2} from './08.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '30373\n25512\n65332\n33549\n35390';

Deno.test('it should run the first part of day 08 correctly', () => {
	const result = p1(input);
	const expected = 21;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 08 correctly', () => {
	const result = p2(input);
	const expected = 8;
	assertEquals(result, expected);
});
