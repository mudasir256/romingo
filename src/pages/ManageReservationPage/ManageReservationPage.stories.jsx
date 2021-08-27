import ManageReservationPage from "./ManageReservationPage";

export default {
  title: "ManageReservationPage",
  component: ManageReservationPage,
};

const Template = (args) => <ManageReservationPage {...args} />;

export const Default = Template.bind({});


Default.args = {
  booking: {
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
  faq: [
    {
      question: "Can I make reservation modification online?",
      answer: "No. For any modification, please contact us by email to Support@romingo.com."
    },
    {
      question: "Can I cancel a reservation online?",
      answer: "Yes, you can cancel your reservation online under reservation details. You will need the email used at the time of booking and your Itinerary number. Please review your cancellation policy on your confirmation email before canceling your reservation."
    },
    {
      question: "Can I cancel nonrefundable reservation?",
      answer: "No, nonrefundable reservations cannot be canceled after booking."
    }
  ]
};

Default.parameters = {
  layout: "fullscreen",
};