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
    "description": "Washington D.C., DC, USA",
    "matched_substrings": [
        {
            "length": 10,
            "offset": 0
        }
    ],
    "place_id": "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
    "reference": "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
    "structured_formatting": {
        "main_text": "Washington D.C.",
        "main_text_matched_substrings": [
            {
                "length": 10,
                "offset": 0
            }
        ],
        "secondary_text": "DC, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Washington D.C."
        },
        {
            "offset": 17,
            "value": "DC"
        },
        {
            "offset": 21,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 38.9059849,
"lng": -77.03341790000002
}

const Washington: FC = () => {

  //TODO:
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Washington DC');

  const city = 'Washington D.C.'
  const paragraphOne = "Washington, D.C., the capital of the United States, is a vibrant and historical city that welcomes pet-friendly travel with open arms. Traveling to this bustling metropolis with your furry companion is a delightful experience, as many accommodations, attractions, and parks cater to pets. Numerous hotels in Washington, D.C., are pet-friendly, offering comfortable accommodations and special amenities to ensure your pet's comfort during your stay."


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
      <title>Pet Friendly Hotels Washington, D.C. | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, FL | Romingo`}
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
        <Grid item xs={12} md={12} my="0.5rem">
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            The city is home to a variety of pet-friendly parks, such as Rock Creek Park and the National Mall, where your pet can stretch their legs and explore the outdoors alongside you. Additionally, many outdoor cafes and restaurants in the city welcome pets, allowing you to enjoy a meal or coffee with your furry friend by your side. From exploring iconic landmarks to wandering through picturesque neighborhoods, pet-friendly travel in Washington, D.C., ensures that you and your beloved pet can create unforgettable memories together in the nation&apos;s capital.
          </Typography>
        </Grid>

        {cityContent.secondaryImage &&
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
        }

      
        <Box
          mt="1rem"
          width='100%'
          display='flex'
          flexDirection='column'
          gap='1.5rem'
        >
          <Divider />
          <Typography component="h2" variant="h2">The Top Pet-Friendly Accommodations in Washington DC</Typography>
        
          <Bold text="Kimpton Hotel Monaco Washington DC" />
          <SingleLoadListingCard hotelName="100408416" />
          <Text text="Kimpton Hotel Monaco Washington DC is a chic and pet-friendly boutique hotel located in the heart of the city. This upscale accommodation warmly welcomes pets of all sizes and breeds, making it an ideal choice for pet owners looking for a stylish and comfortable stay. The hotel's pet-friendly rooms feature elegant décor and provide amenities such as pet beds, food bowls, and tasty treats to ensure your furry friend feels at home. With its central location, guests and their pets can easily explore the nearby attractions, parks, and pet-friendly restaurants while experiencing the best of Washington, D.C.'s hospitality." />
          <Text text="Kimpton Hotel Monaco is pet-friendly and allows guests to bring pets of all sizes for no additional fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site dining options', 'On-site bar options', 'Free coffee and tea services', 'Free daily happy hour', 'Yoga mat']}
          />

          <Bold text="The Jefferson, Washington DC" />
          <SingleLoadListingCard hotelName="100069144" />
          <Text text="The Jefferson, Washington DC, is a luxurious and pet-friendly boutique hotel that exudes sophistication and historical charm. Welcoming pets of all sizes, this elegant accommodation offers a refined stay for both guests and their furry companions. " />
          <Text text="The hotel provides pet-friendly rooms with plush bedding, water bowls, and a thoughtful turndown service to make your pet feel pampered. With its prime location near the White House and other iconic landmarks, The Jefferson ensures that both you and your pet have an unforgettable experience in the nation's capital." />
          <Text text="The Jefferson, Washington DC is pet-friendly and allows you to bring your dogs for a fee of $50 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site dining options', 'On-site bar options']}
          />

          <Bold text="The LINE DC" />
          <SingleLoadListingCard hotelName="100191036" />
          <Text text="Nestled in the vibrant Adams Morgan neighborhood, The LINE DC is a pet-friendly hotel that offers a blend of contemporary design and cultural immersion. Welcoming pets with open arms, the hotel features pet-friendly rooms equipped with comfortable amenities and pet essentials. " />
          <Text text="The LINE DC's central location allows you and your pet to explore the city's eclectic dining scene, pet-friendly parks, and cultural attractions while enjoying a unique and artistic ambiance." />
          <Text text="The LINE DC is pet-friendly and allows you to bring pets of all sizes for no additional cost." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site dining options', 'On-site bar options', 'Community center', 'Lobby coffee shop']}
          />

          <Bold text="Fairmont Washington DC" />
          <SingleLoadListingCard hotelName="100145410" />
          <Text text="The Fairmont Washington DC is a luxurious and pet-friendly hotel situated in the heart of the city. Welcoming pets to stay with their human companions, the hotel offers pet-friendly rooms and provides amenities upon request. " />
          <Text text="Guests and their furry friends can enjoy the hotel's elegant ambiance and convenient location near the city's landmarks, museums, and pet-friendly activities, creating a memorable and indulgent stay for both you and your pets." />
          <Text text="The Fairmont Washington DC is pet-friendly and allows you to bring one pet of any size for no additional fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Fitness center', 'Business center', 'Laundry services']}
          />

          <Bold text="Salamander, Washington DC" />
          <SingleLoadListingCard hotelName="00179670" />
          <Text text="Overlooking the picturesque Potomac River, the Salamander, Washington DC, is a pet-friendly hotel that offers a serene and luxurious experience for both guests and their pets. Welcoming pets of all sizes, the hotel provides pet-friendly rooms with comfortable accommodations and ensures your pet feels pampered throughout their stay. " />
          <Text text="With its prime location near the National Mall and other attractions, guests and their furry companions can immerse themselves in the city's history and cultural offerings while enjoying impeccable hospitality." />
          <Text text="Salamander is a dog friendly property and allows you to bring up to 2 dogs with a maximum combined weight of 40lbs. The hotel requires a $150 pet fee upon check-in. " />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'On-site bar options', 'Spa services', 'Fitness center']}
          />

          <Bold text="The Westin Georgetown, Washington D.C." />
          <SingleLoadListingCard hotelName="100208430" />
          <Text text="Located in the charming Georgetown neighborhood, The Westin Georgetown is a pet-friendly hotel that offers a tranquil and relaxing retreat for both you and your furry friend. Welcoming pets of all sizes, the hotel provides comfortable accommodations and designated pet-friendly areas where your pet can unwind and play." />
          <Text text="The Westin Georgetown's central location allows you to explore the historic streets, pet-friendly shops, and outdoor cafes in the neighborhood, making it an excellent choice for pet owners seeking a pet-friendly getaway in Washington, D.C." />
          <Text text="The Westin Georgetown is pet-friendly and allows you to bring a dog weighing less than 40 pounds for a fee of $25 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Business center', 'Laundry facilities', 'Fitness center']}
          />



          <Typography variant="h2">The Top Pet-Friendly Activities in Washington D.C.</Typography>
 
          <LinkContent
            link="https://www.nps.gov/rocr/index.htm"
            linkText="Rock Creek Park"
            text="This expansive park offers miles of trails where you and your leashed pet can take leisurely walks amidst nature's beauty. Explore the lush greenery, picnic by the creek, and enjoy the peaceful surroundings."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image4.png" text="National Parks Conservaton Association" />

          <LinkContent
            link="https://www.nps.gov/nama/index.htm"
            linkText="National Mall"
            text="Leashed pets are welcome to stroll along the National Mall and enjoy the iconic views of the Washington Monument, Lincoln Memorial, and other historical landmarks."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image18.png" text="National Park Service" />

          <LinkContent
            link="https://www.capitolriverfront.org/yards-park"
            linkText="The Yards Park"
            text="This waterfront park is pet-friendly and features beautiful walking paths along the Anacostia River. It's a great spot for a relaxing outing with your pet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image14.png" text="The Yards Park" />

          <LinkContent
            link="https://www.nps.gov/places/dumbarton-oaks-park.htm"
            linkText="Dumbarton Oaks Park"
            text="A serene and picturesque park, Dumbarton Oaks welcomes leashed pets to explore its gardens and tranquil trails."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image3.png" text="National Park Services" />

          <LinkContent
            link="https://www.nps.gov/places/meridian-hill-park.htm"
            linkText="Meridian Hill Park"
            text="Also known as Malcolm X Park, this park allows leashed pets to enjoy its cascading fountains, statues, and beautifully landscaped grounds."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image9.png" text="National Park Services" />

          <LinkContent
            link="https://www.wharfdc.com/"
            linkText="The Wharf"
            text="A lively waterfront destination, The Wharf offers pet-friendly outdoor spaces where you can enjoy waterfront views and diverse dining options with your furry friend."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image6.png" text="The Wharf" />

          <LinkContent
            link="https://gardens.si.edu/"
            linkText="Smithsonian Gardens"
            text="Leashed pets are allowed in the gardens surrounding the Smithsonian museums. Explore the colorful blooms and historic architecture while taking a break from the city's bustle."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/Smithsonian%20Gardens.jpeg" text="https://gardens.si.edu/smithsonian-gardens-map/" />

          <LinkContent
            link="https://www.humanerescuealliance.org/special-events-new#:~:text=The%20Embassy%20Row%20Hotel%20invites,benefitting%20the%20Humane%20Rescue%20Alliance."
            linkText="Doggy Yappy Hour at The Embassy Row Hotel"
            text="This pet-friendly event takes place during the warmer months, offering a fun-filled social gathering for pets and their owners at the hotel's rooftop bar."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image16.png" text="Human Rescue Alliance" />

          <LinkContent
            link="https://www.thebullpendc.com/"
            linkText="The Bullpen"
            text="Located near Nationals Park, The Bullpen is a pet-friendly outdoor venue that hosts events, food trucks, and live entertainment. Enjoy a relaxed atmosphere with your pet by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image11.png" text="WTOP" />

          <LinkContent
            link="https://visitalexandria.com/old-town/"
            linkText="Old Town Alexandria"
            text="Just a short drive from D.C. Old Town Alexandria is a charming and pet-friendly neighborhood with historic streets, pet-friendly shops, and outdoor cafes where you and your pet can unwind together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image5.png" text="Washington DC" />



          <Typography variant="h2">The Top Pet-Friendly Restaurants in Washington DC</Typography>
      
          <LinkContent
            link="https://barksocial.com/"
            linkText="Bark Social"
            text="Bark Social Washington D.C. is a unique pet-friendly venue that offers a one-of-a-kind experience for both pets and their owners. This innovative space combines a dog park, bar, and social hub, providing a fun and safe environment for dogs to play and socialize while their owners enjoy refreshments and interact with other pet lovers."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image20.png" text="Bark Social" />

          <LinkContent
            link="https://www.commissarydc.com/"
            linkText="Commissary"
            text="Situated in Logan Circle, Commissary welcomes pets on their outdoor patio. They offer a diverse menu, including breakfast favorites, sandwiches, and vegetarian options."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image12.png" text="The Brig DC" />

          <LinkContent
            link="https://www.thebrigdc.com/"
            linkText="The Brig DC"
            text="This laid-back beer garden in Capitol Riverfront is a pet-friendly hotspot with a large outdoor space for pets to roam freely while you enjoy a variety of beers and snacks." 
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/The%20Brig.jpeg" text="https://barredindc.com/2021/04/04/best-dc-restaurants-bars-to-eat-and-drink-outdoors-right-now/comment-page-1/" />

          <LinkContent
            link="https://www.dachabeergarden.com/"
            linkText="Dacha Beer Garden"
            text="A popular destination in Shaw, Dacha Beer Garden welcomes pets in its outdoor seating area. Enjoy their selection of beers and European-inspired dishes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image10.png" text="Eater DC" />

          <LinkContent
            link="https://www.farmersfishersbakers.com/"
            linkText="Farmers Fishers Bakers"
            text="Located at the Georgetown waterfront, this restaurant offers a scenic view and a pet-friendly patio where you can savor farm-to-table cuisine."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/Farmers%20Fishers%20Bakers.jpg" text="https://archello.com/project/farmers-fishers-bakers" />

          <LinkContent
            link="https://www.perrysam.com/"
            linkText="Perry's"
            text="A beloved Adams Morgan establishment, Perry's has a pet-friendly rooftop patio where you can enjoy sushi, cocktails, and the company of your furry friend."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image17.png" text="TimeOut" />

          <LinkContent
            link="https://www.wundergartendc.com/"
            linkText="Wunder Garten"
            text="This outdoor beer garden in NoMa allows pets in its spacious and welcoming setting. Sip on German beers and enjoy live music while your pet enjoys the open space."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image1.png" text="Wunder Garten" />

          <LinkContent
            link="https://www.redrocksdc.com/"
            linkText="RedRocks"
            text="With multiple locations throughout the city, RedRocks offers pet-friendly outdoor patios where you can enjoy wood-fired pizzas and other Italian favorites."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/Redrocks.jpeg" text="https://www.tripadvisor.com/Restaurant_Review-g28970-d3609310-Reviews-Red_Rocks_Pizza-Washington_DC_District_of_Columbia.html" />

          <LinkContent
            link="https://bardo.beer/"
            linkText="Bardo Brewing"
            text="This unique brewery in Northeast D.C. welcomes pets in its expansive outdoor beer garden. Enjoy a variety of craft beers and food truck fare while your pet plays nearby."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image13.png" text="Bardo Brewing" />

          <LinkContent
            link="https://www.eltechosf.com/"
            linkText="El Techo"
            text="Located in Shaw, El Techo is a rooftop restaurant with a pet-friendly seating area. Savor Latin American-inspired cuisine and refreshing cocktails while enjoying views of the city."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image7.png" text="Conde Nat Traveler" />

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

export default Washington;
