import ListingCard from "./ListingCard";

export default {
  title: "ListingCard",
  component: ListingCard,
};

const Template = (args) => <ListingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageURLs: [
    "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
  ],
  name: "Staybridge Suites Las Colinas",
  neighborhood: "Irving, TX",
  addressLine1: "1201 Executive Circle",
  city: { name: "Irving, TX" },
  romingoScore: 5,
  lowestAveragePrice: 139.99,
  amenities: ["dog park nearby", "pet friendly rooftop"],
};
