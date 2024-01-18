import { GuiButton, GuiControlSelect, GuiText, GuiView, Select } from '@gui/ui'
import { Check } from '@tamagui/lucide-icons'
import { useForm } from 'react-hook-form'
import { FlatList } from 'react-native'

export default function SelectDocsPage() {
  const { control, getValues } = useForm({})

  return (
    <GuiView centered p={'$4'} gap={'$3'}>
      <GuiText fontSize={'$7'}>
        This is an example of a controlled select using Tamagui and React-hook-form
      </GuiText>
      <GuiText>Remember ! The Select accept children that must follow the tamagui Anatomy</GuiText>

      <GuiControlSelect
        control={control}
        label="Example"
        name="test"
        placeholder="placeholder ..."
        rules={{ required: false }}
      >
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Select.Item index={index} key={item.name} value={item.id} bbw="$0.25" bbc="black">
              <Select.ItemText style={{ fontWeight: '900', marginRight: 'auto', marginLeft: 20 }}>
                {item.name}
              </Select.ItemText>
              <Select.ItemIndicator marginLeft="auto">
                <Check size={16} />
              </Select.ItemIndicator>
            </Select.Item>
          )}
        />
      </GuiControlSelect>

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
