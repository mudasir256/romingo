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

const Portland: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Portland, OR');

  const city = 'Portland'
  const paragraphOne = "Portland, Oregon, is a haven for pet-friendly travel, embracing its reputation as one of the most pet-friendly cities in the United States. Exploring this vibrant and quirky city becomes all the more enjoyable when you can do it with your furry companions by your side."

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
      <title>Pet Friendly Hotels Portland, OR | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, OR | Romingo`}
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
          OREGON
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
            Portland offers a plethora of pet-friendly parks, hiking trails, and off-leash areas where your pets can roam and play freely. Forest Park, one of the largest urban forests in the country, provides ample opportunities for scenic walks and adventures in nature.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            Many restaurants, cafes, and breweries in Portland welcome pets on their outdoor patios, ensuring you can enjoy delicious meals while your pets relax comfortably beside you. Furthermore, Portland boasts numerous pet-friendly accommodations, ranging from boutique hotels to cozy bed and breakfasts, ensuring a comfortable stay for both you and your four-legged friends.
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
            With its laid-back and pet-loving atmosphere, pet-friendly travel in Portland promises a memorable and rewarding experience for all members of the family, including the furry ones.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Portland</Typography>

          <Bold text="Aloft Portland at Cascade Station" />
          <SingleLoadListingCard hotelName="" />
          <Text text="This contemporary hotel, exuding a perfect blend of style and convenience, sets the stage for an unforgettable stay in the vibrant heart of Portland. As you step into the spacious and pet-friendly accommodations, a sense of home envelops you and your furry friends, creating a haven where their happiness and comfort are paramount." />
          <Text text="Pets up to 70 pounds are welcome at no additional charge. This contemporary hotel blends style and convenience, offering a vibrant atmosphere for you and your furry friends. With spacious pet-friendly accommodations, your beloved companions will feel right at home." />
          <Text text="Every aspect of Aloft Portland at Cascade Station has been thoughtfully designed to cater to the needs of both you and your pets. The sleek and contemporary ambiance sets a lively tone, providing an energizing backdrop for your adventures in the city. The modern amenities and thoughtful touches ensure that your stay is as convenient as it is enjoyable." />
          <Text text="Embrace the nearby friendly dog park, a haven for outdoor activities and social interactions, ensuring a delightful stay for pets and their owners." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free transportation to the airport', 'Pool', 'Dining options', 'Fitness center']}
          />

          
          <Bold text="Hotel deLuxe" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Hotel deLuxe is a stylish and pet-friendly hotel that pays homage to classic Hollywood glamour. Pets are welcomed with open arms, and the hotel's pet package includes treats, toys, and a cozy bed. The hotel's rooftop bar and lounge provide a lovely spot to unwind with your pets while enjoying scenic city views." />
          <Text text="Hotel deLuxe welcomes you to bring two pets of any size and charges a fee of $50 per pet, per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Pools', 'Fitness center', 'On-site dining options']}
          />


          <Bold text="The hoxton Portland" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Nestled in the heart of the city, The Hoxton Portland extends a warm welcome to pets at no additional charge. This trendy hotel embodies urban sophistication and chic comfort, ensuring a stylish retreat for you and your furry companion." />
          <Text text="Embrace the joy of exploring the city together, with the assurance that a friendly dog park nearby will enhance your experience with moments of outdoor bliss and joyful connections." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Meeting rooms and spaces', 'Bars']}
          />

          <Bold text="The Porter Portland Curio Collection by Hilton" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Every corner of The Porter Portland Curio Collection by Hilton exudes an air of refined ambiance, carefully curated to cater to your every need. The hotel's commitment to luxury is evident in its exquisite accommodations, which are designed to provide the utmost comfort and indulgence." />
          <Text text="Elegant furnishings, plush bedding, and tasteful decor create a haven of relaxation and tranquility, inviting you and your pets to unwind in style." />
          <Text text="The Porter Portland Curio Collection by Hilton allows two pets weighing up to 50 pounds for a fee of $75 per stay. This elegant hotel combines luxury with convenience, boasting exquisite accommodations and impeccable service." />
          <Text text="Unleash your pet's playful spirit at the nearby dog park, a delightful haven for outdoor exploration and joyful social interactions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Meditation room', 'Business center', 'Valet parking', 'Fitness center', 'On-site dining options', 'Business center']}
          />


          <Bold text="The Nines, a Luxury Collection Hotel" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Nines, a Luxury Collection Hotel, is a pet-friendly haven in the heart of downtown Portland. They offer a range of pet amenities, including beds, bowls, and treats, to ensure your pets feel right at home. With its central location, the hotel allows for easy access to pet-friendly parks and urban adventures." />
          <Text text="The Nines welcomes you to bring your pets on your trip. They allow you to bring two dogs up to 60 pounds for a fee of $85 per pet, per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Valet parking', 'Food and beverage credit', 'Electric bike and helmet rental', 'Daily happy hours', 'Courtesy car transportation']}
          />

          <Bold text="Moxy Portland Downtown" />
          <SingleLoadListingCard hotelName="" />
          <Text text="At Moxy Portland Downtown, pets up to 70 lbs can join you for a fee of $25 per pet per stay. This trendy and spirited hotel combines modern comfort with a playful atmosphere, ensuring a memorable stay for you and your furry friend." />
          <Text text="Nearby, a friendly dog park beckons, providing an ideal setting for outdoor adventures and opportunities for your pet to mingle with other playful companions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Free coffee and tea', 'On-site dining options', 'Convenience store']}
          />


          <Typography variant="h2">The Top Pet-Friendly Activities in Portland</Typography>
          <Text text="Portland, Oregon, is a city that celebrates its love for pets, and there's no shortage of pet-friendly activities to enjoy with your furry companions. From scenic parks to pet-friendly breweries, Portland offers a plethora of adventures that will make your pet's tail wag with excitement. Here are the ten best pet-friendly activities in Portland that will create unforgettable memories for both you and your pets:" />


          <LinkContent
            link="https://www.portland.gov/parks/forest-park"
            linkText="Forest Park"
            text="Embark on a hike in Forest Park, one of the largest urban forests in the country. With over 5,000 acres of lush greenery and miles of trails, this pet-friendly park provides the perfect setting for you and your pets to explore nature together."
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

export default Portland;
