import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';


const searchData = {
  "city": {
    "description": "Detroit, MI, USA",
    "matched_substrings": [
        {
            "length": 7,
            "offset": 0
        }
    ],
    "place_id": "ChIJdR3LEAHKJIgR0sS5NU6Gdlc",
    "reference": "ChIJdR3LEAHKJIgR0sS5NU6Gdlc",
    "structured_formatting": {
        "main_text": "Detroit",
        "main_text_matched_substrings": [
            {
                "length": 7,
                "offset": 0
            }
        ],
        "secondary_text": "MI, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Detroit"
        },
        {
            "offset": 9,
            "value": "MI"
        },
        {
            "offset": 13,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 42.331427,
  "lng": -83.0457538
}

const singleLoadListingCards = [
  {
    hotelName: "100000998",
    paragraphs: [
      "The Westin Book Cadillac Detroit stands as an iconic testament to the city's rich history and vibrant future. Its grand architecture and sophisticated interiors harken back to a bygone era, while the meticulously designed rooms and suites offer contemporary comfort and breathtaking city views.",
      //"As a cornerstone of Detroit's skyline, The Westin Book Cadillac plays a vital role in the city's revitalization, providing a haven for travelers and locals alike. With its upscale dining options, rejuvenating spa, and convenient access to nearby attractions, this hotel captures the essence of Detroit's resilience and resurgence, welcoming visitors to experience the perfect fusion of past and present.",
      "The Westin Book Cadillac Detroit is a pet-friendly hotel that allows you to bring two pets weighing up to 40 pounds for no additional fee. Upon arrival, pets receive a warm greeting, complete with a pet bed and food/water bowls for their comfort. The hotel's concierge can also provide information about nearby parks and pet-friendly attractions, making it easy for you and your pet to explore the city together."
    ]
  },
  {
    hotelName: "100087944",
    paragraphs: [
      "Nestled within the historic David Whitney Building, Aloft Detroit at the David Whitney offers a refreshing blend of contemporary design and historic charm. The revitalized interiors boast a vibrant and energetic atmosphere, showcasing artistic flair and innovative architecture. The rooms and suites exude a youthful and dynamic vibe, providing guests with a comfortable and stylish retreat.",
      // "With its prime location, Aloft Detroit offers easy access to the city's cultural, culinary, and entertainment offerings. Whether enjoying the panoramic views from the rooftop bar or immersing oneself in the surrounding cultural scene, Aloft Detroit at The David Whitney promises a wonderful experience.",
      "Aloft Detroit at The David Whitney is pet-friendly and welcomes pets of all sizes with no additional fees. They offer plush pet beds and delicious treats upon check-in. The hotel's central location in downtown Detroit also allows for easy access to various pet-friendly parks and walking trails."
    ]
  },
  {
    hotelName: "100087656",
    paragraphs: [
      "Trumbull & Porter Hotel, formerly a warehouse, has been transformed into a contemporary haven that reflects Detroit's vibrant arts and culture scene. The industrial-chic design seamlessly blends raw elements with modern comforts, offering guests a unique and immersive stay. The rooms and suites boast a minimalist yet stylish aesthetic, providing a cozy retreat after a day of exploring the city.",
      // "With its emphasis on community and local collaboration, the hotel serves as a hub for both travelers and Detroit residents, hosting events, pop-up shops, and art exhibitions. Its central location allows easy access to Detroit's bustling neighborhoods, museums, and dining destinations.",
      "Trumbull & Porter Hotel is pet-friendly and allows dogs that weigh 75 pounds or less. They charge a fee of $50 per day, per pet."
    ]
  },
  {
    hotelName: "100596287",
    paragraphs: [
      "The Shinola Hotel stands as a true embodiment of luxury craftsmanship and urban sophistication in the heart of downtown Detroit. Collaboratively designed and curated with meticulous attention to detail, this boutique hotel represents a fusion of Shinola's commitment to quality and Detroit's storied history.",
      // "The Shinola Hotel goes beyond accommodation, offering an array of dining options, from upscale restaurants to cozy cafes, all emphasizing locally sourced ingredients. With its strategic location, guests can effortlessly explore the city's cultural landmarks, entertainment venues, and business districts.",
      "The Shinola Hotel is pet-friendly and allows you to bring two pets that weigh less than 70 pounds for no additional fee."
    ]
  },
  {
    hotelName: "100467860",
    paragraphs: [
      "MGM Grand Detroit stands as a premier destination that seamlessly blends luxury, entertainment, and excitement in the heart of the city. This world-class resort and casino offers a captivating experience that captures the essence of both Las Vegas-style entertainment and the unique character of Detroit.",
      // "The sprawling casino floor beckons with a myriad of gaming options, while the diverse dining choices, from upscale restaurants to casual eateries, cater to every palate. The resort's entertainment venues host a variety of shows and events, adding to the vibrant atmosphere. Additionally, the spa and wellness facilities provide a haven of relaxation.",
      "MGM Grand Detroit is pet-friendly and allows you to bring up to two dogs with a combined weight of less than 100 pounds for a fee of $100 per night, per dog."
    ]
  },
  {
    hotelName: "100027845",
    paragraphs: [
      "Housed within the historic Wurlitzer Building, The Siren Hotel exudes an ambiance that transports guests to a bygone era, with its carefully curated interiors and intricate architectural details.",
      //"The Siren Hotel not only offers a comfortable stay but also embraces a sense of community through its communal spaces, which include an inviting lobby, a rooftop bar with panoramic city views, and a variety of dining options that celebrate local flavors. With its central location, guests can effortlessly explore Detroit's cultural landmarks, theaters, and bustling streets.",
      "The Siren Hotel is pet-friendly and allows you to bring one dog up to 50 pounds for no additional fee."
    ]
  }
];

const paragraphs = [
  [
    "Detroit, a city renowned for its rich history and vibrant culture, has emerged as an increasingly pet-friendly travel destination, welcoming both locals and visitors to explore its wonders with their furry companions. From charming boutique hotels and cozy bed-and-breakfasts that cater to pets, to a plethora of parks and recreational spaces designed for four-legged friends, Detroit has become a haven for pet enthusiasts. Visitors can take leisurely strolls with their dogs along the scenic RiverWalk or unwind at the numerous dog-friendly cafes and restaurants scattered throughout the city.",
  ],
  [
    "For a dose of culture, pet parents can explore pet-friendly art galleries and cultural attractions, providing a truly inclusive experience. Whether it's exploring the iconic landmarks or attending pet-friendly events and festivals, Detroit ensures that pets are not just tolerated but embraced, making it an ideal destination for unforgettable adventures with our beloved companions.",
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
];

const carouselOneData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image19.png',
    link: "https://www.michigan.org/property/belle-isle-park",
    linkText: "Belle Isle Park",
    text: "A true gem in the heart of Detroit, Belle Isle Park offers an enchanting escape for pets and their owners alike. Explore miles of walking trails, scenic views of the Detroit River, and various open spaces for your pup to play. Don't forget to stop by the Belle Isle Aquarium, where leashed pets are welcome to join you on your aquatic adventure.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image18.png',
    link: "https://visitdetroit.com/directory/detroit-international-riverwalk/",
    linkText: "RiverWalk",
    text: "The Detroit RiverWalk is a picturesque destination for leisurely strolls with your furry friend. This pet-friendly path stretches along the Detroit River, offering stunning views of the city skyline. You and your pet can take in the fresh air, bask in the sunshine, and maybe even catch a glimpse of passing boats and wildlife.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image4.png',
    link: "https://www.caninetofive.com/",
    linkText: "Canine to Five Detroit",
    text: "If your pet loves socializing with other dogs, a visit to Canine to Five Detroit is a must. This dog daycare and boarding facility features indoor and outdoor play areas, providing a safe and fun environment for your furry friend to make new pals and burn off some energy.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image3.png',
    link: "https://downtowndetroit.org/experience-downtown/things-to-do/dog-park/",
    linkText: "Detroit Dog Park",
    text: "Located in Corktown, the Detroit Dog Park is a dedicated off-leash area where dogs can run, play, and interact with other canines freely. With separate sections for small and large dogs, this park ensures that every pup can enjoy a pawsome time.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image2.png',
    link: "https://www.wheelhousedetroit.com/",
    linkText: "Wheelhouse Detroit",
    text: "For a unique adventure, rent a bike from Wheelhouse Detroit and take your leashed pup on a cycling tour. Explore the city's vibrant neighborhoods, pedal along the Dequindre Cut Greenway, and enjoy the sights and sounds of Detroit together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/Dequindre%20Cut%20Greenway.jpeg',
    link: "https://detroitriverfront.org/riverfront/dequindre-cut/dequindre-cut",
    linkText: "Dequindre Cut Greenway",
    text: "The Dequindre Cut Greenway is a dog-friendly urban trail that provides a safe and scenic route for walking, jogging, and biking. Surrounded by street art and greenery, this converted railway path is a delightful way to explore Detroit with your pet.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image15.png',
    link: "https://detroitfleat.com/",
    linkText: "Detroit Fleat",
    text: "Indulge in a culinary adventure at Detroit Fleat, a food truck park with pet-friendly outdoor seating. Savor a variety of delectable dishes from different food trucks while your pet relaxes by your side. Some food trucks even offer pet-friendly treats for your furry companion!",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image7.png',
    link: "https://easternmarket.org/",
    linkText: "Eastern Market",
    text: "Bring your leashed pet along for a visit to Eastern Market, one of the largest and oldest public markets in the United States. Explore the bustling stalls, grab some fresh produce, and enjoy the vibrant atmosphere of this pet-friendly destination.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image10.png',
    link: "https://www.facebook.com/bowwowbakeshoppe/",
    linkText: "Bow Wow Baketique",
    text: "Bow Wow Baketique is a charming pet boutique that caters to the pampered pets of Detroit, providing a delightful array of high-quality treats, accessories, and pet-friendly products. With a keen focus on style and well-being, Bow Wow Baketique offers a curated selection that lets pet owners indulge their furry companions in a whimsical and health-conscious way.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/Dodge%20Park.jpeg',
    link: "https://www.sterlingheights.gov/facilities/facility/details/Dodge-Park-11",
    linkText: "Dodge Park",
    text: "Dodge Park in Detroit warmly welcomes furry companions, offering a dog-friendly haven where both canines and their owners can enjoy the outdoors. With ample green spaces and designated areas for off-leash play, Dodge Park provides an ideal spot for dogs to socialize and stretch their legs",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image12.png',
    link: "https://www.theskipdetroit.com/",
    linkText: "The Skip",
    text: "Located in the heart of downtown Detroit, The Skip is a trendy and pet-friendly outdoor bar. With its vibrant atmosphere and handcrafted cocktails, this urban oasis offers the perfect setting to enjoy a drink or two with your furry companion by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image20.png',
    link: "https://www.batchbrewingcompany.com/",
    linkText: "Batch Brewing Company",
    text: "Craft beer enthusiasts and pet owners can rejoice at Batch Brewing Company. This pet-friendly brewery offers a fantastic selection of locally brewed beers and a diverse menu of delicious food. Enjoy a relaxed evening on the patio with your furry friend as you savor the flavors of Detroit.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image5.png',
    link: "https://mercuryburgerbar.com/",
    linkText: "Mercury Burger Bar",
    text: "Craving a juicy burger? Look no further than Mercury Burger Bar, a pet-friendly spot in Corktown. Their delectable burgers and extensive selection of craft beers make for a satisfying meal, and your furry friend can join you on the outdoor patio.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image6.png',
    link: "https://bobcatbonnies.com/",
    linkText: "Bobcat Bonnie's",
    text: "With locations in Corktown and Wyandotte, Bobcat Bonnie's is a pet-friendly gastropub that offers a diverse menu with something for everyone. From brunch to dinner, you and your furry companion can enjoy the laid-back atmosphere and delicious food.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/JollyPumpkin%20.jpg',
    link: "https://detroit.jollypumpkin.com/",
    linkText: "Jolly Pumpkin Pizzeria & Brewery",
    text: "If you're a fan of craft beer and wood-fired pizzas, Jolly Pumpkin Pizzeria & Brewery is a must-visit pet-friendly spot. Located in Midtown, this restaurant boasts a pet-friendly patio where you can indulge in gourmet pizzas and a wide selection of artisanal beers.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/Dequindre%20Cut%20Greenway.jpeg',
    link: "mudgiesdeli.com/wp/",
    linkText: "Mudgie's Deli",
    text: "For sandwich lovers, Mudgie's Deli in Corktown is a top choice. This pet-friendly eatery offers a diverse range of sandwiches and craft beers, all of which you can savor with your furry friend on their outdoor patio.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/Atwater%20Brewery.jpeg',
    link: "https://www.atwaterbeer.com/",
    linkText: "Atwater Brewery" ,
    text: "Atwater Brewery is a well-known Detroit brewery with a pet-friendly outdoor seating area. Enjoy a cold brew with your pup by your side as you take in views of the Detroit River and the city's skyline.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/Congregation%20Detroit.webp',
    link: "https://thecongregationdetroit.com/",
    linkText: "Congregation Detroit",
    text: "Congregation Detroit is a captivating cocktail bar in the heart of the city, known for its inventive mixology and stylish ambiance. With a focus on craft cocktails and a rotating menu inspired by the seasons, Congregation Detroit offers a sophisticated yet inviting space for locals and visitors to gather and enjoy exceptional drinks in a vibrant setting.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image1.png',
    link: "https://stillonmain.com/",
    linkText: "Charle’s Still on Main",
    text: "Charlie's Still on Main in Detroit extends its warm welcome to four-legged friends, creating a pet-friendly environment where both humans and their companions can relish in the pub's inviting atmosphere and delectable offerings.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Detroit/image17.png',
    link: "https://www.detroitshippingcompany.com/",
    linkText: "Detroit Shipping Company",
    text: "Detroit Shipping Company is a vibrant and innovative culinary collective in Detroit, housed within repurposed shipping containers. This dynamic space brings together a diverse range of food vendors, a beer garden, and entertainment options, creating a lively hub that reflects Detroit's creative and communal spirit.",
  },
];

const city = 'Detroit'
const state = 'MI';
const stateFull = 'MICHIGAN';
const cityAndState = `${city}, ${state}`;

const Detroit: FC = () => {
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

export default Detroit;
