import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Los Angeles, CA, USA",
    "matched_substrings": [
        {
            "length": 11,
            "offset": 0
        }
    ],
    "place_id": "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    "reference": "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    "structured_formatting": {
        "main_text": "Los Angeles",
        "main_text_matched_substrings": [
            {
                "length": 11,
                "offset": 0
            }
        ],
        "secondary_text": "CA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Los Angeles"
        },
        {
            "offset": 13,
            "value": "CA"
        },
        {
            "offset": 17,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 34.0522342,
  "lng": -118.2436849
}

const singleLoadListingCards = [
  {
    hotelName: "100402716",
    paragraphs: [
      "Loews Hollywood Hotel is a glamorous and contemporary retreat located at the epicenter of Hollywood, California. Situated in the heart of the entertainment capital, this upscale hotel offers a prime location for guests looking to immerse themselves in the glitz and glamour of Tinseltown. The guest rooms and suites are designed with modern amenities and have breathtaking views of the Hollywood Hills.",
      //"With its proximity to famous attractions like the Hollywood Walk of Fame and the Dolby Theatre, Loews Hollywood Hotel promises an unforgettable and star-studded stay for visitors seeking an upscale and glamorous escape in the heart of Hollywood.",
      "Loews is a pet-friendly hotel that allows you to bring two pets under 75 pounds each with an additional fee of $100 per stay."
    ]
  },
  {
    hotelName: "100428778",
    paragraphs: [
      "Perched at the crossroads of West Hollywood and Beverly Hills, The London West Hollywood is a chic and contemporary hotel that epitomizes Hollywood glamour. Boasting stunning views of the Los Angeles skyline, this luxurious hotel offers an upscale and sophisticated experience for guests seeking the ultimate California dream. The hotel's prime location near the Sunset Strip and iconic Hollywood landmarks makes it an ideal destination for exploring the city's vibrant nightlife and attractions.",
      "The London West Hollywood is a pet-friendly hotel, extending its hospitality to furry companions with specialized amenities and services. When staying here, you can bring one pet under 30 pounds with an additional fee of $100 plus $20 per night."
    ]
  },
  {
    hotelName: "100132008",
    paragraphs: [
      "Nestled amidst 23 acres of lush gardens and scenic landscapes in Pasadena, California, The Langham Huntington is an exquisite luxury hotel that exudes timeless elegance and sophistication. Originally constructed in 1907, this historic landmark has been meticulously restored to its former glory, offering a luxurious retreat for discerning travelers. The guest rooms and suites are opulently designed, featuring modern amenities and lavish touches, providing a sumptuous haven for relaxation.",
      "The Langham Huntington warmly welcomes pets, providing a pet-friendly experience that includes pet beds, food bowls, and treats for furry companions. Pets must be under 20 pounds and there is an additional fee of $250."
    ]
  },
  // {
  //   hotelName: "The Westin Bonaventure Hotel & Suites",
  //   paragraphs: [
  //     "The Westin Bonaventure Hotel & Suites is an iconic and modern hotel that stands tall among the city's skyline. This architectural masterpiece offers a perfect blend of sophistication and comfort, making it a popular choice for both business and leisure travelers. The guest rooms and suites are elegantly appointed, providing a relaxing and contemporary sanctuary with stunning city views.",
  //     "With its central location, excellent service, and pet-friendly policy, The Westin Bonaventure Hotel & Suites offers a remarkable and memorable stay for travelers seeking a convenient and comfortable experience in the bustling city of Los Angeles.",
  //     "Pets are welcome to stay with you at The Westin Bonaventure Hotel & Suites. You can have one pet in your room that weighs up to 40 pounds for an additional fee of $45 per night."
  //   ],
  // },
  {
    hotelName: "100368568",
    paragraphs: [
      "The Fairmont Miramar Hotel & Bungalows is an exquisite oasis that exudes luxury and tranquility. This iconic hotel offers a perfect blend of modern elegance and timeless charm, providing an unforgettable experience for discerning travelers. The guest rooms and bungalows are elegantly appointed, offering sweeping views of the Pacific Ocean or the lush gardens.",
      "Fairmont Miramar Hotel & Bungalows promises an idyllic and memorable stay in Santa Monica, where guests can immerse themselves in the epitome of coastal elegance and sophistication.",
      "You're welcome to bring your pets to this hotel for an additional $100 cleaning fee per pet, per stay."
    ]
  }
];

const paragraphs = [
  [
    "From pet-friendly beaches to hiking trails and outdoor cafes, there's no shortage of fun and memorable experiences for pet owners in the City of Angels. Many parks throughout Los Angeles have designated off-leash areas where your pet can romp and socialize with other dogs, such as Runyon Canyon and Laurel Canyon Dog Park.",
    "For some beach fun, head to Rosie&apos;s Dog Beach in Long Beach, the only off-leash dog beach in LA County. If you want to dine out with your pet, numerous restaurants with outdoor seating welcome furry friends, ensuring you can enjoy delicious meals without leaving your four-legged companion behind.",
    "Additionally, many hotels and vacation rentals in Los Angeles are pet-friendly, ensuring a comfortable and welcoming stay for you and your pet. With an abundance of pet-friendly options and a warm and inviting atmosphere, Los Angeles is the perfect destination for a pet-friendly vacation where you can create cherished memories with your beloved furry friend.",
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
  [
    "From crave-worthy pizza and warm focaccia, to fresh, crisp seasonal salads to family-style shared pig and lobster picnics, Etta has something for everyone. Just as the kitchen is the focal point of interaction within a home, Etta’s open kitchen design gives guests that same intimate experience.",
  ]
];

const carouselOneData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Runyon_Canyon_Park_Hike_Hollywood.jpg',
    link: "https://www.laparks.org/runyon/",
    linkText: "Runyon Canyon Park",
    text: "One of LA's most popular dog-friendly hiking spots, Runyon Canyon offers scenic trails with breathtaking views of the city. Leash up your pup and enjoy a refreshing hike together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Dog_Beach_webpage_e5fa8d8d-027f-4dba-b000-f045301613bd.jpg',
    link: "https://www.surfcityusa.com/things-to-do/beaches/dog-beach/",
    linkText: "Huntington Dog Beach",
    text: "Located in Long Beach, this off-leash dog beach is a paw-some spot for your pet to splash in the waves and socialize with other dogs.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image7.png',
    link: "https://griffithobservatory.org/",
    linkText: "Griffith Observatory",
    text: "Take a leashed stroll to the Griffith Observatory and enjoy sweeping views of Los Angeles. Your pet will love the fresh air and open spaces around this iconic landmark.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image14.png',
    link: "https://farmersmarketla.com/",
    linkText: "The Original Farmers Market",
    text: "Visit this historic market in LA's Fairfax District, where your leashed pet is welcome to explore the outdoor dining areas and pet-friendly stores.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/61dcb2757058511671f6dd62_24-Malibu%20Creek%20SP.jpeg',
    link: "http://www.parks.ca.gov/?page_id=614",
    linkText: "Malibu Creek State Park",
    text: "This picturesque park offers scenic trails and open spaces, perfect for a leisurely walk or a picnic with your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Cal%20Beaches_2030.webp',
    link: "https://www.californiabeaches.com/beach/granada-beach-rosies-dog-beach/",
    linkText: "Rosie's Dog Beach",
    text: "Located in Long Beach, this dog beach is a paradise for dogs who love to swim. Your pet can frolic in the surf and play in the sand off-leash.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image16.png',
    link: "https://www.thedogbakery.com/",
    linkText: "The Dog Bakery",
    text: "Treat your pet to some delicious goodies at The Dog Bakery, a specialty pet store with a variety of treats and accessories for your furry friend.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/The%20Getty%20Center.jpeg',
    link: "https://www.getty.edu/visit/center/",
    linkText: "The Getty Center",
    text: "Enjoy art and culture with your pet at The Getty Center's beautiful gardens, where leashed dogs are allowed to roam with their owners.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Silver%20Lake.jpeg',
    link: "https://www.laparks.org/dogpark/silverlake",
    linkText: "Silver Lake Dog Park",
    text: "This spacious off-leash dog park in the trendy Silver Lake neighborhood is a fantastic place for your pet to run and play with other dogs. You’ll even catch a sighting of the Hollywood sign!",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Elysian%20Park.webp',
    link: "https://www.laparks.org/park/elysian",
    linkText: "Elysian Park",
    text: "The oldest public park in LA, Elysian Park offers tranquil walking paths and beautiful views of the city, perfect for an on-leash stroll with your pet.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/The%20Morrison.jpeg',
    link: "https://www.morrisonrestaurant.com/",
    linkText: "The Morrison",
    text: "Located in Atwater Village, The Morrison boasts a pet-friendly patio where you can enjoy delicious comfort food and craft beers while your furry friend lounges beside you.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Lazy%20Dog.jpeg',
    link: "https://lazydogrestaurants.com/",
    linkText: "Lazy Dog Restaurant & Bar",
    text: "Lazy Dog Restaurant & Bar in Los Angeles is a beloved eatery that warmly welcomes both two-legged and four-legged guests. Inspired by the owner's love for his Golden Retriever, the restaurant aims to create a relaxing and comfortable atmosphere where patrons can enjoy delicious food and drinks while their pets are equally cherished.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Cafe%20Gratitude.webp',
    link: "https://cafegratitude.com/",
    linkText: "Café Gratitude",
    text: "Café Gratitude in Los Angeles is a popular plant-based restaurant that delights both vegans and non-vegans alike with its delicious and nourishing dishes. The restaurant's focus on gratitude and sustainability shines through in its thoughtfully prepared menu, featuring a variety of flavorful and wholesome options made from organic and locally sourced ingredients.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Trails%20Cafe.jpeg',
    link: "https://www.thetrailseatery.com/",
    linkText: "The Trails Café",
    text: "Nestled in Griffith Park, this charming café is a favorite among hikers and their pets. Enjoy a light breakfast or a tasty lunch on their pet-friendly patio before hitting the trails.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Blue_Plate_Oysterette_Exterior_H.0.0.jpeg',
    link: "https://www.blueplateoysterette.com/",
    linkText: "Blue Plate Oysterette",
    text: "Blue Plate Oysterette is a coastal-inspired seafood restaurant located in Santa Monica, California. With its beachy vibe and fresh seafood offerings, this eatery captures the essence of the Southern California coastal lifestyle. From oysters and seafood platters to tasty tacos and sandwiches, Blue Plate Oysterette promises a delightful dining experience with a taste of the ocean in the heart of Santa Monica.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image1.png',
    link: "https://www.goldenroad.la/",
    linkText: "Golden Road Brewing",
    text: "Golden Road Brewing in Los Angeles is a renowned craft brewery that has made a significant impact on the city's craft beer scene. Founded in 2011, Golden Road Brewing quickly gained popularity for its wide range of high-quality and innovative beers. The brewery's spacious and vibrant beer garden is a favorite spot for locals and visitors alike to gather, enjoy a variety of craft beers, and savor delicious bites from the on-site kitchen.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image2.png',
    link: "https://www.thefatdogla.com/",
    linkText: "The Fat Dog",
    text: "The Fat Dog in Los Angeles is a popular gastropub that offers a relaxed and laid-back atmosphere. With its dog-friendly patio and welcoming ambiance, this eatery is a favorite spot for pet owners looking to enjoy a delicious meal with their furry companions. The menu features a variety of mouthwatering dishes and a wide selection of craft beers, making The Fat Dog a great place to unwind and savor good food and drinks in the company of friends, both human and canine.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image19.png',
    link: "https://www.bluedaisycafe.com/",
    linkText: "Blue Daisy Café",
    text: "This charming café in Santa Monica offers pet-friendly outdoor seating. Savor Mediterranean-inspired dishes and artisanal coffee while your pet enjoys the pleasant surroundings.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/Figaro%20Cafe.jpeg',
    link: "https://www.figarobistrotla.com/",
    linkText: "Figaro Bistrot",
    text: "Figaro Bistrot is a charming and authentic French restaurant located in the trendy Los Feliz neighborhood of Los Angeles. With its vintage-inspired décor and classic French bistro dishes, this eatery offers a delightful taste of Parisian cuisine in the heart of LA. Whether you're savoring a croissant during breakfast or enjoying coq au vin for dinner, Figaro Bistrot provides a warm and inviting ambiance that transports guests to the streets of Paris.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image11.png',
    link: "https://www.ettarestaurant.com/",
    linkText: "Etta",
    text: "Etta is an affordable neighborhood restaurant that serves delicious wood-fired food. Centered around the wood-fired hearth, their expert culinary team peppers each menu with their favorite seasonal dishes that are meticulously crafted so you always get a top-notch culinary experience.",
  },
];

const city = 'Los Angeles';
const state = 'CA';
const stateFull = 'CALIFORNIA';
const cityAndState = `${city}, ${state}`;

const LosAngeles: FC = () => {
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

export default LosAngeles;
