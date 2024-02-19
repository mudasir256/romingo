import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';


const searchData = {
  "city": {
    "description": "Denver, CO, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        }
    ],
    "place_id": "ChIJzxcfI6qAa4cR1jaKJ_j0jhE",
    "reference": "ChIJzxcfI6qAa4cR1jaKJ_j0jhE",
    "structured_formatting": {
        "main_text": "Denver",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "CO, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Denver"
        },
        {
            "offset": 8,
            "value": "CO"
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
  "lat": 39.7392358,
  "lng": -104.990251
}

const singleLoadListingCards = [
  {
    hotelName: "102265335",
    paragraphs: [
      "Hyatt Centric Downtown Denver is a pet-friendly hotel that offers a warm welcome to both guests and their furry companions. Situated in the heart of the city, this modern and stylish hotel ensures a comfortable stay for everyone in the family. The hotel's rooftop bar offers stunning views of the city and the Rocky Mountains, creating a perfect spot to unwind.",
      "The Hyatt Centric Downtown Denver provides designated rooms and floors where your pet can stay comfortably with you. The hotel also offers pet amenities, such as pet beds and food bowls, to ensure your pet feels right at home. There are pet fees when you stay at this hotel depending on the length of your stay. Additionally, there is a weight restriction of 80 pounds per pet."
    ],
  },
  {
    hotelName: "102265843",
    paragraphs: [
      "The Thompson Denver is a chic and luxurious hotel in the heart of downtown Denver, Colorado, that warmly welcomes pets. With its modern design and amenities, this pet-friendly hotel offers comfortable accommodations for both you and your furry companions. With its great location, stylish ambiance, and exceptional service, The Thompson Denver promises a wonderful stay for guests and pets.",
      "When you stay at The Thompson Denver, your pet will receive treats and amenities to ensure they feel right at home. The Thompson Denver's central location is close to parks and walking areas, making it convenient for you to explore the city. You can bring up to two pets and you will not have to pay any extra fees."
    ],
  },
  {
    hotelName: "100591191",
    paragraphs: [
      "The Historic Hilton Garden Inn Denver Union Station is a charming hotel that captures the essence of Denver's rich history. Situated just steps away from Denver Union Station, the hotel's location is ideal for exploring the city's vibrant downtown area. The hotel's on-site restaurant serves delicious American cuisine, and guests can enjoy cocktails and stunning views from the rooftop bar.",
      "The Historic Hilton Garden Inn Denver Union Station is pet-friendly and invites you to bring your pet on your vacation. Upon arrival, your pet will receive a special welcome, complete with treats and toys to make them feel at home. The hotel welcomes two pets up to 50 pounds for a fee of $50 per pet, per stay. Your beloved four-legged companion will love joining you in discovering the enchanting city of Denver!"
    ],
  },
  {
    hotelName: "100233692",
    paragraphs: [
      "The Magnolia Hotel Denver is a historic and pet-friendly boutique hotel located in the heart of downtown Denver, Colorado. Magnolia Hotel Denver is in downtown Denver near famous restaurants and shopping. The hotel has a rooftop terrace and an on-site restaurant for you and your pet to enjoy.",
      "When you stay at this pet-friendly hotel, you can bring two pets of any size for no additional fee. Upon arrival, pets receive a special greeting, complete with treats and toys to ensure they feel comfortable and at home. You are also close to parks and walking areas throughout downtown Denver."
    ],
  },
  {
    hotelName: "100430138",
    paragraphs: [
      "The Brown Palace Hotel and Spa is one of Denver's most iconic, pet-friendly hotels. This iconic hotel opened in 1892 and is an important landmark in Denver. The hotel's luxurious amenities include a full-service spa, a rooftop pool, and several exquisite dining options. This hotel is in downtown Denver and is close to many popular attractions in the city.",
      "This historic luxury hotel offers pet-friendly accommodations and provides pet amenities, including beds and bowls, to ensure a comfortable stay. Civic Center Park and Cheeseman Park are nearby places where you can take your pet. You can bring two pets when you stay at this hotel and there is a $125 pet fee per stay.",
    ],
  },
  {
    hotelName: "100191848",
    paragraphs: [
      "Kimpton Hotel Born is a contemporary and stylish boutique hotel located in the heart of Denver's vibrant Union Station neighborhood. The hotel's prime location makes it an ideal base for exploring the city's many attractions, restaurants, and cultural hotspots. Kimpton Hotel Born promises a contemporary and luxurious experience that captures the vibrant spirit of the Mile High City!",
      "Kimpton Hotel Born loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. When you check in, your pet will receive treats and the hotel offers pet beds and food bowls."
    ],
  },
];

const paragraphs = [
  [
    'Denver is a fantastic city for pet-friendly travel, offering many activities and hotels that warmly welcome your four-legged companions. There are numerous pet-friendly hikes and parks for you and your pet to explore, including Red Rocks Park. Additionally, there are many restaurants and cafes in Denver that offer pet-friendly outdoor seating options.',
    "We're here to help you plan your next pet-friendly trip to Denver! Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy.",
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

  ]
];

const carouselOneData = [
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image19.png",
    link:  "https://cpw.state.co.us/placestogo/parks/CherryCreek",
    linkText:  "Cherry Creek State Park",
    text:  "Treat your four-legged companion to a day of outdoor fun at Cherry Creek State Park. This expansive park offers miles of trails where you and your pet can hike, jog, or simply stroll amidst picturesque scenery. Additionally, the park has a designated off-leash dog area where your pup can play and socialize freely.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/Railyard%20Dog%20Park.jpeg",
    link:  "http://www.rfpcommunityfoundation.org/",
    linkText:  "Railyard Dog Park",
    text:  "Located near Union Station, the Railyard Dog Park is a paw-some urban retreat for playful pups. This park features a large enclosed area where dogs can run and explore while you enjoy views of the city.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image18.png",
    link:  "https://denverbeerco.com/",
    linkText:  "Denver Beer Co.",
    text:  "Quench your thirst and treat your pet to a unique experience at Denver Beer Co. This popular brewery offers a pet-friendly patio where you can enjoy craft beers and food with your furry friend.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/Washington%20Park%20.jpeg",
    link:  "https://www.denver.org/listing/washington-park/6828/",
    linkText:  "Washington Park",
    text:  'Known as "Wash Park," this scenic urban park is a must-visit for pet owners. Pets can join you on a walk around the lakes or you can explore the 2.6-mile loop trail around the park.',
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image8.png',
    link:  "https://www.5280.com/best-dog-parks-denver-metro/",
    linkText:  "Table Mountain Off-Leash Dog Park",
    text:  "Venture to the nearby suburb of Golden and visit Table Mountain Off-Leash Dog Park. This large open space allows your pet to run and play fetch while you enjoy the mountain views in the distance.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/Lowry%20Dog%20Park.jpeg',
    link:  "https://topdogparks.com/places/lowry-dog-park/",
    linkText:  "Lowry Dog Park",
    text:  "Situated in the Lowry neighborhood, this well-maintained off-leash dog park features separate areas for large and small dogs. With ample shaded spots and water stations, it's the perfect place for your furry friend to socialize and expend some energy.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/Paw's%20%26%20Play.jpeg",
    link:  "https://pawsnplay.com/",
    linkText:  "Paws 'n Play",
    text:  "Paws 'n' Bites is a delightful dog treat store nestled in the heart of Denver, Colorado, that caters to the taste buds and well-being of our beloved canine companions. This charming store offers an array of handcrafted and all-natural dog treats that are not only delicious but also made with the finest, locally sourced ingredients.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image10.png',
    link:  "https://www.jeffco.us/1332/Mount-Falcon-Park",
    linkText:  "Mount Falcon Park",
    text:  "Escape to Mount Falcon Park for a scenic hike with your furry companion. The park's numerous trails offer varying levels of difficulty, making it suitable for leisurely walks or more challenging treks.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image9.png',
    link:  "https://www.denver.org/things-to-do/tours/brewery-tours/",
    linkText:  "Denver Brews & Booze Tour",
    text:  "Embark on a pet-friendly walking tour with your dog and discover Denver's craft brews and spirits scene. This guided tour allows you to explore the city's breweries and bars while your pet accompanies you on this unique adventure.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/Sloan%20Lake.png',
    link:  "https://www.uncovercolorado.com/public-parks/sloans-lake-park/",
    linkText:  "Sloan's Lake Park",
    text:  "Enjoy breathtaking views of downtown Denver at Sloan's Lake Park, a serene and pet-friendly destination. Leashed pets are welcome to join you as you walk along the lake's shores and take in Denver's skyline.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/Forrest%20Room%205.jpeg',
    link: "https://www.westword.com/location/forest-room-5-5163966",
    linkText: "Forest Room 5",
    text: "Nestled in a rustic setting, Forest Room 5 is a dog-friendly gem that welcomes pets on its outdoor patio. The restaurant boasts a creative menu with delectable dishes like elk sliders and salmon BLTs. Enjoy a relaxing meal amidst the towering trees and enjoy the ambiance of nature with your pet by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image13.png',
    link: "https://www.denbisco.com/",
    linkText: "Denver Biscuit Co.",
    text: "Start your day with a mouthwatering breakfast at Denver Biscuit Co. This restaurant is a pet-friendly eatery that offers delectable biscuit sandwiches and breakfast delights. While you savor your meal, your furry companion can indulge in delicious, homemade dog biscuits.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image1.png',
    link: "https://www.parkburger.com/",
    linkText: "Park Burger",
    text: "A favorite among pet owners, Park Burger offers a spacious outdoor patio where you can dine with your furry friend. This burger joint serves up delicious burgers, creative toppings, and a selection of craft beers. You and your pet will enjoy a delightful meal together at Park Burger! ",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image16.png',
    link: "https://www.mountainsunpub.com/location/vine-street-pub-brewery/",
    linkText: "Vine Street Pub & Brewery",
    text: "Treat yourself and your pet to a lively dining experience at Vine Street Pub & Brewery. This pet-friendly spot offers an inviting patio where you can enjoy a variety of handcrafted beers and delicious pub fare.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image11.png',
    link: "https://avantifandb.com/",
    linkText: "Avanti Food & Beverage",
    text: "Avanti Food & Beverage is a food hall that features food vendors and has a large rooftop patio that welcomes pets. Avanti has stunning views of the city and a lively atmosphere, making this spot perfect for pet owners.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image14.png',
    link: "https://www.ediblebeats.com/linger",
    linkText: "Linger",
    text: "Located in a former mortuary, Linger offers a unique dining experience with a pet-friendly rooftop patio. THe restaurant offers dishes from around the world, making it a fantastic spot to enjoy a meal with your furry friend.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image6.png',
    link: "https://www.recessbeergarden.com/",
    linkText: "Recess Beer Garden",
    text: "Recess Beer Garden is an ideal spot to relax with your pet. This lively beer garden offers a dog-friendly patio and an extensive selection of local craft beers and food trucks. This restaurant is a favorite gathering spot for both pet owners and beer enthusiasts.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/Just%20Be%20.jpeg',
    link: "https://www.justbekitchen.com/",
    linkText: "Just Be Kitchen",
    text: "The Watering Well Eatery is a hidden gem in the Berkeley neighborhood featuring flavorful dishes made with locally-sourced ingredients. They also have a pet-friendly patio and a menu featuring special treats that your pet will love.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/Sloan's%20Lake%20Tap%20and%20Burger.webp",
    link: "https://tapandburger.com/",
    linkText: "Sloan's Lake Tap and Burger",
    text: "Sloan's Lake Tap and Burger is near Sloan's Lake Park and offers delicious burgers and a variety of craft beers. After a day of exploring the lake with your pet, enjoy Sloan's Lake Tap and Burger's patio with your furry friend.",
  },
];

const city = 'Denver'
const state = 'CO';
const stateFull = 'COLORADO';
const cityAndState = `${city}, ${state}`;

const Denver: FC = () => {
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

export default Denver;
