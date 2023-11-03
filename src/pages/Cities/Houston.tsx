import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography, useMediaQuery } from "@mui/material";

import Map from "../../components/UI/Map/Map";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";
import {Helmet} from "react-helmet";
import ListingCard from "../../components/ListingCard";
import { 
  useStore, 
  useSelector 
} from "react-redux";
import { gql, useQuery } from "@apollo/client";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

import IconTags from '../../components/IconTags';

import { HOTEL_DESCRIPTIONS } from '../../constants/locationPageDescriptions';
import HighlightBox from '../../components/CitiesContent/HighlightBox';
import SingleLoadListingCard from '../../components/SingleLoadListingCard';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'

const searchData = {
  "city": {
    "description": "Houston, TX, USA",
    "matched_substrings": [
        {
            "length": 7,
            "offset": 0
        }
    ],
    "place_id": "ChIJAYWNSLS4QIYROwVl894CDco",
    "reference": "ChIJAYWNSLS4QIYROwVl894CDco",
    "structured_formatting": {
        "main_text": "Houston",
        "main_text_matched_substrings": [
            {
                "length": 7,
                "offset": 0
            }
        ],
        "secondary_text": "TX, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Houston"
        },
        {
            "offset": 9,
            "value": "TX"
        },
        {
            "offset": 13,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
  },
  "lat": 29.7604267,
  "lng": -95.3698028
}

const Houston: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Houston, TX');

  const city = 'Houston'
  const paragraphOne = 'Travel in Houston, Texas, is a delightful experience that warmly welcomes both travelers and their furry companions. The city has parks, trails, and dog-friendly areas, providing many opportunities for pets to enjoy outdoor activities and socialize with other furry friends.'

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
      <title>Pet Friendly Hotels Houston, TX | Romingo</title>
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
        <Typography variant="h4" component="h1">Find pet-friendly hotels in {city}</Typography>
        <Typography variant="base">The hassle free way to travel with your pet</Typography>
        <Box sx={{  width: '100%', mt: '1rem' }}>
          <LocationPageFilterBar search={searchData} />
        </Box>
      </Box>

      <Box
        component="img"
        src={cityContent.heroImage}
        alt={city}
        sx={{
          objectFit: "cover",
          width: { xs: '95%', sm: '95%', md: "85%" },
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
        <Box display="flex" flexDirection="column" gap="0.75rem">
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem'}}
          >
            {paragraphOne}
          </Typography>
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem'}}
          >
            With pet-friendly attractions, events, and even breweries, Houston is a wonderful city to enjoy with your pet.
          </Typography>
        </Box>
        <Grid my="1.5rem" item xs={12}>
          
          <IconTags />
         
        </Grid>
   

      
        <Box
          mt="1rem"
          width='100%'
          display='flex'
          flexDirection='column'
          maxWidth="900px"
          gap='1.5rem'
        >
          <Typography component="h2" variant="h2"> The Top Pet Friendly Accommodations in Houston</Typography>
          <Text text="Houston, Texas, is a city that embraces pet-friendly travel, making it an ideal destination for pet owners seeking inclusive hotels. Here are six pet-friendly hotels in Houston where you and your four-legged friend can create cherished memories together." />


          <SingleLoadListingCard
            hotelName="100430016"
            paragraphs={[
              "Hotel ZaZa Houston is a luxurious and stylish boutique hotel located in the Museum District of Houston, Texas. With a variety of themed accommodations, guests can choose from vibrant and whimsical rooms to elegant and sophisticated suites. Guests can indulge in the hotel's exquisite dining options, including the award-winning Monarch restaurant.",
              "The hotel provides designated pet-friendly rooms with upscale amenities, ensuring your pet feels just as pampered as you. There is a $100 fee per pet, but there is no weight limit. With its proximity to Hermann Park and other pet-friendly attractions, Hotel ZaZa Houston is a perfect choice for travelers with pets."
            ]}
          />
  
          <SingleLoadListingCard 
            hotelName="100437200" 
            paragraphs={[
              "The Hilton Houston Westchase is a sophisticated and modern hotel located in the vibrant Westchase District of Houston, Texas. Guests can enjoy a range of amenities, including an outdoor pool, a fitness center, and dining options at the onsite restaurant. The hotel's convenient location allows easy access to major corporations, shopping centers, and popular attractions",
              "The Hilton Houston Westchase is pet-friendly and you can bring two pets that weigh less than 75 pounds. There is an additional fee of $50 per pet, per stay.",

            ]}
          />

          <SingleLoadListingCard 
            hotelName="100402242"
            paragraphs={[
              "Nestled in the Montrose neighborhood, La Colombe d'Or is a pet-friendly boutique hotel with a rich history. This charming hotel offers well-appointed rooms and suites, some of which are pet-friendly. The hotel's proximity to Buffalo Bayou Park allows for leisurely strolls with your furry friend amidst beautiful green spaces.",
              "You can bring up to two dogs when you stay at La Colombe d'Or. There is a $250 fee per stay, and your dog will receive food and water bowls at arrival.",

            ]}
          /> 
    
          <SingleLoadListingCard 
            hotelName="100409544" 
            paragraphs={[
              "The Westin Houston Downtown is a contemporary and upscale hotel situated in the heart of Houston's bustling downtown district. Guests can enjoy a variety of amenities, including a rooftop pool with beautiful views of the city skyline and a fitness center.",
              "The hotel's pet-friendly policy ensures a convenient and comfortable stay for you and your pet. Enjoy spacious rooms and upscale amenities, as well as easy access to pet-friendly parks and attractions nearby. The Westin Houston Downtown welcomes one dog that weighs up to 40 pounds for an additional $100 fee per stay.",

            ]}
          />
        
          <SingleLoadListingCard 
            hotelName="100405496" 
            paragraphs={[
              "The Magnolia Hotel Houston is a historic and stylish boutique hotel located in the heart of downtown Houston, Texas. The hotel's location is within walking distance of Houston's major attractions, theaters, and dining establishments, such as Discover Green Park.",
              "As a pet-friendly hotel, The Magnolia Hotel warmly welcomes furry companions with open arms! You canbring up to two pets that weigh 75 pounds for no fee."
            ]}
          />
          
          <SingleLoadListingCard 
            hotelName="100007968" 
            paragraphs={[
              "Aloft Houston by the Galleria is a trendy and vibrant hotel located near the renowned Galleria shopping district in Houston, Texas. This modern and hip hotel offers a refreshing and contemporary atmosphere, attracting both business and leisure travelers alike. Guests can socialize and unwind at the hotel's W XYZ bar, which offers craft cocktails and live music.",
              "Aloft Houston by the Galleria is pet-friendly and offers designated rooms with comfortable arrangements for you and your furry friend. The hotel allows you to bring up to two dogs for $75 - $150 per day. Enjoy the hotel's vibrant and modern atmosphere, as well as easy access to nearby pet-friendly shopping and dining options." 

            ]}
          />

          <Typography variant="h2">The Top Pet-Friendly Activities in Houston</Typography>
          <Text text="Houston, Texas, is a city that loves its furry residents just as much as its human ones. These are ten of the best pet-friendly activities in Houston for you and your furry friend." />


          <Carousel
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            centerMode={mobile ? false: true}
            centerSlidePercentage={mobile ? 100 : 70}
          >
            {
              [
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/Johnny%20Steele.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.downtownhouston.org/guidedetail/parks/johnny-steele-dog-park/"
                      linkText="Johnny Steele Dog Park"
                      text="Johnny Steele Dog Park, located in Buffalo Bayou Park, is a spacious and well-maintained off-leash dog park that offers separate areas for large and small dogs to play freely. The park's beautiful scenery and designated dog-friendly trails make it a perfect spot for a fun-filled day with your pet."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image13.png',
                  component: (
                    <LinkContent
                      link="https://marketsquarepark.com/"
                      linkText="Market Square Park"
                      text="Situated in the Historic District, Market Square Park is a pet-friendly green space that hosts various events and activities throughout the year. Leashed pets are welcome, making it an ideal place for a leisurely stroll or a relaxing picnic with your furry friend."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/Houston%20Arborethum.webp',
                  component: (
                    <LinkContent
                      link="https://houstonarboretum.org/"
                      linkText="Houston Arboretum & Nature Center"
                      text="This 155-acre nature sanctuary is a great place for you and your pet to immerse yourselves in the beauty of nature. Leashed pets are allowed on the trails, providing an excellent opportunity for an outdoor adventure together."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image7.png',
                  component: (
                    <LinkContent
                      link="https://www.citycentrehouston.com/"
                      linkText="CityCentre"
                      text="CityCentre is a pet-friendly shopping and entertainment district that welcomes leashed pets. Enjoy window shopping, al fresco dining, and live music while your furry companion enjoys the sights and sounds of this vibrant area."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/Trail%20Link.webp',
                  component: (
                    <LinkContent
                      link="https://www.traillink.com/trail/mktsp-rails-to-trails-(heights-hike-and-bike-trail)/"
                      linkText="Houston Heights Bike Trail"
                      text="The Houston Heights Bike Trail is a scenic trail that allows leashed pets, making it a fantastic choice for a leisurely walk or bike ride with your pet."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image3.png',
                  component: (
                    <LinkContent
                      link="https://8thwonder.com/"
                      linkText="8th Wonder Brewery"
                      text="8th Wonder Brewery is a pet-friendly craft brewery that offers a spacious outdoor patio where you can enjoy a cold beer with your furry friend by your side."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image17.png',
                  component: (
                    <LinkContent
                      link="https://www.levyparkhouston.org/"
                      linkText="Levy Park"
                      text="Levy Park is a popular pet-friendly green space in the Upper Kirby District, featuring a playground, splash pad, and dog-friendly areas. It's a fantastic place to relax and have fun with your pet."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/Bat%20Watching.jpeg',
                  component: (
                    <LinkContent
                      link="https://tpwd.texas.gov/huntwild/wild/species/bats/bat-watching-sites/waugh-drive-bridge.phtml"
                      linkText="Waugh Bridge Bat Colony"
                      text="Head to the Waugh Bridge at dusk to watch the famous bat emergence with your pet. This natural spectacle is a unique experience for both you and your furry friend."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image5.png',
                  component: (
                    <LinkContent
                      link="https://www.tclf.org/landscapes/sabine-promenade"
                      linkText="Sabine Promenade"
                      text="Enjoy scenic views of downtown Houston along the Sabine Promenade, a pet-friendly walkway that runs along Buffalo Bayou."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image6.png',
                  component: (
                    <LinkContent
                      link="https://www.discoverygreen.com/"
                      linkText="Discovery Green"
                      text="Discovery Green is a vibrant park in downtown Houston that hosts various pet-friendly events and activities, including concerts, festivals, and movie nights."
                    />
                  )
                },
              ].map((item, index) => (
                <Box key={index} textAlign="left" m="0.5rem" pb="0.25rem" minHeight="550px" boxShadow={1} borderRadius={4}>
                  <img style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }}  src={item.src} height="340px" />
                   {item.component}
                </Box>
              ))
            }
          </Carousel>

      
  

          <Text text="From spacious dog parks to scenic trails and pet-friendly events, Houston ensures that pets are an integral part of the city's vibrant culture. Have fun exploring Houston with your furry friend!" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Houston</Typography>
          <Text text="Houston, Texas, is a city that not only celebrates its diverse culinary scene but also embraces its love for pets. Here are the top 10 pet-friendly restaurants in Houston that we recommend you visit on your next trip." />

          <Carousel
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            centerMode={mobile ? false: true}
            centerSlidePercentage={mobile ? 100 : 70}
          >
            {
              [
                {
                  src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/Barnaby's%20Cafe.jpeg",
                  component: (
                    <LinkContent
                      link="https://barnabyscafe.com/"
                      linkText="Barnaby's Café"
                      text="Barnaby's Café is a beloved local eatery that warmly welcomes pets on their outdoor patios. This pet-friendly spot offers a diverse menu, from hearty breakfast dishes to flavorful salads and mouthwatering burgers, ensuring a delightful dining experience for both humans and their furry companions."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/Liberty%20Kitchen.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.libertykitchenoysterette.com/"
                      linkText="Liberty Kitchen & Oysterette"
                      text="Situated in the Heights, Liberty Kitchen & Oysterette boasts a pet-friendly patio where you can savor fresh seafood and delectable dishes. The restaurant offers water bowls and treats for pets, making it a perfect choice for a leisurely meal with your furry friend."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image11.png',
                  component: (
                    <LinkContent
                      link="https://www.axelradhouston.com/"
                      linkText="Axelrad Beer Garden"
                      text="Axelrad Beer Garden is a trendy spot in Midtown, known for its laid-back atmosphere and extensive beer selection. The pet-friendly garden is an inviting space where you and your pet can enjoy a cold drink and unwind with live music and a friendly crowd."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image4.png',
                  component: (
                    <LinkContent
                      link="https://bistromenil.com/"
                      linkText="Bistro Menil"
                      text="Located near the Menil Collection, Bistro Menil offers a chic and pet-friendly patio where you can enjoy delicious French-inspired dishes and wines. The restaurant even provides a special &quot;Bark Menu&quot; with treats for your furry friend." 
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image15.png',
                  component: (
                    <LinkContent
                      link="https://www.becksprime.com/"
                      linkText="Beck's Prime"
                      text="Beck's Prime is a Houston favorite known for its mouthwatering burgers and sandwiches. Their pet-friendly patios provide a perfect setting for you and your pet to indulge in tasty comfort food."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image12.png',
                  component: (
                    <LinkContent
                      link="https://www.buffbrew.com/"
                      linkText="Buffalo Bayou Brewing Company"
                      text="Buffalo Bayou Brewing Company is a popular pet-friendly brewery with a spacious outdoor area. Sip on craft beers while your furry companion enjoys the company of other pets and a friendly atmosphere."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/Good%20Dog.jpg',
                  component: (
                    <LinkContent
                      link="https://gooddoghouston.com/"
                      linkText="Good Dog Houston"
                      text="True to its name, Good Dog Houston offers gourmet hot dogs and a pet-friendly patio where your furry friend can join you for a tasty meal. The restaurant even has a &quot;pup cup&quot; dessert for your pet."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image10.png',
                  component: (
                    <LinkContent
                      link="https://www.onioncreekcafe.com/"
                      linkText="Onion Creek Café"
                      text="Onion Creek Café is a laid-back café in the Heights that boasts a pet-friendly patio with a relaxed vibe. Enjoy brunch favorites and refreshing drinks while your pet lounges nearby."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/image2.png',
                  component: (
                    <LinkContent
                      link="https://tinyboxwoods.com/"
                      linkText="Tiny Boxwoods"
                      text="Tiny Boxwoods is a charming café and garden that welcomes pets on their outdoor patio. This pet-friendly spot offers delicious fare, including brunch, salads, and delightful desserts, making it a perfect place for you and your pet to unwind."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Houston/Karbach.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.karbachbrewing.com/"
                      linkText="Karbach Brewing"
                      text="Karbach offers a wide range of craft beers, from classic styles to seasonal and limited-edition brews, all crafted with a passion for quality and taste. The brewery's spacious beer garden and taproom provide a welcoming and laid-back atmosphere, making it an excellent spot for beer lovers to gather and enjoy their favorite beverages."
                    />
                  )
                },
              ].map((item, index) => (
                <Box key={index} textAlign="left" m="0.5rem" pb="0.25rem" minHeight="550px" boxShadow={1} borderRadius={4}>
                  <img style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }}  src={item.src} height="340px" />
                   {item.component}
                </Box>
              ))
            }
          </Carousel>

          
        </Box>


        
      </Grid>
    </Container>
    <Footer />
  </>;
};

export default Houston;
