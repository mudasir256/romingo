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

const SaltLakeCity: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Salt Lake City, UT');

  const city = 'Salt Lake City'
  const paragraphOne = 'Salt Lake City, Utah, is a pet-friendly destination that welcomes four-legged travelers with open arms. This beautiful city nestled amidst stunning mountains offers a variety of pet-friendly activities and accommodations, ensuring a memorable experience for both you and your furry companions. Enjoy a leisurely stroll with your pets in the pet-friendly parks and walking trails scattered throughout the city, such as Liberty Park and Memory Grove Park.'

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
      <title>Pet Friendly Hotels Salt Lake City, UT | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, UT | Romingo`}
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
          UTAH
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
            If you&apos;re up for an outdoor adventure, explore the pet-friendly hiking trails in the nearby canyons, such as Mill Creek Canyon or Big Cottonwood Canyon. Additionally, the city boasts a range of pet-friendly hotels and accommodations, ensuring a comfortable stay for both you and your pets.
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
            With its warm hospitality and numerous pet-friendly options, Salt Lake City promises an enjoyable and rewarding pet-friendly travel experience for the whole family.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Salt Lake City</Typography>

          <Bold text="Sheraton Salt Lake City Hotel" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Sheraton Salt Lake City Hotel is pet-friendly and welcomes dogs of all sizes. They offer pet beds, water bowls, and a welcome kit for your pets, ensuring they feel right at home. The hotel's central location provides easy access to nearby pet-friendly parks and walking trails." />  
          <Text text="You are welcome to bring up to two pets to this hotel for a fee of $50 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pool', 'On-site dining options', 'Fitness center']}
          />


          <Bold text="Motel 6-Salt Lake City, UT - Downtown" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Immerse yourself in the heart of downtown Salt Lake City at Motel 6-Salt Lake City, UT - Downtown, a pet-friendly hotel that embraces pets weighing up to 35 where pets “stay free.”" />
          <Text text="This budget-friendly and conveniently located hotel offers straightforward yet comfortable accommodations for you and your furry friends. It's an ideal choice for travelers seeking an affordable pet-friendly stay right in the midst of the city's vibrant atmosphere." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free WiFi']}
          />

          <Bold text="Kimpton Hotel Monaco" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Experience the luxury and sophistication at Hotel Monaco, a pet-friendly boutique hotel that exudes an atmosphere of elegance and style. This exceptional establishment warmly welcomes two pets weighing any size for no additional charge." />
          <Text text="As you step into this upscale hotel, you will be immediately captivated by the seamless fusion of modern amenities and historical charm. Each guest room has been designed with opulence in mind, featuring exquisite furnishings, plush bedding, and state-of-the-art facilities, ensuring a stay that epitomizes indulgence and comfort." />
          <Text text="Immerse yourself in the heart of Salt Lake City's vibrant culture and nightlife, knowing that you and your beloved pets have a luxurious sanctuary to return to at the end of each day. Hotel Monaco is more than just a hotel; it is an oasis of refined sophistication, where every moment is imbued with a sense of indulgence and style." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Yoga matt', 'Custom kickboard scooters for children', 'Free morning coffee and tea service', 'Daily social hour']}
          />
      
          <Bold text="Residence Inn by Marriott Salt Lake City Downtown" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Residence Inn by Marriott is a pet-friendly hotel that offers comfortable extended-stay accommodations. They allow pets for a small additional fee, ensuring a convenient and enjoyable stay for both you and your pets. The hotel's fully equipped suites provide ample space for you and your furry friends to relax and unwind." />
          <Text text="You are welcome to bring up to two pets to this hotel for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Daily breakfast', 'Coffee and tea offerings', 'Fitness center', 'Outdoor pool']}
          />

          <Bold text="Hilton Salt Lake City Center" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Featuring the ultimate in convenience and comfort, the Hilton Salt Lake City Center is a pet-friendly haven designed to cater to the needs of both business and leisure travelers. With a nominal fee of just $50 per stay, this exceptional hotel extends a warm welcome to two pets weighing up to 75 lbs each, ensuring that your furry companions can accompany you on your journey." />
          <Text text="Nestled in the heart of the vibrant downtown area, Hilton Salt Lake City Center stands as a beacon of modernity and sophistication, offering an array of contemporary amenities, spacious accommodations, and unparalleled service." />
          <Text text="Whether you're seeking to explore the city's renowned attractions or attending a conference at the nearby convention center, this pet-friendly sanctuary serves as an inviting and accommodating home base throughout your stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Business center', 'On-site dining options']}
          />


          <Bold text="Hyatt Place Salt Lake City/Downtown/The Gateway" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Hyatt Place is a pet-friendly hotel conveniently situated near popular attractions in Salt Lake City. They welcome pets weighing up to 50 pounds, ensuring a comfortable stay for you and your pets. The hotel's modern and spacious rooms provide a relaxing sanctuary for you and your furry companions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center']}
          />

          <Text text="Before booking your stay at these pet-friendly hotels, it's always a good idea to check the specific pet policies and any additional fees. These six pet-friendly hotels in Salt Lake City will allow you to explore the city's attractions and enjoy a comfortable stay with your furry friends by your side." />


          <Typography variant="h2">The Top Pet-Friendly Activities in Salt Lake City</Typography>
          <Text text="Salt Lake City, Utah, is a pet-friendly paradise that offers a plethora of activities for you and your furry companions to enjoy together. From scenic outdoor adventures to pet-friendly shopping and dining experiences, there are fun-filled activities for the whole family. Here are the ten best pet-friendly activities in Salt Lake City that will make your pet's tail wag with excitement:" />


          <LinkContent
            link="https://www.slc.gov/parks/parks-division/memory-grove/"
            linkText="Memory Grove Park"
            text="Explore Memory Grove Park, a beautiful oasis in the heart of the city, with your pets. This pet-friendly park features walking trails, stunning gardens, and a creek where your pets can cool down on hot days."
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

export default SaltLakeCity;
