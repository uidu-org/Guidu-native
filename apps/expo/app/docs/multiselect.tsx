
import { GuiButton, GuiControlMultiselect, GuiText, GuiView } from '@uidu/native';
import { useForm } from 'react-hook-form';

export default function MultiselectDocsPage() {
  const { control, getValues } = useForm({})
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
    </GuiView>
  )
}

const options = [
  { id: "1", label: "The Shawshank Redemption", value: "The Shawshank Redemption" },
  { id: "2", label: "The Godfather", value: "The Godfather" },
  { id: "3", label: "The Godfather: Part II", value: "The Godfather: Part II" },
  { id: "4", label: "The Dark Knight", value: "The Dark Knight" },
  { id: "5", label: "12 Angry Men", value: "12 Angry Men" },
  { id: "6", label: "Schindler's List", value: "Schindler's List" },
  { id: "7", label: "Pulp Fiction", value: "Pulp Fiction" },
  {
    id: "8", label: "The Lord of the Rings: The Return of the King",
    value: "The Lord of the Rings: The Return of the King",
  },
  {
    id: "9", label: "The Good, the Bad and the Ugly",
    value: "The Good, the Bad and the Ugly",
  },
  { id: "10", label: "Fight Club", value: "Fight Club" },
];

const initialItems = [
  { id: "10", label: "Fight Club", value: "Fight Club" },
]
