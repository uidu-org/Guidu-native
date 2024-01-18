import { GuiAvatar, GuiText, GuiView } from '@gui/ui'

export default function AvatarDocsPage() {
  return (
    <GuiView centered p="$5" gap="$4">
      <GuiText fontSize={'$5'}>
        {' '}
        This Avatar extends the original Tamagui Avatar with all its feature{' '}
      </GuiText>
      <GuiAvatar circular size="$9">
        <GuiAvatar.Image
          src={
            'https://images.unsplash.com/photo-1537799943037-f5da89a65689?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
        <GuiAvatar.Fallback bc="$gray6Light" />
      </GuiAvatar>
    </GuiView>
  )
}
