import { GuiButton, GuiCard, GuiText, GuiView, H2, Image, Paragraph, XStack } from '@uidu/native'

export default function CardDocsPage() {
  return (
    <GuiView centered p="$5" gap="$5">
      <GuiText fontSize={'$5'}>
        {' '}
        This Card extends the original Tamagui Card with all its feature{' '}
      </GuiText>
      <GuiCard
        elevate
        size="$4"
        bordered
        p="$1"
        animation="bouncy"
        width={250}
        height={300}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
      >
        <GuiCard.Header padded>
          <H2>Ticket</H2>
          <Paragraph theme="alt2">Ticket Card</Paragraph>
        </GuiCard.Header>
        <GuiCard.Footer padded>
          <XStack flex={1} />
          <GuiButton borderRadius="$10">Purchase</GuiButton>
        </GuiCard.Footer>
        <GuiCard.Background>
          <Image
            resizeMode="cover"
            alignSelf="center"
            source={{
              width: 300,
              height: 300,
              uri: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
        </GuiCard.Background>
      </GuiCard>
    </GuiView>
  )
}
