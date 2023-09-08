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


//TODO:
const searchData = {
  "city": {
    "description": "Baltimore, MD, USA",
    "matched_substrings": [
        {
            "length": 9,
            "offset": 0
        }
    ],
    "place_id": "ChIJt4P01q4DyIkRWOcjQqiWSAQ",
    "reference": "ChIJt4P01q4DyIkRWOcjQqiWSAQ",
    "structured_formatting": {
        "main_text": "Baltimore",
        "main_text_matched_substrings": [
            {
                "length": 9,
                "offset": 0
            }
        ],
        "secondary_text": "MD, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Baltimore"
        },
        {
            "offset": 11,
            "value": "MD"
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
  "lat": 39.2903848,
  "lng": -76.6121893
}

const Baltimore: FC = () => {

  //TODO:
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Baltimore');

  const paragraphOne = "If you're a pet lover looking to explore a vibrant city, Baltimore is the perfect destination for pet-friendly travel! Known for its rich history, diverse culture, and scenic waterfront, this charming city welcomes furry companions with open arms."

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
      <title>Pet Friendly Hotels Baltimore, MD | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels Baltimore, MD | Romingo`}
      />
      <meta property='og:description' content={paragraphOne} />
      <meta property='og:image' content={cityContent.heroImage} />
    </Helmet>

    <ScrollToTop />
    <Navbar />
    <Box
      component="img"
      src={cityContent.heroImage}
      alt={"Baltimore"}
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
          Pet Friendly Hotels Baltimore
        </Typography>
      </Box>
      <Divider variant="middle" light sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          MARYLAND
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
            sx={{ textAlign: "justify", lineHeight: 2, my: '1rem' }}
          >
            Enjoy leisurely strolls with your four-legged friend along the picturesque Inner Harbor, where you&apos;ll find many pet-friendly cafes and restaurants with outdoor seating. Don&apos;t miss out on exploring the beautiful parks and green spaces scattered throughout the city, such as Patterson Park, Federal Hill Park, and Druid Hill Park, where your pet can roam freely and make new furry friends.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2, my: '1rem' }}
          >
            For an extra dose of fun, check out the local pet events and festivals that often take place, bringing the community of pet owners together in celebration.
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
            <FilterBar />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
        <Grid my="0.5rem" item xs={12} md={8}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            From historic landmarks to bustling neighborhoods, Baltimore offers a diverse range of experiences that you and your pet can enjoy together, making it an unforgettable destination for pet-friendly travel.
          </Typography>
        </Grid>

        {cityContent.secondaryImage && 
        <Grid ml="auto" mt="0.5rem" item xs={12} md={4}>
          <Box
            component="img"
            src={cityContent.secondaryImage}
            alt={"Austin"}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "250px",
              boxShadow: 4,
              borderRadius: 3,
            }}
          />
        </Grid>
        }

      
        <Box
          mt="1rem"
          width='100%'
          display='flex'
          flexDirection='column'
          gap='1.5rem'
        >
          <Divider />
          <Typography component="h2" variant="h2">The Top Pet-Friendly Accommodations in Baltimore</Typography>
          
          <Bold text="Hotel Revival Baltimore" />
          <SingleLoadListingCard hotelName="100211906" />
          <Text text="Hotel Revival Baltimore is a chic and trendy boutique hotel located in the heart of Mount Vernon, offering a vibrant and artistic ambiance that reflects the city's rich cultural heritage. The hotel boasts well-appointed rooms and suites, complete with modern amenities and stylish decor, providing a relaxing retreat after a day of exploring Baltimore's attractions." />
          <Text text="With its central location, guests and their pets can easily access nearby pet-friendly parks and cafes, making it an ideal choice for those seeking a pet-friendly and immersive Baltimore experience." />
          <Text text="For pets, the hotel provides plush pet beds, food and water bowls, and even a special pet menu, ensuring they receive the same level of pampering as their human companions. You can bring two dogs of any size to Hotel Revival Baltimore for no additional fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop restaurant', 'Cocktail lounge and karaoke rooms', 'Coffee bar', 'Co-working spaces', 'Concierge service', 'Fitness center', 'Valet parking']}
          />

    
          <Bold text="Kimpton hotel Monaco Baltimore Inner Harbor" />
          <SingleLoadListingCard hotelName="100397030" />
          <Text text="Kimpton Hotel Monaco Baltimore Inner Harbor is a luxurious and pet-friendly haven nestled just steps away from the picturesque Inner Harbor. This boutique hotel exudes elegance and charm while wholeheartedly embracing four-legged guests." />
          <Text text="Pets of all sizes and shapes are welcome for no additional fee at the Kimpton Hotel Monaco Baltimore Inner Harbor. Upon arrival, pets of all shapes and sizes are greeted with warm hospitality, receiving pet beds, bowls, and delightful treats to make them feel right at home. The hotel's prime location allows easy access to the vibrant city's attractions, making it a perfect base for exploring Baltimore with your furry companion." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Onsite dining with locally sourced seasonal foods', 'Yoga mat', 'Fitness center', 'Nightly wine hour', 'Free cofee an tea service', 'Complimentary access to Wag! Premium']}
          />

          <Bold text="Four Seasons Hotel Baltimore" />
          <SingleLoadListingCard hotelName="100022498" />
          <Text text="The Four Seasons Hotel Baltimore is a luxurious waterfront retreat that offers unparalleled elegance and comfort in the heart of the city. The hotel's stunning waterfront views and top-notch amenities create a tranquil oasis for both guests and their furry friends to enjoy. With a dedicated concierge service, the Four Seasons can provide information about nearby dog parks and pet-friendly attractions, allowing guests to explore Baltimore with ease." />
          <Text text="When you stay at The Four Seasons Hotel Baltimore, you can bring one dog that weighs up to 65 pounds for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free WiFi', 'Newspaper access', 'Spa services', '24-hour dining options', 'Pool', 'Fitness center']}
          />


          <Bold text="Sagamore Pendry Baltimore" />
          <SingleLoadListingCard hotelName="100193168" />
          <Text text="The Sagamore Pendry Baltimore is an exquisite and pet-friendly hotel located in the historic Fells Point neighborhood, offering a captivating blend of history and modern luxury. With its prime location in Fells Point, guests can take leisurely strolls through the charming streets and explore the city's pet-friendly attractions with ease." />
          <Text text="This waterfront boutique hotel embraces pets of all sizes, ensuring they have a comfortable and enjoyable stay alongside their human companions. You can bring two dogs of any size and there is a fee of $150 per stay." />          
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Pool with waterfront views', 'Whiskey bar with tastings', 'Fitness center']}
          />

          <Bold text="Hyatt Regency Baltimore Inner Harbor" />
          <SingleLoadListingCard hotelName="100438110" />
          <Text text="Conveniently located in the Inner Harbor area, the Hyatt Regency Baltimore Inner Harbor provides a pet-friendly retreat in the heart of the city. The hotel's central location provides easy access to the vibrant Inner Harbor area, where guests can explore pet-friendly attractions, parks, and dining options." />
          <Text text="Two pets up to 75 pounds total are welcome, and you can expect pet beds, bowls, and a personalized welcome note for your furry companion. If you stay 1-6 nights, the fee is $150; if you stay 7-30 nights, the fee will be $200. The hotel's location allows for easy access to pet-friendly attractions and parks." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pool and terrace', 'Fitness center', 'Free WiFi', 'Electric vehicle charging', 'On-site dining options', 'Laundry services', 'Business center']}
          />

          <Bold text="Staybridge Suites Baltimore - Inner Harbor"  />
          <SingleLoadListingCard hotelName="100187718" />
          <Text text="Staybridge Suites Baltimore - Inner Harbor is a pet-friendly and home-away-from-home hotel that provides extended-stay options for humans and pets alike. The hotel's central location allows easy access to pet-friendly parks and attractions, allowing guests to explore Baltimore with their pets." />
          <Text text="Located in the heart of Baltimore, this extended-stay hotel welcomes pets of all sizes, ensuring a stress-free and enjoyable stay for the entire family." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Free WiFi', 'Business center', 'Laundry facilities', 'Social hours some days during the week', 'Free breakfast']}
          />

   
          <Typography variant="h2">The Top Pet-Friendly Activities in Baltimore</Typography>
         
          <LinkContent
            link="https://bcrp.baltimorecity.gov/parks/patterson-park"
            linkText="Patterson Park"
            text="This sprawling green oasis in the heart of the city is a favorite among locals and their pets. Enjoy a leisurely stroll around the park's walking trails, have a picnic, and let your furry companion socialize at the dog park."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image17.png" text="Visit Baltimore" />

          <LinkContent
            link="https://www.cantoncommunity.org/canton-dog-park"
            linkText="Canton Dog Park"
            text="Located in the Canton neighborhood, this fenced-off dog park is an excellent place for your pup to run, play, and interact with other dogs. The park offers separate areas for small and large dogs, ensuring a safe environment for everyone."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image9.png" text="Canton Dog Park" />

          <LinkContent
            link="https://greatruns.com/baltimore-md-inner-harbor/"
            linkText="Inner Harbor Promenade"
            text="Take in the breathtaking views of the Inner Harbor while walking along the pet-friendly promenade. Many cafes and restaurants with outdoor seating welcome well-behaved pets, making it a perfect spot for a relaxing afternoon."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image15.png" text="Great Runs" />

          <LinkContent
            link="https://www.dogsofcharmcity.net/post/dog-friendly-breweries-in-maryland"
            linkText="Dog-Friendly Breweries"
            text="Baltimore boasts several pet-friendly breweries where you can enjoy a cold one with your pup by your side. Many breweries have outdoor seating areas that are perfect for accommodating pets."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image11.png" text="Dogs of Charm City" />

          <LinkContent
            link="https://bcrp.baltimorecity.gov/parks/federal-hill"
            linkText="Federal Hill Park"
            text="Offering stunning views of the city skyline, Federal Hill Park is another pet-friendly gem in Baltimore. Take a scenic walk with your pet and capture some memorable photos with the cityscape as the backdrop."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image3.png" text="Baltimore City Recreation and Parks" />

          <LinkContent
            link="https://baltimoreghosttours.com/fellspointghosttour/"
            linkText="Fell's Point Ghost Tours"
            text="For a spooktacular evening activity, join the Fell's Point Ghost Tours, where leashed and well-behaved dogs are welcome to explore the haunted history of this historic neighborhood."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image1.png" text="Fell's Point Ghost Tours" />

          <LinkContent
            link="https://www.mdsci.org/"
            linkText="Maryland Science Center"
            text="Surprisingly, the Maryland Science Center allows pets! Bring your leashed pet for an educational and fun-filled day exploring interactive exhibits and science demonstrations."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image16.png" text="Maryland Science Center" />

          <LinkContent
            link="https://charmcitymeadworks.com/"
            linkText="Charm City Meadworks"
            text="Experience the world of mead at Charm City Meadworks, a pet-friendly tasting room where you can sample delicious honey wines while your dog relaxes at your feet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image20.png" text="Charm City Meadworks" />

          <LinkContent
            link="https://cylburn.org/"
            linkText="Cylburn Arboretum"
            text="Cylburn Arboretum is a serene and captivating oasis that offers a delightful escape from the bustling city. This 200-acre public garden is a cherished gem for nature enthusiasts, hikers, and families looking to connect with the outdoors. The arboretum features an impressive collection of trees, plants, and wildlife, providing visitors with a diverse and immersive experience in nature."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image19.png" text="Cylburn Arboretum" />

          <LinkContent
            link="https://marylandpet.org/item/locust-point-dog-park-at-latrobe-park/"
            linkText="Locust Point Dog Park"
            text="Located in the scenic Locust Point neighborhood, this off-leash dog park provides a safe and spacious area for dogs to socialize, play, and stretch their legs. The park is fully fenced, ensuring a secure environment for furry friends to roam freely and interact with other dogs. With separate areas designated for small and large dogs, owners can have peace of mind knowing that their pets are enjoying the company of dogs similar in size and temperament."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image14.png" text="Maryland Pet" />


      
          <Typography variant="h2">The Top Pet-Friendly Restaurants in Baltimore</Typography>

          <LinkContent
            link="https://bmorelicks.com/"
            linkText="Bmore Licks"
            text="Known for its delectable ice cream and frozen treats, Bmore Licks offers a dedicated &quot;doggie cone&quot; menu, ensuring your pup can savor a tasty treat while you enjoy your ice cream. This charming spot provides outdoor seating where you can relish your treats together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image6.png" text="Bmore Licks" />

          <LinkContent
            link="https://abbeyburger.com/"
            linkText="Abbey Burger Bistro"
            text="Located in Federal Hill, Abbey Burger Bistro is a must-visit spot for burger aficionados and their pets. This eatery features a pet-friendly patio, and your furry companion can even enjoy a &quot;Puppy Patty&quot; – a burger made especially for dogs."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image8.png" text="Abbey Burger Bistro" />

          <LinkContent
            link="https://www.barcocina.com/"
            linkText="Barcocina"
            text="Situated in Fells Point, Barcocina boasts a picturesque waterfront view and a pet-friendly patio where you can enjoy delicious Mexican-inspired cuisine. Your pet can cool off with a bowl of water while you savor the flavors."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image2.png" text="Barcocina" />

          <LinkContent
            link="https://www.goldenwestcafe.com/"
            linkText="Golden West Cafe"
            text="This funky cafe in Hampden is known for its diverse menu and pet-friendly outdoor seating. Their patio is the perfect spot to relish creative dishes with your furry friend by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image13.png" text="Golden West Cafe" />

          <LinkContent
            link="http://www.slaintepub.com/"
            linkText="Slainte Irish Pub and Restaurant"
            text="Experience a taste of Ireland in Baltimore at Slainte Irish Pub and Restaurant. This pet-friendly pub offers outdoor seating, so you and your pet can enjoy traditional Irish fare and a lively atmosphere together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image5.png" text="Slainte Irish Pub and Restaurant" />

          <LinkContent
            link="https://bluepitbbq.com/"
            linkText="Blue Pit BBQ & Whiskey Bar"
            text="Treat yourself to some mouthwatering BBQ while your pet lounges with you on the outdoor patio at Blue Pit BBQ. Their &quot;Pit Pups&quot; menu ensures that your furry friend won't miss out on the BBQ experience."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image7.png" text="Blue Pit BBQ & Whiskey Bar" />

          <LinkContent
            link="https://www.iron-rooster.com/"
            linkText="Iron Rooster"
            text="Famous for its all-day breakfast menu, Iron Rooster offers a pet-friendly patio where you and your pet can enjoy a variety of delicious brunch options together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image17.png" text="Iron Rooster" />

          <LinkContent
            link="https://www.lacucharabaltimore.com/"
            linkText="La Cuchara"
            text="If you're craving Spanish-inspired cuisine, La Cuchara in Woodberry has a pet-friendly patio where you and your furry friend can savor the rich flavors of Spain."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image4.png" text="La Cuchara" />

          <LinkContent
            link="https://www.missshirleys.com/"
            linkText="Miss Shirley's Cafe"
            text="A beloved breakfast spot, Miss Shirley's Cafe offers a pet-friendly patio where you can enjoy their famous dishes, including pancakes and shrimp and grits, with your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image12.png" text="Miss Shirley's Cafe" />

          <LinkContent
            link="http://www.kooperstavern.com/"
            linkText="Kooper's Tavern"
            text="Kooper's Tavern is a charming and lively restaurant located in the heart of historic Fells Point, Baltimore. Known for its delicious burgers and welcoming ambiance, Kooper's Tavern has become a favorite gathering spot for locals and visitors alike. The restaurant's pet-friendly outdoor seating area makes it a perfect destination for pet owners looking to dine with their furry companions."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Baltimore/image10.png" text="Kooper’s Tavern" />

        </Box>


        
        <Grid mt="1.5rem" item xs={12} sx={{ mb: 1 }}>
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
            <FilterBar />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>;
};

export default Baltimore;
