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

const LosAngeles: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Los Angeles, CA');

  const city = 'Los Angeles'
  const paragraphOne = "From pet-friendly beaches to hiking trails and outdoor cafes, there's no shortage of fun and memorable experiences for pet owners in the City of Angels. Many parks throughout Los Angeles have designated off-leash areas where your pet can romp and socialize with other dogs, such as Runyon Canyon and Laurel Canyon Dog Park."

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
      <title>Pet Friendly Hotels Los Angeles, CA | Romingo</title>
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
            For some beach fun, head to Rosie&apos;s Dog Beach in Long Beach, the only off-leash dog beach in LA County. If you want to dine out with your pet, numerous restaurants with outdoor seating welcome furry friends, ensuring you can enjoy delicious meals without leaving your four-legged companion behind.
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
            Additionally, many hotels and vacation rentals in Los Angeles are pet-friendly, ensuring a comfortable and welcoming stay for you and your pet. With an abundance of pet-friendly options and a warm and inviting atmosphere, Los Angeles is the perfect destination for a pet-friendly vacation where you can create cherished memories with your beloved furry friend.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Los Angeles</Typography>
        

    
          <Bold text="The Kimpton Hotel Palomar" />
          <SingleLoadListingCard hotelName="The Kimpton Hotel Palomar" />
          <Text text="The Kimpton Hotel Palomar Los Angeles is a sophisticated and stylish boutique hotel situated in the vibrant neighborhood of Beverly Hills. As part of the renowned Kimpton Hotels & Restaurants group, this chic hotel embraces the brand's signature warmth and hospitality. As part of the renowned Kimpton Hotels & Restaurants group, this chic hotel embraces the brand's signature warmth and hospitality." />
          <Text text="With its prime location near Rodeo Drive and other famous attractions, The Kimpton Hotel Palomar Los Angeles promises a luxurious and unforgettable stay for travelers seeking a chic and contemporary escape in the heart of Beverly Hills." />
          <Text text="The Kimpton welcomes pets with open arms and allows you to bring as many pets as you want in all sizes for no extra fees. Your pets will receive goodies upon arriving too, such as bowls, treats, and bags." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop pool', 'Fitness center', 'On-site dining options', 'Social hour', 'Bike rentals', 'Yoga mats']}
          />

          
          <Bold text="Loews Hollywood Hotel" />
          <SingleLoadListingCard hotelName="Loews Hollywood Hotel" />
          <Text text="Loews Hollywood Hotel is a glamorous and contemporary retreat located at the epicenter of Hollywood, California. Situated in the heart of the entertainment capital, this upscale hotel offers a prime location for guests looking to immerse themselves in the glitz and glamour of Tinseltown. The guest rooms and suites are designed with modern amenities and have breathtaking views of the Hollywood Hills." />
          <Text text="With its proximity to famous attractions like the Hollywood Walk of Fame and the Dolby Theatre, Loews Hollywood Hotel promises an unforgettable and star-studded stay for visitors seeking an upscale and glamorous escape in the heart of Hollywood." />
          <Text text="Loews is a pet-friendly hotel that allows you to bring two pets under 75 pounds each with an additional fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Spa services', 'On-site dining']}
          />

          <Bold text="The London West Hollywood" />
          <SingleLoadListingCard hotelName="The London West Hollywood" />
          <Text text="Perched at the crossroads of West Hollywood and Beverly Hills, The London West Hollywood is a chic and contemporary hotel that epitomizes Hollywood glamour. Boasting stunning views of the Los Angeles skyline, this luxurious hotel offers an upscale and sophisticated experience for guests seeking the ultimate California dream. The hotel's prime location near the Sunset Strip and iconic Hollywood landmarks makes it an ideal destination for exploring the city's vibrant nightlife and attractions." />
          <Text text="The London West Hollywood is a pet-friendly hotel, extending its hospitality to furry companions with specialized amenities and services. When staying here, you can bring one pet under 30 pounds with an additional fee of $100 plus $20 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop pool', 'Fitness center', 'Spa services', 'Business center']}
          />

         

          <Bold text="The Langham Huntington, Pasadena" />
          <SingleLoadListingCard hotelName="The Langham Huntington, Pasadena" />
          <Text text="Nestled amidst 23 acres of lush gardens and scenic landscapes in Pasadena, California, The Langham Huntington is an exquisite luxury hotel that exudes timeless elegance and sophistication. Originally constructed in 1907, this historic landmark has been meticulously restored to its former glory, offering a luxurious retreat for discerning travelers. The guest rooms and suites are opulently designed, featuring modern amenities and lavish touches, providing a sumptuous haven for relaxation." />
          <Text text="The Langham Huntington warmly welcomes pets, providing a pet-friendly experience that includes pet beds, food bowls, and treats for furry companions. Pets must be under 20 pounds and there is an additional fee of $250." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa services', 'Fitness center', 'Outdoor pool', 'Business center']}
          />

          <Bold text="The Westin Bonaventure Hotel & Suites" />
          <SingleLoadListingCard hotelName="The Westin Bonaventure Hotel & Suites" />
          <Text text="The Westin Bonaventure Hotel & Suites is an iconic and modern hotel that stands tall among the city's skyline. This architectural masterpiece offers a perfect blend of sophistication and comfort, making it a popular choice for both business and leisure travelers. The guest rooms and suites are elegantly appointed, providing a relaxing and contemporary sanctuary with stunning city views." />
          <Text text="With its central location, excellent service, and pet-friendly policy, The Westin Bonaventure Hotel & Suites offers a remarkable and memorable stay for travelers seeking a convenient and comfortable experience in the bustling city of Los Angeles." />
          <Text text="Pets are welcome to stay with you at The Westin Bonaventure Hotel & Suites. You can have one pet in your room that weighs up to 40 pounds for an additional fee of $45 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site dining options', 'Rooftop pool', 'Business center']}
          />

          <Bold text="Fairmont Miramar Hotel & Bungalows" />
          <SingleLoadListingCard hotelName="Fairmont Miramar Hotel & Bungalows" />
          <Text text="The Fairmont Miramar Hotel & Bungalows is an exquisite oasis that exudes luxury and tranquility. This iconic hotel offers a perfect blend of modern elegance and timeless charm, providing an unforgettable experience for discerning travelers. The guest rooms and bungalows are elegantly appointed, offering sweeping views of the Pacific Ocean or the lush gardens." />
          <Text text="Fairmont Miramar Hotel & Bungalows promises an idyllic and memorable stay in Santa Monica, where guests can immerse themselves in the epitome of coastal elegance and sophistication." />
          <Text text="You're welcome to bring your pets to this hotel for an additional $100 cleaning fee per pet, per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Large pool area', 'Fitness center', 'Spa services', 'Multiple dining options']}
          />

          <Typography variant="h2">The Top Pet-Friendly Activities in Los Angeles</Typography>
          <LinkContent
            link="https://www.laparks.org/runyon/"
            linkText="Runyon Canyon Park"
            text="One of LA's most popular dog-friendly hiking spots, Runyon Canyon offers scenic trails with breathtaking views of the city. Leash up your pup and enjoy a refreshing hike together."
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

export default LosAngeles;
