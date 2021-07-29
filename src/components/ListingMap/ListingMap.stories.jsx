import ListingMap from "./ListingMap";

export default {
  title: "ListingMap",
  component: ListingMap,
};

const Template = (args) => <ListingMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  center: { lat: 32.22045, lng: -110.96874 },
};
