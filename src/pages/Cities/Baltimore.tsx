import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Baltimore, MD, USA",
    "matched_substrings": [
        {
          "length": 9,
          "offset": 0
        },
    ],
    "place_id": "ChIJt4P01q4DyIkRWOcjQqiWSAQ",
    "reference": "ChIJt4P01q4DyIkRWOcjQqiWSAQ",
    "structured_formatting": {
      "main_text": "Baltimore",
      "main_text_matched_substrings": [
        {
          "length": 9,
          "offset": 0
        }
      ],
      "secondary_text": "MD, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Baltimore"
        },
        {
            "offset": 11,
            "value": "MD"
        },
        {
            "offset": 15,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 39.2903848,
  "lng": -76.6121893
}

const singleLoadListingCards = [
  {
    hotelName:  "100211906",
    paragraphs:  [
      "Hotel Revival Baltimore is a chic and trendy boutique hotel located in the heart of Mount Vernon, offering a vibrant and artistic ambiance that reflects the city's rich cultural heritage. The hotel boasts well-appointed rooms and suites, complete with modern amenities and stylish decor, providing a relaxing retreat after a day of exploring Baltimore's attractions.",
              //"With its central location, guests and their pets can easily access nearby pet-friendly parks and cafes, making it an ideal choice for those seeking a pet-friendly and immersive Baltimore experience.",
              "For pets, the hotel provides plush pet beds, food and water bowls, and even a special pet menu, ensuring they receive the same level of pampering as their human companions. You can bring two dogs of any size to Hotel Revival Baltimore for no additional fee."
    ],
  },
  {
    hotelName:  "100397030",
    paragraphs:  [
      "Kimpton Hotel Monaco Baltimore Inner Harbor is a luxurious and pet-friendly haven nestled just steps away from the picturesque Inner Harbor. This boutique hotel exudes elegance and charm while wholeheartedly embracing four-legged guests.",
      "Pets of all sizes and shapes are welcome for no additional fee at the Kimpton Hotel Monaco Baltimore Inner Harbor. Upon arrival, pets of all shapes and sizes are greeted with warm hospitality, receiving pet beds, bowls, and delightful treats to make them feel right at home. The hotel's prime location allows easy access to the vibrant city's attractions, making it a perfect base for exploring Baltimore with your furry companion."
    ],
  },
  {
    hotelName:  "100022498",
    paragraphs:  [
      "The Four Seasons Hotel Baltimore is a luxurious waterfront retreat that offers unparalleled elegance and comfort in the heart of the city. The hotel's stunning waterfront views and top-notch amenities create a tranquil oasis for both guests and their furry friends to enjoy. With a dedicated concierge service, the Four Seasons can provide information about nearby dog parks and pet-friendly attractions, allowing guests to explore Baltimore with ease.",
      "When you stay at The Four Seasons Hotel Baltimore, you can bring one dog that weighs up to 65 pounds for a fee of $100 per stay."
    ],
  },
  {
    hotelName:  "100193168",
    paragraphs:  [
      "The Sagamore Pendry Baltimore is an exquisite and pet-friendly hotel located in the historic Fells Point neighborhood, offering a captivating blend of history and modern luxury. With its prime location in Fells Point, guests can take leisurely strolls through the charming streets and explore the city's pet-friendly attractions with ease.",
      "This waterfront boutique hotel embraces pets of all sizes, ensuring they have a comfortable and enjoyable stay alongside their human companions. You can bring two dogs of any size and there is a fee of $150 per stay."
    ],
  },
  {
    hotelName:  "100438110",
    paragraphs:  [
      "Conveniently located in the Inner Harbor area, the Hyatt Regency Baltimore Inner Harbor provides a pet-friendly retreat in the heart of the city. The hotel's central location provides easy access to the vibrant Inner Harbor area, where guests can explore pet-friendly attractions, parks, and dining options.",
      "Two pets up to 75 pounds total are welcome, and you can expect pet beds, bowls, and a personalized welcome note for your furry companion. If you stay 1-6 nights, the fee is $150; if you stay 7-30 nights, the fee will be $200. The hotel's location allows for easy access to pet-friendly attractions and parks."
    ],
  },
  {
    hotelName:  "100187718",
    paragraphs:  [
      "Staybridge Suites Baltimore - Inner Harbor is a pet-friendly and home-away-from-home hotel that provides extended-stay options for humans and pets alike. The hotel's central location allows easy access to pet-friendly parks and attractions, allowing guests to explore Baltimore with their pets.",
      "Located in the heart of Baltimore, this extended-stay hotel welcomes pets of all sizes, ensuring a stress-free and enjoyable stay for the entire family."
    ],
  }
];

const paragraphs = [
  [
    "If you're a pet lover looking to explore a vibrant city, Baltimore is the perfect destination for pet-friendly travel! Known for its rich history, diverse culture, and scenic waterfront, this charming city welcomes furry companions with open arms.",
    "Enjoy leisurely strolls with your four-legged friend along the picturesque Inner Harbor, where you&apos;ll find many pet-friendly cafes and restaurants with outdoor seating. Don't miss out on exploring the beautiful parks and green spaces scattered throughout the city, such as Patterson Park, Federal Hill Park, and Druid Hill Park, where your pet can roam freely and make new furry friends.",
    "For an extra dose of fun, check out the local pet events and festivals that often take place, bringing the community of pet owners together in celebration.",
  ],
  [
    `From historic landmarks to bustling neighborhoods, Baltimore offers a diverse range of experiences that you and your pet can enjoy together, making it an unforgettable destination for pet-friendly travel.`
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
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image17.png',
    link: "https://bcrp.baltimorecity.gov/parks/patterson-park",
    linkText: "Patterson Park",
    text: "This sprawling green oasis in the heart of the city is a favorite among locals and their pets. Enjoy a leisurely stroll around the park's walking trails, have a picnic, and let your furry companion socialize at the dog park.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image9.png',
    link: "https://www.cantoncommunity.org/canton-dog-park",
    linkText: "Canton Dog Park",
    text: "Located in the Canton neighborhood, this fenced-off dog park is an excellent place for your pup to run, play, and interact with other dogs. The park offers separate areas for small and large dogs, ensuring a safe environment for everyone.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image15.png',
    link: "https://greatruns.com/baltimore-md-inner-harbor/",
    linkText: "Inner Harbor Promenade",
    text: "Take in the breathtaking views of the Inner Harbor while walking along the pet-friendly promenade. Many cafes and restaurants with outdoor seating welcome well-behaved pets, making it a perfect spot for a relaxing afternoon.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image11.png',
    link: "https://www.dogsofcharmcity.net/post/dog-friendly-breweries-in-maryland",
    linkText: "Dog-Friendly Breweries",
    text: "Baltimore boasts several pet-friendly breweries where you can enjoy a cold one with your pup by your side. Many breweries have outdoor seating areas that are perfect for accommodating pets.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/Baltimore%20Rec%20City%20and%20Parks.jpg',
    link: "https://bcrp.baltimorecity.gov/parks/federal-hill",
    linkText: "Federal Hill Park",
    text: "Offering stunning views of the city skyline, Federal Hill Park is another pet-friendly gem in Baltimore. Take a scenic walk with your pet and capture some memorable photos with the cityscape as the backdrop.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image1.png',
    link: "https://baltimoreghosttours.com/fellspointghosttour/",
    linkText: "Fell's Point Ghost Tours",
    text: "For a spooktacular evening activity, join the Fell's Point Ghost Tours, where leashed and well-behaved dogs are welcome to explore the haunted history of this historic neighborhood.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image16.png',
    link: "https://www.mdsci.org/",
    linkText: "Maryland Science Center",
    text: "Surprisingly, the Maryland Science Center allows pets! Bring your leashed pet for an educational and fun-filled day exploring interactive exhibits and science demonstrations.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image20.png',
    link: "https://charmcitymeadworks.com/",
    linkText: "Charm City Meadworks",
    text: "Experience the world of mead at Charm City Meadworks, a pet-friendly tasting room where you can sample delicious honey wines while your dog relaxes at your feet.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image19.png',
    link: "https://cylburn.org/",
    linkText: "Cylburn Arboretum",
    text: "Cylburn Arboretum is a serene and captivating oasis that offers a delightful escape from the bustling city. This 200-acre public garden is a cherished gem for nature enthusiasts, hikers, and families looking to connect with the outdoors. The arboretum features an impressive collection of trees, plants, and wildlife, providing visitors with a diverse and immersive experience in nature.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/Baltimore%20Locust%20Point%20Dog%20Park.jpeg',
    link: "https://marylandpet.org/item/locust-point-dog-park-at-latrobe-park/",
    linkText: "Locust Point Dog Park",
    text: "Located in the scenic Locust Point neighborhood, this off-leash dog park provides a safe and spacious area for dogs to socialize, play, and stretch their legs. The park is fully fenced, ensuring a secure environment for furry friends to roam freely and interact with other dogs. With separate areas designated for small and large dogs, owners can have peace of mind knowing that their pets are enjoying the company of dogs similar in size and temperament.",
  },
]
const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image6.png',
    link: "https://bmorelicks.com/",
    linkText: "Bmore Licks",
    text: "Known for its delectable ice cream and frozen treats, Bmore Licks offers a dedicated &quot;doggie cone&quot; menu, ensuring your pup can savor a tasty treat while you enjoy your ice cream. This charming spot provides outdoor seating where you can relish your treats together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image8.png',
    link: "https://abbeyburger.com/",
    linkText: "Abbey Burger Bistro",
    text: "Located in Federal Hill, Abbey Burger Bistro is a must-visit spot for burger aficionados and their pets. This eatery features a pet-friendly patio, and your furry companion can even enjoy a &quot;Puppy Patty&quot; – a burger made especially for dogs.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image2.png',
    link: "https://www.barcocina.com/",
    linkText: "Barcocina",
    text: "Situated in Fells Point, Barcocina boasts a picturesque waterfront view and a pet-friendly patio where you can enjoy delicious Mexican-inspired cuisine. Your pet can cool off with a bowl of water while you savor the flavors.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/Golden%20West%20Dog.jpeg',
    link: "https://www.goldenwestcafe.com/",
    linkText: "Golden West Cafe",
    text: "This funky cafe in Hampden is known for its diverse menu and pet-friendly outdoor seating. Their patio is the perfect spot to relish creative dishes with your furry friend by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image5.png',
    link: "http://www.slaintepub.com/",
    linkText: "Slainte Irish Pub and Restaurant",
    text: "Experience a taste of Ireland in Baltimore at Slainte Irish Pub and Restaurant. This pet-friendly pub offers outdoor seating, so you and your pet can enjoy traditional Irish fare and a lively atmosphere together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image7.png',
    link: "https://bluepitbbq.com/",
    linkText: "Blue Pit BBQ & Whiskey Bar",
    text: "Treat yourself to some mouthwatering BBQ while your pet lounges with you on the outdoor patio at Blue Pit BBQ. Their &quot;Pit Pups&quot; menu ensures that your furry friend won't miss out on the BBQ experience.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/Iron%20Rooster.webp',
    link: "https://www.iron-rooster.com/",
    linkText: "Iron Rooster",
    text: "Famous for its all-day breakfast menu, Iron Rooster offers a pet-friendly patio where you and your pet can enjoy a variety of delicious brunch options together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/La%20Cuchara.jpeg',
    link: "https://www.lacucharabaltimore.com/",
    linkText: "La Cuchara",
    text: "If you're craving Spanish-inspired cuisine, La Cuchara in Woodberry has a pet-friendly patio where you and your furry friend can savor the rich flavors of Spain.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image12.png',
    link: "https://www.missshirleys.com/",
    linkText: "Miss Shirley's Cafe",
    text: "A beloved breakfast spot, Miss Shirley's Cafe offers a pet-friendly patio where you can enjoy their famous dishes, including pancakes and shrimp and grits, with your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image10.png',
    link: "http://www.kooperstavern.com/",
    linkText: "Kooper's Tavern",
    text: "Kooper's Tavern is a charming and lively restaurant located in the heart of historic Fells Point, Baltimore. Known for its delicious burgers and welcoming ambiance, Kooper's Tavern has become a favorite gathering spot for locals and visitors alike. The restaurant's pet-friendly outdoor seating area makes it a perfect destination for pet owners looking to dine with their furry companions.",
  },
];

const city = 'Baltimore';
const state = 'MD';
const stateFull = 'MARYLAND';
const cityAndState = `${city}, ${state}`;

const Baltimore: FC = () => {
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

export default Baltimore;
