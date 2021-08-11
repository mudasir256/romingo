import DescriptionCard from "./DescriptionCard";

export default {
  title: "DescriptionCard",
  component: DescriptionCard,
};

const Template = (args) => {
  return <DescriptionCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	title: "Check in instruction",
	description: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei."
};
