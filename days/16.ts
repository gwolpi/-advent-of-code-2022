import '../extension-methods.ts';

type Valve = { name: string, rate: number, to: string[] };

const processInput = (input: string) => {
  const valves = input.matchMap(/^Valve (\w{2}).+=(\d+);.+es? ([\w, ]+)$/gm,
    ([, name, rate, to]): Valve => ({name, rate: +rate, to: to.split(', ')}));
  let initialValve = valves[0];

  let i = 0;
  const startTrack = (valveName: string, remainingTime: number, opened: { [valve: string]: number }): number => {
    if (++i % 100000 === 0) console.log(i);
    const valve = valves.find((valve) => valve.name === valveName)!;
    if (remainingTime === 0) {
      return Object.values(opened).sum();
    }

    const tracks = [];
    // Get a list of valves which have not been opened yet
    const unopened = valves.filter((valve) => !opened[valve.name]);
    // Open this valve when it's not already open and when other valves with a much higher flow rate are not open
    if (opened[valveName] === undefined && valve.rate > 0 && !unopened.some(({rate}) => rate > valve.rate * 2)) {
      tracks.push(startTrack(
        valveName,
        remainingTime - 1,
        structuredClone({...opened, [valveName]: valve.rate * (remainingTime - 1)}))
      );
    } else {
      // Move to the next valve
      valve.to.forEach((to) => {
        tracks.push(startTrack(to, remainingTime - 1, structuredClone(opened)))
      });
    }

    return Math.max(...tracks);
  }

  return startTrack(initialValve.name, 30, {});
}


export const p1 = (input: string): number => {
  return processInput(input);
}

export const p2 = (input: string): number => {
  const lines = input.splitRows().map(Number);
  return lines.length;
}