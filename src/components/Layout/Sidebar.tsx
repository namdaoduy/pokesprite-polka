import { Button, Field, Input, Label, Switch  } from '@headlessui/react'
import clsx from 'clsx';
import { useSettingsContext } from 'contexts/settings'

export default function Sidebar() {
  const { register, reset, watch, setValue } = useSettingsContext();

  const enablePolka = watch('enablePolka');
  const shufflePokemons = watch('shufflePokemons');
  const scaleCanvas = watch('scaleCanvas');

  const renderNumberInput = ({ fieldName, colspan = 12 }: { colspan?: number; fieldName: Parameters<typeof register>[0] }) => {
    return (
      <div
        className={`w-full col-span-${colspan}`}
        key={fieldName}
      >
        <Field>
          <Label className="text-sm/6 font-medium text-white">{fieldName}</Label>
          <Input
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            type="number"
            {...register(fieldName, { valueAsNumber: true })}
          />
        </Field>
      </div>
    )
  }

  const renderToggleInput = ({
    fieldName,
    colspan = 12,
    checked,
    setChecked,
  }: {
    fieldName: Parameters<typeof register>[0];
    colspan?: number;
    checked: boolean;
    setChecked: (checked: boolean) => void;
  }) => {
    return (
      <div
        className={`w-full col-span-${colspan}`}
        key={fieldName}
      >
        <Field>
          <Label className="text-sm/6 font-medium text-white">{fieldName}</Label>
          <Switch
            checked={checked}
            onChange={(checked) => {
              setChecked(checked);
            }}
            className="mt-3 group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
            />
          </Switch>
        </Field>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-slate-800 w-[360px] overflow-hidden shrink-0">
      <div className="px-4 py-6 overflow-auto">
        <div className="grid grid-cols-12 gap-6">
          {renderNumberInput({ fieldName: 'canvasWidth', colspan: 6 })}
          {renderNumberInput({ fieldName: 'canvasHeight', colspan: 6 })}
          {renderNumberInput({ fieldName: 'drawWidth', colspan: 6 })}
          {renderNumberInput({ fieldName: 'drawHeight', colspan: 6 })}
          {renderNumberInput({ fieldName: 'drawScale', colspan: 6 })}
          {renderToggleInput({
            fieldName: 'scaleCanvas',
            colspan: 6,
            checked: scaleCanvas,
            setChecked: (checked) => setValue('scaleCanvas', checked),
          })}
          {renderNumberInput({ fieldName: 'drawNumCol' })}
          {renderToggleInput({
            fieldName: 'enablePolka',
            checked: enablePolka,
            setChecked: (checked) => {
              setValue('enablePolka', checked)
            },
          })}
          {renderNumberInput({ fieldName: 'minPokemons' })}
          {renderNumberInput({ fieldName: 'horizontalPadding', colspan: 6 })}
          {renderNumberInput({ fieldName: 'verticalPadding', colspan: 6 })}
          {renderToggleInput({
            fieldName: 'shufflePokemons',
            colspan: 6,
            checked: shufflePokemons,
            setChecked: (checked) => setValue('shufflePokemons', checked),
          })}
          {shufflePokemons && renderNumberInput({ fieldName: 'shufflePokemonsSeed', colspan: 6 })}
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