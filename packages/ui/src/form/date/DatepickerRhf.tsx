import { Controller, FieldValues } from "react-hook-form";

import { GuiDatePicker } from "./DatePicker";

export interface DatepickerRhfProps extends FieldValues {
  selectedDate?: Date[];
}

export function GuiDatepickerRhf({
  name,
  control,
  selectedDate,
  valueProps
}: DatepickerRhfProps) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <GuiDatePicker
            selectedDate={selectedDate}
            onChange={onChange}
          />
        )}
      />
    </>
  );
}
