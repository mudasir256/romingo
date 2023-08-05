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

const Tucson: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Tucson, AZ');

  const city = 'Tucson'
  const paragraphOne = 'Tucson, Arizona, is a welcoming destination that embraces pet-friendly travel, offering a wealth of activities and accommodations for both two-legged and four-legged travelers. With its warm climate and abundant outdoor spaces, Tucson is a paradise for pets and their owners.'

  const Text = ({ text }) => (
    <Typography variant="base">{text}</Typography>
  )
  const Bold = ({ text }) => (
    <Typography variant="p"><b>{text}</b></Typography>
  )

  const LinkContent = ({ link, linkText, text }) => (
    <Box>
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

  return <>
    <Helmet>
      <title>Pet Friendly Hotels Tuson, AZ | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, AZ | Romingo`}
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
          ARIZONA
        </Typography>
      </Divider>
      <Grid
        container
        spacing={4}
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
            Many parks and trails in the city allow leashed pets, providing ample opportunities for leisurely walks and exploration of the stunning desert landscapes. For a taste of nature, take your furry friend to Sabino Canyon or Saguaro National Park, where leashed pets can enjoy the scenic trails. Tucson&apos;s pet-friendly restaurants and cafes ensure you can savor delicious meals while your pet relaxes on outdoor patios.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden lgDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar />
            </Box>
            <IconTags />
          </Hidden>
          <Hidden mdUp>
            <FilterBar />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            From hiking adventures to pet-friendly attractions, Tucson offers a pet-friendly paradise where you can create unforgettable memories with your beloved furry companion.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
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
          padding='2.5rem'
          display='flex'
          flexDirection='column'
          gap='1.5rem'
        >
          <Divider />
          <Typography component="h2" variant="h2">The Top Pet-Friendly Accommodations in Tucson</Typography>
          <Text text="Tucson, Arizona, is a captivating destination known for its breathtaking desert landscapes and warm hospitality. If you're planning a trip to this vibrant city and want to bring your beloved pet along, you're in luck! Tucson offers a variety of pet-friendly hotels that cater to both human and four-legged guests. From upscale resorts to cozy inns, here are six top-notch accommodations that will ensure a comfortable and enjoyable stay for both you and your furry companion." />


          <Bold text="Loews Ventana Canyon Resort" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Loews Ventana Canyon Resort is an exquisite desert retreat nestled amidst the majestic Catalina Mountains in Tucson, Arizona. This luxurious resort exudes a blend of Southwestern charm and modern elegance, providing an unforgettable experience for guests seeking a tranquil and upscale escape. The resort's stunning outdoor pools and cascading waterfalls create a serene ambiance, perfect for relaxation and indulgence." />
          <Text text="For pet owners, Loews Ventana Canyon Resort goes above and beyond, offering a range of pet amenities, including welcome packages, pet walking services, and specialized dining options. Guests can bring two pets of any size after paying a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Two golf courses', 'Full-service spa', 'Fitness center', 'Pet walking services', 'On-site dining options']}
          />

          <Bold text="Westward Look Wyndham Grand Resort & Spa" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Nestled amidst the natural beauty of the Sonoran Desert, the Westward Look Wyndham Grand Resort & Spa in Tucson, Arizona, is an enchanting oasis that offers a luxurious and tranquil escape. This historic resort, dating back to the late 19th century, seamlessly blends its rich heritage with modern amenities, providing an unforgettable experience for every guest." />
          <Text text="With its breathtaking surroundings, warm hospitality, and exceptional facilities, Westward Look Wyndham Grand Resort & Spa promises a remarkable and rejuvenating stay for travelers seeking an enchanting desert retreat." />
          <Text text="Westward Look Wyndham Grand Resort & Spa is also pet-friendly, ensuring that your furry companion can join in the adventure. You can bring two pets of any size for a fee of $75 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa services', 'Tennis courts', 'Three outdoor pools', 'Fitness center']}
          />

          <Bold text="La Quinta Inn & Suites Tucson Reid Park" />
          <SingleLoadListingCard hotelName="" />
          <Text text="La Quinta Inn & Suites Tucson Reid Park is a welcoming and comfortable hotel located in Tucson, Arizona. Situated near the beautiful Reid Park and the Reid Park Zoo, the hotel offers a convenient location for both leisure and business travelers." />
          <Text text="With its affordable rates, convenient location, and pet-friendly atmosphere, La Quinta Inn & Suites Tucson Reid Park is an excellent choice for travelers looking for a budget-friendly and comfortable stay in Tucson." />
          <Text text="One of the standout features of this hotel is its pet-friendly policy, allowing guests to bring their furry companions along. You can bring two pets of any weight and size for a fee of $25 per pet, per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free breakfast', 'Outdoor pool', 'Fitness center']}
          />

          <Bold text="Sheraton Tucson Hotel & Suites" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Sheraton Tucson Hotel & Suites is a delightful oasis located in the heart of Tucson, Arizona. This inviting hotel offers a blend of modern comforts and Southwestern charm. The guest rooms and suites are spacious and thoughtfully designed, offering a relaxing retreat after a day of exploration. The hotel boasts an array of amenities, including a heated outdoor pool, a fitness center, and a vibrant courtyard where guests can unwind and enjoy the pleasant Arizona weather." />
          <Text text="When you stay at Sheraton Tucson Hotel & Suites, you can bring one dog that weighs up to 40 pounds for $50 or $75 if your dog weighs over 40 pounds." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Heated outdoor pool', 'Courtyard for relaxing', 'Fitness center', 'Business center']}
          />

          <Bold text="Hotel Congress" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Hotel Congress is an iconic and historic landmark located in the heart of downtown Tucson, Arizona. Established in 1919, this boutique hotel exudes vintage charm and a vibrant atmosphere, making it a popular destination. The guest rooms are tastefully decorated, preserving the hotel's historic character while providing modern amenities for a comfortable stay." />
          <Text text="The hotel's unique personality extends beyond its accommodations, as it houses various entertainment venues, including the historic Club Congress, which hosts live music and events." />
          <Text text="Hotel Congress is pet-friendly and allows pets that weigh up to 80 pounds for a fee of $50 per pet for one night and an additional $25 per pet for each extra night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'On-site bars', 'Fitness center']}
          />

          <Bold text="Best Western Royal Sun Inn & Suites" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Best Western Royal Sun Inn & Suites is a charming and inviting hotel situated in the heart of Tucson, Arizona. With its warm hospitality and convenient location, this hotel is an ideal choice for both business and leisure travelers." />
          <Text text="The Best Western Royal Sun Inn & Suites is conveniently located near the University of Arizona, making it an excellent choice for parents visiting students or attendees of university events. With its friendly staff, comfortable accommodations, and central location, the Best Western Royal Sun Inn & Suites offers a pleasant and memorable stay for travelers seeking a comfortable and affordable experience in Tucson." />
          <Text text="When staying at this hotel, you are able to bring two pets that weigh up to 80 pounds for a fee of $30 per pet, per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Heated outdoor pool', 'Fitness center', 'Free breakfast daily']}
          />


          <Typography variant="h2">The Top Pet-Friendly Activities in Tucson</Typography>
          
          <LinkContent
            link="https://www.tucsonaz.gov/Departments/Parks-and-Recreation/Parks/Sentinel-Peak-Park"
            linkText="Sentinel Peak Park (A Mountain)"
            text='Take a hike up to Sentinel Peak, known as "A Mountain," and enjoy breathtaking views of Tucson&apos;s cityscape and surrounding mountains. This pet-friendly trail offers a rewarding experience for both you and your pup.'
          />


        </Box>


        
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden lgDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar />
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

export default Tucson;
