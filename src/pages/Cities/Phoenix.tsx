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

const Phoenix: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Phoenix, AZ');

  const city = 'Phoenix'
  const paragraphOne = "Phoenix captivates with year-round sunshine, stunning wide desert landscapes, and an active urban scene. From outdoor adventures amidst towering saguaro cacti to a thriving culinary Mexican restaurant and cultural scene, dog-friendly Phoenix offers a unique blend of natural beauty, urban sophistication, and Southwestern charm."

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
      <title>Pet Friendly Hotels Phoenix, AZ | Romingo</title>
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
            With easy access to awe-inspiring natural wonders and a wealth of family-friendly attractions, Phoenix is a destination that caters to diverse interests and leaves a lasting impression on visitors. The Grand Canyon is just one day trip away.
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
            Join us today as we explore some of the options in Phoenix, each providing a unique experience that places the comfort and happiness of your four-legged friend at the forefront.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Phoenix</Typography>

    
          <Bold text="Hyatt Place Phoenix Downtown" />
          <SingleLoadListingCard hotelName="Hyatt Place Phoenix Downtown" />
          <Text text="Immerse yourself in the vibrant heart of downtown Phoenix at the pet-friendly Hyatt Place Phoenix Downtown. They welcome up to two dogs (with a combined weight of up to 100 lbs) for an additional fee of $100 per stay." />
          <Text text="This modern hotel seamlessly blends contemporary comfort with unparalleled convenience, guaranteeing a delightful sojourn for both you and your furry companion. Enchant your canine friend with outdoor playtime and socialization in the nearby friendly dog park, nestled amidst the energetic cityscape." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Fitness center', 'Breakfast bar', 'On-site market']}
          />

          <Bold text="Sonesta Simply Suites Phoenix North" />
          <SingleLoadListingCard hotelName="Sonesta Simply Suites Phoenix North" />
          <Text text="Embrace a cozy retreat at Sonesta Simply Suites Phoenix North, where pets are embraced with open arms. Sonesta Simply Suites is pet-friendly and welcomes well-mannered pets, with no breed or weight restrictions. Up to two pets are permitted per suite. A $75 fee applies for stays up to 7 nights; $150 for all longer stays." />
          <Text text="The generously proportioned suites are thoughtfully designed to ensure your relaxation and well-being. Unleash your pet's playful spirit at the neighboring dog park, where they can stretch their legs and mingle with other four-legged companions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Laundry facilities', 'Fitness center', 'On-site convenience store']}
          />

          <Bold text="Kimpton Hotel Palomar Phoenix" />
          <SingleLoadListingCard hotelName="Kimpton Hotel Palomar Phoenix" />
          <Text text="Immerse yourself in the lap of luxury at the sophisticated Kimpton Hotel Palomar Phoenix, where pets of any size are welcomed at no additional fee. This upscale hotel exudes elegance and charm, featuring stylishly appointed rooms and impeccable service." />
          <Text text="Revel in the presence of a nearby dog park, providing the perfect setting for outdoor adventures and delightful social interactions. Here, pets are treated to an experience that is nothing short of extraordinary, alongside their esteemed human counterparts." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Coffee and tea bar', 'Yoga mats', 'Diffusers in each room', 'Business center']}
          />

          <Bold text="The Camby Hotel" />
          <SingleLoadListingCard hotelName="The Camby Hotel" />
          <Text text="Nestled in the Biltmore area, The Camby Hotel offers a chic and pet-friendly retreat. This upscale hotel allows dogs of all sizes and even provides a special &quot;Doggie&quot; menu, ensuring your pets are pampered during their stay. With beautiful views of Camelback Mountain, The Camby Hotel is an ideal spot to explore nearby pet-friendly parks and trails." />
          <Text text="The Camby Hotel allows you to bring two pets up to 20 pounds for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Rooftop pool', 'Charging stations for electric cars', 'On-site dining options', 'Dry cleaning']}
          />

          <Bold text="Sheraton Phoenix Downtown" />
          <SingleLoadListingCard hotelName="Sheraton Phoenix Downtown" />
          <Text text="Located in the heart of downtown Phoenix, the Sheraton Phoenix Downtown is a pet-friendly hotel that offers a central location for exploring the city. They allow dogs weighing up to 80 pounds and provide pet beds and water bowls to keep your pets comfortable throughout their stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site bar', 'On-site lounge', 'Bicycle rentals', 'Pool']}
          />

          <Bold text="Comfort Inn and Suites Phoenix North - Deer Valley" />
          <SingleLoadListingCard hotelName="Comfort Inn and Suites Phoenix North - Deer Valley" />
          <Text text="At Comfort Inn and Suites Phoenix North - Deer Valley, you and your pet can revel in a comfortable and budget-friendly stay. For a nominal fee of $25 per night, you can bring along two pets, with a combined weight of up to 75 lbs each." />
          <Text text="Rest assured knowing that your furry companion will find respite and solace in the cozy and inviting surroundings. Unleash their playful spirit at the nearby friendly dog park, where they can embark on thrilling explorations and engage in delightful social interactions." />
          <Text text="Phoenix opens its arms to both you and your cherished pet, providing a sanctuary where unforgettable moments and stress-free experiences await. From the contemporary allure of Hyatt Place Phoenix Downtown to the sophisticated charm of Kimpton Hotel Palomar Phoenix, the accommodation options cater to every preference." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Breakfast buffet', 'Fitness center', 'Outdoor pool']}
          />

  
          <Typography variant="h2">The Top Pet-Friendly Activities in Phoenix</Typography>
          <Text text="Phoenix, Arizona, is a pet-friendly paradise that offers a plethora of activities for you and your four-legged companions to enjoy together. From exploring the great outdoors to indulging in pet-friendly dining experiences, there's no shortage of exciting adventures for you and your pets in this sunny desert city. Here are the ten best pet-friendly activities in Phoenix:" />


          <LinkContent
            link="https://www.alltrails.com/parks/us/arizona/echo-canyon-recreation-area"
            linkText="Echo Canyon Trail and Recreation Area"
            text="Take a hike with your leashed dogs at the Echo Canyon Trail and Recreation Area on Camelback Mountain. The trail offers stunning views of the city and surrounding desert landscapes, making it a fantastic adventure for both you and your pets."
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

export default Phoenix;
