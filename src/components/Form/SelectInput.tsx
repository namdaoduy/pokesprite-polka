import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label  } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export default function SelectInput<T extends FieldValues>({
  colspan,
  fieldName,
  watch,
  options,
  setValue,
}: {
  colspan?: number;
  fieldName: Path<T>;
  watch: UseFormWatch<T>;
  options: {
    id: string;
    name: string;
  }[],
  setValue: UseFormSetValue<T>;
}) {
  const [query, setQuery] = useState('');

  const selectedId = watch(fieldName);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.id === selectedId);
  }, [options, selectedId]);

  const filteredOptions = useMemo(() => {
    if (query === '') {
      return options;
    }
    return options.filter((option) => {
      return option.name.toLowerCase().includes(query.toLowerCase())
    });
  }, [options, query]);
    

  return (
    <Field
      key={fieldName}
      className={clsx(colspan && `col-span-${colspan}`)}
    >
      <Label className="text-sm/6 font-medium text-white">{fieldName}</Label>
      <Combobox
        value={selectedOption?.id}
        onChange={(newId: string) => setValue(fieldName, newId as PathValue<T, Path<T>>)}
        onClose={() => setQuery('')}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            displayValue={(id: string) => {
              return options.find((option) => option.id === id)?.name || '';
            }}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>
        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-white/5 bg-slate-700 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {filteredOptions.map((option) => (
            <ComboboxOption
              key={option.id}
              value={option.id}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{option.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  )
}