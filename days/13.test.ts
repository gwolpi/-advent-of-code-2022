import '../extension-methods.ts';
import {p1, p2} from './13.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '[1,1,3,1,1]\n[1,1,5,1,1]\n\n[[1],[2,3,4]]\n[[1],4]\n\n[9]\n[[8,7,6]]\n\n[[4,4],4,4]\n[[4,4],4,4,4]\n\n[7,7,7,7]\n[7,7,7]\n\n[]\n[3]\n\n[[[]]]\n[[]]\n\n[1,[2,[3,[4,[5,6,7]]]],8,9]\n[1,[2,[3,[4,[5,6,0]]]],8,9]';

Deno.test('it should run the first part of day 13 correctly', () => {
	const result = p1(input);
	const expected = 13;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 13 correctly', () => {
	const result = p2(input);
	const expected = 140;
	assertEquals(result, expected);
});
