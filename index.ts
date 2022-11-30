import { ensureDir } from "https://deno.land/std@0.116.0/fs/ensure_dir.ts";
import { config } from 'https://deno.land/x/dotenv@v3.1.0/mod.ts';
import { brightYellow, underline, brightBlue } from 'https://deno.land/std@0.116.0/fmt/colors.ts';

const [ cmd, dayNumber, partNumber ] = Deno.args;
if (!dayNumber.match(/^\d{1,2}$/)) throw new Error('Day number provided is incorrect')
const day = String(+dayNumber).padStart(2, '0');
const env = config();

switch(cmd) {
  case 'run': {
    const file = await import(`./days/${day}.ts`);
    const response = await fetch(`https://adventofcode.com/2021/day/${dayNumber}/input`, { headers: { cookie: `session=${env.ADVENT_SESSION_TOKEN}` }});
    if (!response.ok) throw new Error('Advent of Code Session Token not set');
    const input = await response.text();
    const runningDay = `${brightBlue('Running day')} ${brightYellow(dayNumber)} ${brightBlue('part')}`;
    if (!partNumber || +partNumber === 1) {
      const timerStart = performance.now();
      console.log(underline(`${runningDay} ${brightYellow('1')}`));
      console.log(`${brightYellow('[Answer]')} ${file.p1(input)}`);
      const timerEnd = performance.now() - timerStart;
      console.log(`${brightYellow('[Time]')} ~${timerEnd.toFixed(3)}ms`);
    }
    if (!partNumber || +partNumber === 2) {
      const timerStart = performance.now();
      console.log(underline(`${runningDay} ${brightYellow('2')}`));
      console.log(`${brightYellow('[Answer]')} ${file.p2(input)}`);
      const timerEnd = performance.now() - timerStart;
      console.log(`${brightYellow('[Time]')} ~${timerEnd.toFixed(3)}ms`);
    }
    break;
  }
  case 'create': {
    console.log(`Creating day ${dayNumber}`)
    const template = await Deno.readTextFile('./template.ts.txt');
    const testTemplate = await Deno.readTextFile('./template.test.ts.txt');
    await ensureDir(`./days`);
    await Deno.writeTextFile(`./days/${day}.ts`, template);
    await Deno.writeTextFile(`./days/${day}.test.ts`, testTemplate.replaceAll('{DAYNUMBER}', day));
    break;
  }
  default: {
    throw new Error('Command not found');
  }
}