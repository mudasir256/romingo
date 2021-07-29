import ListingPage from "./ListingPage";

export default {
  title: "ListingPage",
  component: ListingPage,
};

const Template = (args) => <ListingPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  cards: Array.from({ length: 4 }).fill({
    image:
      "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
    name: "Staybridge Suites Las Colinas",
    location: "1201 Executive Circle, Irving, TX",
    score: 5,
    price: 139.99,
    amenities: ["dog park nearby", "pet friendly rooftop"],
  }),
};
