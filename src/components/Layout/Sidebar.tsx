import { Button  } from '@headlessui/react'
import NumberInput from 'components/Form/NumberInput';
import SelectInput from 'components/Form/SelectInput';
import ToggleInput from 'components/Form/ToggleInput';
import { SettingPresets } from 'constants/settings';
import { useSettingsContext } from 'contexts/settings'

export default function Sidebar() {
  const { register, reset, watch, setValue } = useSettingsContext();

  const shufflePokemons = watch('shufflePokemons');

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-slate-800 w-[360px] overflow-hidden shrink-0">
      <div className="px-4 py-6 overflow-auto">
        <div className="grid grid-cols-12 gap-6">
          <SelectInput fieldName="presetId" watch={watch} setValue={setValue} colspan={12} options={SettingPresets} />
          <NumberInput fieldName="canvasWidth" register={register} colspan={6} />
          <NumberInput fieldName="canvasHeight" register={register} colspan={6} />
          <NumberInput fieldName="drawWidth" register={register} colspan={6} />
          <NumberInput fieldName="drawHeight" register={register} colspan={6} />
          <NumberInput fieldName="drawScale" register={register} colspan={6} />
          <ToggleInput fieldName="scaleCanvas" watch={watch} setValue={setValue} colspan={6} />
          <ToggleInput fieldName="enablePolka" watch={watch} setValue={setValue} colspan={12} />
          <NumberInput fieldName="minPokemons" register={register} colspan={12} />
          <NumberInput fieldName="horizontalPadding" register={register} colspan={6} />
          <NumberInput fieldName="verticalPadding" register={register} colspan={6} />
          <ToggleInput fieldName="shufflePokemons" watch={watch} setValue={setValue} colspan={6} />
          {shufflePokemons && <NumberInput fieldName="shufflePokemonsSeed" register={register} colspan={6} />}
        </div>
      </div>

      <div className="sticky px-4 py-6 inset-x-0 bottom-0 border-t border-slate-700 bg-slate-800">
        <Button
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          onClick={() => reset()}
        >
          Reset settings
        </Button>
      </div>
    </div>
  )
}