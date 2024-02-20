import { ChevronDown } from "@tamagui/lucide-icons";
import { Square } from "tamagui";
import { GuiText, GuiView } from "../base";
import { CustomAccordion } from "../base/Accordion";
import { Route } from "../types/route";

interface RouteProps {
  route: Route;
}

export const GuiDropdownMenu: React.FC<RouteProps> = ({ route }) => {

  if (route.subRoutes && route.subRoutes.length > 0) {
    return (
      <>
        <CustomAccordion.Item value={route.key}>

          <CustomAccordion.Trigger flexDirection="row" justifyContent="space-between">
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
          <CustomAccordion.Content borderLeftWidth={2} borderColor={"black"} marginLeft={10} marginVertical={5} padding={2}>
            {route.subRoutes.map(subRoute => (
              <GuiDropdownMenu key={subRoute.key} route={subRoute} />
            ))}
          </CustomAccordion.Content>
        </CustomAccordion.Item>
      </>
    );
  } else {
    return (
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
    )

  }
};