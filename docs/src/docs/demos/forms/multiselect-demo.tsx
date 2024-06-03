import { Multiselect } from "@uidu/forms-ui";

export const MultiselectDemo = () => {
  const options = [
    {
      id: "1a",
      label: "apple",
      value: "apple",
    },
    {
      id: "2a",
      label: "cherry",
      value: "cherry",
    },
    {
      id: "3a",
      label: "orange",
      value: "orange",
    },
  ];
  const items = [
    {
      id: "1a",
      label: "apple",
      value: "apple",
    },
    {
      id: "2a",
      label: "cherry",
      value: "cherry",
    },
    {
      id: "3a",
      label: "orange",
      value: "orange",
    },
  ];

  return <Multiselect options={options} initialItems={items} />;
};
