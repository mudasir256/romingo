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

const Nashville: FC = () => {

  //TODO:
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Los Angeles, CA');

  const city = 'Nashville'
  const paragraphOne = ""


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

  //TODO:
  return <>
    <Helmet>
      <title>Pet Friendly Hotels Minneapolis, MN | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, MN | Romingo`}
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
          MINNESOTA
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
            For a memorable experience, pet parents can visit Minnehaha Regional Park, offering scenic trails and a breathtaking waterfall that will surely captivate both humans and pets alike. With an array of pet-friendly hotels, ranging from boutique inns to luxury resorts, travelers can rest assured that their beloved pets will receive the same level of hospitality as they do. In Minneapolis, the bond between humans and their pets is cherished, creating a welcoming and unforgettable experience for all pet-loving travelers.
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
          <Typography component="h2" variant="h2">The Top Pet-Friendly Accommodations in Minneapolis</Typography>
        

          <Bold text="Loews Minneapolis Hotel" />
          <SingleLoadListingCard hotelName="100410586" />
          <Text text="The Loews Minneapolis Hotel stands as a luxurious and contemporary haven in the heart of the vibrant cityscape. Nestled in downtown Minneapolis, this sophisticated establishment offers a seamless fusion of modern design and warm hospitality. With its sleek architecture and refined interiors, the hotel provides a perfect blend of comfort and elegance. " />
          <Text text="The meticulously appointed rooms and suites offer breathtaking views of the city skyline, while the thoughtful amenities cater to the needs of both leisure and business travelers. The hotel's culinary offerings are equally enticing, featuring innovative cuisine crafted from locally sourced ingredients. Whether it's unwinding in the stylish lounge, hosting an event in the state-of-the-art meeting spaces, or simply indulging in the tranquil spa, the Loews Minneapolis Hotel promises an exceptional urban retreat that embodies the essence of luxury and urban sophistication." />
          <Text text="Loews Minneapolis Hotel is pet-friendly and allows you to bring two pets of any size for $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site dining options', "On-site bar options", "Business center"]}
          />


          <Bold text="Hyatt Centric Downtown Minneapolis" />
          <SingleLoadListingCard hotelName="100420974" />
          <Text text="Hyatt Centric Downtown Minneapolis epitomizes urban charm and timeless elegance in the heart of downtown Minneapolis. This distinctive hotel seamlessly combines historic architectural elements with contemporary design, creating an ambiance that is both inviting and sophisticated. Located within close proximity to renowned cultural attractions and entertainment venues, the Hyatt Centric Downtown Minneapolis offers an ideal starting point for exploring the city's vibrant scene. The guest rooms and suites are meticulously curated to provide comfort and style, while the hotel's commitment to personalized service ensures a memorable stay for every guest. Dining experiences at the hotel's restaurants showcase a culinary journey that celebrates local flavors and global inspirations." />
          <Text text="With its impeccable blend of classic grandeur and modern comforts, the Hyatt Centric Downtown Minneapolis offers a distinctive retreat that captures the essence of the city's rich heritage and dynamic spirit." />
          <Text text="The Hyatt Centric Downtown Minneapolis is pet-friendly and allows you to bring up to 2 pets of any sizes for a one-time $75 pet fee (1 pet) or a one-time $100 pet fee (2 pets)." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Yoga mats', 'Fitness center', 'On-site dining options', 'On-site bar options', 'Business center']}
          />


          <Bold text="AC Hotel by Marriott Minneapolis Downtown" />
          <SingleLoadListingCard hotelName="100682023" />
          <Text text="The AC Hotel by Marriott Minneapolis Downtown stands as a contemporary and stylish urban oasis in the heart of Minneapolis. With its sleek and minimalist design, this hotel offers a refreshing blend of European elegance and modern sophistication. Situated in a prime downtown location, it provides easy access to the city's cultural attractions, dining, and entertainment options. " />
          <Text text="The hotel's social spaces exude a cosmopolitan ambiance, creating a welcoming environment for guests to relax, work, or connect. Whether it's enjoying artisanal cocktails at the bar, savoring delectable cuisine at the on-site restaurant, or taking in panoramic city views from the rooftop terrace, the AC Hotel by Marriott Minneapolis Downtown offers a distinctive experience that encapsulates modern elegance and urban allure." />
          <Text text="The AC Hotel by Marriott Minneapolis is pet-friendly and allows you to bring one pet of any size for $50 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Rooftop', 'On-site dining options', 'On-site bar options', 'Business center']}
          />


          <Bold text='The Westin Minneapolis' />
          <SingleLoadListingCard hotelName="100423510" />
          <Text text="The Westin Minneapolis stands as a refined haven of comfort and luxury at the heart of downtown Minneapolis. Housed within a historic landmark, this hotel seamlessly blends classic architecture with modern amenities, creating an ambiance that's both sophisticated and inviting. The guest rooms and suites are elegantly appointed, offering a serene retreat with plush bedding, contemporary furnishings, and state-of-the-art technology. " />
          <Text text="With its central location, the hotel provides easy access to the city's cultural landmarks, shopping districts, and dining options. The Westin's commitment to wellness is evident through offerings such as the WestinWORKOUT® fitness studio and signature Heavenly® Bed, ensuring a restful and rejuvenating stay for guests. Whether unwinding at the hotel's signature restaurant, hosting events in the versatile meeting spaces, or simply indulging in relaxation at the spa, The Westin Minneapolis promises a refined and enriching urban escape that combines timeless charm with modern comforts." />
          <Text text="The Westin Minneapolis is pet-friendly and allows you to bring one dog up to 40 pounds for no additional fee. " />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Spa services', 'On-site dining options', 'On-site bar options', 'Business center']}
          />

          <Bold text="Hewing Hotel"  />
          <SingleLoadListingCard hotelName="100191860" />
          <Text text="The Hewing Hotel stands as a distinctive and captivating retreat in the heart of Minneapolis' North Loop neighborhood. Nestled within a historic warehouse building, this boutique hotel seamlessly merges the area's industrial heritage with contemporary design and upscale amenities. The guest rooms and suites exude a blend of rustic elegance and modern comfort, featuring exposed brick walls, original timber beams, and luxurious furnishings that create a unique and inviting atmosphere. " />
          <Text text="The hotel's emphasis on local culture is evident in its curated art collection, locally sourced cuisine, and vibrant rooftop bar, offering stunning views of the city skyline. With its proximity to eclectic boutiques, galleries, and trendy eateries, the Hewing Hotel provides an authentic urban experience that captures the essence of Minneapolis' creative spirit and urban charm." />        
          <Text text="Hewing Hotel is pet-friendly and allows you to bring two pets of any size for a fee of $75 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop bar', 'Fitness center', 'On-site dining options', 'On-site bar options', 'Business center', 'Shopping and boutiques']}
          />

          <Bold text="The Graduate Hotel Minneapolis" />
          <SingleLoadListingCard hotelName="100015582" />
          <Text text="The Graduate Hotel Minneapolis embodies a spirited blend of youthful energy and classic charm in the heart of the city. Reflecting the vibrant college town culture, this hotel offers a unique and nostalgic experience that pays homage to its surroundings. The guest rooms and suites are thoughtfully designed with a playful and eclectic touch, featuring elements that evoke memories of campus life and local heritage. The hotel's communal spaces exude a lively ambiance, inviting guests to connect, socialize, and create memorable moments. " />
          <Text text="Located within close proximity to the University of Minnesota campus and other cultural attractions, the Graduate Hotel provides an ideal base for exploring the city's dynamic arts scene, diverse dining options, and lively entertainment. Whether it's unwinding at the rooftop bar with panoramic views, immersing in the colorful decor, or discovering local artistry woven into the hotel's design, the Graduate Hotel Minneapolis offers an engaging and distinctive stay that captures the youthful spirit of the city." />
          <Text text="The Graduate Hotel Minneapolis is pet-friendly and allows you to bring two dogs of any size for a fee of $75 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'On-site dining options', 'On-site bar options', 'Rooftop bar']}
          />

          <Typography variant="h2">The Top Pet-Friendly Activities in Milwaukee</Typography>


          <LinkContent
            link="https://www.minneapolisparks.org/parks-destinations/parks-lakes/minnehaha_regional_park/"
            linkText="Minnehaha Regional Park"
            text="A visit to Minneapolis wouldn't be complete without exploring Minnehaha Regional Park. Leash up your pup and take a scenic walk along the trails leading to the iconic Minnehaha Falls. The park also has off-leash areas where your canine companion can socialize and play with other dogs."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image15.png" text="Explore Minnesota" />

          <LinkContent
            link="https://www.minneapolisparks.org/parks-destinations/parks-lakes/lake_of_the_isles_park/"
            linkText="Lake of the Isles"
            text="This picturesque lake is a haven for pet owners and their furry pals. Put on your walking shoes, grab a leash, and take a leisurely stroll along the scenic paths that encircle the lake. Your pup will love the fresh air and beautiful views."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image3.png" text="Minneapolis Parks" />
          
          <LinkContent
            link="https://www.minneapolisparks.org/parks-destinations/historical_sites/stone_arch_bridge/"
            linkText="Stone Arch Bridge"
            text="Take a historic walk across the Stone Arch Bridge, which offers breathtaking views of the Minneapolis skyline and the Mississippi River. Pets are welcome, and the bridge provides an excellent photo opportunity with your furry companion."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image12.png" text="National Park Services" />

          <LinkContent
            link="https://www.minneapolisparks.org/parks-destinations/parks-lakes/bde_maka_ska_park/"
            linkText="Bde Maka Ska (formerly Lake Calhoun)"
            text="A trip to Minneapolis wouldn't be complete without a visit to one of its iconic lakes. Bde Maka Ska is a pet-friendly gem that allows leashed pets to walk with you along the shoreline and enjoy the calming waterside ambiance."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image14.png" text="MPR News" />

          <LinkContent
            link="https://www.sidewalkdog.com/mn-dog-friendly-coffee-shops/"
            linkText="Cafes and Breweries"
            text="Minneapolis boasts several pet-friendly cafes and breweries where you can savor delicious treats and beverages with your pet by your side. Many establishments have outdoor seating that welcomes four-legged guests."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image10.png" text="Local Pet Care" />

          <LinkContent
            link="https://www.minneapolis.org/things-to-do/itineraries/52-must-sees/st-anthony-main/"
            linkText="St. Anthony Main"
            text="Explore the charming St. Anthony Main area with your pet. Take a stroll along the cobblestone streets and enjoy the scenic views of the Mississippi River. Many cafes and restaurants here also offer pet-friendly outdoor seating."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image4.png" text="Meet Minneapolis" />
          <LinkContent
            link="https://www.minneapolisparks.org/parks-destinations/parks-lakes/gardens__bird_sanctuaries/lyndale_park_rose_garden/"
            linkText="Lake Harriet Rose Garden"
            text="Discover the beauty of the Lake Harriet Rose Garden while walking with your furry friend. Leashed dogs are welcome to enjoy the sights and scents of the colorful blooms in this picturesque garden."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image20.png" text="Visit Twin Cities" />

          <LinkContent
            link="https://urbantailspet.com/"
            linkText="Urban Tails Pet Supply"
            text="If you're looking to pamper your pet, head to Urban Tails Pet Supply. This pet-friendly store offers a wide range of pet products, from high-quality food to fun toys for your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image9.png" text="Stella & Chewy's" />

          <LinkContent
            link="https://www.wildlifesciencecenter.org/upcoming-events/canine-carnival"
            linkText="Canine Carnival"
            text="If you happen to visit Minneapolis during the summer, don't miss the annual Canine Carnival at the Lake Harriet Bandshell. This fun-filled event includes pet-friendly activities, contests, and a doggy play zone."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image18.png" text="Pioneer Press" />

          <LinkContent
            link="https://wheelfunrentals.com/mn/minneapolis/lake-nokomis/about/social-medias/pet-friendly-pedal-boat-rides-in-minnesota"
            linkText="Pet-Friendly Boat Tours"
            text="Treat your pet to a unique experience with pet-friendly boat tours on the Mississippi River. Some operators allow well-behaved dogs on board, so you and your furry friend can enjoy the scenic views together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image6.png" text="Explore Minnesota" />

       
          <Typography variant="h2">The Top Pet-Friendly Restaurants in Minneapolis</Typography>
          
          <LinkContent
            link="https://howempls.com/"
            linkText="The Howe Daily Kitchen & Bar"
            text="This neighborhood gem in the Longfellow area offers a relaxed and pet-friendly atmosphere. The Howe boasts a spacious patio where you and your pup can enjoy delicious comfort food, craft beers, and cocktails."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image7.png" text="The Howe" />

          <LinkContent
            link="https://www.freehousempls.com/"
            linkText="The Freehouse"
            text="Located in the North Loop neighborhood, The Freehouse is a pet-friendly brewpub with a vast outdoor seating area. While you savor their freshly brewed beers and creative dishes, your furry friend can relax comfortably at your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image1.png" text="Heavy Table" />

          <LinkContent
            link="https://stanleysbarroom.com/"
            linkText="Stanley's Northeast Bar Room"
            text="With its dog-friendly patio and a menu featuring a fusion of American classics and creative dishes, Stanley's Northeast is a perfect spot to dine with your pet. The lively ambiance and friendly staff will make both you and your furry friend feel right at home."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image16.png" text="Stanley's" />

          <LinkContent
            link="https://www.tiliampls.com/"
            linkText="Tilia"
            text="Tilia, situated in the Linden Hills neighborhood, offers a delightful and pet-friendly patio. The restaurant's focus on seasonal and locally sourced ingredients ensures a delectable dining experience for you and your pup."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image17.png" text="Tilia" />

          <LinkContent
            link="https://www.psychosuzis.com/"
            linkText="Psycho Suzi's Motor Lounge"
            text="For a unique dining experience, head to Psycho Suzi's, a pet-friendly tiki-themed restaurant. Its riverfront patio offers scenic views of the Mississippi River, making it a fantastic spot for a meal with your furry friend." 
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image5.png" text="Minneapolis Northwest" />

          <LinkContent
            link="https://www.lakeandirving.com/"
            linkText="Lake & Irving"
            text="Lake & Irving's pet-friendly patio in Uptown Minneapolis is the perfect place to enjoy contemporary American cuisine with your pup. Their menu features a variety of dishes to suit all tastes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image2.png" text="Lake & Irving" />

          <LinkContent
            link="https://www.thelowryuptown.com/"
            linkText="The Lowry"
            text="Located in the Uptown area, The Lowry is a pet-friendly establishment that serves up classic American fare. With its inviting atmosphere and outdoor seating, you can relish your meal while your furry companion relaxes by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image19.png" text="Tanek" />

          <LinkContent
            link="https://www.thelynhall.com/"
            linkText="The Lynhall"
            text="The Lynhall is a culinary collective that welcomes pets on its beautiful patio. Enjoy artisanal food and specialty coffee while your pet lounges comfortably beside you."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image8.png" text="Lynhall" />

          <LinkContent
            link="https://www.pizzerialola.com/"
            linkText="Pizzeria Lola"
            text="Craving pizza? Pizzeria Lola is a pet-friendly restaurant in Southwest Minneapolis that serves up delectable wood-fired pizzas. Your furry friend can join you on the patio as you indulge in delightful flavors."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image13.png" text="Pizzeria Lola" />

          <LinkContent
            link="https://www.hi-lo-diner.com/"
            linkText="Hi-Lo Diner"
            text="This retro-style diner in the Longfellow neighborhood is not only pet-friendly but also known for its mouthwatering diner classics. Your pet will love the patio ambiance while you savor your meal."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Minneapolis/image11.png" text="MPR News" />

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

export default Nashville;
