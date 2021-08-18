import CheckoutPage from "./CheckoutPage";

export default {
  title: "CheckoutPage",
  component: CheckoutPage,
};

const Template = (args) => <CheckoutPage {...args} />;

export const Default = Template.bind({});

Default.args = {
  hotel: {
    image:
      "http://vcmp-hotels.cert.sabre.com/image/upload/f_auto,q_auto:best,t_vcmp_medium/hotel/i/48961/kaoe46zlotylxgsevuxe.jpg",
    name: "Staybridge Suites Las Colinas",
    location: "1201 Executive Circle, Irving, TX",
    score: 5,
    price: 139.99,
    amenities: ["dog park nearby", "pet friendly rooftop"],
  },
  bookingDetails: {
    checkIn: "8/1/2021",
    checkOut: "8/9/2021",
    guests: {
      adults: 2,
      dogs: 1,
      children: 3,
    },
    roomType: "King Suite",
  },
  priceDetails: {
    price: 419.97,
    stateTax: 25.2,
    cityTax: 25.2,
    total: 470.37,
  },
  checkinDescription: {
    title: "Check in Instruction",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei.",
  },
  finePrint: {
    title: "Fine Print",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque mentitum moderatius cu. Sit munere facilis accusam eu dicat falli consulatu at vis. Te facilisis mnesarchum qui posse omnium mediocritatem est cu. Modus argumentum ne qui tation efficiendi in eos. Ei mea falli legere efficiantur et tollit aliquip debitis mei.",
  },
};

Default.parameters = {
  layout: "fullscreen",
};
