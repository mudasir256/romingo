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

const SanAntonio: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'San Antonio, TX');

  const city = 'San Antonio'
  const paragraphOne = 'San Antonio is a wonderful destination for pet-friendly travel and has many activities and hotels that cater to furry friends. Many parks and outdoor spaces allow leashed pets, providing ample opportunities for leisurely strolls and bonding time. Additionally, several restaurants and cafes offer pet-friendly patios, so you can enjoy a meal or a cup of coffee together.'

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
      <title>Pet Friendly Hotels San Antonio, TX | Romingo</title>
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
            From exploring historical sites to enjoying the city&apos;s vibrant atmosphere, pet-friendly travel in San Antonio is a delightful experience that allows you to create lasting memories with your four-legged companion.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in San Antonio</Typography>

          <Bold text="Sheraton Gunter Hotel" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Sheraton Gunter Hotel in San Antonio is a historic gem that exudes timeless elegance and modern comforts. Located in the heart of downtown, this iconic hotel has been a fixture in the city since 1909, offering a seamless blend of rich history and contemporary amenities. As soon as guests step into the lobby, they are greeted with a sense of grandeur, adorned with stunning chandeliers and polished marble floors." />
          <Text text="The guest rooms and suites are tastefully appointed, providing a luxurious retreat after a day of exploring the city's attractions. The hotel also features a rooftop pool and fitness center, allowing guests to unwind and stay active during their stay." />
          <Text text="For a fee of $60 per stay, you can bring along two pets weighing up to 50 lbs. This iconic hotel seamlessly blends modern amenities with classic decor, providing a luxurious retreat for both you and your furry friends." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness Center', 'Convenient location', 'On-site dining options']}
          />

          <Bold text="Hyatt Regency Hill Country Resort and Spa" />
          <SingleLoadListingCard hotelName="" />
          <Text text="The Hyatt Regency Hill Country Resort and Spa is a luxurious oasis nestled amidst the picturesque landscapes of San Antonio, Texas. Situated on 300 acres of stunning Hill Country terrain, this resort offers a serene retreat with a perfect blend of upscale amenities and natural beauty." />
          <Text text="Golf enthusiasts can tee off on the 27-hole championship golf course, while nature lovers can explore the walking and biking trails that wind through the property. The resort's Windflower - The Hill Country Spa provides a tranquil escape, offering a range of rejuvenating treatments to pamper and revitalize guests." />
          <Text text="This beautiful, pet-friendly resort is not only perfect for human guests but also goes the extra mile to accommodate their furry companions. With its spacious grounds and walking trails, your pet will have plenty of opportunities to stretch their legs and enjoy the fresh air." />
          <Text text="When traveling to Hyatt Regency Hill Country Resort and Spa, you can bring two dogs that weigh 50 pounds and under. There is also a $100 pet fee per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['300 acres of historic ranch land', '5-acre water park with a lazy river', 'Multiple pools and a waterslide', 'Walking trails', 'Campfires', 'Movies on the lawn']}
          />

          <Bold text="Thompson San Antonio Hotel Contessa Riverwalk" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Experience the luxury and sophistication of Thompson San Antonio Hotel Contessa Riverwalk, a pet-friendly hotel catering to both business and leisure travelers. Their pet fee is $125 per stay per pet with a weight limit of 40 pounds." />
          <Text text="Guests with pets are only available on set floors and select room types based on availability – so call them early if you are traveling with a pet. This upscale hotel offers elegant accommodations, stunning views of the Riverwalk, and a range of amenities to enhance your stay." />
          <Text text="San Antonio warmly embraces pets, offering a variety of pet-friendly hotels that provide comfortable accommodations and exceptional service. Whether you seek affordability, modern comfort, or upscale luxury, there's a pet-friendly option to suit your preferences. Explore the city's rich history, vibrant culture, and warm hospitality with your beloved pets by your side." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Pool', 'Fitness Center', 'On-site dining options']}
          />

          <Bold text="Aloft San Antonio Northwest" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Aloft San Antonio Northwest is a trendy and modern hotel that offers a vibrant and youthful atmosphere in the heart of San Antonio, Texas. With its bold and contemporary design, the hotel appeals to young travelers and those seeking a fresh and energetic stay. The hotel's W XYZ Bar is a lively hotspot where guests can enjoy signature cocktails and mingle with fellow travelers. Additionally, the gym allows fitness enthusiasts to stay active during their stay." />
          <Text text="Experience contemporary comfort at Aloft San Antonio Northwest, a pet-friendly hotel that welcomes two pets weighing up to 40 pounds for no additional fee." />
          <Text text="Whether you're visiting for business or leisure, Aloft San Antonio Northwest offers a welcoming and pet-friendly environment for you and your furry companions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site bar', 'On-site dining options']}
          />

          <Bold Text="La Quinta Inn & Suites by Wyndham San Antonio Riverwalk" />
          <SingleLoadListingCard hotelName="" />
          <Text text="La Quinta Inn & Suites by Wyndham San Antonio Riverwalk is a fantastic choice for travelers seeking comfortable accommodations in the heart of San Antonio. Located just steps away from the famous River Walk, this hotel offers convenience and easy access to the city's most popular attractions." />
          <Text text="Known for its pet-friendly policy, La Quinta Inn & Suites provides a comfortable stay without breaking the bank. Conveniently located near downtown attractions, this hotel ensures easy access to pet-friendly spots in the city." />
          <Text text="This hotel welcomes up to two pets per stay of any size for a fee of $25 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Outdoor pool', 'Lounge', 'Business center']}
          />

          <Bold text="Home2 Suites by Hilton San Antonio Downtown" />
          <SingleLoadListingCard hotelName="" />
          <Text text="Home2 Suites by Hilton San Antonio Downtown is a contemporary and inviting hotel that offers a comfortable and convenient stay in the heart of downtown San Antonio. With its modern design and spacious suites, this hotel caters to both short-term and extended-stay guests, providing all the comforts of home." />
          <Text text="Each suite features a well-equipped kitchenette, making it easy for guests to prepare their meals and enjoy a sense of independence during their stay. The hotel offers complimentary breakfast, ensuring a great start to each day. The indoor pool and fitness center are ideal for relaxation and staying active while on the road." />
          <Text text="You're welcome to bring up to two pets that weigh less than 80 pounds to this hotel. There is an additional fee of $75 per pet, per stay at this hotel." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free daily breakfast', 'Free WiFi', 'Outdoor pool', 'Fitness center']}
          />



          <Typography variant="h2">The Top Pet-Friendly Activities in San Antonio</Typography>
          <Text text="San Antonio River Walk: The iconic River Walk welcomes leashed pets, making it the perfect place for a leisurely stroll. Enjoy the beautiful sights, vibrant atmosphere, and numerous pet-friendly cafes along the way." />
          <Text text="Brackenridge Park: This sprawling urban park offers plenty of green space for your furry friend to romp around. Enjoy a picnic, play fetch, or take a serene walk along the park's trails." />

          <LinkContent
            link="https://www.sanantonio.gov/ParksAndRec/Parks-Facilities/All-Parks-Facilities/Parks-Facilities-Details/ArtMID/14820/ArticleID/2578/McAllister-Park"
            linkText="McAllister Park"
            text="For an active day, head to the dog park at McAllister Park. Your pup can run off-leash and socialize with other furry friends in a secure environment."
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

export default SanAntonio;
