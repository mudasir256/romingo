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
    "description": "New Orleans, LA, USA",
    "matched_substrings": [
        {
            "length": 11,
            "offset": 0
        }
    ],
    "place_id": "ChIJZYIRslSkIIYRtNMiXuhbBts",
    "reference": "ChIJZYIRslSkIIYRtNMiXuhbBts",
    "structured_formatting": {
        "main_text": "New Orleans",
        "main_text_matched_substrings": [
            {
                "length": 11,
                "offset": 0
            }
        ],
        "secondary_text": "LA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "New Orleans"
        },
        {
            "offset": 13,
            "value": "LA"
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
"lat": 29.95106579999999,
"lng": -90.0715323
}

const NewOrleans: FC = () => {

 
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'New Orleans');

  const city = 'New Orleans'
  const paragraphOne = "New Orleans, the vibrant city of jazz, culture, and mouthwatering cuisine, warmly welcomes four-legged travelers. Pet-friendly travel in the Big Easy has become increasingly popular, as more hotels, activities, and restaurants embrace the presence of our furry friends. Whether you're strolling through the historic French Quarter, exploring the lush City Park, or indulging in some delicious gumbo, your pets can now join in on the fun. From pet-friendly hotels offering special amenities to a plethora of exciting activities catered to pets, New Orleans ensures a memorable and inclusive experience for every member of your family, including the ones with wagging tails."

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
      <title>Pet Friendly Hotels New Orleans, LA | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, LA | Romingo`}
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
          Pet Friendly Hotels {city}
        </Typography>
      </Box>
      <Divider variant="middle" light sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          LOUISIANA
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
            variant="base"
            sx={{ fontSize: '0.9rem'}}
          >
            {paragraphOne}
          </Typography>
        </Grid>
        <Grid my="1.5rem" item xs={12}>
          
          <IconTags />
          
        </Grid>

      
        <Box
          mt="1rem"
          width='100%'
          display='flex'
          flexDirection='column'
          gap='1.5rem'
          maxWidth="900px"
        >
          <Typography component="h2" variant="h2"> The Top Pet Friendly Accommodations in New Orleans</Typography>
      
        

          <SingleLoadListingCard 
            hotelName="102262557" 
            paragraphs={[
              "Virgin Hotels New Orleans, part of the renowned Virgin Group, brings its signature style and innovation to the heart of the city. Located in the Warehouse District, this chic and contemporary hotel offers a vibrant atmosphere, blending modern design with local flair. ",
              "The hotel boasts comfortable and stylish rooms with all the amenities you need for a comfortable stay. Guests can indulge in delectable dining options, enjoy the rooftop pool, and experience the energetic vibe of the Commons Club. With its pet-friendly policy, Virgin Hotels New Orleans ensures that your four-legged companions are also treated like royalty.",
              "Virgin Hotels New Orleans is pet-friendly and allows you to bring pets of all sizes for no additional fee."
            ]}
          />
     
          <SingleLoadListingCard 
            hotelName="100221170" 
            paragraphs={[
              "Situated in the Arts District, Kimpton Hotel Fontenot exudes sophistication and charm. This boutique hotel, part of the InterContinental Hotels Group (IHG), offers an artistic ambiance, blending contemporary design with the spirit of New Orleans. The well-appointed rooms feature modern amenities and thoughtful touches to ensure a memorable stay.",
              "Guests can savor locally inspired cuisine at the hotel's restaurant and unwind with crafted cocktails in the rooftop lounge. Known for their pet-friendly approach, Kimpton Hotel Fontenot welcomes pets with open arms, providing all the necessary comforts to ensure a delightful stay for both you and your furry friends.",
              "Kimpton Hotel Fontenot, an IHG Hotel is pet-friendly and allows you to bring pets of all sizes for no additional fee."
            ]}
          />
        
          <SingleLoadListingCard 
            hotelName="100389402" 
            paragraphs={[
              "Steeped in history and located in the heart of the French Quarter, Bourbon Orleans Hotel offers an authentic New Orleans experience with a touch of Southern hospitality. The hotel's elegant and comfortable rooms are adorned with classic decor and modern amenities. ",
              "Guests can savor traditional Creole cuisine at the hotel's restaurant and soak in the charming courtyard with a refreshing drink. Bourbon Orleans Hotel's pet-friendly policy ensures that you can explore the city's historic streets with your furry companion by your side. With its prime location, guests are just steps away from iconic landmarks, lively nightlife, and the vibrant culture of New Orleans.",
              "Bourbon Orleans Hotel is pet-friendly and allows you to bring two dogs per room for an additional fee of $75."
            ]}
          />
       
          <SingleLoadListingCard 
            hotelName="100005998" 
            paragraphs={[
              "An iconic landmark in the heart of downtown New Orleans, The Roosevelt captures the essence of the city's rich history and luxury. The hotel's elegant rooms feature plush furnishings, and guests can enjoy top-notch amenities, including a rooftop pool and multiple dining options. The Sazerac Bar, a historic gem within the hotel, is famous for its classic cocktails and lively ambiance.",
              "The Roosevelt New Orleans welcomes pets, ensuring that your furry friends can enjoy a taste of luxury as well. With its prime location on Roosevelt Way, the hotel offers easy access to the French Quarter, Canal Street shopping, and other notable attractions.",
              "The Roosevelt New Orleans is pet-friendly and allows you to bring pets for an additional fee of $175."
            ]}
          />
       
          <SingleLoadListingCard 
            hotelName="100185804" 
            paragraphs={[
              "Nestled in the Warehouse District, Ace Hotel New Orleans infuses the city's artistic spirit into every aspect of its design. The hotel's industrial-chic aesthetic, complemented by locally sourced artwork and unique decor, creates a hip and vibrant atmosphere. The rooms are stylishly furnished, and guests can enjoy creative dining options and lively entertainment within the hotel's premises. ",
              "Ace Hotel New Orleans embraces a pet-friendly policy, encouraging guests to bring their furry companions along for the adventure. With its trendy ambiance and central location, this hotel provides an excellent base for exploring the city's art scene, diverse culinary offerings, and lively nightlife.",
              "Ace Hotel New Orleans is pet-friendly and allows you to bring two pets that weigh up to 50 pounds for a fee of $25 per pet, per night."
            ]}
          />

          <SingleLoadListingCard 
            hotelName="100409330" 
            paragraphs={[
              "Located in the heart of the French Quarter, Homewood Suites by Hilton New Orleans offers a comfortable and convenient stay for both short and extended visits. The hotel's spacious suites feature fully equipped kitchens, making it an ideal choice for travelers seeking a home-away-from-home experience. ",
              "Guests can enjoy complimentary breakfast and evening socials, creating a welcoming and social atmosphere. The hotel's pet-friendly policy ensures that your four-legged family members can join you on your adventure through the lively streets of New Orleans. With its central location, guests can easily explore nearby attractions, restaurants, and the city's unique culture.",
              "Homewood Suites by Hilton New Orleans is pet-friendly and allows you to bring two pets of any size for an additional fee of $75 for stays up to four nights; $125 for stays longer than four nights."
            ]}
          />  
        
          <Typography variant="h2">The Top Pet-Friendly Activities in New Orleans</Typography>
 
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
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image16.png',
                  component: (
                    <LinkContent
                      link="https://neworleanscitypark.org/visit-city-park/city-bark/"
                      linkText="City Bark"
                      text="This expansive dog park offers separate areas for small and large dogs to socialize and play freely while owners can relax in the shaded areas."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/Swamp%20Tours.webp',
                  component: (
                    <LinkContent
                      link="https://www.wildlouisianatours.com/?_vsrefdom=adwords&gclid=Cj0KCQjw84anBhCtARIsAISI-xf9CGYPHrraabVLt0AyC5PlDce91LVzpO8bi2nuTc9njv2OU9PGPgUaAjz-EALw_wcB"
                      linkText="Swamp Tours"
                      text="Experience the enchanting swamps and bayous of Louisiana with your pet by your side on a pet-friendly swamp tour."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/Crescent%20Park.jpeg',
                  component: (
                    <LinkContent
                      link="http://www.crescentparknola.org/"
                      linkText="Crescent Park"
                      text="Take a leisurely stroll or bike ride along the Mississippi River at Crescent Park, a beautiful pet-friendly green space."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image10.png',
                  component: (
                    <LinkContent
                      link="https://www.neworleansbrewerytour.com/"
                      linkText="NOLA City Bark: A Brewery Tour"
                      text="Some breweries in New Orleans allow pets in their outdoor seating areas, making for a fun and pet-friendly brewery tour experience."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image13.png',
                  component: (
                    <LinkContent
                      link="https://www.neworleans.com/plan/neighborhoods/french-quarter/"
                      linkText="The French Quarter"
                      text="Explore the historic streets of the French Quarter with your leashed pet, visiting pet-friendly shops, cafes, and art galleries along the way."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image11.png',
                  component: (
                    <LinkContent
                      link="https://www.neworleans.com/plan/transportation/streetcars/"
                      linkText="Streetcar Ride"
                      text="Well-behaved pets are welcome on the city's historic streetcars, providing an excellent and unique way to explore New Orleans."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image3.png',
                  component: (
                    <LinkContent
                      link="https://neworleanskayakswamptours.com/"
                      linkText="Kayak Tour"
                      text="Embark on a pet-friendly kayak tour, where your pet can join you for a paddling adventure through the scenic waterways."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/Cemetery%20Tour.jpeg',
                  component: (
                    <LinkContent
                      link="https://cemeterytourneworleans.com/"
                      linkText="Cemetery Tours"
                      text="Many pet-friendly walking tours take you through the intriguing and historic cemeteries of New Orleans."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image15.png',
                  component: (
                    <LinkContent
                      link="https://www.neworleans.com/blog/post/best-public-gardens-in-new-orleans/"
                      linkText="Parks and Gardens"
                      text="Enjoy a leisurely day at pet-friendly parks and gardens like Audubon Park or the New Orleans Botanical Garden."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image8.png',
                  component: (
                    <LinkContent
                      link="https://hauntedhistorytours.com/"
                      linkText="Ghost Tours"
                      text="Experience the spooky side of New Orleans on a pet-friendly ghost tour through the haunted streets and eerie alleys."
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
          
      
          <Typography variant="h2">The Top Pet-Friendly Restaurants in New Orleans</Typography>
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
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/The%20bulldog.jpg',
                  component: (
                    <LinkContent
                      link="https://www.thebulldog.bar/"
                      linkText="The Bulldog"
                      text="This pub offers a wide selection of craft beers and a pet-friendly patio where your furry companion can relax while you enjoy your meal."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image7.png',
                  component: (
                    <LinkContent
                      link="https://thecountryclubneworleans.com/"
                      linkText="The Country Club"
                      text="This stylish restaurant welcomes pets on its beautiful outdoor patio, creating a perfect spot for brunch or a romantic dinner."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image19.png',
                  component: (
                    <LinkContent
                      link="https://www.datdog.com/"
                      linkText="Dat Dog"
                      text="A local favorite, Dat Dog specializes in delicious hot dogs with a diverse array of toppings, and they love having pets on their outdoor terrace."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image18.png',
                  component: (
                    <LinkContent
                      link="https://parkwaypoorboys.com/"
                      linkText="Parkway Bakery and Tavern"
                      text="Famous for its po' boys, this iconic eatery invites you and your pet to savor authentic New Orleans flavors together."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image5.png',
                  component: (
                    <LinkContent
                      link="https://cafeamelie.com/"
                      linkText="Cafe Amelie"
                      text="Located in a charming courtyard, this restaurant allows pets to join their owners for a delightful dining experience."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image4.png',
                  component: (
                    <LinkContent
                      link="https://thevelvetcactus.com/"
                      linkText="The Velvet Cactus"
                      text="This Tex-Mex restaurant offers a vibrant atmosphere and pet-friendly outdoor seating where you can enjoy tacos and margaritas."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image1.png',
                  component: (
                    <LinkContent
                      link="https://www.strochmarket.com/"
                      linkText="St. Roch Market"
                      text="This food hall features various vendors serving up a range of cuisines, and leashed pets are welcome in the outdoor seating area."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image17.png',
                  component: (
                    <LinkContent
                      link="https://thecolumns.com/"
                      linkText="The Columns Hotel"
                      text="Enjoy the historic ambiance and delicious cocktails at this pet-friendly hotel with a wraparound porch."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image14.png',
                  component: (
                    <LinkContent
                      link="https://www.paladar511.com/"
                      linkText="Paladar 511"
                      text="This Italian gem offers outdoor seating for you and your pet to relish wood-fired pizzas and handmade pasta."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/New%20Orleans/image12.png',
                  component: (
                    <LinkContent
                      link="https://www.cafebeignet.com/"
                      linkText="Cafe Beignet"
                      text="A popular brunch spot, Cafe Beignet welcomes pets on its outdoor patio, making it an ideal spot to start your day with a delicious meal."
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

export default NewOrleans;
