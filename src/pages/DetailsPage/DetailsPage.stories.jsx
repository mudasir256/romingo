import DetailsPage from "./DetailsPage";

export default {
  title: "DetailsPage",
  component: DetailsPage,
};

const Template = (args) => <DetailsPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  mainImg:
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/11025302_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
};
