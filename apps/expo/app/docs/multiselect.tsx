import { GAutocompleteRhf, GuiButton, GuiControlMultiselect, GuiSheet, GuiText, GuiView } from '@uidu/native'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function MultiselectDocsPage() {
  const { control, getValues } = useForm({})
  const [open, setOpen] = useState(false)
  return (
    <GuiView gap="$5" centered>
      <GuiText>This is a Basic Textarea Field</GuiText>

      <GuiControlMultiselect
        control={control}
        options={options}
        name="test"
        label="Fruits"
        onClick={() => { }}
        initialItems={initialItems}
        rules={{ required: false }}
      />

      <GuiView>
        <GuiButton
          onPress={() => {
            console.log(getValues())
          }}
        >
          Press to see your bag (in logs)
        </GuiButton>
      </GuiView>

      <GuiButton onPress={() => setOpen(true)} >Open</GuiButton>
      <GuiSheet setStatus={setOpen} status={open} snapPoints={[80]} >
        <GAutocompleteRhf name='taskStatus' options={optionsExample} label="Status" control={control} placeholderSearch="Seleziona Status" rules={{ required: false }} />
      </GuiSheet>

    </GuiView>
  )
}

const options = [
  { id: '1', label: 'The Shawshank Redemption', value: 'The Shawshank Redemption' },
  { id: '2', label: 'The Godfather', value: 'The Godfather' },
  { id: '3', label: 'The Godfather: Part II', value: 'The Godfather: Part II' },
  { id: '4', label: 'The Dark Knight', value: 'The Dark Knight' },
  { id: '5', label: '12 Angry Men', value: '12 Angry Men' },
  { id: '6', label: "Schindler's List", value: "Schindler's List" },
  { id: '7', label: 'Pulp Fiction', value: 'Pulp Fiction' },
  {
    id: '8',
    label: 'The Lord of the Rings: The Return of the King',
    value: 'The Lord of the Rings: The Return of the King',
  },
  {
    id: '9',
    label: 'The Good, the Bad and the Ugly',
    value: 'The Good, the Bad and the Ugly',
  },
  { id: '10', label: 'Fight Club', value: 'Fight Club' },
]

const initialItems = [{ id: '10', label: 'Fight Club', value: 'Fight Club' }]
export const optionsExample = [
  { label: 'Apple' },
  { label: 'Pear' },
  { label: 'Blackberry' },
  { label: 'Peach' },
  { label: 'Apricot' },
  { label: 'Melon' },
  { label: 'Honeydew' },
  { label: 'Starfruit' },
  { label: 'Blueberry' },
  { label: 'Rasberry' },
  { label: 'Strawberry' },
  { label: 'Mango' },
  { label: 'Pineapple' },
  { label: 'Lime' },
  { label: 'Lemon' },
  { label: 'Coconut' },
  { label: 'Guava' },
  { label: 'Papaya' },
  { label: 'Orange' },
  { label: 'Grape' },
  { label: 'Jackfruit' },
  { label: 'Durian' }
].map(i => ({
  value: i.label,
  label: i.label
}))