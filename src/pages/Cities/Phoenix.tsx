import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Phoenix, AZ, USA",
    "matched_substrings": [
        {
            "length": 7,
            "offset": 0
        }
    ],
    "place_id": "ChIJy3mhUO0SK4cRrBtKNfjHaYw",
    "reference": "ChIJy3mhUO0SK4cRrBtKNfjHaYw",
    "structured_formatting": {
        "main_text": "Phoenix",
        "main_text_matched_substrings": [
            {
                "length": 7,
                "offset": 0
            }
        ],
        "secondary_text": "AZ, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Phoenix"
        },
        {
            "offset": 9,
            "value": "AZ"
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
  "lat": 33.4483771,
  "lng": -112.0740373
}

const singleLoadListingCards = [
  {
    hotelName: "102262943", 
    paragraphs: [
      "Immerse yourself in the vibrant heart of downtown Phoenix at the pet-friendly Hyatt Place Phoenix Downtown. They welcome up to two dogs (with a combined weight of up to 100 lbs) for an additional fee of $100 per stay.",
      "This modern hotel seamlessly blends contemporary comfort with unparalleled convenience, guaranteeing a delightful sojourn for both you and your furry companion. Enchant your canine friend with outdoor playtime and socialization in the nearby friendly dog park, nestled amidst the energetic cityscape."
    ]
  },
  {
    hotelName: "100398890", 
    paragraphs: [
      "Embrace a cozy retreat at Sonesta Simply Suites Phoenix North, where pets are embraced with open arms. Sonesta Simply Suites is pet-friendly and welcomes well-mannered pets, with no breed or weight restrictions. Up to two pets are permitted per suite. A $75 fee applies for stays up to 7 nights; $150 for all longer stays.",
      "The generously proportioned suites are thoughtfully designed to ensure your relaxation and well-being. Unleash your pet's playful spirit at the neighboring dog park, where they can stretch their legs and mingle with other four-legged companions."
    ]
  },
  {
    hotelName: "100029082",
    paragraphs: [
      "Immerse yourself in the lap of luxury at the sophisticated Kimpton Hotel Palomar Phoenix, where pets of any size are welcomed at no additional fee. This upscale hotel exudes elegance and charm, featuring stylishly appointed rooms and impeccable service.",
      "Revel in the presence of a nearby dog park, providing the perfect setting for outdoor adventures and delightful social interactions. Here, pets are treated to an experience that is nothing short of extraordinary, alongside their esteemed human counterparts."
    ] 
  },
  {
    hotelName: "100183450",
    paragraphs: [
      "Nestled in the Biltmore area, The Camby Hotel offers a chic and pet-friendly retreat. This upscale hotel allows dogs of all sizes and even provides a special &quot;Doggie&quot; menu, ensuring your pets are pampered during their stay. With beautiful views of Camelback Mountain, The Camby Hotel is an ideal spot to explore nearby pet-friendly parks and trails.",
      "The Camby Hotel allows you to bring two pets up to 20 pounds for a fee of $100 per stay."
    ] 
  },
  {
    hotelName: "100433832", 
    paragraphs: [
      "Located in the heart of downtown Phoenix, the Sheraton Phoenix Downtown is a pet-friendly hotel that offers a central location for exploring the city. They allow dogs weighing up to 80 pounds and provide pet beds and water bowls to keep your pets comfortable throughout their stay."
    ]
  },
  {
    hotelName: "100218610", 
    paragraphs: [
      "At Comfort Inn and Suites Phoenix North - Deer Valley, you and your pet can revel in a comfortable and budget-friendly stay. For a nominal fee of $25 per night, you can bring along two pets, with a combined weight of up to 75 lbs each.",
      // "Rest assured knowing that your furry companion will find respite and solace in the cozy and inviting surroundings. Unleash their playful spirit at the nearby friendly dog park, where they can embark on thrilling explorations and engage in delightful social interactions.",
      "Phoenix opens its arms to both you and your cherished pet, providing a sanctuary where unforgettable moments and stress-free experiences await. From the contemporary allure of Hyatt Place Phoenix Downtown to the sophisticated charm of Kimpton Hotel Palomar Phoenix, the accommodation options cater to every preference."
    ]
  }
];

const paragraphs = [
  [
    "Phoenix captivates with year-round sunshine, stunning wide desert landscapes, and an active urban scene. From outdoor adventures amidst towering saguaro cacti to a thriving culinary Mexican restaurant and cultural scene, dog-friendly Phoenix offers a unique blend of natural beauty, urban sophistication, and Southwestern charm.",
  ],
  [
    'With easy access to awe-inspiring natural wonders and a wealth of family-friendly attractions, Phoenix is a destination that caters to diverse interests and leaves a lasting impression on visitors. The Grand Canyon is just one day trip away.',
    'Join us today as we explore some of the options in Phoenix, each providing a unique experience that places the comfort and happiness of your four-legged friend at the forefront.',
  ],
  [
    "Phoenix, Arizona, is a pet-friendly paradise that offers a plethora of activities for you and your four-legged companions to enjoy together. From exploring the great outdoors to indulging in pet-friendly dining experiences, there's no shortage of exciting adventures for you and your pets in this sunny desert city. Here are the ten best pet-friendly activities in Phoenix:",
  ],
  [
    "Before embarking on these pet-friendly activities, remember to bring along water, waste bags, and check the individual park or venue rules regarding pet policies. With these ten pet-friendly activities in Phoenix, you and your pets can create lasting memories and enjoy a truly unforgettable experience in the Valley of the Sun. So, leash up your furry friends, grab your sunscreen, and get ready for an adventure-filled journey together in Phoenix!",
  ],
  [
    "Phoenix, Arizona, is a city that loves its pets just as much as its food. With a wealth of pet-friendly restaurants, you can now enjoy delicious meals without leaving your furry companions behind. Whether you're looking for a cozy café, a trendy eatery, or a lively patio setting, Phoenix has something to satisfy both your taste buds and your pets' wagging tails. Here are ten pet-friendly restaurants in Phoenix that will make your dining experience a delightful one for the entire family:",
  ],
  [
    
  ],
];

const carouselOneData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image9.png',
    link: "https://www.alltrails.com/parks/us/arizona/echo-canyon-recreation-area",
    linkText: "Echo Canyon Trail and Recreation Area",
    text: "Take a hike with your leashed dogs at the Echo Canyon Trail and Recreation Area on Camelback Mountain. The trail offers stunning views of the city and surrounding desert landscapes, making it a fantastic adventure for both you and your pets.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image3.png',
    link: "https://www.phoenix.gov/parks/parks/dog-parks/steele-dog-park",
    linkText: "Steele Indian School Dog Park",
    text: "Let your pets off-leash to play and socialize with other furry friends at the Steele Indian School Dog Park. This spacious and well-maintained park features separate areas for small and large dogs, ensuring a safe and enjoyable experience for all.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image14.png',
    link: "https://www.visitphoenix.com/sonoran-desert/parks/papago-park/",
    linkText: "Papago Park",
    text: "Papago Park is a pet-friendly oasis with a variety of walking trails and scenic areas to explore. Take a leisurely stroll with your pets around the Desert Botanical Garden or visit the iconic Hole-in-the-Rock formation for breathtaking views.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/Roosevelt%20Row%20Art%20District.jpeg',
    link: "https://rooseveltrow.org/",
    linkText: "Roosevelt Row Arts District",
    text: "Visit the Roosevelt Row Arts District, where pets are welcome to explore the vibrant street art and local galleries. Many shops and cafes in this artsy neighborhood offer pet-friendly seating, making it a great spot for a pet-friendly stroll.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image4.png',
    link: "https://shopdesertridge.com/",
    linkText: "Desert Ridge Marketplace",
    text: "Shop 'til you drop with your pets at the Desert Ridge Marketplace. This outdoor shopping center welcomes leashed pets and even provides pet-friendly water stations throughout the area.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image20.png',
    link: "https://www.visitphoenix.com/sonoran-desert/parks/south-mountain-park-and-preserve/",
    linkText: "South Mountain Park and Preserve",
    text: "Explore the South Mountain Park and Preserve, one of the largest municipal parks in the United States. Leashed pets are welcome on most trails, allowing you to take in the stunning desert vistas together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/O.H.S.O%20Brewery%20%2B%20Distillery.webp',
    link: "https://www.ohsobrewery.com/",
    linkText: "O.H.S.O. Brewery + Distillery",
    text: "Enjoy a delicious meal or craft beer at O.H.S.O. Brewery, a pet-friendly establishment with a special dog-friendly patio. They even offer a &quot;Bark Bar&quot; menu with treats and water bowls for your furry companions.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image1.png',
    link: "https://www.visitphoenix.com/sonoran-desert/parks/phoenix-mountains-preserve/",
    linkText: "Piestewa Peak Park",
    text: "Embark on a challenging hike with your leashed dogs at Piestewa Peak Park. This popular spot offers several trails of varying difficulty levels, providing a rewarding experience for both you and your pets.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image6.png',
    link: "https://www.therailroadpark.com/",
    linkText: "McCormick-Stillman Railroad Park",
    text: "Head to the McCormick-Stillman Railroad Park, where pets are welcome in the park's open areas. Enjoy a leisurely picnic or take a ride on the mini-train with your furry friends by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/Eater%20Phoenix.jpeg',
    link: "https://phoenix.eater.com/maps/best-phoenix-dog-friendly-restaurants-bars",
    linkText: "Dog-Friendly Patio Dining",
    text: "Phoenix boasts a variety of pet-friendly restaurants with outdoor patios, such as Postino WineCafé and The Vig. Indulge in delicious meals while your pets lounge comfortably by your side.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image17.png',
    link: "https://www.thevig.us/",
    linkText: "The Vig",
    text: "The Vig is a popular spot known for its pet-friendly patios and lively atmosphere. With multiple locations throughout Phoenix, you and your pets can enjoy a diverse menu of modern American cuisine and refreshing cocktails.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image18.png',
    link: "https://www.postinowinecafe.com/",
    linkText: "Postino WineCafé",
    text: "Postino WineCafé is a chic and stylish eatery offering an extensive selection of wines and delicious bruschetta boards. Their pet-friendly patios provide a cozy setting for you and your furry friends to enjoy a relaxing meal together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image2.png',
    link: "https://www.culinarydropout.com/",
    linkText: "Culinary Dropout",
    text: "Culinary Dropout offers a unique dining experience with its fun and funky vibe. Their pet-friendly patio is a great place to enjoy comfort food classics and craft cocktails while your pets soak up the atmosphere.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/The%20Farm%20at%20South%20Mountain%20.jpeg',
    link: "https://thefarmatsouthmountain.com/",
    linkText: "The Farm at South Mountain",
    text: "For a tranquil and picturesque setting, The Farm at South Mountain welcomes pets in its beautiful outdoor dining areas. The restaurant features farm-fresh ingredients and a delightful menu of breakfast and lunch dishes.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image13.png',
    link: "https://www.neighborlypublichouse.com/",
    linkText: "Neighborly Public House",
    text: "Neighborly Public House is a pet-friendly restaurant that offers a diverse menu with dishes made from locally sourced ingredients. Their spacious outdoor patio is the perfect spot for you and your pets to savor a delicious meal.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/Flower%20Child.jpeg',
    link: "https://www.iamaflowerchild.com/locations/phoenix-az-uptown/",
    linkText: "Flower Child",
    text: "Flower Child is a health-conscious eatery that embraces pets at their outdoor seating areas. Indulge in fresh, nutritious salads, bowls, and wraps while your pets relax beside you.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image19.png',
    link: "https://www.joyridetacohouse.com/",
    linkText: "Joyride Taco House",
    text: "With its vibrant and festive atmosphere, Joyride Taco House is a pet-friendly restaurant that serves up delicious tacos and Mexican fare. Their pet-friendly patio is an excellent spot for you and your pets to enjoy a fiesta of flavors.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image11.png',
    link: "https://morningsqueeze.com/",
    linkText: "Morning Squeeze",
    text: "Morning Squeeze is a pet-friendly brunch spot that offers a variety of tasty breakfast and lunch options. The restaurant's friendly staff will happily provide water bowls for your pets as you enjoy your meal.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image8.png',
    link: "https://chelseaskitchenaz.com/#",
    linkText: "Chelsea's Kitchen",
    text: "Chelsea's Kitchen is a charming and pet-friendly restaurant that offers a delightful selection of American cuisine. With a pet-friendly patio and a warm ambiance, it's a great place to dine with your furry friends.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/Keegan's.jpeg",
    link: "https://keegansgrill.com/locations/phoenix",
    linkText: "Keegan's",
    text: "Keegan's is a popular restaurant located in Phoenix, Arizona. Known for its warm and inviting atmosphere, Keegan's is a favorite spot among locals and visitors alike. The restaurant offers a diverse menu that includes classic American dishes, pub-style favorites, and mouthwatering steaks. With friendly service, a wide selection of drinks, and a welcoming ambiance, Keegan's provides a perfect setting for gathering with friends and family to enjoy a delicious meal and create lasting memories.",
  },
];

const city = 'Phoenix';
const state = 'AZ';
const stateFull = 'Arizona';
const cityAndState = `${city}, ${state}`;

const Phoenix: FC = () => {

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

export default Phoenix;
