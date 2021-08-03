import DetailsPage from "./DetailsPage";

export default {
  title: "DetailsPage",
  component: DetailsPage,
};

const Template = (args) => <DetailsPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Hotel McCoy",
  location: "720 W. Silverlake Road, Tucson, 85713, AZ",
  score: 5,
  romingoDescription: "",
  defaultDescription: "",
  mainImg:
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/11025302_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
  gallery: [
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/d3e668fe_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/262404e1_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/d73122d2_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
  ],
};
