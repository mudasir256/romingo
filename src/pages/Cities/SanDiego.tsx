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
    "description": "San Diego, CA, USA",
    "matched_substrings": [
        {
            "length": 5,
            "offset": 0
        }
    ],
    "place_id": "ChIJSx6SrQ9T2YARed8V_f0hOg0",
    "reference": "ChIJSx6SrQ9T2YARed8V_f0hOg0",
    "structured_formatting": {
        "main_text": "San Diego",
        "main_text_matched_substrings": [
            {
                "length": 5,
                "offset": 0
            }
        ],
        "secondary_text": "CA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "San Diego"
        },
        {
            "offset": 11,
            "value": "CA"
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
"lat": 32.715738,
"lng": -117.1610838
}

const SanDiego: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'San Diego, CA');

  const city = 'San Diego'
  const paragraphOne = 'San Diego is a popular city that is known for its sun-soaked beaches, vibrant culture, and stunning landscapes. San Diego is also a very pet-friendly city that is fun to travel to with your dog. This coastal city offers many pet-friendly activities and hotels that your dog will love.'

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
      <title>Pet Friendly Hotels San Diego, CA | Romingo</title>
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
            You and your furry friend can explore large dog parks, pet-friendly beaches, and many hiking trails. There are many restaurants and cafes with pet-friendly outdoor seating options that allow you to bring your pet with you.
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
            San Diego is a wonderful city to visit because of all of the exciting things you can do. Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy in San Diego.
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
          maxWidth="760px"
        >
          <Divider />
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in San Diego</Typography>

          <Bold text="The Manchester Grand Hyatt San Diego" />
          <SingleLoadListingCard hotelName="100210840" />
          <Text text="The Manchester Grand Hyatt San Diego is a pet-friendly hotel that loves welcoming your four-legged friend. Located in downtown San Diego, this hotel offers many pet-friendly services to guarantee an enjoyable stay for everyone. When you arrive, your furry friend will receive treats and toys, setting the tone for a memorable pet-friendly experience. This pet-friendly hotel has rooms where pets can stay, so your dog may even make a friend during your trip!" />
          <Text text="When staying at The Manchester Grand Hyatt San Diego, you can bring two pets that weigh 50 pounds or under. There is a $100 fee and you can stay at this hotel for up to 30 days." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Multiple outdoor pools', 'Game room', 'Rooftop cinema', 'Fitness center', 'Dining options']}
          />

          <Bold text="Hotel del Coronado" />
          <SingleLoadListingCard hotelName="100058446" />
          <Text text="The Hotel del Coronado is a beautiful pet-friendly hotel that is on Coronado Island in San Diego. This resort offers a pet program, which includes pet room service, pet beds, water bowls, and an in-room dining menu. Coronado Beach is dog-friendly, so you both can enjoy the sun and the sand during your trip to San Diego." />
          <Text text="The Hotel del Coronado allows you to bring two dogs with you that weigh under 40 pounds. There is also a $125 pet fee when you stay at this pet-friendly hotel." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Beachfront property', 'Outdoor pool', 'Fitness center', 'Spa experiences', 'Movies on the beach', 'Dining options']}
          />

          <Bold text="The Dana on Mission Bay" />
           <SingleLoadListingCard hotelName="100206380" /> 
          <Text text="The Dana on Mission Bay is a pet-friendly hotel located on Mission Bay in San Diego. This waterfront resort is a paradise for both you and your furry companion. You can explore the bay together, take leisurely walks along the shore, or unwind at nearby restaurants. The Dana on Mission Bay is close to Dog Beach where your pet can play in the sand and water." />
          <Text text="When you stay at The Dana on Mission Bay, your pet will receive water bowls, treats, and waste bags. You can bring up to two dogs with you when you stay at this hotel that weigh less than 80 pounds. There is also a pet fee of $40 per night plus costs for any damages during your stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Movie night in the pool', 'Fitness center', 'Water sports and bike rentals', 'Lawn games', 'Wine tasting', 'Pet-friendly restaurants']}
          />

          <Bold text="Kimpton Alma Hotel San Diego" />
          <SingleLoadListingCard hotelName="100000910" />
          <Text text="The Kimpton Alma Hotel San Diego is a pet-friendly hotel in downtown San Diego. You will be close to many pet-friendly activities, including the waterfront and Gaslamp District. This hotel offers a prime location for exploring the city's vibrant dining, entertainment, and cultural scene." />
          <Text text="The Kimpton Alma Hotel San Diego loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. When you check in, your pet will receive treats and the hotel offers pet beds and food bowls." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Coffee and tea in the morning', 'Bikes', 'Yoga mats', 'Rooftop pool', 'Dining options']}
          />

          <Bold text="Omni San Diego Hotel" />
          <SingleLoadListingCard hotelName="100012092" />
          <Text text="The Omni San Diego Hotel is in downtown San Diego and loves when you bring your pets. There are nearby dog parks and pet-friendly attractions, such as Waterfront Park. When you stay at Omni San Diego Hotel, you and your pet will have a great time!" />
          <Text text="Omni San Diego Hotel is close to numerous pet-friendly parks and walking areas in downtown San Diego. Upon check-in, your pet will receive a pet-friendly amenity kit with toys, treats, and clean-up bags. When you stay here, your pet can weigh up to 40 pounds and there is a $100 non-refundable pet fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Rooftop pool', 'Dining options']}
          />

          <Bold text="La Valencia Hotel" />
          <SingleLoadListingCard hotelName="100012092" />
          <Text text="La Jolla's iconic La Valencia Hotel offers a luxurious pet-friendly experience for you and your pet. This pet-friendly hotel is right by the coast, so you and your pet can enjoy walks along the water together. La Jolla is also a very pet-friendly city with many restaurants and shops that allow dogs." />
          <Text text="When you stay at La Valencia, your pet will receive pet beds, bowls, and treats. You will also receive a $25 credit to use toward the dog menu at their restaurant. You can bring two dogs with you to this pet-friendly hotel and there is a $50 pet fee per pet." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pool with ocean views', 'Beach access just steps away', 'Dining and lounge options', 'Fitness center', 'Business center']}
          />


          <Typography variant="h2">The Top Pet-Friendly Activities in San Diego</Typography>
          
          <LinkContent
            link="https://oceanbeachsandiego.com/attractions/beaches/dog-beach"
            linkText="Ocean Beach Dog Beach"
            text="For a paw-some day at the beach, head to Ocean Beach Dog Beach. This off-leash stretch of coast is a dog paradise and your pet can run freely in the sand. It's a fantastic place for your furry friend to socialize and make new four-legged buddies."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image11.png" text="Ocean Beach Mainstreet Association" />

          <LinkContent
            link="https://balboapark.org/parks-trails-gardens/"
            linkText="Balboa Park"
            text="Discover the beauty of Balboa Park, one of San Diego's most iconic attractions, with your pet. You can explore the lush gardens and scenic walking paths together. Don't miss the cactus garden and the Palm Canyon Trail, both of which are pet-friendly and offer a delightful stroll."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image15.png" text="Balboa Park" />

          <LinkContent
            link="https://www.sandiego.gov/park-and-recreation/parks/regional/missionbay/fiestaisland"
            linkText="Fiesta Island Off-Leash Dog Park"
            text="Fiesta Island is a must-visit destination for active dogs. This large off-leash dog park has sandy shores and calm waters. This is an ideal spot for dogs who love to swim and play fetch. With plenty of open space, your pet will have a blast running and frolicking in this doggie wonderland."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/Fiesta%20Island.jpeg" text="https://lajolla.com/profiles/fiesta-island-dog-park/" />

          <LinkContent
            link="https://www.nps.gov/cabr/learn/coastal-trail.htm"
            linkText="Cabrillo Tide Pools Trail"
            text="Enjoy a scenic hike with your pet along the Cabrillo Tide Pools Trail. Leashed dogs are welcome to explore this coastal trail as you enjoy beautiful views of the Pacific Ocean."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/Cabrillo%20Tide%20Pools%20Trail.jpeg" text="https://www.nps.gov/thingstodo/visit-the-cabrillo-tidepools.htm" />

          <LinkContent
            link="https://balboapark.org/parks-trails-gardens/"
            linkText="Nate's Point Off-Leash Dog Park"
            text="Located within the scenic Balboa Park, Nate's Point Off-Leash Dog Park is another fantastic destination for off-leash fun. The park features two enclosed areas for small and large dogs, allowing them to play, run, and interact safely."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image18.png" text="Balboa Park" />

          <LinkContent
            link="https://suppups.com/"
            linkText="SUP Pups"
            text="At SUP Pups, you can learn how to standup paddleboard with your dog! You’ll learn the basics, safety skills, and techniques to get out on the water with your pup on your board."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image13.png" text="SUP Pups" />

          <LinkContent
            link="https://coronadoferrylanding.com/"
            linkText="Coronado Ferry Landing"
            text="Take a leisurely ferry ride with your pet from downtown San Diego to Coronado Ferry Landing. The ferry allows leashed pets onboard, and once you arrive at Coronado, explore the charming shops and pet-friendly cafes together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image14.png" text="Coronado Ferry Landing" />

          <LinkContent
            link="https://www.littleitalysd.com/explore/little-italy-dog-park"
            linkText="Little Italy Dog Park"
            text="Give your pet some playtime at the Little Italy Dog Park! This well-maintained park in the heart of the Little Italy neighborhood provides separate areas for small and large dogs, ensuring a safe environment for all pups."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image5.png" text=" Little Italy San Diego" />

          <LinkContent
            link="https://www.sandiego.org/explore/events/festivals-and-street-fairs/san-diego-pet-con.aspx"
            linkText="San Diego Pet Con"
            text="If you're lucky to visit during the San Diego Pet Con, this pet-friendly event is a must-attend. With pet exhibits, adoption events, talent shows, and pet product vendors, it's a fantastic opportunity for pet lovers to celebrate and bond with their furry companions."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image21.png" text="San Diego" />

          <LinkContent
            link="https://www.sandiego.gov/park-and-recreation/parks/regional/shoreline/sunset"
            linkText="Sunset Cliffs Natural Park"
            text="Witness some of the most breathtaking sunsets in San Diego at Sunset Cliffs Natural Park while sharing the experience with your pet. Although dogs must be on a leash, this coastal park offers spectacular ocean views and a serene ambiance perfect for an evening stroll."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image4.png" text="Ocean Beach Mainstreet Association" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in San Diego</Typography>
          <LinkContent
            link="https://www.waterbarsd.com/"
            linkText="Waterbar"
            text="For those seeking waterfront dining with their pets, Waterbar San Diego is the place to be. Located in Little Italy, this pet-friendly restaurant offers stunning views of the bay and an expansive outdoor patio where dogs are welcome. The menu features a delectable selection of seafood and coastal-inspired dishes, making it a perfect spot to enjoy a meal with your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image3.png" text="Waterbar" />

          <LinkContent
            link="https://wonderlandob.com/"
            linkText="Wonderland Ocean Pub"
            text="Located on Ocean Beach's bustling Newport Avenue, Wonderland Ocean Pub boasts a spacious and pet-friendly patio with stunning ocean views. The restaurant's relaxed atmosphere makes it an ideal spot for enjoying craft beers, delectable seafood, and burgers with your furry friend."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/Wonderland%20Ocean%20Pub.jpeg" text="https://www.facebook.com/WonderlandOB/photos/friday-views-/1969249829790396/" />

          <LinkContent
            link="https://www.lazydogrestaurants.com/locations/san-diego-ca"
            linkText="Lazy Dog Restaurant & Bar"
            text='Dine out with your pet at Lazy Dog Restaurant & Bar, a pet-friendly eatery with a menu created for both humans and dogs. While you enjoy a delicious meal, your pet can relish their "pup-tizers" and "bowls" from the dog menu, served in a dog-friendly patio setting.'
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image7.png" text="Lazy Dog Restaurant & Bar" />

          <LinkContent
            link="https://www.venuereport.com/venue/waypoint-public/"
            linkText="Waypoint Public"
            text="Waypoint Public is in the North Park neighborhood and offers a variety of craft beers, delicious bites, and a pet-friendly patio. The restaurant is known for its welcoming atmosphere, and your pet will feel right at home as you eat a delicious meal."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image22.png" text="Venue Report"/>

          <LinkContent
            link="https://queenstownpublichouse.com/"
            linkText="Queenstown Public House"
            text="A hidden gem in Little Italy, Queenstown Public House features a charming outdoor patio where pets can accompany you as you indulge in their New Zealand-inspired menu. With a focus on organic ingredients, this restaurant offers a range of delectable dishes that cater to different tastes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image8.png" text="Queenstown Public House" />

          <LinkContent
            link="https://www.cafe-21.com/"
            linkText="Café 21"
            text="For pet owners who appreciate global cuisine, Café 21 is a must-visit. With locations in Gaslamp Quarter and University Heights, this eatery offers pet-friendly patios and presents a diverse menu of international dishes, from Mediterranean-inspired delights to delectable brunch options."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image12.png" text="Cafe 21" />

          <LinkContent
            link="https://stationtavern.com/"
            linkText="Station Tavern & Burgers"
            text="Located in South Park, Station Tavern & Burgers is a laid-back pet-friendly eatery that specializes in mouthwatering burgers, craft beers, and gourmet hot dogs. The restaurant's spacious outdoor patio is perfect for pet owners seeking a relaxed and friendly environment to enjoy casual American fare with their furry companions."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image19.png" text="Station Tavern & Burgers" />

          <LinkContent
            link="https://raglanpublichouse.com/"
            linkText="Raglan Public House"
            text="Nestled in Ocean Beach, Raglan Public House boasts a fantastic pet-friendly patio where you can enjoy creative burgers and craft beers with your pet by your side. The restaurant's laid-back and welcoming vibe creates a perfect setting for you and your furry companion to unwind."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image10.png" text="Raglan Public House" />

          <LinkContent
            link="https://www.regalbeaglesd.com/"
            linkText="Regal Beagle"
            text="Regal Beagle is a beloved gem known for its charming ambiance and delectable American cuisine. Located in the heart of San Diego, this quaint eatery offers a warm and welcoming setting, making it a favorite spot for locals and visitors alike. With its pet-friendly patio, Regal Beagle warmly invites four-legged companions to join their owners for a delightful meal. The restaurant's diverse menu features a variety of dishes, including mouthwatering burgers, hearty sandwiches, and flavorful salads."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/Regal%20Beagle.jpeg" text="https://www.riversandroutes.com/directory/ropers-regal-beagle/" />

          <LinkContent
            link="http://barcrushed.com/"
            linkText="Crushed"
            text="Crushed in San Diego is a trendy and vibrant wine and tapas bar that offers a delightful dining experience in the heart of Pacific Beach. Known for its extensive wine selection and creative small plates, Crushed is a popular spot for foodies and wine enthusiasts alike. With its chic and welcoming ambiance, this restaurant is perfect for a casual get-together or a fun night out with friends, enjoying a variety of delectable dishes and handcrafted cocktails."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/image16.png" text="Crushed" />

          <LinkContent
            link="https://rabbitholesd.com/"
            linkText="The Rabbit Hole"
            text="The Rabbit Hole restaurant in San Diego is a whimsical and unique dining destination that takes guests on a delightful culinary journey. Nestled in the heart of Normal Heights, this Alice in Wonderland-themed eatery offers a creative and playful menu inspired by the beloved tale. With its imaginative decor, quirky cocktails, and delicious comfort food, The Rabbit Hole provides a one-of-a-kind dining experience that appeals to both the young at heart and the curious food adventurer."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/The%20Rabbit%20Hole.jpeg" text="https://thevendry.com/venue/23899/the-rabbit-hole-san-diego-ca" />

          <LinkContent
            link="https://www.parkhousesd.com/"
            linkText="Park House Eatery"
            text="Parkhouse Eatery is a charming and welcoming restaurant that combines modern elegance with a cozy atmosphere. Located in the heart of University Heights, this eatery offers a diverse and delicious menu featuring locally sourced ingredients and seasonal dishes. With its warm hospitality, inviting patio, and mouthwatering meals, Parkhouse Eatery is a popular choice for brunch, lunch, and dinner, providing a delightful dining experience for patrons seeking a memorable culinary escape."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Diego/Parkhouse%20Eatery.jpeg" text="https://www.afar.com/places/parkhouse-eatery-san-diego" />


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

export default SanDiego;
