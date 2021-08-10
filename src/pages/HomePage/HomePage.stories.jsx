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
	],
	featureHotels: [
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			name: "Hotel 1",
			description: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			name: "Hotel 2",
			description: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata"
		},
		{
			img: "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
			name: "Hotel 3",
			description: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata"
		}
	],
	footerMenus: {
		about: [
			{
				text: "How Romingo Works",
				link: "#"
			},
			{
				text: "Newsroom",
				link: "#"
			},
			{
				text: "Romingo 2021",
				link: "#"
			},
			{
				text: "Investors",
				link: "#"
			},
			{
				text: "Romingo Plus",
				link: "#"
			},
		],
		contact: [
			{
				text: "Contact Us",
				link: "#"
			},
			{
				text: "Schedule a Meeting",
				link: "#"
			},
			{
				text: "Romingo 2021",
				link: "#"
			},
			{
				text: "Investors",
				link: "#"
			},
			{
				text: "Romingo Plus",
				link: "#"
			},
		],
		blog: [
			{
				text: "Overview",
				link: "#"
			},
			{
				text: "Romingo Blog",
				link: "#"
			},
			{
				text: "Romingo 2021",
				link: "#"
			},
		],
		sitemap: [
			{
				text: "How Romingo Works",
				link: "#"
			},
			{
				text: "Newsroom",
				link: "#"
			},
			{
				text: "Romingo 2021",
				link: "#"
			},
			{
				text: "Investors",
				link: "#"
			},
			{
				text: "Romingo Plus",
				link: "#"
			},
		]
	}
};
Default.parameters = {
	layout: "fullscreen",
};