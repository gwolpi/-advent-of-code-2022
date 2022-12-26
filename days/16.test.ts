import '../extension-methods.ts';
import {p1, p2} from './16.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = 'Valve AA has flow rate=0; tunnels lead to valves DD, II, BB\n' +
	'Valve BB has flow rate=13; tunnels lead to valves CC, AA\n' +
	'Valve CC has flow rate=2; tunnels lead to valves DD, BB\n' +
	'Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE\n' +
	'Valve EE has flow rate=3; tunnels lead to valves FF, DD\n' +
	'Valve FF has flow rate=0; tunnels lead to valves EE, GG\n' +
	'Valve GG has flow rate=0; tunnels lead to valves FF, HH\n' +
	'Valve HH has flow rate=22; tunnel leads to valve GG\n' +
	'Valve II has flow rate=0; tunnels lead to valves AA, JJ\n' +
	'Valve JJ has flow rate=21; tunnel leads to valve II';

Deno.test('it should run the first part of day 16 correctly', () => {
	const result = p1(input);
	const expected = 1651;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
	const result = p2(input);
	const expected = 1707;
	assertEquals(result, expected);
});
