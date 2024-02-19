import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Minneapolis, MN, USA",
    "matched_substrings": [
        {
            "length": 4,
            "offset": 0
        }
    ],
    "place_id": "ChIJvbt3k5Azs1IRB-56L4TJn5M",
    "reference": "ChIJvbt3k5Azs1IRB-56L4TJn5M",
    "structured_formatting": {
        "main_text": "Minneapolis",
        "main_text_matched_substrings": [
            {
                "length": 4,
                "offset": 0
            }
        ],
        "secondary_text": "MN, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Minneapolis"
        },
        {
            "offset": 13,
            "value": "MN"
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
  "lat": 44.977753,
  "lng": -93.2650108
}

const singleLoadListingCards = [
  {
    hotelName: "100410586",
    paragraphs: [
      "The Loews Minneapolis Hotel stands as a luxurious and contemporary haven in the heart of the vibrant cityscape. Nestled in downtown Minneapolis, this sophisticated establishment offers a seamless fusion of modern design and warm hospitality. With its sleek architecture and refined interiors, the hotel provides a perfect blend of comfort and elegance. ",
      // "The meticulously appointed rooms and suites offer breathtaking views of the city skyline, while the thoughtful amenities cater to the needs of both leisure and business travelers. The hotel's culinary offerings are equally enticing, featuring innovative cuisine crafted from locally sourced ingredients. Whether it's unwinding in the stylish lounge, hosting an event in the state-of-the-art meeting spaces, or simply indulging in the tranquil spa, the Loews Minneapolis Hotel promises an exceptional urban retreat that embodies the essence of luxury and urban sophistication.",
      "Loews Minneapolis Hotel is pet-friendly and allows you to bring two pets of any size for $100 per stay."
    ]
  },
  {
    hotelName: "100420974",
    paragraphs: [
      "Hyatt Centric Downtown Minneapolis epitomizes urban charm and timeless elegance in the heart of downtown Minneapolis. This distinctive hotel seamlessly combines historic architectural elements with contemporary design, creating an ambiance that is both inviting and sophisticated. Located within close proximity to renowned cultural attractions and entertainment venues, the Hyatt Centric Downtown Minneapolis offers an ideal starting point for exploring the city's vibrant scene. The guest rooms and suites are meticulously curated to provide comfort and style, while the hotel's commitment to personalized service ensures a memorable stay for every guest. Dining experiences at the hotel's restaurants showcase a culinary journey that celebrates local flavors and global inspirations.",
      //"With its impeccable blend of classic grandeur and modern comforts, the Hyatt Centric Downtown Minneapolis offers a distinctive retreat that captures the essence of the city's rich heritage and dynamic spirit.",
      "The Hyatt Centric Downtown Minneapolis is pet-friendly and allows you to bring up to 2 pets of any sizes for a one-time $75 pet fee (1 pet) or a one-time $100 pet fee (2 pets)."
    ]       
  },
  {
    hotelName: "100682023",
    paragraphs: [
      "The AC Hotel by Marriott Minneapolis Downtown stands as a contemporary and stylish urban oasis in the heart of Minneapolis. With its sleek and minimalist design, this hotel offers a refreshing blend of European elegance and modern sophistication. Situated in a prime downtown location, it provides easy access to the city's cultural attractions, dining, and entertainment options. ",
      // "The hotel's social spaces exude a cosmopolitan ambiance, creating a welcoming environment for guests to relax, work, or connect. Whether it's enjoying artisanal cocktails at the bar, savoring delectable cuisine at the on-site restaurant, or taking in panoramic city views from the rooftop terrace, the AC Hotel by Marriott Minneapolis Downtown offers a distinctive experience that encapsulates modern elegance and urban allure.",
      "The AC Hotel by Marriott Minneapolis is pet-friendly and allows you to bring one pet of any size for $50 per night."
    ]     
  },
  {
    hotelName: "100423510",
    paragraphs: [
      "The Westin Minneapolis stands as a refined haven of comfort and luxury at the heart of downtown Minneapolis. Housed within a historic landmark, this hotel seamlessly blends classic architecture with modern amenities, creating an ambiance that's both sophisticated and inviting. The guest rooms and suites are elegantly appointed, offering a serene retreat with plush bedding, contemporary furnishings, and state-of-the-art technology. ",
      // "With its central location, the hotel provides easy access to the city's cultural landmarks, shopping districts, and dining options. The Westin's commitment to wellness is evident through offerings such as the WestinWORKOUT® fitness studio and signature Heavenly® Bed, ensuring a restful and rejuvenating stay for guests. Whether unwinding at the hotel's signature restaurant, hosting events in the versatile meeting spaces, or simply indulging in relaxation at the spa, The Westin Minneapolis promises a refined and enriching urban escape that combines timeless charm with modern comforts.",
      "The Westin Minneapolis is pet-friendly and allows you to bring one dog up to 40 pounds for no additional fee. "
    ]
  },
  {
 
    hotelName: "100191860",
    paragraphs: [
      "The Hewing Hotel stands as a distinctive and captivating retreat in the heart of Minneapolis' North Loop neighborhood. Nestled within a historic warehouse building, this boutique hotel seamlessly merges the area's industrial heritage with contemporary design and upscale amenities. The guest rooms and suites exude a blend of rustic elegance and modern comfort, featuring exposed brick walls, original timber beams, and luxurious furnishings that create a unique and inviting atmosphere. ",
      // "The hotel's emphasis on local culture is evident in its curated art collection, locally sourced cuisine, and vibrant rooftop bar, offering stunning views of the city skyline. With its proximity to eclectic boutiques, galleries, and trendy eateries, the Hewing Hotel provides an authentic urban experience that captures the essence of Minneapolis' creative spirit and urban charm.",
      "Hewing Hotel is pet-friendly and allows you to bring two pets of any size for a fee of $75 per stay."
    ]
  },
  {
    hotelName: "100015582",
    paragraphs: [
      "The Graduate Hotel Minneapolis embodies a spirited blend of youthful energy and classic charm in the heart of the city. Reflecting the vibrant college town culture, this hotel offers a unique and nostalgic experience that pays homage to its surroundings. The guest rooms and suites are thoughtfully designed with a playful and eclectic touch, featuring elements that evoke memories of campus life and local heritage. The hotel's communal spaces exude a lively ambiance, inviting guests to connect, socialize, and create memorable moments.",
      // "Located within close proximity to the University of Minnesota campus and other cultural attractions, the Graduate Hotel provides an ideal base for exploring the city's dynamic arts scene, diverse dining options, and lively entertainment. Whether it's unwinding at the rooftop bar with panoramic views, immersing in the colorful decor, or discovering local artistry woven into the hotel's design, the Graduate Hotel Minneapolis offers an engaging and distinctive stay that captures the youthful spirit of the city.",
      "The Graduate Hotel Minneapolis is pet-friendly and allows you to bring two dogs of any size for a fee of $75 per stay."
    ]          
  },
];

const paragraphs = [
  [
    "Minneapolis is a haven for pet-friendly travel, making it an ideal destination for those who want to explore the city without leaving their furry companions behind. From its numerous parks and green spaces to its abundance of pet-friendly accommodation options, Minneapolis warmly welcomes pets with open arms. One can begin their adventure by strolling through the iconic Chain of Lakes, where dogs can run off-leash and splash in the water. The city boasts an impressive selection of pet-friendly cafes and restaurants, ensuring that pet owners can enjoy a meal with their four-legged friends by their side."
  ],
  [
    "For a memorable experience, pet parents can visit Minnehaha Regional Park, offering scenic trails and a breathtaking waterfall that will surely captivate both humans and pets alike. With an array of pet-friendly hotels, ranging from boutique inns to luxury resorts, travelers can rest assured that their beloved pets will receive the same level of hospitality as they do. In Minneapolis, the bond between humans and their pets is cherished, creating a welcoming and unforgettable experience for all pet-loving travelers."
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
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image15.png',
    link: "https://www.minneapolisparks.org/parks-destinations/parks-lakes/minnehaha_regional_park/",
    linkText: "Minnehaha Regional Park",
    text: "A visit to Minneapolis wouldn't be complete without exploring Minnehaha Regional Park. Leash up your pup and take a scenic walk along the trails leading to the iconic Minnehaha Falls. The park also has off-leash areas where your canine companion can socialize and play with other dogs.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image3.png',
    link: "https://www.minneapolisparks.org/parks-destinations/parks-lakes/lake_of_the_isles_park/",
    linkText: "Lake of the Isles",
    text: "This picturesque lake is a haven for pet owners and their furry pals. Put on your walking shoes, grab a leash, and take a leisurely stroll along the scenic paths that encircle the lake. Your pup will love the fresh air and beautiful views.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/Stone%20Arch%20Bridge.jpeg',
    link: "https://www.minneapolisparks.org/parks-destinations/historical_sites/stone_arch_bridge/",
    linkText: "Stone Arch Bridge",
    text: "Take a historic walk across the Stone Arch Bridge, which offers breathtaking views of the Minneapolis skyline and the Mississippi River. Pets are welcome, and the bridge provides an excellent photo opportunity with your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image14.png',
    link: "https://www.minneapolisparks.org/parks-destinations/parks-lakes/bde_maka_ska_park/",
    linkText: "Bde Maka Ska (formerly Lake Calhoun)",
    text: "A trip to Minneapolis wouldn't be complete without a visit to one of its iconic lakes. Bde Maka Ska is a pet-friendly gem that allows leashed pets to walk with you along the shoreline and enjoy the calming waterside ambiance.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image10.png',
    link: "https://www.sidewalkdog.com/mn-dog-friendly-coffee-shops/",
    linkText: "Cafes and Breweries",
    text: "Minneapolis boasts several pet-friendly cafes and breweries where you can savor delicious treats and beverages with your pet by your side. Many establishments have outdoor seating that welcomes four-legged guests.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image4.png',
    link: "https://www.minneapolis.org/things-to-do/itineraries/52-must-sees/st-anthony-main/",
    linkText: "St. Anthony Main",
    text: "Explore the charming St. Anthony Main area with your pet. Take a stroll along the cobblestone streets and enjoy the scenic views of the Mississippi River. Many cafes and restaurants here also offer pet-friendly outdoor seating.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image20.png',
    link: "https://www.minneapolisparks.org/parks-destinations/parks-lakes/gardens__bird_sanctuaries/lyndale_park_rose_garden/",
    linkText: "Lake Harriet Rose Garden",
    text: "Discover the beauty of the Lake Harriet Rose Garden while walking with your furry friend. Leashed dogs are welcome to enjoy the sights and scents of the colorful blooms in this picturesque garden.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image9.png',
    link: "https://urbantailspet.com/",
    linkText: "Urban Tails Pet Supply",
    text: "If you're looking to pamper your pet, head to Urban Tails Pet Supply. This pet-friendly store offers a wide range of pet products, from high-quality food to fun toys for your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/Canine%20Carnival.jpeg',
    link: "https://www.wildlifesciencecenter.org/upcoming-events/canine-carnival",
    linkText: "Canine Carnival",
    text: "If you happen to visit Minneapolis during the summer, don't miss the annual Canine Carnival at the Lake Harriet Bandshell. This fun-filled event includes pet-friendly activities, contests, and a doggy play zone.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image6.png',
    link: "https://wheelfunrentals.com/mn/minneapolis/lake-nokomis/about/social-medias/pet-friendly-pedal-boat-rides-in-minnesota",
    linkText: "Pet-Friendly Boat Tours",
    text: "Treat your pet to a unique experience with pet-friendly boat tours on the Mississippi River. Some operators allow well-behaved dogs on board, so you and your furry friend can enjoy the scenic views together.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image7.png',
    link: "https://howempls.com/",
    linkText: "The Howe Daily Kitchen & Bar",
    text: "This neighborhood gem in the Longfellow area offers a relaxed and pet-friendly atmosphere. The Howe boasts a spacious patio where you and your pup can enjoy delicious comfort food, craft beers, and cocktails.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image1.png',
    link: "https://www.freehousempls.com/",
    linkText: "The Freehouse",
    text: "Located in the North Loop neighborhood, The Freehouse is a pet-friendly brewpub with a vast outdoor seating area. While you savor their freshly brewed beers and creative dishes, your furry friend can relax comfortably at your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image16.png',
    link: "https://stanleysbarroom.com/",
    linkText: "Stanley's Northeast Bar Room",
    text: "With its dog-friendly patio and a menu featuring a fusion of American classics and creative dishes, Stanley's Northeast is a perfect spot to dine with your pet. The lively ambiance and friendly staff will make both you and your furry friend feel right at home.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image17.png',
    link: "https://www.tiliampls.com/",
    linkText: "Tilia",
    text: "Tilia, situated in the Linden Hills neighborhood, offers a delightful and pet-friendly patio. The restaurant's focus on seasonal and locally sourced ingredients ensures a delectable dining experience for you and your pup.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/Psycho%20Suzi's.jpg",
    link: "https://www.psychosuzis.com/",
    linkText: "Psycho Suzi's Motor Lounge",
    text: "For a unique dining experience, head to Psycho Suzi's, a pet-friendly tiki-themed restaurant. Its riverfront patio offers scenic views of the Mississippi River, making it a fantastic spot for a meal with your furry friend." ,
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image2.png',
    link: "https://www.lakeandirving.com/",
    linkText: "Lake & Irving",
    text: "Lake & Irving's pet-friendly patio in Uptown Minneapolis is the perfect place to enjoy contemporary American cuisine with your pup. Their menu features a variety of dishes to suit all tastes.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/The%20Lowry.jpeg',
    link: "https://www.thelowryuptown.com/",
    linkText: "The Lowry",
    text: "Located in the Uptown area, The Lowry is a pet-friendly establishment that serves up classic American fare. With its inviting atmosphere and outdoor seating, you can relish your meal while your furry companion relaxes by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image8.png',
    link: "https://www.thelynhall.com/",
    linkText: "The Lynhall",
    text: "The Lynhall is a culinary collective that welcomes pets on its beautiful patio. Enjoy artisanal food and specialty coffee while your pet lounges comfortably beside you.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image13.png',
    link: "https://www.pizzerialola.com/",
    linkText: "Pizzeria Lola",
    text: "Craving pizza? Pizzeria Lola is a pet-friendly restaurant in Southwest Minneapolis that serves up delectable wood-fired pizzas. Your furry friend can join you on the patio as you indulge in delightful flavors.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image11.png',
    link: "https://www.hi-lo-diner.com/",
    linkText: "Hi-Lo Diner",
    text: "This retro-style diner in the Longfellow neighborhood is not only pet-friendly but also known for its mouthwatering diner classics. Your pet will love the patio ambiance while you savor your meal.",
  },
];

const city = 'Minneapolis';
const state = 'MN';
const stateFull = 'minnesota';
const cityAndState = `${city}, ${state}`;

const Minneapolis: FC = () => {
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

export default Minneapolis;
