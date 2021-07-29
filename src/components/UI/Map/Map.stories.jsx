import Map from "./Map";

export default {
  title: "Map",
  component: Map,
};

const Template = (args) => <Map {...args} />;

export const Default = Template.bind({});
Default.args = {
  center: { lat: 32.6256, lng: -110 },
};
Default.parameters = {
  layout: "fullscreen",
};
