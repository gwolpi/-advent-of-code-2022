import '../extension-methods.ts';
import {p1, p2} from './12.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = 'Sabqponm\nabcryxxl\naccszExk\nacctuvwj\nabdefghi';

Deno.test('it should run the first part of day 12 correctly', () => {
  const result = p1(input);
  const expected = 31;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 12 correctly', () => {
  const result = p2(input);
  const expected = 29;
  assertEquals(result, expected);
});
