import { Field, Input, Label  } from '@headlessui/react'
import clsx from 'clsx';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export default function NumberInput<T extends FieldValues>({
  colspan,
  fieldName,
  register,
}: {
  colspan?: number;
  fieldName: Path<T>;
  register: UseFormRegister<T>;
}) {
  return (
    <Field
      key={fieldName}
      className={clsx(colspan && `col-span-${colspan}`)}
    >
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
  )
}