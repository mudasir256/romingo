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

import { LargeFilterBar } from '../../components/LargeFilterBar';
import IconTags from '../../components/IconTags';

import { HOTEL_DESCRIPTIONS } from '../../constants/locationPageDescriptions';
import HighlightBox from '../../components/CitiesContent/HighlightBox';
import SingleLoadListingCard from '../../components/SingleLoadListingCard';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'


const searchData = {
  "city": {
    "description": "New York, NY, USA",
    "matched_substrings": [
        {
            "length": 8,
            "offset": 0
        }
    ],
    "place_id": "ChIJOwg_06VPwokRYv534QaPC8g",
    "reference": "ChIJOwg_06VPwokRYv534QaPC8g",
    "structured_formatting": {
        "main_text": "New York",
        "main_text_matched_substrings": [
            {
                "length": 8,
                "offset": 0
            }
        ],
        "secondary_text": "NY, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "New York"
        },
        {
            "offset": 10,
            "value": "NY"
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
  "lat": 40.7127753,
  "lng": -74.0059728
}

const NewYork: FC = () => {


  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'New York');
  const paragraphOne = "New York City offers a vibrant and exciting atmosphere for both locals and tourists, and luckily for pet owners, it also happens to be a remarkably pet-friendly destination. Exploring the Big Apple with your furry companion has never been easier, as numerous hotels, parks, and attractions welcome pets with open arms. Many hotels throughout the city now accommodate pets, providing comfortable accommodations and even special amenities for our four-legged friends."

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
      <title>Pet Friendly Hotels New York, NY | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels New York, NY | Romingo`}
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
        <Typography variant="h4" component="h1">Find pet-friendly hotels in New York</Typography>
        <Typography variant="base">The hassle free way to travel with your pet</Typography>
        <Box sx={{  width: '100%', mt: '1rem' }}>
          <LocationPageFilterBar search={searchData} />
        </Box>
      </Box>

      <Box
        component="img"
        src={cityContent.heroImage}
        alt="New York"
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
          Pet Friendly Hotels New York
        </Typography>
      </Box>
      <Divider variant="middle" light sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          NEW YORK
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
            sx={{ fontSize: '0.9rem'}}
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

          <Typography component="h2" variant="h2">The Top Pet Friendly Accommodations in New York</Typography>
          <Text text="Beyond the hotel scene, New York City boasts a plethora of pet-friendly parks, including Central Park, where dogs can roam freely in designated areas and enjoy the lush greenery alongside their owners. Additionally, numerous pet-friendly cafes and restaurants offer delightful treats and meals for both humans and pets to indulge in together. Whether strolling through bustling streets or experiencing the city&apos;s iconic landmarks, pet owners can embrace a true sense of inclusivity and camaraderie with their beloved pets by their side in this pet-friendly paradise that is New York City." /> 
       

          <SingleLoadListingCard 
            hotelName="100395552" 
            paragraphs={[
              "The Muse Hotel stands as a captivating haven nestled in the heart of urban vibrancy. With its prime location, this boutique gem effortlessly combines luxury and artistic inspiration, creating an experience that transcends mere accommodation. From the moment guests step into its stylishly adorned lobby, they are greeted by an ambiance that celebrates creativity and elegance in perfect harmony. Each room and suite is a testament to refined design, where modern comforts intertwine with thoughtful details, inviting travelers to unwind in an atmosphere of tranquility. ",
             // "The Muse Hotel's commitment to its muse-like ethos is further highlighted by its dedication to personalized service, ensuring that every guest's stay is both memorable and tailored to their desires. Whether indulging in the culinary delights offered at its gourmet restaurant, immersing in the cultural offerings of the surrounding city, or simply basking in the sophisticated charm of the hotel itself, The Muse Hotel is a sanctuary that redefines the art of hospitality.",
              "The Muse Hotel is pet-friendly and allows you to bring one pet of any size for no additional fee.",

            ]}
          />
      
          <SingleLoadListingCard 
            hotelName="100302262" 
            paragraphs={[
              "The Benjamin Hotel in NYC stands as a refined urban sanctuary, embodying timeless luxury and contemporary comfort at the crossroads of Midtown Manhattan. With its storied history dating back to the early 20th century, the Benjamin has seamlessly blended its rich heritage with modern sophistication. The hotel's meticulously designed rooms and suites exude a sense of tranquility, featuring plush bedding, sleek furnishings, and an array of amenities that cater to both business and leisure travelers. ",
             // "The Benjamin's signature &quot;Sleep Program&quot; showcases its commitment to guest well-being, offering an array of sleep-enhancing amenities and services for a restful night's slumber. Its central location provides easy access to iconic New York landmarks, cultural attractions, and world-class dining, while the hotel's culinary offerings, including the highly acclaimed restaurant, ensure a memorable gastronomic experience. With an unwavering dedication to impeccable service and a fusion of classic charm with contemporary elegance, the Benjamin Hotel epitomizes the essence of an upscale New York City stay.",
              "The Benjamin is pet-friendly and allows you to bring two dogs of any size for a fee of $75. "
            ]}
          />
   
          <SingleLoadListingCard 
            hotelName="100405364" 
            paragraphs={[
              "The Kimpton Hotel Eventi stands as a dynamic and sophisticated oasis in the heart of New York City's bustling Chelsea neighborhood. With its avant-garde design, the hotel embodies a blend of modern luxury and artistic flair, creating an atmosphere that celebrates individuality and creativity. The hotel's spacious and meticulously adorned rooms and suites provide a haven of comfort, offering guests a respite from the urban pulse while showcasing breathtaking city views. ",
             // "As part of the renowned Kimpton brand, Hotel Eventi takes pride in its commitment to personalized hospitality, ensuring that each guest's stay is marked by tailored experiences and genuine warmth. From the captivating social spaces and gourmet dining options to its rooftop bar that offers panoramic vistas of the city skyline, the Kimpton Hotel Eventi is an embodiment of cosmopolitan chic and an urban escape that invites travelers to indulge in a world where style meets substance.",
              "The Kimpton Hotel Eventi is pet-friendly and allows you to bring pets of any size for no additional fee."
            ]}
          />
    
          <SingleLoadListingCard 
            hotelName="100211380" 
            paragraphs={[
              "Perched gracefully above the iconic High Line in New York City's Meatpacking District, The Standard, High Line, stands as an architectural marvel and a cultural hub. This avant-garde hotel is known for its daring design, characterized by floor-to-ceiling windows that offer stunning views of the cityscape and the Hudson River. Its prime location, directly adjacent to the elevated park, reflects a seamless fusion of urban grit and natural serenity. ",
             // "The Standard's sleek rooms and suites are thoughtfully appointed with modern amenities and quirky touches, embodying a blend of sophistication and contemporary charm. The hotel's vibrant public spaces, including its bustling lobby and rooftop bar, have become sought-after destinations for both guests and locals alike. With a commitment to fostering artistic expression and hosting a diverse array of events, The Standard, High Line, transcends the role of a mere hotel to become an integral part of the city's cultural fabric, offering an experience that is as distinct as the skyline it overlooks.",
              "The Standard is pet-friendly and allows you to bring one pet of any size for no additional fee."
            ]}
          />
         
          <SingleLoadListingCard 
            hotelName="100040846" 
            paragraphs={[
              "Nestled within the elegant Upper East Side of Manhattan, The Lowell Hotel exudes a timeless sense of refinement and exclusivity. This discreet luxury boutique hotel offers a serene escape from the city's vibrant pace, providing an intimate and personalized experience for its discerning guests. The Lowell's opulent rooms and suites are meticulously designed, featuring a harmonious blend of classic sophistication and contemporary comforts. ",
             // "With an emphasis on attentive service and privacy, the hotel aims to make every guest feel like a resident of a grand private residence rather than a traditional hotel guest. Its acclaimed restaurant and cozy bar offer exquisite culinary experiences in an atmosphere of understated elegance. The Lowell's proximity to Central Park and upscale boutiques along Madison Avenue adds to its allure, making it an ideal haven for those seeking a refined retreat in the heart of New York City.",
              "The Lowell Hotel is pet-friendly and allows you to bring pets of any size for a fee of $200."
            ]}
          />
       
          <SingleLoadListingCard 
            hotelName="100111658" 
            paragraphs={[
              "1 Hotel Central Park stands as a refreshing oasis of sustainability and modern luxury at the crossroads of nature and urban life. Located adjacent to the iconic Central Park, this eco-conscious retreat redefines the concept of hospitality by seamlessly integrating natural elements into its design and ethos. The hotel's commitment to sustainability is evident in every detail, from reclaimed wood furnishings to living green walls that evoke a sense of calm and connection with the environment. ",
            //  "The thoughtfully curated rooms and suites provide a serene escape, adorned with organic textures and high-end amenities. Guests are invited to indulge in locally sourced and seasonal cuisine at the hotel's farm-to-table restaurant, which further accentuates its commitment to conscious living. With a rooftop bar offering panoramic views of the park and the city skyline, 1 Hotel Central Park offers a harmonious blend of urban sophistication and eco-conscious sensibility, inviting guests to immerse themselves in a world where luxury is synonymous with environmental responsibility.",
              "1 Hotel Central Park is pet-friendly and will only charge a $250 cleaning fee is the room is dirty after your stay."
            ]}
          />
       
          <Typography variant="h2">The Top Pet-Friendly Activities in New York</Typography>
         
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
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image16.png',
                  component: (
                    <LinkContent
                      link="https://www.centralparknyc.org/"
                      linkText="Central Park"
                      text="A haven for pets, Central Park offers designated areas for dogs to run and play off-leash. Take a leisurely stroll together, enjoy a picnic, or simply unwind amidst nature's beauty."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image9.png',
                  component: (
                    <LinkContent
                      link="https://www.brooklynbridgepark.org/"
                      linkText="Brooklyn Bridge Park"
                      text="Located along the waterfront, this park boasts stunning views of the Manhattan skyline and is an ideal spot for leashed walks and scenic photo sessions."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image2.png',
                  component: (
                    <LinkContent
                      link="https://www.thehighline.org/"
                      linkText="The High Line"
                      text="A former elevated railway turned green oasis, The High Line is perfect for leashed walks with your pet. Enjoy the art installations and city views as you meander along this unique park."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image19.png',
                  component: (
                    <LinkContent
                      link="https://www.nyctourism.com/new-york/manhattan/roosevelt-island"
                      linkText="Roosevelt Island"
                      text="Hop on the Roosevelt Island Tramway with your leashed pet and explore this peaceful island getaway. Enjoy the views and take a stroll along the waterfront promenade."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/Coney%20Island%20Beach.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.nycgovparks.org/parks/coney-island-beach-and-boardwalk"
                      linkText="Coney Island Beach"
                      text="During the off-season, leashed pets are welcome to roam the boardwalk and feel the sand beneath their paws."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/Ferry%20to%20Statue%20of%20Liberty%20and%20Ellis%20Island.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.statueoflibertytickets.com/?gclid=Cj0KCQjw84anBhCtARIsAISI-xc3yjrc7vPEYK0EzHA9jAXE03U7_1g44lBWtBVPlHDTsx0hidqAjJwaAmYTEALw_wcB"
                      linkText="Ferry to Statue of Liberty and Ellis Island"
                      text="Some ferry companies allow leashed pets aboard, enabling you to experience these iconic landmarks together."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/Fort%20Tryon%20Park.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.nycgovparks.org/parks/fort-tryon-park"
                      linkText="Fort Tryon Park"
                      text="Located in Upper Manhattan, this park welcomes leashed pets and offers scenic views of the Hudson River."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image8.png',
                  component: (
                    <LinkContent
                      link="https://www.viator.com/New-York-City-tourism/d687-r6517264451-s109979651?mcid=28353&tsem=true&supci=2026042029&supag=6517264451&supsc=kwd-68388635065&supai=296358812874&supap=&supdv=c&supnt=g&supti=kwd-68388635065&suplp=9031303&supli=&m=28353&supag=6517264451&supsc=kwd-68388635065&supai=296358812874&supap=&supdv=c&supnt=nt:g&suplp=9031303&supli=&supti=kwd-68388635065&tsem=true&supci=kwd-68388635065&supap1=&supap2=&gclid=Cj0KCQjw84anBhCtARIsAISI-xcWPiYI7Yhm_MpNGW7GCdlcrxJdRAHBA5AxX0fTjiXP5XKpt8I9SpkaAg4bEALw_wcB"
                      linkText="New York Water Taxi's Statue by Night Cruise"
                      text="Enjoy the illuminated skyline with your leashed pet on this evening cruise."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image6.png',
                  component: (
                    <LinkContent
                      link="https://bryantpark.org/"
                      linkText="Bryant Park"
                      text="Leashed pets can relax with their owners on the lawn or attend special pet-friendly events organized throughout the year."
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
          
        


          <Typography variant="h2">The Top Pet-Friendly Restaurants in New York</Typography>
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
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/Barking%20Dog.jpeg',
                  component: (
                    <LinkContent
                      link="https://barkingdognyc.com/"
                      linkText="Barking Dog"
                      text="Located on the Upper East Side, this restaurant is a haven for pet lovers. Barking Dog features a dog-friendly patio and offers a &quot;Canine Cuisine&quot; menu with delicious treats for your furry friend."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image7.png',
                  component: (
                    <LinkContent
                      link="https://eatatthewilson.com/"
                      linkText="The Wilson"
                      text="Nestled in Chelsea, The Wilson welcomes pets to their outdoor seating area. They offer a diverse menu, including American classics and creative cocktails for humans and &quot;paw-some&quot; mocktails for pets." 
                    />  
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image1.png',
                  component: (
                    <LinkContent
                      link="https://www.standardhotels.com/new-york/features/biergarten-nyc"
                      linkText="The Standard Biergarten"
                      text="Located in the Meatpacking District, this lively beer garden offers communal tables where pets are welcome. Savor traditional German cuisine and enjoy a relaxed atmosphere with your furry friend."
                    />  
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image11.png',
                  component: (
                    <LinkContent
                      link="https://www.freemansrestaurant.com/"
                      linkText="Freemans"
                      text="Tucked away on the Lower East Side, Freemans features a charming outdoor courtyard where pets can join you for a delicious meal of American fare and inventive cocktails."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image10.png',
                  component: (
                    <LinkContent
                      link="https://www.facebook.com/BistroChatNoir/"
                      linkText="Bistro Chat Noir"
                      text="This French-inspired bistro on the Upper East Side welcomes pets to their outdoor terrace. Enjoy the chic ambiance and delectable dishes with your furry companion by your side."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image18.png',
                  component: (
                    <LinkContent
                      link="https://clintonhallny.com/"
                      linkText="Clinton Hall"
                      text="Known for its extensive craft beer selection and creative burgers, Clinton Hall is a pet-friendly gem in multiple locations around the city. Relax with your pet in their outdoor seating areas."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image15.png',
                  component: (
                    <LinkContent
                      link="https://threesbrewing.com/"
                      linkText="Threes Brewing"
                      text="Located in Brooklyn, Threes Brewing is a brewery with a welcoming atmosphere for pets in their outdoor garden. Sip on craft beers and enjoy delectable snacks while your pet enjoys the fresh air."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/Lucky%20Dog.jpeg',
                  component: (
                    <LinkContent
                      link="https://luckydog.nyc/"
                      linkText="Lucky Dog"
                      text="As the name suggests, this Brooklyn-based bar is an ideal spot for you and your pet to unwind together. They offer a backyard garden where dogs can play and socialize."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/image3.png',
                  component: (
                    <LinkContent
                      link="https://www.pigbeachnyc.com/"
                      linkText="Pig Beach"
                      text="Another fantastic Brooklyn spot, Pig Beach, is a pet-friendly barbecue joint with a spacious outdoor area. Savor mouthwatering BBQ dishes while your furry friend enjoys the outdoor fun."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20York/Wilson.jpeg',
                  component: (
                    <LinkContent
                      link="https://eatatthewilson.com/nyc/"
                      linkText="The Wilson"
                      text="The Wilson Restaurant in NYC offers a culinary experience that combines modern elegance with a touch of classic comfort. With its thoughtfully curated menu and inviting ambiance, The Wilson showcases a contemporary twist on traditional American cuisine, making it a captivating destination for both locals and visitors seeking an unforgettable dining experience."
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

export default NewYork;
