import AmenitiesCard from "./AmenitiesCard";

export default {
  title: "AmenitiesCard",
  component: AmenitiesCard,
};

const Template = (args) => <AmenitiesCard {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "Amenities",
	amenities: [
		{
			Code: 101,
			Description: "Gym, pool, and spa",
			Value: "",
		},
		{
			Code: 102,
			Description: "Lorem Ipsum",
			Value: "",
		},
		{
			Code: 104,
			Description: "Dolor sit amet et delectus",
			Value: "",
		},
		{
			Code: 107,
			Description: "Accomodare his consul",
			Value: "",
		},
		{
			Code: 108,
			Description: "Brute copiosae hendrerit",
			Value: "",
		},
		{
			Code: 104,
			Description: "Dolor sit amet et delectus",
			Value: "",
		},
		{
			Code: 107,
			Description: "Accomodare his consul",
			Value: "",
		},
		{
			Code: 108,
			Description: "Brute copiosae hendrerit",
			Value: "",
		},
	],
	rowNumber: 6
};
