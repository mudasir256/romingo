import RomingoScore from "./RomingoScore";

export default {
  title: "RomingoScore",
  component: RomingoScore,
};

const Template = (args) => <RomingoScore {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 5,
};

export const Small = Template.bind({});
Small.args = {
  score: 5,
  sm: true,
};
