import { SettingsPreset } from "contexts/settings";

export const SettingPresets: SettingsPreset[] = [
  {
    id: '1',
    name: '90x40 gen1 dense padding (default)',
    settings: {
      canvasWidth: 900,
      canvasHeight: 400,
      drawWidth: 49,
      drawHeight: 29,
      drawNumCol: 18,
      horizontalPadding: 8,
      verticalPadding: 9,
      minPokemons: 228,
    },
  },
  {
    id: '2',
    name: '90x40 gen1 dense',
    settings: {
      canvasWidth: 900,
      canvasHeight: 400,
      drawWidth: 45,
      drawHeight: 30,
      drawNumCol: 20,
      minPokemons: 254,
    },
  },
  {
    id: '3',
    name: '90x40 gen1 fit',
    settings: {
      canvasWidth: 900,
      canvasHeight: 400,
      drawWidth: 45,
      drawHeight: 36,
      drawNumCol: 20,
      minPokemons: 215,
    },
  },
]