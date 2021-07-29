import Loader from "./Loader";

export default {
  title: "Loader",
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: "100px",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "200px",
};

export const Large = Template.bind({});
Large.args = {
  size: "400px",
};
