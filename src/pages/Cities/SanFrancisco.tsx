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

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'San Francisco, CA');

  const city = 'San Francisco'
  const paragraphOne = 'San Francisco is a pet-friendly city known for its beautiful views and fun activities. Numerous pet-friendly hotels are available, ranging from luxurious hotels to cozy bed-and-breakfasts that cater to furry guests. Additionally, San Francisco has many dog parks and outdoor spaces where pets can run around off-leash.'

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
      <title>Pet Friendly Hotels San Francisco, CA | Romingo</title>
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
            The city&apos;s neighborhoods offer many opportunities for pet-friendly dining, with many restaurants and cafes welcoming pets on their outdoor patios. Pet parents can enjoy shopping at pet boutiques where they can buy treats, toys, and stylish accessories for their furry friends.
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
            San Francisco is a wonderful city to visit because of all of the exciting things you can do. Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy in San Francisco.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in San Francisco</Typography>

          <Bold text="Hilton San Francisco Union Square" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Hilton San Francisco Union Square is a landmark in the heart of the city. This pet-friendly hotel is stylish and modern with all the amenities you desire. This hotel has a prime location just steps away from Union Square's bustling shops and theaters." />
          <Text text="The Hilton San Francisco Union Square is a pet-friendly hotel. When you stay here, you can bring two pets with you that weigh up to 75 pounds each. You will also pay a fee of $50 per pet per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop lounge', 'Fitness center', 'Dining options']}
          />


          <Bold text="Kimpton Buchanan Hotel" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Located in Japantown, the Kimpton Buchanan Hotel is a luxury, pet-friendly hotel. The hotel's elegant and spacious rooms feature contemporary decor with a touch of Japanese flair, creating a soothing and inviting ambiance. The nearby Japantown Peace Plaza and Buchanan Street Mall are excellent spots for leisurely strolls with your pet." />
          <Text text="The Kimpton loves when you bring your pets on your trip. This is a great options because they allow pets of all sizes and breeds with no extra fees. When you check in, your pet will receive treats and the hotel offers pet beds and food bowls." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Wine and sake receptions in the lobby', 'Dining options']}
          />


          <Bold text="Hyatt Regency San Francisco" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Hyatt Regency San Francisco has a prime location along the water where you can enjoy many activities. This pet-friendly hotel offers breathtaking views of the Bay Bridge, Alcatraz Island, and the city skyline. The elegant and contemporary rooms feature plush amenities and modern comforts, providing a serene retreat amidst the urban buzz. The Hyatt Regency San Francisco provides wonderful service, ensuring that every guest's stay is enjoyable." />
          <Text text="The Hyatt Regency San Francisco is a great, pet-friendly option for your trip to the city. You can bring dogs that weigh up to 20 pounds for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Heated outdoor pool', 'Fitness center', 'Dining options']}
          />

          <Bold text="Proper Hotel" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Proper Hotel in San Francisco is a pet-friendly hotel that is elegant and sophisticated. The Proper Hotel has a cool location in a historic flatiron building in San Francisco. The hotel's location offers easy access to popular neighborhoods, iconic landmarks, and a myriad of dining and entertainment options." />
          <Text text="The Proper Hotel welcomes two of your pets and they can weigh up to 35 pounds. When your pets arrive, they will receive food bowls and treats. The Proper Hotel donates a portion of the $100 pet fee to Best Friends Animal Society." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop deck', 'Fitness center', 'Free hotel car service', 'Dining options']}
          />

          <Bold text="The SF Marriott Marquis" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The SF Marriott Marquis is a pet-friendly hotel located in downtown San Francisco. This hotel is in a prime location just steps away from some of the city's most iconic attractions. The SF Marriott Marquis provides a blend of style and comfort, including an inviting atmosphere for both business and leisure travelers. This pet-friendly hotel promises an exceptional and memorable experience for all visitors to San Francisco." />
          <Text text="The SF Marriott Marquis is a great place to stay with your pet when you travel to San Francisco. Pets are welcome to stay with a maximum of one pet per room. There is a fee of $125 and pets must weigh below 40 pounds." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Rooftop restaurant and bar', 'Dining options']}
          />

          <Bold text="InterContinental Hotels & Resorts" />
          <SingleLoadListingCard hotelName="" />
          <Text text="InterContinental Hotels & Resorts, often referred to as InterCon, is a pet-friendly hotel brand that offers sophisticated stays and amazing service. As with all InterContinental properties, guests can expect exceptional service during their stay. This pet-friendly hotel offers easy access to iconic landmarks, upscale shopping, and renowned dining options." />
          <Text text="If you want to travel to San Francisco with your dog, you should consider staying at the InterContinental. Your pets are welcome to stay in your hotel room for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Dining options']}
          />

         

          <Typography variant="h2">The Top Pet-Friendly Activities in San Francisco</Typography>
          
          <LinkContent
            link="https://www.parksconservancy.org/parks/crissy-field"
            linkText="Off-Leash Fun at Crissy Field"
            text="Head to Crissy Field, a stunning waterfront park with open spaces and sandy shores. Here your dog can roam off-leash and frolic in the surf. The area offers fantastic views of the Golden Gate Bridge and is a favorite spot for locals and visitors alike."
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

export default SanFrancisco;
