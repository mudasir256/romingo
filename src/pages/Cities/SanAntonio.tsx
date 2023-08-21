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

const searchData = {
  "city": {
    "description": "San Antonio, TX, USA",
    "matched_substrings": [
        {
            "length": 11,
            "offset": 0
        }
    ],
    "place_id": "ChIJrw7QBK9YXIYRvBagEDvhVgg",
    "reference": "ChIJrw7QBK9YXIYRvBagEDvhVgg",
    "structured_formatting": {
        "main_text": "San Antonio",
        "main_text_matched_substrings": [
            {
                "length": 11,
                "offset": 0
            }
        ],
        "secondary_text": "TX, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "San Antonio"
        },
        {
            "offset": 13,
            "value": "TX"
        },
        {
            "offset": 17,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 29.4251905,
"lng": -98.4945922
}

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
          <Hidden mdDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar city={searchData} />
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
          <SingleLoadListingCard hotelName="100219412" />
          <Text text="The Sheraton Gunter Hotel in San Antonio is a historic gem that exudes timeless elegance and modern comforts. Located in the heart of downtown, this iconic hotel has been a fixture in the city since 1909, offering a seamless blend of rich history and contemporary amenities. As soon as guests step into the lobby, they are greeted with a sense of grandeur, adorned with stunning chandeliers and polished marble floors." />
          <Text text="The guest rooms and suites are tastefully appointed, providing a luxurious retreat after a day of exploring the city's attractions. The hotel also features a rooftop pool and fitness center, allowing guests to unwind and stay active during their stay." />
          <Text text="For a fee of $60 per stay, you can bring along two pets weighing up to 50 lbs. This iconic hotel seamlessly blends modern amenities with classic decor, providing a luxurious retreat for both you and your furry friends." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness Center', 'Convenient location', 'On-site dining options']}
          />

          <Bold text="Hyatt Regency Hill Country Resort and Spa" />
           <SingleLoadListingCard hotelName="100211814" /> 
          <Text text="The Hyatt Regency Hill Country Resort and Spa is a luxurious oasis nestled amidst the picturesque landscapes of San Antonio, Texas. Situated on 300 acres of stunning Hill Country terrain, this resort offers a serene retreat with a perfect blend of upscale amenities and natural beauty." />
          <Text text="Golf enthusiasts can tee off on the 27-hole championship golf course, while nature lovers can explore the walking and biking trails that wind through the property. The resort's Windflower - The Hill Country Spa provides a tranquil escape, offering a range of rejuvenating treatments to pamper and revitalize guests." />
          <Text text="This beautiful, pet-friendly resort is not only perfect for human guests but also goes the extra mile to accommodate their furry companions. With its spacious grounds and walking trails, your pet will have plenty of opportunities to stretch their legs and enjoy the fresh air." />
          <Text text="When traveling to Hyatt Regency Hill Country Resort and Spa, you can bring two dogs that weigh 50 pounds and under. There is also a $100 pet fee per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['300 acres of historic ranch land', '5-acre water park with a lazy river', 'Multiple pools and a waterslide', 'Walking trails', 'Campfires', 'Movies on the lawn']}
          />

          <Bold text="Thompson San Antonio Hotel Contessa Riverwalk" />
          <SingleLoadListingCard hotelName="100410224" />
          <Text text="Experience the luxury and sophistication of Thompson San Antonio Hotel Contessa Riverwalk, a pet-friendly hotel catering to both business and leisure travelers. Their pet fee is $125 per stay per pet with a weight limit of 40 pounds." />
          <Text text="Guests with pets are only available on set floors and select room types based on availability – so call them early if you are traveling with a pet. This upscale hotel offers elegant accommodations, stunning views of the Riverwalk, and a range of amenities to enhance your stay." />
          <Text text="San Antonio warmly embraces pets, offering a variety of pet-friendly hotels that provide comfortable accommodations and exceptional service. Whether you seek affordability, modern comfort, or upscale luxury, there's a pet-friendly option to suit your preferences. Explore the city's rich history, vibrant culture, and warm hospitality with your beloved pets by your side." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Pool', 'Fitness Center', 'On-site dining options']}
          />

          <Bold text="Aloft San Antonio Northwest" />
          <SingleLoadListingCard hotelName="102262683" />
          <Text text="Aloft San Antonio Northwest is a trendy and modern hotel that offers a vibrant and youthful atmosphere in the heart of San Antonio, Texas. With its bold and contemporary design, the hotel appeals to young travelers and those seeking a fresh and energetic stay. The hotel's W XYZ Bar is a lively hotspot where guests can enjoy signature cocktails and mingle with fellow travelers. Additionally, the gym allows fitness enthusiasts to stay active during their stay." />
          <Text text="Experience contemporary comfort at Aloft San Antonio Northwest, a pet-friendly hotel that welcomes two pets weighing up to 40 pounds for no additional fee." />
          <Text text="Whether you're visiting for business or leisure, Aloft San Antonio Northwest offers a welcoming and pet-friendly environment for you and your furry companions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site bar', 'On-site dining options']}
          />

          <Bold Text="La Quinta Inn & Suites by Wyndham San Antonio Riverwalk" />
          <SingleLoadListingCard hotelName="100437618" /> 
          <Text text="La Quinta Inn & Suites by Wyndham San Antonio Riverwalk is a fantastic choice for travelers seeking comfortable accommodations in the heart of San Antonio. Located just steps away from the famous River Walk, this hotel offers convenience and easy access to the city's most popular attractions." />
          <Text text="Known for its pet-friendly policy, La Quinta Inn & Suites provides a comfortable stay without breaking the bank. Conveniently located near downtown attractions, this hotel ensures easy access to pet-friendly spots in the city." />
          <Text text="This hotel welcomes up to two pets per stay of any size for a fee of $25 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Outdoor pool', 'Lounge', 'Business center']}
          />

          <Bold text="Home2 Suites by Hilton San Antonio Downtown" />
          <SingleLoadListingCard hotelName="100082108" />
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
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image12.png" text="McAllister Park" />

          <LinkContent
            link="https://www.nps.gov/saan/index.htm"
            linkText="San Antonio Missions National Historical Park"
            text="Bring your pets to the San Antonio Missions National Historical Park so that they can explore the land and the trails. It's a great way to immerse yourself in San Antonio's rich history."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image21.png" text="National Park Service" />

          <LinkContent
            link="https://atpearl.com/"
            linkText="The Pearl District"
            text="This neighborhood hosts a weekly farmer's market and many outdoor events, and it is a fun and pet-friendly spot for you and your furry companion to enjoy."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image16.png" text="The Pearl District" />

          <LinkContent
            link="https://www.philhardbergerpark.org/"
            linkText="Phil Hardberger Park"
            text="This well-maintained park has areas for large and small dogs to play off-leash, as well as several trails to explore."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image5.png" text="Phil Hardberger Park" />

          <LinkContent
            link="https://www.quarrymarket.com/"
            linkText="Alamo Quarry Market"
            text="Many shops in this retail complex are pet-friendly, and some even provide water bowls and treats for your furry friend. Enjoy some retail therapy with your pet by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image5.png" text="Alamo Quarry Market" />

          <LinkContent
            link="https://www.thealamo.org/"
            linkText="The Alamo"
            text="While pets are not allowed inside the historic site, you can take turns with a friend or family member to explore this iconic landmark while the other looks after your pet outside."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image8.png" text="The Alamo" />

          <LinkContent
            link="https://www.theshopsatlacantera.com/en.html"
            linkText="Shops at La Cantera"
            text="This outdoor shopping center allows leashed pets in common areas, and some stores even welcome pets inside. Take your pet for a walk while you browse the shops."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image15.png" text="Shops at La Cantera" />

          <LinkContent
            link="https://www.sabot.org/"
            linkText="San Antonio Botanical Garden"
            text="The botanical garden has pet-friendly days when pets are allowed to explore the gardens with their owners. You will have a wonderful experience exploring the beautiful gardens with your furry friend!"
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image23.png" text="San Antonio Botanical Garden" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in San Antonio</Typography>
          <Text text="San Antonio, with its thriving food scene and warm hospitality, is a city that embraces its four-legged residents and visitors alike. If you're a pet owner looking to enjoy a delicious meal without leaving your furry friend behind, you're in luck! San Antonio boasts a variety of pet-friendly restaurants that welcome pets on their outdoor patios. Here are ten top-notch eateries where you can indulge in delectable dishes while your beloved pet lounges nearby:" />

          <LinkContent
            link="https://thefriendlyspot.com/"
            linkText="The Friendly Spot Ice House"
            text="As the name suggests, this popular spot is as welcoming to pets as it is to humans. The Friendly Spot Ice House has a pet-friendly patio, a large menu of craft beers, and comfort food."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image10.png" text="The Friendlt Spot Ice House" />

          <LinkContent
            link="https://thecove.us/"
            linkText="The Cove"
            text="A unique and eco-friendly restaurant, The Cove allows leashed pets on its expansive outdoor dining area. Enjoy their famous fish tacos and delicious burgers while your furry companion enjoys the lively atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image4.png" text="The Cove" />

          <LinkContent
            link="https://www.latunasa.com/"
            linkText="La Tuna Grill"
            text="La Tuna Grill is located in the Southtown neighborhood and has a pet-friendly patio where you can enjoy Tex-Mex favorites and live music."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image19.png" text="La Tuna Grill" />

          <LinkContent
            link="https://tycoonflats.com/"
            linkText="Tycoon Flats"
            text="Tycoon Flats is a pet-friendly restaurant known for its juicy burgers, cold beers, and shaded outdoor seating perfect for you and your pet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image13.png" text="Tycoon Flats" />

          <LinkContent
            link="https://alamobiscuitco.com/"
            linkText="Alamo Biscuit Company"
            text="Treat yourself and your pet to a delightful breakfast or brunch at Alamo Biscuit Company. This pet-friendly establishment offers an outdoor patio and scrumptious dishes like biscuits and gravy."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image3.png" text="Alamo Biscuit Company" />

          <LinkContent
            link="https://www.candlelightsatx.com/"
            linkText="Candlelight Coffeehouse & Wine Bar"
            text="Not just a coffeehouse, this cozy spot has a pet-friendly patio and serves light bites, wines, and craft beers. A perfect place to unwind with your furry friend by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image17.png" text="Candlelight Coffeehouse & Wine Bar" />

          <LinkContent
            link="https://smokeshacksa.com/"
            linkText="Smoke Shack BBQ"
            text="If you're craving some mouthwatering barbecue, head to Smoke Shack BBQ, which welcomes pets on its outdoor patio. Savor their tender brisket, ribs, and pulled pork while your pet enjoys the outdoor ambiance."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image7.png" text="Smoke Shack BBQ" />

          <LinkContent
            link="https://www.southerleigh.com/location/southerleigh-haute-south/"
            linkText="Southerleigh Haute South"
            text="This stylish eatery features a pet-friendly patio and a menu with a blend of Southern and Tex-Mex flavors. Enjoy their creative dishes and craft cocktails with your pet by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image1.png" text="Haute South" />

          <LinkContent
            link="https://www.sadogfather.com/"
            linkText="The Dogfather"
            text="A unique dining experience for both you and your pup, The Dogfather specializes in gourmet hot dogs with creative toppings. Your furry friend can also indulge in their special dog-friendly menu."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image11.png" text="The Dogfather" />

          <LinkContent
            link="https://eatgoodkind.com/"
            linkText="The Good Kind Southtown"
            text="This health-conscious restaurant features a pet-friendly patio, perfect for enjoying nourishing salads, bowls, and sandwiches while your pet enjoys the fresh air."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image20.png" text="The Good Kind Southtown" />

          <LinkContent
            link="https://rosariossa.com/"
            linkText="Rosario's Mexican Cafe y Cantina"
            text="A popular Tex-Mex spot, Rosario's invites pets to join diners on their outdoor patio. Savor their delicious fajitas and enchiladas while your furry companion relaxes by your feet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image2.png" text="Rosario's Mexican Cafe y Cantina" />

          <LinkContent
            link="https://thehoppymonk.com/"
            linkText="The Hoppy Monk"
            text="A haven for beer enthusiasts, The Hoppy Monk's dog-friendly patio allows you to sample a vast selection of craft beers while your pet enjoys the outdoor setting."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image14.png" text="The Hoppy Monk" />

          <LinkContent
            link="https://twobrosbbqmarket.com/"
            linkText="Two Bros. BBQ Market"
            text="Enjoy mouthwatering Texas-style barbecue on Two Bros. pet-friendly patio. Your furry friend will appreciate the shady area while you savor their flavorful meats and classic sides."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image9.png" text="Two Bros. BBQ Market" />

          <LinkContent
            link="https://www.eggspectation.com/"
            linkText="Eggspectation"
            text="Eggspectation is a popular breakfast and brunch restaurant chain with locations across the United States and Canada. Known for its extensive menu that celebrates the versatility of eggs, Eggspectation offers a wide array of egg-based dishes, including omelets, benedicts, and egg sandwiches."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image6.png" text="Eggspectation" />

          <LinkContent
            link="https://www.cappysrestaurant.com/"
            linkText="Cappy’s Restaurant"
            text="With over 40 years of history, Cappy's Restaurant has earned a reputation for its delicious and innovative American cuisine. The restaurant's menu features a diverse selection of dishes, ranging from fresh seafood and grilled meats to creative salads and delectable desserts. With its warm and inviting ambiance, attentive service, and commitment to using locally sourced ingredients, Cappy's Restaurant provides a delightful and memorable dining experience for both locals and visitors alike." />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/San%20Antonio/image22.png" text="Cappy’s Restaurant" />


        </Box>


        
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden mdDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar city={searchData} />
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
