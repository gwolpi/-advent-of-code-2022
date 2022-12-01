import {p1, p2} from './01.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = `1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000`;

Deno.test('it should run the first part of day 01 correctly', () => {
	const result = p1(input);
	const expected = 24000;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 01 correctly', () => {
	const result = p2(input);
	const expected = 45000;
	assertEquals(result, expected);
});
