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
            You and your furry friend can explore large dog parks, pet-friendly beaches, and many hiking trails. There are many restaurants and cafes with pet-friendly outdoor seating options that allow you to bring your pet with you.
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
            San Diego is a wonderful city to visit because of all of the exciting things you can do. Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy in San Diego.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in San Diego</Typography>

          <Bold text="The Manchester Grand Hyatt San Diego" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Manchester Grand Hyatt San Diego is a pet-friendly hotel that loves welcoming your four-legged friend. Located in downtown San Diego, this hotel offers many pet-friendly services to guarantee an enjoyable stay for everyone. When you arrive, your furry friend will receive treats and toys, setting the tone for a memorable pet-friendly experience. This pet-friendly hotel has rooms where pets can stay, so your dog may even make a friend during your trip!" />
          <Text text="When staying at The Manchester Grand Hyatt San Diego, you can bring two pets that weigh 50 pounds or under. There is a $100 fee and you can stay at this hotel for up to 30 days." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Multiple outdoor pools', 'Game room', 'Rooftop cinema', 'Fitness center', 'Dining options']}
          />

          <Bold text="Hotel del Coronado" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Hotel del Coronado is a beautiful pet-friendly hotel that is on Coronado Island in San Diego. This resort offers a pet program, which includes pet room service, pet beds, water bowls, and an in-room dining menu. Coronado Beach is dog-friendly, so you both can enjoy the sun and the sand during your trip to San Diego." />
          <Text text="The Hotel del Coronado allows you to bring two dogs with you that weigh under 40 pounds. There is also a $125 pet fee when you stay at this pet-friendly hotel." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Beachfront property', 'Outdoor pool', 'Fitness center', 'Spa experiences', 'Movies on the beach', 'Dining options']}
          />

          <Bold text="The Dana on Mission Bay" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Dana on Mission Bay is a pet-friendly hotel located on Mission Bay in San Diego. This waterfront resort is a paradise for both you and your furry companion. You can explore the bay together, take leisurely walks along the shore, or unwind at nearby restaurants. The Dana on Mission Bay is close to Dog Beach where your pet can play in the sand and water." />
          <Text text="When you stay at The Dana on Mission Bay, your pet will receive water bowls, treats, and waste bags. You can bring up to two dogs with you when you stay at this hotel that weigh less than 80 pounds. There is also a pet fee of $40 per night plus costs for any damages during your stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Movie night in the pool', 'Fitness center', 'Water sports and bike rentals', 'Lawn games', 'Wine tasting', 'Pet-friendly restaurants']}
          />

          <Bold text="Kimpton Alma Hotel San Diego" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Kimpton Alma Hotel San Diego is a pet-friendly hotel in downtown San Diego. You will be close to many pet-friendly activities, including the waterfront and Gaslamp District. This hotel offers a prime location for exploring the city's vibrant dining, entertainment, and cultural scene." />
          <Text text="The Kimpton Alma Hotel San Diego loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. When you check in, your pet will receive treats and the hotel offers pet beds and food bowls." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Coffee and tea in the morning', 'Bikes', 'Yoga mats', 'Rooftop pool', 'Dining options']}
          />

          <Bold text="Omni San Diego Hotel" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Omni San Diego Hotel is in downtown San Diego and loves when you bring your pets. There are nearby dog parks and pet-friendly attractions, such as Waterfront Park. When you stay at Omni San Diego Hotel, you and your pet will have a great time!" />
          <Text text="Omni San Diego Hotel is close to numerous pet-friendly parks and walking areas in downtown San Diego. Upon check-in, your pet will receive a pet-friendly amenity kit with toys, treats, and clean-up bags. When you stay here, your pet can weigh up to 40 pounds and there is a $100 non-refundable pet fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Rooftop pool', 'Dining options']}
          />

          <Bold text="La Valencia Hotel" />
          <SingleLoadListingCard hotelName="" />
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

export default SanDiego;
