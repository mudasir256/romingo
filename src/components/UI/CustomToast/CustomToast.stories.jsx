import CustomToast from "./CustomToast";

export default {
  title: "CustomToast",
  component: CustomToast,
};

const Template = (args) => <CustomToast {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: true,
  message: "Something went wrong, please refresh the page and try again",
  type: "error"
};
