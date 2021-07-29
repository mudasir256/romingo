import { useState } from "react";
import OccupantSelector from "./OccupantSelector";

export default {
  title: "OccupantSelector",
  component: OccupantSelector,
};

const Template = (args) => {
  const [value, setValue] = useState({ adults: 2, children: 0, dogs: 0 });
  return <OccupantSelector {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};
