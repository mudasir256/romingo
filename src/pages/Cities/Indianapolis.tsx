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

//TODO:
const searchData = {
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

const Indianapolis: FC = () => {

  //TODO:
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Los Angeles, CA');

  const city = 'Indianapolis'
  const paragraphOne = "If you're a pet owner looking to explore the vibrant city of Indianapolis, you're in for a treat as the city warmly embraces pet-friendly travel! Indianapolis boasts a myriad of pet-friendly accommodations, making it easy to find comfortable and welcoming lodgings for you and your furry companion. From charming boutique hotels to cozy motels and vacation rentals, there's something to suit every budget and preference. Once you've settled in, you'll discover a plethora of pet-friendly attractions and activities to enjoy together."

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
            Take a leisurely stroll through the picturesque White River State Park, where leashed pets are welcome to explore the scenic trails. For a dose of history and culture, head to the Indiana War Memorial Plaza, where leashed pets can accompany you on a fascinating journey through the state's past. Don't miss out on the dog parks sprinkled throughout the city, where your four-legged friend can socialize and play freely. And when hunger strikes, Indianapolis' pet-friendly cafes and restaurants are more than happy to accommodate you both. 
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Cleveland</Typography>
        

    
          <Bold text="The Alexander" />
          <SingleLoadListingCard hotelName="100016136" />
          <Text text="The Alexander, located in the heart of downtown Indianapolis, stands as a contemporary and sophisticated urban retreat that seamlessly blends modern design with artistic flair. This upscale hotel offers a unique fusion of luxury and culture, boasting thoughtfully curated interiors adorned with local artwork that reflect the city's vibrant spirit." />
          <Text text="With its commitment to showcasing Indianapolis' artistic community, the hotel hosts art installations and events, contributing to a dynamic atmosphere that extends beyond its walls. Whether indulging in gourmet dining, relaxing by the rooftop pool, or exploring nearby attractions, The Alexander invites guests to immerse themselves in the city's evolving landscape while enjoying an unparalleled level of comfort and sophistication." />
          <Text text="The Alexander is pet-friendly and allows you to bring two dogs that weigh up to 75 pounds for a fee of $50 per dog, per stay." />
         
          <Bold text="Omni Severin Hotel" />
          <SingleLoadListingCard hotelName="100076768" />
          <Text text="The Omni Severin Hotel, nestled in the heart of downtown Indianapolis, stands as a timeless and elegant destination that captures the essence of the city's rich history and modern vitality. This historic luxury hotel seamlessly blends classic charm with contemporary comfort, offering guests a refined and welcoming experience." />
          <Text text="Guests can easily explore Indianapolis' cultural attractions, dining scene, and entertainment options. The Omni Severin Hotel's historic significance and dedication to providing a superior hospitality experience make it a true gem in the urban landscape, inviting travelers to immerse themselves in the best that Indianapolis has to offer." />          
          <Text text="The Omni Severin Hotel is pet-friendly and allows you to bring pets that weigh 25 pounds or less for a $125 fee per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Indoor pool', 'On-site dining options', 'On-site bar options', 'Fitness center', 'Business center']}
          />

          <Bold text="Hyatt House Indianapolis/Downtown" />
          <SingleLoadListingCard hotelName="100802681" />
          <Text text="The Hyatt House Indianapolis/Downtown stands as a beacon of comfort and convenience in the heart of the city, offering a seamless blend of modern living and exceptional hospitality. " />
          <Text text="With its contemporary design and spacious suites, this extended-stay hotel provides a home away from home for both leisure and business travelers. The well-equipped suites feature kitchenettes and separate living areas, catering to guests seeking comfort and flexibility during their stay. " />
          <Text text="The Hyatt House Indianapolis/Downtown is pet-friendly and allows you to bring up to two dogs with a combined weight less than 75 pounds. When staying 1-6 days, there is a $75 fee; when staying 7-30 days, there is an additional $100 deep cleaning fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free breakfast', 'Free WiFi', 'Fitness center', 'On-site dining options', 'Business center', 'Pool']}
          />

          <Bold text="Home2 Suites by Hilton Indianapolis Downtown" />
          <SingleLoadListingCard hotelName="100183596" />
          <Text text="Nestled in the heart of Indianapolis, the Home2 Suites by Hilton Indianapolis Downtown offers a refreshing take on modern hospitality. This extended-stay hotel combines comfort and functionality, providing travelers with spacious suites that feature separate living areas and fully-equipped kitchens. " />
          <Text text="Its central location provides easy access to the city's attractions, making the Home2 Suites an ideal base for exploring the dynamic energy and cultural offerings of downtown Indianapolis. With suites featuring fully-equipped kitchens, it's easy to maintain a comfortable routine for both you and your pet during your stay." />
          <Text text="Home2 Suites by Hilton Indianapolis Downtown is pet-frienly and allows you to bring two pets with you during your stay. When staying 1-4 days, there is a $75 fee; when staying more than 5 nights, the fee is $125." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free breakfast', 'Fitness center', 'Business center', 'Pool']}
          />

          <Bold text="Ironworks Hotel Indy" />
          <SingleLoadListingCard hotelName="100202748" />
          <Text text="The Ironworks Hotel Indy stands as a luxurious and captivating escape in the vibrant city of Indianapolis. This boutique hotel effortlessly blends industrial charm with modern elegance, offering guests a unique and memorable experience. " />
          <Text text="Situated within the Ironworks at Keystone, a mixed-use development featuring retail, dining, and entertainment options, the hotel offers a seamless blend of convenience and leisure. Whether indulging in gourmet dining, relaxing by the rooftop pool, or exploring the nearby attractions, the Ironworks Hotel Indy invites guests to immerse themselves in the city's eclectic culture." />
          <Text text="Ironworks Hotel Indy is pet-friendly and allows you to bring two pets of any size for a fee of $20 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free WiFi', 'Fitness center', 'Free self-parking', 'Free coffee service', 'On-site dining options', 'On-site bar options']}
          />

          <Bold text="The Westin Indianapolis" />
          <SingleLoadListingCard hotelName="100003102" />
          <Text text="The Westin Indianapolis stands as a modern oasis of comfort and refinement in the heart of downtown. With its sleek and contemporary design, this upscale hotel offers a sanctuary for both business and leisure travelers. " />
          <Text text="Situated within close proximity to the city's landmarks, dining, and entertainment options, The Westin Indianapolis ensures that guests can easily explore the dynamic energy of the city while enjoying the superior service and comfort that the Westin brand is known for. Whether attending a conference or exploring the cultural attractions, the hotel offers a seamless fusion of convenience and luxury." />
          <Text text="The Westin Indianapolis is pet-friendly and allows you to bring two pets weighing up to 40 pounds for no additional fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Fitness center', 'Convenience store', 'Dry cleaning services']}
          />

  
          <Typography variant="h2">The Top Pet-Friendly Activities in Indianapolis</Typography>
 
          <LinkContent
            link="https://whiteriverstatepark.org/"
            linkText="White River State Park"
            text="Treat your four-legged friend to a leisurely stroll through the scenic White River State Park. This expansive urban park offers picturesque walking trails, lush green spaces, and stunning views of the White River. Dogs must be leashed, and there are plenty of pet waste stations for easy clean-up."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image9.png" text="Life in Indy" />

          <LinkContent
            link="https://eaglecreekpark.org/"
            linkText="Eagle Creek Park"
            text="Explore the great outdoors at Eagle Creek Park, one of the largest municipal parks in the country. This vast park features several pet-friendly trails, including the Eagle Creek Reservoir Loop, where your dog can enjoy the sights and sounds of nature."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image6.png" text="Indystar" />

          <LinkContent
            link="https://indyculturaltrail.org/"
            linkText="Indianapolis Cultural Trail"
            text="For an urban adventure, head to the Indianapolis Cultural Trail, a 8-mile-long pedestrian and bike pathway that winds through the city. Leashed pets are welcome, and the trail connects several cultural districts, parks, and landmarks."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image11.png" text="Visit Indy" />

          <LinkContent
            link="https://www.hollidaypark.org/"
            linkText="Holliday Park"
            text="Treat your pet to a day of fun at Holliday Park. This 94-acre park offers designated off-leash areas where your furry friend can romp and play with other dogs. Explore the scenic trails and don't miss the picturesque Ruins, perfect for a photo op!"
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image15.png" text="Holliday Park Foundation" />

          <LinkContent
            link="https://www.indycm.com/"
            linkText="Indianapolis City Market"
            text="Visit the historic Indianapolis City Market and enjoy a pet-friendly culinary experience. Many of the outdoor seating areas at the market's eateries allow well-behaved dogs to accompany their owners while they indulge in delicious food."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image1.png" text="Visit Indy" />

          <LinkContent
            link="https://www.indy.gov/activity/find-a-dog-park"
            linkText="Broad Ripple Bark Park"
            text="For some off-leash playtime, head to Broad Ripple Bark Park. This dog park features separate areas for small and large dogs, ensuring a safe and enjoyable environment for all furry visitors."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image17.png" text="Wag!" />

          <LinkContent
            link="https://www.in.gov/iwm/"
            linkText="Indiana War Memorial Plaza"
            text="Take a step back in history at the Indiana War Memorial Plaza. Leashed pets are welcome to join you as you explore the beautiful monuments and memorials in this historic area."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image3.png" text="Life In Indy" />

          <LinkContent
            link="https://www.in.gov/dnr/state-parks/parks-lakes/fort-harrison-state-park/"
            linkText="Fort Harrison State Park"
            text="Venture to Fort Harrison State Park and enjoy a day of outdoor recreation with your pet. The park offers various pet-friendly trails, and you can even rent a canoe or paddleboat to explore the park's lake together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image12.png" text="Visit Indiana" />

          <LinkContent
            link="https://www.pintspoundsandpate.com/travelingtheusandcanada/fountain-square-indianapolis"
            linkText="Fountain Square"
            text="Explore the trendy Fountain Square neighborhood, known for its eclectic shops, art galleries, and eateries. Many of the outdoor patios and sidewalk cafes welcome well-behaved pets, making it a paw-some spot for an afternoon outing."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image2.png" text="Visit Indy" />

          <LinkContent
            link="https://www.visitindy.com/listing/canal-walk/5925/"
            linkText="Indianapolis Canal Walk"
            text="Embark on a scenic walk along the Indianapolis Canal Walk. Leashed pets are allowed, and you and your furry companion can enjoy the beautiful canal views, public art installations, and nearby attractions."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image4.png" text="Visit Indy" />


          <Typography variant="h2">The Top Pet-Friendly Restaurants in Indianapolis</Typography>
      
          <LinkContent
            link="https://www.indycm.com/tomlinson-tap-room/"
            linkText="Tomlinson Tap Room"
            text="Located within the historic City Market, Tomlinson Tap Room is a must-visit for craft beer enthusiasts and their canine companions. This cozy spot offers a vast selection of locally brewed beers, and your furry friend can join you in the outdoor seating area."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image8.png" text="Visit Indy" />
          <LinkContent
            link="https://www.metazoabrewing.com/"
            linkText="Metazoa Brewing Company"
            text="This pet-friendly brewery is dedicated to supporting animal-related causes, making it a perfect spot for pet lovers. Metazoa Brewing boasts a spacious outdoor patio where your furry companion can relax while you sample a wide range of craft beers."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image10.png" text="Metazoa Brewing Company" />

          <LinkContent
            link="https://thegardentable.com/massave"
            linkText="The Garden Table"
            text="The Garden Table is a health-conscious eatery that offers an array of fresh and organic dishes. This pet-friendly restaurant has a charming outdoor patio, making it an ideal spot for brunch or a healthy lunch with your furry friend by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image7.png" text="The Garden Table" />

          <LinkContent
            link="https://www.union-50.com/"
            linkText="Union 50"
            text="If you're craving contemporary American cuisine and a vibrant atmosphere, Union 50 won't disappoint. This restaurant has a pet-friendly outdoor patio, where your well-behaved dog can enjoy the sights and sounds of the bustling Mass Ave."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image16.png" text="Visit Indiana" />

          <LinkContent
            link="https://www.broadripplebrewpub.com/"
            linkText="Broad Ripple Brewpub"
            text="Indiana's first brewpub, Broad Ripple Brewpub, has been a local favorite since 1990. Their pet-friendly outdoor seating area welcomes dogs to relax while you indulge in classic pub fare and a selection of their own handcrafted brews."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image20.png" text="Visit Indy" />

          <LinkContent
            link="https://www.goodfellaspizzeria.com/mass-ave"
            linkText="Goodfellas Pizzeria"
            text="Craving some pizza? Head to Goodfellas Pizzeria, where your furry friend is welcome to join you on the outdoor patio. Enjoy New York-style slices and specialty pies while your pup lounges comfortably at your feet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image13.png" text="One Bite" />

          <LinkContent
            link="https://www.booksnbrews.com/"
            linkText="Books & Brews"
            text="Books & Brews is a unique combination of a taproom and a used bookstore. Along with their extensive selection of beers, they serve sandwiches, salads, and appetizers. Your dog can join you on their pet-friendly patio while you browse through books or enjoy a board game."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image18.png" text="Books & Brews" />

          <LinkContent
            link="https://louvino.com/massave/"
            linkText="LouVino"
            text="If you're a wine enthusiast, LouVino is the perfect spot for a wine-tasting experience with your furry companion. This chic restaurant offers a pet-friendly patio, and their menu features a delectable selection of small plates and shareable dishes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image5.png" text="Indy Star" />

          <LinkContent
            link="https://www.biglugcanteen.com/"
            linkText="Big Lug Canteen"
            text="Big Lug Canteen in Indianapolis offers a delightful fusion of craft beer and comfort food, creating a warm and inviting space for locals and visitors alike. With a rotating selection of house-brewed beers and a menu featuring mouthwatering dishes, Big Lug Canteen provides a relaxed and flavorful dining experience in the heart of the city."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image19.png" text="Big Lug Canteen" />

          <LinkContent
            link=""
            linkText="Half Liter BBQ & Beer Hall"
            text="For some finger-licking barbecue, visit Half Liter BBQ & Beer Hall, a pet-friendly restaurant with a fantastic outdoor seating area. Savor their mouthwatering barbecue delights while your canine friend enjoys the fresh air."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Indianapolis/image14.png" text="Half Liter BBQ & Beer Hall" />

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

export default Indianapolis;
