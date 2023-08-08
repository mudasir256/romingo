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

const Seattle: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Seattle, WA');

  const city = 'Seattle'
  const paragraphOne = 'Seattle is a pet-friendly city that warmly welcomes travelers with their four-legged companions. The city has numerous parks, trails, and outdoor spaces, creating plenty of opportunities for you and your pet to enjoy Seattle. Many cafes, restaurants, and breweries have pet-friendly options, so you can eat meals with your best friend by your side.'

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
      <title>Pet Friendly Hotels Seattle, WA | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, WA | Romingo`}
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
          WASHINGTON
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
            Whether you&apos;re exploring iconic sights or relaxing at a dog beach, pet-friendly travel in Seattle will be a memorable experience. Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy in Seattle.
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
          <Typography component="h2" variant="h2">The Top Pet-Friendly Accommodations in Seattle</Typography>

          <Bold text="Hyatt Regency Seattle" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Hyatt Regency Seattle welcomes pets to their hotel with open arms. This pet-friendly hotel has a modern design and offers upscale amenities for its guests. The hotel is in a great location, allowing visitors to easily explore Pike Place Market, the Space Needle, and the waterfront." />
          <Text text="When traveling to Seattle, the Hyatt Regency Seattle is a great pet-friendly hotel option. This hotel allows you to bring one dog with you and there is a $50 pet fee. The hotel provides a range of pet-friendly amenities, including a pet welcome kit, a bed, food, and water bowls. The hotel is close to pet-friendly parks and walking trails, so you can go on many adventures together." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site dining options', 'Business center']}
          />

    
          <Bold text="Kimpton Hotel Monaco Seattle" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Kimpton Hotel Monaco is a pet-friendly hotel in downtown Seattle that offers a relaxing trip for guests and their pets. You can easily walk to the Pike Place Market and to the waterfront from this hotel, allowing for exploring and adventures. Kimpton Hotel Monaco offers spacious pet-friendly rooms, allowing your furry companion to stay comfortably with you. Immerse yourself in the city's dynamic charm and enjoy a pet-friendly stay at Kimpton Hotel Monaco." />
          <Text text="The Kimpton Hotel Monaco Seattle loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. When you check-in, your pet will receive treats, food, water bowls, and a comfy bed to enjoy during their stay!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Coffee and tea in the morning', 'Bikes', 'Yoga mats', 'Rooftop pool', 'Dining options']}
          />

          <Bold text="Hyatt at Olive 8" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Hyatt at Olive 8 is a pet-friendly hotel in downtown Seattle that offers sustainable practices for guests and their pets. When you stay at Hyatt at Olive 8, you can enjoy the Space Needle, Seattle Center, or the Climate Pledge Arena." />
          <Text text="When you travel to Seattle, Hyatt at Olive 8 is a great hotel option. This hotel is pet-friendly and offers cozy spaces for your pet to unwind. When you arrive, your dog will receive a welcome letter, a bed, food, water bowls, and a welcome biscuit. The Hyatt team is always available to provide information on walking routes, pet shops, groomers, vets, and local pet-friendly establishments." />
          <Text text="Hyatt at Olive 8 allows you to bring two dogs with you and there is a $50 fee per stay." />          
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Eco-friendly services', 'Fitness center', 'Pool', 'Spa', 'On-site dining options']}
          />

          <Bold text="The Kimpton Hotel Vintage Seattle" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Kimpton Hotel Vintage Seattle is an elegant and sophisticated boutique hotel located in the heart of downtown Seattle, Washington. This chic hotel is pet-friendly and offers a unique blend of modern luxury and vintage charm. The hotel is close to Pike Place Market, Museum of Pop Culture, Capitol Hill, and more." />
          <Text text="Like other Kimpton Hotels, The Kimpton Hotel Vintage Seattle is very pet-friendly. You're welcome to bring your pet to the hotel for no additional cost. The Kimpton Hotel Monaco Seattle also allows pets of all sizes and breeds. Your furry friend will enjoy treats, food, bowls, and a bed so that they can have a great vacation in Seattle!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free one-hour rentals at the Center for Wooden Boats', 'Coffee and tea in the morning', 'Bikes', 'Yoga mats', 'Rooftop pool', 'Dining options']}
          />

          <Bold text="ACE Hotel Seattle" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The ACE Hotel Seattle is a trendy and vibrant boutique hotel located in the heart of the Belltown neighborhood. With its chic and eclectic design, the hotel offers a unique and artistic ambiance that sets it apart from traditional accommodations. This vibrant hotel boasts stylish accommodations, a lively bar, and a prime location within Seattle's bustling arts and entertainment district." />
          <Text text="The ACE Hotel Seattle is pet-friendly and does not charge extra for your pet to stay. Immerse yourself in the artistic spirit of the city and relish a pet-friendly sojourn at ACE Hotel Seattle." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Dining options']}
          />

          <Bold text="Hotel Ändra" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Hotel Ändra is a stylish and sophisticated pet-friendly hotel located in downtown Seattle, Washington. Embodying the essence of Scandinavian design, this luxury hotel offers a warm and inviting ambiance, making guests feel right at home. Hotel Ändra offers stylish rooms, a cozy fireplace lounge, and a popular restaurant serving Nordic-inspired cuisine." />
          <Text text="Hotel Ändra does not charge any additional fees for two pets weighing up to 50 pounds at their hotel. The central location of this hotel makes it a great option for your trip to Seattle." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Dining options']}
          />


          <Typography variant="h2">The Top Pet-Friendly Activities in Seattle</Typography>
          
          <LinkContent
            link="https://www.seattle.gov/parks/allparks/magnuson-park/off-leash-area"
            linkText="Magnuson Park Off-Leash Area"
            text="Treat your pet to an adventure at Magnuson Park Off-Leash Area, one of Seattle's largest and most popular dog parks. There are over eight acres of land where your pet can roam freely and enjoy a dog swimming area."
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

export default Seattle;
