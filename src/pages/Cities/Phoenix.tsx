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

const Phoenix: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Phoenix, AZ');

  const city = 'Phoenix'
  const paragraphOne = "Phoenix captivates with year-round sunshine, stunning wide desert landscapes, and an active urban scene. From outdoor adventures amidst towering saguaro cacti to a thriving culinary Mexican restaurant and cultural scene, dog-friendly Phoenix offers a unique blend of natural beauty, urban sophistication, and Southwestern charm."

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
      <title>Pet Friendly Hotels Phoenix, AZ | Romingo</title>
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
            With easy access to awe-inspiring natural wonders and a wealth of family-friendly attractions, Phoenix is a destination that caters to diverse interests and leaves a lasting impression on visitors. The Grand Canyon is just one day trip away.
          </Typography>
        </Grid>
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden lgDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar />
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
            Join us today as we explore some of the options in Phoenix, each providing a unique experience that places the comfort and happiness of your four-legged friend at the forefront.
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
          mt="2rem"
          display='flex'
          flexDirection='column'
          gap='1.5rem'
        >
          <Divider />
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Phoenix</Typography>

    
          <Bold text="Hyatt Place Phoenix Downtown" />
          <SingleLoadListingCard hotelName="102262943" />
          <Text text="Immerse yourself in the vibrant heart of downtown Phoenix at the pet-friendly Hyatt Place Phoenix Downtown. They welcome up to two dogs (with a combined weight of up to 100 lbs) for an additional fee of $100 per stay." />
          <Text text="This modern hotel seamlessly blends contemporary comfort with unparalleled convenience, guaranteeing a delightful sojourn for both you and your furry companion. Enchant your canine friend with outdoor playtime and socialization in the nearby friendly dog park, nestled amidst the energetic cityscape." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Fitness center', 'Breakfast bar', 'On-site market']}
          />

          <Bold text="Sonesta Simply Suites Phoenix North" />
          {/*<SingleLoadListingCard hotelName="Sonesta Simply Suites Phoenix North" />*/}
          <Text text="Embrace a cozy retreat at Sonesta Simply Suites Phoenix North, where pets are embraced with open arms. Sonesta Simply Suites is pet-friendly and welcomes well-mannered pets, with no breed or weight restrictions. Up to two pets are permitted per suite. A $75 fee applies for stays up to 7 nights; $150 for all longer stays." />
          <Text text="The generously proportioned suites are thoughtfully designed to ensure your relaxation and well-being. Unleash your pet's playful spirit at the neighboring dog park, where they can stretch their legs and mingle with other four-legged companions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Laundry facilities', 'Fitness center', 'On-site convenience store']}
          />

          <Bold text="Kimpton Hotel Palomar Phoenix" />
          <SingleLoadListingCard hotelName="100029082" />
          <Text text="Immerse yourself in the lap of luxury at the sophisticated Kimpton Hotel Palomar Phoenix, where pets of any size are welcomed at no additional fee. This upscale hotel exudes elegance and charm, featuring stylishly appointed rooms and impeccable service." />
          <Text text="Revel in the presence of a nearby dog park, providing the perfect setting for outdoor adventures and delightful social interactions. Here, pets are treated to an experience that is nothing short of extraordinary, alongside their esteemed human counterparts." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Coffee and tea bar', 'Yoga mats', 'Diffusers in each room', 'Business center']}
          />

          <Bold text="The Camby Hotel" />
          <SingleLoadListingCard hotelName="100183450" />
          <Text text="Nestled in the Biltmore area, The Camby Hotel offers a chic and pet-friendly retreat. This upscale hotel allows dogs of all sizes and even provides a special &quot;Doggie&quot; menu, ensuring your pets are pampered during their stay. With beautiful views of Camelback Mountain, The Camby Hotel is an ideal spot to explore nearby pet-friendly parks and trails." />
          <Text text="The Camby Hotel allows you to bring two pets up to 20 pounds for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Rooftop pool', 'Charging stations for electric cars', 'On-site dining options', 'Dry cleaning']}
          />

          <Bold text="Sheraton Phoenix Downtown" />
          <SingleLoadListingCard hotelName="100433832" />
          <Text text="Located in the heart of downtown Phoenix, the Sheraton Phoenix Downtown is a pet-friendly hotel that offers a central location for exploring the city. They allow dogs weighing up to 80 pounds and provide pet beds and water bowls to keep your pets comfortable throughout their stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site bar', 'On-site lounge', 'Bicycle rentals', 'Pool']}
          />

          <Bold text="Comfort Inn and Suites Phoenix North - Deer Valley" />
          <SingleLoadListingCard hotelName="100218610" />
          <Text text="At Comfort Inn and Suites Phoenix North - Deer Valley, you and your pet can revel in a comfortable and budget-friendly stay. For a nominal fee of $25 per night, you can bring along two pets, with a combined weight of up to 75 lbs each." />
          <Text text="Rest assured knowing that your furry companion will find respite and solace in the cozy and inviting surroundings. Unleash their playful spirit at the nearby friendly dog park, where they can embark on thrilling explorations and engage in delightful social interactions." />
          <Text text="Phoenix opens its arms to both you and your cherished pet, providing a sanctuary where unforgettable moments and stress-free experiences await. From the contemporary allure of Hyatt Place Phoenix Downtown to the sophisticated charm of Kimpton Hotel Palomar Phoenix, the accommodation options cater to every preference." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Breakfast buffet', 'Fitness center', 'Outdoor pool']}
          />

  
          <Typography variant="h2">The Top Pet-Friendly Activities in Phoenix</Typography>
          <Text text="Phoenix, Arizona, is a pet-friendly paradise that offers a plethora of activities for you and your four-legged companions to enjoy together. From exploring the great outdoors to indulging in pet-friendly dining experiences, there's no shortage of exciting adventures for you and your pets in this sunny desert city. Here are the ten best pet-friendly activities in Phoenix:" />


          <LinkContent
            link="https://www.alltrails.com/parks/us/arizona/echo-canyon-recreation-area"
            linkText="Echo Canyon Trail and Recreation Area"
            text="Take a hike with your leashed dogs at the Echo Canyon Trail and Recreation Area on Camelback Mountain. The trail offers stunning views of the city and surrounding desert landscapes, making it a fantastic adventure for both you and your pets."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image9.png" text="AllTrails" />

          <LinkContent
            link="https://www.phoenix.gov/parks/parks/dog-parks/steele-dog-park"
            linkText="Steele Indian School Dog Park"
            text="Let your pets off-leash to play and socialize with other furry friends at the Steele Indian School Dog Park. This spacious and well-maintained park features separate areas for small and large dogs, ensuring a safe and enjoyable experience for all."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image3.png" text="AZ Vet Pet" />

          <LinkContent
            link="https://www.visitphoenix.com/sonoran-desert/parks/papago-park/"
            linkText="Papago Park"
            text="Papago Park is a pet-friendly oasis with a variety of walking trails and scenic areas to explore. Take a leisurely stroll with your pets around the Desert Botanical Garden or visit the iconic Hole-in-the-Rock formation for breathtaking views."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image14.png" text="Visit Phoenix" />

          <LinkContent
            link="https://rooseveltrow.org/"
            linkText="Roosevelt Row Arts District"
            text="Visit the Roosevelt Row Arts District, where pets are welcome to explore the vibrant street art and local galleries. Many shops and cafes in this artsy neighborhood offer pet-friendly seating, making it a great spot for a pet-friendly stroll."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image16.png" text="Roosevelt Row Art District" />

          <LinkContent
            link="https://shopdesertridge.com/"
            linkText="Desert Ridge Marketplace"
            text="Shop 'til you drop with your pets at the Desert Ridge Marketplace. This outdoor shopping center welcomes leashed pets and even provides pet-friendly water stations throughout the area."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image4.png" text="Desert Ridge Marketplace" />

          <LinkContent
            link="https://www.visitphoenix.com/sonoran-desert/parks/south-mountain-park-and-preserve/"
            linkText="South Mountain Park and Preserve"
            text="Explore the South Mountain Park and Preserve, one of the largest municipal parks in the United States. Leashed pets are welcome on most trails, allowing you to take in the stunning desert vistas together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image20.png" text="Visit Phoenix" />

          <LinkContent
            link="https://www.ohsobrewery.com/"
            linkText="O.H.S.O. Brewery + Distillery"
            text="Enjoy a delicious meal or craft beer at O.H.S.O. Brewery, a pet-friendly establishment with a special dog-friendly patio. They even offer a &quot;Bark Bar&quot; menu with treats and water bowls for your furry companions."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image12.png" text="O.H.S.O Brewery + Distillery" />

          <LinkContent
            link="https://www.visitphoenix.com/sonoran-desert/parks/phoenix-mountains-preserve/"
            linkText="Piestewa Peak Park"
            text="Embark on a challenging hike with your leashed dogs at Piestewa Peak Park. This popular spot offers several trails of varying difficulty levels, providing a rewarding experience for both you and your pets."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image1.png" text="Visit Phoenix" />

          <LinkContent
            link="https://www.therailroadpark.com/"
            linkText="McCormick-Stillman Railroad Park"
            text="Head to the McCormick-Stillman Railroad Park, where pets are welcome in the park's open areas. Enjoy a leisurely picnic or take a ride on the mini-train with your furry friends by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image6.png" text="McCormick-Stillman Railroad Park" />

          <LinkContent
            link="https://phoenix.eater.com/maps/best-phoenix-dog-friendly-restaurants-bars"
            linkText="Dog-Friendly Patio Dining"
            text="Phoenix boasts a variety of pet-friendly restaurants with outdoor patios, such as Postino WineCafé and The Vig. Indulge in delicious meals while your pets lounge comfortably by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image10.png" text="Eater Phoenix" />

          <Text text="Before embarking on these pet-friendly activities, remember to bring along water, waste bags, and check the individual park or venue rules regarding pet policies. With these ten pet-friendly activities in Phoenix, you and your pets can create lasting memories and enjoy a truly unforgettable experience in the Valley of the Sun. So, leash up your furry friends, grab your sunscreen, and get ready for an adventure-filled journey together in Phoenix!" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Phoenix</Typography>

          <Text text="Phoenix, Arizona, is a city that loves its pets just as much as its food. With a wealth of pet-friendly restaurants, you can now enjoy delicious meals without leaving your furry companions behind. Whether you're looking for a cozy café, a trendy eatery, or a lively patio setting, Phoenix has something to satisfy both your taste buds and your pets' wagging tails. Here are ten pet-friendly restaurants in Phoenix that will make your dining experience a delightful one for the entire family:" />

          <LinkContent
            link="https://www.thevig.us/"
            linkText="The Vig"
            text="The Vig is a popular spot known for its pet-friendly patios and lively atmosphere. With multiple locations throughout Phoenix, you and your pets can enjoy a diverse menu of modern American cuisine and refreshing cocktails."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image17.png" text="The Vig" />

          <LinkContent
            link="https://www.postinowinecafe.com/"
            linkText="Postino WineCafé"
            text="Postino WineCafé is a chic and stylish eatery offering an extensive selection of wines and delicious bruschetta boards. Their pet-friendly patios provide a cozy setting for you and your furry friends to enjoy a relaxing meal together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image18.png" text="Postino WineCafe" />

          <LinkContent
            link="https://www.culinarydropout.com/"
            linkText="Culinary Dropout"
            text="Culinary Dropout offers a unique dining experience with its fun and funky vibe. Their pet-friendly patio is a great place to enjoy comfort food classics and craft cocktails while your pets soak up the atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image2.png" text="Culinary Dropout" />

          <LinkContent
            link="https://thefarmatsouthmountain.com/"
            linkText="The Farm at South Mountain"
            text="For a tranquil and picturesque setting, The Farm at South Mountain welcomes pets in its beautiful outdoor dining areas. The restaurant features farm-fresh ingredients and a delightful menu of breakfast and lunch dishes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image15.png" text="The Farm at South Mountain" />

          <LinkContent
            link="https://www.neighborlypublichouse.com/"
            linkText="Neighborly Public House"
            text="Neighborly Public House is a pet-friendly restaurant that offers a diverse menu with dishes made from locally sourced ingredients. Their spacious outdoor patio is the perfect spot for you and your pets to savor a delicious meal."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image13.png" text="Neighborly Public House" />

          <LinkContent
            link="https://www.iamaflowerchild.com/locations/phoenix-az-uptown/"
            linkText="Flower Child"
            text="Flower Child is a health-conscious eatery that embraces pets at their outdoor seating areas. Indulge in fresh, nutritious salads, bowls, and wraps while your pets relax beside you."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image5.png" text="Flower Child" />

          <LinkContent
            link="https://www.joyridetacohouse.com/"
            linkText="Joyride Taco House"
            text="With its vibrant and festive atmosphere, Joyride Taco House is a pet-friendly restaurant that serves up delicious tacos and Mexican fare. Their pet-friendly patio is an excellent spot for you and your pets to enjoy a fiesta of flavors."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image19.png" text="Joyride Taco House" />

          <LinkContent
            link="https://morningsqueeze.com/"
            linkText="Morning Squeeze"
            text="Morning Squeeze is a pet-friendly brunch spot that offers a variety of tasty breakfast and lunch options. The restaurant's friendly staff will happily provide water bowls for your pets as you enjoy your meal."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image11.png" text="Morning Squeeze" />

          <LinkContent
            link="https://chelseaskitchenaz.com/#"
            linkText="Chelsea's Kitchen"
            text="Chelsea's Kitchen is a charming and pet-friendly restaurant that offers a delightful selection of American cuisine. With a pet-friendly patio and a warm ambiance, it's a great place to dine with your furry friends."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image8.png" text="Chelsea’s Kitchen" />

          <LinkContent
            link="https://keegansgrill.com/locations/phoenix"
            linkText="Keegan’s"
            text="Keegan's is a popular restaurant located in Phoenix, Arizona. Known for its warm and inviting atmosphere, Keegan's is a favorite spot among locals and visitors alike. The restaurant offers a diverse menu that includes classic American dishes, pub-style favorites, and mouthwatering steaks. With friendly service, a wide selection of drinks, and a welcoming ambiance, Keegan's provides a perfect setting for gathering with friends and family to enjoy a delicious meal and create lasting memories."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Phoenix/Phoenix/image7.png" text="Keegan’s" />



        </Box>


        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden lgDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar />
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

export default Phoenix;
