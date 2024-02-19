import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Chicago, IL, USA",
    "matched_substrings": [
        {
            "length": 7,
            "offset": 0
        }
    ],
    "place_id": "ChIJ7cv00DwsDogRAMDACa2m4K8",
    "reference": "ChIJ7cv00DwsDogRAMDACa2m4K8",
    "structured_formatting": {
        "main_text": "Chicago",
        "main_text_matched_substrings": [
            {
                "length": 7,
                "offset": 0
            }
        ],
        "secondary_text": "IL, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Chicago"
        },
        {
            "offset": 9,
            "value": "IL"
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
  "lat": 41.8781136,
  "lng": -87.6297982
}

const singleLoadListingCards = [
  {
    hotelName:  "100159836",
    paragraphs:  [
      "The Gwen, a Luxury Collection Hotel, is a refined and opulent oasis nestled in the heart of downtown Chicago. Boasting an exquisite blend of modern sophistication and timeless elegance, The Gwen offers an unparalleled experience for discerning travelers.",
      //"The Gwen also offers an array of amenities, including a rooftop terrace with breathtaking views of the city skyline, a state-of-the-art fitness center, and world-class dining options. Upon arrival, your pet will receive a warm welcome with special treats, a cozy bed, and bowls for food and water. The hotel's central location allows for easy access to pet-friendly attractions, parks, and walking paths, making it a top choice for pet owners seeking convenience and style.",
      //"The Gwen, a Luxury Collection Hotel is pet-friendly and allows pets up to 40 pounds for a fee of $125 per stay.",
      "Upon arrival, your pet will receive a warm welcome with special treats, a cozy bed, and bowls for food and water. The hotel's central location allows for easy access to pet-friendly attractions, parks, and walking paths, making it a top choice for pet owners seeking convenience and style."
    ]
  },
  {
    hotelName: "100290782",
    paragraphs: [
      "Kimpton Hotel Monaco Chicago is a luxurious and pet-friendly hotel located in the heart of downtown Chicago. As part of the renowned Kimpton Hotels group, the Monaco offers a sophisticated and inviting ambiance that caters to both human guests and their furry companions.",
      //"As part of the renowned Kimpton Hotels group, the Monaco is renowned for its pet-friendly policies. They offer a &quot;VIPaws&quot; program, ensuring that your pet receives royal treatment during their stay. The hotel provides pet beds, food, and water bowls, and even has a concierge available to assist with pet sitting, dog walking, and grooming arrangements. Furthermore, there are no size or weight restrictions on pets, making this hotel an excellent choice for travelers with larger breeds.",
      "Kimpton Hotel Monaco Chicago is pet-friendly and there are no size or weight restrictions for pets, making it an ideal choice for all pet owners. The hotel provides pet beds, food and water bowls, and even offers pet sitting, dog walking, and grooming services. With its central location, guests can easily explore the city's vibrant attractions and return to the hotel's elegant and comfortable rooms after a day of adventure."
    ],
  },
  {
    hotelName: "100047378",
    paragraphs: [
      "The Royal Sonesta Chicago River North is a very pet-friendly hotel located in the heart of Chicago. This urban retreat is a beautiful hotel, where luxury and modernity converge. The hotel features a gorgeous indoor swimming pool, a spacious indoor sundeck for lounging, a modern and buzzing lobby bar, and many pet-friendly offerings.",
      //"The Royal Sonesta Chicago River North is perfectly located for walks with your pet along the river, shopping at the numerous pet-friendly shops in River North, and tons of outdoor patios for dining with your pet. The Royal Sonesta Chicago River North also offers a pet-friendly welcome program, which welcomes your pet with beds, bowls, and treats upon arrival.",
      "The hotel welcomes 2 pets per reservation with a one-time non-refundable fee of $75.00 per stay. Included in this fee is the use of pet beds, bowls, and treats. Additionally, there is ample pet relief space within walking distance from the hotel."
    ],
  },
  {
    hotelName: "100421862",
    paragraphs: [
      "Hotel Lincoln is a charming and pet-friendly boutique hotel located in the vibrant Lincoln Park neighborhood of Chicago. With its eclectic and whimsical design, the hotel captures the essence of the neighborhood's artistic and lively atmosphere. Beyond the cozy accommodations, guests can enjoy stunning views of Lake Michigan from the rooftop bar, indulge in delicious cuisine at the on-site restaurants, and easily access nearby parks and attractions.",
      "Hotel Lincoln is pet-friendly and allows you to bring two pets of any size for no additional fee."
    ],
  },
  {
    hotelName: "100136199",
    paragraphs: [
      "Aloft Chicago Mag Mile is a trendy and pet-friendly hotel located in the heart of Chicago's Magnificent Mile. The hotel's prime location allows for easy access to the city's renowned shopping, dining, and entertainment options, while its pet-friendly policies ensure that your furry friend can join in on the fun.",
      // "Aloft Chicago Mag Mile is pet-friendly and allows you to bring pets that weigh up to 40 pounds for no additional fee.",
      'Upon arrival, pets receive a warm welcome with the "ARF" (Animals Are Fun) program, which includes pet beds, food and water bowls, and a complimentary pet toy. There are no size or weight restrictions for pets, making Aloft a fantastic option for all pet owners.'
    ],
  },
  {
    hotelName: "100026030",
    paragraphs: [
      "The Westin Chicago River North is an upscale and pet-friendly hotel situated in the heart of downtown Chicago, overlooking the scenic Chicago River. With its sophisticated and contemporary design, the hotel offers a luxurious retreat.",
      //"The Westin offers an array of amenities, including a fitness center, a rooftop bar with stunning city views, and a delicious on-site restaurant. Its central location grants easy access to popular attractions and pet-friendly parks.",
      "The Westin Chicago River North is pet-friendly and allows you to bring one dog that weighs up to 35 pounds for no additional fee."
    ],
  },
  {
    hotelName: "100431386",
    paragraphs: [
      "The W Chicago - Lakeshore is a luxurious and stylish hotel nestled along the scenic shores of Lake Michigan in Chicago, Illinois. Boasting a prime location, this upscale hotel offers breathtaking views of the iconic Navy Pier and the city skyline.",
      //"The hotel's amenities are equally impressive, with a fitness center offering cutting-edge equipment and a serene spa where guests can indulge in rejuvenating treatments. The on-site dining options are second to none, with a stylish rooftop lounge providing delicious cocktails and panoramic views of the lake and city lights.",
      "W Chicago - Lakeshore is pet-friendly and allows you to bring up to two pets per room for a $100 fee, plus a $25 nightly fee per pet."
    ],
  }
];

const paragraphs = [
  [
    "Chicago is an ideal destination for pet-friendly travel, offering a plethora of activities and accommodations that cater to our beloved four-legged companions. The city boasts numerous parks and green spaces, such as the iconic Millennium Park and Grant Park, where dogs can run off-leash and socialize with other pups.",
    "For a more scenic experience, pet owners can take their furry friends on leisurely strolls along the picturesque Lakefront Trail, providing breathtaking views of Lake Michigan. Chicago&apos;s vibrant restaurant scene extends its hospitality to pets, with many cafes and eateries featuring pet-friendly outdoor seating areas. Moreover, several hotels and accommodations throughout the city warmly welcome pets, ensuring a comfortable stay for both humans and their animal companions.",
  ],
  [
    "Whether exploring the Magnificent Mile, visiting the Navy Pier, or simply enjoying the city&apos;s welcoming atmosphere, Chicago&apos;s dedication to pet-friendly amenities makes it an excellent destination for travelers seeking to share their adventures with their loyal pets.",
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
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/The%20Doc%20at%20Montrose%20Beach.webp',
    link: "https://www.mondog.org/",
    linkText: "Montrose Dog Beach",
    text: "Located on the shores of Lake Michigan, Montrose Dog Beach is a haven for dogs who love to swim and socialize. This sandy paradise provides a designated off-leash area where dogs can frolic in the water and play fetch to their heart's content. It's the perfect spot to meet other canine friends and for you to enjoy the stunning lakefront views.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image19.png',
    link: "https://www.choosechicago.com/neighborhoods/lincoln-park/",
    linkText: "Lincoln Park",
    text: "This sprawling urban oasis is a must-visit for any pet owner. The Lincoln Park neighborhood offers vast green spaces and scenic trails that are ideal for leisurely walks with your furry companion. Make sure to visit the Alfred Caldwell Lily Pool and the North Avenue Beach, both of which are pet-friendly and offer beautiful surroundings for a day out with your pet.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image1.png',
    link: "https://navypier.org/",
    linkText: "Navy Pier",
    text: "Experience the iconic Navy Pier with your pet by your side. While pets are not allowed inside the buildings, leashed dogs are welcome to stroll the outdoor promenade and enjoy the bustling atmosphere. The pier also hosts pet-friendly events from time to time, so keep an eye out for special occasions that you and your furry friend can participate in.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image18.png',
    link: "https://www.the606.org/",
    linkText: "606 Trail",
    text: "Formerly a railway line, the 606 Trail has been transformed into an elevated park and trail system, stretching through several neighborhoods. Leashed dogs are welcome to join you as you walk, jog, or bike along this scenic path, offering a unique perspective of the city from above.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/Lincoln-Park-Chicago-Wiggly-Field-Dog-Park-1024x768.jpg',
    link: "https://www.chicagoparkdistrict.com/parks-facilities/noethling-grace-park",
    linkText: "Wiggly Field Dog Park",
    text: "Situated in the Lincoln Park neighborhood, Wiggly Field Dog Park is a dedicated off-leash area where your dog can run, play, and socialize safely. The park features separate enclosures for small and large dogs, ensuring a positive experience for pets of all sizes.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image11.png',
    link: "https://www.themagnificentmile.com/explore/listing/mercurys-canine-cruise",
    linkText: "Canine Cruise",
    text: "Treat your pup to a boat tour with Mercury's Canine Cruise. This pet-friendly boat ride allows leashed dogs to accompany their owners as they cruise along the Chicago River and Lake Michigan. Enjoy the city's impressive architecture while your furry friend takes in the refreshing breeze.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/Fido%20on%20the%20Go.jpeg',
    link: "https://fidotogo.net/",
    linkText: "Fido to Go",
    text: "When hunger strikes, head over to Fido to Go, a food truck specifically designed for dogs. This gourmet dog treat truck offers a variety of delicious and healthy snacks, from frozen yogurt to homemade dog biscuits. It's the perfect pit stop to pamper your pet during your adventures.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/Jackson%20Bark.jpeg',
    link: "http://www.jacksonbark.com/",
    linkText: "Jackson Bark",
    text: "Located in the Jackson Park neighborhood, Jackson Bark is a unique dog park that combines fitness with play. With agility equipment and an obstacle course, dogs can enjoy an active and engaging experience, making it an excellent choice for energetic pups.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/Movies%20in%20the%20Park.jpeg',
    link: "https://www.chicagoparkdistrict.com/movies-parks",
    linkText: "Movies in the Park",
    text: 'During the summer months, Chicago hosts "Movies in the Park" events throughout the city. Many of these outdoor movie screenings are pet-friendly, so bring a blanket, some treats, and enjoy a movie night under the stars with your furry companion by your side.',
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image8.png',
    link: "https://chicago.eater.com/maps/dog-friendly-chicago-bars-restaurants",
    linkText: "Pet-Friendly Patios",
    text: "Chicago's food scene is renowned, and the good news is that many restaurants with outdoor seating welcome pets. Numerous cafes, bars, and eateries have pet-friendly patios where you can enjoy a meal or a refreshing drink with your furry friend right beside you.",
  },
]

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image6.png',
    link: "https://www.parsonschickenandfish.com/",
    linkText: "Parson's Chicken & Fish",
    text: "Situated in the Logan Square neighborhood, Parson's is a hip and inviting spot known for its fried chicken, fish, and refreshing cocktails. The restaurant's spacious outdoor patio is pet-friendly, providing water bowls and treats to pamper your pet while you savor their mouthwatering dishes.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image17.png',
    link: "https://www.thedockatmontrosebeach.com/",
    linkText: "The Dock at Montrose Beach",
    text: "Overlooking Lake Michigan, The Dock is a hidden gem located on Montrose Beach. This beachside eatery offers a pet-friendly patio where you can enjoy seafood delights, sandwiches, and refreshing drinks with your furry companion by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/3%20Arts%20Club.jpeg',
    link: "",
    linkText: "3 Arts Club Café",
    text: "Tucked within the luxurious Restoration Hardware store in the Gold Coast neighborhood, 3 Arts Club Café welcomes pets on its enchanting outdoor patio. The elegant setting and delectable Mediterranean-inspired cuisine create a charming dining experience for both you and your pet.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image7.png',
    link: "https://www.thewarblerchicago.com/",
    linkText: "The Warbler",
    text: "A neighborhood favorite in Lincoln Square, The Warbler boasts a pet-friendly patio where you can indulge in New American cuisine with your pet at your feet. Their diverse menu and accommodating atmosphere make it an ideal spot for a casual dining experience.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image4.png',
    link: "https://www.cafebabareeba.com/",
    linkText: "Café Ba-Ba-Reeba!",
    text: "If you're craving Spanish tapas and an authentic experience, head to Café Ba-Ba-Reeba! in Lincoln Park. Their lively patio welcomes pets, and they even offer a special &quot;Canine Cuisine&quot; menu with treats and water bowls for your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image2.png',
    link: "https://parkandfieldchicago.com/",
    linkText: "Park & Field",
    text: "This Logan Square gastropub features an expansive outdoor space perfect for pets and their owners. Enjoy a relaxed evening on the pet-friendly patio while feasting on their delicious comfort food and sipping craft cocktails.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image13.png',
    link: "https://www.cafetola.com/",
    linkText: "Café Tola",
    text: "Located in the Lakeview neighborhood, Café Tola is a charming café known for its empanadas and delicious coffee. The pet-friendly outdoor seating area allows you to enjoy your meal with your furry friend, making it an excellent choice for a quick and tasty bite.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image16.png',
    link: "http://www.crosbyschicago.com/",
    linkText: "Crosby's Kitchen",
    text: "Crosby's Kitchen in Lakeview is a family-friendly restaurant with a pet-friendly patio. They offer a diverse menu, including rotisserie chicken, burgers, and salads, ensuring there's something for everyone, including your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Chicago/image5.png',
    link: "https://thegagechicago.com/",
    linkText: "The Gage",
    text: "Situated in the heart of downtown, The Gage is a gastropub with an inviting outdoor patio that welcomes pets. Known for its upscale pub fare and extensive beer selection, this restaurant provides an excellent dining experience for pet owners exploring the city.",
  },
];

const city = 'Chicago'
const state = 'IL';
const stateFull = 'ILLINOIS';
const cityAndState = `${city}, ${state}`;

const Chicago: FC = () => {
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

export default Chicago;
