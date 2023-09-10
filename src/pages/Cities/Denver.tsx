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

const denverSearchData = {
  "city": {
    "description": "Denver, CO, USA",
    "matched_substrings": [
        {
            "length": 6,
            "offset": 0
        }
    ],
    "place_id": "ChIJzxcfI6qAa4cR1jaKJ_j0jhE",
    "reference": "ChIJzxcfI6qAa4cR1jaKJ_j0jhE",
    "structured_formatting": {
        "main_text": "Denver",
        "main_text_matched_substrings": [
            {
                "length": 6,
                "offset": 0
            }
        ],
        "secondary_text": "CO, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Denver"
        },
        {
            "offset": 8,
            "value": "CO"
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
"lat": 39.7392358,
"lng": -104.990251
}

const Denver: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Denver, CO');

  const city = 'Denver'
  const paragraphOne = 'Denver is a fantastic city for pet-friendly travel, offering many activities and hotels that warmly welcome your four-legged companions. There are numerous pet-friendly hikes and parks for you and your pet to explore, including Red Rocks Park. Additionally, there are many restaurants and cafes in Denver that offer pet-friendly outdoor seating options.'

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
      <title>Pet Friendly Hotels Denver, CO | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, CO | Romingo`}
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
          COLORADO
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
              <LargeFilterBar city={denverSearchData} />
            </Box>
            <IconTags />
          </Hidden>
          <Hidden mdUp>
            <FilterBar city={denverSearchData} />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            We&apos;re here to help you plan your next pet-friendly trip to Denver! Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in {city}</Typography>
          <Bold text="Hyatt Centric Downtown Denver" />
          <SingleLoadListingCard hotelName="102265335" />
          <Text text="Hyatt Centric Downtown Denver is a pet-friendly hotel that offers a warm welcome to both guests and their furry companions. Situated in the heart of the city, this modern and stylish hotel ensures a comfortable stay for everyone in the family. The hotel's rooftop bar offers stunning views of the city and the Rocky Mountains, creating a perfect spot to unwind." />
          <Text text="The Hyatt Centric Downtown Denver provides designated rooms and floors where your pet can stay comfortably with you. The hotel also offers pet amenities, such as pet beds and food bowls, to ensure your pet feels right at home. There are pet fees when you stay at this hotel depending on the length of your stay. Additionally, there is a weight restriction of 80 pounds per pet." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Dining options', 'On-site bars', 'Fitness center', 'Laundry offerings']}
          />


          <Bold text="Thompson Denver" />
          <SingleLoadListingCard hotelName="102265843" />
          <Text text="The Thompson Denver is a chic and luxurious hotel in the heart of downtown Denver, Colorado, that warmly welcomes pets. With its modern design and amenities, this pet-friendly hotel offers comfortable accommodations for both you and your furry companions. With its great location, stylish ambiance, and exceptional service, The Thompson Denver promises a wonderful stay for guests and pets." />
          <Text text="When you stay at The Thompson Denver, your pet will receive treats and amenities to ensure they feel right at home. The Thompson Denver's central location is close to parks and walking areas, making it convenient for you to explore the city. You can bring up to two pets and you will not have to pay any extra fees." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Laundry services', 'Dining options', 'On-site coffee bar']}
          />

          <Bold text="Historic Hilton Garden Inn Denver Union Station" />
          <SingleLoadListingCard hotelName="100591191" />
          <Text text="The Historic Hilton Garden Inn Denver Union Station is a charming hotel that captures the essence of Denver's rich history. Situated just steps away from Denver Union Station, the hotel's location is ideal for exploring the city's vibrant downtown area. The hotel's on-site restaurant serves delicious American cuisine, and guests can enjoy cocktails and stunning views from the rooftop bar." />
          <Text text="The Historic Hilton Garden Inn Denver Union Station is pet-friendly and invites you to bring your pet on your vacation. Upon arrival, your pet will receive a special welcome, complete with treats and toys to make them feel at home. The hotel welcomes two pets up to 50 pounds for a fee of $50 per pet, per stay. Your beloved four-legged companion will love joining you in discovering the enchanting city of Denver!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Indoor pool', 'Business center', 'Dining options']}
          />

          <Bold text="Magnolia Hotel Denver" />
          <SingleLoadListingCard hotelName="100233692" />
          <Text text="The Magnolia Hotel Denver is a historic and pet-friendly boutique hotel located in the heart of downtown Denver, Colorado. Magnolia Hotel Denver is in downtown Denver near famous restaurants and shopping. The hotel has a rooftop terrace and an on-site restaurant for you and your pet to enjoy." />
          <Text text="When you stay at this pet-friendly hotel, you can bring two pets of any size for no additional fee. Upon arrival, pets receive a special greeting, complete with treats and toys to ensure they feel comfortable and at home. You are also close to parks and walking areas throughout downtown Denver." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Business center', 'Fitness center', 'Dining options']}
          />          

          <Bold text="The Brown Palace Hotel and Spa" />
          <SingleLoadListingCard hotelName="100430138" />
          <Text text="The Brown Palace Hotel and Spa is one of Denver's most iconic, pet-friendly hotels. This iconic hotel opened in 1892 and is an important landmark in Denver. The hotel's luxurious amenities include a full-service spa, a rooftop pool, and several exquisite dining options. This hotel is in downtown Denver and is close to many popular attractions in the city." />
          <Text text="This historic luxury hotel offers pet-friendly accommodations and provides pet amenities, including beds and bowls, to ensure a comfortable stay. Civic Center Park and Cheeseman Park are nearby places where you can take your pet. You can bring two pets when you stay at this hotel and there is a $125 pet fee per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Spa and salon offerings', 'Fitness center', 'Afternoon tea', 'On-site dining options']}
          />  

          <Bold text="Kimpton Hotel Born" />
          <SingleLoadListingCard hotelName="100191848" />
          <Text text="Kimpton Hotel Born is a contemporary and stylish boutique hotel located in the heart of Denver's vibrant Union Station neighborhood. The hotel's prime location makes it an ideal base for exploring the city's many attractions, restaurants, and cultural hotspots. Kimpton Hotel Born promises a contemporary and luxurious experience that captures the vibrant spirit of the Mile High City!" />
          <Text text="Kimpton Hotel Born loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. When you check in, your pet will receive treats and the hotel offers pet beds and food bowls." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Dining options', 'In-room coffee and espresso makers']}
          />  

          <Typography component="h2" variant="h2">The Top Pet-Friendly Activities in Denver</Typography>
          <LinkContent
            link="https://cpw.state.co.us/placestogo/parks/CherryCreek"
            linkText="Cherry Creek State Park"
            text="Treat your four-legged companion to a day of outdoor fun at Cherry Creek State Park. This expansive park offers miles of trails where you and your pet can hike, jog, or simply stroll amidst picturesque scenery. Additionally, the park has a designated off-leash dog area where your pup can play and socialize freely."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image19.png"
            text="Colorado Parks and Wildlife"
          />

          <LinkContent
            link="http://www.rfpcommunityfoundation.org/"
            linkText="Railyard Dog Park"
            text="Located near Union Station, the Railyard Dog Park is a paw-some urban retreat for playful pups. This park features a large enclosed area where dogs can run and explore while you enjoy views of the city."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image5.png"
            text="Riverfront Park Community Foundation"
          />

          <LinkContent
            link="https://denverbeerco.com/"
            linkText="Denver Beer Co."
            text="Quench your thirst and treat your pet to a unique experience at Denver Beer Co. This popular brewery offers a pet-friendly patio where you can enjoy craft beers and food with your furry friend."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image18.png"
            text="Denver Beer Co."
          />

          <LinkContent
            link="https://www.denver.org/listing/washington-park/6828/"
            linkText="Washington Park"
            text='Known as "Wash Park," this scenic urban park is a must-visit for pet owners. Pets can join you on a walk around the lakes or you can explore the 2.6-mile loop trail around the park.'
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image15.png" text="Denver" />

          <LinkContent
            link="https://www.5280.com/best-dog-parks-denver-metro/"
            linkText="Table Mountain Off-Leash Dog Park"
            text="Venture to the nearby suburb of Golden and visit Table Mountain Off-Leash Dog Park. This large open space allows your pet to run and play fetch while you enjoy the mountain views in the distance."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image8.png" text="5280" />

          <LinkContent
            link="https://topdogparks.com/places/lowry-dog-park/"
            linkText="Lowry Dog Park"
            text="Situated in the Lowry neighborhood, this well-maintained off-leash dog park features separate areas for large and small dogs. With ample shaded spots and water stations, it's the perfect place for your furry friend to socialize and expend some energy."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image7.png" text="Top Dog Parks" />

          <LinkContent
            link="https://pawsnplay.com/"
            linkText="Paws 'n Play"
            text="Paws 'n' Bites is a delightful dog treat store nestled in the heart of Denver, Colorado, that caters to the taste buds and well-being of our beloved canine companions. This charming store offers an array of handcrafted and all-natural dog treats that are not only delicious but also made with the finest, locally sourced ingredients."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image3.png" text="Paws 'n Play" />

          <LinkContent
            link="https://www.jeffco.us/1332/Mount-Falcon-Park"
            linkText="Mount Falcon Park"
            text="Escape to Mount Falcon Park for a scenic hike with your furry companion. The park's numerous trails offer varying levels of difficulty, making it suitable for leisurely walks or more challenging treks."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image10.png" text="Jefferson County Colorado" />

          <LinkContent
            link="https://www.denver.org/things-to-do/tours/brewery-tours/"
            linkText="Denver Brews & Booze Tour"
            text="Embark on a pet-friendly walking tour with your dog and discover Denver's craft brews and spirits scene. This guided tour allows you to explore the city's breweries and bars while your pet accompanies you on this unique adventure."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image9.png" text="Denver" />

          <LinkContent
            link="https://www.uncovercolorado.com/public-parks/sloans-lake-park/"
            linkText="Sloan's Lake Park"
            text="Enjoy breathtaking views of downtown Denver at Sloan's Lake Park, a serene and pet-friendly destination. Leashed pets are welcome to join you as you walk along the lake's shores and take in Denver's skyline."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image12.png" text="Uncover Colorado" />

          <Typography variant="h2"> The Top Pet-Friendly Restaurants in {city}</Typography>

          <LinkContent
            link="https://www.westword.com/location/forest-room-5-5163966"
            linkText="Forest Room 5"
            text="Nestled in a rustic setting, Forest Room 5 is a dog-friendly gem that welcomes pets on its outdoor patio. The restaurant boasts a creative menu with delectable dishes like elk sliders and salmon BLTs. Enjoy a relaxing meal amidst the towering trees and enjoy the ambiance of nature with your pet by your side."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image2.png" text="Forest 5" />

          <LinkContent
            link="https://www.denbisco.com/"
            linkText="Denver Biscuit Co."
            text="Start your day with a mouthwatering breakfast at Denver Biscuit Co. This restaurant is a pet-friendly eatery that offers delectable biscuit sandwiches and breakfast delights. While you savor your meal, your furry companion can indulge in delicious, homemade dog biscuits."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image13.png" text="Denver Biscuit Co." />

          <LinkContent
            link="https://www.parkburger.com/"
            linkText="Park Burger"
            text="A favorite among pet owners, Park Burger offers a spacious outdoor patio where you can dine with your furry friend. This burger joint serves up delicious burgers, creative toppings, and a selection of craft beers. You and your pet will enjoy a delightful meal together at Park Burger! "
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image1.png" text="Park Burger" />

          <LinkContent
            link="https://www.mountainsunpub.com/location/vine-street-pub-brewery/"
            linkText="Vine Street Pub & Brewery"
            text="Treat yourself and your pet to a lively dining experience at Vine Street Pub & Brewery. This pet-friendly spot offers an inviting patio where you can enjoy a variety of handcrafted beers and delicious pub fare."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image16.png" text="Vine Street Pub & Brewery" />

          <LinkContent
            link="https://avantifandb.com/"
            linkText="Avanti Food & Beverage"
            text="Avanti Food & Beverage is a food hall that features food vendors and has a large rooftop patio that welcomes pets. Avanti has stunning views of the city and a lively atmosphere, making this spot perfect for pet owners."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image11.png" text="Avanti Food & Beverage" />

          <LinkContent
            link="https://www.ediblebeats.com/linger"
            linkText="Linger"
            text="Located in a former mortuary, Linger offers a unique dining experience with a pet-friendly rooftop patio. THe restaurant offers dishes from around the world, making it a fantastic spot to enjoy a meal with your furry friend."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image14.png" text="Linger" />

          <LinkContent
            link="https://www.recessbeergarden.com/"
            linkText="Recess Beer Garden"
            text="Recess Beer Garden is an ideal spot to relax with your pet. This lively beer garden offers a dog-friendly patio and an extensive selection of local craft beers and food trucks. This restaurant is a favorite gathering spot for both pet owners and beer enthusiasts."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image6.png" text="Recess" />

          <LinkContent
            link="https://www.justbekitchen.com/"
            linkText="Just Be Kitchen"
            text="The Watering Well Eatery is a hidden gem in the Berkeley neighborhood featuring flavorful dishes made with locally-sourced ingredients. They also have a pet-friendly patio and a menu featuring special treats that your pet will love."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image17.png" text="Just Be Kitchen" />

          <LinkContent
            link="https://tapandburger.com/"
            linkText="Sloan's Lake Tap and Burger"
            text="Sloan's Lake Tap and Burger is near Sloan's Lake Park and offers delicious burgers and a variety of craft beers. After a day of exploring the lake with your pet, enjoy Sloan's Lake Tap and Burger's patio with your furry friend."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Denver/image4.png" text="Sloan’s Lake Tap and Burger" />


        </Box>


        
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              
            </Typography>
          </Divider>
          <Hidden mdDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar city={denverSearchData} />
            </Box>
            <IconTags />
          </Hidden>
          <Hidden mdUp>
            <FilterBar city={denverSearchData} />
          </Hidden>{' '}
          <Divider light variant='middle' sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>;
};

export default Denver;
