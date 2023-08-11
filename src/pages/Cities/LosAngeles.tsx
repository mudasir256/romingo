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

const laSearchData = {
  "city": {
    "description": "Los Angeles, CA, USA",
    "matched_substrings": [
        {
            "length": 11,
            "offset": 0
        }
    ],
    "place_id": "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    "reference": "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    "structured_formatting": {
        "main_text": "Los Angeles",
        "main_text_matched_substrings": [
            {
                "length": 11,
                "offset": 0
            }
        ],
        "secondary_text": "CA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Los Angeles"
        },
        {
            "offset": 13,
            "value": "CA"
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
"lat": 34.0522342,
"lng": -118.2436849
}

const LosAngeles: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Los Angeles, CA');

  const city = 'Los Angeles'
  const paragraphOne = "From pet-friendly beaches to hiking trails and outdoor cafes, there's no shortage of fun and memorable experiences for pet owners in the City of Angels. Many parks throughout Los Angeles have designated off-leash areas where your pet can romp and socialize with other dogs, such as Runyon Canyon and Laurel Canyon Dog Park."

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
      <title>Pet Friendly Hotels Los Angeles, CA | Romingo</title>
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
            For some beach fun, head to Rosie&apos;s Dog Beach in Long Beach, the only off-leash dog beach in LA County. If you want to dine out with your pet, numerous restaurants with outdoor seating welcome furry friends, ensuring you can enjoy delicious meals without leaving your four-legged companion behind.
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
              <LargeFilterBar city={laSearchData} />
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
            Additionally, many hotels and vacation rentals in Los Angeles are pet-friendly, ensuring a comfortable and welcoming stay for you and your pet. With an abundance of pet-friendly options and a warm and inviting atmosphere, Los Angeles is the perfect destination for a pet-friendly vacation where you can create cherished memories with your beloved furry friend.
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
          mt="1rem"
          width='100%'
          display='flex'
          flexDirection='column'
          gap='1.5rem'
        >
          <Divider />
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Los Angeles</Typography>
        

    
          <Bold text="The Kimpton Hotel Palomar" />
          {/* <SingleLoadListingCard hotelName="The Kimpton Hotel Palomar" />*/}
          <Text text="The Kimpton Hotel Palomar Los Angeles is a sophisticated and stylish boutique hotel situated in the vibrant neighborhood of Beverly Hills. As part of the renowned Kimpton Hotels & Restaurants group, this chic hotel embraces the brand's signature warmth and hospitality. As part of the renowned Kimpton Hotels & Restaurants group, this chic hotel embraces the brand's signature warmth and hospitality." />
          <Text text="With its prime location near Rodeo Drive and other famous attractions, The Kimpton Hotel Palomar Los Angeles promises a luxurious and unforgettable stay for travelers seeking a chic and contemporary escape in the heart of Beverly Hills." />
          <Text text="The Kimpton welcomes pets with open arms and allows you to bring as many pets as you want in all sizes for no extra fees. Your pets will receive goodies upon arriving too, such as bowls, treats, and bags." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop pool', 'Fitness center', 'On-site dining options', 'Social hour', 'Bike rentals', 'Yoga mats']}
          />

          
          <Bold text="Loews Hollywood Hotel" />
          <SingleLoadListingCard hotelName="100402716" />
          <Text text="Loews Hollywood Hotel is a glamorous and contemporary retreat located at the epicenter of Hollywood, California. Situated in the heart of the entertainment capital, this upscale hotel offers a prime location for guests looking to immerse themselves in the glitz and glamour of Tinseltown. The guest rooms and suites are designed with modern amenities and have breathtaking views of the Hollywood Hills." />
          <Text text="With its proximity to famous attractions like the Hollywood Walk of Fame and the Dolby Theatre, Loews Hollywood Hotel promises an unforgettable and star-studded stay for visitors seeking an upscale and glamorous escape in the heart of Hollywood." />
          <Text text="Loews is a pet-friendly hotel that allows you to bring two pets under 75 pounds each with an additional fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Spa services', 'On-site dining']}
          />

          <Bold text="The London West Hollywood" />
          <SingleLoadListingCard hotelName="100428778" />
          <Text text="Perched at the crossroads of West Hollywood and Beverly Hills, The London West Hollywood is a chic and contemporary hotel that epitomizes Hollywood glamour. Boasting stunning views of the Los Angeles skyline, this luxurious hotel offers an upscale and sophisticated experience for guests seeking the ultimate California dream. The hotel's prime location near the Sunset Strip and iconic Hollywood landmarks makes it an ideal destination for exploring the city's vibrant nightlife and attractions." />
          <Text text="The London West Hollywood is a pet-friendly hotel, extending its hospitality to furry companions with specialized amenities and services. When staying here, you can bring one pet under 30 pounds with an additional fee of $100 plus $20 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop pool', 'Fitness center', 'Spa services', 'Business center']}
          />

         

          <Bold text="The Langham Huntington, Pasadena" />
          <SingleLoadListingCard hotelName="100132008" />
          <Text text="Nestled amidst 23 acres of lush gardens and scenic landscapes in Pasadena, California, The Langham Huntington is an exquisite luxury hotel that exudes timeless elegance and sophistication. Originally constructed in 1907, this historic landmark has been meticulously restored to its former glory, offering a luxurious retreat for discerning travelers. The guest rooms and suites are opulently designed, featuring modern amenities and lavish touches, providing a sumptuous haven for relaxation." />
          <Text text="The Langham Huntington warmly welcomes pets, providing a pet-friendly experience that includes pet beds, food bowls, and treats for furry companions. Pets must be under 20 pounds and there is an additional fee of $250." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa services', 'Fitness center', 'Outdoor pool', 'Business center']}
          />

          <Bold text="The Westin Bonaventure Hotel & Suites" />
          {/*<SingleLoadListingCard hotelName="The Westin Bonaventure Hotel & Suites" />*/}
          <Text text="The Westin Bonaventure Hotel & Suites is an iconic and modern hotel that stands tall among the city's skyline. This architectural masterpiece offers a perfect blend of sophistication and comfort, making it a popular choice for both business and leisure travelers. The guest rooms and suites are elegantly appointed, providing a relaxing and contemporary sanctuary with stunning city views." />
          <Text text="With its central location, excellent service, and pet-friendly policy, The Westin Bonaventure Hotel & Suites offers a remarkable and memorable stay for travelers seeking a convenient and comfortable experience in the bustling city of Los Angeles." />
          <Text text="Pets are welcome to stay with you at The Westin Bonaventure Hotel & Suites. You can have one pet in your room that weighs up to 40 pounds for an additional fee of $45 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site dining options', 'Rooftop pool', 'Business center']}
          />

          <Bold text="Fairmont Miramar Hotel & Bungalows" />
          {/*<SingleLoadListingCard hotelName="Fairmont Miramar Hotel & Bungalows" />*/}
          <Text text="The Fairmont Miramar Hotel & Bungalows is an exquisite oasis that exudes luxury and tranquility. This iconic hotel offers a perfect blend of modern elegance and timeless charm, providing an unforgettable experience for discerning travelers. The guest rooms and bungalows are elegantly appointed, offering sweeping views of the Pacific Ocean or the lush gardens." />
          <Text text="Fairmont Miramar Hotel & Bungalows promises an idyllic and memorable stay in Santa Monica, where guests can immerse themselves in the epitome of coastal elegance and sophistication." />
          <Text text="You're welcome to bring your pets to this hotel for an additional $100 cleaning fee per pet, per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Large pool area', 'Fitness center', 'Spa services', 'Multiple dining options']}
          />

          <Typography variant="h2">The Top Pet-Friendly Activities in Los Angeles</Typography>
          <LinkContent
            link="https://www.laparks.org/runyon/"
            linkText="Runyon Canyon Park"
            text="One of LA's most popular dog-friendly hiking spots, Runyon Canyon offers scenic trails with breathtaking views of the city. Leash up your pup and enjoy a refreshing hike together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image3.png" text="" />

          <LinkContent
            link="https://www.surfcityusa.com/things-to-do/beaches/dog-beach/"
            linkText="Huntington Dog Beach"
            text="Located in Long Beach, this off-leash dog beach is a paw-some spot for your pet to splash in the waves and socialize with other dogs."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image4.png" text="Surf City USA" />

          <LinkContent
            link="https://griffithobservatory.org/"
            linkText="Griffith Observatory"
            text="Take a leashed stroll to the Griffith Observatory and enjoy sweeping views of Los Angeles. Your pet will love the fresh air and open spaces around this iconic landmark."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image7.png" text="Griffith Observatory" />

          <LinkContent
            link="https://farmersmarketla.com/"
            linkText="The Original Farmers Market"
            text="Visit this historic market in LA's Fairfax District, where your leashed pet is welcome to explore the outdoor dining areas and pet-friendly stores."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image14.png" text="The Original Farmer’s Market" />

          <LinkContent
            link="http://www.parks.ca.gov/?page_id=614"
            linkText="Malibu Creek State Park"
            text="This picturesque park offers scenic trails and open spaces, perfect for a leisurely walk or a picnic with your furry companion."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image9.png" text="Malibu Creek State Park" />

          <LinkContent
            link="https://www.californiabeaches.com/beach/granada-beach-rosies-dog-beach/"
            linkText="Rosie's Dog Beach"
            text="Located in Long Beach, this dog beach is a paradise for dogs who love to swim. Your pet can frolic in the surf and play in the sand off-leash."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image20.png" text="California Beaches" />

          <LinkContent
            link="https://www.thedogbakery.com/"
            linkText="The Dog Bakery"
            text="Treat your pet to some delicious goodies at The Dog Bakery, a specialty pet store with a variety of treats and accessories for your furry friend."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image16.png" text="The Dog Bakery" />

          <LinkContent
            link="https://www.getty.edu/visit/center/"
            linkText="The Getty Center"
            text="Enjoy art and culture with your pet at The Getty Center's beautiful gardens, where leashed dogs are allowed to roam with their owners."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image15.png" text="Getty" />

          <LinkContent
            link="https://www.laparks.org/dogpark/silverlake"
            linkText="Silver Lake Dog Park"
            text="This spacious off-leash dog park in the trendy Silver Lake neighborhood is a fantastic place for your pet to run and play with other dogs. You’ll even catch a sighting of the Hollywood sign!"
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image10.png" text="LA Parks" />

          <LinkContent
            link="https://www.laparks.org/park/elysian"
            linkText="Elysian Park"
            text="The oldest public park in LA, Elysian Park offers tranquil walking paths and beautiful views of the city, perfect for an on-leash stroll with your pet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image13.png" text="LA Parks" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Los Angeles</Typography>
          <LinkContent
            link="https://www.morrisonrestaurant.com/"
            linkText="The Morrison"
            text="Located in Atwater Village, The Morrison boasts a pet-friendly patio where you can enjoy delicious comfort food and craft beers while your furry friend lounges beside you."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image17.png" text="The Morrison" />

          <LinkContent
            link="https://lazydogrestaurants.com/"
            linkText="Lazy Dog Restaurant & Bar"
            text="Lazy Dog Restaurant & Bar in Los Angeles is a beloved eatery that warmly welcomes both two-legged and four-legged guests. Inspired by the owner's love for his Golden Retriever, the restaurant aims to create a relaxing and comfortable atmosphere where patrons can enjoy delicious food and drinks while their pets are equally cherished."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image8.png" text="Lazy Dog Restaurant & Bar" />

          <LinkContent
            link="https://cafegratitude.com/"
            linkText="Café Gratitude"
            text="Café Gratitude in Los Angeles is a popular plant-based restaurant that delights both vegans and non-vegans alike with its delicious and nourishing dishes. The restaurant's focus on gratitude and sustainability shines through in its thoughtfully prepared menu, featuring a variety of flavorful and wholesome options made from organic and locally sourced ingredients."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image6.png" text="Cafe Gratitude" />

          <LinkContent
            link="https://www.thetrailseatery.com/"
            linkText="The Trails Café"
            text="Nestled in Griffith Park, this charming café is a favorite among hikers and their pets. Enjoy a light breakfast or a tasty lunch on their pet-friendly patio before hitting the trails."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image12.png" text="The Trails Cafe" />

          <LinkContent
            link="https://www.blueplateoysterette.com/"
            linkText="Blue Plate Oysterette"
            text="Blue Plate Oysterette is a coastal-inspired seafood restaurant located in Santa Monica, California. With its beachy vibe and fresh seafood offerings, this eatery captures the essence of the Southern California coastal lifestyle. From oysters and seafood platters to tasty tacos and sandwiches, Blue Plate Oysterette promises a delightful dining experience with a taste of the ocean in the heart of Santa Monica."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image18.png" text="Blue Plate Oysterette" />

          <LinkContent
            link="https://www.goldenroad.la/"
            linkText="Golden Road Brewing"
            text="Golden Road Brewing in Los Angeles is a renowned craft brewery that has made a significant impact on the city's craft beer scene. Founded in 2011, Golden Road Brewing quickly gained popularity for its wide range of high-quality and innovative beers. The brewery's spacious and vibrant beer garden is a favorite spot for locals and visitors alike to gather, enjoy a variety of craft beers, and savor delicious bites from the on-site kitchen."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image1.png" text="Golden Road Brewing" />

          <LinkContent
            link="https://www.thefatdogla.com/"
            linkText="The Fat Dog"
            text="The Fat Dog in Los Angeles is a popular gastropub that offers a relaxed and laid-back atmosphere. With its dog-friendly patio and welcoming ambiance, this eatery is a favorite spot for pet owners looking to enjoy a delicious meal with their furry companions. The menu features a variety of mouthwatering dishes and a wide selection of craft beers, making The Fat Dog a great place to unwind and savor good food and drinks in the company of friends, both human and canine."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image2.png" text="The Fat Dog" />

          <LinkContent
            link="https://www.bluedaisycafe.com/"
            linkText="Blue Daisy Café"
            text="This charming café in Santa Monica offers pet-friendly outdoor seating. Savor Mediterranean-inspired dishes and artisanal coffee while your pet enjoys the pleasant surroundings."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image19.png" text="Blue Daisy Cafe" />

          <LinkContent
            link="https://www.figarobistrotla.com/"
            linkText="Figaro Bistrot"
            text="Figaro Bistrot is a charming and authentic French restaurant located in the trendy Los Feliz neighborhood of Los Angeles. With its vintage-inspired décor and classic French bistro dishes, this eatery offers a delightful taste of Parisian cuisine in the heart of LA. Whether you're savoring a croissant during breakfast or enjoying coq au vin for dinner, Figaro Bistrot provides a warm and inviting ambiance that transports guests to the streets of Paris."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image5.png" text="Figaro Bistrot" />

          <LinkContent
            link="https://www.ettarestaurant.com/"
            linkText="Etta"
            text="Etta is an affordable neighborhood restaurant that serves delicious wood-fired food. Centered around the wood-fired hearth, their expert culinary team peppers each menu with their favorite seasonal dishes that are meticulously crafted so you always get a top-notch culinary experience."
          />
          <Text text="From crave-worthy pizza and warm focaccia, to fresh, crisp seasonal salads to family-style shared pig and lobster picnics, Etta has something for everyone. Just as the kitchen is the focal point of interaction within a home, Etta’s open kitchen design gives guests that same intimate experience." />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Los%20Angeles/image11.png" text="Etta" />

        </Box>


        
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden mdDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar city={laSearchData} />
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

export default LosAngeles;
