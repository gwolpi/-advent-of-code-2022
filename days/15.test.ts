import '../extension-methods.ts';
import {p1, p2} from './15.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = 'Sensor at x=2, y=18: closest beacon is at x=-2, y=15\n' +
	'Sensor at x=9, y=16: closest beacon is at x=10, y=16\n' +
	'Sensor at x=13, y=2: closest beacon is at x=15, y=3\n' +
	'Sensor at x=12, y=14: closest beacon is at x=10, y=16\n' +
	'Sensor at x=10, y=20: closest beacon is at x=10, y=16\n' +
	'Sensor at x=14, y=17: closest beacon is at x=10, y=16\n' +
	'Sensor at x=8, y=7: closest beacon is at x=2, y=10\n' +
	'Sensor at x=2, y=0: closest beacon is at x=2, y=10\n' +
	'Sensor at x=0, y=11: closest beacon is at x=2, y=10\n' +
	'Sensor at x=20, y=14: closest beacon is at x=25, y=17\n' +
	'Sensor at x=17, y=20: closest beacon is at x=21, y=22\n' +
	'Sensor at x=16, y=7: closest beacon is at x=15, y=3\n' +
	'Sensor at x=14, y=3: closest beacon is at x=15, y=3\n' +
	'Sensor at x=20, y=1: closest beacon is at x=15, y=3';

Deno.test('it should run the first part of day 15 correctly', () => {
	const result = p1(input, 10);
	const expected = 26;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 15 correctly', () => {
	const result = p2(input, 20);
	const expected = 56000011;
	assertEquals(result, expected);
});
