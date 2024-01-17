import { GuiButton, GuiMultiselect, GuiText, GuiView } from '@my/ui'
import { useForm } from 'react-hook-form'

export default function MultiselectDocsPage() {
  const { control, getValues } = useForm({})
  return (
    <GuiView gap="$5" centered>
      <GuiText>This is a Basic Textarea Field</GuiText>

      <GuiMultiselect
        control={control}
        items={items}
        name="test"
        label="Fruits"
        onClick={() => {}}
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

const items = [
  {
    id: '1',
    name: 'Banana',
  },
  {
    id: '2',
    name: 'Apple',
  },
  {
    id: '3',
    name: 'Pear',
  },
  {
    id: '4',
    name: 'Watermelon',
  },
]
const initialItems = [
  {
    id: '4',
    name: 'Watermelon',
  },
]
