export type Pokemon = {
  idx: string;
  name: {
    eng: string;
  };
  slug: {
    eng: string;
  };
}

export type PokemonDataList = Pokemon[];

export type PokemonDataMap = {
  [idx: string]: Pokemon;
}

export type PokemonData = {
  list: PokemonDataList;
  map: PokemonDataMap;
}