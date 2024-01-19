import { GuiSlider, GuiText, GuiView } from '@uidu/native'

export default function SliderDocsPage() {
  return (
    <GuiView centered p="$4" gap="$3">
      <GuiText fontSize={'$5'}>
        {' '}
        If you use a Slider inside a Drawer you could disabled the swipEnapled Drawer option{' '}
      </GuiText>

      <GuiView bg="$blue5Light" p="$5" br={'$5'} zi={20000}>
        <GuiSlider size="$4" width={200} defaultValue={[50]} max={100} step={1}>
          <GuiSlider.TrackActive />

          <GuiSlider.Thumb circular index={0} />
        </GuiSlider>
      </GuiView>
    </GuiView>
  )
}
