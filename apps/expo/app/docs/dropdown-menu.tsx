import { Calendar, Check, Home } from "@tamagui/lucide-icons";
import { Accordion, GuiDropdownMenu, GuiView, type Route } from "@uidu/native";

export default function DropdownMenuDocsPage() {
  const routes: Route[] = [
    {
      key: "1",
      title: "Route 1",
      keywords: "route 1",
      defaultOpen: true,
      icon: <Home />,
      path: "/route1",
      subRoutes: [
        {
          key: "1-1",
          title: "Subroute 1-1",
          keywords: "subroute 1-1",
          defaultOpen: true,
          path: "/route1/subroute1",
          icon: <Calendar />,
          subRoutes: [
            {
              key: "1-1-1",
              title: "Sub-subroute 1-1-1",
              keywords: "sub-subroute 1-1-1",
              defaultOpen: true,
              path: "/route1/subroute1/subsubroute1"
            }
          ]
        },
        {
          key: "1-2",
          title: "Subroute 1-2",
          keywords: "subroute 1-2",
          defaultOpen: true,
          path: "/route1/subroute2",
          icon: <Check />
        },
        {
          key: "1-3",
          title: "Subroute 1-2",
          keywords: "subroute 1-2",
          defaultOpen: true,
          path: "/route1/subroute2"
        }
      ]
    },
    {
      key: "2",
      title: "Route 2",
      keywords: "route 2",
      defaultOpen: true,
      path: "/route2"
    }
  ];

  return (
    <GuiView p="$3">
      <Accordion style={{
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        borderRadius: 7
      }} type="multiple">
        {routes.map(route => (
          <GuiDropdownMenu key={route.key} route={route} />
        ))}
      </Accordion>

    </GuiView>
  );
}