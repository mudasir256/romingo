import BookingManagePage from "./BookingManagePage";

export default {
  title: "BookingManagePage",
  component: BookingManagePage,
};

const Template = (args) => <BookingManagePage {...args} />;

export const Default = Template.bind({});


Default.args = {
  upcoming: [
    {
      image: "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
      name: "Staybridge Suites Las Colinas",
      location: "1201 Executive Circle, Irving, TX",
      checkIn: "8/1/2021",
      checkOut: "8/10/2021",
      occupants: {
        adults: 2,
        dogs: 1,
        children: 1
      },
      roomType: "King Suite",
      confirmId: "HMMWXJR4W8",
      status: "Prepaid"
    },
    {
      image: "https://exp.cdn-hotels.com/hotels/1000000/30000/22000/21919/0d3577e7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
      name: "Grand Hyatt Dfw",
      location: "2337 South International Pkwy, Dallas, TX",
      checkIn: "8/1/2021",
      checkOut: "8/10/2021",
      occupants: {
        adults: 2,
        dogs: 1,
        children: 1
      },
      roomType: "King Suite",
      confirmId: "HMMWXJR4W8",
      status: "Prepaid"
    },
  ],
  past: [
    {
      image: "https://exp.cdn-hotels.com/hotels/12000000/11270000/11265700/11265676/1f32e1ac_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
      name: "Embassy Suites Dallas - Dfw Airport North Outdoor World",
      location: "2401 Bass Pro Drive, Grapevine, TX",
      checkIn: "8/1/2021",
      checkOut: "8/10/2021",
      occupants: {
        adults: 2,
        dogs: 1,
        children: 1
      },
      roomType: "King Suite",
      confirmId: "HMMWXJR4W8",
      status: "Prepaid"
    },
    {
      image: "https://exp.cdn-hotels.com/hotels/5000000/4440000/4432300/4432250/ace8eb1e_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
      name: "Staybridge Suites Las Colinas",
      location: "101 N Doggie Dr, Irving, TX",
      checkIn: "8/1/2021",
      checkOut: "8/10/2021",
      occupants: {
        adults: 2,
        dogs: 1,
        children: 1
      },
      roomType: "King Suite",
      confirmId: "HMMWXJR4W8",
      status: "Prepaid"
    },
  ],
  cancelled: [
    {
      image: "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
      name: "Staybridge Suites Las Colinas",
      location: "1201 Executive Circle, Irving, TX",
      checkIn: "8/1/2021",
      checkOut: "8/10/2021",
      occupants: {
        adults: 2,
        dogs: 1,
        children: 1
      },
      roomType: "King Suite",
      confirmId: "HMMWXJR4W8",
      status: "Prepaid"
    },
    {
      image: "https://exp.cdn-hotels.com/hotels/1000000/30000/22000/21919/0d3577e7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
      name: "Grand Hyatt Dfw",
      location: "2337 South International Pkwy, Dallas, TX",
      checkIn: "8/1/2021",
      checkOut: "8/10/2021",
      occupants: {
        adults: 2,
        dogs: 1,
        children: 1
      },
      roomType: "King Suite",
      confirmId: "HMMWXJR4W8",
      status: "Prepaid"
    },
  ],
};

Default.parameters = {
  layout: "fullscreen",
};