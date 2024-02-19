import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "San Francisco, CA, USA",
    "matched_substrings": [
        {
            "length": 8,
            "offset": 0
        }
    ],
    "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
    "reference": "ChIJIQBpAG2ahYAR_6128GcTUEo",
    "structured_formatting": {
        "main_text": "San Francisco",
        "main_text_matched_substrings": [
            {
                "length": 8,
                "offset": 0
            }
        ],
        "secondary_text": "CA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "San Francisco"
        },
        {
            "offset": 15,
            "value": "CA"
        },
        {
            "offset": 19,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 37.7749295,
"lng": -122.4194155
}

const singleLoadListingCards = [
  {
    hotelName: "100436878", 
    paragraphs: [
      "The Hilton San Francisco Union Square is a landmark in the heart of the city. This pet-friendly hotel is stylish and modern with all the amenities you desire. This hotel has a prime location just steps away from Union Square's bustling shops and theaters.",
      "The Hilton San Francisco Union Square is a pet-friendly hotel. When you stay here, you can bring two pets with you that weigh up to 75 pounds each. You will also pay a fee of $50 per pet per stay."
    ]
  },
  {
    hotelName: "100399492",
    paragraphs: [
      "Located in Japantown, the Kimpton Hotel Enso is a luxury, pet-friendly hotel. The hotel's elegant and spacious rooms feature contemporary decor with a touch of Japanese flair, creating a soothing and inviting ambiance. The nearby Japantown Peace Plaza and Buchanan Street Mall are excellent spots for leisurely strolls with your pet.",
      "The Kimpton loves when you bring your pets on your trip. This is a great options because they allow pets of all sizes and breeds with no extra fees. When you check in, your pet will receive treats and the hotel offers pet beds and food bowls.",

    ]
  },
  {
    hotelName: "100437718", 
    paragraphs: [
      "The Hyatt Regency San Francisco has a prime location along the water where you can enjoy many activities. This pet-friendly hotel offers breathtaking views of the Bay Bridge, Alcatraz Island, and the city skyline. The elegant and contemporary rooms feature plush amenities and modern comforts, providing a serene retreat amidst the urban buzz. The Hyatt Regency San Francisco provides wonderful service, ensuring that every guest's stay is enjoyable.",
      "The Hyatt Regency San Francisco is a great, pet-friendly option for your trip to the city. You can bring dogs that weigh up to 20 pounds for a fee of $100 per stay."
    ]
  },
  {
    hotelName: "100547528", 
    paragraphs: [
      "The Proper Hotel in San Francisco is a pet-friendly hotel that is elegant and sophisticated. The Proper Hotel has a cool location in a historic flatiron building in San Francisco. The hotel's location offers easy access to popular neighborhoods, iconic landmarks, and a myriad of dining and entertainment options.",
      "The Proper Hotel welcomes two of your pets and they can weigh up to 35 pounds. When your pets arrive, they will receive food bowls and treats. The Proper Hotel donates a portion of the $100 pet fee to Best Friends Animal Society."
    ]
  },
  {
    hotelName: "100058704", 
    paragraphs: [
      "The SF Marriott Marquis is a pet-friendly hotel located in downtown San Francisco. This hotel is in a prime location just steps away from some of the city's most iconic attractions. The SF Marriott Marquis provides a blend of style and comfort, including an inviting atmosphere for both business and leisure travelers. This pet-friendly hotel promises an exceptional and memorable experience for all visitors to San Francisco.",
      "The SF Marriott Marquis is a great place to stay with your pet when you travel to San Francisco. Pets are welcome to stay with a maximum of one pet per room. There is a fee of $125 and pets must weigh below 40 pounds."
    ]
  },
  {
    hotelName: "100210840", 
    paragraphs: [
      "InterContinental Hotels & Resorts, often referred to as InterCon, is a pet-friendly hotel brand that offers sophisticated stays and amazing service. As with all InterContinental properties, guests can expect exceptional service during their stay. This pet-friendly hotel offers easy access to iconic landmarks, upscale shopping, and renowned dining options.",
      "If you want to travel to San Francisco with your dog, you should consider staying at the InterContinental. Your pets are welcome to stay in your hotel room for a fee of $100 per stay."
    ]
  }
];

const paragraphs = [
  [
    'San Francisco is a pet-friendly city known for its beautiful views and fun activities. Numerous pet-friendly hotels are available, ranging from luxurious hotels to cozy bed-and-breakfasts that cater to furry guests. Additionally, San Francisco has many dog parks and outdoor spaces where pets can run around off-leash.'
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

  ],
];

const carouselOneData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image11.png',
    link: "https://www.parksconservancy.org/parks/crissy-field",
    linkText: "Off-Leash Fun at Crissy Field",
    text: "Head to Crissy Field, a stunning waterfront park with open spaces and sandy shores. Here your dog can roam off-leash and frolic in the surf. The area offers fantastic views of the Golden Gate Bridge and is a favorite spot for locals and visitors alike.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image11.png',
    link: "https://www.sftravel.com/article/visitors-guide-to-golden-gate-park",
    linkText: "Golden Gate Park Adventures",
    text: "Explore San Francisco's iconic Golden Gate Park with your pet. Enjoy scenic strolls through lush gardens, have a picnic by the Dutch Windmill, or visit the Bison Paddock. Many areas of the park allow leashed pets, making it a perfect spot for leisurely walks.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Baker%20Bearch.jpeg',
    link: "https://www.presidio.gov/places/baker-beach",
    linkText: "Baker Beach Bliss",
    text: "Take your dog to Baker Beach, a picturesque spot where they can play in the sand and splash in the waves. Keep in mind that dogs should remain on-leash north of Lobos Creek to protect the endangered Snowy Plover.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image9.png',
    link: "https://www.cityexperiences.com/san-francisco/city-cruises/dog-day-on-the-bay-petco/",
    linkText: "Pet-Friendly Boat Tours",
    text: "Embark on a pet-friendly boat tour around the San Francisco Bay. Several tour operators welcome pets on board. This is a fun way to see the city's iconic skyline from a whole new perspective.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Fort%20Mason%20Center.jpeg',
    link: "https://fortmason.org/visit/",
    linkText: "Pet Pampering at Fort Mason Center",
    text: "Visit Fort Mason Center's &quot;Canine Cove,&quot; a designated off-leash area where dogs can mingle and enjoy the ocean breezes. After, you can wash your pet at the Fort Mason Dog Wash, where they can enjoy a spa-like experience.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image5.png',
    link: "https://sanfran.com/best-san-francisco-dog-friendly-bars",
    linkText: "Yappy Hours at Dog-Friendly Bars",
    text: "Many bars in San Francisco are pet-friendly and host special &quot;yappy hours&quot; where dogs are welcome. Enjoy a drink or a meal while your furry friend socializes with other dogs in a relaxed and enjoyable atmosphere.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image13.png',
    link: "https://www.napavalley.com/blog/dog-friendly-wineries-napa-valley/",
    linkText: "Pet-Friendly Winery Tour",
    text: "Discover the nearby wine country with your pet on a pet-friendly winery tour. Some wineries allow leashed pets, allowing you to savor the region's finest wines with your loyal companion by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Muttville%20Senior%20Dog%20Rescue.jpeg',
    link: "https://muttville.org/",
    linkText: "Muttville Senior Dog Rescue",
    text: "If you're looking to give back and spread some love, volunteer at Muttville Senior Dog Rescue. This organization rescues and rehabilitates senior dogs, providing them with a second chance at finding a loving forever home.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/San%20Fransisco.jpeg',
    link: "https://dogfriendlyareas.com/dog-friendly-stores-in-san-francisco/",
    linkText: "Pet-Friendly Shopping Spree",
    text: "Indulge in a pet-friendly shopping spree at the numerous pet boutiques scattered throughout the city. From fashionable accessories to gourmet treats, your furry friend will be happy!",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Alamo%20Square%20Park.jpeg',
    link: "https://sfrecpark.org/facilities/facility/details/Alamo-Square-323",
    linkText: "Pet Picnic at Alamo Square Park",
    text: "Enjoy a pet picnic at Alamo Square Park, known for its iconic &quot;Painted Ladies&quot; Victorian homes. This lovely park offers plenty of green space for you and your pet to relax, unwind, and enjoy the beautiful surroundings.",
  },
 
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image2.png',
    link: "https://greensrestaurant.com/",
    linkText: "Fort Mason Greens",
    text: "Fort Mason Greens overlooks the San Francisco Bay and has a dog-friendly patio for you to enjoy. At this restaurant, you can enjoy a delectable selection of fresh salads, sandwiches, and seafood. The stunning waterfront views and relaxed atmosphere make this eatery a perfect spot for a leisurely meal with your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image19.png',
    link: "https://www.beachchalet.com/",
    linkText: "Beach Chalet Brewery & Restaurant",
    text: "Situated near Ocean Beach, the Beach Chalet Brewery & Restaurant boasts a spacious outdoor patio where dogs are welcome. Enjoy a meal paired with a craft beer while your dog enjoys the ocean breeze.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Zeitgeist.jpeg',
    link: "https://www.zeitgeistsf.com/",
    linkText: "Zeitgeist",
    text: "Zeitgeist offers a dog-friendly beer garden where your pet can join you while you socialize and enjoy pub-style fare. This restaurant is well-known for its vibrant environment and large beer selection. This popular Mission District spot is perfect for a laid-back evening with your pet.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/The%20Ramp%20Restaurant.avif',
    link: "https://www.rampsf.com/",
    linkText: "The Ramp Restaurant",
    text: "Nestled along the waterfront, The Ramp Restaurant is a hidden gem that invites dogs to dine on its dog-friendly patio. This restaurant offers delicious seafood dishes and American classics, and an amazing view of the marina.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image18.png',
    link: "https://www.parkcafelife.com/",
    linkText: "Duboce Park Cafe",
    text: "Paradise Park Cafe provides a pet-friendly patio where your dog can relax while you eat sandwiches, salads, and breakfast delights. The cafe's charming outdoor space makes it a favorite among locals and pet owners.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/The%20Little%20Chihuahua.jpeg',
    link: "https://www.thelittlechihuahua.com/",
    linkText: "The Little Chihuahua",
    text: "This popular Mexican eatery welcomes pets on its outdoor patio while you indulge in flavorful tacos, burritos, and fresh salsas. The Little Chihuahua is a must-visit spot for Mexican cuisine enthusiasts exploring the Mission District.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image17.png',
    link: "https://sparksocialsf.com/",
    linkText: "Spark Social SF",
    text: "Spark Social SF provides a large outdoor space where you and your pet can enjoy food trucks. Savor international cuisine while your pet basks in the social atmosphere.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/The%20Cavalier.avif',
    link: "https://www.thecavaliersf.com/",
    linkText: "The Cavalier",
    text: "The Cavalier is a chic brasserie in SoMa that welcomes pets on its outdoor patio. Enjoy British-inspired dishes with a modern twist. And you can even order a treat for your pet from their dog menu.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Zazie.jpg',
    link: "https://www.zaziesf.com/",
    linkText: "Zazie",
    text: "Zazie is a quaint French-inspired bistro in Cole Valley and offers a charming pet-friendly garden patio. Here you can enjoy delectable brunch options with your pet by your side. This spot is a favorite among locals and tourists alike.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image14.png',
    link: "https://rosescafesf.com/",
    linkText: "Rose’s Cafe",
    text: "Rose’s Café is an Italian restaurant with an extensive all-day menu that will also accommodate your pets. They’re known to supply water bowls and gourmet dog biscuits to their canine guests as well, making this a great pet-friendly restaurant to visit!",
  },
];

const city = 'San Francisco';
const state = 'CA';
const stateFull = 'california';
const cityAndState = `${city}, ${state}`;

const SanFrancisco: FC = () => {
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

export default SanFrancisco;
