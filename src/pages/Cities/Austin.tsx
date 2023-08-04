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

const Austin: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Austin, TX');

  const paragraphOne = "Pet-friendly travel in Austin, Texas, is a delightful experience for both humans and their furry companions. Austin warmly welcomes pets at various establishments, making it an inclusive destination for pet owners."

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
      <title>Pet Friendly Hotels Austin, TX | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels Austin, TX | Romingo`}
      />
      <meta property='og:description' content={paragraphOne} />
      <meta property='og:image' content={cityContent.heroImage} />
    </Helmet>

    <ScrollToTop />
    <Navbar />
    <Box
      component="img"
      src={cityContent.heroImage}
      alt={"Austin"}
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
          Pet Friendly Hotels Austin
        </Typography>
      </Box>
      <Divider variant="middle" light sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          TEXAS
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
            sx={{ textAlign: "justify", lineHeight: 2, my: '1rem' }}
          >
            With numerous pet-friendly parks, hiking trails, and outdoor spaces, Austin is the ideal city to travel to with your pet. You can enjoy restaurants, cafes, and breweries in Austin that have pet-friendly patios and dining options. Additionally, there are several pet-friendly hotels that cater to the needs of both you and your beloved pets.
          </Typography>
 
        </Grid>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK YOUR GETAWAY!
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
            From exploring the vibrant music scene to experiencing the city&apos;s unique culture, you will have an amazing time in Austin. Here are some of our favorite pet-friendly hotels, activities, and restaurants to see in Austin, Texas.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src="https://storage.googleapis.com/romingo-development-public/images/front-end/sd-4.jpeg"
            alt={"Sunny San Diego"}
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
          <Typography component="h2" variant="h2">The Top Pet-Friendly Accommodations in Austin</Typography>
          <Text text="Austin, Texas, is a city known for its welcoming and pet-friendly culture. Here are Austin's finest pet-friendly hotels, all the way from luxurious hotel chains to charming boutique properties." />
          
          <Bold text="Aloft Austin Downtown" />
          <Text text="Aloft Austin Downtown is a modern and pet-friendly hotel that offers a vibrant and playful atmosphere. The hotel is near the 6th Street Entertainment District, which has the area's best shopping, dining, and entertainment. The University of Texas at Austin and Zilker Metropolitan Park are also nearby. With its trendy design and rooftop pool, Aloft Austin Downtown promises an enjoyable stay for both human and furry guests." />
          <Text text="The hotel's pet-friendly policy allows two dogs weighing up to 40 pounds to stay with their owners. There is no pet fee for their stay and your pets will receive a dog bed, bowl, treats, and toys." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site coffee shop', 'Rooftop dining and drinking options', 'Fitness center', 'Dining options']}
          />

          <Bold text="Kimpton Hotel Van Zandt" />
          <Text text="A sister property to Hotel Van Zandt, Kimpton Hotel Van Zandt is a top pet-friendly hotel in Austin. Named after the legendary Texas musician Townes Van Zandt, this hotel celebrates the city's vibrant music scene and arts culture. The rooftop pool and pet-friendly patio offer a relaxing spot for guests to unwind with their pets." />
          <Text text="This boutique hotel embraces Kimpton's &quot;Pet-Friendly&quot; ethos, allowing pets to stay with their owners at no extra charge. When you check in, your pet will receive treats, food, water bowls, and a comfy bed to enjoy during their stay!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Live music', 'Rooftop pool with cabanas', 'Fitness center', 'Dining options']}
          />

          <Bold text="Archer Hotel Austin" />
          <Text text="Archer Hotel Austin is a chic and pet-friendly hotel that welcomes pets of all shapes and sizes. The hotel is in the Domain Northside and is steps from the Rock Rose Entertainment District. Archer Hotel Austin is walking distance from many popular attractions, including pet-friendly parks and walking areas." />
          <Text text="This hotel is pet-friendly and allows you to bring one dog that is up to 50 pounds. There is a pet cleaning fee of $150 per stay that you will pay when staying at Archer Hotel Austin. Your pet will receive water and food bowls, biscuits, bandanas, a &quot;Dog in Room&quot; sign, waste bags, and a doggy bed." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Pool patio', 'Hotel bar', 'Dining options']}
          />

          <Bold text="Hyatt House Austin Downtown" />
          <Text text="Hyatt House Austin Downtown is a stylish and modern hotel located in the heart of Austin, Texas. This hotel is in a prime location and is close to the city's popular attractions, dining, and entertainment venues. Take advantage of the hotel's convenient location to explore nearby parks and pet-friendly attractions with your furry companion." />
          <Text text="Nestled in the heart of downtown, Hyatt House Austin Downtown offers spacious, pet-friendly suites with separate living and sleeping areas. Dogs are welcome to join you if they are under 50 pounds (under 75 pounds with two dogs). There is a fee of $75/day for stays up to 6 nights and there is an additional $100 fee if you stay 7-30 nights." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pool', 'Fitness center', 'Business center', 'Daily breakfast']}
          />

          <Bold text="The Driskill" />
          <Text text="The Driskill Hotel is an iconic and historic landmark located in the heart of downtown Austin, Texas. Established in 1886, this grand hotel exudes timeless elegance and charm, offering a blend of classic architecture with modern amenities. The Driskill is renowned for its luxurious accommodations, impeccable service, and its rich history as one of Austin's oldest hotels." />
          <Text text="The Driskill Hotel's central location allows for easy access to Austin's vibrant entertainment, shopping, and dining scenes. This is an ideal choice for travelers seeking a luxurious and immersive experience in the heart of the city." />
          <Text text="The hotel offers a pet policy that allows dogs weighing up to 75 pounds to stay with their owners. There is a $100 fee for your pets when your bring them to The Driskill Hotel." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa services', 'Fitness center', 'Same-day laundry and dry cleaning services']}
          />

          <Bold text="Omni Austin Hotel Downtown" />
          <Text text="The Omni Austin Hotel Downtown welcomes pets with open arms, making it a popular choice for pet owners. This hotel offers stunning views of the city and is close to Austin's popular attractions, live music venues, and cultural landmarks. Guests can enjoy luxurious amenities, including a rooftop pool, fitness center, and multiple dining options." />
          <Text text="The hotel's pet-friendly policy allows two dogs weighing up to 25 pounds each to stay with their owners. There is a cleaning fee of $125.00 for cleaning services." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free breakfast', 'All day snacks', 'Free wine, beer and spirits during happy hour', 'Fitness center', 'Dining options']}
          />

          <Typography component="h2" variant="h2">The Top Pet-Friendly Activities in Austin</Typography>
          <Text text="Austin, Texas, is a very pet-friendly city and has many activities for you and your four-legged friend to enjoy. From scenic parks to pet-friendly restaurants, Austin promises a delightful experience for both you and your furry companion." />
          <Text text="Here are the best pet-friendly activities in Austin for you and your pet to enjoy." />

          <LinkContent
            link="https://www.austintexas.gov/department/zilker-metropolitan-park"
            linkText="Zilker Metropolitan Park"
            text="Zilker Park is a pet-friendly oasis, offering 350 acres of open space for you and your furry friend to explore. Enjoy a hike, have a picnic by the lake, or let your dog play off-leash in the dog park."
          />



        </Box>


        
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK YOUR GETAWAY!
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

export default Austin;
