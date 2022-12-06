import '../extension-methods.ts';
import {p1, p2} from './06.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const inputs = [
	{input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expectP1: 7, expectP2: 19},
	{input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expectP1: 5, expectP2: 23},
	{input: 'nppdvjthqldpwncqszvftbrmjlhg', expectP1: 6, expectP2: 23},
	{input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expectP1: 10, expectP2: 29},
	{input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expectP1: 11, expectP2: 26},
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
