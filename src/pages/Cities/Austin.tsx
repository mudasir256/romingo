import { FC } from "react";
import { default as CityPageLayout } from '../../layouts/CitiesPages';

const searchData = {
  "city": {
    "description": "Austin, Texas, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        },
        {
            "length": 2,
            "offset": 8
        }
    ],
    "place_id": "ChIJLwPMoJm1RIYRetVp1EtGm10",
    "reference": "ChIJLwPMoJm1RIYRetVp1EtGm10",
    "structured_formatting": {
        "main_text": "Austin",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "Texas, USA",
        "secondary_text_matched_substrings": [
            {
                "length": 2,
                "offset": 0
            }
        ]
    },
    "terms": [
        {
            "offset": 0,
            "value": "Austin"
        },
        {
            "offset": 8,
            "value": "Texas"
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
  "lat": 30.267153,
  "lng": -97.7430608
}

const singleLoadListingCards = [
  {
    hotelName: "100195468",
            paragraphs: [
              "Aloft Austin Downtown is a modern and pet-friendly hotel that offers a vibrant and playful atmosphere. The hotel is near the 6th Street Entertainment District, which has the area's best shopping, dining, and entertainment. The University of Texas at Austin and Zilker Metropolitan Park are also nearby. With its trendy design and rooftop pool, Aloft Austin Downtown promises an enjoyable stay for both human and furry guests.",
              "The hotel's pet-friendly policy allows two dogs weighing up to 40 pounds to stay with their owners. There is no pet fee for their stay and your pets will receive a dog bed, bowl, treats, and toys."
    ] 
  },
  
  {
    hotelName: "100156448",
    paragraphs: [
      "A sister property to Hotel Van Zandt, Kimpton Hotel Van Zandt is a top pet-friendly hotel in Austin. Named after the legendary Texas musician Townes Van Zandt, this hotel celebrates the city's vibrant music scene and arts culture. The rooftop pool and pet-friendly patio offer a relaxing spot for guests to unwind with their pets.",
      "This boutique hotel embraces Kimpton's \"Pet-Friendly\" ethos, allowing pets to stay with their owners at no extra charge. When you check in, your pet will receive treats, food, water bowls, and a comfy bed to enjoy during their stay!"
    ]
  },
  {
    hotelName: "100182480",
    paragraphs: [
      "Archer Hotel Austin is a chic and pet-friendly hotel that welcomes pets of all shapes and sizes. The hotel is in the Domain Northside and is steps from the Rock Rose Entertainment District. Archer Hotel Austin is walking distance from many popular attractions, including pet-friendly parks and walking areas.",
      "This hotel is pet-friendly and allows you to bring one dog that is up to 50 pounds. There is a pet cleaning fee of $150 per stay that you will pay when staying at Archer Hotel Austin. Your pet will receive water and food bowls, biscuits, bandanas, a &quot;Dog in Room&quot; sign, waste bags, and a doggy bed."
    ]
  },
  {
    hotelName: "100193952",
    paragraphs: [
      "Hyatt House Austin Downtown is a stylish and modern hotel located in the heart of Austin, Texas. This hotel is in a prime location and is close to the city's popular attractions, dining, and entertainment venues. Take advantage of the hotel's convenient location to explore nearby parks and pet-friendly attractions with your furry companion.",
      "Nestled in the heart of downtown, Hyatt House Austin Downtown offers spacious, pet-friendly suites with separate living and sleeping areas. Dogs are welcome to join you if they are under 50 pounds (under 75 pounds with two dogs). There is a fee of $75/day for stays up to 6 nights and there is an additional $100 fee if you stay 7-30 nights.",
    ]
  },
  {
    hotelName: "100092510",
    paragraphs: [
      "The Driskill Hotel is an iconic and historic landmark located in the heart of downtown Austin, Texas. Established in 1886, this grand hotel exudes timeless elegance and charm, offering a blend of classic architecture with modern amenities. The Driskill is renowned for its luxurious accommodations, impeccable service, and its rich history as one of Austin's oldest hotels.",
      // "The Driskill Hotel's central location allows for easy access to Austin's vibrant entertainment, shopping, and dining scenes. This is an ideal choice for travelers seeking a luxurious and immersive experience in the heart of the city.",
      "The hotel offers a pet policy that allows dogs weighing up to 75 pounds to stay with their owners. There is a $100 fee for your pets when your bring them to The Driskill Hotel."
    ]
  },
  {
    hotelName: "100019286",
    paragraphs: [
      "The Omni Austin Hotel Downtown welcomes pets with open arms, making it a popular choice for pet owners. This hotel offers stunning views of the city and is close to Austin's popular attractions, live music venues, and cultural landmarks. Guests can enjoy luxurious amenities, including a rooftop pool, fitness center, and multiple dining options.",
      "The hotel's pet-friendly policy allows two dogs weighing up to 25 pounds each to stay with their owners. There is a cleaning fee of $125.00 for cleaning services."
    ]
  },
];
const paragraphs = [
  [
    "Pet-friendly travel in Austin, Texas, is a delightful experience for both humans and their furry companions. Austin warmly welcomes pets at various establishments, making it an inclusive destination for pet owners.",
    "With numerous pet friendly parks, hiking trails, and outdoor spaces, Austin is the ideal city to travel to with your pet. You can enjoy restaurants, cafes, and breweries in Austin that have pet-friendly patios and dining options. Additionally, there are several pet-friendly hotels that cater to the needs of both you and your beloved pets.",
    "From exploring the vibrant music scene to experiencing the city's unique culture, you will have an amazing time in Austin. Here are some of our favorite pet-friendly hotels, activities, and restaurants to see in Austin, Texas."
  ],
  [
    `Austin, Texas, is a city known for its welcoming and pet-friendly culture. Here are Austin's finest pet-friendly hotels, all the way from luxurious hotel chains to charming boutique properties.`
  ],
  [

  ],
  [
    "Austin, Texas, is a very pet-friendly city and has many activities for you and your four-legged friend to enjoy. From scenic parks to pet-friendly restaurants, Austin promises a delightful experience for both you and your furry companion.",
    "Here are the best pet-friendly activities in Austin for you and your pet to enjoy."
  ],
  [
    "Austin's pet-friendly activities offer a diverse range of adventures for you and your furry companion to enjoy together. So, whether you're exploring the great outdoors, dining at pet-friendly restaurants, or experiencing unique indoor attractions, Austin's pet-friendly activities guarantee a wagging tail and cherished memories for both pet owners and their furry friends."
  ],
  [
    "Austin, Texas, is a city that loves its pets, and this pet-friendly culture extends to its vibrant dining scene. From Tex-Mex to farm-to-table meals, Austin has many options for you and your furry friend to enjoy.",
    "Here are the top 10 pet-friendly restaurants in Austin where you can enjoy delectable dishes with your dog."
  ],
  [
    "Austin's top 10 pet-friendly restaurants embrace the city's inclusive and pet-loving culture. From spacious dog parks to welcoming patios, these eateries go above and beyond to cater to both human and pet tastes. Leash up your pet, embark on a culinary journey, and savor delicious dishes while creating cherished memories together in Austin's pet-friendly paradise."
  ]
]
const carouselOneData = [
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/Zilker%20Metro%20Park%20Austin.jpg",
    link: "https://www.austintexas.gov/department/zilker-metropolitan-park",
    linkText: "Zilker Metropolitan Park",
    text: "Zilker Park is a pet-friendly oasis, offering 350 acres of open space for you and your furry friend to explore. Enjoy a hike, have a picnic by the lake, or let your dog play off-leash in the dog park.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image1.png" ,
    link: "https://www.austintexas.gov/department/barton-springs-pool",
    linkText: "Barton Springs Pool",
    text: "Located within Zilker Park, Barton Springs Pool is a natural spring-fed swimming pool that allows leashed dogs in specific areas. Take a refreshing dip with your pet in the cool waters and bask in the beautiful Austin sunshine.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image6.png",
    link: "https://austinparks.org/park/red-bud-isle/",
    linkText: "Red Bud Isle",
    text: "Red Bud Isle is a popular dog park, and dogs can swim and play in the waters of Lake Austin. Enjoy a scenic walk along the trails and take in the stunning views of the lake and surrounding nature." ,
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image4.png" ,
    link: "https://yardbar.com/",
    linkText: "Yard Bar",
    text: "Treat your pet to an experience at Yard Bar, a dog-friendly restaurant and bar with an off-leash dog park. While you savor craft beers and delicious food, your furry friend can socialize with other dogs and enjoy playtime.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image18.png" ,
    link: "https://tpwd.texas.gov/state-parks/mckinney-falls",
    linkText: "McKinney Falls State Park",
    text: "Just a short drive from downtown Austin, McKinney Falls State Park offers pet-friendly hiking trails and beautiful waterfalls. Leash up your pet and explore the picturesque landscapes, making memories together in the great outdoors.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image11.png" ,
    link: "https://austinboulderingproject.com/",
    linkText: "Austin Bouldering Project",
    text: "If you like to rock climb, then the Austin Bouldering Project is for you. This is a pet-friendly indoor climbing gym where you can enjoy climbing sessions with your leashed dog by your side.",
  },
  {       
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image5.png",
    link: "https://peterpanminigolf.com/",
    linkText: "Peter Pan Mini Golf",
    text: "Play mini-golf with your pet by your side at Peter Pan Mini Golf. This pet-friendly attraction has been entertaining families for decades and your pet is guaranteed to have a great time.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image8.png",
    link: "https://www.austintexas.org/austin-insider-blog/post/austins-hike-bike-trail/",
    linkText: "Lady Bird Lake Trail",
    text: "The Lady Bird Lake Trail is a pet-friendly hiking trail that loops around the scenic lake. Leash up your pet and enjoy a relaxing walk or bike ride along the trail. You'll see beautiful scenes of the Austin city skyline." ,
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image12.png" ,
    link: "https://www.austinsteamtrain.org/",
    linkText: "Austin Steam Train",
    text: "Treat your pet to a unique experience on the Austin Steam Train's pet-friendly excursions. This scenic train ride takes you and your furry friend on a journey through the beautiful Hill Country.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image2.png",
    link: "https://woofgangbakery.com/",
    linkText: "Woof Gang Bakery & Grooming",
    text: "Spoil your pet with a visit to Woof Gang Bakery! This is a pet-friendly store that offers gourmet treats, toys, and pet grooming services. Let your furry friend indulge in a shopping spree and pampering session.",
  }
]
const carouselTwoData = [
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image13.png",
    link: "https://www.bangersaustin.com/",
    linkText: "Banger's Sausage House & Beer Garden",
    text: "Banger's is a famous spot with a dog-friendly patio that offers a large selection of sausages and over 100 beers. Your pet will love this place because the restaurant provides water bowls and a place for them to meet other dogs.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image3.png",
    link: "https://www.radiocoffeeandbeer.com/",
    linkText: "Radio Coffee & Beer",
    text: "Radio Coffee & Beer is a laid-back coffeehouse and beer garden with a pet-friendly outdoor area. Bring your pet along as you enjoy coffee in the morning and local brews in the evening with live music performances.",
  },
  {          
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image15.png" ,
    link: "https://www.joscoffee.com/",
    linkText: "Jo's Coffee",
    text: 'Known for its iconic "I Love You So Much" mural, Jo&apos;s Coffee offers a dog-friendly patio where you can savor espresso drinks and eat breakfast tacos while your pet hangs out with you.',
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image20.png",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/Moontower%20Austin.jpg" ,
    link: "https://moontowersaloon.com",
    linkText: "Moontower Saloon",
    text: "Moontower Saloon is a dog-friendly bar and restaurant with a spacious outdoor area perfect for enjoying the Austin sunshine with your pet. Sip on cold drinks, munch on delicious bar food, and relax in the company of your four-legged companion.",
  },
  {           
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image16.png",
    link: "https://theabgb.com/",
    linkText: "ABGB - Austin Beer Garden Brewing",
    text: "ABGB is a dog-friendly brewpub with a lively patio, perfect for craft beer enthusiasts and pet owners. Enjoy a wide selection of house-brewed beers and tasty pizzas while your pet enjoys the outdoor setting.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image14.png" ,
    link: "https://www.fresaschicken.com/",
    linkText: "Fresa's Chicken al Carbon",
    text: "Fresa's Chicken al Carbon offers a pet-friendly patio where you can savor mouthwatering rotisserie chicken and Mexican-inspired dishes. This casual spot provides a relaxed and welcoming atmosphere for both human and furry guests.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image10.png" ,
    link: "https://www.cedardooraustin.com/",
    linkText: "Cedar Door",
    text: "Cedar Door, located in the heart of downtown Austin, is a beloved and iconic restaurant that holds a special place in the city's history. Established in 1975, Cedar Door is known as &quot;Austin's Original Patio Bar.&quot; Cedar Door's pet-friendly patio is a favorite spot for pet owners looking to dine with their furry companions.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image1.png",
    link: "https://www.casadeluz.org/",
    linkText: "Casa de Luz",
    text: "Casa de Luz is a unique and health-conscious restaurant located in Austin, Texas, that offers a holistic and nurturing dining experience. The restaurant focuses on serving plant-based, organic, and gluten-free meals that are prepared with love and intention, and has a pet-friendly patio for you to enjoy with your best friend.",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image9.png",
    link: "https://www.oztaphouse.com/",
    linkText: "Oz Tap House",
    text: "Oz Tap House is a lively and vibrant bar and restaurant located in Austin, Texas, known for its extensive selection of craft beers and friendly atmosphere. This pet-friendly establishment warmly welcomes guests and their furry companions, making it a popular spot for pet owners to enjoy a night out together. The restaurant's outdoor patio provides a comfortable setting for patrons to relax and socialize with their pets by their side. ",
  },
  {
    src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image19.png",
    link: "https://www.hopdoddy.com/",
    linkText: "Hop Daddy Burger Bar",
    text: "Hopdoddy Burger Bar is a popular and bustling restaurant chain that originated in Austin, Texas, known for its mouthwatering burgers and creative culinary flair. The restaurant's pet-friendly patios are a hit among pet owners, allowing guests to enjoy their delicious burgers, hand-cut fries, and unique milkshakes while their furry companions relax nearby.",
  }
];

const city = 'Austin';
const state = 'TX';
const stateFull = 'TEXAS';
const cityAndState = `${city}, ${state}`;

const Austin: FC = () => {
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

export default Austin;
