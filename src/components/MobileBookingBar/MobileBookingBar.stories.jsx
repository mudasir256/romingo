import MobileBookingBar from "./MobileBookingBar";

export default {
  title: "MobileBookingBar",
  component: MobileBookingBar,
};

const Template = (args) => <MobileBookingBar {...args} />;

export const Default = Template.bind({});
Default.args = {
	roomList: [
		{
			value: 0,
			description: "Room TWO DOUBLE BEDS"
		},
		{
			value: 1,
			description: "Two Double Beds - Non-refundable"
		},
		{
			value: 2,
			description: "SUITE TWO BEDROOMS"
		},
	]
};
