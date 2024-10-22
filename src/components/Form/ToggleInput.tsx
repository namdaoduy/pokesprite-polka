import { Field, Label, Switch  } from '@headlessui/react'
import clsx from 'clsx';
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form';

export default function ToggleInput<T extends FieldValues>({
  colspan,
  fieldName,
  watch,
  setValue,
}: {
  colspan?: number;
  fieldName: Path<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}) {
  const checked = watch(fieldName);

  return (
    <Field
      key={fieldName}
      className={clsx(colspan && `col-span-${colspan}`)}
    >
      <Label className="text-sm/6 font-medium text-white">{fieldName}</Label>
      <Switch
        checked={checked}
        onChange={(newValue) => {
          setValue(fieldName, newValue as PathValue<T, Path<T>>);
        }}
        className="mt-3 group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
        />
      </Switch>
    </Field>
  )
}