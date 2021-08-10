import HeaderBar from "./HeaderBar";

export default {
  title: "HeaderBar",
  component: HeaderBar,
};

const Template = (args) => <HeaderBar {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  layout: "fullscreen",
};