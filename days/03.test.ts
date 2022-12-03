import '../extension-methods.ts';
import {p1, p2} from './03.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = 'vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw';

Deno.test('it should run the first part of day 03 correctly', () => {
	const result = p1(input);
	const expected = 157;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 03 correctly', () => {
	const result = p2(input);
	const expected = 70;
	assertEquals(result, expected);
});
