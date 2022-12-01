import './extension-methods.ts'
import {ensureDir} from "https://deno.land/std@0.166.0/fs/ensure_dir.ts";
import {config} from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {brightBlue as blue, brightYellow as yellow, underline as ul} from "https://deno.land/std@0.116.0/fmt/colors.ts";

const [cmd, dayArg, partArg] = Deno.args;
const dayNumber = Number(dayArg);
if (isNaN(dayNumber)) throw new Error('Day number provided is incorrect')
const dayCode = `${dayNumber}`.padStart(2, '0');
const {ADVENT_YEAR, ADVENT_SESSION_TOKEN} = config();

switch (cmd) {
	case 'run': {
		const file = await import(`./days/${dayCode}.ts`);
		const response = await fetch(`https://adventofcode.com/${ADVENT_YEAR}/day/${dayNumber}/input`, {headers: {cookie: `session=${ADVENT_SESSION_TOKEN}`}});
		if (!response.ok) throw new Error('Error while fetching input, maybe your session token is expired?');
		const input = await response.text();
		const runningMsg = `Running day ${dayNumber} part`;
		const runPart = (partNumber?: number) => {
			if (!(!partArg || partNumber === +partArg)) return;
			const timerStart = performance.now();
			const result = file[`p${partNumber}`](input);
			const timerEnd = performance.now() - timerStart;
			console.log(ul(blue(`${runningMsg} ${partNumber}:`)));
			console.log(`${yellow('[Answer]\t')} ${result}`);
			console.log(`${yellow('[Time]\t\t')} ~${timerEnd.toFixed(3)}ms\n`);
		}
		runPart(1);
		runPart(2);
		break;
	}
	case 'create': {
		console.log(`Creating day ${dayNumber}`);
		const template = await Deno.readTextFile('./template.ts.txt');
		const testTemplate = await Deno.readTextFile('./template.test.ts.txt');
		await ensureDir(`./days`);
		await Deno.writeTextFile(`./days/${dayCode}.ts`, template);
		await Deno.writeTextFile(`./days/${dayCode}.test.ts`, testTemplate.replaceAll('{DAYNUMBER}', dayCode));
		break;
	}
	default: {
		throw new Error('Command not found');
	}
}