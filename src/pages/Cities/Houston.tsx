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

const Houston: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Houston, TX');

  const city = 'Houston'
  const paragraphOne = 'Travel in Houston, Texas, is a delightful experience that warmly welcomes both travelers and their furry companions. The city has parks, trails, and dog-friendly areas, providing many opportunities for pets to enjoy outdoor activities and socialize with other furry friends.'

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
      <title>Pet Friendly Hotels Houston, TX | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, TX | Romingo`}
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
          TEXAS
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
            With pet-friendly attractions, events, and even breweries, Houston is a wonderful city to enjoy with your pet.
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
          mt="1rem"
          width='100%'
          display='flex'
          flexDirection='column'
          gap='1.5rem'
        >
          <Divider />
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Houston</Typography>
          <Text text="Houston, Texas, is a city that embraces pet-friendly travel, making it an ideal destination for pet owners seeking inclusive hotels. Here are six pet-friendly hotels in Houston where you and your four-legged friend can create cherished memories together." />

          <Bold text="Hotel ZaZa Houston" />
          <SingleLoadListingCard hotelName="100430016" />
          <Text text="Hotel ZaZa Houston is a luxurious and stylish boutique hotel located in the Museum District of Houston, Texas. With a variety of themed accommodations, guests can choose from vibrant and whimsical rooms to elegant and sophisticated suites. Guests can indulge in the hotel's exquisite dining options, including the award-winning Monarch restaurant." />
          <Text text="The hotel provides designated pet-friendly rooms with upscale amenities, ensuring your pet feels just as pampered as you. There is a $100 fee per pet, but there is no weight limit. With its proximity to Hermann Park and other pet-friendly attractions, Hotel ZaZa Houston is a perfect choice for travelers with pets." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa', 'Fitness center', 'Dining options']}
          />
    
          <Bold text="Hilton Houston Westchase" />
          <SingleLoadListingCard hotelName="100437200" />
          <Text text="The Hilton Houston Westchase is a sophisticated and modern hotel located in the vibrant Westchase District of Houston, Texas. Guests can enjoy a range of amenities, including an outdoor pool, a fitness center, and dining options at the onsite restaurant. The hotel's convenient location allows easy access to major corporations, shopping centers, and popular attractions" />
          <Text text="The Hilton Houston Westchase is pet-friendly and you can bring two pets that weigh less than 75 pounds. There is an additional fee of $50 per pet, per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Ideal location near the Westchase District', 'Delectable on-site dining options', 'Well-equipped fitness center', 'Hospitable pet-friendly atmosopher', 'Free Wi-Fi']}
          />

          <Bold text="La Colombe d'Or Hotel & Restaurant" />
          {/* <SingleLoadListingCard hotelName="" /> */}
          <Text text="Nestled in the Montrose neighborhood, La Colombe d'Or is a pet-friendly boutique hotel with a rich history. This charming hotel offers well-appointed rooms and suites, some of which are pet-friendly. The hotel's proximity to Buffalo Bayou Park allows for leisurely strolls with your furry friend amidst beautiful green spaces." />
          <Text text="You can bring up to two dogs when you stay at La Colombe d'Or. There is a $250 fee per stay, and your dog will receive food and water bowls at arrival." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop pool', 'Off-leash dog area', 'Fireside lounge', 'Dining options', 'Fitness center', 'Courtyard', 'Sky lounge and balcony']}
          />

          <Bold text="The Westin Houston Downtown" />
          <SingleLoadListingCard hotelName="100409544" />
          <Text text="The Westin Houston Downtown is a contemporary and upscale hotel situated in the heart of Houston's bustling downtown district. Guests can enjoy a variety of amenities, including a rooftop pool with beautiful views of the city skyline and a fitness center." />
          <Text text="The hotel's pet-friendly policy ensures a convenient and comfortable stay for you and your pet. Enjoy spacious rooms and upscale amenities, as well as easy access to pet-friendly parks and attractions nearby. The Westin Houston Downtown welcomes one dog that weighs up to 40 pounds for an additional $100 fee per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site activities, such as cooking classes', 'Fitness center', 'On-site convenience store', 'Dry cleaning services']}
          />

          <Bold text="Magnolia Hotel Houston" />
          <SingleLoadListingCard hotelName="100405496" />
          <Text text="The Magnolia Hotel Houston is a historic and stylish boutique hotel located in the heart of downtown Houston, Texas. The hotel's location is within walking distance of Houston's major attractions, theaters, and dining establishments, such as Discover Green Park." />
          <Text text="As a pet-friendly hotel, The Magnolia Hotel warmly welcomes furry companions with open arms! You canbring up to two pets that weigh 75 pounds for no fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Locally sourced breakfast and dinner options', 'Rooftop pool', 'Fitness center', 'Business center', 'On-site dining options']}
          />

          <Bold text="Aloft Houston by the Galleria" />
          <SingleLoadListingCard hotelName="100007968" />
          <Text text="Aloft Houston by the Galleria is a trendy and vibrant hotel located near the renowned Galleria shopping district in Houston, Texas. This modern and hip hotel offers a refreshing and contemporary atmosphere, attracting both business and leisure travelers alike. Guests can socialize and unwind at the hotel's W XYZ bar, which offers craft cocktails and live music." />
          <Text text="Aloft Houston by the Galleria is pet-friendly and offers designated rooms with comfortable arrangements for you and your furry friend. The hotel allows you to bring up to two dogs for $75 - $150 per day. Enjoy the hotel's vibrant and modern atmosphere, as well as easy access to nearby pet-friendly shopping and dining options." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Indoor pool', 'Free coffee and tea', 'On-site dining options', 'Fitness center', 'On-site convenience store']}
          />

          <Text text="Houston's pet-friendly hotels warmly embrace pets as valued guests, ensuring a comfortable and inclusive stay for both humans and their four-legged companions. Whether you're seeking luxury accommodations, boutique charm, or modern elegance, these six pet-friendly hotels offer a range of options to suit your preferences. Leash up your pet and embark on a memorable stay in Houston, creating special memories with your furry friend in this pet-friendly city." />


          <Typography variant="h2">The Top Pet-Friendly Activities in Houston</Typography>
          <Text text="Houston, Texas, is a city that loves its furry residents just as much as its human ones. These are ten of the best pet-friendly activities in Houston for you and your furry friend." />


          <LinkContent
            link="https://www.downtownhouston.org/guidedetail/parks/johnny-steele-dog-park/"
            linkText="Johnny Steele Dog Park"
            text="Johnny Steele Dog Park, located in Buffalo Bayou Park, is a spacious and well-maintained off-leash dog park that offers separate areas for large and small dogs to play freely. The park's beautiful scenery and designated dog-friendly trails make it a perfect spot for a fun-filled day with your pet."
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

export default Houston;
