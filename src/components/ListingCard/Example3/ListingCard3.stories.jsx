import React from "react";

import { ListingCard3 } from "./ListingCard3";

//👇 This default export determines where your story goes in the story list
export default {
  title: "ListingCard3",
  component: ListingCard3,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <ListingCard3 {...args} />;

export const Example = Template.bind({});

Example.args = {
  propertyName: "Hilton Tucson",
  location: "6330 N Papaya Pl, Tucson AZ 85741",
  currency: "$",
  price: "100",
  amenity1: "Dog park nearby",
  amenity2: "Pet friendly patio",
};
