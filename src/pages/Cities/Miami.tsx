import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Miami, FL, USA",
    "matched_substrings": [
        {
            "length": 5,
            "offset": 0
        }
    ],
    "place_id": "ChIJEcHIDqKw2YgRZU-t3XHylv8",
    "reference": "ChIJEcHIDqKw2YgRZU-t3XHylv8",
    "structured_formatting": {
        "main_text": "Miami",
        "main_text_matched_substrings": [
            {
                "length": 5,
                "offset": 0
            }
        ],
        "secondary_text": "FL, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Miami"
        },
        {
            "offset": 7,
            "value": "FL"
        },
        {
            "offset": 11,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 25.7616798,
"lng": -80.1917902
}

const singleLoadListingCards = [
  {
    hotelName: "100124650",
    paragraphs: [
      "The Standard Spa, Miami Beach, is a luxurious and renowned wellness retreat nestled in the heart of the vibrant city of Miami Beach, Florida. With its serene waterfront location overlooking Biscayne Bay, this establishment offers a unique fusion of relaxation and indulgence.",
      //"The Standard Spa is celebrated for its holistic approach to well-being, featuring an array of therapeutic treatments, revitalizing yoga sessions, and rejuvenating hydrotherapy experiences. The lush garden landscapes and tranquil outdoor spaces further contribute to a sense of serenity and escape from the bustling city.",
      //"Guests are invited to unwind in stylishly designed rooms and suites, each exuding comfort and contemporary elegance. The Standard Spa Miami Beach, promises an exceptional retreat where guests can harmonize their mind, body, and spirit in a setting that seamlessly combines luxury with wellness.",
      "The Standard Spa Miami Beach is pet-friendly and allows you to bring two dogs during your visit for no additional fee."
    ]
  },
  {
    hotelName: "100597236",
    paragraphs: [
      "The Kimpton EPIC Hotel stands as a distinguished urban sanctuary in the heart of downtown Miami, Florida. As part of the renowned Kimpton Hotels & Restaurants brand, the EPIC Hotel offers a distinctive blend of contemporary sophistication and warm hospitality. Its prime waterfront location along the Miami River provides breathtaking views of the city skyline and Biscayne Bay, setting the stage for a luxurious escape.",
      //"With a focus on culinary excellence, the hotel boasts world-class dining options that showcase locally inspired flavors and ingredients. From its inviting rooftop pool deck to its state-of-the-art fitness center, the Kimpton EPIC Hotel seamlessly caters to both leisure and business travelers, offering an urban oasis where modern luxury meets Miami's vibrant energy.",
      "Kimpton EPIC Hotel is pet-friendly and allows you to bring your pets during your visit for no additional fee."
    ]       
  },
  {
    hotelName: "100815117",
    paragraphs: [
      "The Loews Miami Beach Hotel stands as an iconic and upscale beachfront destination, nestled in the heart of South Beach, Miami. With its prime location along the sparkling Atlantic Ocean, the hotel offers guests a luxurious and vibrant escape that perfectly captures the essence of Miami's renowned energy and style. Boasting a blend of contemporary design and beachfront elegance, the Loews Miami Beach Hotel features spacious and meticulously appointed rooms and suites, each offering stunning views and modern amenities.",
     // "The hotel's emphasis on relaxation is highlighted by its expansive palm-fringed pool area, where guests can unwind in style or enjoy direct access to the pristine sandy shores. Culinary experiences at the on-site restaurants are a true delight, showcasing a diverse range of flavors and dining options. Whether lounging by the pool, indulging in rejuvenating spa treatments, or exploring the vibrant nearby attractions, the Loews Miami Beach Hotel offers a complete and unforgettable Miami experience that blends luxury, comfort, and the captivating allure of the oceanfront.",
      "Loews Miami Beach Hotel is pet-friendly and allows you to bring two pets during your stay for $50 per stay."
    ]  
  },
  {
    hotelName: "100086316",
    paragraphs: [
      "The Confidante Miami Beach is a captivating and artfully designed oceanfront oasis situated in the heart of Miami Beach, Florida. As part of the Hyatt Unbound Collection, the hotel exudes a distinct blend of retro charm and modern luxury, paying homage to the glamour of the 1940s and 1950s with a contemporary twist. ",
      //"Guests are greeted with spacious and comfortable rooms and suites, many of which offer panoramic views of the Atlantic Ocean or the city skyline. The Confidante's private beachfront, complete with colorful umbrellas and loungers, invites relaxation and leisure, while its heated outdoor pool area provides a chic and lively atmosphere. The hotel's commitment to culinary excellence is showcased through its diverse dining options that feature locally inspired cuisine and innovative cocktails. ",
      "The Confidante Miami Beach is pet-friendly and allows you to bring two pets with a combined weight of 75 pounds or less. If you are staying between 1-5 days, the fee is $100."
    ]        
  },
  {
    hotelName: "100795735",
    paragraphs: [
      "The W Miami Brickell stands as a sleek and modern urban retreat, perfectly situated within the dynamic Brickell neighborhood of Miami, Florida. With its distinctive blend of contemporary luxury and vibrant energy, the hotel offers a sophisticated escape that caters to both leisure and business travelers. The W's striking architecture and stylish interiors create a dynamic ambiance that mirrors the cosmopolitan spirit of the city. Guests are welcomed into chic and well-appointed rooms and suites, many of which provide breathtaking views of the Miami skyline and Biscayne Bay.",
      //"The hotel's rooftop pool deck, complete with cabanas and a bar, offers a stylish oasis where guests can bask in the sun or enjoy panoramic vistas. Innovative dining options that showcase global flavors and artistic presentations further elevate the experience. The W Miami Brickell also boasts a state-of-the-art fitness center and a range of luxurious amenities designed to create an immersive and indulgent stay. ",
      "The W Miami Brickell is pet-friendly and allows you to bring two pets weighing up to 40 pounds during your stay for a $100 fee per stay, plus $25 for any additional night.",
    ]        
  },
  {
    hotelName: "100429030",
    paragraphs: [
      "Nestled along the sun-kissed shores of Miami Beach, 1 Hotel South Beach is a harmonious blend of eco-luxury and coastal elegance. With a deep commitment to sustainability and nature-inspired design, the hotel offers an unparalleled retreat that resonates with both tranquility and vitality. Each aspect of the hotel is thoughtfully curated to reflect a seamless integration with the surrounding environment. Guests are welcomed into spacious and naturally lit rooms and suites adorned with reclaimed wood and organic textures, evoking a sense of calm and connection to nature. ",
     // "The hotel's rooftop pool, enveloped by lush greenery and offering panoramic ocean views, serves as a serene sanctuary. Culinary offerings highlight locally sourced, organic ingredients, showcasing the region's vibrant flavors and culinary creativity. The beachfront setting allows for direct access to the sandy shores, where guests can embrace the ocean's embrace. 1 Hotel South Beach invites guests to immerse themselves in a transformative experience where sustainable luxury and the beauty of the natural world converge to create an unforgettable Miami escape.",
      "1 Hotel South Beach is pet-friendly and allows you to bring pets weighing up to 25 pounds. Pets are not allowed by the pool or lounge areas."
    ]
  }
];

const paragraphs = [
  [
    "Miami is an ideal destination for pet-friendly travel, offering a plethora of opportunities for unforgettable adventures with your four-legged companions. From sun-kissed beaches to vibrant parks and trendy cafes, the city ensures that no member of your family is left behind. Take a leisurely stroll along the iconic South Beach, where pets are welcomed on designated areas, allowing them to frolic in the gentle waves and soft sand.",
    "For a dose of nature, visit the beautiful Bayfront Park, where furry friends can enjoy ample green spaces and mingling with other playful pets. Several pet-friendly hotels cater to your furry companions, providing special amenities like pet beds and gourmet treats. Miami&apos;s pet-friendly dining scene is equally enticing, with various cafes and restaurants boasting outdoor seating where your pet can join you during meals. With its year-round sunny weather and a warm embrace of pets, Miami guarantees an unforgettable and inclusive experience for both you and your beloved animal companions.",
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
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image5.png',
    link: "https://luxuryguideusa.com/bark-at-the-park-bring-your-dog-to-a-marlins-game/",
    linkText: "Bark at the Park",
    text: "Head to one of Miami's numerous dog parks, such as the popular Amelia Earhart Bark Park or Kennedy Park, to let your four-legged friend stretch their legs, run off-leash, and socialize with other dogs. These parks feature agility equipment, shaded areas, and water fountains to keep your pet cool and entertained.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image20.png',
    link: "https://www.timeout.com/miami/things-to-do/dog-beach-miami",
    linkText: "Hobie Beach",
    text: "Enjoy a day of sun and surf with your furry companion at Hobie Beach Park, the only designated pet-friendly beach in Miami. Here, your pup can frolic in the waves and dig in the sand, making it a true doggy paradise.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/Ventetian%20Causeway.jpeg',
    link: "https://www.miamidade.gov/parks/venetian.asp",
    linkText: "Venetian Causeway Walk",
    text: "Take a scenic stroll along the Venetian Causeway, a pet-friendly pedestrian path connecting Miami Beach and mainland Miami. The views of the bay and the passing boats are delightful, and your pet will love the opportunity to explore a new environment.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image1.png',
    link: "https://www.miami.gov/Parks-Public-Places/Parks-Directory/David-T.-Kennedy-Park",
    linkText: "David T. Kennedy Park",
    text: "David T. Kennedy Park in Miami, Florida, is a pet-friendly oasis offering a range of activities for both humans and their furry companions. With spacious green areas, scenic waterfront views, and designated off-leash zones, the park provides an ideal environment for pets to play and socialize.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image15.png',
    link: "https://secretmiami.com/best-farmers-markets-miami/",
    linkText: "Art Walks and Farmers' Markets",
    text: "Several art districts and farmers' markets in Miami are pet-friendly. Explore the colorful Wynwood Walls or enjoy fresh produce and local goodies at the Coconut Grove Organic Market, while your pet enjoys the sights, sounds, and occasional treat from friendly vendors.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image14.png',
    link: "https://coopertownairboats.com/",
    linkText: "Coopertown Airboats",
    text: "Coopertown Airboats in Miami is a pet-friendly adventure that allows you to explore the captivating Everglades with your furry friend by your side. With their accommodating policies, you and your pet can enjoy the thrilling airboat rides and discover the unique ecosystem of the Everglades together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/Barnacle.avif',
    link: "https://www.floridastateparks.org/parks-and-trails/barnacle-historic-state-park",
    linkText: "Barnacle Historic State Park",
    text: "Barnacle Historic State Park in Coconut Grove offers a charming and pet-friendly escape, inviting you to step back in time and explore the oldest home in Miami. Take a leisurely stroll with your four-legged companion through the lush grounds, enjoying the historic ambiance and picturesque views of Biscayne Bay.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image4.png',
    link: "https://www.floridastateparks.org/OletaRiver",
    linkText: "Oleta River State Park",
    text: "Oleta River State Park is a haven for outdoor enthusiasts and their furry companions, offering a diverse range of pet-friendly trails and activities in the heart of Miami. Whether you're hiking, mountain biking, or enjoying a relaxing picnic, you and your pet can bask in the natural beauty and serenity of this expansive park.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image19.png',
    link: "https://www.miamiandbeaches.com/l/outdoor-experiences/south-pointe-park/2966",
    linkText: "South Pointe Park Miami Florida",
    text: "South Pointe Park in Miami, Florida, welcomes pets to enjoy its beautiful coastal setting and well-maintained green spaces, providing an ideal spot for leisurely strolls and playtime with your furry friend. With its pet-friendly amenities and stunning ocean views, South Pointe Park offers a delightful and inclusive experience for both you and your beloved pet.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image18.png',
    link: "https://cielitoartisanpops.com/",
    linkText: "Cielito Artisan Pops",
    text: "Cielito Artisan Pops is a delightful treat spot in Miami that caters to both humans and their furry companions. With their special line of dog-friendly popsicles, pet owners can share a refreshing and tasty moment with their pups on sunny Miami days.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/Lokal%20Miami.jpeg',
    link: "https://kushhospitality.com/locations/lokal/",
    linkText: "Lokal",
    text: "This Coconut Grove gem is a haven for burger lovers, offering locally-sourced, grass-fed beef. With a dog-friendly patio, Lokal's menu even includes a &quot;Bow Wow Burger&quot; specially crafted for your canine companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/Green%20Street%20Cafe.webp',
    link: "https://www.greenstreetcafe.net/",
    linkText: "GreenStreet Café",
    text: "Nestled in the heart of Coconut Grove, GreenStreet Café boasts a spacious outdoor seating area perfect for pet owners. Enjoy their diverse menu of salads, sandwiches, and more while your furry friend lounges by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image7.png',
    link: "https://www.montysrawbar.com/",
    linkText: "Monty's Raw Bar",
    text: "Overlooking the marina, Monty's Raw Bar on South Beach offers a relaxed atmosphere where both humans and dogs can enjoy the sea breeze. Feast on seafood favorites while your pup revels in the waterfront views.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image8.png',
    link: "https://kushhospitality.com/locations/spillover/",
    linkText: "The Spillover",
    text: "Located in Coconut Grove, The Spillover serves up a seafood-focused menu. Their pet-friendly patio ensures that your furry friend can savor the ocean-inspired aromas while you indulge in their signature seafood dishes.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/Morgan's%20Restaurant.jpeg",
    link: "https://www.themorgansrestaurant.com/",
    linkText: "Morgans Restaurant",
    text: "This Wynwood eatery features a dog-friendly courtyard where you can savor their farm-to-table menu. Morgans Restaurant is an ideal spot for brunch with your pup, offering everything from avocado toast to hearty omelets.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/Dogma%20Grill.webp',
    link: "https://www.dogmagrill.com/",
    linkText: "Dogma Grill",
    text: "Tucked in the Design District, Dogma Grill is a hot dog haven. Their pet-friendly outdoor seating area ensures that your furry friend can accompany you while you sample their creative hot dog concoctions.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image12.png',
    link: "https://www.panthercoffee.com/",
    linkText: "Panther Coffee",
    text: "For coffee enthusiasts, Panther Coffee in Wynwood is a must-visit. This pet-friendly café allows you to enjoy expertly crafted coffees and teas while your pet lounges by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image3.png',
    link: "https://carrotexpress.com/",
    linkText: "Carrot Express",
    text: "Carrot Express in Miami, Florida, is a pet-friendly dining spot where you can enjoy delicious, healthy meals alongside your furry friend. With outdoor seating and a warm welcome for pets, you can savor your meal knowing that your companion is also being catered to.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/image13.png',
    link: "https://www.localhouse.com/",
    linkText: "The Local House",
    text: "Situated in the Sense Beach House hotel, The Local House offers a charming atmosphere and pet-friendly outdoor seating. Delight in their coastal-inspired dishes while your pet enjoys the ocean breeze.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Miami/Atacha's.jpeg",
    link: "https://www.atchanas.com/",
    linkText: "Atachana's Homegrown Thai",
    text: "Atachana's Homegrown Thai in Miami offers a pet-friendly dining experience, allowing you to enjoy authentic Thai cuisine while your four-legged companion relaxes by your side in the outdoor seating area. With a focus on fresh, flavorful ingredients, you and your pet can savor a taste of Thailand together.",
  },
];

const city = 'Miami';
const state = 'FL';
const stateFull = 'FLORIDA';
const cityAndState = `${city}, ${state}`;

const Miami: FC = () => {
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

export default Miami;
