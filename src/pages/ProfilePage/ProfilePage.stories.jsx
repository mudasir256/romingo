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
    phone: "781-244-0115",
  },
  pups: [
    {
      name: "Charlie",
      gender: "male",
      birthday: "2017-04-10",
      weight: 65,
      breed: "Australian Cattle Dog Mix",
      image:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44857452/6/?bust=1593806344&width=720",
    },
    {
      name: "Toby",
      gender: "male",
      birthday: "2018-04-27",
      weight: 40,
      breed: "Portuguese Water Dog",
      image:
        "https://2.bp.blogspot.com/-dy0Wd9pcYZI/U_IU-rTYHFI/AAAAAAAACtA/jLBsh8jlKMQ/s1600/Portuguese_Water_Dog.jpg",
    },
  ],
};

Default.parameters = {
  layout: "fullscreen",
};
