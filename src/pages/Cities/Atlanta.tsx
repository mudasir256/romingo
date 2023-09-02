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

const Atlanta: FC = () => {

  //TODO:
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Austin, TX');

  const paragraphOne = "Discovering Atlanta with your dog is now simpler with many pet-friendly hotels and attractions available in the city.  Atlanta offers numerous options for pet owners who want to travel with their pets. These options include dog parks, hiking trails, and pet-friendly patios and cafes."

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
      <title>Pet Friendly Hotels Atlanta, GA | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels Atlanta, GA | Romingo`}
      />
      <meta property='og:description' content={paragraphOne} />
      <meta property='og:image' content={cityContent.heroImage} />
    </Helmet>

    <ScrollToTop />
    <Navbar />
    <Box
      component="img"
      src={cityContent.heroImage}
      alt={"Atlanta"}
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
          Pet Friendly Hotels Atlanta
        </Typography>
      </Box>
      <Divider variant="middle" light sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          GEORGIA
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
            We are going to explore some of the best pet-friendly hotels and activities for you and your pet to enjoy during your trip to Atlanta.
          </Typography>
        </Grid>

        <Grid ml="auto" mt="0.5rem" item xs={12} md={4}>
          <Box
            component="img"
            src={cityContent.secondaryImage}
            alt={"Austin"}
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
          <Typography component="h2" variant="h2">The Top Pet-Friendly Accommodations in Atlanta</Typography>
          
          <Bold text="Loews Atlanta Hotel" />
          <SingleLoadListingCard hotelName="100395944" />
          <Text text="Situated in the area of Midtown, Loews is a modern, pet-friendly hotel that provides guests with true southern hospitality. When staying at Loews, you can easily walk to Piedmont Park, the Beltline, and Fox Theatre." />
          <Text text="Loews is a pet-friendly hotel in Atlanta and encourages you to bring your pets with you on your trip. During your trip, you will pay $75 per stay. Your pet will be treated like royalty as a part of the Loews Loves Pets program. Your pet will get to enjoy amenities such as beds, bowls, and treats during their stay at this pet-friendly hotel." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Spa services', 'Business center', 'Dining options']}
          />

          <Bold text="The Whitley, a Luxury Collection Hotel" />
          <SingleLoadListingCard hotelName="100004472" />
          <Text text="The Whitley is a luxury hotel located in the vibrant Buckhead neighborhood that showcases beautiful views of Atlanta's skyline. The hotel is located near Piedmont Park, a 200-acre park in Atlanta that you can enjoy with your pet." />
          <Text text="This pet-friendly hotel allows you to bring two of your pets as long as they are less than 50 pounds. There is a non-refundable $150 cleaning fee and you need to alert the hotel if you want to bring your pets with you on your trip. This upscale hotel provides pet beds, food bowls, and even a pet concierge service to cater to your pet's needs." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Spa services', 'Multiple dining options']}
          />


          <Bold text="Ritz Carlton Atlanta" />
          <SingleLoadListingCard hotelName="100372040" />
          <Text text="The Ritz-Carlton Hotel is a pet-friendly hotel known for the amenities and services it offers. Conveniently located in the heart of downtown Atlanta, this hotel is a great option for your next trip." />
          <Text text="When traveling to The Ritz-Carlton Hotel, you can bring pets that weigh up to 25 pounds. Your pet-friendly room will have a plush bed, food bowls, and treats. Your pet will feel pampered as they explore Atlanta alongside you!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Wellness floor', 'Dining options', 'VIP treatment for children']}
          />

          <Bold text="Kimpton Overland" />
          <SingleLoadListingCard hotelName="100668120" />
          <Text text="The Kimpton Overland is a modern, pet-friendly hotel in Atlanta located just outside of the city. The Kimpton is a great choice for your next trip because they love when you bring your pets with you! When staying at this hotel, you can spend time enjoying the Porsche Experience Center. The Hartsfield-Jackson Atlanta International Airport is nearby, making this hotel great for traveling." />
          <Text text="The Kimpton Overland is one of the most pet-friendly hotels we've found. They get excited when you bring your pets on your trip, so this is a great travel option. When traveling here with your pet, you will not have to pay a deposit for your stay. There is no size or weight limit to your pet and you can bring as many furry friends as you'd like." />
          <Text text="Water bowls will be delivered to your room and you'll receive bags for walking your dog. There are also dedicated floors for travelers with pets. As long as your pet can fit in the elevator, they are welcome to join you!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free airport shuttle', 'Dining options', 'Fitness offerings, including an on-site fitness center and a yoga mat in every room', 'Indoor pool', 'Free access to Wag so that you can arrange pet care conveniently', 'Plant Pals program', 'Family Fridge Program']}
          />

          <Bold text="Hotel Indigo Atlanta Midtown" />
          <SingleLoadListingCard hotelName="100158584" />
          <Text text="For a boutique experience with a pet-friendly twist, Hotel Indigo Atlanta Midtown is an excellent choice. This hotel is in the heart of Atlanta’s art and entertainment district. The Atlanta Botanical Garden and the High Museum of Art are within walking distance of this hotel." />
          <Text text="For an additional fee of $25-100, you can bring your pets with you during your trip to Atlanta. Hotel Indigo is pet-friendly and welcomes you to bring your furry friends with you during your stay!" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center with Peloton bikes', 'On-site dog park', 'Business center', 'Dining options']}
          />

          <Bold text="The Westin Atlanta Perimeter North" />
          <SingleLoadListingCard hotelName="100051844" />
          <Text text="The Westin Atlanta Perimeter North is located in the Perimeter Center district in Atlanta. This is a great pet-friendly option for your next trip to this city! With newly designed hotel rooms, comfortable mattresses, and flat-panel TVs, you will love your stay at this hotel." />
          <Text text="Pets are welcome to stay with you at this pet-friendly hotel in Atlanta. When you stay here, you can bring one pet with you. There is a $100 pet fee per stay as well." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Outdoor pool', 'Dining options']}
          />

          <Bold text="Home2 Suites by Hilton Atlanta Perimeter Center" />
          <SingleLoadListingCard hotelName="100055806" />
          <Text text="If you are looking for an extended-stay hotel, Home2 Suites by Hilton Atlanta Perimeter Center is a pet-friendly option. The hotel is near the hustle and bustle of Perimeter Mall and is just a 20-minute ride to downtown Atlanta." />
          <Text text="When staying at this pet-friendly hotel, you can bring two pets with you. You will pay a $100 non-refundable pet fee during your stay at Home2 Suites by Hilton Atlanta Perimeter Center." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Business center', 'Outdoor pool', 'Free hot breakfast']}
          />


          <Typography variant="h2">The Top Pet-Friendly Activities in Atlanta</Typography>
         
          <LinkContent
            link="https://piedmontpark.org/"
            linkText="Piedmont Park"
            text="Start your pet-friendly journey in Atlanta at the iconic Piedmont Park. This sprawling urban oasis offers designated off-leash areas where your dog can run and play freely. You will enjoy beautiful walking paths, scenery, and an opportunity to socialize with other pets. Piedmont Park is a must-visit destination for every pet owner!"
          />
          <Img 
            src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image8.png"
            text=""
          />

          <LinkContent
            link="https://fetchpark.com/"
            linkText="Fetch Park & Ice House"
            text="Treat your four-legged friend to a day of fun at Fetch Park & Ice House. This is Atlanta's first dog park and bar that both you and your dog will love! Dogs can roam off-leash in a secure, fenced area while you enjoy a refreshing beverage or snack from the bar. It's an ideal spot for both pet owners and their furry companions to relax and unwind."
          />
          <Img
            src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image1.png"
            text="Fetch Park"
          />

          <LinkContent
            link="https://www.nps.gov/chat/index.htm"
            linkText="Chattahoochee River National Recreation Area"
            text="For nature enthusiasts, you must plan a visit to the Chattahoochee River National Recreation Area! This vast wilderness area boasts scenic hiking trails along the river, perfect for leashed walks with your pet. Immerse yourself in nature and take in the breathtaking views, making memories that both you and your furry friend will cherish."
          />
          <Img 
            src="https://storage.cloud.google.com/romingo-production-public/destination%20images/Atlanta/image18.png"
            text="Conde Nast Traveler"
          />
        

          <LinkContent
            link="https://beltline.org/"
            linkText="The BeltLine"
            text="Explore the BeltLine, a former railway corridor converted into a pedestrian-friendly trail. This multi-use path welcomes pets on leashes, while you explore art installations, parks, and restaurants along the way. It's a fantastic way to experience Atlanta's cultural and culinary scene with your pet."
          />
          <Img
            src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image19.png"
            text="Discover Atlanta"
          />

          <LinkContent
            link="http://atlantafoodtruckpark.com/"
            linkText="Atlanta Food Truck Park & Market"
            text="Savor the flavors of Atlanta's diverse food truck scene at the Atlanta Food Truck Park & Market. Many of the trucks are pet-friendly, allowing you to enjoy delicious bites while your furry companion lounges nearby. With live music and a lively atmosphere, this spot guarantees a fun-filled day for both you and your pet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image10.png" text="Eater Atlanta" />

          <LinkContent
            link="https://www.batteryatl.com/"
            linkText="The Battery Atlanta"
            text="Explore The Battery Atlanta, a bustling entertainment district located near Truist Park, the home of the Atlanta Braves. Many outdoor restaurants and cafes in the area are pet-friendly in this area! This is a perfect opportunity to grab a meal or drink with your furry friend by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image2.png" text="The Battery Atlanta" />

          <LinkContent
            link="https://www.exploregeorgia.org/things-to-do/list/byop-bring-your-own-pup-to-these-georgia-breweries"
            linkText="Dog-Friendly Breweries"
            text="Atlanta's craft brewery scene is thriving, and many establishments warmly welcome pets. Several breweries offer outdoor seating where your dog can relax while you sample some local brews. Check out spots like New Realm Brewing Company or Orpheus Brewing for a pet-friendly experience."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image16.png" text="Explore Georgia" />

          <LinkContent
            link="https://www.poncecitymarket.com/"
            linkText="Ponce City Market"
            text="Take your pet on a shopping adventure at Ponce City Market, a trendy marketplace with pet-friendly stores. Enjoy browsing boutiques, art galleries, and specialty shops while your pet enjoys the attention of passersby."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image13.png" text="Ponce City Market" />

          <LinkContent
            link="https://piedmontpark.org/dog-parks/"
            linkText="Piedmont Dog Park"
            text="For pups who love to socialize, a visit to Piedmont Dog Park is a must. This fully fenced, off-leash park provides ample space for dogs to play and make new furry friends. It's a great opportunity for your pet to burn off energy and have a blast."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image7.png" text="Piedmont Park" />

          <LinkContent
            link="https://www.eventbrite.com/d/ga--atlanta/dog-events/"
            linkText="Atlanta Pet Festivals and Events"
            text="Keep an eye out for pet-friendly festivals and events happening around Atlanta throughout the year. From pet adoption events to dog parades, there's always something exciting for you and your pet to enjoy together."
          />


          <Typography variant="h2">The Top Pet-Friendly Restaurants in Atlanta</Typography>
       

          <LinkContent
            link="https://www.parkgroundsatl.com/"
            linkText="ParkGrounds"
            text="ParkGrounds is a beloved pet-friendly cafe that doubles as a dog park. Your pup can run and play off-leash in a spacious, fenced-in patio area while you enjoy your meal. The friendly staff even provides water bowls and doggy snacks, ensuring both you and your pet have a paw-some time."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image3.png" text="Atlanta Pet Life" />


          <LinkContent
            link="https://www.ladybirdatl.com/"
            linkText="Ladybird Grove & Mess Hall"
            text="Located along the Atlanta BeltLine, Ladybird Grove & Mess Hall welcomes pets on their picturesque patio overlooking the scenic surroundings. This restaurant serves Southern-inspired dishes and is an ideal spot for brunch or a relaxing dinner with your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image9.png" text="Ladybird" />

          <LinkContent
            link="https://henrysatl.com/"
            linkText="Henry's Midtown Tavern"
            text="Henry's Midtown Tavern offers a vibrant, pet-friendly patio with a diverse menu that caters to all tastes. With burgers, salads, and a wide selection of craft beers, you can have a delicious meal while your pet enjoys the outdoor environment."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image11.png" text="Henry's Midtown Tavern" />

          <LinkContent
            link="https://thenookatlanta.com/"
            linkText="The Nook on Piedmont Park"
            text="Situated near Piedmont Park, The Nook is a pet-friendly restaurant that boasts a charming outdoor patio. With a variety of food options, it's the perfect pet-friendly spot for a laid-back meal after a stroll in the park."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image4.png" text="The Nook" />


          <LinkContent
            link="https://maconbarksnbrews.com/"
            linkText="Bark & Brew"
            text="Bark & Brew offers the ultimate pet-friendly experience, combining a bar with an off-leash dog park. Your pet can make friends while you do too! Your pet will be able to run around in a spacious outdoor area while you sip on a beer."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image12.png" text="Bark & Brew" />

          <LinkContent 
            link="https://www.osteriamattone.com/"
            linkText="Osteria Mattone"
            text="For an authentic Italian experience, head to Osteria Mattone. Here, you and your pet are welcome to dine on their charming patio. The menu offers delicious pasta dishes, wood-fired pizzas, and a delightful wine selection. This restaurant offers a taste of Italy for both you and your furry companion!"
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image5.png" text="Osteria Mattone" />

          <LinkContent
            link="https://cypressatl.com/"
            linkText="Cypress Street Pint & Plate"
            text="Cypress Street Pint & Plate is a pet-friendly gastropub that features an extensive beer list and mouthwatering pub fare. Enjoy the laid-back ambiance on their dog-friendly patio while your pet lounges comfortably by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image15.png" text="Cypress Street Pint & Plate" />

          <LinkContent
            link="https://tinlizzyscantina.com/"
            linkText="Tin Lizzy’s Catina"
            text=" Craving Tex-Mex? Look no further than Tin Lizzy's Cantina, a pet-friendly restaurant with several locations across Atlanta. Enjoy tacos, fajitas, and refreshing margaritas at this pet-friendly restaurant in Atlanta."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image14.png" text="Tin Lizzy's Catina" />

          <LinkContent
            link="https://www.eltaco-atlanta.com/"
            linkText="The Original El Taco"
            text="Embrace the vibrant atmosphere at The Original El Taco, where your pet is welcome to join you on their outdoor patio. This pet-friendly Mexican restaurant offers a variety of flavorful tacos, enchiladas, and guacamole to satisfy your taste buds."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Atlanta/image6.png" text="The Original El Taco" />

          <LinkContent
            link="https://www.westeggcafe.com/"
            linkText="West Egg Cafe"
            text="West Egg Cafe is a charming pet-friendly spot, perfect for brunch or lunch with your furry friend. Their outdoor patio welcomes pets, and their menu features Southern comfort dishes and delectable breakfast options."
          />

        </Box>


        
        <Grid mt="1.5rem" item xs={12} sx={{ mb: 1 }}>
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

export default Atlanta;
