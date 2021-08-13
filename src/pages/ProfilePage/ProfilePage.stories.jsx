import ProfilePage from "./ProfilePage";

export default {
  title: "ProfilePage",
  component: ProfilePage,
};

const Template = (args) => <ProfilePage {...args} />;

export const Default = Template.bind({});


Default.args = {
  userInfo: {
    name: "John Doe",
    email: "john@email.com",
    phone: "781-244-0115"
  }
};

Default.parameters = {
  layout: "fullscreen",
};