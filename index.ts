import { ensureDir } from "https://deno.land/std@0.166.0/fs/ensure_dir.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { brightYellow as yellow, underline, brightBlue as blue } from "https://deno.land/std@0.116.0/fmt/colors.ts";

const [ cmd, dayArg, partNumber ] = Deno.args;
const dayNumber = Number(dayArg);
if (isNaN(dayNumber)) throw new Error('Day number provided is incorrect')
const day = `${dayNumber}`.padStart(2, '0');
const env = config();

switch(cmd) {
  case 'run': {
    const file = await import(`./days/${day}.ts`);
    const response = await fetch(`https://adventofcode.com/${env.ADVENT_YEAR}/day/${dayNumber}/input`, { headers: { cookie: `session=${env.ADVENT_SESSION_TOKEN}` }});
    if (!response.ok) throw new Error('Advent of Code Session Token not set');
    const input = await response.text();
    const runningDay = `${blue('Running day')} ${yellow(day)} ${blue('part')}`;
    const runPart = (x?: number) => {
      if (!(!partNumber || x === +partNumber)) return;
      const timerStart = performance.now();
      const result = file[`p${x}`](input);
      const timerEnd = performance.now() - timerStart;
      console.log(underline(`${runningDay} ${yellow(`${x}`)}`));
      console.log(`${yellow('[Answer]\t')} ${result}`);
      console.log(`${yellow('[Time]\t\t')} ~${timerEnd.toFixed(3)}ms`);
    }
    runPart(1);
    console.log('')
    runPart(2);
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