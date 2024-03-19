import { Controller, FieldValues } from "react-hook-form";

import { GuiDatePicker } from "./DatePicker";

export interface DatepickerRhfProps extends FieldValues {
  defaultDates?: Date[];
  titleDialog?: string
}

export function GuiDatepickerRhf({
  name,
  control,
  defaultDates,
  titleDialog,
  valueProps
}: DatepickerRhfProps) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <GuiDatePicker
            titleDialog={titleDialog}
            defaultDates={defaultDates}
            onChange={onChange}
          />
        )}
      />
    </>
  );
}
