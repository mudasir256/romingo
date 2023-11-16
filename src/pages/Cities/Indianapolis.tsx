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
    "description": "Indianapolis, IN, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        }
    ],
    "place_id": "ChIJA2p5p_9Qa4gRfOq5QPadjtY",
    "reference": "ChIJA2p5p_9Qa4gRfOq5QPadjtY",
    "structured_formatting": {
        "main_text": "Indianapolis",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "IN, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Indianapolis"
        },
        {
            "offset": 14,
            "value": "IN"
        },
        {
            "offset": 18,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 39.768403,
"lng": -86.158068
}

const Indianapolis: FC = () => {


  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Indianapolis');

  const city = 'Indianapolis'
  const paragraphOne = "If you're a pet owner looking to explore the vibrant city of Indianapolis, you're in for a treat as the city warmly embraces pet-friendly travel! Indianapolis boasts a myriad of pet-friendly accommodations, making it easy to find comfortable and welcoming lodgings for you and your furry companion. From charming boutique hotels to cozy motels and vacation rentals, there's something to suit every budget and preference. Once you've settled in, you'll discover a plethora of pet-friendly attractions and activities to enjoy together."

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
      <title>Pet Friendly Hotels Indianapolis, IN | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, IN | Romingo`}
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
          INDIANA
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
          maxWidth="900px"
          gap='1.5rem'
        >

          <Typography component="h2" variant="h2"> The Top Pet Friendly Accommodations in Indianapolis</Typography>
          <Text text="Take a leisurely stroll through the picturesque White River State Park, where leashed pets are welcome to explore the scenic trails. For a dose of history and culture, head to the Indiana War Memorial Plaza, where leashed pets can accompany you on a fascinating journey through the state&apos;s past. Don&apos;t miss out on the dog parks sprinkled throughout the city, where your four-legged friend can socialize and play freely. And when hunger strikes, Indianapolis&apos; pet-friendly cafes and restaurants are more than happy to accommodate you both. " />

    

          <SingleLoadListingCard 
            hotelName="100016136" 
            paragraphs={[
              "The Alexander, located in the heart of downtown Indianapolis, stands as a contemporary and sophisticated urban retreat that seamlessly blends modern design with artistic flair. This upscale hotel offers a unique fusion of luxury and culture, boasting thoughtfully curated interiors adorned with local artwork that reflect the city's vibrant spirit.",
              //"With its commitment to showcasing Indianapolis' artistic community, the hotel hosts art installations and events, contributing to a dynamic atmosphere that extends beyond its walls. Whether indulging in gourmet dining, relaxing by the rooftop pool, or exploring nearby attractions, The Alexander invites guests to immerse themselves in the city's evolving landscape while enjoying an unparalleled level of comfort and sophistication.",
              "The Alexander is pet-friendly and allows you to bring two dogs that weigh up to 75 pounds for a fee of $50 per dog, per stay."
            ]}
          />

          <SingleLoadListingCard 
            hotelName="100076768" 
            paragraphs={[
              "The Omni Severin Hotel, nestled in the heart of downtown Indianapolis, stands as a timeless and elegant destination that captures the essence of the city's rich history and modern vitality. This historic luxury hotel seamlessly blends classic charm with contemporary comfort, offering guests a refined and welcoming experience.",
              //"Guests can easily explore Indianapolis' cultural attractions, dining scene, and entertainment options. The Omni Severin Hotel's historic significance and dedication to providing a superior hospitality experience make it a true gem in the urban landscape, inviting travelers to immerse themselves in the best that Indianapolis has to offer.",
              "The Omni Severin Hotel is pet-friendly and allows you to bring pets that weigh 25 pounds or less for a $125 fee per stay."
            ]}
          />
        
          <SingleLoadListingCard 
            hotelName="100802681" 
            paragraphs={[
              "The Hyatt House Indianapolis/Downtown stands as a beacon of comfort and convenience in the heart of the city, offering a seamless blend of modern living and exceptional hospitality. ",
              //"With its contemporary design and spacious suites, this extended-stay hotel provides a home away from home for both leisure and business travelers. The well-equipped suites feature kitchenettes and separate living areas, catering to guests seeking comfort and flexibility during their stay. ",
              "The Hyatt House Indianapolis/Downtown is pet-friendly and allows you to bring up to two dogs with a combined weight less than 75 pounds. When staying 1-6 days, there is a $75 fee; when staying 7-30 days, there is an additional $100 deep cleaning fee."
            ]}
          />
       

          <SingleLoadListingCard 
            hotelName="100183596" 
            paragraphs={[
              "Nestled in the heart of Indianapolis, the Home2 Suites by Hilton Indianapolis Downtown offers a refreshing take on modern hospitality. This extended-stay hotel combines comfort and functionality, providing travelers with spacious suites that feature separate living areas and fully-equipped kitchens. ",
              //"Its central location provides easy access to the city's attractions, making the Home2 Suites an ideal base for exploring the dynamic energy and cultural offerings of downtown Indianapolis. With suites featuring fully-equipped kitchens, it's easy to maintain a comfortable routine for both you and your pet during your stay.",
              "Home2 Suites by Hilton Indianapolis Downtown is pet-frienly and allows you to bring two pets with you during your stay. When staying 1-4 days, there is a $75 fee; when staying more than 5 nights, the fee is $125."
            ]}
          />

          <SingleLoadListingCard 
            hotelName="100202748" 
            paragraphs={[
              "The Ironworks Hotel Indy stands as a luxurious and captivating escape in the vibrant city of Indianapolis. This boutique hotel effortlessly blends industrial charm with modern elegance, offering guests a unique and memorable experience. ",
             // "Situated within the Ironworks at Keystone, a mixed-use development featuring retail, dining, and entertainment options, the hotel offers a seamless blend of convenience and leisure. Whether indulging in gourmet dining, relaxing by the rooftop pool, or exploring the nearby attractions, the Ironworks Hotel Indy invites guests to immerse themselves in the city's eclectic culture.",
              "Ironworks Hotel Indy is pet-friendly and allows you to bring two pets of any size for a fee of $20 per night."
            ]}
          />


          <SingleLoadListingCard 
            hotelName="100003102" 
            paragraphs={[
              "The Westin Indianapolis stands as a modern oasis of comfort and refinement in the heart of downtown. With its sleek and contemporary design, this upscale hotel offers a sanctuary for both business and leisure travelers. ",
             // "Situated within close proximity to the city's landmarks, dining, and entertainment options, The Westin Indianapolis ensures that guests can easily explore the dynamic energy of the city while enjoying the superior service and comfort that the Westin brand is known for. Whether attending a conference or exploring the cultural attractions, the hotel offers a seamless fusion of convenience and luxury.",
              "The Westin Indianapolis is pet-friendly and allows you to bring two pets weighing up to 40 pounds for no additional fee."
            ]}
          />
        
  
          <Typography variant="h2">The Top Pet-Friendly Activities in Indianapolis</Typography>
 
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
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/White%20River.jpeg',
                  component: (
                    <LinkContent
                      link="https://whiteriverstatepark.org/"
                      linkText="White River State Park"
                      text="Treat your four-legged friend to a leisurely stroll through the scenic White River State Park. This expansive urban park offers picturesque walking trails, lush green spaces, and stunning views of the White River. Dogs must be leashed, and there are plenty of pet waste stations for easy clean-up."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/Eagle%20Creek.jpeg',
                  component: (
                    <LinkContent
                      link="https://eaglecreekpark.org/"
                      linkText="Eagle Creek Park"
                      text="Explore the great outdoors at Eagle Creek Park, one of the largest municipal parks in the country. This vast park features several pet-friendly trails, including the Eagle Creek Reservoir Loop, where your dog can enjoy the sights and sounds of nature."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/Cultural%20Trail.jpeg',
                  component: (
                    <LinkContent
                      link="https://indyculturaltrail.org/"
                      linkText="Indianapolis Cultural Trail"
                      text="For an urban adventure, head to the Indianapolis Cultural Trail, a 8-mile-long pedestrian and bike pathway that winds through the city. Leashed pets are welcome, and the trail connects several cultural districts, parks, and landmarks."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/Holliday%20Park.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.hollidaypark.org/"
                      linkText="Holliday Park"
                      text="Treat your pet to a day of fun at Holliday Park. This 94-acre park offers designated off-leash areas where your furry friend can romp and play with other dogs. Explore the scenic trails and don't miss the picturesque Ruins, perfect for a photo op!"
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image1.png',
                  component: (
                    <LinkContent
                      link="https://www.indycm.com/"
                      linkText="Indianapolis City Market"
                      text="Visit the historic Indianapolis City Market and enjoy a pet-friendly culinary experience. Many of the outdoor seating areas at the market's eateries allow well-behaved dogs to accompany their owners while they indulge in delicious food."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image17.png',
                  component: (
                    <LinkContent
                      link="https://www.indy.gov/activity/find-a-dog-park"
                      linkText="Broad Ripple Bark Park"
                      text="For some off-leash playtime, head to Broad Ripple Bark Park. This dog park features separate areas for small and large dogs, ensuring a safe and enjoyable environment for all furry visitors."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/Indiana%20World%20War%20Memorial.jpg',
                  component: (
                    <LinkContent
                      link="https://www.in.gov/iwm/"
                      linkText="Indiana War Memorial Plaza"
                      text="Take a step back in history at the Indiana War Memorial Plaza. Leashed pets are welcome to join you as you explore the beautiful monuments and memorials in this historic area."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/Fort%20Harrison%20State%20Park.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.in.gov/dnr/state-parks/parks-lakes/fort-harrison-state-park/"
                      linkText="Fort Harrison State Park"
                      text="Venture to Fort Harrison State Park and enjoy a day of outdoor recreation with your pet. The park offers various pet-friendly trails, and you can even rent a canoe or paddleboat to explore the park's lake together."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image2.png',
                  component: (
                    <LinkContent
                      link="https://www.pintspoundsandpate.com/travelingtheusandcanada/fountain-square-indianapolis"
                      linkText="Fountain Square"
                      text="Explore the trendy Fountain Square neighborhood, known for its eclectic shops, art galleries, and eateries. Many of the outdoor patios and sidewalk cafes welcome well-behaved pets, making it a paw-some spot for an afternoon outing."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image4.png',
                  component: (
                    <LinkContent
                      link="https://www.visitindy.com/listing/canal-walk/5925/"
                      linkText="Indianapolis Canal Walk"
                      text="Embark on a scenic walk along the Indianapolis Canal Walk. Leashed pets are allowed, and you and your furry companion can enjoy the beautiful canal views, public art installations, and nearby attractions."
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

          
        



          <Typography variant="h2">The Top Pet-Friendly Restaurants in Indianapolis</Typography>
          
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
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image8.png',
                  component: (
                    <LinkContent
                      link="https://www.indycm.com/tomlinson-tap-room/"
                      linkText="Tomlinson Tap Room"
                      text="Located within the historic City Market, Tomlinson Tap Room is a must-visit for craft beer enthusiasts and their canine companions. This cozy spot offers a vast selection of locally brewed beers, and your furry friend can join you in the outdoor seating area."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/Metazoa.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.metazoabrewing.com/"
                      linkText="Metazoa Brewing Company"
                      text="This pet-friendly brewery is dedicated to supporting animal-related causes, making it a perfect spot for pet lovers. Metazoa Brewing boasts a spacious outdoor patio where your furry companion can relax while you sample a wide range of craft beers."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image7.png',
                  component: (
                    <LinkContent
                      link="https://thegardentable.com/massave"
                      linkText="The Garden Table"
                      text="The Garden Table is a health-conscious eatery that offers an array of fresh and organic dishes. This pet-friendly restaurant has a charming outdoor patio, making it an ideal spot for brunch or a healthy lunch with your furry friend by your side."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/Union%2050.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.union-50.com/"
                      linkText="Union 50"
                      text="If you're craving contemporary American cuisine and a vibrant atmosphere, Union 50 won't disappoint. This restaurant has a pet-friendly outdoor patio, where your well-behaved dog can enjoy the sights and sounds of the bustling Mass Ave."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image20.png',
                  component: (
                    <LinkContent
                      link="https://www.broadripplebrewpub.com/"
                      linkText="Broad Ripple Brewpub"
                      text="Indiana's first brewpub, Broad Ripple Brewpub, has been a local favorite since 1990. Their pet-friendly outdoor seating area welcomes dogs to relax while you indulge in classic pub fare and a selection of their own handcrafted brews."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/One%20Bite.jpeg',
                  component: (
                      <LinkContent
                        link="https://www.goodfellaspizzeria.com/mass-ave"
                        linkText="Goodfellas Pizzeria"
                        text="Craving some pizza? Head to Goodfellas Pizzeria, where your furry friend is welcome to join you on the outdoor patio. Enjoy New York-style slices and specialty pies while your pup lounges comfortably at your feet."
                      />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/Books%20and%20Brew.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.booksnbrews.com/"
                      linkText="Books & Brews"
                      text="Books & Brews is a unique combination of a taproom and a used bookstore. Along with their extensive selection of beers, they serve sandwiches, salads, and appetizers. Your dog can join you on their pet-friendly patio while you browse through books or enjoy a board game."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image5.png',
                  component: (
                   <LinkContent
                     link="https://louvino.com/massave/"
                     linkText="LouVino"
                     text="If you're a wine enthusiast, LouVino is the perfect spot for a wine-tasting experience with your furry companion. This chic restaurant offers a pet-friendly patio, and their menu features a delectable selection of small plates and shareable dishes."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image19.png',
                  component: (
                   <LinkContent
                     link="https://www.biglugcanteen.com/"
                     linkText="Big Lug Canteen"
                     text="Big Lug Canteen in Indianapolis offers a delightful fusion of craft beer and comfort food, creating a warm and inviting space for locals and visitors alike. With a rotating selection of house-brewed beers and a menu featuring mouthwatering dishes, Big Lug Canteen provides a relaxed and flavorful dining experience in the heart of the city."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image14.png',
                  component: (
                    <LinkContent
                      link=""
                      linkText="Half Liter BBQ & Beer Hall"
                      text="For some finger-licking barbecue, visit Half Liter BBQ & Beer Hall, a pet-friendly restaurant with a fantastic outdoor seating area. Savor their mouthwatering barbecue delights while your canine friend enjoys the fresh air."
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

export default Indianapolis;
