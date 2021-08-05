import DetailsPage from "./DetailsPage";
import SimpleReactLightbox from "simple-react-lightbox";

export default {
  title: "DetailsPage",
  component: DetailsPage,
};

const Template = (args) => (
  <SimpleReactLightbox>
    <DetailsPage {...args} />
  </SimpleReactLightbox>
);

export const Default = Template.bind({});
Default.args = {
  name: "Hotel McCoy",
  location: {
    lat: "32.19983",
    lon: "-110.98048",
    address: "720 W. Silverlake Road, Tucson, 85713, AZ",
  },
  score: 5,
  romingoDescription: "",
  defaultDescription:
    "Retro meets contemporary here at our 1960’s mid-century modern art hotel. From the fully restored pool to the A-shaped entrance & exposed posts & beams, it’s the best of both worlds.\n\nTucson is magic. We’ll share that with you when you are here. The lobby is adorned with pieces created by Arizona artists. The beer we serve was brewed just down the street. The wine we pour comes from AZ wine country. The coffee we brew was roasted right here in Tucson.\n\nTrue to our roots, Hotel McCoy emphasizes function & affordability – offering fellow wanderers local style & high-end amenities at reachable rates. This is what we call Travel For All.",
  mainImg:
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/11025302_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
  gallery: [
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/abf88bf7_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/d3e668fe_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/262404e1_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/d73122d2_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/5bfd85d6_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/349fd0e3_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/efb27d2e_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/30a7777c_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/2355a48d_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/62ea6b9c_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
    "https://exp.cdn-hotels.com/hotels/1000000/190000/188400/188379/7a2f4e7a_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium",
  ],
  nearby: [
    { text: "Lorem ipsum dolor sit amet accomodare his consul", distance: 0.2 },
    { text: "Accomodare his consul", distance: 0.37 },
    { text: "Lorem ipsum dolor sit", distance: 0.75 },
    { text: "Accomodare his consul nesarchum qui posse", distance: 1.2 },
    { text: "Ei mea falli legere efficiantur", distance: 2.1 },
  ],
  cancelPenalty: [
    {
      Refundable: true,
      Deadline: {
        AbsoluteDeadline: "2021-08-14T23:59:00-05:00",
      },
      AmountPercent: {
        Amount: 62.93,
        CurrencyCode: "USD",
      },
    },
    {
      Refundable: true,
      Deadline: {
        AbsoluteDeadline: "2021-08-19T23:59:00-05:00",
      },
      AmountPercent: {
        Amount: 125.85,
        CurrencyCode: "USD",
      },
    },
  ],
  dogAmenitiesTitle: "Dog Friendly Amenities",
  amenitiesTitle: "Other Amenities",
  amenities: [
    {
      Code: 101,
      Description: "Wheelchair access",
      value: "",
    },
    {
      Code: 162,
      Description: "Meal plan available",
      value: "Y",
    },
    {
      Code: 198,
      Description: "Non-smoking rooms (generic)",
      value: "",
    },
    {
      Code: 2001,
      Description: "Eco Friendly",
      value: "",
    },
    {
      Code: 2002,
      Description: "Stay Safe",
      value: "",
    },
    {
      Code: 2004,
      Description: "Local Calls",
      ComplimentaryInd: false,
      value: "MINIMAL FEE FOR ALL LOCAL CALLS",
    },
    {
      Code: 2017,
      Description: "Crib charge",
      value: "",
    },
    {
      Code: 2018,
      Description: "Extra person",
      value: "",
    },
    {
      Code: 224,
      Description: "Pets allowed",
      value: "Y",
    },
    {
      Code: 227,
      Description: "Complimentary breakfast",
      value: "",
    },
    {
      Code: 228,
      Description: "Business center",
      value: "",
    },
    {
      Code: 233,
      Description: "Tennis court",
      value: "",
    },
    {
      Code: 236,
      Description: "Golf",
      value: "",
    },
    {
      Code: 24,
      Description: "Conference facilities",
      value: "",
    },
    {
      Code: 255,
      Description: "Data port",
      value: "",
    },
    {
      Code: 259,
      Description: "High speed internet access",
      ComplimentaryInd: false,
      value: "WIRED HSIA CHARGE NOT TO EXCEED 9.95",
    },
    {
      Code: 260,
      Description: "Interior corridors",
      value: "",
    },
    {
      Code: 289,
      Description: "Children programs",
      value: "",
    },
    {
      Code: 44,
      Description: "Game room",
      value: "",
    },
    {
      Code: 48,
      Description: "Health club",
      value: "",
    },
    {
      Code: 54,
      Description: "Indoor pool",
      value: "",
    },
    {
      Code: 55,
      Description: "Hot Tub",
      value: "",
    },
    {
      Code: 71,
      Description: "Pool",
      value: "",
    },
    {
      Code: 77,
      Description: "Room service",
      value: "11a-11p",
    },
    {
      Code: 96,
      Description: "Dry cleaning",
      value: "",
    },
  ],
};

Default.parameters = {
  layout: "fullscreen",
};
