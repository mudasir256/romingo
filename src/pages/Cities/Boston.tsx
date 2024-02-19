import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Boston, MA, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        }
    ],
    "place_id": "ChIJGzE9DS1l44kRoOhiASS_fHg",
    "reference": "ChIJGzE9DS1l44kRoOhiASS_fHg",
    "structured_formatting": {
        "main_text": "Boston",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "MA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Boston"
        },
        {
            "offset": 8,
            "value": "MA"
        },
        {
            "offset": 12,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 42.3600825,
  "lng": -71.0588801
}

const singleLoadListingCards = [
  {
    hotelName: "100123304",
    paragraphs: [
      "The Liberty Hotel, located in the heart of Boston's historic Beacon Hill neighborhood, is a captivating and luxurious destination that effortlessly blends history with modern sophistication. Housed in a beautifully restored 19th-century jail, The Liberty Hotel offers guests a unique and memorable experience.",
      //"The architectural beauty of the former jail is perfectly complemented by stylish contemporary décor and upscale amenities. The hotel features elegantly appointed rooms and suites with breathtaking views of the Charles River, Cambridge, or the city skyline. Along with its luxurious accommodations, The Liberty Hotel boasts an array of impressive dining options, including acclaimed restaurants and chic bars that cater to diverse palates.",
      "The Liberty Hotel is pet-friendly and welcomes two pets of any size for a fee of $100 per stay. The Liberty Hotel also offers pet-friendly amenities, including dog beds, food bowls, and a special dog menu for in-room dining. Pet-walking services and nearby green spaces make it easy to take your furry friend for a walk and enjoy the historic charm of Beacon Hill."
    ],
  },
  {
    hotelName: "100335276",
    paragraphs: [
      "The Kimpton Marlowe Hotel, situated along the picturesque Charles River in Cambridge, is a boutique hotel that exudes elegance, charm, and a warm welcome for both guests and their furry companions. The Kimpton Marlowe's prime location allows for scenic walks along the Charles River or nearby parks, making it convenient to explore the beautiful surroundings with your pet by your side.",
      "As part of the Kimpton Hotels & Restaurants chain, The Kimpton Marlowe embraces the brand's pet-friendly philosophy with open arms. This boutique hotel not only provides a pet-friendly welcome with no size or weight restrictions but also offers a range of pet services, including pet-sitting and grooming. Your pet will feel pampered with plush bedding and water bowls in the room.",

    ],
  },
  {
    hotelName: "100438110",
    paragraphs: [
      "The Colonnade Hotel, a refined and contemporary gem nestled in the heart of Boston's Back Bay, offers a sophisticated and pet-friendly retreat. When it's time to venture out, The Colonnade Hotel's prime location grants easy access to the beautiful Southwest Corridor Park, where you and your pet can enjoy leisurely strolls amidst lush greenery. Back at the hotel, indulge in delectable dining at the rooftop pool and lounge, boasting panoramic views of the city skyline.",
      //"As one of Boston's premier pet-friendly hotels, The Colonnade Hotel in Back Bay promises a delightful experience for both you and your furry companion. Offering stunning views of the city skyline, the hotel's pet-friendly rooms come equipped with comfortable bedding and pet amenities. The Colonnade Hotel is also close to the Southwest Corridor Park, providing ample greenery for leisurely strolls and play.",
      "The Colonnade Hotel is pet-friendly and allows you to bring two pets that weigh up to 75 pounds for no additional fee."
    ],
  },
  {
    hotelName: "100004538",
    paragraphs: [
      "Nestled in the heart of Boston's historic Back Bay neighborhood, The Lenox Hotel is a timeless and pet-friendly landmark that epitomizes elegance and charm. The hotel's central location allows for easy access to the iconic Boston Public Garden, where you and your pet can revel in the lush greenery and picturesque scenery. For guests seeking a memorable dining experience, The Lenox Hotel's on-site restaurant serves delectable dishes in a refined setting.",
      "The Lenox Hotel is pet friendly and allows dogs of all sizes to stay for free during your vacation. The hotel has even partnered with jack's Snacks, a local doggie bakery focused on creating high quality, preservative-free dog treats since 2004. You can shop for them in the lobby of The Lenox Hotel.",
    ],
  },
  {
    hotelName: "100003686",
    paragraphs: [
      "Steeped in grandeur and elegance, The Fairmont Copley Plaza stands as an iconic symbol of luxury and sophistication in the heart of Boston's Back Bay neighborhood. This historic hotel, with its rich history dating back to 1912, seamlessly blends timeless charm with modern comforts.",
      //"Located just steps away from the picturesque Copley Square and Boston Public Library, this majestic hotel serves as an ideal starting point for exploring Boston's cultural landmarks and historic sites. After a day of exploration, indulge in delectable cuisine at the hotel's acclaimed restaurant or unwind with a cocktail at the sophisticated lounge.",
      "The Fairmont Copley Plaza is pet-friendly and allows you to bring two pets of any size for a fee of $50 per pet."
    ],
  },
  {
    hotelName: "100630110",
    paragraphs: [
      "Overlooking the scenic Boston Harbor and nestled in the vibrant Seaport District, The Seaport Hotel & World Trade Center offers a contemporary and pet-friendly oasis for travelers seeking a delightful urban retreat. The hotel's proximity to the waterfront allows for leisurely walks with your pet, taking in the picturesque views and feeling the refreshing sea breeze. The Seaport Hotel & World Trade Center also features an array of dining options, ranging from casual to upscale, ensuring a delightful culinary experience for every palate.",
      "The Seaport Hotel & World Trade Center is pet-friendly and welcomes pets under 25 pounds for a fee of $100."
    ],       
  },
];

const paragraphs = [
  [
    "Boston is an ideal destination for pet-friendly travel, where the bustling city seamlessly merges with a warm and welcoming atmosphere for furry companions. Exploring this historic city becomes even more enjoyable when you can share it with your beloved pets. Numerous pet-friendly accommodations, from charming boutique hotels to cozy bed and breakfasts, readily open their doors to pets of all sizes.",
    "While strolling through the charming cobblestone streets of Beacon Hill or along the scenic Freedom Trail, you&apos;ll find various parks and green spaces, providing ample opportunities for your four-legged friends to stretch their legs and meet new furry acquaintances. Moreover, Boston boasts an array of pet-friendly cafes and eateries, ensuring your pets can enjoy the experience as much as you do."
  ],
  [
    "With its rich history, picturesque landscapes, and abundant pet-friendly amenities, Boston offers an unforgettable experience for both human and animal travelers alike.",
  ],
  [

  ],
  [

  ],
  [

  ],
  [

  ],
  [

  ]
]
const carouselOneData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image13.png',
    link: "https://esplanade.org/",
    linkText: "Charles River Esplanade",
    text: "Enjoy the stunning views of the Charles River while taking a leisurely walk with your pet along the Charles River Esplanade. This pet-friendly park features walking paths, benches, and plenty of open spaces for your furry friend to stretch their legs and bask in the scenic beauty.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/Castle%20Island%20Park%20%26%20Fort.jpeg',
    link: "https://www.mass.gov/locations/castle-island-pleasure-bay-m-street-beach-and-carson-beach",
    linkText: "Castle Island",
    text: "Take a short drive to South Boston and explore Castle Island with your pup. This recreational area offers picturesque views of the Boston Harbor and the city skyline. Dogs are allowed on-leash, and they can join you for a stroll along the waterfront or a relaxing picnic on the grass.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image4.png',
    link: "https://ussconstitutionmuseum.org/",
    linkText: "USS Constitution Museum",
    text: "Discover Boston's maritime history at the USS Constitution Museum, and the best part is, your pets are welcome to explore the grounds with you. While dogs aren't allowed inside the museum itself, you can still enjoy the surrounding area and take a walk near the historic naval ship.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image11.png',
    link: "https://www.sowaboston.com/sowa-open-market/",
    linkText: "SoWa Open Market",
    text: "If you're visiting Boston on a weekend, head over to the SoWa Open Market in the South End. This bustling market features local artisans, food vendors, and even a farmers' market. Well-behaved, leashed dogs are welcome, and your furry companion can enjoy the lively atmosphere and meet other friendly pups.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/Boston%20Harbor.avif',
    link: "https://www.bostonharbornow.org/what-we-do/explore/boston-harbor-islands-national-state-park/",
    linkText: "Boston Harbor Islands",
    text: "Embark on a pet-friendly adventure by hopping on a ferry to the Boston Harbor Islands. While dogs are not allowed on the beaches, they are welcome on the islands' hiking trails and picnic areas. Enjoy the fresh air and scenic views while creating lasting memories with your pet.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/Peters%20Park.avif',
    link: "https://www.peterspark.org/",
    linkText: "Peter's Park",
    text: "Located in the South End, Peter's Park is a well-maintained, off-leash dog park where your furry friend can socialize and play freely. The park provides separate areas for small and large dogs, water fountains, and seating for pet owners.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/Esplanade%20Association%20Canine%20Promenade.jpeg',
    link: "https://esplanade.org/events/5-canine-promenade/",
    linkText: "The Esplanade Association Canine Promenade",
    text: "Join the annual Esplanade Association Canine Promenade, a fun-filled event that celebrates dogs and their owners. This pet-friendly gathering includes a dog parade, contests, and pet-related activities, all while supporting the efforts to maintain and enhance the Charles River Esplanade.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/Boston%20Common%20Frog%20Pond.jpeg',
    link: "https://bostonfrogpond.com/",
    linkText: "Boston Common Frog Pond",
    text: "During the winter months, when the Frog Pond turns into a charming ice skating rink, it transforms into a fun pet-friendly play area in the warmer seasons. Dogs are allowed off-leash in the pond's fenced area, giving them the opportunity to splash around and cool off on hot days.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image3.png',
    link: "https://barkingcrab.com/",
    linkText: "The Barking Crab",
    text: "Nestled on the Boston Harbor, The Barking Crab is a seafood hotspot with a relaxed atmosphere and stunning waterfront views. Leashed dogs are welcome on their outdoor patio, where you can indulge in fresh seafood while your pup basks in the sea breeze.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image19.png',
    link: "https://www.coppaboston.com/",
    linkText: "Coppa",
    text: "Coppa Boston is a renowned Italian enoteca and restaurant that brings the flavors of Italy to the vibrant city of Boston. The menu, carefully curated by talented chefs, showcases a diverse selection of Italian small plates, wood-fired pizzas, and handmade pastas, all made with the freshest and finest ingredients.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/Shake%20Shack.jpg',
    link: "https://shakeshack.com/location/newbury-street-ma#/",
    linkText: "Shake Shack",
    text: "Located in various spots around the city, Shake Shack is a popular pet-friendly chain offering a mouthwatering menu of burgers, hot dogs, and frozen custard. Their spacious outdoor patios are perfect for you and your furry friend to relax and enjoy a casual meal together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image20.png',
    link: "https://www.stephaniesonnewbury.com/",
    linkText: "Stephanie's On Newbury",
    text: "Situated on Newbury Street, Stephanie's welcomes pets at their outdoor seating area. This charming bistro offers a diverse menu featuring American comfort food and is a great spot to savor brunch or a leisurely dinner with your pup by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image2.png',
    link: "https://www.sausboston.com/",
    linkText: "Saus",
    text: "Craving some Belgian-style street food? Head to Saus, a delightful eatery serving an assortment of mouthwatering fries and savory sandwiches. Dogs are welcome at their outdoor tables, making it a perfect place for a quick bite with your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image12.png',
    link: "https://www.thefriendlytoast.com/",
    linkText: "The Friendly Toast",
    text: "With its quirky décor and creative dishes, The Friendly Toast is a beloved brunch spot that welcomes pets on their outdoor patio. Enjoy a hearty breakfast or unique comfort food dishes while your pet relaxes beside you.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image18.png',
    link: "https://www.thecapitalgrille.com/locations/ma/boston/boston/8047",
    linkText: "The Capital Grille",
    text: "If you're in the mood for upscale dining, The Capital Grille is the place to go. This elegant steakhouse allows dogs on their outdoor patio, creating a refined atmosphere for you and your pup to enjoy a special meal together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image9.png',
    link: "https://www.legalseafoods.com/",
    linkText: "Legal Sea Foods" ,
    text: "A Boston institution for seafood lovers, Legal Sea Foods is a pet-friendly restaurant with a dog-welcoming patio. Treat yourself to their famous clam chowder or indulge in a fresh seafood feast while your pup enjoys the outdoor ambiance.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image1.png',
    link: "https://nightshiftbrewing.com/",
    linkText: "Night Shift Brewing",
    text: "If you're a beer enthusiast, you'll love Night Shift Brewing, a pet-friendly craft brewery with a rotating selection of unique beers. Their outdoor beer gardens are a great place to spend time with your pet while enjoying the local brews.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Boston/image6.png',
    link: "https://www.lincolnsouthboston.com/",
    linkText: "Lincoln Tavern and Restaurant",
    text: "Lincoln Tavern is a lively and pet-friendly eatery that offers a wide range of dishes, from pizzas to elevated comfort food. Your pup can join you at their outdoor seating area, making it a perfect spot for a casual meal.",
  },
];

const city = 'Boston';
const state = 'MA';
const stateFull = 'MASSACHUSETTS';
const cityAndState = `${city}, ${state}`;

const Boston: FC = () => {
  return (
    <CityPageLayout 
      paragraphs={paragraphs}
      singleLoadListingCards={singleLoadListingCards}
      searchData={searchData}
      carouselOneData={carouselOneData}
      carouselTwoData={carouselTwoData}
      city={city}
      stateFull={stateFull}
      cityAndState={cityAndState}
    />
  )
};

export default Boston;
