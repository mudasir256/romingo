import BookingManageCard from "./BookingManageCard";

export default {
  title: "BookingManageCard",
  component: BookingManageCard,
};

const Template = (args) => <BookingManageCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  image:
    "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
  name: "Staybridge Suites Las Colinas",
  location: "1201 Executive Circle, Irving, TX",
  checkIn: "8/1/2021",
  checkOut: "8/10/2021",
  occupants: {
    adults: 2,
    dogs: 1,
    children: 1
  },
  roomType: "King Suite",
  confirmId: "HMMWXJR4W8",
  status: "Prepaid"
};
