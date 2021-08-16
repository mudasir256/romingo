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
  },
  pups: [
    {
      name: "Charlie",
      gender: "male",
      birthday: "2017-04-10",
      weight: 65,
      breed: "Australian Cattle Dog Mix",
      image: "https://exp.cdn-hotels.com/hotels/1000000/30000/22000/21919/0d3577e7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium"
    },
    {
      name: "Toby",
      gender: "male",
      birthday: "2018-04-27",
      weight: 40,
      breed: "Portuguese Water Dog",
      image: "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg"
    },
  ]
};

Default.parameters = {
  layout: "fullscreen",
};