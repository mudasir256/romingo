import CardList from "./CardList";

export default {
  title: "CardList",
  component: CardList,
};

const Template = (args) => <CardList {...args} />;

export const Default = Template.bind({});
Default.args = {
  cards: [
    {
      image:
        "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
      name: "Staybridge Suites Las Colinas",
      location: "1201 Executive Circle, Irving, TX",
      score: 95,
      price: 139.99,
      amenities: ["dog park nearby", "pet friendly rooftop"],
    },
    {
      image:
        "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/65371/gadxgnjkq0pft4qwcgdl.jpg",
      name: "Grand Hyatt Dfw",
      location: "2337 South International Pkwy, Dallas, TX",
      score: 91,
      price: 111.99,
      amenities: ["dog friendly patio", "on-site pet sitting"],
    },
    {
      image:
        "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/1208/bnwyemonyq1dabc3zyo3.jpg",
      name: "Embassy Suites Dallas - Dfw Airport North Outdoor World",
      location: "2401 Bass Pro Drive, Grapevine, TX",
      score: 87,
      price: 159.99,
      amenities: ["off-leash run area", "doggie room service"],
    },
    {
      image:
        "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/4513/ytvnr4breb418msp2emb.jpg",
      name: "Staybridge Suites Las Colinas",
      location: "1201 Executive Circle, Irving, TX",
      score: 95,
      price: 139.99,
      amenities: ["dog park nearby", "on-site pet grooming"],
    },
  ],
};
