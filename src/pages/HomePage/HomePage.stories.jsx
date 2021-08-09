import HomePage from "./HomePage";

export default {
  title: "HomePage",
  component: HomePage,
};

const Template = (args) => <HomePage {...args} />;

export const Default = Template.bind({});
Default.args = {
	nearCities: [
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			city: "San Francisco",
			state: "California"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/d3e668fe_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			city: "Phoenix",
			state: "Arizona"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/262404e1_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			city: "Portland",
			state: "Oregon"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			city: "Los Angeles",
			state: "California"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			city: "Seattle",
			state: "Washington"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			city: "Tucson",
			state: "Arizona"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/62ea6b9c_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			city: "San Diego",
			state: "California"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/7a2f4e7a_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			city: "Sacramento",
			state: "California"
		},
	]
};
Default.parameters = {
  layout: "fullscreen",
};