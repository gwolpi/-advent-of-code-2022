import '../extension-methods.ts';
import {p1, p2} from './18.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '2,2,2\n1,2,2\n3,2,2\n2,1,2\n2,3,2\n2,2,1\n2,2,3\n2,2,4\n2,2,6\n1,2,5\n3,2,5\n2,1,5\n2,3,5';

Deno.test('it should run the first part of day 18 correctly', () => {
	const result = p1(input);
	const expected = 64;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 18 correctly', () => {
	const result = p2(input);
	const expected = 58;
	assertEquals(result, expected);
});
