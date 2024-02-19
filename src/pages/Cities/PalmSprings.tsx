import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Palm Springs, CA, USA",
    "matched_substrings": [
        {
            "length": 7,
            "offset": 0
        }
    ],
    "place_id": "ChIJs-Xb_9Qa24ARfHntwodp5aE",
    "reference": "ChIJs-Xb_9Qa24ARfHntwodp5aE",
    "structured_formatting": {
        "main_text": "Palm Springs",
        "main_text_matched_substrings": [
            {
                "length": 7,
                "offset": 0
            }
        ],
        "secondary_text": "CA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Palm Springs"
        },
        {
            "offset": 14,
            "value": "CA"
        },
        {
            "offset": 18,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 33.8302961,
  "lng": -116.5452921
}

const singleLoadListingCards = [
  {
    hotelName: "100061580",
    paragraphs: [
      "The Westin Mission Hills Golf Resort & Spa is a picturesque retreat nestled amidst the stunning landscapes of Palm Springs, California. This elegant resort offers a seamless blend of modern comforts and the serene beauty of the desert surroundings. The resort's extensive spa facilities invite guests to unwind and rejuvenate with a variety of treatments and therapies.",
      "The Westin Mission Hills Golf Resort & Spa pampers pets with pet beds, food and water bowls, and special treats. The resort also features expansive grounds, perfect for leisurely strolls with your pets. With two championship golf courses and a luxurious spa, it's an ideal spot for both relaxation and recreation. The hotel allows you to bring up to two dogs that weigh less than 50 pounds.",
    ]
  },
  {
    hotelName: "100196902",
    paragraphs: [
      "Find respite in the sophistication at Kimpton Rowan Palm Springs, a pet-friendly haven. This refined hotel caters to the needs of travelers and their pets, ensuring an indelible and enjoyable stay for all.",
      // "Positioned ideally, Kimpton Rowan Palm Springs offers seamless access to Palm Springs' top attractions. The hotel also has a pet-friendly park that your furry companion can enjoy during your stay.",
      "As part of the Kimpton Hotels chain, the hotel warmly welcomes pets, providing special amenities and treats for furry companions. Kimpton Pittman Hotel loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees."
    ]
  },

  {
    hotelName: "100435818",
    paragraphs: [
      "Ace Hotel & Swim Club Palm Springs is in a converted 1960s desert motel and showcases a retro-chic ambiance. The hotel features beautifully designed rooms, ranging from cozy studios to spacious suites.",
      "When traveling to this hotel, you are allowed to bring one dog that weighs up to 25 pounds with a fee of $25 per night; if you bring two dogs, the fee is $35 per night."
    ]
  },

  {
    hotelName: "100408702",
    paragraphs: [
      "Ingleside Inn Palm Springs is a delightful pet-friendly hotel that exudes an elegant ambiance and boasts a prime location. Luxurious rooms are well-designed, ensuring a comfortable and pampering retreat for both you and your furry companion.",
      "This hotel welcomes up to two dogs weighing up to 25 lbs for a fee of $100 per pet, per stay. Please bear in mind that feline friends will have to sit this one out. As an added bonus, a dog park is close to the hotel so your dog can mingle with other pets.",
    ]
  },
  
  {
    hotelName: "100084728",
    paragraphs: [
      "Situated in the heart of downtown Palm Springs, the Hyatt Palm Springs is a convenient and pet-friendly hotel. Guests can easily explore the city's vibrant cultural scene, boutique shops, and diverse dining options. At the hotel, guests can relax by the outdoor heated pool, enjoy a dip in the hot tub, or explore the fitness center.",
      "Hyatt Palm Springs welcomes dogs of all sizes, making it an excellent choice for families with large dogs. If you do travel with your dogs to this hotel, there is a $50 fee per pet, per stay. The hotel's central location allows for easy access to pet-friendly restaurants and shops in the area."
    ]
  },

  {
    hotelName: "100027158",
    paragraphs: [
      "The Saguaro Palm Springs is a pet-friendly and stylish hotel that is in downtown Palm Springs. This hotel is in the heart of Palm Springs and has a rainbow-colored exterior and exciting atmosphere. The hotel has a large pool area where guests can enjoy the sun, lounge on daybeds, and enjoy cocktails from the bar. The Saguaro's restaurant, El Jefe, serves up delicious tacos, margaritas, and other flavorful dishes that perfectly complement the hotel's festive ambiance.",
      "The Saguaro Palm Springs allows you to bring your pets for a $50 fee. They kindly ask that you inform the front desk ahead of your arrival if you do plan on bringing your pets."
    ]
  },
]

const paragraphs = [
  [
    "Palm Springs, a desert oasis renowned for its stunning landscapes and luxurious resorts, welcomes travelers and their pets with welcome arms. From hiking trails to pet-friendly restaurants, there are tons of opportunities to explore Palm Springs with your four-legged friends. We've compiled our favorite hotels, activities, and restaurants for you to explore in Palm Springs with your pet. Pack your bags, grab your pet's leash, and get ready for an amazing journey of relaxation and exploration in Palm Springs."
  ],
  [
    `Palm Springs, with its breathtaking landscapes and year-round sunshine, is a dream destination for travelers seeking a relaxing getaway. Let's explore six of the best pet-friendly hotels in Palm Springs that will leave you with lifelong memories.`
  ],
  [
    `With desert landscapes, pet-friendly hiking trails, and activities for everyone, Palm Springs is a great destination for a vacation.`
  ],
  [
    `From outdoor adventures to pet-friendly dining, Palm Springs has many activities that will keep both you and your pets entertained. Here are ten of the best pet-friendly activities in Palm Springs:`
  ],
  [
    `Try these ten pet-friendly activities in Palm Springs to create memories with your furry friends in this desert paradise.`
  ],
  [
    `Exploring Palm Springs becomes even more enjoyable when you can dine out with your pets by your side. Palm Springs offers a variety of pet-friendly restaurants that cater to both you and your four-legged friends. Here are the top 10 pet-friendly restaurants in Palm Springs:`
  ]
]

const carouselOneData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image20.png',
    link: "https://www.palmspringsca.gov/government/departments/parks-recreation/parks-facilities/dog-park",
    linkText: "Palm Springs Dog Park",
    text: "Start your pet-friendly adventure with a visit to Palm Springs Dog Park. This off-leash park features separate areas for large and small dogs, allowing your pets to socialize and play freely. The park has water fountains and shade structures so that your pet stays cool and comfortable while playing with their friends.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image10.png',
    link: "https://www.indian-canyons.com/indian_canyons",
    linkText: "Indian Canyons",
    text: "Embark on a scenic hike with your dog at the Indian Canyons. Leashed pets are welcome on the miles of hiking trails that wind through the beautiful desert canyons and oases. The lush vegetation and serene landscapes make this an enjoyable and picturesque outing for both you and your pets.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Palm%20Springs%20VillageFest.jpeg',
    link: "https://villagefest.org/",
    linkText: "Palm Springs VillageFest",
    text: "On Thursday evenings, head to the Palm Springs VillageFest, a bustling street fair that welcomes pets on leashes. You and your furry friend can explore the vibrant market filled with local vendors, food stalls, and live entertainment. It's a great opportunity for your pets to experience the lively atmosphere of Palm Springs.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image17.png',
    link: "https://pstramway.com/",
    linkText: "The Palm Springs Aerial Tramway",
    text: "Take your pet on an adventure to the Palm Springs Aerial Tramway. Enjoy the amazing views of Coachella Valley from the Mountain Station after you take the tram up the San Jacinto Mountains. Once you journey to the top, you and your furry friend can enjoy short hikes along the nature trails!",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Cactus.jpeg',
    link: "https://hikingguy.com/hiking-trails/los-angeles-hikes/cactus-to-clouds-hike/",
    linkText: "Cactus to Clouds Trail",
    text: "If you and your dog are avid hikers, consider conquering the Cactus to Clouds Trail. This trail is a favorite amongst locals as you climb to the top of San Jacinto Mountain. Be sure to prepare plenty of water and snacks for both you and your furry companion.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image19.png',
    link: "http://www.moortenbotanicalgarden.com/",
    linkText: "Moorten Botanical Garden",
    text: "Explore the unique and beautiful Moorten Botanical Garden, which allows leashed pets to accompany their owners. This desert garden showcases an impressive collection of cacti and other desert plants. It's a relaxing and educational outing that both you and your pets will enjoy.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image7.png',
    link: "https://visitpalmsprings.com/dog-friendly-palm-springs-restaurants/",
    linkText: "Dog-Friendly Dining",
    text: "Palm Springs boasts a variety of pet-friendly restaurants and cafes with outdoor seating areas where pets are welcome. Treat your furry friend to a meal while you enjoy a delightful dining experience together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image6.png',
    link: "https://www.psmuseum.org/visit/palm-desert",
    linkText: "Palm Springs Art Museum in the Faye Sarkowsky Sculpture Garden",
    text: "Pets are permitted in the Faye Sarkowsky Sculpture Garden at the Palm Springs Art Museum. Take a leisurely stroll through the garden, surrounded by impressive sculptures and beautiful desert landscaping.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image9.png',
    link: "https://www.livingdesert.org/",
    linkText: "Living Desert Zoo and Gardens",
    text: "Pets are not allowed at the Living Desert Zoo and Gardens, but your pet can stay at the zoo's Pet Hotel while you enjoy exploring the zoo. This remarkable zoo showcases desert wildlife and botanical gardens, providing a unique learning experience.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Airbnb%20Experiences.jpeg',
    link: "https://www.airbnb.com/s/Palm-Springs--CA/experiences",
    linkText: "Airbnb Experiences",
    text: "For a tailored pet-friendly experience, check out Airbnb Experiences in Palm Springs. Some hosts offer activities that include your pets, such as guided hikes, pet photography sessions, and more.",
  },
]

const carouselTwoData = [
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image16.png',
    link: "https://www.lulupalmsprings.com/",
    linkText: "Lulu California Bistro",
    text: "Located in the heart of downtown Palm Springs, Lulu California Bistro welcomes pets on its outdoor patio. This restaurant has a large menu that features many food options, ensuring an enjoyable dining experience for you while your pets relax comfortably by your side.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Jake's%20Palm%20Springs.webp",
    link: "https://www.jakespalmsprings.com/",
    linkText: "Jake's Palm Springs",
    text: "Jake's Palm Springs has a pet-friendly patio that allows your furry friends to enjoy the company of other pets while you enjoy the food and cocktails.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image14.png',
    link: "https://www.cheekysps.com/",
    linkText: "Cheeky's Palm Springs",
    text: "For a delightful breakfast or brunch outing with your pets, Cheeky's Palm Springs is the place to be. Their pet-friendly patio offers a charming ambiance, and they even provide water bowls and treats for your furry friends. Don't miss their famous bacon flights and seasonal specialties.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image4.png',
    link: "https://triopalmsprings.com/",
    linkText: "Trio Restaurant",
    text: "Trio Restaurant is a popular dining destination known for its modern American cuisine. They have a pet-friendly patio that your dog can enjoy while you eat a delicious meal in the sun.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image13.png',
    link: "https://www.workshopkitchenbar.com/",
    linkText: "Workshop Kitchen + Bar",
    text: "Famed for its industrial-chic setting and farm-to-table fare, Workshop Kitchen + Bar welcomes pets on their outdoor patio. Indulge in their seasonal menu and craft cocktails while your pets lounge comfortably by your side.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image11.png',
    link: "https://www.kingshighwaydiner.com/",
    linkText: "King's Highway at Ace Hotel",
    text: "Located within the trendy Ace Hotel, King's Highway is a retro-inspired restaurant that warmly welcomes pets on its outdoor patio. Enjoy a delicious breakfast, lunch, or dinner with your pets as you bask in this unique dining spot.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Bill's%20Pizza.jpeg",
    link: "https://visitpalmsprings.com/eat-and-drink/bills-pizza-palm-springs/",
    linkText: "Bill's Pizza",
    text: "While in Palm Springs, head to Bill's Pizza, where pets are welcome on their patio. This local restaurant has a variety of pizza options, ensuring a delightful pizza experience for you and your pets alike.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image12.png',
    link: "https://azucarpalmsprings.com/",
    linkText: "Azucar at La Serena Villas",
    text: "Azucar, located at La Serena Villas, is a pet-friendly restaurant offering Latin-inspired dishes and craft cocktails. Their tranquil patio provides a cozy and relaxed setting for you and your pets to enjoy a delicious meal together.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/FARM.jpeg',
    link: "https://farmpalmsprings.com/",
    linkText: "FARM",
    text: "For a delightful farm-to-table experience, visit FARM at the La Plaza shopping district. Their pet-friendly patio is the perfect spot to indulge in fresh, locally sourced ingredients and contemporary American cuisine.",
  },
  {
    src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image1.png',
    link: "https://www.copleyspalmsprings.com/",
    linkText: "Copley's on Palm Canyon",
    text: "Set in a historic adobe house, Copley's on Palm Canyon offers a pet-friendly patio surrounded by lush gardens. Experience refined American cuisine while your pets enjoy a serene and beautiful environment.",
  },
]

const city = 'Palm Springs';
const state = 'CA';
const stateFull = 'CALIFORNIA';
const cityAndState = `${city}, ${state}`;

const PalmSprings: FC = () => {
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

export default PalmSprings;
