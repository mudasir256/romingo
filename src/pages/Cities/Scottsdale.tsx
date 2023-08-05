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

const Scottsdale: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Scottsdale, AZ');

  const city = 'Scottsdale'
  const paragraphOne = 'Pet-friendly travel in Scottsdale, Arizona, is an absolute joy for both you and your four-legged companion. Scottsdale prides itself on being a pet-friendly destination, offering a wide range of activities and accommodations that cater to pets.'

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
      <title>Pet Friendly Hotels Scottsdale, AZ | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, AZ | Romingo`}
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
          ARIZONA
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
            From spacious parks and hiking trails to pet-friendly restaurants and hotels, there are plenty of options for your furry friend to explore and enjoy. Many parks, such as Chaparral Park and Horizon Park, provide designated off-leash areas where your pet can romp and socialize with other dogs. Scottsdale&apos;s picturesque desert landscape offers numerous hiking trails, allowing you and your pet to venture out together and enjoy the breathtaking scenery.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            When it comes to dining, numerous restaurants with outdoor patios welcome pets, ensuring that you can savor delicious meals without leaving your furry companion behind. Additionally, many hotels and vacation rentals in Scottsdale are pet-friendly, offering a comfortable and welcoming stay for you and your pet.
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
            With a plethora of pet-friendly options and a warm and inviting atmosphere, Scottsdale is the perfect destination for a pet-friendly vacation where you can create lasting memories with your beloved furry friend.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Scottsdale</Typography>

          <Bold text="The Westin Kierland Resort & Spa" />
          <Text text="The Westin Kierland Resort & Spa is a luxurious oasis nestled amidst the captivating landscapes of Scottsdale, Arizona. Offering a seamless blend of contemporary elegance and Southwest charm, this resort provides a truly memorable and rejuvenating experience for its guests." />
          <Text text="With its breathtaking desert surroundings, outstanding facilities, and warm hospitality, The Westin Kierland Resort & Spa provides a tranquil escape for guests seeking a remarkable and unforgettable stay in Scottsdale." />
          <Text text="The Westin Kierland Resort & Spa is pet-friendly and allows you to bring two pets up to 40 pounds for no additional fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Championship golf course', 'Outdoor pools with lazy rivers', 'Full-service spa', 'On-site dining options']}
          />

          <Bold text="Hotel Valley Ho" />
          <Text text="Hotel Valley Ho is a timeless and iconic boutique hotel nestled in the heart of Old Town Scottsdale, Arizona. Built in 1956, this mid-century modern gem has been meticulously restored to its original glory, exuding retro-chic elegance and contemporary comforts." />
          <Text text="The hotel boasts a vibrant and lively ambiance, with its chic pool area being a hotspot for both guests and locals alike. With two fantastic restaurants and a trendy rooftop lounge, Hotel Valley Ho offers a delightful culinary experience, complemented by a welcoming and attentive staff." />
          <Text text="When you stay at Hotel Valley Ho, your pets stay for free, but are subject to additional fees should any damages occur during your stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Pool', 'Multiple on-site dining options', 'Fitness center', 'Business center']}
          />

          <Bold text="Hyatt Regency Scottsdale Resort & Spa at Gainey Ranch" />
          <Text text="Nestled in the picturesque Gainey Ranch area of Scottsdale, Arizona, the Hyatt Regency Scottsdale Resort & Spa at Gainey Ranch is a lavish retreat that promises an unparalleled experience for travelers seeking the perfect blend of luxury and tranquility. Surrounded by lush greenery and serene water features, this resort offers a serene ambiance that allows guests to unwind and rejuvenate." />
          <Text text="The guest rooms and suites are elegantly designed, providing a comfortable and stylish sanctuary after a day of exploration. Culinary delights await at the resort's restaurants, each offering a unique dining experience that caters to various tastes." />
          <Text text="Dogs are welcome with open arms at the Hyatt Regency Scottsdale Resort & Spa at Gainey Ranch. Upon arrival, they will receive goodies, such as toys, bags, a bed, and bowls. There is a $150 fee per stay for up to 6 nights and an additional $150 fee if you stay between 7 and 30 days." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Championship golf course', 'Multiple outdoor pools with a 30-foot waterslide', 'World-class spa', 'On-site dining options', 'Fitness center', 'Bike rentals', 'Electric car charging station']}
          />

          <Bold text="Mountain Shadows Resort Scottsdale" />
          <Text text="Nestled against the majestic Camelback Mountain, Mountain Shadows Resort in Scottsdale, Arizona, is a modern oasis that offers a luxurious and serene escape. With its breathtaking views of the surrounding desert landscape, the resort seamlessly blends contemporary design with mid-century modern aesthetics." />
          <Text text="Culinary enthusiasts will delight in the resort's exceptional dining options, including Hearth '61, offering contemporary American cuisine, and Rusty's, a poolside eatery. Whether seeking a romantic getaway or a family retreat, Mountain Shadows Resort Scottsdale offers a memorable and sophisticated stay." />
          <Text text="Mountain Shadows Resort is pet-friendly. Your pet will receive a pet amenity package when they arrive that includes a bed, food and water bowls, water, and doggie bags." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Championship golf course', 'Outdoor pool with cabanas', 'Fitness center', 'Spa services', 'On-site dining options']}
          />

          <Bold text="The Phoenician, a Luxury Collection Resort" />
          <Text text="The Phoenician, a Luxury Collection Resort, is a true oasis of luxury and elegance set against the breathtaking backdrop of Camelback Mountain in Scottsdale, Arizona. With its exquisite architecture and lush landscapes, the resort exudes a sense of grandeur and sophistication." />
          <Text text="The resort boasts a myriad of world-class amenities, including nine swimming pools, a championship golf course, and a state-of-the-art spa, providing guests with endless opportunities for relaxation and indulgence. The Phoenician, a Luxury Collection Resort, promises an unforgettable and indulgent experience for guests seeking a refined and sophisticated escape in the heart of the Sonoran Desert." />
          <Text text="Two dogs that weigh less than 40 pounds are welcome to travel with you to The Phoenician for a fee of $150 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Nine swimming pools', 'State-of-the-art spa', 'On-site dining opitons', 'Afternoon tea']}
          />


          <Bold text="The Scottsdale Resort at McCormick Ranch" />
          <Text text="The Scottsdale Resort at McCormick Ranch is a captivating retreat that captures the essence of the Sonoran Desert while providing a luxurious and tranquil escape. Set amidst 200 acres of lush greenery and shimmering lakes in Scottsdale, Arizona, the resort offers a serene and picturesque ambiance." />
          <Text text="The resort features a range of amenities, including two outdoor pools, a full-service spa, and a fitness center, ensuring guests have ample opportunities for relaxation and recreation. For dining, the resort offers an array of culinary delights, including farm-to-table cuisine and Southwestern-inspired dishes." />
          <Text text="The Scottsdale Resort at McCormick Ranch allows you to bring up to two dogs with a combined weight of 50 pounds for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Two outdoor pools', 'Full-service spa', 'Fitness center', 'On-site dining options with farm-to-table cuisine']}
          />



          <Typography variant="h2">The Top Pet-Friendly Activities in Scottsdale</Typography>
          
          <LinkContent
            link="https://www.scottsdaleaz.gov/parks/dog-parks"
            linkText="Chaparral Dog Park"
            text="Let your dog roam freely in this spacious and well-maintained off-leash dog park. With separate areas for small and large dogs, it's an ideal spot for your furry companion to socialize and play."
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

export default Scottsdale;
