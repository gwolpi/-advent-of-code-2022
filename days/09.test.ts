import '../extension-methods.ts';
import {p1, p2} from './09.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const inputs = [
	{input: 'R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2', expectP1: 13, expectP2: 1},
	{input: 'R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20', expectP1: 88, expectP2: 36},
];

inputs.forEach(({input, expectP1, expectP2}, index) => {
	Deno.test(`it should run the first part of day 06 correctly, testcase ${index + 1}/${inputs.length}`, () => {
		const result = p1(input);
		assertEquals(result, expectP1);
	});

	Deno.test(`it should run the second part of day 06 correctly, testcase ${index + 1}/${inputs.length}`, () => {
		const result = p2(input);
		assertEquals(result, expectP2);
	});
});
