import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography, useMediaQuery } from "@mui/material";

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

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'


const searchData = {
  "city": {
    "description": "Austin, Texas, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        },
        {
            "length": 2,
            "offset": 8
        }
    ],
    "place_id": "ChIJLwPMoJm1RIYRetVp1EtGm10",
    "reference": "ChIJLwPMoJm1RIYRetVp1EtGm10",
    "structured_formatting": {
        "main_text": "Austin",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "Texas, USA",
        "secondary_text_matched_substrings": [
            {
                "length": 2,
                "offset": 0
            }
        ]
    },
    "terms": [
        {
            "offset": 0,
            "value": "Austin"
        },
        {
            "offset": 8,
            "value": "Texas"
        },
        {
            "offset": 15,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 30.267153,
  "lng": -97.7430608
}

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
    <Box m="1rem">
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

  const mobile = useMediaQuery("(max-width:800px)");


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
      sx={{ flexDirection: { xs: 'column-reverse', sm: 'column-reverse', md: 'row' } }} 
      display="flex"  
      gap="1rem" 
      alignItems="center"
      maxWidth="1800px"
      mx="auto"
    >

      <Box 
        borderRadius={4}
        backgroundColor="white" 
        sx={{
          width: { xs: 'auto', sm: 'auto', md: '420px' },
          p: { xs: '1rem', sm: '1rem', md: '1.5rem' },
          pt: { xs: 0, sm: 0 },
          left: { xs: 0, sm: 0, md: '7%' },
          boxShadow: { xs: 0, sm: 0, md: 3 },
          position: { xs: 'relative', sm: 'relative', md: 'relative' }
        }}
      >
        <Typography variant="h4" component="h1">Find pet-friendly hotels in Austin</Typography>
        <Typography variant="base">The hassle free way to travel with your pet</Typography>
        <Box sx={{  width: '100%', mt: '1rem' }}>
          <LocationPageFilterBar search={searchData} />
        </Box>
      </Box>

      <Box
        component="img"
        src={cityContent.heroImage}
        alt={"Atlanta"}
        sx={{
          objectFit: "cover",
          width: { xs: '95%', sm: '95%', md: "65%" },
          m: { xs: '0.5rem', sm: '0.5rem', md: '2rem' },
          borderRadius: '10px',
          height: { xs: "40vh", md: "70vh" },
          boxShadow: 0,
        }}
      />
    </Box>

   
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: '5rem' }}>
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
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Box display="flex" flexDirection="column" gap="0.75rem">
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            {paragraphOne}
          </Typography>
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            With numerous pet friendly parks, hiking trails, and outdoor spaces, Austin is the ideal city to travel to with your pet. You can enjoy restaurants, cafes, and breweries in Austin that have pet-friendly patios and dining options. Additionally, there are several pet-friendly hotels that cater to the needs of both you and your beloved pets.
          </Typography>
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            From exploring the vibrant music scene to experiencing the city&apos;s unique culture, you will have an amazing time in Austin. Here are some of our favorite pet-friendly hotels, activities, and restaurants to see in Austin, Texas.
          </Typography>
        </Box>
        <Grid mt="1.5rem" item xs={12} sx={{ mb: "1.5rem" }}>
          
            <IconTags />
        
        </Grid>
     

        <Box
          mt="1rem"
          width='100%'
          display='flex'
          maxWidth="900px"
          flexDirection='column'
          gap='1.5rem'
        >

          <Typography component="h2" variant="h2">The Top Pet Friendly Accommodations in Austin</Typography>
          <Text text="Austin, Texas, is a city known for its welcoming and pet-friendly culture. Here are Austin's finest pet-friendly hotels, all the way from luxurious hotel chains to charming boutique properties." />
          
          <SingleLoadListingCard 
            hotelName="100195468"
            paragraphs={[
              "Aloft Austin Downtown is a modern and pet-friendly hotel that offers a vibrant and playful atmosphere. The hotel is near the 6th Street Entertainment District, which has the area's best shopping, dining, and entertainment. The University of Texas at Austin and Zilker Metropolitan Park are also nearby. With its trendy design and rooftop pool, Aloft Austin Downtown promises an enjoyable stay for both human and furry guests.",
              "The hotel's pet-friendly policy allows two dogs weighing up to 40 pounds to stay with their owners. There is no pet fee for their stay and your pets will receive a dog bed, bowl, treats, and toys."
            ]} 
          />
       

          <SingleLoadListingCard 
            hotelName="100156448" 
            paragraphs={[
              "A sister property to Hotel Van Zandt, Kimpton Hotel Van Zandt is a top pet-friendly hotel in Austin. Named after the legendary Texas musician Townes Van Zandt, this hotel celebrates the city's vibrant music scene and arts culture. The rooftop pool and pet-friendly patio offer a relaxing spot for guests to unwind with their pets.",
              "This boutique hotel embraces Kimpton's \"Pet-Friendly\" ethos, allowing pets to stay with their owners at no extra charge. When you check in, your pet will receive treats, food, water bowls, and a comfy bed to enjoy during their stay!"
            ]}
          />


          <SingleLoadListingCard 
            hotelName="100182480" 
            paragraphs={[
              "Archer Hotel Austin is a chic and pet-friendly hotel that welcomes pets of all shapes and sizes. The hotel is in the Domain Northside and is steps from the Rock Rose Entertainment District. Archer Hotel Austin is walking distance from many popular attractions, including pet-friendly parks and walking areas.",
              "This hotel is pet-friendly and allows you to bring one dog that is up to 50 pounds. There is a pet cleaning fee of $150 per stay that you will pay when staying at Archer Hotel Austin. Your pet will receive water and food bowls, biscuits, bandanas, a &quot;Dog in Room&quot; sign, waste bags, and a doggy bed."
            ]}
          />
   
          <SingleLoadListingCard 
            hotelName="100193952" 
            paragraphs={[
              "Hyatt House Austin Downtown is a stylish and modern hotel located in the heart of Austin, Texas. This hotel is in a prime location and is close to the city's popular attractions, dining, and entertainment venues. Take advantage of the hotel's convenient location to explore nearby parks and pet-friendly attractions with your furry companion.",
              "Nestled in the heart of downtown, Hyatt House Austin Downtown offers spacious, pet-friendly suites with separate living and sleeping areas. Dogs are welcome to join you if they are under 50 pounds (under 75 pounds with two dogs). There is a fee of $75/day for stays up to 6 nights and there is an additional $100 fee if you stay 7-30 nights.",
            ]}
          />
    
          <SingleLoadListingCard 
            hotelName="100092510" 
            paragraphs={[
              "The Driskill Hotel is an iconic and historic landmark located in the heart of downtown Austin, Texas. Established in 1886, this grand hotel exudes timeless elegance and charm, offering a blend of classic architecture with modern amenities. The Driskill is renowned for its luxurious accommodations, impeccable service, and its rich history as one of Austin's oldest hotels.",
             // "The Driskill Hotel's central location allows for easy access to Austin's vibrant entertainment, shopping, and dining scenes. This is an ideal choice for travelers seeking a luxurious and immersive experience in the heart of the city.",
              "The hotel offers a pet policy that allows dogs weighing up to 75 pounds to stay with their owners. There is a $100 fee for your pets when your bring them to The Driskill Hotel."
            ]}
          /> 


          <SingleLoadListingCard 
            hotelName="100019286" 
            paragraphs={[
              "The Omni Austin Hotel Downtown welcomes pets with open arms, making it a popular choice for pet owners. This hotel offers stunning views of the city and is close to Austin's popular attractions, live music venues, and cultural landmarks. Guests can enjoy luxurious amenities, including a rooftop pool, fitness center, and multiple dining options.",
              "The hotel's pet-friendly policy allows two dogs weighing up to 25 pounds each to stay with their owners. There is a cleaning fee of $125.00 for cleaning services."
            ]}
          />

    
          <Typography variant="h2">The Top Pet-Friendly Activities in Austin</Typography>
          <Text text="Austin, Texas, is a very pet-friendly city and has many activities for you and your four-legged friend to enjoy. From scenic parks to pet-friendly restaurants, Austin promises a delightful experience for both you and your furry companion." />
          <Text text="Here are the best pet-friendly activities in Austin for you and your pet to enjoy." />


          <Carousel
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            centerMode={mobile ? false: true}
            centerSlidePercentage={mobile ? 100 : 70}
          >

             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} src="" height="340px" />
                  <LinkContent
                    link="https://www.austintexas.gov/department/zilker-metropolitan-park"
                    linkText="Zilker Metropolitan Park"
                    text="Zilker Park is a pet-friendly oasis, offering 350 acres of open space for you and your furry friend to explore. Enjoy a hike, have a picnic by the lake, or let your dog play off-leash in the dog park."
                  />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image1.png" 
                  height="340px" 
                />
                <LinkContent  
                  link="https://www.austintexas.gov/department/barton-springs-pool"
                  linkText="Barton Springs Pool"
                  text="Located within Zilker Park, Barton Springs Pool is a natural spring-fed swimming pool that allows leashed dogs in specific areas. Take a refreshing dip with your pet in the cool waters and bask in the beautiful Austin sunshine."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image6.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://austinparks.org/park/red-bud-isle/"
                  linkText="Red Bud Isle"
                  text="Red Bud Isle is a popular dog park, and dogs can swim and play in the waters of Lake Austin. Enjoy a scenic walk along the trails and take in the stunning views of the lake and surrounding nature." 
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image4.png" 
                  height="340px" 
                />
               <LinkContent
                 link="https://yardbar.com/"
                 linkText="Yard Bar"
                 text="Treat your pet to an experience at Yard Bar, a dog-friendly restaurant and bar with an off-leash dog park. While you savor craft beers and delicious food, your furry friend can socialize with other dogs and enjoy playtime."
               />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image18.png" 
                  height="340px" 
                />
                <LinkContent 
                  link="https://tpwd.texas.gov/state-parks/mckinney-falls"
                  linkText="McKinney Falls State Park"
                  text="Just a short drive from downtown Austin, McKinney Falls State Park offers pet-friendly hiking trails and beautiful waterfalls. Leash up your pet and explore the picturesque landscapes, making memories together in the great outdoors."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image11.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://austinboulderingproject.com/"
                  linkText="Austin Bouldering Project"
                  text="If you like to rock climb, then the Austin Bouldering Project is for you. This is a pet-friendly indoor climbing gym where you can enjoy climbing sessions with your leashed dog by your side."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image5.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://peterpanminigolf.com/"
                  linkText="Peter Pan Mini Golf"
                  text="Play mini-golf with your pet by your side at Peter Pan Mini Golf. This pet-friendly attraction has been entertaining families for decades and your pet is guaranteed to have a great time."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image8.png" 
                  height="340px" 
                />
                
                <LinkContent
                  link="https://www.austintexas.org/austin-insider-blog/post/austins-hike-bike-trail/"
                  linkText="Lady Bird Lake Trail"
                  text="The Lady Bird Lake Trail is a pet-friendly hiking trail that loops around the scenic lake. Leash up your pet and enjoy a relaxing walk or bike ride along the trail. You'll see beautiful scenes of the Austin city skyline."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image12.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://www.austinsteamtrain.org/"
                  linkText="Austin Steam Train"
                  text="Treat your pet to a unique experience on the Austin Steam Train's pet-friendly excursions. This scenic train ride takes you and your furry friend on a journey through the beautiful Hill Country."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image2.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://woofgangbakery.com/"
                  linkText="Woof Gang Bakery & Grooming"
                  text="Spoil your pet with a visit to Woof Gang Bakery! This is a pet-friendly store that offers gourmet treats, toys, and pet grooming services. Let your furry friend indulge in a shopping spree and pampering session."
                />
             </Box>
          </Carousel>

          <Text text="Austin's pet-friendly activities offer a diverse range of adventures for you and your furry companion to enjoy together. So, whether you're exploring the great outdoors, dining at pet-friendly restaurants, or experiencing unique indoor attractions, Austin's pet-friendly activities guarantee a wagging tail and cherished memories for both pet owners and their furry friends." />


          <Typography variant="h2">The Top Pet-Friendly Restaurants in Austin</Typography>
          <Text text="Austin, Texas, is a city that loves its pets, and this pet-friendly culture extends to its vibrant dining scene. From Tex-Mex to farm-to-table meals, Austin has many options for you and your furry friend to enjoy. " />
          <Text text="Here are the top 10 pet-friendly restaurants in Austin where you can enjoy delectable dishes with your dog." />

          <Carousel
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            centerMode={mobile ? false: true}
            centerSlidePercentage={mobile ? 100 : 70}
          >

             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image13.png" 
                  height="340px" 
                />
                 <LinkContent  
                   link="https://www.bangersaustin.com/"
                   linkText="Banger's Sausage House & Beer Garden"
                   text="Banger's is a famous spot with a dog-friendly patio that offers a large selection of sausages and over 100 beers. Your pet will love this place because the restaurant provides water bowls and a place for them to meet other dogs."
                 />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image3.png" 
                  height="340px" 
                />
                 <LinkContent 
                   link="https://www.radiocoffeeandbeer.com/"
                   linkText="Radio Coffee & Beer"
                   text="Radio Coffee & Beer is a laid-back coffeehouse and beer garden with a pet-friendly outdoor area. Bring your pet along as you enjoy coffee in the morning and local brews in the evening with live music performances."
                 />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image15.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://www.joscoffee.com/"
                  linkText="Jo's Coffee"
                  text='Known for its iconic "I Love You So Much" mural, Jo&apos;s Coffee offers a dog-friendly patio where you can savor espresso drinks and eat breakfast tacos while your pet hangs out with you.'
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image20.png" 
                  height="340px" 
                />
                 
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="" 
                  height="340px" 
                />
                 <LinkContent
                   link="https://moontowersaloon.com"
                   linkText="Moontower Saloon"
                   text="Moontower Saloon is a dog-friendly bar and restaurant with a spacious outdoor area perfect for enjoying the Austin sunshine with your pet. Sip on cold drinks, munch on delicious bar food, and relax in the company of your four-legged companion."
                 />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image16.png" 
                  height="340px" 
                />
                
                <LinkContent
                  link="https://theabgb.com/"
                  linkText="ABGB - Austin Beer Garden Brewing"
                  text="ABGB is a dog-friendly brewpub with a lively patio, perfect for craft beer enthusiasts and pet owners. Enjoy a wide selection of house-brewed beers and tasty pizzas while your pet enjoys the outdoor setting."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image14.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://www.fresaschicken.com/"
                  linkText="Fresa's Chicken al Carbon"
                  text="Fresa's Chicken al Carbon offers a pet-friendly patio where you can savor mouthwatering rotisserie chicken and Mexican-inspired dishes. This casual spot provides a relaxed and welcoming atmosphere for both human and furry guests."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image10.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://www.cedardooraustin.com/"
                  linkText="Cedar Door"
                  text="Cedar Door, located in the heart of downtown Austin, is a beloved and iconic restaurant that holds a special place in the city's history. Established in 1975, Cedar Door is known as &quot;Austin's Original Patio Bar.&quot; Cedar Door's pet-friendly patio is a favorite spot for pet owners looking to dine with their furry companions."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image1.png" 
                  height="340px" 
                />
                <LinkContent
                  link="https://www.casadeluz.org/"
                  linkText="Casa de Luz"
                  text="Casa de Luz is a unique and health-conscious restaurant located in Austin, Texas, that offers a holistic and nurturing dining experience. The restaurant focuses on serving plant-based, organic, and gluten-free meals that are prepared with love and intention, and has a pet-friendly patio for you to enjoy with your best friend."
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image9.png"
                  height="340px" 
                />
                <LinkContent
                  link="https://www.oztaphouse.com/"
                  linkText="Oz Tap House"
                  text="Oz Tap House is a lively and vibrant bar and restaurant located in Austin, Texas, known for its extensive selection of craft beers and friendly atmosphere. This pet-friendly establishment warmly welcomes guests and their furry companions, making it a popular spot for pet owners to enjoy a night out together. The restaurant's outdoor patio provides a comfortable setting for patrons to relax and socialize with their pets by their side. "
                />
             </Box>
             <Box textAlign="left" m="0.5rem" pb="0.25rem" minHeight="580px" boxShadow={1} borderRadius={4}>
                 <img 
                  style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} 
                  src="https://storage.googleapis.com/romingo-production-public/destination%20images/Austin/image19.png"
                  height="340px" 
                />
                <LinkContent
                  link="https://www.hopdoddy.com/"
                  linkText="Hop Daddy Burger Bar"
                  text="Hopdoddy Burger Bar is a popular and bustling restaurant chain that originated in Austin, Texas, known for its mouthwatering burgers and creative culinary flair. The restaurant's pet-friendly patios are a hit among pet owners, allowing guests to enjoy their delicious burgers, hand-cut fries, and unique milkshakes while their furry companions relax nearby."
                />
             </Box>



          </Carousel>

     
          <Text text="Austin's top 10 pet-friendly restaurants embrace the city's inclusive and pet-loving culture. From spacious dog parks to welcoming patios, these eateries go above and beyond to cater to both human and pet tastes. Leash up your pet, embark on a culinary journey, and savor delicious dishes while creating cherished memories together in Austin's pet-friendly paradise." />

        </Box>

      </Grid>
    </Container>
    <Footer />
  </>;
};

export default Austin;
