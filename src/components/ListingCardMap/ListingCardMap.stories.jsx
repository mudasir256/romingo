import ListingCardMap from "./ListingCardMap";

export default {
  title: "ListingCardMap",
  component: ListingCardMap,
};

const Template = (args) => <ListingCardMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  image:
    "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
  name: "Staybridge Suites Las Colinas",
  location: "1201 Executive Circle, Irving, TX",
  score: 5,
  price: 140,
  amenities: ["dog park nearby", "pet friendly rooftop"],
};
