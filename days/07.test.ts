import '../extension-methods.ts';
import {p1, p2} from './07.ts';
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

const input = '$ cd /\n$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n$ cd a\n$ ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n$ cd e\n$ ls\n584 i\n$ cd ..\n$ cd ..\n$ cd d\n$ ls\n4060174 j\n8033020 d.log\n5626152 d.ext\n7214296 k';

Deno.test('it should run the first part of day 07 correctly', () => {
	const result = p1(input);
	const expected = 95437;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 07 correctly', () => {
	const result = p2(input);
	const expected = 24933642;
	assertEquals(result, expected);
});
