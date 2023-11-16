import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography, useMediaQuery } from "@mui/material";

import Map from "../../components/UI/Map/Map";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";

import {Helmet} from "react-helmet";
import ListingCard from "../../components/ListingCard";
import { 
  useStore, 
  useSelector 
} from "react-redux";
import { gql, useQuery } from "@apollo/client";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

import IconTags from '../../components/IconTags';

import { HOTEL_DESCRIPTIONS } from '../../constants/locationPageDescriptions';
import HighlightBox from '../../components/CitiesContent/HighlightBox';
import SingleLoadListingCard from '../../components/SingleLoadListingCard';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'


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
    <Box m="1rem">
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

  const mobile = useMediaQuery("(max-width:800px)");

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
      sx={{ flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' } }} 
      display="flex"  
      gap="1rem" 
      alignItems="center"
      maxWidth="1800px"
      mx="auto"
    >

      <Box 
        borderRadius={4}
        backgroundColor="white" 
        sx={{
          width: { xs: 'auto', sm: 'auto', md: '420px' },
          p: { xs: '1rem', sm: '1rem', md: '1.5rem' },
          pt: { xs: 0, sm: 0 },
          left: { xs: 0, sm: 0, md: '7%' },
          boxShadow: { xs: 0, sm: 0, md: 3 },
          position: { xs: 'relative', sm: 'relative', md: 'relative' }
        }}
      >
        <Typography variant="h4" component="h1">Find pet-friendly hotels in {city}</Typography>
        <Typography variant="base">The hassle free way to travel with your pet</Typography>
        <Box sx={{  width: '100%', mt: '1rem' }}>
          <LocationPageFilterBar search={searchData} />
        </Box>
      </Box>

      <Box
        component="img"
        src={cityContent.heroImage}
        alt={city}
        sx={{
          objectFit: "cover",
          width: { xs: '95%', sm: '95%', md: "65%" },
          m: { xs: '0.5rem', sm: '0.5rem', md: '2rem' },
          borderRadius: '10px',
          height: { xs: "40vh", md: "70vh" },
          boxShadow: 0,
        }}
      />
    </Box>
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: '5rem' }}>
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
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            {paragraphOne}
          </Typography>
    
        </Grid>
        <Grid my="1.5rem" item xs={12}>
          
          <IconTags />
          
        </Grid>
     

        
        <Box
          mt="1rem"
          width='100%'
          display='flex'
          flexDirection='column'
          gap='1.5rem'
          maxWidth="900px"
        >
   
          <Typography component="h2" variant="h2">The Top Pet Friendly Accommodations in Washington DC</Typography>
          <Text text="The city is home to a variety of pet-friendly parks, such as Rock Creek Park and the National Mall, where your pet can stretch their legs and explore the outdoors alongside you. Additionally, many outdoor cafes and restaurants in the city welcome pets, allowing you to enjoy a meal or coffee with your furry friend by your side. From exploring iconic landmarks to wandering through picturesque neighborhoods, pet-friendly travel in Washington, D.C., ensures that you and your beloved pet can create unforgettable memories together in the nation&apos;s capital." />

          
          <SingleLoadListingCard 
            hotelName="100408416" 
            paragraphs={[
              "Kimpton Hotel Monaco Washington DC is a chic and pet-friendly boutique hotel located in the heart of the city. This upscale accommodation warmly welcomes pets of all sizes and breeds, making it an ideal choice for pet owners looking for a stylish and comfortable stay. The hotel's pet-friendly rooms feature elegant décor and provide amenities such as pet beds, food bowls, and tasty treats to ensure your furry friend feels at home. With its central location, guests and their pets can easily explore the nearby attractions, parks, and pet-friendly restaurants while experiencing the best of Washington, D.C.'s hospitality.",
              "Kimpton Hotel Monaco is pet-friendly and allows guests to bring pets of all sizes for no additional fee."
            ]}
          />
         
          <SingleLoadListingCard 
            hotelName="100069144" 
            paragraphs={[
              "The Jefferson, Washington DC, is a luxurious and pet-friendly boutique hotel that exudes sophistication and historical charm. Welcoming pets of all sizes, this elegant accommodation offers a refined stay for both guests and their furry companions. ",
             // "The hotel provides pet-friendly rooms with plush bedding, water bowls, and a thoughtful turndown service to make your pet feel pampered. With its prime location near the White House and other iconic landmarks, The Jefferson ensures that both you and your pet have an unforgettable experience in the nation's capital.",
              "The Jefferson, Washington DC is pet-friendly and allows you to bring your dogs for a fee of $50 per stay."
            ]}
          />
        
          <SingleLoadListingCard 
            hotelName="100191036" 
            paragraphs={[
              "Nestled in the vibrant Adams Morgan neighborhood, The LINE DC is a pet-friendly hotel that offers a blend of contemporary design and cultural immersion. Welcoming pets with open arms, the hotel features pet-friendly rooms equipped with comfortable amenities and pet essentials. ",
             // "The LINE DC's central location allows you and your pet to explore the city's eclectic dining scene, pet-friendly parks, and cultural attractions while enjoying a unique and artistic ambiance.",
              "The LINE DC is pet-friendly and allows you to bring pets of all sizes for no additional cost."
            ]}
          />
         
          <SingleLoadListingCard 
            hotelName="100145410"
            paragraphs={[
              "The Fairmont Washington DC is a luxurious and pet-friendly hotel situated in the heart of the city. Welcoming pets to stay with their human companions, the hotel offers pet-friendly rooms and provides amenities upon request. ",
            //  "Guests and their furry friends can enjoy the hotel's elegant ambiance and convenient location near the city's landmarks, museums, and pet-friendly activities, creating a memorable and indulgent stay for both you and your pets.",
              "The Fairmont Washington DC is pet-friendly and allows you to bring one pet of any size for no additional fee."
            ]} 
          />
        
          <SingleLoadListingCard 
            hotelName="00179670" 
            paragraphs={[
              "Overlooking the picturesque Potomac River, the Salamander, Washington DC, is a pet-friendly hotel that offers a serene and luxurious experience for both guests and their pets. Welcoming pets of all sizes, the hotel provides pet-friendly rooms with comfortable accommodations and ensures your pet feels pampered throughout their stay. ",
             // "With its prime location near the National Mall and other attractions, guests and their furry companions can immerse themselves in the city's history and cultural offerings while enjoying impeccable hospitality.",
              "Salamander is a dog friendly property and allows you to bring up to 2 dogs with a maximum combined weight of 40lbs. The hotel requires a $150 pet fee upon check-in. "
            ]}
          />
       
          <SingleLoadListingCard 
            hotelName="100208430" 
            paragraphs={[
              "Located in the charming Georgetown neighborhood, The Westin Georgetown is a pet-friendly hotel that offers a tranquil and relaxing retreat for both you and your furry friend. Welcoming pets of all sizes, the hotel provides comfortable accommodations and designated pet-friendly areas where your pet can unwind and play.",
             // "The Westin Georgetown's central location allows you to explore the historic streets, pet-friendly shops, and outdoor cafes in the neighborhood, making it an excellent choice for pet owners seeking a pet-friendly getaway in Washington, D.C.",
              "The Westin Georgetown is pet-friendly and allows you to bring a dog weighing less than 40 pounds for a fee of $25 per night."
            ]}
          />
         
          <Typography variant="h2">The Top Pet-Friendly Activities in Washington D.C.</Typography>
          <Carousel
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            centerMode={mobile ? false: true}
            centerSlidePercentage={mobile ? 100 : 70}
          >
            {
              [
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image4.png',
                  component: (
                    <LinkContent
                      link="https://www.nps.gov/rocr/index.htm"
                      linkText="Rock Creek Park"
                      text="This expansive park offers miles of trails where you and your leashed pet can take leisurely walks amidst nature's beauty. Explore the lush greenery, picnic by the creek, and enjoy the peaceful surroundings."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image18.png',
                  component: (
                    <LinkContent
                      link="https://www.nps.gov/nama/index.htm"
                      linkText="National Mall"
                      text="Leashed pets are welcome to stroll along the National Mall and enjoy the iconic views of the Washington Monument, Lincoln Memorial, and other historical landmarks."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image14.png',
                  component: (
                    <LinkContent
                      link="https://www.capitolriverfront.org/yards-park"
                      linkText="The Yards Park"
                      text="This waterfront park is pet-friendly and features beautiful walking paths along the Anacostia River. It's a great spot for a relaxing outing with your pet."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image3.png',
                  component: (
                    <LinkContent
                      link="https://www.nps.gov/places/dumbarton-oaks-park.htm"
                      linkText="Dumbarton Oaks Park"
                      text="A serene and picturesque park, Dumbarton Oaks welcomes leashed pets to explore its gardens and tranquil trails."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image9.png',
                  component: (
                    <LinkContent
                      link="https://www.nps.gov/places/meridian-hill-park.htm"
                      linkText="Meridian Hill Park"
                      text="Also known as Malcolm X Park, this park allows leashed pets to enjoy its cascading fountains, statues, and beautifully landscaped grounds."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image6.png',
                  component: (
                    <LinkContent
                      link="https://www.wharfdc.com/"
                      linkText="The Wharf"
                      text="A lively waterfront destination, The Wharf offers pet-friendly outdoor spaces where you can enjoy waterfront views and diverse dining options with your furry friend."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/Smithsonian%20Gardens.jpeg',
                  component: (
                    <LinkContent
                      link="https://gardens.si.edu/"
                      linkText="Smithsonian Gardens"
                      text="Leashed pets are allowed in the gardens surrounding the Smithsonian museums. Explore the colorful blooms and historic architecture while taking a break from the city's bustle."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image16.png',
                  component: (
                    <LinkContent
                      link="https://www.humanerescuealliance.org/special-events-new#:~:text=The%20Embassy%20Row%20Hotel%20invites,benefitting%20the%20Humane%20Rescue%20Alliance."
                      linkText="Doggy Yappy Hour at The Embassy Row Hotel"
                      text="This pet-friendly event takes place during the warmer months, offering a fun-filled social gathering for pets and their owners at the hotel's rooftop bar."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image11.png',
                  component: (
                    <LinkContent
                      link="https://www.thebullpendc.com/"
                      linkText="The Bullpen"
                      text="Located near Nationals Park, The Bullpen is a pet-friendly outdoor venue that hosts events, food trucks, and live entertainment. Enjoy a relaxed atmosphere with your pet by your side."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image5.png',
                  component: (
                    <LinkContent
                      link="https://visitalexandria.com/old-town/"
                      linkText="Old Town Alexandria"
                      text="Just a short drive from D.C. Old Town Alexandria is a charming and pet-friendly neighborhood with historic streets, pet-friendly shops, and outdoor cafes where you and your pet can unwind together."
                    />
                  )
                },
              ].map((item, index) => (
                <Box key={index} textAlign="left" m="0.5rem" pb="0.25rem" minHeight="550px" boxShadow={1} borderRadius={4}>
                  <img style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }}  src={item.src} height="340px" />
                   {item.component}
                </Box>
              ))
            }
          </Carousel>



          <Typography variant="h2">The Top Pet-Friendly Restaurants in Washington DC</Typography>
          <Carousel
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            centerMode={mobile ? false: true}
            centerSlidePercentage={mobile ? 100 : 70}
          >
            {
              [
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image20.png',
                  component: (
                    <LinkContent
                      link="https://barksocial.com/"
                      linkText="Bark Social"
                      text="Bark Social Washington D.C. is a unique pet-friendly venue that offers a one-of-a-kind experience for both pets and their owners. This innovative space combines a dog park, bar, and social hub, providing a fun and safe environment for dogs to play and socialize while their owners enjoy refreshments and interact with other pet lovers."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image12.png',
                  component: (
                    <LinkContent
                      link="https://www.commissarydc.com/"
                      linkText="Commissary"
                      text="Situated in Logan Circle, Commissary welcomes pets on their outdoor patio. They offer a diverse menu, including breakfast favorites, sandwiches, and vegetarian options."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/The%20Brig.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.thebrigdc.com/"
                      linkText="The Brig DC"
                      text="This laid-back beer garden in Capitol Riverfront is a pet-friendly hotspot with a large outdoor space for pets to roam freely while you enjoy a variety of beers and snacks." 
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image10.png',
                  component: (
                    <LinkContent
                      link="https://www.dachabeergarden.com/"
                      linkText="Dacha Beer Garden"
                      text="A popular destination in Shaw, Dacha Beer Garden welcomes pets in its outdoor seating area. Enjoy their selection of beers and European-inspired dishes."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/Farmers%20Fishers%20Bakers.jpg',
                  component: (
                    <LinkContent
                      link="https://www.farmersfishersbakers.com/"
                      linkText="Farmers Fishers Bakers"
                      text="Located at the Georgetown waterfront, this restaurant offers a scenic view and a pet-friendly patio where you can savor farm-to-table cuisine."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image17.png',
                  component: (
                   <LinkContent
                     link="https://www.perrysam.com/"
                     linkText="Perry's"
                     text="A beloved Adams Morgan establishment, Perry's has a pet-friendly rooftop patio where you can enjoy sushi, cocktails, and the company of your furry friend."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image1.png',
                  component: (
                    <LinkContent
                      link="https://www.wundergartendc.com/"
                      linkText="Wunder Garten"
                      text="This outdoor beer garden in NoMa allows pets in its spacious and welcoming setting. Sip on German beers and enjoy live music while your pet enjoys the open space."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/Redrocks.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.redrocksdc.com/"
                      linkText="RedRocks"
                      text="With multiple locations throughout the city, RedRocks offers pet-friendly outdoor patios where you can enjoy wood-fired pizzas and other Italian favorites."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image13.png',
                  component: (
                    <LinkContent
                      link="https://bardo.beer/"
                      linkText="Bardo Brewing"
                      text="This unique brewery in Northeast D.C. welcomes pets in its expansive outdoor beer garden. Enjoy a variety of craft beers and food truck fare while your pet plays nearby."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Washington%20DC/image7.png',
                  component: (
                    <LinkContent
                      link="https://www.eltechosf.com/"
                      linkText="El Techo"
                      text="Located in Shaw, El Techo is a rooftop restaurant with a pet-friendly seating area. Savor Latin American-inspired cuisine and refreshing cocktails while enjoying views of the city."
                    />
                  )
                },
              ].map((item, index) => (
                <Box key={index} textAlign="left" m="0.5rem" pb="0.25rem" minHeight="550px" boxShadow={1} borderRadius={4}>
                  <img style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }}  src={item.src} height="340px" />
                   {item.component}
                </Box>
              ))
            }
          </Carousel>
      

        </Box>


      </Grid>
    </Container>
    <Footer />
  </>;
};

export default Washington;
