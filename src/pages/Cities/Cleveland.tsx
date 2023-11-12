import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography, useMediaQuery } from "@mui/material";

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

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'


const searchData = {
  "city": {
    "description": "Cleveland, OH, USA",
    "matched_substrings": [
        {
            "length": 9,
            "offset": 0
        }
    ],
    "place_id": "ChIJLWto4y7vMIgRQhhi91XLBO0",
    "reference": "ChIJLWto4y7vMIgRQhhi91XLBO0",
    "structured_formatting": {
        "main_text": "Cleveland",
        "main_text_matched_substrings": [
            {
                "length": 9,
                "offset": 0
            }
        ],
        "secondary_text": "OH, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Cleveland"
        },
        {
            "offset": 11,
            "value": "OH"
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
"lat": 41.49932,
"lng": -81.6943605
}

const Cleveland: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Cleveland');

  const city = 'Cleveland'
  const paragraphOne = "Cleveland offers a delightful array of pet-friendly travel experiences for you and your furry companions. Whether you're exploring the lush parks, strolling along the picturesque waterfront, or visiting pet-welcoming attractions, there's something for everyone in this pet-loving metropolis."

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

  const mobile = useMediaQuery("(max-width:800px)");

  const Img = ({ src, text }) => (<>
    <img loading="lazy" style={{ marginTop: "-1rem", borderRadius: 6, maxHeight: '480px', objectFit: 'cover' }} src={src} />
    <Typography mt="-1.25rem" variant="base" component="p">Photo Credit: {text}</Typography>
  </>)

  return <>
    <Helmet>
      <title>Pet Friendly Hotels Cleveland, OH | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, OH | Romingo`}
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
          OHIO
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
        <Box display="flex" flexDirection="column" gap="0.75rem">
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            {paragraphOne}
          </Typography>
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            Take a leisurely walk in Edgewater Park, where your pooch can frolic freely on the sandy shores and splash in the waves. Don&apos;t miss the chance to explore the charming neighborhoods, such as Ohio City, that boast pet-friendly cafes and shops, allowing you and your pet to enjoy the city&apos;s vibrant atmosphere together. Head to one of the city&apos;s dog-friendly breweries or restaurants that offer specialized menus for your loyal companions.
          </Typography>
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            With its blend of welcoming locals, scenic parks, and pet-friendly establishments, Cleveland promises an unforgettable and fantastic adventure for both you and your beloved pets.
          </Typography>
        </Box>
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
          <Typography component="h2" variant="h2"> The Top Pet Friendly Accommodations in Cleveland</Typography>
          <Text text="Whether exploring the Magnificent Mile, visiting the Navy Pier, or simply enjoying the city&apos;s welcoming atmosphere, Chicago&apos;s dedication to pet-friendly amenities makes it an excellent destination for travelers seeking to share their adventures with their loyal pets."/>
          
     
          <SingleLoadListingCard 
            hotelName="100184252" 
            paragraphs={[
              "Housed in a historic building that exudes old-world charm, Kimpton Schofield Hotel property seamlessly blends modern amenities with timeless elegance. The guest rooms at the Kimpton Schofield are tastefully designed, featuring chic decor, luxurious linens, and unique touches that reflect the hotel's distinct personality.",
              "The hotel's on-site restaurant showcases the region's culinary delights, while the rooftop bar offers stunning views of the city skyline. Its prime location allows easy access to cultural landmarks, sports arenas, and entertainment venues.",
              "Kimpton Schofield Hotel is pet-friendly and allows pets of all sizes with no weight restrictions. The hotel offers pet amenities, including plush pet beds, food bowls, and a selection of treats"
            ]}
          />
      
          
          <SingleLoadListingCard
            hotelName="100082888"
            paragraphs={[
              "Part of the Autograph Collection by Marriott, Metropolitan at The 9 is a hotel in Cleveland that offers a great experience for its guests. Housed in the historic Cleveland Trust building, The Metropolitan at The 9 seamlessly blends classic architecture with modern luxury, creating a captivating ambiance throughout.",
              "The hotel's rooftop bar, Azure, provides breathtaking views of the city skyline, while the chic, industrial-inspired lobby features an awe-inspiring 40-foot-tall art installation.",
              "Additionally, The Metropolitan at The 9 is home to a cutting-edge theater and a diverse selection of dining options, including a renowned restaurant curated by a celebrity chef.",
              "Metropolitan at The 9 is pet-friendly and welcomes two dogs that weigh up to 75 pounds for a fee of $100.",

            ]}
          />
       


     
          <SingleLoadListingCard 
            hotelName="100053276" 
            paragraphs={[
              "Aloft Cleveland Downtown is a trendy and modern hotel located in the vibrant Flats East Bank district of Cleveland, Ohio. The guest rooms at Aloft Cleveland Downtown are thoughtfully designed, featuring contemporary furnishings, vibrant colors, and tech-savvy amenities that cater to the needs of today's travelers.",
              "The hotel's W XYZ Bar is a popular hangout spot, serving craft cocktails and hosting live music events, creating a lively and social ambiance. Guests can stay active in the 24/7 fitness center or take a dip in the indoor pool with floor-to-ceiling windows, offering scenic views of the Cuyahoga River.",
              "Aloft Cleveland Downtown is pet-friendly and allows you to bring pets that weigh up to 40 pounds for no additional fee."
            ]}
          />
          
          <SingleLoadListingCard 
            hotelName="100182536" 
            paragraphs={[
              "The Drury Plaza Hotel Cleveland Downtown is a welcoming and elegant hotel situated in the heart of downtown Cleveland, Ohio. As part of the esteemed Drury Hotels chain, this property offers a blend of sophistication and comfort.",
              "The rooftop pool and fitness center offer opportunities for relaxation while enjoying panoramic views of the city. With its central location, the hotel is conveniently located near popular attractions such as the Rock & Roll Hall of Fame, Progressive Field, and the Cleveland Convention Center.",
              "Drury Plaza Hotel Cleveland Downtown is pet-friendly and allows you to bring two pets with a combined weight of 80 pounds for a fee of $40 per room."
            ]}
          />
     
          <SingleLoadListingCard 
            hotelName="100076286" 
            paragraphs={[
              "The Westin Cleveland Downtown is a sophisticated and upscale hotel located in the heart of Cleveland, Ohio. The guest rooms at The Westin Cleveland Downtown are elegantly designed, featuring Heavenly Beds® and Heavenly Baths®, ensuring a restful and rejuvenating stay for guests.",
              "The fitness center is equipped with state-of-the-art equipment and offers scenic views of the city. Guests can also swim in the indoor pool or enjoy a spa treatment in the spa.",

            ]}
          />
      
          <SingleLoadListingCard 
            hotelName="100398606" 
            paragraphs={[
              "Housed within the iconic Arcade, a stunning architectural gem dating back to 1890, the Hyatt Regency Cleveland at The Arcade seamlessly combines timeless elegance with modern amenities. The guest rooms at Hyatt Regency Cleveland at The Arcade are spacious and beautifully appointed, offering a serene escape for travelers seeking comfort and relaxation.",
              "With its prime location, guests have easy access to popular attractions such as the Playhouse Square, Rocket Mortgage FieldHouse, and the Rock & Roll Hall of Fame.",
              "Hyatt Regency Cleveland at The Arcade is pet-friendly and allows you to bring one dog that weighs up to 50 pounds for a fee of $100.",

            ]}
          />
       
          <Typography variant="h2">The Top Pet-Friendly Activities in Cleveland</Typography>
          
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
                  src: '"https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image18.png"',
                  component: (
                    <LinkContent
                      link="https://www.clevelandmetroparks.com/parks/visit/parks/lakefront-reservation/edgewater-park"
                      linkText="Edgewater Park"
                      text="Located along the picturesque shores of Lake Erie, Edgewater Park is a haven for dogs who love the sand and surf. This park offers a dedicated off-leash dog beach, where your dog can run in the waves, play fetch, and make new friends. The park's scenic trails provide a peaceful retreat for you and your pet to explore."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/Holdon%20Arboetum.jpeg',
                  component: (
                    <LinkContent
                      link="https://clevelandtraveler.com/holden-arboretum-guide/"
                      linkText="Holden Arboretum"
                      text="The Holden Arboretum in Cleveland warmly welcomes dogs to explore its beautiful grounds, providing a pet-friendly environment for both visitors and their four-legged companions. With miles of scenic trails and open spaces, it's a perfect destination for dog owners to enjoy nature together."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image5.png',
                  component: (
                    <LinkContent
                      link="https://scoundrelsfieldguide.com/bar-crawls/ohio-city-cleveland-dive-bar-brewery-crawl/"
                      linkText="Ohio City Pup Crawl"
                      text="Treat your pet to a day out in Ohio City, a trendy neighborhood known for its pet-friendly cafes and breweries. Participate in the Ohio City Pup Crawl, where various establishments roll out the red carpet for pets, offering water bowls, treats, and even special menus catering to canine taste buds. Explore the vibrant streets and indulge in delicious bites while your furry friend enjoys the attention and pampering."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/Whiskey%20Island%20Dog%20Park.jpeg',
                  component: (
                    <LinkContent
                      link="http://www.whiskeyislandmarina.net/rules--regulations.html"
                      linkText="Whiskey Island Dog Park"
                      text="Let your dog run free and wild at Whiskey Island Dog Park where there is space for off-leash play and socialization. With Lake Erie in the backdrop, it's a pawfect spot for water-loving dogs to take a refreshing dip. Make sure to bring some toys for an entertaining game of fetch on the open green fields."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/Cuyahoga%20Valley%20Scenic%20Railroad%20-%20Tow%20Path.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.cvsr.org/"
                      linkText="Cuyahoga Valley Scenic Railroad - Tow Path"
                      text="All aboard! The Cuyahoga Valley Scenic Railroad invites leashed pets to join their human companions on a picturesque journey through the stunning Cuyahoga Valley National Park. Sit back, relax, and enjoy the scenery, offering your pet a new and exciting experience."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image17.png',
                  component: (
                    <LinkContent
                      link="https://northcoastbeachfitters.com/"
                      linkText="North Coast Harbor Paddleboarding"
                      text="For adventurous water-loving dogs, head to North Coast Harbor and try paddleboarding together. Several local rental companies offer pet-friendly paddleboards, allowing you to glide across Lake Erie with your furry friend by your side. It's a unique way to bond and share the joy of exploring the water."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image16.png',
                  component: (
                    <LinkContent
                      link="https://www.tremonttaphouse.com/"
                      linkText="Tremont Taphouse Yappy Hour"
                      text="Treat yourself and your pet to a fun-filled Yappy Hour at the Tremont Taphouse. This pet-friendly event allows dogs on the patio, where they can enjoy water and complimentary treats. Meanwhile, humans can savor an impressive selection of craft beers and delicious food."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image13.png',
                  component: (
                    <LinkContent
                      link="https://www.clevelandmetroparks.com/"
                      linkText="Cleveland Metroparks"
                      text="Spanning over 23,000 acres, the Cleveland Metroparks system offers numerous pet-friendly trails and parks. From the wooded trails of Rocky River Reservation to the open fields of South Chagrin Reservation, there are plenty of opportunities to connect with nature alongside your furry companion."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image9.png',
                  component: (
                    <LinkContent
                      link="https://www.clevelandmetroparks.com/parks/visit/parks/lakefront-reservation"
                      linkText="Lakefront Reservation Dog Park"
                      text="Located near the Cleveland Lakefront Nature Preserve, this dog park is a delightful off-leash oasis for playful pups. The park features separate areas for small and large dogs, agility equipment, and water fountains to keep everyone hydrated during playtime."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image11.png',
                  component: (
                    <LinkContent
                      link="https://www.mylakeoh.com/blog/dogfriendlywinery"
                      linkText="Pet-Friendly Brewery Tours"
                      text="Cleveland's craft beer scene is booming, and many breweries welcome well-behaved pets in their outdoor seating areas. Plan a pet-friendly brewery tour and savor unique brews while your furry friend enjoys the relaxed atmosphere."
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

        

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Cleveland</Typography>
          
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
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image19.png',
                  component: (
                    <LinkContent
                      link="https://www.marketgardenbrewery.com/"
                      linkText="Market Garden Brewery"
                      text="At Market Garden Brewery, beer enthusiasts can savor craft brews in a lively atmosphere while their furry friends bask in the outdoor patio's pet-friendly ambiance. This popular brewery offers a diverse menu, including pub classics and unique creations, guaranteeing a memorable time for everyone."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/Lux.webp',
                  component: (
                    <LinkContent
                      link="http://luxecleveland.com/"
                      linkText="Luxe Kitchen & Lounge"
                      text="Luxe Kitchen & Lounge is a trendy spot known for its delectable brunch options and welcoming pet-friendly patio. From fluffy pancakes to gourmet sandwiches, the menu has something for every palate. Relax with your pet, soak up the sunshine, and savor the laid-back charm of this popular spot."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image4.png',
                  component: (
                    <LinkContent
                      link="https://www.nanobrewcleveland.com/reserve"
                      linkText="Nano Brew Cleveland"
                      text="Nano Brew Cleveland combines craft beer and comfort food in a pet-friendly setting. Located in Ohio City, this laid-back establishment welcomes dogs on their outdoor patio, where you can enjoy inventive burgers and a wide selection of local brews."
                    /> 
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/South%20Side%20Cleveland.avif',
                  component: (
                    <LinkContent
                      link="https://southsidecleveland.com/"
                      linkText="The South Side"
                      text="With a spacious patio that welcomes pets, The South Side is a favorite among locals and visitors alike. The diverse menu features American classics with a twist, making it a great spot for a casual lunch or a lively dinner with your furry companion by your side."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image7.png',
                  component: (
                    <LinkContent
                      link="https://terrestrialbrewing.com/"
                      linkText="Terrestrial Brewing Company"
                      text="Terrestrial Brewing Company not only offers a fantastic range of craft beers but also provides a dog-friendly patio where your pet can relax while you enjoy your brews. They occasionally host pet-centric events, making it an excellent spot for pet lovers to come together."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image3.png',
                  component: (
                    <LinkContent
                      link="http://www.the-harp.com/"
                      linkText="The Harp"
                      text="This Irish pub in Cleveland's Detroit-Shoreway neighborhood boasts a pet-friendly patio and a warm and inviting ambiance. Savor traditional Irish dishes and refreshing beverages while your furry friend enjoys the company and attention from passersby."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/Bookhouse%20Brewing.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.bookhouse.beer/"
                      linkText="Bookhouse Brewing"
                      text="Bookhouse Brewing is a unique spot where you can enjoy a good book, great beer, and quality time with your pet. This pet-friendly brewery offers a laid-back atmosphere and a rotating selection of craft beers, perfect for unwinding after a long day."
                    />
                  )
                },
                {
                  src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/Merwin's%20Warf.png",
                  component: (
                    <LinkContent
                      link="https://www.clevelandmetroparks.com/parks/visit/parks/lakefront-reservation/merwin-s-wharf"
                      linkText="Merwin's Wharf"
                      text="Nestled in the Cleveland Metroparks' Rivergate Park, Merwin's Wharf boasts a stunning waterfront patio where leashed pets are welcome. Enjoy a meal with a view as you and your pet watch boats drift along the Cuyahoga River."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image14.png',
                  component: (
                    <LinkContent
                      link="https://www.brewnutscleveland.com/"
                      linkText="Brewnuts"
                      text="Indulge your sweet tooth at Brewnuts, a donut shop and bar that welcomes dogs on their outdoor patio. Enjoy creative donut flavors made with beer and inventive cocktails while your pet relaxes at your feet."
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

export default Cleveland;
