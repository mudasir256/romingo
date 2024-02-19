import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Salt Lake City, UT, USA",
    "matched_substrings": [
        {
            "length": 14,
            "offset": 0
        }
    ],
    "place_id": "ChIJ7THRiJQ9UocRyjFNSKC3U1s",
    "reference": "ChIJ7THRiJQ9UocRyjFNSKC3U1s",
    "structured_formatting": {
        "main_text": "Salt Lake City",
        "main_text_matched_substrings": [
            {
                "length": 14,
                "offset": 0
            }
        ],
        "secondary_text": "UT, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Salt Lake City"
        },
        {
            "offset": 16,
            "value": "UT"
        },
        {
            "offset": 20,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 40.7607793,
  "lng": -111.8910474
}

const singleLoadListingCards = [
  {
    hotelName: "100437140", 
    paragraphs: [
      "Sheraton Salt Lake City Hotel is pet-friendly and welcomes dogs of all sizes. They offer pet beds, water bowls, and a welcome kit for your pets, ensuring they feel right at home. The hotel's central location provides easy access to nearby pet-friendly parks and walking trails.",
      "You are welcome to bring up to two pets to this hotel for a fee of $50 per stay.",

    ]
  },
  {
    hotelName: "100210438", 
    paragraphs: [
      "Immerse yourself in the heart of downtown Salt Lake City at Motel 6-Salt Lake City, UT - Downtown, a pet-friendly hotel that embraces pets weighing up to 35 where pets “stay free.",
      "This budget-friendly and conveniently located hotel offers straightforward yet comfortable accommodations for you and your furry friends. It's an ideal choice for travelers seeking an affordable pet-friendly stay right in the midst of the city's vibrant atmosphere."
    ]
  },
  {
    hotelName: "100008778",
    paragraphs: [
      "Experience the luxury and sophistication at Hotel Monaco, a pet-friendly boutique hotel that exudes an atmosphere of elegance and style. This exceptional establishment warmly welcomes two pets weighing any size for no additional charge.",
      "As you step into this upscale hotel, you will be immediately captivated by the seamless fusion of modern amenities and historical charm. Each guest room has been designed with opulence in mind, featuring exquisite furnishings, plush bedding, and state-of-the-art facilities, ensuring a stay that epitomizes indulgence and comfort.",
      "Immerse yourself in the heart of Salt Lake City's vibrant culture and nightlife, knowing that you and your beloved pets have a luxurious sanctuary to return to at the end of each day. Hotel Monaco is more than just a hotel; it is an oasis of refined sophistication, where every moment is imbued with a sense of indulgence and style."
    ] 
  },
  {
    hotelName: "100072652", 
    paragraphs: [
      "Residence Inn by Marriott is a pet-friendly hotel that offers comfortable extended-stay accommodations. They allow pets for a small additional fee, ensuring a convenient and enjoyable stay for both you and your pets. The hotel's fully equipped suites provide ample space for you and your furry friends to relax and unwind.",
      "You are welcome to bring up to two pets to this hotel for a fee of $100 per stay."
    ]
  },
  {
    hotelName: "100279934",
    paragraphs: [
      "Featuring the ultimate in convenience and comfort, the Hilton Salt Lake City Center is a pet-friendly haven designed to cater to the needs of both business and leisure travelers. With a nominal fee of just $50 per stay, this exceptional hotel extends a warm welcome to two pets weighing up to 75 lbs each, ensuring that your furry companions can accompany you on your journey.",
    // "Nestled in the heart of the vibrant downtown area, Hilton Salt Lake City Center stands as a beacon of modernity and sophistication, offering an array of contemporary amenities, spacious accommodations, and unparalleled service.",
      "Whether you're seeking to explore the city's renowned attractions or attending a conference at the nearby convention center, this pet-friendly sanctuary serves as an inviting and accommodating home base throughout your stay."
    ] 
  },
  {
    hotelName: "100006254",
    paragraphs: [
      "Hyatt Place is a pet-friendly hotel conveniently situated near popular attractions in Salt Lake City. They welcome pets weighing up to 50 pounds, ensuring a comfortable stay for you and your pets. The hotel's modern and spacious rooms provide a relaxing sanctuary for you and your furry companions."
    ] 
  },
];

const paragraphs = [
  [
    'Salt Lake City, Utah, is a pet-friendly destination that welcomes four-legged travelers with open arms. This beautiful city nestled amidst stunning mountains offers a variety of pet-friendly activities and accommodations, ensuring a memorable experience for both you and your furry companions. Enjoy a leisurely stroll with your pets in the pet-friendly parks and walking trails scattered throughout the city, such as Liberty Park and Memory Grove Park.',
    "If you're up for an outdoor adventure, explore the pet-friendly hiking trails in the nearby canyons, such as Mill Creek Canyon or Big Cottonwood Canyon. Additionally, the city boasts a range of pet-friendly hotels and accommodations, ensuring a comfortable stay for both you and your pets.",
    "With its warm hospitality and numerous pet friendly options, Salt Lake City promises an enjoyable and rewarding pet-friendly travel experience for the whole family.",
  ],
  [

  ],
  [
    "Before booking your stay at these pet-friendly hotels, it's always a good idea to check the specific pet policies and any additional fees. These six pet-friendly hotels in Salt Lake City will allow you to explore the city's attractions and enjoy a comfortable stay with your furry friends by your side.",
  ],
  [
    "Salt Lake City, Utah, is a pet-friendly paradise that offers a plethora of activities for you and your furry companions to enjoy together. From scenic outdoor adventures to pet-friendly shopping and dining experiences, there are fun-filled activities for the whole family. Here are the ten best pet-friendly activities in Salt Lake City that will make your pet's tail wag with excitement:",
  ],
  [

  ],
  [
    "Salt Lake City, Utah, is a foodie's paradise, and the good news is that you don't have to leave your furry companions behind when indulging in the city's culinary delights. Salt Lake City is home to a variety of pet-friendly restaurants that warmly welcome dogs and sometimes even cats to join their owners for a delicious dining experience.",
    "From cozy cafes to trendy eateries, here are ten pet-friendly restaurants in Salt Lake City where you and your pets can savor a delightful meal together:"
  ],
];

const carouselOneData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Forest%20Park%20.jpeg',
    link: "https://www.portland.gov/parks/forest-park",
    linkText: "Forest Park",
    text: "Embark on a hike in Forest Park, one of the largest urban forests in the country. With over 5,000 acres of lush greenery and miles of trails, this pet-friendly park provides the perfect setting for you and your pets to explore nature together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image7.png',
    link: "https://www.portland.gov/parks/sellwood-riverfront-park",
    linkText: "Sellwood Riverfront Park",
    text: "Treat your furry friends to some off-leash fun at Sellwood Riverfront Park. This spacious, fully-fenced park offers separate areas for small and large dogs, allowing them to play and socialize freely.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image12.png',
    link: "https://luckylab.com/",
    linkText: "Lucky Labrador Brewing Company",
    text: "Head to the Lucky Labrador Brewing Company, a pet-friendly brewery where dogs are always welcome. Enjoy craft beers while your pets relax by your side in the outdoor seating areas.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Cathedral%20Park.jpeg',
    link: "https://www.portland.gov/parks/cathedral-park",
    linkText: "Cathedral Park",
    text: "Located beneath the iconic St. Johns Bridge, Cathedral Park is a picturesque spot for a leisurely walk with your pets. The park's stunning views of the bridge and Willamette River make it a favorite among locals and visitors alike.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Wallace%20Park.jpeg',
    link: "https://www.portland.gov/parks/wallace-park",
    linkText: "Wallace Park",
    text: "Wallace Park features a spacious off-leash area, making it an ideal spot for your pets to run and play freely. The park's central location in the Northwest District allows for easy access to nearby pet-friendly shops and cafes.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image17.png',
    link: "https://visittheoregoncoast.com/",
    linkText: "Oregon Coast",
    text: "Take a day trip to the Oregon Coast with your pets and explore the dog-friendly beaches and coastal towns. Many beaches in Oregon allow dogs to roam off-leash, providing a fun-filled beach experience for your furry companions.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image11.png',
    link: "https://www.tinshedgardencafe.com/",
    linkText: "Tin Shed Garden Café",
    text: "Dine with your pets at Tin Shed Garden Café, a pet-friendly restaurant known for its delicious breakfast and brunch options. Their dog-friendly patio welcomes your pets with water bowls and treats.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Laurelhurst%20Park.webp',
    link: "https://www.portland.gov/parks/laurelhurst-park",
    linkText: "Laurelhurst Park",
    text: "Laurelhurst Park is a beautiful and pet-friendly park offering scenic walking trails and a large off-leash area for dogs. The park's tranquil pond and lush green lawns provide a peaceful retreat for you and your pets.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Tom%20McCall%20Waterfront%20Park.webp',
    link: "https://www.portland.gov/parks/governor-tom-mccall-waterfront-park",
    linkText: "Tom McCall Waterfront Park",
    text: "Stroll along the scenic Tom McCall Waterfront Park with your pets and enjoy views of the Willamette River and downtown Portland. The park's paved paths are perfect for leisurely walks with your furry companions.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image20.png',
    link: "https://www.portlandsaturdaymarket.com/",
    linkText: "Portland Saturday Market",
    text: "Visit the Portland Saturday Market, a pet-friendly open-air market featuring local artisans and vendors. Pets are welcome on a leash, allowing them to soak up the bustling atmosphere and vibrant energy of the market.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image20.png',
    link: "https://luckylab.com/hawthorne-2020/",
    linkText: "Lucky Labrador Brewing Company",
    text: "Lucky Labrador Brewing Company is a beloved pet-friendly brewery that embraces furry guests with open arms. The relaxed atmosphere and outdoor seating areas make it a perfect spot to enjoy craft beers and tasty pub fare with your pets by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image6.png',
    link: "https://www.hopworksbeer.com/",
    linkText: "Hopworks Urban Brewery",
    text: "Hopworks Urban Brewery, also known as HUB, is a pet-friendly brewpub that offers organic beers and a variety of tasty dishes. Your furry friends will love lounging with you on their outdoor patio.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Alberta%20Street%20Pub.jpeg',
    link: "https://www.albertastreetpub.com/",
    linkText: "Alberta Street Pub",
    text: "Alberta Street Pub is a pet-friendly eatery and pub located on the bustling Alberta Street. Your pets are welcome to join you on their outdoor patio as you enjoy live music and a selection of delicious food and drinks.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Backyard%20Social%20.avif',
    link: "https://backyardsocialpdx.com/",
    linkText: "Backyard Social",
    text: "Backyard Social is a pet-friendly restaurant with a charming outdoor seating area where dogs are always welcome. Their diverse menu offers comfort food classics, salads, and refreshing cocktails.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Bar%20Carlo.jpeg',
    link: "https://www.barcarlopdx.com/",
    linkText: "Bar Carlo",
    text: "Bar Carlo is a popular pet-friendly restaurant that features a lovely garden patio where dogs are welcome. Their menu includes a mix of comfort food and international dishes, making it a perfect place to enjoy a meal with your pets.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image14.png',
    link: "https://www.teotepdx.com/",
    linkText: "Teote Mezcalería",
    text: "Teote Mezcalería is a vibrant and pet-friendly Latin American restaurant offering an array of flavorful dishes. Your pets can join you on their outdoor patio as you savor Latin American cuisine and enjoy a relaxed atmosphere.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Radio%20Room.avif',
    link: "https://www.radioroompdx.com/",
    linkText: "Radio Room",
    text: "Radio Room is a pet-friendly eatery with a spacious outdoor seating area. Your furry companions can relax by your side as you indulge in tasty pub food and drinks.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/StormBreaker%20Brewing.jpg',
    link: "https://www.stormbreakerbrewing.com/",
    linkText: "StormBreaker Brewing",
    text: "StormBreaker Brewing is a pet-friendly brewery with a welcoming outdoor patio. Enjoy their craft beers and pub fare while your pets lounge comfortably with you.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/%E2%80%8B%E2%80%8BVoodoo%20Doughnut.webp',
    link: "https://www.voodoodoughnut.com/",
    linkText: "Voodoo Donut",
    text: "Voodoo Doughnut is a quirky and iconic doughnut shop with locations in Portland, Oregon, and several other cities across the United States. Founded in 2003, Voodoo Doughnut quickly gained fame for its innovative and playful approach to doughnuts, offering an array of unique flavors and eccentric designs.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image19.png',
    link: "https://saltandstraw.com/",
    linkText: "Salt & Straw" ,
    text: "Founded in 2011, Salt & Straw has gained a devoted following for its inventive and high-quality ice cream flavors, made using locally sourced, organic, and sustainable ingredients. The shop's commitment to creative flavors is evident in its rotating menu, which features unique combinations like Honey Lavender, Sea Salt with Caramel Ribbons, and Roasted Strawberry Coconut.",
  }
];

const city = 'Salt Lake City';
const state = 'UT';
const stateFull = 'utah';
const cityAndState = `${city}, ${state}`;

const SaltLakeCity: FC = () => {
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

export default SaltLakeCity;
