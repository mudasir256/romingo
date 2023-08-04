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

const Dallas: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Dallas, TX');

  const city = 'Dallas'
  const paragraphOne = 'Known for its warm atmosphere and welcoming culture, Dallas offers a variety of pet-friendly hotels, activities, and restaurants. Many parks and outdoor spaces in the city are pet-friendly and provide ample opportunities for pets to enjoy some playtime.'

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
      <title>Pet Friendly Hotels Dallas, TX | Romingo</title>
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
            Whether you&apos;re exploring the city&apos;s cultural landmarks or simply taking leisurely walks with your pet, pet-friendly travel in Dallas guarantees a fulfilling and inclusive journey for all.
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
            Dallas is a wonderful city to visit because of all of the exciting things you can do. Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy in Dallas.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Dallas</Typography>
          <Text text="Dallas, Texas, is a lively city that loves pets, making it a great destination for pet owners looking to explore the city. Dallas offers a variety of pet-friendly options that ensure a comfortable and inclusive stay for both humans and pets." />          
          <Text text="Here are six pet-friendly hotels in Dallas that provide exceptional amenities and a welcoming environment for you and your pet." />

          <Bold text="The Joule" />
          <SingleLoadListingCard hotelName="The Joule" />
          <Text text="The Joule is an iconic and luxurious hotel located in the heart of downtown Dallas, Texas. With its striking architecture and modern design, The Joule stands as a symbol of sophistication and style. The Joule is home to a variety of dining options where guests can eat delectable food and drink handcrafted cocktails." />
          <Text text="The Joule offers designated pet-friendly rooms, ensuring a comfortable and convenient stay for you and your pet. When you stay at The Joujle, there is a $100 fee that you will have to pay for your pet." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa', 'Car service within three miles of the hotel', 'Rooftop bar', 'Fitness center', 'On-site restaurants and bars']}
          />

          <Bold text="Hotel Crescent Court" />
          <SingleLoadListingCard hotelName="Hotel Crescent Court" />
          <Text text="Hotel Crescent Court is a luxurious and elegant hotel located in the Uptown Dallas district, Texas. With its timeless architecture and refined interiors, this upscale hotel offers a blend of sophistication and comfort. The hotel's lush courtyard and rooftop pool provide serene oases for relaxation and enjoyment." />
          <Text text="There is a $150 pet fee when you stay at Hotel Crescent Court. When your pet arrives at the hotel, they will receive a water bowl, toy, bandana, bags, and a frisbee to enjoy!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa', 'Pool', 'Fitness center', 'Valet service', 'Outdoor pool']}
          />

          <Bold text="The Westin Galleria Dallas" />
          <SingleLoadListingCard hotelName="The Westin Galleria Dallas" />
          <Text text="The Westin Galleria Dallas is a contemporary and upscale hotel located in the vibrant Galleria area of Dallas, Texas. Offering a perfect blend of modern comforts and refined elegance, this hotel is a favorite among both business and leisure travelers." />
          <Text text="The Westin Galleria Dallas is a pet-friendly hotel that welcomes pets of all sizes. The hotel's pet-friendly policy allows you to bring two dogs up to 40 pounds for no extra charge." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop pool', 'Fitness center', 'On-site dining options']}
          />

          <Bold text="Kimpton Pittman Hotel" />
          <SingleLoadListingCard hotelName="Kimpton Pittman" />
          <Text text="Kimpton Pittman Hotel is a chic and trendy boutique hotel located in the heart of Deep Ellum, Dallas, Texas. The Kimpton Pittman Hotel offers a unique experience for guests with nice rooms and suites featuring stylish decor and contemporary amenities. You can enjoy delicious meals and craft cocktails at the hotel's restaurant and bar during your stay." />
          <Text text="As part of the Kimpton Hotels chain, the hotel warmly welcomes pets, providing special amenities and treats for furry companions. Kimpton Pittman Hotel loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. Your pet will receive treats and the hotel offers pet beds and food bowls for your furry friend to enjoy!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Evening social hour', 'Morning coffee and tea service', 'Outdoor pool', 'Yoga mats']}
          />

          <Bold text="The Highland Dallas, Curio Collection by Hilton" />
          <SingleLoadListingCard hotelName="Highland Dallas" />
          <Text text="The Highland Dallas, Curio Collection by Hilton is a boutique hotel nestled in the upscale Knox-Henderson neighborhood of Dallas, Texas. Guests can indulge in a range of dining options, from fine dining to casual bistro fare, complemented by impeccable service. The hotel's rooftop pool offers stunning city views, while the fitness center allows guests to maintain their wellness routines." />
          <Text text="The hotel provides designated pet-friendly rooms and a pet-friendly patio, ensuring an enjoyable stay for your furry companion. Two pets that weigh up to 80 pounds are allowed with a fee of $75 per stay, per pet." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Infinity pool', 'Spa', 'Fitness center', 'Dining options']}
          />

          <Bold text="The Ritz-Carlton, Dallas" />
          <SingleLoadListingCard hotelName="Ritz-Carlton" />
          <Text text="For those seeking a luxurious pet-friendly experience, The Ritz-Carlton, Dallas is an excellent choice. The hotel boasts an array of fine dining options, offering delectable culinary experiences to tantalize the taste buds. During your stay, you can relax at the hotel's spa and fitness center or enjoy a swim in the rooftop pool." />
          <Text text="This hotel warmly welcomes pets and provides a range of amenities for them, including plush pet beds and gourmet pet menus. All dogs can stay at The Ritz-Carlton, Dallas and there is a fee of $150 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa', 'Outdoor pool', 'On-site bar options', 'On-site dining options']}
          />
          <Text text="Dallas offers an array of pet-friendly hotels that cater to the needs of both you and your furry friend. These pet-friendly hotels in Dallas guarantee a fantastic trip with your pet. Pack your bags, leash up your pet, and embark on a paw-some adventure in the pet-friendly city of Dallas." />


          <Typography variant="h2">The Top Pet-Friendly Activities in Dallas</Typography>
          <Text text="From scenic parks to pet-friendly patios and unique attractions, Dallas is a great city to visit with your pet. These are ten of the best pet-friendly activities in Dallas that will guarantee a wonderful trip with your furry friend." />

          <LinkContent
            link="https://www.dallasparks.org/Facilities/Facility/Details/Mockingbird-Point-Dog-Park-358"
            linkText="White Rock Lake Dog Park"
            text="Located on the shores of White Rock Lake, this dog park offers plenty of space for dogs to run and play. The park features separate areas for large and small dogs, ensuring a safe and enjoyable experience for all pups."
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

export default Dallas;
