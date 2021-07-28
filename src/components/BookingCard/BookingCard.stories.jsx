import BookingCard from "./BookingCard";

export default {
  title: "BookingCard",
  component: BookingCard,
};

const Template = (args) => <BookingCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
