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
