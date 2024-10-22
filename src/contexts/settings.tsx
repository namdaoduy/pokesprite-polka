import { createContext } from 'contexts/utils';
import { useCallback } from 'react';
import { useForm, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PokemonData, PokemonDataMap } from 'types/pokemon';

export type SettingsFormValue = {
  canvasWidth: number;
  canvasHeight: number;
  spriteWidth: number;
  spriteHeight: number;
  spriteNumCol: number;
  drawWidth: number;
  drawHeight: number;
  drawNumCol: number;
  drawScale: number;
  scaleCanvas: boolean;
  horizontalPadding: number;
  verticalPadding: number;
  enablePolka: boolean;
  minPokemons: number;
  shufflePokemons: boolean;
  shufflePokemonsSeed: number;
}

export type SettingsContextValue = {
  register: UseFormRegister<SettingsFormValue>;
  watch: UseFormWatch<SettingsFormValue>;
  reset: UseFormReset<SettingsFormValue>;
  setValue: UseFormSetValue<SettingsFormValue>;
  pokemonData: PokemonData | undefined;
  pokemonSprite: ImageBitmap | undefined;
};

export const [useSettingsContext, SettingsContext] = createContext<SettingsContextValue>();

// canvasWidth: 900,
// canvasHeight: 400,
// spriteWidth: 40,
// spriteHeight: 30,
// spriteNumCol: 10,
// drawWidth: 45,
// drawHeight: 36,
// drawNumCol: 20,
// drawScale: 1,
// enablePolka: true,
// minPokemons: 215,
// shufflePokemons: false,
// shufflePokemonsSeed: 0,

// canvasWidth: 900,
// canvasHeight: 400,
// spriteWidth: 40,
// spriteHeight: 30,
// spriteNumCol: 10,
// drawWidth: 45,
// drawHeight: 30,
// drawNumCol: 20,
// drawScale: 1,
// horizontalPadding: 0,
// verticalPadding: 0,
// enablePolka: true,
// minPokemons: 254,
// shufflePokemons: false,
// shufflePokemonsSeed: 0,

const getDefaultSettings = (): SettingsFormValue => ({
  canvasWidth: 900,
  canvasHeight: 400,
  drawScale: 1,
  scaleCanvas: true,
  drawWidth: 49,
  drawHeight: 29,
  drawNumCol: 18,
  spriteWidth: 40,
  spriteHeight: 30,
  spriteNumCol: 10,
  horizontalPadding: 8,
  verticalPadding: 9,
  enablePolka: true,
  minPokemons: 228,
  shufflePokemons: false,
  shufflePokemonsSeed: 0,
}); 

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    register,
    watch,
    reset,
    setValue,
  } = useForm<SettingsFormValue>({
    defaultValues: getDefaultSettings(),
  });

  const resetFormValue = useCallback((...params: Parameters<UseFormReset<SettingsFormValue>>) => {
    if (params.length === 0) {
      reset(getDefaultSettings());
    }
  }, [reset]);

  const { data: pokemonData } = useQuery({
    queryKey: ['pokemon'],
    queryFn: async () => {
      try {
        const res = await axios<PokemonDataMap>({
          url: '/json/pokemon.json'
        });
        const pokemonList = Object.keys(res.data).sort((a, b) => parseInt(a) - parseInt(b)).map((key) => res.data[key]);
        const gen1PokemonList = pokemonList.slice(0, 151);
        const gen1PokemonMap = gen1PokemonList.reduce<PokemonDataMap>((acc, cur) => {
          acc[cur.idx] = cur;
          return acc;
        }, {});
        const pokemonData: PokemonData = {
          map: gen1PokemonMap,
          list: gen1PokemonList,
        };
        return pokemonData;
      } catch (err) {
        console.error({err})
      }
    },
  });

  const { data: pokemonSprite } = useQuery({
    queryKey: ['sprite'],
    queryFn: async () => {
      try {
        const res = await axios<Blob>({
          method: 'post',
          url: '/sprites/gen-1.png',
          responseType: 'blob',
        });
        const imageBitmap = await createImageBitmap(res.data);
        return imageBitmap;
      } catch (err) {
        console.error({err})
      }
    },
  });

  const contextValue = {
    register,
    watch,
    reset: resetFormValue,
    setValue,
    pokemonData,
    pokemonSprite,
  };

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};
