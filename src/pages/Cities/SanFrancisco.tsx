import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";

import Map from "../../components/UI/Map/Map";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";
import FilterBar from "../../components/FilterBar";
import { DesktopFilterBar } from "./DesktopFilterBar"
import {Helmet} from "react-helmet";
import ListingCard from "../../components/ListingCard";
import { 
  useStore, 
  useSelector 
} from "react-redux";
import { gql, useQuery } from "@apollo/client";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

import { LargeFilterBar } from '../../components/LargeFilterBar';
import IconTags from '../../components/IconTags';

import { HOTEL_DESCRIPTIONS } from '../../constants/locationPageDescriptions';
import HighlightBox from '../../components/CitiesContent/HighlightBox';
import SingleLoadListingCard from '../../components/SingleLoadListingCard';

const searchData = {
  "city": {
    "description": "San Francisco, CA, USA",
    "matched_substrings": [
        {
            "length": 8,
            "offset": 0
        }
    ],
    "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
    "reference": "ChIJIQBpAG2ahYAR_6128GcTUEo",
    "structured_formatting": {
        "main_text": "San Francisco",
        "main_text_matched_substrings": [
            {
                "length": 8,
                "offset": 0
            }
        ],
        "secondary_text": "CA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "San Francisco"
        },
        {
            "offset": 15,
            "value": "CA"
        },
        {
            "offset": 19,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 37.7749295,
"lng": -122.4194155
}

const SanFrancisco: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'San Francisco, CA');

  const city = 'San Francisco'
  const paragraphOne = 'San Francisco is a pet-friendly city known for its beautiful views and fun activities. Numerous pet-friendly hotels are available, ranging from luxurious hotels to cozy bed-and-breakfasts that cater to furry guests. Additionally, San Francisco has many dog parks and outdoor spaces where pets can run around off-leash.'

  const Text = ({ text }) => (
    <Typography variant="base">{text}</Typography>
  )
  const Bold = ({ text }) => (
    <Typography variant="p"><b>{text}</b></Typography>
  )

  const LinkContent = ({ link, linkText, text }) => (
    <Box mt="0.5rem">
      <Typography variant='base' component='p'>
        <a href={link} target='_blank' rel='noreferrer'>
          {linkText}
        </a>
      </Typography>
      <Typography variant='base' component='p'>
        {text}
      </Typography>
    </Box>
  );

  const Img = ({ src, text }) => (<>
    <img loading="lazy" style={{ marginTop: "-1rem", borderRadius: 6, maxHeight: '480px', objectFit: 'cover' }} src={src} />
    <Typography mt="-1.25rem" variant="base" component="p">Photo Credit: {text}</Typography>
  </>)

  return <>
    <Helmet>
      <title>Pet Friendly Hotels San Francisco, CA | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, CA | Romingo`}
      />
      <meta property='og:description' content={paragraphOne} />
      <meta property='og:image' content={cityContent.heroImage} />
    </Helmet>

    <ScrollToTop />
    <Navbar />
    <Box
      component="img"
      src={cityContent.heroImage}
      alt={city}
      sx={{
        objectFit: "cover",
        width: "100%",
        height: { xs: "40vh", md: "70vh" },
        boxShadow: 0,
      }}
    />
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography component="h1" variant="h2" color="text.primary">
          Pet Friendly Hotels {city}
        </Typography>
      </Box>
      <Divider variant="middle" light sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          CALIFORNIA
        </Typography>
      </Divider>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            {paragraphOne}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            The city&apos;s neighborhoods offer many opportunities for pet-friendly dining, with many restaurants and cafes welcoming pets on their outdoor patios. Pet parents can enjoy shopping at pet boutiques where they can buy treats, toys, and stylish accessories for their furry friends.
          </Typography>
        </Grid>
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden mdDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar city={searchData} />
            </Box>
            <IconTags />
          </Hidden>
          <Hidden mdUp>
            <FilterBar city={searchData} />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            San Francisco is a wonderful city to visit because of all of the exciting things you can do. Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy in San Francisco.
          </Typography>
        </Grid>

        <Grid ml="auto" mt="0.5rem" item xs={12} md={4}>
          <Box
            component="img"
            src={cityContent.secondaryImage}
            alt={city}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "250px",
              boxShadow: 4,
              borderRadius: 3,
            }}
          />
        </Grid>

      
        <Box
          width='100%'
          mt="1rem"
          display='flex'
          flexDirection='column'
          gap='1.5rem'
        >
          <Divider />
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in San Francisco</Typography>

          <Bold text="Hilton San Francisco Union Square" />
          <SingleLoadListingCard hotelName="100436878" />
          <Text text="The Hilton San Francisco Union Square is a landmark in the heart of the city. This pet-friendly hotel is stylish and modern with all the amenities you desire. This hotel has a prime location just steps away from Union Square's bustling shops and theaters." />
          <Text text="The Hilton San Francisco Union Square is a pet-friendly hotel. When you stay here, you can bring two pets with you that weigh up to 75 pounds each. You will also pay a fee of $50 per pet per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop lounge', 'Fitness center', 'Dining options']}
          />


          <Bold text="Kimpton Hotel Enso" />
          <SingleLoadListingCard hotelName="100399492" /> 
          <Text text="Located in Japantown, the Kimpton Hotel Enso is a luxury, pet-friendly hotel. The hotel's elegant and spacious rooms feature contemporary decor with a touch of Japanese flair, creating a soothing and inviting ambiance. The nearby Japantown Peace Plaza and Buchanan Street Mall are excellent spots for leisurely strolls with your pet." />
          <Text text="The Kimpton loves when you bring your pets on your trip. This is a great options because they allow pets of all sizes and breeds with no extra fees. When you check in, your pet will receive treats and the hotel offers pet beds and food bowls." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Wine and sake receptions in the lobby', 'Dining options']}
          />


          <Bold text="Hyatt Regency San Francisco" />
          <SingleLoadListingCard hotelName="100437718" />
          <Text text="The Hyatt Regency San Francisco has a prime location along the water where you can enjoy many activities. This pet-friendly hotel offers breathtaking views of the Bay Bridge, Alcatraz Island, and the city skyline. The elegant and contemporary rooms feature plush amenities and modern comforts, providing a serene retreat amidst the urban buzz. The Hyatt Regency San Francisco provides wonderful service, ensuring that every guest's stay is enjoyable." />
          <Text text="The Hyatt Regency San Francisco is a great, pet-friendly option for your trip to the city. You can bring dogs that weigh up to 20 pounds for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Heated outdoor pool', 'Fitness center', 'Dining options']}
          />

          <Bold text="Proper Hotel" />
          <SingleLoadListingCard hotelName="100547528" />
          <Text text="The Proper Hotel in San Francisco is a pet-friendly hotel that is elegant and sophisticated. The Proper Hotel has a cool location in a historic flatiron building in San Francisco. The hotel's location offers easy access to popular neighborhoods, iconic landmarks, and a myriad of dining and entertainment options." />
          <Text text="The Proper Hotel welcomes two of your pets and they can weigh up to 35 pounds. When your pets arrive, they will receive food bowls and treats. The Proper Hotel donates a portion of the $100 pet fee to Best Friends Animal Society." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop deck', 'Fitness center', 'Free hotel car service', 'Dining options']}
          />

          <Bold text="The SF Marriott Marquis" />
          <SingleLoadListingCard hotelName="100058704" />
          <Text text="The SF Marriott Marquis is a pet-friendly hotel located in downtown San Francisco. This hotel is in a prime location just steps away from some of the city's most iconic attractions. The SF Marriott Marquis provides a blend of style and comfort, including an inviting atmosphere for both business and leisure travelers. This pet-friendly hotel promises an exceptional and memorable experience for all visitors to San Francisco." />
          <Text text="The SF Marriott Marquis is a great place to stay with your pet when you travel to San Francisco. Pets are welcome to stay with a maximum of one pet per room. There is a fee of $125 and pets must weigh below 40 pounds." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Rooftop restaurant and bar', 'Dining options']}
          />

          <Bold text="InterContinental Hotels & Resorts" />
          <SingleLoadListingCard hotelName="100210840" />
          <Text text="InterContinental Hotels & Resorts, often referred to as InterCon, is a pet-friendly hotel brand that offers sophisticated stays and amazing service. As with all InterContinental properties, guests can expect exceptional service during their stay. This pet-friendly hotel offers easy access to iconic landmarks, upscale shopping, and renowned dining options." />
          <Text text="If you want to travel to San Francisco with your dog, you should consider staying at the InterContinental. Your pets are welcome to stay in your hotel room for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Dining options']}
          />

         

          <Typography variant="h2">The Top Pet-Friendly Activities in San Francisco</Typography>
          
          <LinkContent
            link="https://www.parksconservancy.org/parks/crissy-field"
            linkText="Off-Leash Fun at Crissy Field"
            text="Head to Crissy Field, a stunning waterfront park with open spaces and sandy shores. Here your dog can roam off-leash and frolic in the surf. The area offers fantastic views of the Golden Gate Bridge and is a favorite spot for locals and visitors alike."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image11.png" text="Parks Conservancy" />

          <LinkContent
            link="https://www.sftravel.com/article/visitors-guide-to-golden-gate-park"
            linkText="Golden Gate Park Adventures"
            text="Explore San Francisco's iconic Golden Gate Park with your pet. Enjoy scenic strolls through lush gardens, have a picnic by the Dutch Windmill, or visit the Bison Paddock. Many areas of the park allow leashed pets, making it a perfect spot for leisurely walks."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image11.png" text="San Francisco Travel" />

          <LinkContent
            link="https://www.presidio.gov/places/baker-beach"
            linkText="Baker Beach Bliss"
            text="Take your dog to Baker Beach, a picturesque spot where they can play in the sand and splash in the waves. Keep in mind that dogs should remain on-leash north of Lobos Creek to protect the endangered Snowy Plover."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Baker%20Bearch.jpeg" text="https://ph.hotels.com/go/usa/baker-beach-san-francisco" />

          <LinkContent
            link="https://www.cityexperiences.com/san-francisco/city-cruises/dog-day-on-the-bay-petco/"
            linkText="Pet-Friendly Boat Tours"
            text="Embark on a pet-friendly boat tour around the San Francisco Bay. Several tour operators welcome pets on board. This is a fun way to see the city's iconic skyline from a whole new perspective."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image9.png" text="City Experiences" />

          <LinkContent
            link="https://fortmason.org/visit/"
            linkText="Pet Pampering at Fort Mason Center"
            text="Visit Fort Mason Center's &quot;Canine Cove,&quot; a designated off-leash area where dogs can mingle and enjoy the ocean breezes. After, you can wash your pet at the Fort Mason Dog Wash, where they can enjoy a spa-like experience."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Fort%20Mason%20Center.jpeg" text="https://flaxart.com/flax-canvas/a-new-flax-store-in-fort-mason-center/" />

          <LinkContent
            link="https://sanfran.com/best-san-francisco-dog-friendly-bars"
            linkText="Yappy Hours at Dog-Friendly Bars"
            text="Many bars in San Francisco are pet-friendly and host special &quot;yappy hours&quot; where dogs are welcome. Enjoy a drink or a meal while your furry friend socializes with other dogs in a relaxed and enjoyable atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image5.png" text="San Francisco Magazine" />

          <LinkContent
            link="https://www.napavalley.com/blog/dog-friendly-wineries-napa-valley/"
            linkText="Pet-Friendly Winery Tour"
            text="Discover the nearby wine country with your pet on a pet-friendly winery tour. Some wineries allow leashed pets, allowing you to savor the region's finest wines with your loyal companion by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image13.png" text="Napa Valley" />

          <LinkContent
            link="https://muttville.org/"
            linkText="Muttville Senior Dog Rescue"
            text="If you're looking to give back and spread some love, volunteer at Muttville Senior Dog Rescue. This organization rescues and rehabilitates senior dogs, providing them with a second chance at finding a loving forever home."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Muttville%20Senior%20Dog%20Rescue.jpeg" text="https://foreverhome.muttville.org/gallery" />

          <LinkContent
            link="https://dogfriendlyareas.com/dog-friendly-stores-in-san-francisco/"
            linkText="Pet-Friendly Shopping Spree"
            text="Indulge in a pet-friendly shopping spree at the numerous pet boutiques scattered throughout the city. From fashionable accessories to gourmet treats, your furry friend will be happy!"
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/San%20Fransisco.jpeg" text="https://fcgaarchitecture.com/project/san-francisco-premium-outlets/" />

          <LinkContent
            link="https://sfrecpark.org/facilities/facility/details/Alamo-Square-323"
            linkText="Pet Picnic at Alamo Square Park"
            text="Enjoy a pet picnic at Alamo Square Park, known for its iconic &quot;Painted Ladies&quot; Victorian homes. This lovely park offers plenty of green space for you and your pet to relax, unwind, and enjoy the beautiful surroundings."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Alamo%20Square%20Park.jpeg" text="https://www.sftravel.com/things-to-do/attractions/iconic-sf/painted-ladies" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in San Francisco</Typography>
          <LinkContent
            link="https://greensrestaurant.com/"
            linkText="Fort Mason Greens"
            text="Fort Mason Greens overlooks the San Francisco Bay and has a dog-friendly patio for you to enjoy. At this restaurant, you can enjoy a delectable selection of fresh salads, sandwiches, and seafood. The stunning waterfront views and relaxed atmosphere make this eatery a perfect spot for a leisurely meal with your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image2.png" text="Fort Mason Greens" />

          <LinkContent
            link="https://www.beachchalet.com/"
            linkText="Beach Chalet Brewery & Restaurant"
            text="Situated near Ocean Beach, the Beach Chalet Brewery & Restaurant boasts a spacious outdoor patio where dogs are welcome. Enjoy a meal paired with a craft beer while your dog enjoys the ocean breeze."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image19.png" text="Beach Chalet" />


          <LinkContent
            link="https://www.zeitgeistsf.com/"
            linkText="Zeitgeist"
            text="Zeitgeist offers a dog-friendly beer garden where your pet can join you while you socialize and enjoy pub-style fare. This restaurant is well-known for its vibrant environment and large beer selection. This popular Mission District spot is perfect for a laid-back evening with your pet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Zeitgeist.jpeg" text="https://missionlocal.org/2016/12/zeitgeist-concerned-over-shadow-to-oppose-mission-housing-project/" />

          <LinkContent
            link="https://www.rampsf.com/"
            linkText="The Ramp Restaurant"
            text="Nestled along the waterfront, The Ramp Restaurant is a hidden gem that invites dogs to dine on its dog-friendly patio. This restaurant offers delicious seafood dishes and American classics, and an amazing view of the marina."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/The%20Ramp%20Restaurant.avif" text="https://www.theinfatuation.com/san-francisco/reviews/the-ramp" />

          <LinkContent
            link="https://www.parkcafelife.com/"
            linkText="Duboce Park Cafe"
            text="Paradise Park Cafe provides a pet-friendly patio where your dog can relax while you eat sandwiches, salads, and breakfast delights. The cafe's charming outdoor space makes it a favorite among locals and pet owners."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image18.png" text="Paradise Park Cafe" />

          <LinkContent
            link="https://www.thelittlechihuahua.com/"
            linkText="The Little Chihuahua"
            text="This popular Mexican eatery welcomes pets on its outdoor patio while you indulge in flavorful tacos, burritos, and fresh salsas. The Little Chihuahua is a must-visit spot for Mexican cuisine enthusiasts exploring the Mission District."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/The%20Little%20Chihuahua.jpeg" text="https://onthegrid.city/san-francisco/nopa/the-little-chihuahua" />

          <LinkContent
            link="https://sparksocialsf.com/"
            linkText="Spark Social SF"
            text="Spark Social SF provides a large outdoor space where you and your pet can enjoy food trucks. Savor international cuisine while your pet basks in the social atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image17.png" text="Spark Social SF" />

          <LinkContent
            link="https://www.thecavaliersf.com/"
            linkText="The Cavalier"
            text="The Cavalier is a chic brasserie in SoMa that welcomes pets on its outdoor patio. Enjoy British-inspired dishes with a modern twist. And you can even order a treat for your pet from their dog menu."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/The%20Cavalier.avif" text="https://www.thecavaliersf.com/private-events-venue/blue-bar/" />

          <LinkContent
            link="https://www.zaziesf.com/"
            linkText="Zazie"
            text="Zazie is a quaint French-inspired bistro in Cole Valley and offers a charming pet-friendly garden patio. Here you can enjoy delectable brunch options with your pet by your side. This spot is a favorite among locals and tourists alike."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/Zazie.jpg" text="https://sf.eater.com/2020/1/17/21070740/zazie-cole-valley-brunch-sale" />

          <LinkContent
            link="https://rosescafesf.com/"
            linkText="Rose’s Cafe"
            text="Rose’s Café is an Italian restaurant with an extensive all-day menu that will also accommodate your pets. They’re known to supply water bowls and gourmet dog biscuits to their canine guests as well, making this a great pet-friendly restaurant to visit!"
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Francisco/image14.png" text="Slo_Good_Eats" />



        </Box>


        
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden mdDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar city={searchData} />
            </Box>
            <IconTags />
          </Hidden>
          <Hidden mdUp>
            <FilterBar city={searchData} />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>;
};

export default SanFrancisco;
