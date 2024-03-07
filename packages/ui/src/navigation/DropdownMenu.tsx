import { ChevronDown } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { AccordionItemProps, Square } from "tamagui";
import { GuiText, GuiView } from "../base";
import { CustomAccordion } from "../base/Accordion";
import { Route } from "../types/route";

type RouteProps = Omit<AccordionItemProps, "value"> & {
  route: Route;
}

export const GuiDropdownMenu: React.FC<RouteProps> = ({ route, ...rest }) => {

  if (route.path && route.action) {
    throw new Error('Both path and action cannot exist together');
  }

  const handlePress = useCallback(() => {
    if (route.path) {
      router.push(route.path);
    } else if (route.action) {
      route.action();
    }
  }, [router, route]);


  if (route.subRoutes && route.subRoutes.length > 0) {
    return (
      <>
        <CustomAccordion.Item value={route.key}>

          <CustomAccordion.Trigger flexDirection="row" justifyContent="space-between" p={8} >
            {({ open = true }) => (
              <>
                <GuiView flexDirection="row" alignItems="center" gap="$3">
                  {route?.icon && route.icon}
                  <GuiText style={{
                    fontWeight: "600",
                    fontSize: 16,
                  }} >
                    {route.title}
                  </GuiText>
                </GuiView>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </CustomAccordion.Trigger>
          <CustomAccordion.Content borderLeftWidth={1} borderColor={"black"} marginLeft={10} marginVertical={5} p={4} {...rest}>
            {route.subRoutes.map(subRoute => (
              <GuiDropdownMenu key={subRoute.key} route={subRoute} />
            ))}
          </CustomAccordion.Content>
        </CustomAccordion.Item>
      </>
    );
  } else {
    return (
      <TouchableOpacity onPress={handlePress}>
        <GuiView flexDirection="row" alignItems="center" gap="$3" paddingLeft={18} >
          <GuiView>
            {route?.icon && route.icon}
          </GuiView>

          <GuiText style={{
            fontWeight: "600",
            fontSize: 16,
            paddingVertical: 8,
          }} >
            {route.title}
          </GuiText>

        </GuiView>
      </TouchableOpacity>
    )

  }
};