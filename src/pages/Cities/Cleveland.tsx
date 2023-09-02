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

const Cleveland: FC = () => {

  //TODO:
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Los Angeles, CA');

  const city = 'Cleveland'
  const paragraphOne = "Cleveland offers a delightful array of pet-friendly travel experiences for you and your furry companions. Whether you're exploring the lush parks, strolling along the picturesque waterfront, or visiting pet-welcoming attractions, there's something for everyone in this pet-loving metropolis."

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
            Take a leisurely walk in Edgewater Park, where your pooch can frolic freely on the sandy shores and splash in the waves. Don't miss the chance to explore the charming neighborhoods, such as Ohio City, that boast pet-friendly cafes and shops, allowing you and your pet to enjoy the city's vibrant atmosphere together. Head to one of the city's dog-friendly breweries or restaurants that offer specialized menus for your loyal companions.
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
            With its blend of welcoming locals, scenic parks, and pet-friendly establishments, Cleveland promises an unforgettable and fantastic adventure for both you and your beloved pets.
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
        

    
          <Bold text="Kimpton Schofield Hotel" />
          <SingleLoadListingCard hotelName="100184252" />
          <Text text="Housed in a historic building that exudes old-world charm, Kimpton Schofield Hotel property seamlessly blends modern amenities with timeless elegance. The guest rooms at the Kimpton Schofield are tastefully designed, featuring chic decor, luxurious linens, and unique touches that reflect the hotel's distinct personality." />
          <Text text="The hotel's on-site restaurant showcases the region's culinary delights, while the rooftop bar offers stunning views of the city skyline. Its prime location allows easy access to cultural landmarks, sports arenas, and entertainment venues." />
          <Text text="Kimpton Schofield Hotel is pet-friendly and allows pets of all sizes with no weight restrictions. The hotel offers pet amenities, including plush pet beds, food bowls, and a selection of treats" />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop bar', 'Yoga mats', 'Bike rentals', 'Free happy hours', 'Coffee and tea services', 'On-site dining', 'On-site bar']}
          />

          <Bold text="Metropolitan at The 9" />
          <SingleLoadListingCard hotelName="100082888" />
          <Text text="Part of the Autograph Collection by Marriott, Metropolitan at The 9 is a hotel in Cleveland that offers a great experience for its guests. Housed in the historic Cleveland Trust building, The Metropolitan at The 9 seamlessly blends classic architecture with modern luxury, creating a captivating ambiance throughout." />
          <Text text="The hotel's rooftop bar, Azure, provides breathtaking views of the city skyline, while the chic, industrial-inspired lobby features an awe-inspiring 40-foot-tall art installation." />
          <Text text="Additionally, The Metropolitan at The 9 is home to a cutting-edge theater and a diverse selection of dining options, including a renowned restaurant curated by a celebrity chef." />
          <Text text="Metropolitan at The 9 is pet-friendly and welcomes two dogs that weigh up to 75 pounds for a fee of $100." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Rooftop bar', 'Fitness center', 'On-site dining curated by celebrity chef', 'Business center']}
          />


          <Bold text="Aloft Cleveland Downtown" />
          <SingleLoadListingCard hotelName="100053276" />
          <Text text="Aloft Cleveland Downtown is a trendy and modern hotel located in the vibrant Flats East Bank district of Cleveland, Ohio. The guest rooms at Aloft Cleveland Downtown are thoughtfully designed, featuring contemporary furnishings, vibrant colors, and tech-savvy amenities that cater to the needs of today's travelers." />
          <Text text="The hotel's W XYZ Bar is a popular hangout spot, serving craft cocktails and hosting live music events, creating a lively and social ambiance. Guests can stay active in the 24/7 fitness center or take a dip in the indoor pool with floor-to-ceiling windows, offering scenic views of the Cuyahoga River." />
          <Text text="Aloft Cleveland Downtown is pet-friendly and allows you to bring pets that weigh up to 40 pounds for no additional fee." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Indoor pool', 'On-site bar']}
          />

          <Bold text="Drury Plaza Hotel Cleveland Downtown" />
          <SingleLoadListingCard hotelName="100182536" />
          <Text text="The Drury Plaza Hotel Cleveland Downtown is a welcoming and elegant hotel situated in the heart of downtown Cleveland, Ohio. As part of the esteemed Drury Hotels chain, this property offers a blend of sophistication and comfort." />
          <Text text="The rooftop pool and fitness center offer opportunities for relaxation while enjoying panoramic views of the city. With its central location, the hotel is conveniently located near popular attractions such as the Rock & Roll Hall of Fame, Progressive Field, and the Cleveland Convention Center." />
          <Text text="Drury Plaza Hotel Cleveland Downtown is pet-friendly and allows you to bring two pets with a combined weight of 80 pounds for a fee of $40 per room." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free breakfast', 'Evening receptions', 'Rooftop pool', 'Fitness center', 'On-site dining']}
          />

          <Bold text="The Westin Cleveland Downtown" />
          <SingleLoadListingCard hotelName="100076286" />
          <Text text="The Westin Cleveland Downtown is a sophisticated and upscale hotel located in the heart of Cleveland, Ohio. The guest rooms at The Westin Cleveland Downtown are elegantly designed, featuring Heavenly Beds® and Heavenly Baths®, ensuring a restful and rejuvenating stay for guests." />
          <Text text="The fitness center is equipped with state-of-the-art equipment and offers scenic views of the city. Guests can also swim in the indoor pool or enjoy a spa treatment in the spa." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Indoor pool', 'Spa services', 'On-site dining', 'On-site bar']}
          />

          <Bold text="Hyatt Regency Cleveland at The Arcade" />
          <SingleLoadListingCard hotelName="100398606" />
          <Text text="Housed within the iconic Arcade, a stunning architectural gem dating back to 1890, the Hyatt Regency Cleveland at The Arcade seamlessly combines timeless elegance with modern amenities. The guest rooms at Hyatt Regency Cleveland at The Arcade are spacious and beautifully appointed, offering a serene escape for travelers seeking comfort and relaxation." />
          <Text text="With its prime location, guests have easy access to popular attractions such as the Playhouse Square, Rocket Mortgage FieldHouse, and the Rock & Roll Hall of Fame." />
          <Text text="Hyatt Regency Cleveland at The Arcade is pet-friendly and allows you to bring one dog that weighs up to 50 pounds for a fee of $100." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Glass-roofed atrium', 'Fitness center', 'On-site bar', 'On-site dining options']}
          />
      

  
          <Typography variant="h2">The Top Pet-Friendly Activities in Cleveland</Typography>
 
          <LinkContent
            link="https://www.clevelandmetroparks.com/parks/visit/parks/lakefront-reservation/edgewater-park"
            linkText="Edgewater Park"
            text="Located along the picturesque shores of Lake Erie, Edgewater Park is a haven for dogs who love the sand and surf. This park offers a dedicated off-leash dog beach, where your dog can run in the waves, play fetch, and make new friends. The park's scenic trails provide a peaceful retreat for you and your pet to explore."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image18.png" text="Cleveland Metroparks" />

          <LinkContent
            link="https://clevelandtraveler.com/holden-arboretum-guide/"
            linkText="Holden Arboretum"
            text="The Holden Arboretum in Cleveland warmly welcomes dogs to explore its beautiful grounds, providing a pet-friendly environment for both visitors and their four-legged companions. With miles of scenic trails and open spaces, it's a perfect destination for dog owners to enjoy nature together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image12.png" text="Cleveland Traveler" />

          <LinkContent
            link="https://scoundrelsfieldguide.com/bar-crawls/ohio-city-cleveland-dive-bar-brewery-crawl/"
            linkText="Ohio City Pup Crawl"
            text="Treat your pet to a day out in Ohio City, a trendy neighborhood known for its pet-friendly cafes and breweries. Participate in the Ohio City Pup Crawl, where various establishments roll out the red carpet for pets, offering water bowls, treats, and even special menus catering to canine taste buds. Explore the vibrant streets and indulge in delicious bites while your furry friend enjoys the attention and pampering."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image5.png" text="Ohio City Pub Crawl" />

          <LinkContent
            link="http://www.whiskeyislandmarina.net/rules--regulations.html"
            linkText="Whiskey Island Dog Park"
            text="Let your dog run free and wild at Whiskey Island Dog Park where there is space for off-leash play and socialization. With Lake Erie in the backdrop, it's a pawfect spot for water-loving dogs to take a refreshing dip. Make sure to bring some toys for an entertaining game of fetch on the open green fields."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image8.png" text="Only In Your State" />

          <LinkContent
            link="https://www.cvsr.org/"
            linkText="Cuyahoga Valley Scenic Railroad - Tow Path"
            text="All aboard! The Cuyahoga Valley Scenic Railroad invites leashed pets to join their human companions on a picturesque journey through the stunning Cuyahoga Valley National Park. Sit back, relax, and enjoy the scenery, offering your pet a new and exciting experience."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image10.png" text="Cuyahoga Valley Scenic Railroad" />

          <LinkContent
            link="https://northcoastbeachfitters.com/"
            linkText="North Coast Harbor Paddleboarding"
            text="For adventurous water-loving dogs, head to North Coast Harbor and try paddleboarding together. Several local rental companies offer pet-friendly paddleboards, allowing you to glide across Lake Erie with your furry friend by your side. It's a unique way to bond and share the joy of exploring the water."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image17.png" text=" North Coast Beachfitters" />

          <LinkContent
            link="https://www.tremonttaphouse.com/"
            linkText="Tremont Taphouse Yappy Hour"
            text="Treat yourself and your pet to a fun-filled Yappy Hour at the Tremont Taphouse. This pet-friendly event allows dogs on the patio, where they can enjoy water and complimentary treats. Meanwhile, humans can savor an impressive selection of craft beers and delicious food."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image16.png" text="Tremont Taphouse" />

          <LinkContent
            link="https://www.clevelandmetroparks.com/"
            linkText="Cleveland Metroparks"
            text="Spanning over 23,000 acres, the Cleveland Metroparks system offers numerous pet-friendly trails and parks. From the wooded trails of Rocky River Reservation to the open fields of South Chagrin Reservation, there are plenty of opportunities to connect with nature alongside your furry companion."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image13.png" text="The Cleveland Traveler" />

          <LinkContent
            link="https://www.clevelandmetroparks.com/parks/visit/parks/lakefront-reservation"
            linkText="Lakefront Reservation Dog Park"
            text="Located near the Cleveland Lakefront Nature Preserve, this dog park is a delightful off-leash oasis for playful pups. The park features separate areas for small and large dogs, agility equipment, and water fountains to keep everyone hydrated during playtime."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image9.png" text="Cleveland Metroparks" />

          <LinkContent
            link="https://www.mylakeoh.com/blog/dogfriendlywinery"
            linkText="Pet-Friendly Brewery Tours"
            text="Cleveland's craft beer scene is booming, and many breweries welcome well-behaved pets in their outdoor seating areas. Plan a pet-friendly brewery tour and savor unique brews while your furry friend enjoys the relaxed atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image11.png" text="My Lake Oh" />


          <Typography variant="h2">The Top Pet-Friendly Restaurants in Cleveland</Typography>
      
          <LinkContent
            link="https://www.marketgardenbrewery.com/"
            linkText="Market Garden Brewery"
            text="At Market Garden Brewery, beer enthusiasts can savor craft brews in a lively atmosphere while their furry friends bask in the outdoor patio's pet-friendly ambiance. This popular brewery offers a diverse menu, including pub classics and unique creations, guaranteeing a memorable time for everyone."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image19.png" text="Market Garden Brewery" />

          <LinkContent
            link="http://luxecleveland.com/"
            linkText="Luxe Kitchen & Lounge"
            text="Luxe Kitchen & Lounge is a trendy spot known for its delectable brunch options and welcoming pet-friendly patio. From fluffy pancakes to gourmet sandwiches, the menu has something for every palate. Relax with your pet, soak up the sunshine, and savor the laid-back charm of this popular spot."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image15.png" text="Luxe Kitchen & Lounge" />

          <LinkContent
            link="https://www.nanobrewcleveland.com/reserve"
            linkText="Nano Brew Cleveland"
            text="Nano Brew Cleveland combines craft beer and comfort food in a pet-friendly setting. Located in Ohio City, this laid-back establishment welcomes dogs on their outdoor patio, where you can enjoy inventive burgers and a wide selection of local brews."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image4.png" text="Nano Brew Cleveland" />

          <LinkContent
            link="https://southsidecleveland.com/"
            linkText="The South Side"
            text="With a spacious patio that welcomes pets, The South Side is a favorite among locals and visitors alike. The diverse menu features American classics with a twist, making it a great spot for a casual lunch or a lively dinner with your furry companion by your side."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image1.png" text="The South Side Cleveland" />

          <LinkContent
            link="https://terrestrialbrewing.com/"
            linkText="Terrestrial Brewing Company"
            text="Terrestrial Brewing Company not only offers a fantastic range of craft beers but also provides a dog-friendly patio where your pet can relax while you enjoy your brews. They occasionally host pet-centric events, making it an excellent spot for pet lovers to come together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image7.png" text="Cleveland Scene" />

          <LinkContent
            link="http://www.the-harp.com/"
            linkText="The Harp"
            text="This Irish pub in Cleveland's Detroit-Shoreway neighborhood boasts a pet-friendly patio and a warm and inviting ambiance. Savor traditional Irish dishes and refreshing beverages while your furry friend enjoys the company and attention from passersby."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image3.png" text="Cleveland.com" />

          <LinkContent
            link="https://www.bookhouse.beer/"
            linkText="Bookhouse Brewing"
            text="Bookhouse Brewing is a unique spot where you can enjoy a good book, great beer, and quality time with your pet. This pet-friendly brewery offers a laid-back atmosphere and a rotating selection of craft beers, perfect for unwinding after a long day."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image6.png" text="City Brew Tours" />

          <LinkContent
            link="https://www.clevelandmetroparks.com/parks/visit/parks/lakefront-reservation/merwin-s-wharf"
            linkText="Merwin's Wharf"
            text="Nestled in the Cleveland Metroparks' Rivergate Park, Merwin's Wharf boasts a stunning waterfront patio where leashed pets are welcome. Enjoy a meal with a view as you and your pet watch boats drift along the Cuyahoga River."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image2.png" text="Cleveland Metroparks" />

          <LinkContent
            link="https://www.brewnutscleveland.com/"
            linkText="Brewnuts"
            text="Indulge your sweet tooth at Brewnuts, a donut shop and bar that welcomes dogs on their outdoor patio. Enjoy creative donut flavors made with beer and inventive cocktails while your pet relaxes at your feet."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Cleveland/image14.png" text="Traveling IQ" />

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

export default Cleveland;
