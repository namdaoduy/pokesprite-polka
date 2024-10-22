import { createContext } from 'contexts/utils';
import { useCallback, useEffect } from 'react';
import { useForm, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PokemonData, PokemonDataMap } from 'types/pokemon';
import { SettingPresets } from 'constants/settings';

export type SettingsFormValue = {
  presetId: string;
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

export type SettingsPreset = {
  id: string;
  name: string;
  settings: Partial<SettingsFormValue>;
}

export type SettingsContextValue = {
  register: UseFormRegister<SettingsFormValue>;
  watch: UseFormWatch<SettingsFormValue>;
  reset: (newPresetId?: SettingsPreset['id']) => void;
  setValue: UseFormSetValue<SettingsFormValue>;
  pokemonData: PokemonData | undefined;
  pokemonSprite: ImageBitmap | undefined;
};

export const [useSettingsContext, SettingsContext] = createContext<SettingsContextValue>();

const getDefaultSettings = (): SettingsFormValue => ({
  presetId: SettingPresets[0].id,
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
  horizontalPadding: 0,
  verticalPadding: 0,
  enablePolka: true,
  minPokemons: 0,
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
    getValues,
  } = useForm<SettingsFormValue>({
    defaultValues: getDefaultSettings(),
  });

  const presetId = watch('presetId');

  const resetFormValue = useCallback((newPresetId?: SettingsPreset['id']) => {
    const selectedPresetId = newPresetId || getValues().presetId;
    const foundPreset = SettingPresets.find((preset) => preset.id === selectedPresetId);
    let newSettings = {
      ...getDefaultSettings(),
    };
    if (foundPreset) {
      newSettings = {
        ...getDefaultSettings(),
        ...foundPreset.settings,
      };
    }
    newSettings.presetId = selectedPresetId;
    reset(newSettings);
  }, [getValues, reset]);

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

  useEffect(() => {
    if (!presetId) {
      return;
    }
    resetFormValue(presetId);
  }, [presetId, resetFormValue]);

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
