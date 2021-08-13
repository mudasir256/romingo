import ResetPassword from "./ResetPassword";

export default {
  title: "ResetPassword",
  component: ResetPassword,
};

const Template = (args) => <ResetPassword {...args} />;

export const Default = Template.bind({});
Default.args = {
};
Default.parameters = {
  layout: "fullscreen",
};
