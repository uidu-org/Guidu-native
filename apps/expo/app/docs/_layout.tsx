import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

export default function DocsLayout() {
  const navigation = useNavigation();
  return (
    <Drawer
      screenOptions={({}) => ({
        headerTitle: 'Docs',
        // headerLeft: () => <Menu size={"$3"} onPress={() => {
        //   navigation.dispatch(DrawerActions.openDrawer()); console.log("pressed");
        // }} />
      })}
    >
      <Drawer.Screen
        name="slider"
        options={
          {
            // swipeEnabled: false,
          }
        }
      />
    </Drawer>
  );
}
