// import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form'
// import { PinCode, PinCodeProps } from './pin-code'

// export function RHFPinCode({
//   name,
//   control,
//   rules,
//   ...rest
// }: PinCodeProps & {
//   name: string
//   control: Control
//   rules: Omit<
//     RegisterOptions<FieldValues, string>,
//     'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
//   >
// }) {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field: { name, onChange, ref, value, disabled, onBlur } }) => (
//         <PinCode
//           id={name}
//           setValue={(v) => onChange([...value, v])}
//           // ref={ref}
//           // value={value}
//           disabled={disabled}
//           onBlur={onBlur}
//           {...rest}
//         />
//       )}
//     />
//   )
// }
