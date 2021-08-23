import ErrorPage from "./ErrorPage";

export default {
  title: "ErrorPage",
  component: ErrorPage,
};

const Template = (args) => <ErrorPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  layout: "fullscreen",
};