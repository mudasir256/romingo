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
  "city" :{
    "description": "Tucson, AZ, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        }
    ],
    "place_id": "ChIJK-0sC0Fl1oYRFccWTTgtw3M",
    "reference": "ChIJK-0sC0Fl1oYRFccWTTgtw3M",
    "structured_formatting": {
        "main_text": "Tucson",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "AZ, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Tucson"
        },
        {
            "offset": 8,
            "value": "AZ"
        },
        {
            "offset": 12,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 32.2539787,
"lng": -110.9741769
}

const Tucson: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Tucson, AZ');

  const city = 'Tucson'
  const paragraphOne = 'Tucson, Arizona, is a welcoming destination that embraces pet-friendly travel, offering a wealth of activities and accommodations for both two-legged and four-legged travelers. With its warm climate and abundant outdoor spaces, Tucson is a paradise for pets and their owners.'

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
      <title>Pet Friendly Hotels Tuson, AZ | Romingo</title>
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
            Many parks and trails in the city allow leashed pets, providing ample opportunities for leisurely walks and exploration of the stunning desert landscapes. For a taste of nature, take your furry friend to Sabino Canyon or Saguaro National Park, where leashed pets can enjoy the scenic trails. Tucson&apos;s pet-friendly restaurants and cafes ensure you can savor delicious meals while your pet relaxes on outdoor patios.
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
            <FilterBar city={searchData} />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            From hiking adventures to pet-friendly attractions, Tucson offers a pet-friendly paradise where you can create unforgettable memories with your beloved furry companion.
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
          <Typography component="h2" variant="h2">The Top Pet-Friendly Accommodations in Tucson</Typography>
          <Text text="Tucson, Arizona, is a captivating destination known for its breathtaking desert landscapes and warm hospitality. If you're planning a trip to this vibrant city and want to bring your beloved pet along, you're in luck! Tucson offers a variety of pet-friendly hotels that cater to both human and four-legged guests. From upscale resorts to cozy inns, here are six top-notch accommodations that will ensure a comfortable and enjoyable stay for both you and your furry companion." />


          <Bold text="Loews Ventana Canyon Resort" />
          <SingleLoadListingCard hotelName="100012644" />
          <Text text="Loews Ventana Canyon Resort is an exquisite desert retreat nestled amidst the majestic Catalina Mountains in Tucson, Arizona. This luxurious resort exudes a blend of Southwestern charm and modern elegance, providing an unforgettable experience for guests seeking a tranquil and upscale escape. The resort's stunning outdoor pools and cascading waterfalls create a serene ambiance, perfect for relaxation and indulgence." />
          <Text text="For pet owners, Loews Ventana Canyon Resort goes above and beyond, offering a range of pet amenities, including welcome packages, pet walking services, and specialized dining options. Guests can bring two pets of any size after paying a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Two golf courses', 'Full-service spa', 'Fitness center', 'Pet walking services', 'On-site dining options']}
          />

          <Bold text="Westward Look Wyndham Grand Resort & Spa" />
          <SingleLoadListingCard hotelName="100013582" />
          <Text text="Nestled amidst the natural beauty of the Sonoran Desert, the Westward Look Wyndham Grand Resort & Spa in Tucson, Arizona, is an enchanting oasis that offers a luxurious and tranquil escape. This historic resort, dating back to the late 19th century, seamlessly blends its rich heritage with modern amenities, providing an unforgettable experience for every guest." />
          <Text text="With its breathtaking surroundings, warm hospitality, and exceptional facilities, Westward Look Wyndham Grand Resort & Spa promises a remarkable and rejuvenating stay for travelers seeking an enchanting desert retreat." />
          <Text text="Westward Look Wyndham Grand Resort & Spa is also pet-friendly, ensuring that your furry companion can join in the adventure. You can bring two pets of any size for a fee of $75 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa services', 'Tennis courts', 'Three outdoor pools', 'Fitness center']}
          />

          <Bold text="La Quinta Inn & Suites Tucson Reid Park" />
          <SingleLoadListingCard hotelName="100036502" /> 
          <Text text="La Quinta Inn & Suites Tucson Reid Park is a welcoming and comfortable hotel located in Tucson, Arizona. Situated near the beautiful Reid Park and the Reid Park Zoo, the hotel offers a convenient location for both leisure and business travelers." />
          <Text text="With its affordable rates, convenient location, and pet-friendly atmosphere, La Quinta Inn & Suites Tucson Reid Park is an excellent choice for travelers looking for a budget-friendly and comfortable stay in Tucson." />
          <Text text="One of the standout features of this hotel is its pet-friendly policy, allowing guests to bring their furry companions along. You can bring two pets of any weight and size for a fee of $25 per pet, per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free breakfast', 'Outdoor pool', 'Fitness center']}
          />

          <Bold text="Sheraton Tucson Hotel & Suites" />
          <SingleLoadListingCard hotelName="100006790" />
          <Text text="The Sheraton Tucson Hotel & Suites is a delightful oasis located in the heart of Tucson, Arizona. This inviting hotel offers a blend of modern comforts and Southwestern charm. The guest rooms and suites are spacious and thoughtfully designed, offering a relaxing retreat after a day of exploration. The hotel boasts an array of amenities, including a heated outdoor pool, a fitness center, and a vibrant courtyard where guests can unwind and enjoy the pleasant Arizona weather." />
          <Text text="When you stay at Sheraton Tucson Hotel & Suites, you can bring one dog that weighs up to 40 pounds for $50 or $75 if your dog weighs over 40 pounds." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Heated outdoor pool', 'Courtyard for relaxing', 'Fitness center', 'Business center']}
          />

          <Bold text="Hotel Congress" />
          <SingleLoadListingCard hotelName="100193918" />
          <Text text="Hotel Congress is an iconic and historic landmark located in the heart of downtown Tucson, Arizona. Established in 1919, this boutique hotel exudes vintage charm and a vibrant atmosphere, making it a popular destination. The guest rooms are tastefully decorated, preserving the hotel's historic character while providing modern amenities for a comfortable stay." />
          <Text text="The hotel's unique personality extends beyond its accommodations, as it houses various entertainment venues, including the historic Club Congress, which hosts live music and events." />
          <Text text="Hotel Congress is pet-friendly and allows pets that weigh up to 80 pounds for a fee of $50 per pet for one night and an additional $25 per pet for each extra night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'On-site bars', 'Fitness center']}
          />

          <Bold text="Best Western Royal Sun Inn & Suites" />
          {/* <SingleLoadListingCard hotelName="" /> */}
          <Text text="The Best Western Royal Sun Inn & Suites is a charming and inviting hotel situated in the heart of Tucson, Arizona. With its warm hospitality and convenient location, this hotel is an ideal choice for both business and leisure travelers." />
          <Text text="The Best Western Royal Sun Inn & Suites is conveniently located near the University of Arizona, making it an excellent choice for parents visiting students or attendees of university events. With its friendly staff, comfortable accommodations, and central location, the Best Western Royal Sun Inn & Suites offers a pleasant and memorable stay for travelers seeking a comfortable and affordable experience in Tucson." />
          <Text text="When staying at this hotel, you are able to bring two pets that weigh up to 80 pounds for a fee of $30 per pet, per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Heated outdoor pool', 'Fitness center', 'Free breakfast daily']}
          />


          <Typography variant="h2">The Top Pet-Friendly Activities in Tucson</Typography>
          
          <LinkContent
            link="https://www.tucsonaz.gov/Departments/Parks-and-Recreation/Parks/Sentinel-Peak-Park"
            linkText="Sentinel Peak Park (A Mountain)"
            text='Take a hike up to Sentinel Peak, known as "A Mountain," and enjoy breathtaking views of Tucson&apos;s cityscape and surrounding mountains. This pet-friendly trail offers a rewarding experience for both you and your pup.'
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/Sentinel%20Peak%20.jpeg" text="https://www.knau.org/knau-and-arizona-news/2023-05-01/tucson-to-return-land-to-tohono-oodham-nation" />

          <LinkContent
            link="https://www.pima.gov/1292/Sweetwater-Preserve"
            linkText="Sweetwater Preserve"
            text="Explore the scenic trails of Sweetwater Preserve, where leashed dogs are welcome. The stunning desert landscapes and diverse flora will make this adventure unforgettable."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/Sweetwater%20Preserve.jpeg" text="https://www.phoenixmag.com/2022/01/09/sweetwater-preserve-hike-in-tucson/" />

          <LinkContent
            link="https://tucsonbotanical.org/"
            linkText="Tucson Botanical Gardens"
            text="On select days, the Tucson Botanical Gardens opens its doors to leashed pets, providing a serene and picturesque setting for a leisurely stroll."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image6.png" text="Tucson Botanical Gardens" />

          <LinkContent
            link="https://azstateparks.com/catalina"
            linkText="Catalina State Park"
            text="Venture to Catalina State Park, where leashed pets can accompany you on the various trails, including the picturesque Romero Canyon Trail."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image7.png" text="Catalina State Park" />

          <LinkContent
            link="https://www.pima.gov/1321/Brandi-Fenton-Memorial-Park"
            linkText="Brandi Fenton Memorial Park"
            text="This spacious park offers a designated dog park, allowing your furry friend to play off-leash and socialize with other dogs."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/Brandi%20Fenton%20Memorial%20Park%20.jpeg" text="https://localtucsonscene.wordpress.com/2012/08/06/brandi-fenton-tucson-park/" />

          <LinkContent
            link="https://mercadodistrict.com/"
            linkText="Mercado San Agustin"
            text="This lively marketplace welcomes pets on their outdoor patios, making it a perfect spot to enjoy a meal or a cup of coffee with your pet by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image11.png" text="Mercado San Agustin" />

          <LinkContent
            link="https://sabinocanyoncrawler.com/sabino-canyon-tours/"
            linkText="Sabino Canyon Recreation Area"
            text="Leash up your pup and head to Sabino Canyon for a scenic tram ride or hike along the beautiful trails. The fresh air and captivating views will leave you both invigorated."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image10.png" text="Sabino Canyon Crawler" />

          <LinkContent
            link="https://www.tucsonaz.gov/Departments/Parks-and-Recreation/Parks/Gene-C.-Reid-Park"
            linkText="Reid Park"
            text="Visit Reid Park and its adjoining Reid Park Zoo. While pets are not allowed inside the zoo, the park offers plenty of open spaces for your furry friend to enjoy."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/Reid%20Park.jpeg" text="https://en.wikipedia.org/wiki/Gene_C._Reid_Park" />

          <LinkContent
            link="https://www.pima.gov/1270/Santa-Cruz-River-Park"
            linkText="Santa Cruz River Park"
            text="Take a leisurely walk along the Santa Cruz River Park, a pet-friendly oasis with walking trails and beautiful river views."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/Santa%20Cruz%20River%20Park.jpeg" text="https://www.nps.gov/places/santa-cruz-river.htm" />

          <LinkContent
            link="https://www.tucsontopia.com/himmel-park/"
            linkText="Himmel Park"
            text="This charming neighborhood park provides a designated off-leash area where your pet can roam freely and burn off some energy."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image3.png" text="Tucsontopia" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Tucson</Typography>
          <LinkContent
            link=""
            linkText="The Coronet"
            text="With its pet-friendly courtyard, The Coronet offers a European-inspired ambiance where you can relish delectable cuisine and refreshing cocktails while your pet enjoys the outdoor surroundings."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image8.png" text="The Coronet" />

          <LinkContent
            link="https://barriobrewing.com/"
            linkText="Barrio Brewing Company"
            text="Enjoy craft beers and pub-style fare on Barrio Brewing Company's pet-friendly patio. Your pet will appreciate the laid-back atmosphere and the occasional treat from friendly staff."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image9.png" text="Barrio Brewing Company" />

          <LinkContent
            link="https://www.cafealacarttucson.com/"
            linkText="Café a la C'Art"
            text="Located in the Tucson Museum of Art, this pet-friendly restaurant offers an enchanting outdoor courtyard where you and your furry friend can enjoy a delightful meal surrounded by art and nature."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image14.png" text="Cafe a la C’art" />

          <LinkContent
            link="https://www.ghiniscafe.com/"
            linkText="Ghini's French Caffe"
            text="This cozy French café welcomes pets on their shaded patio. Indulge in delicious crepes and quiches while your pet relaxes by your feet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/Ghini's%20French%20Caffe%20.jpeg" text="https://tucsonfoodie.com/2021/03/02/must-try-dishes-ghinis-french-cafe/" />

          <LinkContent
            link="https://www.zinburgeraz.com/"
            linkText="Zinburger Wine & Burger Bar"
            text="Known for its mouthwatering burgers, Zinburger has a pet-friendly patio where you can enjoy a tasty meal while your furry friend lounges comfortably nearby."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image5.png" text="Zinburger Wine & Burger Bar" />

          <LinkContent
            link=""
            linkText="Tavolino Ristorante Italiano"
            text="Treat yourself to authentic Italian cuisine on Tavolino's pet-friendly patio. Savor handmade pasta dishes and fine wines while your pet enjoys the outdoor ambiance."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image13.png" text="Tavolino Ristorante Italiano" />

          <LinkContent
            link="https://www.beyondbread.com/"
            linkText="Beyond Bread"
            text="This pet-friendly bakery and café offer scrumptious sandwiches and pastries. Relax on the outdoor patio with your pet while enjoying the fresh air and delicious eats."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image4.png" text="Beyond Bread" />

          <LinkContent
            link="https://www.ermanosbrew.com/"
            linkText="Ermanos Craft Beer & Wine Bar"
            text="With a pet-friendly beer garden, Ermanos is the perfect spot to unwind with craft beers and tasty dishes while your pet enjoys the laid-back atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image15.png" text="Ermanos Craft Beer & Wine Bar" />

          <LinkContent
            link="https://www.prepandpastry.com/"
            linkText="Prep & Pastry"
            text="This brunch hotspot welcomes pets on its patio, offering a delicious selection of breakfast and lunch items for you to enjoy while your pet soaks in the morning sunshine."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image12.png" text="Prep & Pastry" />

          <LinkContent
            link="https://www.lo4th.com/"
            linkText="Lindy’s on 4th"
            text="Lindy's on 4th is a beloved institution nestled in the heart of a vibrant city, renowned for its mouthwatering burgers and lively atmosphere. As you approach the corner of 4th Street, the alluring aroma of sizzling beef wafts through the air, drawing you in like a magnet. The moment you step inside, you are greeted with the welcoming buzz of laughter and chatter from diners relishing their culinary delights. "
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Tucson/image19.png" text="Lindy's on 4th" />


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
            <FilterBar city={searchData} />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>;
};

export default Tucson;
