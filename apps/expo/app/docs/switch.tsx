import { GuiLabel, GuiSwitch, GuiText, GuiView, Separator, XStack } from '@my/ui'

export default function SwitchDocsPage() {
  return (
    <GuiView centered p="$5" gap="$5">
      <GuiText fontSize={'$5'}>
        {' '}
        To change the color customize the variants option "checked"{' '}
      </GuiText>

      <GuiView bg="$blue5Light" p="$5" br={'$5'}>
        <XStack width={200} alignItems="center" space="$4">
          <GuiLabel
            htmlFor={'1'}
            paddingRight="$0"
            minWidth={90}
            justifyContent="flex-end"
            size={'$4'}
          >
            Required
          </GuiLabel>
          <Separator minHeight={20} vertical />
          <GuiSwitch id={'1'} size={'$4'} defaultChecked={false}>
            <GuiSwitch.Thumb animation={'quick'} />
          </GuiSwitch>
        </XStack>

        <Separator minHeight={20} />

        <XStack width={200} alignItems="center" space="$4">
          <GuiLabel
            htmlFor={'2'}
            paddingRight="$0"
            minWidth={90}
            justifyContent="flex-end"
            size={'$4'}
          >
            Required
          </GuiLabel>
          <Separator minHeight={20} vertical />
          <GuiSwitch id={'2'} size={'$4'} defaultChecked>
            <GuiSwitch.Thumb animation={'bouncy'} />
          </GuiSwitch>
        </XStack>
      </GuiView>
    </GuiView>
  )
}
