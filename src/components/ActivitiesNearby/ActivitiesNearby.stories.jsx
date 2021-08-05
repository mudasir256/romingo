import ActivitiesNearby from "./ActivitiesNearby";

export default {
  title: "ActivitiesNearby",
  component: ActivitiesNearby,
};

const Template = (args) => <ActivitiesNearby {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "Dog-Friendly Activities Nearby",
	nearby: [
    { text: "Lorem ipsum dolor sit amet accomodare his consul", distance: 0.2 },
    { text: "Accomodare his consul", distance: 0.37 },
    { text: "Lorem ipsum dolor sit", distance: 0.75 },
    { text: "Accomodare his consul nesarchum qui posse", distance: 1.2 },
    { text: "Ei mea falli legere efficiantur", distance: 2.1 },
  ]
};
