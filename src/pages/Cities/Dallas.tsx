import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';


const searchData = {
  "city": {
    "description": "Dallas, TX, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        }
    ],
    "place_id": "ChIJS5dFe_cZTIYRj2dH9qSb7Lk",
    "reference": "ChIJS5dFe_cZTIYRj2dH9qSb7Lk",
    "structured_formatting": {
        "main_text": "Dallas",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "TX, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Dallas"
        },
        {
            "offset": 8,
            "value": "TX"
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
  "lat": 32.7766642,
  "lng": -96.79698789999999
}

const singleLoadListingCards = [
  {
    hotelName: "100433288",
    paragraphs: [
      "The Joule is an iconic and luxurious hotel located in the heart of downtown Dallas, Texas. With its striking architecture and modern design, The Joule stands as a symbol of sophistication and style. The Joule is home to a variety of dining options where guests can eat delectable food and drink handcrafted cocktails.",
      "The Joule offers designated pet-friendly rooms, ensuring a comfortable and convenient stay for you and your pet. When you stay at The Joujle, there is a $100 fee that you will have to pay for your pet.",
    ],
  },
  {
    hotelName: "100429852",
    paragraphs: [
      "Hotel Crescent Court is a luxurious and elegant hotel located in the Uptown Dallas district, Texas. With its timeless architecture and refined interiors, this upscale hotel offers a blend of sophistication and comfort. The hotel's lush courtyard and rooftop pool provide serene oases for relaxation and enjoyment.",
      "There is a $150 pet fee when you stay at Hotel Crescent Court. When your pet arrives at the hotel, they will receive a water bowl, toy, bandana, bags, and a frisbee to enjoy!",
    ],
  },
  {
    hotelName: "100400682",
    paragraphs: [
      "The Westin Galleria Dallas is a contemporary and upscale hotel located in the vibrant Galleria area of Dallas, Texas. Offering a perfect blend of modern comforts and refined elegance, this hotel is a favorite among both business and leisure travelers.",
      "The Westin Galleria Dallas is a pet-friendly hotel that welcomes pets of all sizes. The hotel's pet-friendly policy allows you to bring two dogs up to 40 pounds for no extra charge.",
    ],
  },
  {
    hotelName: "101034230",
    paragraphs: [
      "Kimpton Pittman Hotel is a chic and trendy boutique hotel located in the heart of Deep Ellum, Dallas, Texas. The Kimpton Pittman Hotel offers a unique experience for guests with nice rooms and suites featuring stylish decor and contemporary amenities. You can enjoy delicious meals and craft cocktails at the hotel's restaurant and bar during your stay.",
      "As part of the Kimpton Hotels chain, the hotel warmly welcomes pets, providing special amenities and treats for furry companions. Kimpton Pittman Hotel loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. Your pet will receive treats and the hotel offers pet beds and food bowls for your furry friend to enjoy!"
    ],
  },
  {
    hotelName: "100182820",
    paragraphs: [
      "The Highland Dallas, Curio Collection by Hilton is a boutique hotel nestled in the upscale Knox-Henderson neighborhood of Dallas, Texas. Guests can indulge in a range of dining options, from fine dining to casual bistro fare, complemented by impeccable service. The hotel's rooftop pool offers stunning city views, while the fitness center allows guests to maintain their wellness routines.",
      "The hotel provides designated pet-friendly rooms and a pet-friendly patio, ensuring an enjoyable stay for your furry companion. Two pets that weigh up to 80 pounds are allowed with a fee of $75 per stay, per pet.",
    ],  
  },
  {   
    hotelName: "100393682",
    paragraphs: [
      "For those seeking a luxurious pet-friendly experience, The Ritz-Carlton, Dallas is an excellent choice. The hotel boasts an array of fine dining options, offering delectable culinary experiences to tantalize the taste buds. During your stay, you can relax at the hotel's spa and fitness center or enjoy a swim in the rooftop pool.",
      "This hotel warmly welcomes pets and provides a range of amenities for them, including plush pet beds and gourmet pet menus. All dogs can stay at The Ritz-Carlton, Dallas and there is a fee of $150 per stay.",
    ],
  },
];

const paragraphs = [
  [
    'Known for its warm atmosphere and welcoming culture, Dallas offers a variety of pet-friendly hotels, activities, and restaurants. Many parks and outdoor spaces in the city are pet-friendly and provide ample opportunities for pets to enjoy some playtime.',
    'Whether you&apos;re exploring the city&apos;s cultural landmarks or simply taking leisurely walks with your pet, pet-friendly travel in Dallas guarantees a fulfilling and inclusive journey for all.',
    'Dallas is a wonderful city to visit because of all of the exciting things you can do. Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy in Dallas.',
  ],
  [
    "Dallas, Texas, is a lively city that loves pets, making it a great destination for pet owners looking to explore the city. Dallas offers a variety of pet-friendly options that ensure a comfortable and inclusive stay for both humans and pets.",
    "Here are six pet-friendly hotels in Dallas that provide exceptional amenities and a welcoming environment for you and your pet."
  ],
  [
    "Dallas offers an array of pet-friendly hotels that cater to the needs of both you and your furry friend. These pet-friendly hotels in Dallas guarantee a fantastic trip with your pet. Pack your bags, leash up your pet, and embark on a paw-some adventure in the pet-friendly city of Dallas.",
  ],
  [
    "From scenic parks to pet-friendly patios and unique attractions, Dallas is a great city to visit with your pet. These are ten of the best pet-friendly activities in Dallas that will guarantee a wonderful trip with your furry friend."
  ],
  [
    "Dallas offers a wealth of pet-friendly activities that celebrate the city's inclusive and welcoming culture for pets. Whether you're exploring the city's green spaces or enjoying the vibrant dining scene, these ten pet-friendly activities guarantee a tail-wagging and enriching experience for all. So, leash up your pet, embark on new adventures, and revel in the joy of exploring Dallas with your beloved furry companion by your side."
  ],
  [
    "Dallas, Texas, is a city that celebrates its love for pets by offering a diverse range of pet-friendly dining options. From casual eateries to upscale establishments, Dallas warmly welcomes furry companions, making it an ideal destination for pet owners seeking inclusive dining experiences. In this article, we'll explore some of the top pet-friendly restaurants in Dallas, where you can enjoy scrumptious meals while creating cherished memories with your four-legged friend."
  ],
  [

  ]
];

const carouselOneData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/White%20Rock%20Lake%20Dog%20Park.jpeg',
    link: "https://www.dallasparks.org/Facilities/Facility/Details/Mockingbird-Point-Dog-Park-358",
    linkText: "White Rock Lake Dog Park",
    text: "Located on the shores of White Rock Lake, this dog park offers plenty of space for dogs to run and play. The park features separate areas for large and small dogs, ensuring a safe and enjoyable experience for all pups.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Katy%20Dog%20Park.jpeg',
    link: "https://mostateparks.com/park/katy-trail-state-park",
    linkText: "Katy Trail",
    text: "Grab your furry friend and take a walk along the scenic Katy Trail that spans 3.5 miles long in Dallas. Enjoy beautiful views of the city while getting some exercise with your pet by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Mutts.jpeg',
    link: "https://muttscantina.com/",
    linkText: "Mutts Canine Cantina",
    text: "Treat your pet to a unique experience at Mutts Canine Cantina, a dog-friendly restaurant and dog park combined. While you eat or have drinks on the patio, your pet can meet other dogs and enjoy playing in the off-leash area.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/image4.png',
    link: "https://dallasfarmersmarket.org/",
    linkText: "Dallas Famrers Market",
    text: "Bring your leashed pet along to the Dallas Farmers Market, where you can explore the fresh produce and artisanal goods together. Some vendors even offer pet-friendly treats and products for your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/REVERCHON_PARK.webp',
    link: "https://www.dallasparks.org/facilities/facility/details/Reverchon-Park-635",
    linkText: "Reverchon Park",
    text: "This urban park offers scenic trails for leashed walks with your pet and has open green spaces where your furry friend can stretch their legs and enjoy some outdoor playtime.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Lee%20Harvey's.jpeg",
    link: "https://leeharveys.com/",
    linkText: "Lee Harvey's",
    text: "Lee Harvey's is a dog-friendly bar with a spacious outdoor patio. This is a perfect spot to enjoy a cold drink or a tasty meal with your pet by your side!",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Kylde%20Warren%20Park.jpeg',
    link: "https://www.klydewarrenpark.org/",
    linkText: "Kylde Warren Park",
    text: "Leashed pets are welcome at Klyde Warren Park, a vibrant urban oasis that hosts a variety of events and activities. Enjoy a picnic or simply relax with your pet while taking in the lively atmosphere.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/image9.png',
    link: "https://deepellumbrewing.com/",
    linkText: "Deep Ellum Brewing Company",
    text: "Head to Deep Ellum Brewing Company for a pet-friendly brewery experience. Sip on craft beers while your furry friend lounges on the outdoor patio in the sun.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Cedar%20Ridge.jpeg',
    link: "https://audubondallas.org/cedar-ridge-preserve/",
    linkText: "Cedar Ridge Preserve",
    text: "Escape the city and take a hike at Cedar Ridge Preserve. Leashed pets are allowed on the hiking trails, providing an excellent opportunity to enjoy the great outdoors together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/image2.png',
    link: "https://trinityriver.audubon.org/",
    linkText: "Trinity River Audubon Center",
    text: "For a more nature-oriented outing, visit the Trinity River Audubon Center. Leashed pets can accompany you on the trails as you explore the beautiful landscapes and wildlife.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Mutts.jpeg',
    link: "https://muttscantina.com/",
    linkText: "Mutts Canine Cantina",
    text: "Mutts Canine Cantina is a pet-friendly restaurant and dog park that epitomizes the pet-friendly culture of Dallas. Located in Uptown and Addison, this unique spot offers a dedicated off-leash dog park where your pet can socialize and enjoy playtime while you savor tasty burgers, hot dogs, and craft beers on the patio.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Katy%20Trail%20Ice%20House%20Rest.webp",
    link: "https://katyicehouse.com/",
    linkText: "Katy Trail Ice House",
    text: "Katy Trail Ice House, situated near the scenic Katy Trail, boasts a spacious and pet-friendly patio that invites you to bring your furry friend along. The restaurant offers a relaxed atmosphere, making it a popular spot for locals and visitors alike to enjoy a cold drink, classic American fare, and live music with their pets.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Mutiny%20Wine%20Room.jpeg',
    link: "https://www.mutinywineroom.com/",
    linkText: "Mutiny Wine Room",
    text: "Mutiny Wine Room in the trendy Trinity Groves district is a chic and pet-friendly wine bar. Their welcoming patio is the perfect spot to enjoy an extensive selection of wines while your furry companion lounges by your side.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/image8.png",
    link: "https://truckyarddallas.com/",
    linkText: "Truck Yard",
    text: "Truck Yard is a laid-back beer garden that embraces the pet-friendly spirit of Dallas. With a rotating lineup of food trucks, you and your pet can savor diverse cuisines and treats while enjoying live music and a vibrant atmosphere.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/image1.png",
    link: "https://www.canerosso.com/",
    linkText: "Cane Rosso",
    text: "Cane Rosso is a pet-friendly pizza restaurant with multiple locations throughout Dallas. Their pet-friendly patios and delicious wood-fired pizzas make for a delightful dining experience for you and your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/Snuffers%20Restaurant.avif',
    link: "https://www.snuffers.com/",
    linkText: "Snuffer's Restaurant & Bar",
    text: "Snuffer's is a Dallas institution known for its famous cheddar fries. Their pet-friendly patios are an inviting spot for you and your furry friend to enjoy classic American comfort food.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/image3.png',
    link: "https://theporchrestaurant.com/",
    linkText: "The Porch",
    text: "The Porch is a beloved restaurant and gathering spot located in Dallas, renowned for its warm and welcoming ambiance. This vibrant eatery offers a delightful mix of Southern comfort food and contemporary American cuisine, making it a favorite among locals and visitors alike. The Porch's inviting patio, adorned with twinkling lights and cozy seating, creates a charming atmosphere for guests to enjoy their meals al fresco.",
  },
  {
    src:  "https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/image15.png",
    link: "https://www.ten50bbq.com/",
    linkText: "TEN50 BBQ",
    text: "TEN50 BBQ in Dallas is a haven for barbecue enthusiasts seeking an authentic and mouthwatering experience. Located in the heart of the city, this barbecue joint has gained a well-deserved reputation for serving up some of the best smoked meats in the region. As soon as you step inside, the tantalizing aroma of slow-cooked meats fills the air, whetting your appetite and promising a truly satisfying meal.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Dallas/image17.png",
    link: "https://www.outfitbrewing.com/",
    linkText: "Outfit Brewing",
    text: "Outfit Brewing in Dallas is a gem for beer enthusiasts and socialites alike, offering a vibrant and inviting space to enjoy finely crafted brews. Nestled in the heart of the city, this craft brewery has quickly made a name for itself with its innovative approach to beer-making and its dedication to quality and flavor. Stepping into Outfit Brewing, you are greeted with a lively atmosphere, where the clinking of glasses and cheerful conversations fill the air.",
  },
];

const city = 'Dallas'
const state = 'TX';
const stateFull = 'TEXAS';
const cityAndState = `${city}, ${state}`;

const Dallas: FC = () => {
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

export default Dallas;
