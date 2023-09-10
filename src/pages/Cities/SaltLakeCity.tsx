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
    "description": "Salt Lake City, UT, USA",
    "matched_substrings": [
        {
            "length": 14,
            "offset": 0
        }
    ],
    "place_id": "ChIJ7THRiJQ9UocRyjFNSKC3U1s",
    "reference": "ChIJ7THRiJQ9UocRyjFNSKC3U1s",
    "structured_formatting": {
        "main_text": "Salt Lake City",
        "main_text_matched_substrings": [
            {
                "length": 14,
                "offset": 0
            }
        ],
        "secondary_text": "UT, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Salt Lake City"
        },
        {
            "offset": 16,
            "value": "UT"
        },
        {
            "offset": 20,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 40.7607793,
"lng": -111.8910474
}

const SaltLakeCity: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Salt Lake City, UT');

  const city = 'Salt Lake City'
  const paragraphOne = 'Salt Lake City, Utah, is a pet-friendly destination that welcomes four-legged travelers with open arms. This beautiful city nestled amidst stunning mountains offers a variety of pet-friendly activities and accommodations, ensuring a memorable experience for both you and your furry companions. Enjoy a leisurely stroll with your pets in the pet-friendly parks and walking trails scattered throughout the city, such as Liberty Park and Memory Grove Park.'

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
      <title>Pet Friendly Hotels Salt Lake City, UT | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, UT | Romingo`}
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
          UTAH
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
            If you&apos;re up for an outdoor adventure, explore the pet-friendly hiking trails in the nearby canyons, such as Mill Creek Canyon or Big Cottonwood Canyon. Additionally, the city boasts a range of pet-friendly hotels and accommodations, ensuring a comfortable stay for both you and your pets.
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
            With its warm hospitality and numerous pet-friendly options, Salt Lake City promises an enjoyable and rewarding pet-friendly travel experience for the whole family.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Salt Lake City</Typography>

          <Bold text="Sheraton Salt Lake City Hotel" />
          <SingleLoadListingCard hotelName="100437140" />
          <Text text="Sheraton Salt Lake City Hotel is pet-friendly and welcomes dogs of all sizes. They offer pet beds, water bowls, and a welcome kit for your pets, ensuring they feel right at home. The hotel's central location provides easy access to nearby pet-friendly parks and walking trails." />  
          <Text text="You are welcome to bring up to two pets to this hotel for a fee of $50 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pool', 'On-site dining options', 'Fitness center']}
          />


          <Bold text="Motel 6-Salt Lake City, UT - Downtown" />
          <SingleLoadListingCard hotelName="100210438" />
          <Text text="Immerse yourself in the heart of downtown Salt Lake City at Motel 6-Salt Lake City, UT - Downtown, a pet-friendly hotel that embraces pets weighing up to 35 where pets “stay free.”" />
          <Text text="This budget-friendly and conveniently located hotel offers straightforward yet comfortable accommodations for you and your furry friends. It's an ideal choice for travelers seeking an affordable pet-friendly stay right in the midst of the city's vibrant atmosphere." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free WiFi']}
          />

          <Bold text="Kimpton Hotel Monaco" />
          <SingleLoadListingCard hotelName="100008778" />
          <Text text="Experience the luxury and sophistication at Hotel Monaco, a pet-friendly boutique hotel that exudes an atmosphere of elegance and style. This exceptional establishment warmly welcomes two pets weighing any size for no additional charge." />
          <Text text="As you step into this upscale hotel, you will be immediately captivated by the seamless fusion of modern amenities and historical charm. Each guest room has been designed with opulence in mind, featuring exquisite furnishings, plush bedding, and state-of-the-art facilities, ensuring a stay that epitomizes indulgence and comfort." />
          <Text text="Immerse yourself in the heart of Salt Lake City's vibrant culture and nightlife, knowing that you and your beloved pets have a luxurious sanctuary to return to at the end of each day. Hotel Monaco is more than just a hotel; it is an oasis of refined sophistication, where every moment is imbued with a sense of indulgence and style." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Yoga matt', 'Custom kickboard scooters for children', 'Free morning coffee and tea service', 'Daily social hour']}
          />
      
          <Bold text="Residence Inn by Marriott Salt Lake City Downtown" />
          <SingleLoadListingCard hotelName="100072652" />
          <Text text="Residence Inn by Marriott is a pet-friendly hotel that offers comfortable extended-stay accommodations. They allow pets for a small additional fee, ensuring a convenient and enjoyable stay for both you and your pets. The hotel's fully equipped suites provide ample space for you and your furry friends to relax and unwind." />
          <Text text="You are welcome to bring up to two pets to this hotel for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Daily breakfast', 'Coffee and tea offerings', 'Fitness center', 'Outdoor pool']}
          />

          <Bold text="Hilton Salt Lake City Center" />
          <SingleLoadListingCard hotelName="100279934" />
          <Text text="Featuring the ultimate in convenience and comfort, the Hilton Salt Lake City Center is a pet-friendly haven designed to cater to the needs of both business and leisure travelers. With a nominal fee of just $50 per stay, this exceptional hotel extends a warm welcome to two pets weighing up to 75 lbs each, ensuring that your furry companions can accompany you on your journey." />
          <Text text="Nestled in the heart of the vibrant downtown area, Hilton Salt Lake City Center stands as a beacon of modernity and sophistication, offering an array of contemporary amenities, spacious accommodations, and unparalleled service." />
          <Text text="Whether you're seeking to explore the city's renowned attractions or attending a conference at the nearby convention center, this pet-friendly sanctuary serves as an inviting and accommodating home base throughout your stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Business center', 'On-site dining options']}
          />


          <Bold text="Hyatt Place Salt Lake City/Downtown/The Gateway" />
          <SingleLoadListingCard hotelName="100006254" />
          <Text text="Hyatt Place is a pet-friendly hotel conveniently situated near popular attractions in Salt Lake City. They welcome pets weighing up to 50 pounds, ensuring a comfortable stay for you and your pets. The hotel's modern and spacious rooms provide a relaxing sanctuary for you and your furry companions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center']}
          />

          <Text text="Before booking your stay at these pet-friendly hotels, it's always a good idea to check the specific pet policies and any additional fees. These six pet-friendly hotels in Salt Lake City will allow you to explore the city's attractions and enjoy a comfortable stay with your furry friends by your side." />


          <Typography variant="h2">The Top Pet-Friendly Activities in Salt Lake City</Typography>
          <Text text="Salt Lake City, Utah, is a pet-friendly paradise that offers a plethora of activities for you and your furry companions to enjoy together. From scenic outdoor adventures to pet-friendly shopping and dining experiences, there are fun-filled activities for the whole family. Here are the ten best pet-friendly activities in Salt Lake City that will make your pet's tail wag with excitement:" />


          <LinkContent
            link="https://www.slc.gov/parks/parks-division/memory-grove/"
            linkText="Memory Grove Park"
            text="Explore Memory Grove Park, a beautiful oasis in the heart of the city, with your pets. This pet-friendly park features walking trails, stunning gardens, and a creek where your pets can cool down on hot days."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image1.png" text="SLC.gov" />

          <LinkContent
            link="https://www.outdoorproject.com/united-states/utah/tanner-dog-park"
            linkText="Tanner Dog Park"
            text="Tanner Dog Park is a spacious off-leash park that offers separate areas for small and large dogs. Let your pets socialize and play freely in this pet-friendly haven."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image4.png" text="Outdoor Project" />

          <LinkContent
            link="https://www.redbuttegarden.org/"
            linkText="Red Butte Garden and Arboretum"
            text="Discover the natural beauty of Red Butte Garden and Arboretum with your leashed pets. This botanic garden provides a picturesque setting for a leisurely stroll with your furry companions."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image10.png" text="Red Butte Garden and Arboretum" />

          <LinkContent
            link="https://slco.org/wheeler-farm/"
            linkText="Wheeler Historic Farm"
            text="Wheeler Historic Farm is a charming pet-friendly attraction that allows leashed pets to explore the farm with you. Enjoy the scenic surroundings and interact with farm animals during your visit."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image10.png" text="Salt Lake County" />

          <LinkContent
            link="https://slco.org/parks-recreation/parks-trails/millcreek-canyon/"
            linkText="Mill Creek Canyon"
            text="Take your pets on an outdoor adventure in Mill Creek Canyon. This pet-friendly canyon offers a variety of scenic hiking trails where you and your furry friends can enjoy nature together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image16.png" text="SLCO.gov" />

          <LinkContent
            link="https://www.sugarhousepark.org/"
            linkText="Sugar House Park"
            text="Sugar House Park is a large dog park and is a great spot for a picnic or a game of fetch with your pet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image11.png" text="Sugar House Park" />

          <LinkContent
            link="https://historicparkcityutah.com/"
            linkText="Park City Main Street"
            text="Visit nearby Park City Main Street, where many shops and restaurants are pet-friendly. Stroll along the street with your leashed pets and explore the charming boutiques and cafes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image6.png" text="Historic Park City Utah" />

          <LinkContent
            link="https://www.fs.usda.gov/uwcnf"
            linkText="Uinta-Wasatch-Cache National Forest"
            text="Embark on a day trip to the Uinta-Wasatch-Cache National Forest, where leashed pets are welcome on many of the forest's trails. Enjoy a scenic hike with your furry companions amidst the picturesque landscapes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image20.png" text="USDA" />

          <LinkContent
            link="https://www.visitsaltlake.com/listing/liberty-park/55159/"
            linkText="Liberty Park"
            text="Liberty Park is a pet-friendly urban oasis that features walking paths, a large pond, and plenty of green space. Leash up your pets and enjoy a relaxing afternoon in this vibrant park."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image20.png" text="Visit Salt Lake" />

          <LinkContent
            link="https://www.slc-golf.com/mountaindell/"
            linkText="Mountain Dell Golf Course"
            text="If you're a golf enthusiast, visit Mountain Dell Golf Course, a pet-friendly golf course where you can bring your leashed pets along for a round of golf."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image8.png" text="SLC Golf" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Salt Lake City</Typography>
          <Text text="Salt Lake City, Utah, is a foodie's paradise, and the good news is that you don't have to leave your furry companions behind when indulging in the city's culinary delights. Salt Lake City is home to a variety of pet-friendly restaurants that warmly welcome dogs and sometimes even cats to join their owners for a delicious dining experience." />
          <Text text="From cozy cafes to trendy eateries, here are ten pet-friendly restaurants in Salt Lake City where you and your pets can savor a delightful meal together:" />

          <LinkContent
            link="https://sugarhousecoffee.com/"
            linkText="Sugar House Coffee"
            text="Sugar House Coffee is a pet-friendly cafe that not only serves excellent coffee but also offers a range of delicious breakfast and lunch options. Their outdoor seating area allows you to enjoy a delightful meal with your furry friends by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image8.png" text="Sugar House Coffee" />

          <LinkContent
            link="https://properbrewingco.com/locations/proper-burger-downtown/"
            linkText="Proper Burger Co."
            text="Proper Burger Co. is a popular pet-friendly eatery that serves mouthwatering burgers and sides. Your pets can relax on their outdoor patio while you savor the juicy flavors of their gourmet burgers."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image7.png" text="Proper Burger Co" />

          <LinkContent
            link="https://www.eastlibertytaphouse.com/"
            linkText="East Liberty Tap House"
            text="East Liberty Tap House is a pet-friendly restaurant with a diverse menu of pub food and drinks. Their outdoor seating area is a great place to unwind with your pets while enjoying the vibrant atmosphere."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image19.png" text="East Liberty Tap House" />

          <LinkContent
            link="https://www.taqueria27.com/"
            linkText="Taqueria 27"
            text="Taqueria 27 is a pet-friendly Mexican restaurant that offers a creative twist on traditional tacos. Their outdoor patio allows you to enjoy flavorful dishes while your pets lounge comfortably beside you."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image15.png" text="Taqueria 27" />

          <LinkContent
            link="https://spitz-restaurant.com/mediterranean-food-downtown-salt-lake-city-restaurant-bar/"
            linkText="Spitz"
            text="Spitz is a pet-friendly eatery known for its delicious Mediterranean-inspired dishes. Their outdoor patio is a pet-friendly spot where you and your furry companions can enjoy flavorful wraps and street-style fries."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image2.png" text="Spitz" />

          <LinkContent
            link="https://properbrewingco.com/locations/avenues-proper/"
            linkText="Avenues Proper"
            text="Avenues Proper is a pet-friendly restaurant and brewery offering a unique selection of craft beers and American comfort food. Their outdoor seating area allows pets, creating a friendly and relaxed dining atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image14.png" text="Avenues Proper" />


          <LinkContent
            link="https://www.whiskeystreet.com/"
            linkText="Whiskey Street"
            text="Whiskey Street is a pet-friendly restaurant and bar with a lively outdoor patio that is a fun spot for the whole family to enjoy. They offer a range of whiskey and cocktails, as well as a menu of American fare that you and your pets can enjoy together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image18.png" text="Whiskey Street" />

          <LinkContent
            link="https://triodiningslc.com/"
            linkText="Cafe Trio"
            text="Cafe Trio is a pet-friendly restaurant with a warm and inviting ambiance. Their outdoor seating area welcomes pets, and their diverse menu offers a variety of dishes to satisfy your taste buds."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image5.png" text="Cafe Trio" />

          <LinkContent
            link="https://www.finnscafe.net/"
            linkText="Finn's Cafe"
            text="Located in the historic 9th and 9th district, Finn's Cafe offers a warm and inviting space for locals to gather and enjoy a variety of hearty breakfast and lunch options. From their famous cinnamon rolls and homemade soups to classic sandwiches and salads, Finn's Cafe is a favorite spot for a satisfying and comforting meal."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image3.png" text="Finn's Cafe" />

          <LinkContent
            link="https://thegreenpigpub.com/"
            linkText="Green Pig Pub"
            text="Green Pig Pub is a lively and popular gastropub in the heart of downtown. Known for its friendly atmosphere and vibrant nightlife, the Green Pig Pub has a diverse menu that featured classic pub fare with a modern twist. From mouthwatering burgers and hearty sandwiches to creative small plates and appetizers, the pub's menu caters to a wide range of tastes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Salt%20Lake%20City/image17.png" text="Green Pig Pub" />


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

export default SaltLakeCity;
