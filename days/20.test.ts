import '../extension-methods.ts';
import {p1, p2} from './20.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '1\n2\n-3\n3\n-2\n0\n4';

Deno.test('it should run the first part of day 20 correctly', () => {
  const result = p1(input);
  const expected = 3;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 20 correctly', () => {
  const result = p2(input);
  const expected = 1623178306;
  assertEquals(result, expected);
});
