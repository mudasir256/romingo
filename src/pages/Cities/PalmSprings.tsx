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

const PalmSprings: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Palm Springs, CA');

  const city = 'Palm Springs'
  const paragraphOne = "Palm Springs, a desert oasis renowned for its stunning landscapes and luxurious resorts, welcomes travelers and their pets with welcome arms. From hiking trails to pet-friendly restaurants, there are tons of opportunities to explore Palm Springs with your four-legged friends."

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
      <title>Pet Friendly Hotels Palm Springs, CA | Romingo</title>
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
            We&apos;ve compiled our favorite hotels, activities, and restaurants for you to explore in Palm Springs with your pet. Pack your bags, grab your pet's leash, and get ready for an amazing journey of relaxation and exploration in Palm Springs.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Palm Springs</Typography>
          <Text text="Palm Springs, with its breathtaking landscapes and year-round sunshine, is a dream destination for travelers seeking a relaxing getaway. Let's explore six of the best pet-friendly hotels in Palm Springs that will leave you with lifelong memories." />

    
          <Bold text="The Westin Mission Hills Golf Resort & Spa" />
          <SingleLoadListingCard hotelName="The Westin Mission Hills Golf Resort & Spa" />
          <Text text="The Westin Mission Hills Golf Resort & Spa is a picturesque retreat nestled amidst the stunning landscapes of Palm Springs, California. This elegant resort offers a seamless blend of modern comforts and the serene beauty of the desert surroundings. The resort's extensive spa facilities invite guests to unwind and rejuvenate with a variety of treatments and therapies." />
          <Text text="The Westin Mission Hills Golf Resort & Spa pampers pets with pet beds, food and water bowls, and special treats. The resort also features expansive grounds, perfect for leisurely strolls with your pets. With two championship golf courses and a luxurious spa, it's an ideal spot for both relaxation and recreation. The hotel allows you to bring up to two dogs that weigh less than 50 pounds." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pools with waterslide', 'Pool bar', 'On-site dining options', 'On-site putting green']}
          />

          <Bold text="Kimpton Rowan Palm Springs" />
          <SingleLoadListingCard hotelName="Kimpton Rowan Palm Springs" />
          <Text text="Find respite in the sophistication at Kimpton Rowan Palm Springs, a pet-friendly haven. This refined hotel caters to the needs of travelers and their pets, ensuring an indelible and enjoyable stay for all." />
          <Text text="Positioned ideally, Kimpton Rowan Palm Springs offers seamless access to Palm Springs' top attractions. The hotel also has a pet-friendly park that your furry companion can enjoy during your stay." />
          <Text text="As part of the Kimpton Hotels chain, the hotel warmly welcomes pets, providing special amenities and treats for furry companions. Kimpton Pittman Hotel loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop pool with expansive views', 'On-site dining options', 'On-site bars', 'Sunrise cofee service', 'Hosted evening social hour', 'Yoga mats', 'In-room spa services']}
          />


          <Bold text="Ace Hotel & Swim Club" />
          <SingleLoadListingCard hotelName="Ace Hotel & Swim Club" />
          <Text text="Ace Hotel & Swim Club Palm Springs is in a converted 1960s desert motel and showcases a retro-chic ambiance. The hotel features beautifully designed rooms, ranging from cozy studios to spacious suites." />
          <Text text="When traveling to this hotel, you are allowed to bring one dog that weighs up to 25 pounds with a fee of $25 per night; if you bring two dogs, the fee is $35 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pools', 'On-site events', 'Spa services', 'On-site dining options', 'Fitness center']}
          />

          <Bold text="Ingleside Inn Palm Springs" />
          <SingleLoadListingCard hotelName="Ingleside Inn Palm Springs" />
          <Text text="Ingleside Inn Palm Springs is a delightful pet-friendly hotel that exudes an elegant ambiance and boasts a prime location. Luxurious rooms are well-designed, ensuring a comfortable and pampering retreat for both you and your furry companion." />
          <Text text="This hotel welcomes up to two dogs weighing up to 25 lbs for a fee of $100 per pet, per stay. Please bear in mind that feline friends will have to sit this one out. As an added bonus, a dog park is close to the hotel so your dog can mingle with other pets." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining', 'Multiple outdoor pools', 'Fitness center', 'Courtyard with hammocks and fire pits', 'Hot tub', 'Spa services']}
          />

          <Bold text="Hyatt Palm Springs" />
          <SingleLoadListingCard hotelName="Hyatt Palm Springs" />
          <Text text="Situated in the heart of downtown Palm Springs, the Hyatt Palm Springs is a convenient and pet-friendly hotel. Guests can easily explore the city's vibrant cultural scene, boutique shops, and diverse dining options. At the hotel, guests can relax by the outdoor heated pool, enjoy a dip in the hot tub, or explore the fitness center." />
          <Text text="Hyatt Palm Springs welcomes dogs of all sizes, making it an excellent choice for families with large dogs. If you do travel with your dogs to this hotel, there is a $50 fee per pet, per stay. The hotel's central location allows for easy access to pet-friendly restaurants and shops in the area." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining', 'Fitness center', 'Pool']}
          />

          <Bold text="The Saguaro Palm Springs" />
          <SingleLoadListingCard hotelName="The Saguaro Palm Springs" />
          <Text text="The Saguaro Palm Springs is a pet-friendly and stylish hotel that is in downtown Palm Springs. This hotel is in the heart of Palm Springs and has a rainbow-colored exterior and exciting atmosphere. The hotel has a large pool area where guests can enjoy the sun, lounge on daybeds, and enjoy cocktails from the bar. The Saguaro's restaurant, El Jefe, serves up delicious tacos, margaritas, and other flavorful dishes that perfectly complement the hotel's festive ambiance." />
          <Text text="The Saguaro Palm Springs allows you to bring your pets for a $50 fee. They kindly ask that you inform the front desk ahead of your arrival if you do plan on bringing your pets." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pool with cabanas', 'Spa services', 'Fitness center', 'Weekend yoga', 'Desert cruiser bikes', 'On-site dining options']}
          />
    
          <Text text="With desert landscapes, pet-friendly hiking trails, and activities for everyone, Palm Springs is a great destination for a vacation." />

          <Typography variant="h2">The Top Pet-Friendly Activities in Palm Springs</Typography>
          <Text text="From outdoor adventures to pet-friendly dining, Palm Springs has many activities that will keep both you and your pets entertained. Here are ten of the best pet-friendly activities in Palm Springs:" />

          <LinkContent
            link="https://www.palmspringsca.gov/government/departments/parks-recreation/parks-facilities/dog-park"
            linkText="Palm Springs Dog Park"
            text="Start your pet-friendly adventure with a visit to Palm Springs Dog Park. This off-leash park features separate areas for large and small dogs, allowing your pets to socialize and play freely. The park has water fountains and shade structures so that your pet stays cool and comfortable while playing with their friends."
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

export default PalmSprings;
