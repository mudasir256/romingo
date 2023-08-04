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

const Denver: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Denver, CO');

  const city = 'Denver'
  const paragraphOne = 'Denver is a fantastic city for pet-friendly travel, offering many activities and hotels that warmly welcome your four-legged companions. There are numerous pet-friendly hikes and parks for you and your pet to explore, including Red Rocks Park. Additionally, there are many restaurants and cafes in Denver that offer pet-friendly outdoor seating options.'

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
      <title>Pet Friendly Hotels Denver, CO | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, CO | Romingo`}
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
          COLORADO
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
            We&apos;re here to help you plan your next pet-friendly trip to Denver! Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in {city}</Typography>
          <Bold text="Hyatt Centric Downtown Denver" />
          <SingleLoadListingCard hotelName="Hyatt Centric Downtown Denver" />
          <Text text="Hyatt Centric Downtown Denver is a pet-friendly hotel that offers a warm welcome to both guests and their furry companions. Situated in the heart of the city, this modern and stylish hotel ensures a comfortable stay for everyone in the family. The hotel's rooftop bar offers stunning views of the city and the Rocky Mountains, creating a perfect spot to unwind." />
          <Text text="The Hyatt Centric Downtown Denver provides designated rooms and floors where your pet can stay comfortably with you. The hotel also offers pet amenities, such as pet beds and food bowls, to ensure your pet feels right at home. There are pet fees when you stay at this hotel depending on the length of your stay. Additionally, there is a weight restriction of 80 pounds per pet." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Dining options', 'On-site bars', 'Fitness center', 'Laundry offerings']}
          />


          <Bold text="Thompson Denver" />
          <SingleLoadListingCard hotelName="Thompson Denver" />
          <Text text="The Thompson Denver is a chic and luxurious hotel in the heart of downtown Denver, Colorado, that warmly welcomes pets. With its modern design and amenities, this pet-friendly hotel offers comfortable accommodations for both you and your furry companions. With its great location, stylish ambiance, and exceptional service, The Thompson Denver promises a wonderful stay for guests and pets." />
          <Text text="When you stay at The Thompson Denver, your pet will receive treats and amenities to ensure they feel right at home. The Thompson Denver's central location is close to parks and walking areas, making it convenient for you to explore the city. You can bring up to two pets and you will not have to pay any extra fees." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Laundry services', 'Dining options', 'On-site coffee bar']}
          />

          <Bold text="Historic Hilton Garden Inn Denver Union Station" />
          <SingleLoadListingCard hotelName="Historic HIlton Garden Inn Denver" />
          <Text text="The Historic Hilton Garden Inn Denver Union Station is a charming hotel that captures the essence of Denver's rich history. Situated just steps away from Denver Union Station, the hotel's location is ideal for exploring the city's vibrant downtown area. The hotel's on-site restaurant serves delicious American cuisine, and guests can enjoy cocktails and stunning views from the rooftop bar." />
          <Text text="The Historic Hilton Garden Inn Denver Union Station is pet-friendly and invites you to bring your pet on your vacation. Upon arrival, your pet will receive a special welcome, complete with treats and toys to make them feel at home. The hotel welcomes two pets up to 50 pounds for a fee of $50 per pet, per stay. Your beloved four-legged companion will love joining you in discovering the enchanting city of Denver!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Indoor pool', 'Business center', 'Dining options']}
          />

          <Bold text="Magnolia Hotel Denver" />
          <SingleLoadListingCard hotelName="Magnolia Hotel Denver" />
          <Text text="The Magnolia Hotel Denver is a historic and pet-friendly boutique hotel located in the heart of downtown Denver, Colorado. Magnolia Hotel Denver is in downtown Denver near famous restaurants and shopping. The hotel has a rooftop terrace and an on-site restaurant for you and your pet to enjoy." />
          <Text text="When you stay at this pet-friendly hotel, you can bring two pets of any size for no additional fee. Upon arrival, pets receive a special greeting, complete with treats and toys to ensure they feel comfortable and at home. You are also close to parks and walking areas throughout downtown Denver." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Business center', 'Fitness center', 'Dining options']}
          />          

          <Bold text="The Brown Palace Hotel and Spa" />
          <SingleLoadListingCard hotelName="The Brown Palace Hotel" />
          <Text text="The Brown Palace Hotel and Spa is one of Denver's most iconic, pet-friendly hotels. This iconic hotel opened in 1892 and is an important landmark in Denver. The hotel's luxurious amenities include a full-service spa, a rooftop pool, and several exquisite dining options. This hotel is in downtown Denver and is close to many popular attractions in the city." />
          <Text text="This historic luxury hotel offers pet-friendly accommodations and provides pet amenities, including beds and bowls, to ensure a comfortable stay. Civic Center Park and Cheeseman Park are nearby places where you can take your pet. You can bring two pets when you stay at this hotel and there is a $125 pet fee per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa and salon offerings', 'Fitness center', 'Afternoon tea', 'On-site dining options']}
          />  

          <Bold text="Kimpton Hotel Born" />
          <SingleLoadListingCard hotelName="Kimpton Hotel Born" />
          <Text text="Kimpton Hotel Born is a contemporary and stylish boutique hotel located in the heart of Denver's vibrant Union Station neighborhood. The hotel's prime location makes it an ideal base for exploring the city's many attractions, restaurants, and cultural hotspots. Kimpton Hotel Born promises a contemporary and luxurious experience that captures the vibrant spirit of the Mile High City!" />
          <Text text="Kimpton Hotel Born loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. When you check in, your pet will receive treats and the hotel offers pet beds and food bowls." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Dining options', 'In-room coffee and espresso makers']}
          />  

          <Typography component="h2" variant="h2">The Top Pet-Friendly Activities in Denver</Typography>
          <LinkContent
            link="https://cpw.state.co.us/placestogo/parks/CherryCreek"
            linkText="Cherry Creek State Park"
            text="Treat your four-legged companion to a day of outdoor fun at Cherry Creek State Park. This expansive park offers miles of trails where you and your pet can hike, jog, or simply stroll amidst picturesque scenery. Additionally, the park has a designated off-leash dog area where your pup can play and socialize freely."
          />



        </Box>


        
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              
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

export default Denver;
