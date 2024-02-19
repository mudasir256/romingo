import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Portland, OR, USA",
    "matched_substrings": [
        {
            "length": 8,
            "offset": 0
        }
    ],
    "place_id": "ChIJJ3SpfQsLlVQRkYXR9ua5Nhw",
    "reference": "ChIJJ3SpfQsLlVQRkYXR9ua5Nhw",
    "structured_formatting": {
        "main_text": "Portland",
        "main_text_matched_substrings": [
            {
                "length": 8,
                "offset": 0
            }
        ],
        "secondary_text": "OR, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Portland"
        },
        {
            "offset": 10,
            "value": "OR"
        },
        {
            "offset": 14,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 45.515232,
  "lng": -122.6783853
}

const singleLoadListingCards = [
  {
    hotelName: "100000716",
    paragraphs: [
      "This contemporary hotel, exuding a perfect blend of style and convenience, sets the stage for an unforgettable stay in the vibrant heart of Portland. As you step into the spacious and pet-friendly accommodations, a sense of home envelops you and your furry friends, creating a haven where their happiness and comfort are paramount.",
      "Pets up to 70 pounds are welcome at no additional charge. This contemporary hotel blends style and convenience, offering a vibrant atmosphere for you and your furry friends. With spacious pet-friendly accommodations, your beloved companions will feel right at home.",
      //"Every aspect of Aloft Portland at Cascade Station has been thoughtfully designed to cater to the needs of both you and your pets. The sleek and contemporary ambiance sets a lively tone, providing an energizing backdrop for your adventures in the city. The modern amenities and thoughtful touches ensure that your stay is as convenient as it is enjoyable.",
      //"Embrace the nearby friendly dog park, a haven for outdoor activities and social interactions, ensuring a delightful stay for pets and their owners."
    ]
  },
  {
    hotelName: "100409092",
    paragraphs: [
      "Hotel deLuxe is a stylish and pet-friendly hotel that pays homage to classic Hollywood glamour. Pets are welcomed with open arms, and the hotel's pet package includes treats, toys, and a cozy bed. The hotel's rooftop bar and lounge provide a lovely spot to unwind with your pets while enjoying scenic city views.",
      "Hotel deLuxe welcomes you to bring two pets of any size and charges a fee of $50 per pet, per stay."
    ]
  },
  {
    hotelName: "100516495",
    paragraphs: [
      "Nestled in the heart of the city, The Hoxton Portland extends a warm welcome to pets at no additional charge. This trendy hotel embodies urban sophistication and chic comfort, ensuring a stylish retreat for you and your furry companion.",
      "Embrace the joy of exploring the city together, with the assurance that a friendly dog park nearby will enhance your experience with moments of outdoor bliss and joyful connections."
    ]
  },
  {
    hotelName: "100204986",
    paragraphs: [
      "Every corner of The Porter Portland Curio Collection by Hilton exudes an air of refined ambiance, carefully curated to cater to your every need. The hotel's commitment to luxury is evident in its exquisite accommodations, which are designed to provide the utmost comfort and indulgence.",
      //"Elegant furnishings, plush bedding, and tasteful decor create a haven of relaxation and tranquility, inviting you and your pets to unwind in style.",
      "The Porter Portland Curio Collection by Hilton allows two pets weighing up to 50 pounds for a fee of $75 per stay. This elegant hotel combines luxury with convenience, boasting exquisite accommodations and impeccable service.",
      //"Unleash your pet's playful spirit at the nearby dog park, a delightful haven for outdoor exploration and joyful social interactions."
    ]
  },
  {
    hotelName: "100433772",
    paragraphs: [
      "The Nines, a Luxury Collection Hotel, is a pet-friendly haven in the heart of downtown Portland. They offer a range of pet amenities, including beds, bowls, and treats, to ensure your pets feel right at home. With its central location, the hotel allows for easy access to pet-friendly parks and urban adventures.",
      "The Nines welcomes you to bring your pets on your trip. They allow you to bring two dogs up to 60 pounds for a fee of $85 per pet, per stay."
    ]
  },
  {
    hotelName: "102252353",
    paragraphs: [
      "At Moxy Portland Downtown, pets up to 70 lbs can join you for a fee of $25 per pet per stay. This trendy and spirited hotel combines modern comfort with a playful atmosphere, ensuring a memorable stay for you and your furry friend.",
      "Nearby, a friendly dog park beckons, providing an ideal setting for outdoor adventures and opportunities for your pet to mingle with other playful companions."
    ]
  }
];

const paragraphs = [
  [
    "Portland, Oregon, is a haven for pet-friendly travel, embracing its reputation as one of the most pet-friendly cities in the United States. Exploring this vibrant and quirky city becomes all the more enjoyable when you can do it with your furry companions by your side.",
    "Portland offers a plethora of pet-friendly parks, hiking trails, and off-leash areas where your pets can roam and play freely. Forest Park, one of the largest urban forests in the country, provides ample opportunities for scenic walks and adventures in nature.",
    "Many restaurants, cafes, and breweries in Portland welcome pets on their outdoor patios, ensuring you can enjoy delicious meals while your pets relax comfortably beside you. Furthermore, Portland boasts numerous pet-friendly accommodations, ranging from boutique hotels to cozy bed and breakfasts, ensuring a comfortable stay for both you and your four-legged friends.",
    "With its laid-back and pet-loving atmosphere, pet friendly travel in Portland promises a memorable and rewarding experience for all members of the family, including the furry ones.",
  ],
  [

  ],
  [

  ],
  [
    "Portland, Oregon, is a city that celebrates its love for pets, and there's no shortage of pet-friendly activities to enjoy with your furry companions. From scenic parks to pet-friendly breweries, Portland offers a plethora of adventures that will make your pet's tail wag with excitement. Here are the ten best pet-friendly activities in Portland that will create unforgettable memories for both you and your pets:"
  ],
  [
    "Before venturing out to these pet-friendly activities, remember to keep your pets on a leash where required and be mindful of other visitors. With these ten pet-friendly activities in Portland, you and your furry companions can now embark on a pawsitively fun adventure in this pet-loving city. From exploring nature to indulging in delicious treats, Portland promises a tail-wagging good time for everyone in the family. So, leash up your pets, grab your walking shoes, and get ready to create unforgettable memories together in the City of Roses!"
  ],
  [
    "Portland, Oregon, is a city known for its love of pets and its vibrant food scene. Fortunately, you don't have to choose between enjoying a delicious meal and spending time with your furry companions. Portland boasts a variety of pet-friendly restaurants that warmly welcome dogs and sometimes even cats to join their owners for a delightful dining experience. From cozy cafes to trendy eateries, here are ten pet-friendly restaurants in Portland where you can savor a delicious meal while your pets bask in the love and attention:"
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

const city = 'Portland';
const state = 'OR';
const stateFull = 'OREGON';
const cityAndState = `${city}, ${state}`;

const Portland: FC = () => {
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

export default Portland;
