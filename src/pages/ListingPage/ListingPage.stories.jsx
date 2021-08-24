import ListingPage from "./ListingPage";

export default {
  title: "ListingPage",
  component: ListingPage,
};

const Template = (args) => <ListingPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  cards: [
    {
      image:
        "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
      name: "Staybridge Suites Las Colinas",
      location: "1201 Executive Circle, Irving, TX",
      score: 5,
      price: 139.99,
      amenities: ["dog park nearby", "pet friendly rooftop"],
      mapLocation: {
        lat: 32.22045,
        lng: -110.96874
      }
    },
    {
      image:
        "https://exp.cdn-hotels.com/hotels/1000000/30000/22000/21919/0d3577e7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
      name: "Grand Hyatt Dfw",
      location: "2337 South International Pkwy, Dallas, TX",
      score: 3,
      cancellation: false,
      price: 112,
      amenities: ["dog friendly patio", "on-site pet sitting"],
      mapLocation: {
        lat: 42.22045,
        lng: -110.96874
      }
    },
    {
      image:
        "https://exp.cdn-hotels.com/hotels/12000000/11270000/11265700/11265676/1f32e1ac_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
      name: "Embassy Suites Dallas - Dfw Airport North Outdoor World",
      location: "2401 Bass Pro Drive, Grapevine, TX",
      score: 2,
      cancellation: true,
      price: 160,
      amenities: ["off-leash run area", "doggie room service"],
      mapLocation: {
        lat: 42.22045,
        lng: -120.96874
      }
    },
    {
      image:
        "https://exp.cdn-hotels.com/hotels/5000000/4440000/4432300/4432250/ace8eb1e_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
      name: "Staybridge Suites Las Colinas",
      location: "101 N Doggie Dr, Irving, TX",
      score: 4,
      cancellation: false,
      price: 140,
      amenities: ["dog park nearby", "on-site pet grooming"],
      mapLocation: {
        lat: 32.22045,
        lng: -110.26874
      }
    },
    {
      image:
        "https://exp.cdn-hotels.com/hotels/2000000/1780000/1777700/1777624/f0c95b52_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
      name: "Dogdays Suites",
      location: "1211 Executive Circle, Irving, TX",
      score: 4,
      cancellation: false,
      price: 140,
      amenities: ["dog friendly pool area", "on-site petsitting"],
      mapLocation: {
        lat: 33.22045,
        lng: -110.96874
      }
    },
  ],
};

Default.parameters = {
  layout: "fullscreen",
};
