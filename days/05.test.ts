import '../extension-methods.ts';
import {p1, p2} from './05.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '    [D]    \n' +
    '[N] [C]    \n' +
    '[Z] [M] [P]\n' +
    ' 1   2   3 \n' +
    '\n' +
    'move 1 from 2 to 1\n' +
    'move 3 from 1 to 3\n' +
    'move 2 from 2 to 1\n' +
    'move 1 from 1 to 2';

Deno.test('it should run the first part of day 05 correctly', () => {
  const result = p1(input);
  const expected = 'CMZ';
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 05 correctly', () => {
  const result = p2(input);
  const expected = 'MCD';
  assertEquals(result, expected);
});
