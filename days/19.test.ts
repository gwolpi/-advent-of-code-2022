import '../extension-methods.ts';
import {p1, p2} from './19.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = 'Blueprint 1:\n  Each ore robot costs 4 ore.\n  Each clay robot costs 2 ore.\n  Each obsidian robot costs 3 ore and 14 clay.\n  Each geode robot costs 2 ore and 7 obsidian.\n\nBlueprint 2:\n  Each ore robot costs 2 ore.\n  Each clay robot costs 3 ore.\n  Each obsidian robot costs 3 ore and 8 clay.\n  Each geode robot costs 3 ore and 12 obsidian.';

Deno.test('it should run the first part of day 19 correctly', () => {
	const result = p1(input);
	const expected = 33;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 19 correctly', () => {
	const result = p2(input);
	const expected = 56 * 62;
	assertEquals(result, expected);
});
