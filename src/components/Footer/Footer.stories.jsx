import Footer from "./Footer";

export default {
	title: "Footer",
	component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
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
