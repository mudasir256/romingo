import BookingDetailCard from "./BookingDetailCard";

export default {
  title: "BookingDetailCard",
  component: BookingDetailCard,
};

const Template = (args) => <BookingDetailCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  details: {
    checkIn: "8/1/2021",
    checkOut: "8/9/2021",
    guests: {
      adults: 2,
      dogs: 1,
      children: 3,
    },
    roomType: "King Suite",
  },
};
Default.parameters = {
  layout: "fullscreen",
};
