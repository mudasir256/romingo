import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Santa Fe, NM, USA",
    "matched_substrings": [
        {
            "length": 8,
            "offset": 0
        }
    ],
    "place_id": "ChIJqVKY50NQGIcRQN-I_XMjkIw",
    "reference": "ChIJqVKY50NQGIcRQN-I_XMjkIw",
    "structured_formatting": {
        "main_text": "Santa Fe",
        "main_text_matched_substrings": [
            {
                "length": 8,
                "offset": 0
            }
        ],
        "secondary_text": "NM, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Santa Fe"
        },
        {
            "offset": 10,
            "value": "NM"
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
  "lat": 35.6869752,
  "lng": -105.937799
}

const singleLoadListingCards = [
  {
    hotelName: "100217808", 
    paragraphs: [
      "Situated in the heart of Santa Fe's historic Plaza, La Fonda on the Plaza exudes old-world charm while offering modern amenities. This iconic hotel not only boasts a rich history but also extends a warm welcome to pets. Upon arrival, your furry friend will receive a pet bed, bowls, and treats, making them feel right at home. The hotel's convenient location allows for leisurely strolls with your pet through the enchanting streets of Santa Fe.",
      "Up to two pets under 45 pounds can stay at La Fonda on the Plaza for a fee of $50 per night, per stay."
    ]
  },
  {
    hotelName: "102174605",
    paragraphs: [
      "Known for its elegant Southwestern style, Hotel Santa Fe blends Native American culture with contemporary luxury. Your pets will feel like honored guests, as the hotel provides pet-friendly rooms equipped with comfortable pet beds and food bowls. The hotel's lush garden courtyards offer an excellent space for you and your furry companion to relax and unwind.",
      "When you stay at Hotel Santa Fe, you can bring two dogs of any size for a fee of $25 per pet, per night."
    ]
  },
  {
    hotelName: "100435660", 
    paragraphs: [
      "Tucked away in a tranquil corner of Santa Fe, The Inn of the Five Graces is a hidden gem that warmly welcomes pets. This boutique hotel boasts exquisitely designed rooms and suites, each offering a unique and luxurious experience. The staff goes the extra mile to ensure your pets are pampered with special treats and toys during their stay.",
      "You are welcome to bring your pet to this hotel for a fee of $100 per dog, per night. They ask the dog is medium-sized or smaller and must be house-broken."
    ]
  },
  {
    hotelName: "100082428",
    paragraphs: [
      "Conveniently located near the historic downtown area, Drury Plaza Hotel provides a pet-friendly environment with well-appointed rooms that cater to both you and your furry friends. The hotel's rooftop pool and hot tub area offer stunning views of Santa Fe's surrounding beauty, and your pets are allowed to enjoy the area on a leash.",
      "Two dogs under 80 pounds are welcome to stay at Drury Plaza Hotel in Santa Fe for a fee of $50 per night."
    ]
  },
  {
    hotelName: "100110414", 
    paragraphs: [
      "Surrounded by the breathtaking Sangre de Cristo Mountains, The Lodge at Santa Fe offers a scenic and pet-friendly retreat. Your pets will be greeted with treats and a warm smile upon arrival. With spacious rooms and a pet-friendly policy that extends to the hotel's common areas, you and your furry companions will have a delightful stay.",
      "When you stay at The Lodge at Santa Fe, you are welcome to bring dogs that weigh up to 50 pounds to the property. There is an additional $35 pet fee per stay.",

    ]
  },
  {
    hotelName: "100416876", 
    paragraphs: [
      "Nestled at the heart of Santa Fe, Inn and Spa at Loretto is a pet-friendly hotel with a serene ambiance. The hotel offers designated pet-friendly rooms and provides walking services for your pets if you wish to explore Santa Fe without them for a while. Additionally, the concierge can assist in arranging pet-sitting services, ensuring your pets are cared for while you indulge in some spa relaxation.",
      "Two dogs are welcome to travel with you to the Inn and Spa at Loretto. The pet fee is $75 per stay for the first dog and $35 per stay for the second dog."
    ]
  }
];

const paragraphs = [
  [
    "Santa Fe, a picturesque and charming destination, welcomes travelers with open arms, and this includes our four-legged companions too! Embracing the essence of pet-friendly travel, Santa Fe offers a plethora of opportunities to explore the city's rich culture and natural beauty with your beloved pets by your side. The city boasts a wide array of pet-friendly accommodations, ranging from cozy boutique hotels to charming vacation rentals, ensuring a comfortable stay for both you and your furry friends.",
    "Take a leisurely stroll through the historic Plaza or venture into the vibrant Railyard Arts District, where many restaurants and cafes have outdoor seating areas that cater to pets. Nature-loving pet owners will be delighted by the numerous pet-friendly hiking trails and parks dotted throughout the city and surrounding areas. Additionally, Santa Fe's warm and friendly community extends a warm welcome to pets, making it easy to find pet grooming services, pet supply stores, and even pet-friendly events.",
    "Whether you're exploring the city's art scene, savoring its culinary delights, or simply immersing yourself in the serene landscapes, Santa Fe promises an unforgettable and inclusive pet-friendly adventure for all."
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
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/Santa%20Fe%20Plaza%20.jpeg',
    link: "https://www.santafe.org/visiting-santa-fe/neighborhoods/plaza-and-downtown/",
    linkText: "Santa Fe Plaza",
    text: "Take a leisurely stroll with your furry friend through the iconic Santa Fe Plaza, the heart of the city. Rich in history and surrounded by charming adobe buildings, the Plaza is a great place to soak in the vibrant atmosphere and immerse yourself in the local culture.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/Dale%20Ball%20Trails%20.jpeg',
    link: "https://www.alltrails.com/trail/us/new-mexico/dale-ball-trails-north",
    linkText: "Dale Ball Trails",
    text: "For the active and adventurous, the Dale Ball Trails offer a network of well-marked, pet-friendly hiking paths. You and your pet can explore the beautiful Santa Fe foothills, providing ample opportunities for scenic hikes and outdoor adventures.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/Railyard%20Arts%20District.jpeg',
    link: "https://railyardsantafe.com/",
    linkText: "Santa Fe Railyard Arts District",
    text: "Discover the artistic side of Santa Fe at the Railyard Arts District. This pet-friendly area is home to galleries, boutiques, and restaurants with outdoor seating that welcome your pets. Enjoy some art appreciation and indulge in delicious local cuisine while your furry companion lounges beside you.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image15.png',
    link: "https://www.emnrd.nm.gov/spd/find-a-park/hyde-memorial-state-park/",
    linkText: "Hyde Memorial State Park",
    text: "Located just a short drive from Santa Fe, Hyde Memorial State Park is a pet-friendly oasis nestled in the mountains. Leashed pets are welcome on the trails, making it an ideal spot for a day of hiking and picnicking amidst the natural beauty of New Mexico.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image18.png',
    link: "https://santafebotanicalgarden.org/",
    linkText: "Santa Fe Botanical Garden",
    text: "With well-maintained paths and stunning landscapes, the Santa Fe Botanical Garden is a pet-friendly place to explore. Take a leisurely walk amidst native plants and flowers, all while your pet enjoys the fresh scents and sights.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image10.png',
    link: "https://www.nps.gov/places/santa-fe-national-historic-trail.htm",
    linkText: "Santa Fe National Historic Trail",
    text: "Step back in time by walking a section of the Santa Fe National Historic Trail with your pet. This historic route was once used by traders, and you can now traverse parts of it with your furry friend by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image4.png',
    link: "https://santafespirits.com/locations/downtown-tasting-room",
    linkText: "Santa Fe Spirits Tasting Room",
    text: "If you're a fan of spirits and cocktails, Santa Fe Spirits Tasting Room is a pet-friendly option. Enjoy sampling local spirits and spirits-inspired cocktails while your pet rests comfortably at your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/Cerrillos%20Hills%20State%20Park.jpeg',
    link: "https://www.emnrd.nm.gov/spd/find-a-park/cerrillos-hills-state-park/",
    linkText: "Cerrillos Hills State Park",
    text: "Embark on a pet-friendly adventure to Cerrillos Hills State Park, a hidden gem with scenic trails and historical sites. The diverse terrain makes it an exciting spot for hikers, and leashed pets are welcome to join the fun.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image1.png',
    link: "https://golondrinas.org/",
    linkText: "El Rancho de las Golondrinas",
    text: "Explore New Mexico's past at El Rancho de las Golondrinas, a living history museum that allows leashed pets. This immersive experience provides a glimpse into the region's cultural heritage, making it a unique outing for you and your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image14.png',
    link: "https://santafefarmersmarket.com/",
    linkText: "Santa Fe Farmers' Market",
    text: "Wrap up your pet-friendly escapades with a visit to the Santa Fe Farmers' Market. While pets are not allowed inside the market buildings, the surrounding areas offer a lively atmosphere, and your pet can enjoy the company of fellow furry friends.",
  },
];

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image9.png',
    link: "https://teahousesantafe.com/",
    linkText: "The Teahouse",
    text: "Situated in a charming historic adobe, The Teahouse is a pet-friendly gem that serves an extensive selection of teas and delectable treats. Relax on the outdoor patio with your pet by your side while savoring their mouthwatering pastries and enjoying the lovely atmosphere.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image3.png',
    link: "https://cowgirlsantafe.com/",
    linkText: "Cowgirl BBQ",
    text: "A favorite among locals and visitors alike, Cowgirl BBQ offers a lively ambiance and a pet-friendly patio. Indulge in classic BBQ dishes and Tex-Mex specialties while your pet lounges comfortably beside you.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/Sophia's%20.jpeg",
    link: "https://www.facebook.com/tiasophias/",
    linkText: "Tia Sophia's",
    text: "Known for its traditional New Mexican breakfast and lunch fare, Tia Sophia's welcomes pets on their charming outdoor patio. Treat yourself to mouthwatering breakfast burritos and enchiladas while your furry friend receives attention from the friendly staff.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image7.png',
    link: "https://www.boxcar-restaurants.com/santafe/",
    linkText: "Boxcar",
    text: "Boxcar is a trendy eatery with a dog-friendly patio, making it an ideal spot for casual dining with your pet. Enjoy their diverse menu, including burgers, salads, and handcrafted cocktails, as you and your furry companion soak in the lively atmosphere.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image13.png',
    link: "https://tomasitas.com/",
    linkText: "Tomasita's",
    text: "Specializing in Northern New Mexican cuisine, Tomasita's offers a pet-friendly patio where you can enjoy traditional dishes like enchiladas and green chile stew. The restaurant's friendly staff is sure to dote on your furry friend while you savor the flavors of the Southwest.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/El%20Parasol.png',
    link: "https://elparasol.com/santa-fe-cerrillos-road/",
    linkText: "El Parasol",
    text: "A local favorite for quick and delicious Mexican food, El Parasol provides outdoor seating for you and your pet to enjoy together. From tacos to tamales, the menu boasts a variety of mouthwatering options that will satisfy your cravings.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image2.png',
    link: "https://www.secondstreetbrewery.com/",
    linkText: "Second Street Brewery",
    text: "A pet-friendly microbrewery with a warm and inviting atmosphere, Second Street Brewery is an excellent choice for beer enthusiasts. Their outdoor seating area is perfect for you and your pet to enjoy some relaxation and tasty brews.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image5.png',
    link: "https://jambocafe.net/",
    linkText: "Jambo Café",
    text: "Experience the vibrant flavors of African and Caribbean cuisine at Jambo Café, a pet-friendly restaurant with a diverse menu. Your pet can join you on the patio as you indulge in dishes like coconut curry and jerk chicken.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image11.png',
    link: "https://www.counterculturesantafe.com/",
    linkText: "Counter Culture Café",
    text: "Tucked in the heart of Santa Fe, Counter Culture Café offers a pet-friendly courtyard where you can savor global-inspired dishes and delectable desserts. The relaxed ambiance and attentive service will ensure a delightful dining experience for both you and your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Santa%20Fe/image8.png',
    link: "https://www.elfarolsantafe.com/",
    linkText: "El Farol",
    text: "El Farol is not just any ordinary bar; it is a captivating and charming establishment that exudes a unique aura of warmth and hospitality. Nestled in the heart of a bustling city, this hidden gem has earned its reputation as a gathering place for the locals and the inquisitive souls who stumble upon its doors. ",
  },
];

const city = 'Santa Fe';
const state = 'NM';
const stateFull = 'new mexico';
const cityAndState = `${city}, ${state}`;

const SantaFe: FC = () => {
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

export default SantaFe;
