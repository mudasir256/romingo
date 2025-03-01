import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Milwaukee, WI, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        }
    ],
    "place_id": "ChIJ50eLV9cCBYgRhHtBtSIZX0Q",
    "reference": "ChIJ50eLV9cCBYgRhHtBtSIZX0Q",
    "structured_formatting": {
        "main_text": "Milwaukee",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "WI, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Milwaukee"
        },
        {
            "offset": 11,
            "value": "WI"
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
"lat": 43.0389025,
"lng": -87.9064736
}

const singleLoadListingCards = [
  {     
    hotelName: "100186590",
    paragraphs: [
      "The Kimpton Journeyman Hotel stands as a distinctive and captivating destination for modern travelers seeking an authentic and enriching experience in the heart of Milwaukee. Nestled within the vibrant Historic Third Ward district, this boutique hotel seamlessly blends contemporary design with the neighborhood's historic charm. The Journeyman Hotel prides itself on creating a warm and welcoming atmosphere, where guests are greeted with personalized service and a sense of belonging.",
     // "Its well-appointed rooms and suites provide a comfortable haven, while the hotel's rooftop bar and lounge offer breathtaking views of the city skyline, allowing visitors to unwind in style. With its dedication to sustainability, culinary excellence, and a genuine connection to the local community, the Kimpton Journeyman Hotel offers more than accommodation; it offers an exceptional journey for the modern explorer.",
      "Kimpton Journeyman Hotel is pet-friendly and allows pets of all sizes for no extra charge. "
    ]
  },
  {
    hotelName: "100432980",
    paragraphs: [
      "The Iron Horse Hotel stands as an iconic and rugged haven for travelers in the heart of Milwaukee, Wisconsin. With a unique blend of industrial charm and contemporary luxury, this boutique hotel captures the essence of the city's history while catering to modern sensibilities. Nestled in the historic Third Ward district, The Iron Horse Hotel offers a distinctive experience where motorcycle enthusiasts, business travelers, and leisure seekers can all find a welcoming sanctuary.",
     // "The hotel's on-site restaurant and bar serve up delectable cuisine and craft cocktails, fostering a vibrant social atmosphere. Whether relaxing in the inviting courtyard or exploring the nearby attractions, The Iron Horse Hotel offers a unique blend of grit and elegance that truly embodies the spirit of Milwaukee.",
      "The Iron Horse Hotel is pet-friendly and there is no charge to bring your pets. However, there are incidental fees if there are any damages or incidents on the property."
    ]
  },
  {
    hotelName: "100193466",
    paragraphs: [
      "The Westin Milwaukee stands as a beacon of modern sophistication and comfort in the heart of downtown Milwaukee, Wisconsin. With its sleek and contemporary design, this upscale hotel offers a tranquil retreat for both business and leisure travelers. Boasting stunning views of the cityscape and Lake Michigan, The Westin Milwaukee provides a serene escape from the bustling urban surroundings.",
    //  "The hotel's commitment to wellness shines through its fitness center, allowing guests to maintain their routines even while traveling. Additionally, the on-site dining options provide a culinary journey that caters to diverse palates. With its prime location near the city's cultural attractions, The Westin Milwaukee offers a seamless blend of luxury and convenience for a truly elevated stay experience.",
      "The Westin Milwaukee is pet-friendly and allows dogs that weigh up to 75 pounds for no additional fee."
    ]
  },
  {
    hotelName: "100009908",
    paragraphs: [
      "Aloft Milwaukee Downtown brings a vibrant and contemporary vibe to the heart of downtown Milwaukee, Wisconsin. This modern hotel offers a refreshing and energetic atmosphere, appealing to travelers seeking a dynamic urban experience. With its loft-inspired design, the Aloft Milwaukee Downtown exudes a sense of creativity and innovation, from its open spaces to its tech-forward amenities. ",
      //"The W XYZ Bar serves as a lively hub for both visitors and locals, offering craft cocktails and live music. The hotel's prime location puts guests within easy reach of the city's cultural attractions, making it an ideal base for exploration. With its contemporary charm and youthful spirit, Aloft Milwaukee Downtown offers a fresh perspective on hospitality, appealing to those seeking a dynamic and memorable stay.",
      "Aloft Milwaukee Downtown is pet-friendly and allows two pets that weigh up to 40 pounds for no additional fee."
    ]
  },
  {
    hotelName: "100437150",
    paragraphs: [
      "The Hyatt Regency Milwaukee stands as a pillar of elegance and convenience in the heart of downtown Milwaukee, Wisconsin. Boasting a seamless blend of modern luxury and warm hospitality, this upscale hotel offers a refined sanctuary for both business and leisure travelers. ",
     // "The Hyatt Regency Milwaukee is renowned for its exceptional event spaces, making it a preferred choice for conferences, weddings, and other special occasions. With a commitment to culinary excellence, the hotel's dining options showcase a range of flavors to satisfy diverse palates. The prime location allows guests to easily access the city's attractions, entertainment, and business districts. Whether indulging in relaxation at the indoor pool or enjoying skyline views from the elegant lounge, the Hyatt Regency Milwaukee offers a harmonious blend of luxury and functionality, making it a premier destination for discerning travelers.",
      "Hyatt Regency Milwaukee is pet-friendly and allows you to bring two dogs that weigh up to 150 pounds for a fee of $40 per night."
    ]
  },
  {
    hotelName: "100202334",
    paragraphs: [
      "The Hilton Milwaukee City Center stands as a timeless landmark in the heart of downtown Milwaukee, Wisconsin. With its classic architecture and modern amenities, this historic hotel offers a seamless fusion of elegance and contemporary comfort. Boasting a rich history of hosting dignitaries and events, the Hilton Milwaukee City Center features well-appointed guest rooms and suites that provide a luxurious haven for travelers. Its extensive event spaces make it a preferred choice for conferences, weddings, and gatherings of all sizes. Guests can savor a range of culinary experiences at the hotel's dining venues, each offering a distinct atmosphere and delectable cuisine. ",
      // "The hotel's central location offers easy access to the city's cultural attractions, entertainment, and business districts. Whether relaxing by the indoor pool, unwinding in the inviting lobby, or admiring the stunning city views from the rooftop bar, the Hilton Milwaukee City Center offers a timeless blend of sophistication and modernity, ensuring an exceptional stay for every guest.",
      "Hilton Milwaukee City Center is pet-friendly and allows you to bring two pets that weigh up to 75 pounds for a fee of $50 per stay."
    ]
  },
];

const paragraphs = [
  [
    "Milwaukee, known for its vibrant culture and scenic landscapes, is an ideal destination for pet-friendly travel enthusiasts. This charming city along the shores of Lake Michigan warmly welcomes four-legged companions, making it a haven for pet owners seeking unforgettable experiences with their furry friends. Whether exploring the picturesque Milwaukee Riverwalk, strolling through the pet-friendly parks like Estabrook Park or Grant Park, or enjoying a day at the dog-friendly Bradford Beach, there are endless opportunities for pets to stretch their paws and soak up the fresh air.",
    "Many cafes, restaurants, and breweries offer pet-friendly outdoor seating, allowing travelers to relish in Milwaukee&apos;s delectable culinary scene while keeping their pets by their side. Additionally, pet-friendly accommodations such as hotels and vacation rentals ensure a comfortable stay for both humans and their beloved pets. Embracing a pet-friendly ethos, Milwaukee guarantees an unforgettable adventure filled with cherished memories for all members of the family, including the four-legged ones."
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
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/Estabrook_Park_dog_park.jpeg',
    link: "https://county.milwaukee.gov/EN/Parks/Explore/Dog-Parks",
    linkText: "Estabrook Park Dog Park",
    text: "Treat your dog to a day of off-leash fun at the Estabrook Park Dog Park. This well-maintained and spacious area allows your furry friend to socialize and romp freely with other dogs. With separate sections for small and large dogs, it ensures a safe and enjoyable experience for all.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image17.png',
    link: "https://city.milwaukee.gov/DCD/Projects/RiverWalk",
    linkText: "Milwaukee Riverwalk",
    text: "Take a leisurely stroll along the picturesque Milwaukee Riverwalk, which welcomes leashed pets. The beautiful views of the river and the city's skyline provide an excellent backdrop for a relaxing walk with your furry friend.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image8.png',
    link: "https://county.milwaukee.gov/EN/Parks/Explore/Lakefront/McKinley-Marina",
    linkText: "McKinley Marina and Beach",
    text: "If your pet enjoys a day by the water, head to McKinley Marina and Beach. Leashed dogs are welcome to join you as you explore the waterfront, and they can even dip their paws in Lake Michigan on the pet-friendly section of the beach.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image14.png',
    link: "https://www.southshoreterrace.com/",
    linkText: "South Shore Terrace Beer Garden",
    text: "This pet-friendly beer garden welcomes well-behaved dogs in their outdoor seating area. Relax with a cold beverage while your pet lounges by your side and enjoys the outdoor ambiance.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/Oak%20Leaf%20Trail.jpeg',
    link: "https://county.milwaukee.gov/EN/Parks/Explore/Trails/Oak-Leaf-Trail",
    linkText: "Oak Leaf Trail",
    text: "For a more extensive adventure, explore the Oak Leaf Trail, a multi-use trail that spans throughout the city. Leashed pets are allowed, and the trail offers a diverse range of landscapes to discover together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/Boerner%20Botanical%20Gardens.jpeg',
    link: "https://county.milwaukee.gov/EN/Parks/Explore/Boerner-Botanical-Gardens",
    linkText: "Boerner Botanical Gardens",
    text: "While pets aren't allowed inside the buildings, leashed dogs can explore the stunning outdoor gardens at Boerner Botanical Gardens. This is a great place for a leisurely walk surrounded by beautiful flora.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image2.png',
    link: "https://www.thevalleymke.org/three-bridges-park",
    linkText: "three Bridges Park",
    text: "Three Bridges Park is a dog-friendly park with walking trails and three unique bridges to cross. Enjoy the natural beauty of the park and let your pet stretch their legs.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image19.png',
    link: "https://www.milwaukeemag.com/where-to-drink-with-your-dog-in-milwaukee/",
    linkText: "Pet-Friendly Brewery Tours",
    text: "Milwaukee is famous for its breweries, and some of them are pet-friendly! Check out breweries like Lakefront Brewery or Good City Brewing, where leashed pets are welcome in designated areas.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/Brady%20Street.jpeg',
    link: "https://bradystreet.org/",
    linkText: "Brady Street",
    text: "Take a stroll along Brady Street, a vibrant and pet-welcoming neighborhood. Many cafes and shops offer pet-friendly outdoor seating, so you can grab a bite to eat or do some shopping with your furry friend by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image12.png',
    link: "https://milwaukeepedalandpaddletavern.com/paddle/",
    linkText: "Paddle Tavern Cruise",
    text: "Experience Milwaukee from a unique perspective on a Paddle Tavern Cruise. These pet-friendly boat tours allow leashed dogs onboard, so your pet can enjoy the breeze as you pedal along the river.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/Cafe%CC%81%20Benelux.webp',
    link: "https://cafebenelux.com/",
    linkText: "Café Benelux",
    text: "Located in the Historic Third Ward, Café Benelux is a popular spot that offers a pet-friendly outdoor seating area. Indulge in their Belgian-inspired cuisine while your pet relaxes beside you, taking in the bustling atmosphere of the neighborhood.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image7.png',
    link: "https://www.artbarwonderland.com/",
    linkText: "Art Bar & Wonderland",
    text: "Art Bar & Wonderland is a one-of-a-kind establishment nestled in the vibrant city of Milwaukee, Wisconsin. This creative haven seamlessly blends an art gallery with a lively bar, creating a unique and engaging space for both locals and visitors.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image6.png',
    link: "https://www.campbarmke.com/third-ward",
    linkText: "Camp Bar Third Ward",
    text: "This cozy bar in the Third Ward neighborhood allows dogs on its outdoor patio. Camp Bar offers a selection of beverages and pub-style fare, making it an excellent spot to unwind with your pet after exploring the city.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image10.png',
    link: "https://cafehollander.com/",
    linkText: "Café Hollander",
    text: "With multiple locations in Milwaukee, Café Hollander is a dog-friendly restaurant chain that serves a delightful selection of Belgian-inspired dishes. Your pet will feel right at home in their outdoor seating areas.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image13.png',
    link: "https://lakefrontbrewery.com/beer-hall/food",
    linkText: "Lakefront Brewery Beer Hall",
    text: "Enjoy the laid-back atmosphere and craft beers at Lakefront Brewery Beer Hall, where pets are welcome in their spacious outdoor beer garden.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image16.png',
    link: "https://outsiderrooftop.com/",
    linkText: "The Outsider at Kimpton Journeyman Hotel",
    text: "The Outsider is a stylish rooftop bar and restaurant that welcomes pets on their rooftop patio. Savor the panoramic views of the city while your furry friend enjoys the fresh air.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/Cafe%CC%81%20Corazon%20.jpeg',
    link: "https://corazonmilwaukee.com/",
    linkText: "Café Corazon",
    text: "This vibrant Mexican restaurant has two pet-friendly locations in Milwaukee. Their patios are perfect for a relaxing meal with your pet while enjoying delicious Mexican cuisine.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image3.png',
    link: "https://shepherdexpress.com/locations/oscar-s-pierce/",
    linkText: "Oscar's On Pierce",
    text: "Oscar's On Pierce is a pet-friendly burger joint with a quirky atmosphere. Dine on their outdoor patio with your furry friend while savoring their mouthwatering burgers and milkshakes.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image4.png',
    link: "https://hubbardparklodge.com/",
    linkText: "Hubbard Park Lodge",
    text: "Set in the scenic Hubbard Park, this lodge offers a pet-friendly patio where you can enjoy a delightful brunch or dinner with your pet amid nature's beauty.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Milwaukee/image9.png',
    link: "https://threelionspub.com/",
    linkText: "Three Lions Pub",
    text: "Located in the East Side neighborhood, Three Lions Pub allows dogs on their outdoor patio. This British-inspired pub offers a range of beers and classic pub fare for you to enjoy with your pet.",
  },
];

const city = 'Milwaukee';
const state = 'WI';
const stateFull = 'WISCONSIN';
const cityAndState = `${city}, ${state}`;

const Milwaukee: FC = () => {
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

export default Milwaukee;
