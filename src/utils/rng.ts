export const randomWithSeed = (seed: number) => {
  const finalSeed = seed ?? Math.random() * 360;
  const x = Math.sin(finalSeed) * 10000; 
  return x - Math.floor(x);
}

export const shuffleArray = <T = unknown>(array: T[], seed?: number) => {
  const newArray = [...array];
  let m = newArray.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  let initialSeed = seed ?? (Math.random() * 360);
  while (m) {
    // Pick a remaining element…
    i = Math.floor(randomWithSeed(initialSeed) * m--);

    // And swap it with the current element.
    t = newArray[m];
    newArray[m] = newArray[i];
    newArray[i] = t;
    ++initialSeed;
  }

  return newArray;
}