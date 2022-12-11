import '../extension-methods.ts';
import {p1, p2} from './11.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '' +
  'Monkey 0:\n  Starting items: 79, 98\n  Operation: new = old * 19' +
  '\n  Test: divisible by 23\n    If true: throw to monkey 2\n    If false: throw to monkey 3\n\n' +
  'Monkey 1:\n  Starting items: 54, 65, 75, 74\n  Operation: new = old + 6' +
  '\n  Test: divisible by 19\n    If true: throw to monkey 2\n    If false: throw to monkey 0\n\n' +
  'Monkey 2:\n  Starting items: 79, 60, 97\n  Operation: new = old * old' +
  '\n  Test: divisible by 13\n    If true: throw to monkey 1\n    If false: throw to monkey 3\n\n' +
  'Monkey 3:\n  Starting items: 74\n  Operation: new = old + 3' +
  '\n  Test: divisible by 17\n    If true: throw to monkey 0\n    If false: throw to monkey 1';

Deno.test('it should run the first part of day 11 correctly', () => {
  const result = p1(input);
  const expected = 10605;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 11 correctly', () => {
  const result = p2(input);
  const expected = 0;
  assertEquals(result, expected);
});
