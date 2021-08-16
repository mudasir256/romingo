const data = {
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
  roomList: [
    {
      value: 0,
      description: "Room TWO DOUBLE BEDS"
    },
    {
      value: 1,
      description: "Two Double Beds - Non-refundable"
    },
    {
      value: 2,
      description: "SUITE TWO BEDROOMS"
    },
  ],
  cancelPenalty: [
    {
      refundable: true,
      deadline: {
        absoluteDeadline: "2021-08-14T23:59:00-05:00",
      },
      amountPercent: {
        amount: 62.93,
        currencyCode: "USD",
      },
    },
    {
      refundable: true,
      deadline: {
        absoluteDeadline: "2021-08-19T23:59:00-05:00",
      },
      amountPercent: {
        amount: 125.85,
        currencyCode: "USD",
      },
    },
  ],
  dogAmenitiesTitle: "Dog Friendly Amenities",
  amenitiesTitle: "Other Amenities",
  amenities: [
    {
      code: 101,
      description: "Wheelchair access",
      value: "",
    },
    {
      code: 162,
      description: "Meal plan available",
      value: "Y",
    },
    {
      code: 198,
      description: "Non-smoking rooms (generic)",
      value: "",
    },
    {
      code: 2001,
      description: "Eco Friendly",
      value: "",
    },
    {
      code: 2002,
      description: "Stay Safe",
      value: "",
    },
    {
      code: 2004,
      description: "Local Calls",
      ComplimentaryInd: false,
      value: "MINIMAL FEE FOR ALL LOCAL CALLS",
    },
    {
      code: 2017,
      description: "Crib charge",
      value: "",
    },
    {
      code: 2018,
      description: "Extra person",
      value: "",
    },
    {
      code: 224,
      description: "Pets allowed",
      value: "Y",
    },
    {
      code: 227,
      description: "Complimentary breakfast",
      value: "",
    },
    {
      code: 228,
      description: "Business center",
      value: "",
    },
    {
      code: 233,
      description: "Tennis court",
      value: "",
    },
    {
      code: 236,
      description: "Golf",
      value: "",
    },
    {
      code: 24,
      description: "Conference facilities",
      value: "",
    },
    {
      code: 255,
      description: "Data port",
      value: "",
    },
    {
      code: 259,
      description: "High speed internet access",
      ComplimentaryInd: false,
      value: "WIRED HSIA CHARGE NOT TO EXCEED 9.95",
    },
    {
      code: 260,
      description: "Interior corridors",
      value: "",
    },
    {
      code: 289,
      description: "Children programs",
      value: "",
    },
    {
      code: 44,
      description: "Game room",
      value: "",
    },
    {
      code: 48,
      description: "Health club",
      value: "",
    },
    {
      code: 54,
      description: "Indoor pool",
      value: "",
    },
    {
      code: 55,
      description: "Hot Tub",
      value: "",
    },
    {
      code: 71,
      description: "Pool",
      value: "",
    },
    {
      code: 77,
      description: "Room service",
      value: "11a-11p",
    },
    {
      code: 96,
      description: "Dry cleaning",
      value: "",
    },
  ],
}

export default data;