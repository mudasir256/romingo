import LoginCard from "./LoginCard";

export default {
  title: "LoginCard",
  component: LoginCard,
};

const Template = (args) => <LoginCard {...args} />;

export const Default = Template.bind({});
Default.args = {
};
Default.parameters = {
  layout: "fullscreen",
};
