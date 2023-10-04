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
    "description": "Palm Springs, CA, USA",
    "matched_substrings": [
        {
            "length": 7,
            "offset": 0
        }
    ],
    "place_id": "ChIJs-Xb_9Qa24ARfHntwodp5aE",
    "reference": "ChIJs-Xb_9Qa24ARfHntwodp5aE",
    "structured_formatting": {
        "main_text": "Palm Springs",
        "main_text_matched_substrings": [
            {
                "length": 7,
                "offset": 0
            }
        ],
        "secondary_text": "CA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Palm Springs"
        },
        {
            "offset": 14,
            "value": "CA"
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
"lat": 33.8302961,
"lng": -116.5452921
}

const PalmSprings: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Palm Springs, CA');

  const city = 'Palm Springs'
  const paragraphOne = "Palm Springs, a desert oasis renowned for its stunning landscapes and luxurious resorts, welcomes travelers and their pets with welcome arms. From hiking trails to pet-friendly restaurants, there are tons of opportunities to explore Palm Springs with your four-legged friends."

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
      <title>Pet Friendly Hotels Palm Springs, CA | Romingo</title>
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
            We&apos;ve compiled our favorite hotels, activities, and restaurants for you to explore in Palm Springs with your pet. Pack your bags, grab your pet&apos;s leash, and get ready for an amazing journey of relaxation and exploration in Palm Springs.
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
          maxWidth="760px"
        >
          <Divider />
          <Typography component="h2" variant="h2"> The Top Pet Friendly Accommodations in Palm Springs</Typography>
          <Text text="Palm Springs, with its breathtaking landscapes and year-round sunshine, is a dream destination for travelers seeking a relaxing getaway. Let's explore six of the best pet-friendly hotels in Palm Springs that will leave you with lifelong memories." />

    
          <Bold text="The Westin Mission Hills Golf Resort & Spa" />
          <SingleLoadListingCard hotelName="100061580" />
          <Text text="The Westin Mission Hills Golf Resort & Spa is a picturesque retreat nestled amidst the stunning landscapes of Palm Springs, California. This elegant resort offers a seamless blend of modern comforts and the serene beauty of the desert surroundings. The resort's extensive spa facilities invite guests to unwind and rejuvenate with a variety of treatments and therapies." />
          <Text text="The Westin Mission Hills Golf Resort & Spa pampers pets with pet beds, food and water bowls, and special treats. The resort also features expansive grounds, perfect for leisurely strolls with your pets. With two championship golf courses and a luxurious spa, it's an ideal spot for both relaxation and recreation. The hotel allows you to bring up to two dogs that weigh less than 50 pounds." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pools with waterslide', 'Pool bar', 'On-site dining options', 'On-site putting green']}
          />

          <Bold text="Kimpton Rowan Palm Springs" />
          <SingleLoadListingCard hotelName="100196902" />
          <Text text="Find respite in the sophistication at Kimpton Rowan Palm Springs, a pet-friendly haven. This refined hotel caters to the needs of travelers and their pets, ensuring an indelible and enjoyable stay for all." />
          <Text text="Positioned ideally, Kimpton Rowan Palm Springs offers seamless access to Palm Springs' top attractions. The hotel also has a pet-friendly park that your furry companion can enjoy during your stay." />
          <Text text="As part of the Kimpton Hotels chain, the hotel warmly welcomes pets, providing special amenities and treats for furry companions. Kimpton Pittman Hotel loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop pool with expansive views', 'On-site dining options', 'On-site bars', 'Sunrise cofee service', 'Hosted evening social hour', 'Yoga mats', 'In-room spa services']}
          />


          <Bold text="Ace Hotel & Swim Club" />
          <SingleLoadListingCard hotelName="100435818" />
          <Text text="Ace Hotel & Swim Club Palm Springs is in a converted 1960s desert motel and showcases a retro-chic ambiance. The hotel features beautifully designed rooms, ranging from cozy studios to spacious suites." />
          <Text text="When traveling to this hotel, you are allowed to bring one dog that weighs up to 25 pounds with a fee of $25 per night; if you bring two dogs, the fee is $35 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pools', 'On-site events', 'Spa services', 'On-site dining options', 'Fitness center']}
          />

          <Bold text="Ingleside Inn Palm Springs" />
          <SingleLoadListingCard hotelName="100408702" />
          <Text text="Ingleside Inn Palm Springs is a delightful pet-friendly hotel that exudes an elegant ambiance and boasts a prime location. Luxurious rooms are well-designed, ensuring a comfortable and pampering retreat for both you and your furry companion." />
          <Text text="This hotel welcomes up to two dogs weighing up to 25 lbs for a fee of $100 per pet, per stay. Please bear in mind that feline friends will have to sit this one out. As an added bonus, a dog park is close to the hotel so your dog can mingle with other pets." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining', 'Multiple outdoor pools', 'Fitness center', 'Courtyard with hammocks and fire pits', 'Hot tub', 'Spa services']}
          />

          <Bold text="Hyatt Palm Springs" />
          <SingleLoadListingCard hotelName="100084728" />
          <Text text="Situated in the heart of downtown Palm Springs, the Hyatt Palm Springs is a convenient and pet-friendly hotel. Guests can easily explore the city's vibrant cultural scene, boutique shops, and diverse dining options. At the hotel, guests can relax by the outdoor heated pool, enjoy a dip in the hot tub, or explore the fitness center." />
          <Text text="Hyatt Palm Springs welcomes dogs of all sizes, making it an excellent choice for families with large dogs. If you do travel with your dogs to this hotel, there is a $50 fee per pet, per stay. The hotel's central location allows for easy access to pet-friendly restaurants and shops in the area." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining', 'Fitness center', 'Pool']}
          />

          <Bold text="The Saguaro Palm Springs" />
          <SingleLoadListingCard hotelName="100027158" />
          <Text text="The Saguaro Palm Springs is a pet-friendly and stylish hotel that is in downtown Palm Springs. This hotel is in the heart of Palm Springs and has a rainbow-colored exterior and exciting atmosphere. The hotel has a large pool area where guests can enjoy the sun, lounge on daybeds, and enjoy cocktails from the bar. The Saguaro's restaurant, El Jefe, serves up delicious tacos, margaritas, and other flavorful dishes that perfectly complement the hotel's festive ambiance." />
          <Text text="The Saguaro Palm Springs allows you to bring your pets for a $50 fee. They kindly ask that you inform the front desk ahead of your arrival if you do plan on bringing your pets." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Outdoor pool with cabanas', 'Spa services', 'Fitness center', 'Weekend yoga', 'Desert cruiser bikes', 'On-site dining options']}
          />
    
          <Text text="With desert landscapes, pet-friendly hiking trails, and activities for everyone, Palm Springs is a great destination for a vacation." />

          <Typography variant="h2">The Top Pet-Friendly Activities in Palm Springs</Typography>
          <Text text="From outdoor adventures to pet-friendly dining, Palm Springs has many activities that will keep both you and your pets entertained. Here are ten of the best pet-friendly activities in Palm Springs:" />

          <LinkContent
            link="https://www.palmspringsca.gov/government/departments/parks-recreation/parks-facilities/dog-park"
            linkText="Palm Springs Dog Park"
            text="Start your pet-friendly adventure with a visit to Palm Springs Dog Park. This off-leash park features separate areas for large and small dogs, allowing your pets to socialize and play freely. The park has water fountains and shade structures so that your pet stays cool and comfortable while playing with their friends."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image20.png" text="City of Palm Springs" />

          <LinkContent
            link="https://www.indian-canyons.com/indian_canyons"
            linkText="Indian Canyons"
            text="Embark on a scenic hike with your dog at the Indian Canyons. Leashed pets are welcome on the miles of hiking trails that wind through the beautiful desert canyons and oases. The lush vegetation and serene landscapes make this an enjoyable and picturesque outing for both you and your pets."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image10.png" text="Indian Canyons" />


          <LinkContent
            link="https://villagefest.org/"
            linkText="Palm Springs VillageFest"
            text="On Thursday evenings, head to the Palm Springs VillageFest, a bustling street fair that welcomes pets on leashes. You and your furry friend can explore the vibrant market filled with local vendors, food stalls, and live entertainment. It's a great opportunity for your pets to experience the lively atmosphere of Palm Springs."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Palm%20Springs%20VillageFest.jpeg" text="https://www.visitcalifornia.com/in/attraction/palm-springs-villagefest" />

          <LinkContent
            link="https://pstramway.com/"
            linkText="The Palm Springs Aerial Tramway"
            text="Take your pet on an adventure to the Palm Springs Aerial Tramway. Enjoy the amazing views of Coachella Valley from the Mountain Station after you take the tram up the San Jacinto Mountains. Once you journey to the top, you and your furry friend can enjoy short hikes along the nature trails!"
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image17.png" text="Palm Springs Tramway" />

          <LinkContent 
            link="https://hikingguy.com/hiking-trails/los-angeles-hikes/cactus-to-clouds-hike/"
            linkText="Cactus to Clouds Trail"
            text="If you and your dog are avid hikers, consider conquering the Cactus to Clouds Trail. This trail is a favorite amongst locals as you climb to the top of San Jacinto Mountain. Be sure to prepare plenty of water and snacks for both you and your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Cactus.jpeg" text="https://hikingguy.com/hiking-trails/los-angeles-hikes/cactus-to-clouds-hike/" />
      
          <LinkContent
            link="http://www.moortenbotanicalgarden.com/"
            linkText="Moorten Botanical Garden"
            text="Explore the unique and beautiful Moorten Botanical Garden, which allows leashed pets to accompany their owners. This desert garden showcases an impressive collection of cacti and other desert plants. It's a relaxing and educational outing that both you and your pets will enjoy."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image19.png" text="Moorten Botanical Garden" />

          <LinkContent
            link="https://visitpalmsprings.com/dog-friendly-palm-springs-restaurants/"
            linkText="Dog-Friendly Dining"
            text="Palm Springs boasts a variety of pet-friendly restaurants and cafes with outdoor seating areas where pets are welcome. Treat your furry friend to a meal while you enjoy a delightful dining experience together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image7.png" text="Visit Palm Springs" />

          <LinkContent
            link="https://www.psmuseum.org/visit/palm-desert"
            linkText="Palm Springs Art Museum in the Faye Sarkowsky Sculpture Garden"
            text="Pets are permitted in the Faye Sarkowsky Sculpture Garden at the Palm Springs Art Museum. Take a leisurely stroll through the garden, surrounded by impressive sculptures and beautiful desert landscaping."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image6.png" text="Palm Springs Art Museum" />

          <LinkContent
            link="https://www.livingdesert.org/"
            linkText="Living Desert Zoo and Gardens"
            text="Pets are not allowed at the Living Desert Zoo and Gardens, but your pet can stay at the zoo's Pet Hotel while you enjoy exploring the zoo. This remarkable zoo showcases desert wildlife and botanical gardens, providing a unique learning experience."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image9.png" text="Living Desert" />

          <LinkContent
            link="https://www.airbnb.com/s/Palm-Springs--CA/experiences"
            linkText="Airbnb Experiences"
            text="For a tailored pet-friendly experience, check out Airbnb Experiences in Palm Springs. Some hosts offer activities that include your pets, such as guided hikes, pet photography sessions, and more."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Airbnb%20Experiences.jpeg" text="https://www.timeout.com/palm-springs/hotels/best-airbnbs-in-palm-springs" />

          <Text text="Try these ten pet-friendly activities in Palm Springs to create memories with your furry friends in this desert paradise." />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Palm Springs</Typography>
          <Text text="Exploring Palm Springs becomes even more enjoyable when you can dine out with your pets by your side. Palm Springs offers a variety of pet-friendly restaurants that cater to both you and your four-legged friends. Here are the top 10 pet-friendly restaurants in Palm Springs:" />
          <LinkContent
            link="https://www.lulupalmsprings.com/"
            linkText="Lulu California Bistro"
            text="Located in the heart of downtown Palm Springs, Lulu California Bistro welcomes pets on its outdoor patio. This restaurant has a large menu that features many food options, ensuring an enjoyable dining experience for you while your pets relax comfortably by your side."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image16.png" text="Lulu California Bistro" />

          <LinkContent
            link="https://www.jakespalmsprings.com/"
            linkText="Jake's Palm Springs"
            text="Jake's Palm Springs has a pet-friendly patio that allows your furry friends to enjoy the company of other pets while you enjoy the food and cocktails."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Jake's%20Palm%20Springs.webp" text="https://www.desertsun.com/story/life/2020/03/27/jakes-palm-springs-gofundme-assists-laid-off-employees/2923300001/" />

          <LinkContent
            link="https://www.cheekysps.com/"
            linkText="Cheeky's Palm Springs"
            text="For a delightful breakfast or brunch outing with your pets, Cheeky's Palm Springs is the place to be. Their pet-friendly patio offers a charming ambiance, and they even provide water bowls and treats for your furry friends. Don't miss their famous bacon flights and seasonal specialties."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image14.png" text="Cheeky’s Palm Springs" />

          <LinkContent
            link="https://triopalmsprings.com/"
            linkText="Trio Restaurant"
            text="Trio Restaurant is a popular dining destination known for its modern American cuisine. They have a pet-friendly patio that your dog can enjoy while you eat a delicious meal in the sun."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image4.png" text="Trio Restaurant" />

          <LinkContent
            link="https://www.workshopkitchenbar.com/"
            linkText="Workshop Kitchen + Bar"
            text="Famed for its industrial-chic setting and farm-to-table fare, Workshop Kitchen + Bar welcomes pets on their outdoor patio. Indulge in their seasonal menu and craft cocktails while your pets lounge comfortably by your side."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image13.png" text="Workshop Kitchen + Bar" />

          <LinkContent
            link="https://www.kingshighwaydiner.com/"
            linkText="King's Highway at Ace Hotel"
            text="Located within the trendy Ace Hotel, King's Highway is a retro-inspired restaurant that warmly welcomes pets on its outdoor patio. Enjoy a delicious breakfast, lunch, or dinner with your pets as you bask in this unique dining spot."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image11.png" text="King’s Highway at Ace Hotel" />

          <LinkContent
            link="https://visitpalmsprings.com/eat-and-drink/bills-pizza-palm-springs/"
            linkText="Bill's Pizza"
            text="While in Palm Springs, head to Bill's Pizza, where pets are welcome on their patio. This local restaurant has a variety of pizza options, ensuring a delightful pizza experience for you and your pets alike."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/Bill's%20Pizza.jpeg" text="https://www.joshuakennon.com/bills-pizza-palm-springs-deserves-cult-following/" />

          <LinkContent
            link="https://azucarpalmsprings.com/"
            linkText="Azucar at La Serena Villas"
            text="Azucar, located at La Serena Villas, is a pet-friendly restaurant offering Latin-inspired dishes and craft cocktails. Their tranquil patio provides a cozy and relaxed setting for you and your pets to enjoy a delicious meal together."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image12.png" text="Azucar at La Serena Villas" />

          <LinkContent
            link="https://farmpalmsprings.com/"
            linkText="FARM"
            text="For a delightful farm-to-table experience, visit FARM at the La Plaza shopping district. Their pet-friendly patio is the perfect spot to indulge in fresh, locally sourced ingredients and contemporary American cuisine."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/FARM.jpeg" text="https://www.visitgreaterpalmsprings.com/listing/farm-palm-springs/25904/" />

          <LinkContent
            link="https://www.copleyspalmsprings.com/"
            linkText="Copley's on Palm Canyon"
            text="Set in a historic adobe house, Copley's on Palm Canyon offers a pet-friendly patio surrounded by lush gardens. Experience refined American cuisine while your pets enjoy a serene and beautiful environment."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Palm%20Springs/image1.png"
           text="Copley's on Palm Canyon" />



        </Box>


        
        <Grid mt="2rem" item xs={12} sx={{ mb: 1 }}>
          <Divider light variant='middle' sx={{ mb: 1 }}>
            <Typography variant='body1' color='text.secondary'>
              BOOK PET-FRIENDLY TRAVEL
            </Typography>
          </Divider>
          <Hidden mdDown>
            <Box sx={{ ml: '-1.25em', mb: '0.75em' }}>
              <LargeFilterBar city={searchData}  />
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

export default PalmSprings;
