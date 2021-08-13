import RegisterCard from "./RegisterCard";

export default {
  title: "RegisterCard",
  component: RegisterCard,
};

const Template = (args) => <RegisterCard {...args} />;

export const Default = Template.bind({});
Default.args = {
};
Default.parameters = {
  layout: "fullscreen",
};
