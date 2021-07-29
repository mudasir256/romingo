import { useState } from "react";
import NumberInput from "./NumberInput";

export default {
  title: "NumberInput",
  component: NumberInput,
};

const Template = (args) => {
  const [value, setValue] = useState(0);
  return <NumberInput {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};
