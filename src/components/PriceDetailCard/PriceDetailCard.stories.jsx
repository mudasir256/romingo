import PriceDetailCard from "./PriceDetailCard";

export default {
	title: "PriceDetailCard",
	component: PriceDetailCard,
};

const Template = (args) => <PriceDetailCard {...args} />;

export const Default = Template.bind({});
Default.args = {
	details: {
		price: 419.97,
		stateTax: 25.2,
		cityTax: 25.2,
		total: 470.37
	}
};
Default.parameters = {
  layout: "fullscreen",
};