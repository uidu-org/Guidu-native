import { Drawer } from 'expo-router/drawer'

export default function DocsLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="slider"
        options={{
          swipeEnabled: false,
        }}
      />
    </Drawer>
  )
}
