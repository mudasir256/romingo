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
    "description": "Portland, OR, USA",
    "matched_substrings": [
        {
            "length": 8,
            "offset": 0
        }
    ],
    "place_id": "ChIJJ3SpfQsLlVQRkYXR9ua5Nhw",
    "reference": "ChIJJ3SpfQsLlVQRkYXR9ua5Nhw",
    "structured_formatting": {
        "main_text": "Portland",
        "main_text_matched_substrings": [
            {
                "length": 8,
                "offset": 0
            }
        ],
        "secondary_text": "OR, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Portland"
        },
        {
            "offset": 10,
            "value": "OR"
        },
        {
            "offset": 14,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 45.515232,
"lng": -122.6783853
}

const Portland: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Portland, OR');

  const city = 'Portland'
  const paragraphOne = "Portland, Oregon, is a haven for pet-friendly travel, embracing its reputation as one of the most pet-friendly cities in the United States. Exploring this vibrant and quirky city becomes all the more enjoyable when you can do it with your furry companions by your side."

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
      <title>Pet Friendly Hotels Portland, OR | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, OR | Romingo`}
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
          OREGON
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
            Portland offers a plethora of pet-friendly parks, hiking trails, and off-leash areas where your pets can roam and play freely. Forest Park, one of the largest urban forests in the country, provides ample opportunities for scenic walks and adventures in nature.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            Many restaurants, cafes, and breweries in Portland welcome pets on their outdoor patios, ensuring you can enjoy delicious meals while your pets relax comfortably beside you. Furthermore, Portland boasts numerous pet-friendly accommodations, ranging from boutique hotels to cozy bed and breakfasts, ensuring a comfortable stay for both you and your four-legged friends.
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
            With its laid-back and pet-loving atmosphere, pet-friendly travel in Portland promises a memorable and rewarding experience for all members of the family, including the furry ones.
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
          <Typography component="h2" variant="h2"> The Top Pet-Friendly Accommodations in Portland</Typography>

          <Bold text="Aloft Portland at Cascade Station" />
          <SingleLoadListingCard hotelName="100000716" />
          <Text text="This contemporary hotel, exuding a perfect blend of style and convenience, sets the stage for an unforgettable stay in the vibrant heart of Portland. As you step into the spacious and pet-friendly accommodations, a sense of home envelops you and your furry friends, creating a haven where their happiness and comfort are paramount." />
          <Text text="Pets up to 70 pounds are welcome at no additional charge. This contemporary hotel blends style and convenience, offering a vibrant atmosphere for you and your furry friends. With spacious pet-friendly accommodations, your beloved companions will feel right at home." />
          <Text text="Every aspect of Aloft Portland at Cascade Station has been thoughtfully designed to cater to the needs of both you and your pets. The sleek and contemporary ambiance sets a lively tone, providing an energizing backdrop for your adventures in the city. The modern amenities and thoughtful touches ensure that your stay is as convenient as it is enjoyable." />
          <Text text="Embrace the nearby friendly dog park, a haven for outdoor activities and social interactions, ensuring a delightful stay for pets and their owners." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free transportation to the airport', 'Pool', 'Dining options', 'Fitness center']}
          />

          
          <Bold text="Hotel deLuxe" />
          <SingleLoadListingCard hotelName="100409092" />
          <Text text="Hotel deLuxe is a stylish and pet-friendly hotel that pays homage to classic Hollywood glamour. Pets are welcomed with open arms, and the hotel's pet package includes treats, toys, and a cozy bed. The hotel's rooftop bar and lounge provide a lovely spot to unwind with your pets while enjoying scenic city views." />
          <Text text="Hotel deLuxe welcomes you to bring two pets of any size and charges a fee of $50 per pet, per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Pools', 'Fitness center', 'On-site dining options']}
          />


          <Bold text="The hoxton Portland" />
          <SingleLoadListingCard hotelName="100516495" />
          <Text text="Nestled in the heart of the city, The Hoxton Portland extends a warm welcome to pets at no additional charge. This trendy hotel embodies urban sophistication and chic comfort, ensuring a stylish retreat for you and your furry companion." />
          <Text text="Embrace the joy of exploring the city together, with the assurance that a friendly dog park nearby will enhance your experience with moments of outdoor bliss and joyful connections." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Meeting rooms and spaces', 'Bars']}
          />

          <Bold text="The Porter Portland Curio Collection by Hilton" />
          <SingleLoadListingCard hotelName="100204986" />
          <Text text="Every corner of The Porter Portland Curio Collection by Hilton exudes an air of refined ambiance, carefully curated to cater to your every need. The hotel's commitment to luxury is evident in its exquisite accommodations, which are designed to provide the utmost comfort and indulgence." />
          <Text text="Elegant furnishings, plush bedding, and tasteful decor create a haven of relaxation and tranquility, inviting you and your pets to unwind in style." />
          <Text text="The Porter Portland Curio Collection by Hilton allows two pets weighing up to 50 pounds for a fee of $75 per stay. This elegant hotel combines luxury with convenience, boasting exquisite accommodations and impeccable service." />
          <Text text="Unleash your pet's playful spirit at the nearby dog park, a delightful haven for outdoor exploration and joyful social interactions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Meditation room', 'Business center', 'Valet parking', 'Fitness center', 'On-site dining options', 'Business center']}
          />


          <Bold text="The Nines, a Luxury Collection Hotel" />
          <SingleLoadListingCard hotelName="100433772" />
          <Text text="The Nines, a Luxury Collection Hotel, is a pet-friendly haven in the heart of downtown Portland. They offer a range of pet amenities, including beds, bowls, and treats, to ensure your pets feel right at home. With its central location, the hotel allows for easy access to pet-friendly parks and urban adventures." />
          <Text text="The Nines welcomes you to bring your pets on your trip. They allow you to bring two dogs up to 60 pounds for a fee of $85 per pet, per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Valet parking', 'Food and beverage credit', 'Electric bike and helmet rental', 'Daily happy hours', 'Courtesy car transportation']}
          />

          <Bold text="Moxy Portland Downtown" />
          <SingleLoadListingCard hotelName="102252353" />
          <Text text="At Moxy Portland Downtown, pets up to 70 lbs can join you for a fee of $25 per pet per stay. This trendy and spirited hotel combines modern comfort with a playful atmosphere, ensuring a memorable stay for you and your furry friend." />
          <Text text="Nearby, a friendly dog park beckons, providing an ideal setting for outdoor adventures and opportunities for your pet to mingle with other playful companions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Free coffee and tea', 'On-site dining options', 'Convenience store']}
          />


          <Typography variant="h2">The Top Pet-Friendly Activities in Portland</Typography>
          <Text text="Portland, Oregon, is a city that celebrates its love for pets, and there's no shortage of pet-friendly activities to enjoy with your furry companions. From scenic parks to pet-friendly breweries, Portland offers a plethora of adventures that will make your pet's tail wag with excitement. Here are the ten best pet-friendly activities in Portland that will create unforgettable memories for both you and your pets:" />


          <LinkContent
            link="https://www.portland.gov/parks/forest-park"
            linkText="Forest Park"
            text="Embark on a hike in Forest Park, one of the largest urban forests in the country. With over 5,000 acres of lush greenery and miles of trails, this pet-friendly park provides the perfect setting for you and your pets to explore nature together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Forest%20Park%20.jpeg" text="https://www.hikeoregon.net/forest-park.html" />

          <LinkContent
            link="https://www.portland.gov/parks/sellwood-riverfront-park"
            linkText="Sellwood Riverfront Park"
            text="Treat your furry friends to some off-leash fun at Sellwood Riverfront Park. This spacious, fully-fenced park offers separate areas for small and large dogs, allowing them to play and socialize freely."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image7.png" text="Portland.gov" />

          <LinkContent
            link="https://luckylab.com/"
            linkText="Lucky Labrador Brewing Company"
            text="Head to the Lucky Labrador Brewing Company, a pet-friendly brewery where dogs are always welcome. Enjoy craft beers while your pets relax by your side in the outdoor seating areas."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image12.png" text="Lucky Labrador Brewing Company" />

          <LinkContent
            link="https://www.portland.gov/parks/cathedral-park"
            linkText="Cathedral Park"
            text="Located beneath the iconic St. Johns Bridge, Cathedral Park is a picturesque spot for a leisurely walk with your pets. The park's stunning views of the bridge and Willamette River make it a favorite among locals and visitors alike."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Cathedral%20Park.jpeg" text="https://www.kimsmithmiller.com/wedding/cathedral-park-wedding/attachment/kimsmithmiller-cathedral-park-wedding-051/" />

          <LinkContent
            link="https://www.portland.gov/parks/wallace-park"
            linkText="Wallace Park"
            text="Wallace Park features a spacious off-leash area, making it an ideal spot for your pets to run and play freely. The park's central location in the Northwest District allows for easy access to nearby pet-friendly shops and cafes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Wallace%20Park.jpeg" text="https://en.wikipedia.org/wiki/Columbia_Park_%28Portland,_Oregon%29" />

          <LinkContent
            link="https://visittheoregoncoast.com/"
            linkText="Oregon Coast"
            text="Take a day trip to the Oregon Coast with your pets and explore the dog-friendly beaches and coastal towns. Many beaches in Oregon allow dogs to roam off-leash, providing a fun-filled beach experience for your furry companions."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image17.png" text="Visit the Oregon Coast" />

          <LinkContent
            link="https://www.tinshedgardencafe.com/"
            linkText="Tin Shed Garden Café"
            text="Dine with your pets at Tin Shed Garden Café, a pet-friendly restaurant known for its delicious breakfast and brunch options. Their dog-friendly patio welcomes your pets with water bowls and treats."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image11.png" text="Tin Shed Garden Cafe" />

          <LinkContent
            link="https://www.portland.gov/parks/laurelhurst-park"
            linkText="Laurelhurst Park"
            text="Laurelhurst Park is a beautiful and pet-friendly park offering scenic walking trails and a large off-leash area for dogs. The park's tranquil pond and lush green lawns provide a peaceful retreat for you and your pets."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Laurelhurst%20Park.webp" text="https://www.travelportland.com/attractions/laurelhurst-park/" />

          <LinkContent
            link="https://www.portland.gov/parks/governor-tom-mccall-waterfront-park"
            linkText="Tom McCall Waterfront Park"
            text="Stroll along the scenic Tom McCall Waterfront Park with your pets and enjoy views of the Willamette River and downtown Portland. The park's paved paths are perfect for leisurely walks with your furry companions."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Tom%20McCall%20Waterfront%20Park.webp" text="https://www.koin.com/news/oregon/here-are-8-photo-worthy-spots-to-see-cherry-blossom-trees-in-spring-2023/" />

          <LinkContent
            link="https://www.portlandsaturdaymarket.com/"
            linkText="Portland Saturday Market"
            text="Visit the Portland Saturday Market, a pet-friendly open-air market featuring local artisans and vendors. Pets are welcome on a leash, allowing them to soak up the bustling atmosphere and vibrant energy of the market."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image20.png" text="Portland Saturday Market" />

          <Text text="Before venturing out to these pet-friendly activities, remember to keep your pets on a leash where required and be mindful of other visitors. With these ten pet-friendly activities in Portland, you and your furry companions can now embark on a pawsitively fun adventure in this pet-loving city. From exploring nature to indulging in delicious treats, Portland promises a tail-wagging good time for everyone in the family. So, leash up your pets, grab your walking shoes, and get ready to create unforgettable memories together in the City of Roses!" />

          <Typography variant="h2">The Top Pet-Friendly Restaurants in Portland</Typography>
          <Text text="Portland, Oregon, is a city known for its love of pets and its vibrant food scene. Fortunately, you don't have to choose between enjoying a delicious meal and spending time with your furry companions. Portland boasts a variety of pet-friendly restaurants that warmly welcome dogs and sometimes even cats to join their owners for a delightful dining experience. From cozy cafes to trendy eateries, here are ten pet-friendly restaurants in Portland where you can savor a delicious meal while your pets bask in the love and attention:" />

          <LinkContent
            link="https://luckylab.com/hawthorne-2020/"
            linkText="Lucky Labrador Brewing Company"
            text="Lucky Labrador Brewing Company is a beloved pet-friendly brewery that embraces furry guests with open arms. The relaxed atmosphere and outdoor seating areas make it a perfect spot to enjoy craft beers and tasty pub fare with your pets by your side."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image20.png" text="Lucky Labrador Brewing Company" />

          <LinkContent
            link="https://www.hopworksbeer.com/"
            linkText="Hopworks Urban Brewery"
            text="Hopworks Urban Brewery, also known as HUB, is a pet-friendly brewpub that offers organic beers and a variety of tasty dishes. Your furry friends will love lounging with you on their outdoor patio."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image6.png" text="Hopworks Urban Brewery" />

          <LinkContent
            link="https://www.albertastreetpub.com/"
            linkText="Alberta Street Pub"
            text="Alberta Street Pub is a pet-friendly eatery and pub located on the bustling Alberta Street. Your pets are welcome to join you on their outdoor patio as you enjoy live music and a selection of delicious food and drinks."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Alberta%20Street%20Pub.jpeg" text="https://dopdx.com/venues/alberta-street-pub" />

          <LinkContent
            link="https://backyardsocialpdx.com/"
            linkText="Backyard Social"
            text="Backyard Social is a pet-friendly restaurant with a charming outdoor seating area where dogs are always welcome. Their diverse menu offers comfort food classics, salads, and refreshing cocktails."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Backyard%20Social%20.avif" text="https://www.oregonlive.com/dining/2016/04/portlands_best_patios_bars_and.html" />

          <LinkContent
            link="https://www.barcarlopdx.com/"
            linkText="Bar Carlo"
            text="Bar Carlo is a popular pet-friendly restaurant that features a lovely garden patio where dogs are welcome. Their menu includes a mix of comfort food and international dishes, making it a perfect place to enjoy a meal with your pets."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Bar%20Carlo.jpeg" text="https://www.barcarlopdx.com/events" />

          <LinkContent
            link="https://www.teotepdx.com/"
            linkText="Teote Mezcalería"
            text="Teote Mezcalería is a vibrant and pet-friendly Latin American restaurant offering an array of flavorful dishes. Your pets can join you on their outdoor patio as you savor Latin American cuisine and enjoy a relaxed atmosphere."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image14.png" text="Eventective" />

          <LinkContent
            link="https://www.radioroompdx.com/"
            linkText="Radio Room"
            text="Radio Room is a pet-friendly eatery with a spacious outdoor seating area. Your furry companions can relax by your side as you indulge in tasty pub food and drinks."
          />

          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/Radio%20Room.avif" text="https://www.oregonlive.com/dining/2012/02/portland_happy_hour_radio_room.html" />

          <LinkContent
            link="https://www.stormbreakerbrewing.com/"
            linkText="StormBreaker Brewing"
            text="StormBreaker Brewing is a pet-friendly brewery with a welcoming outdoor patio. Enjoy their craft beers and pub fare while your pets lounge comfortably with you."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/StormBreaker%20Brewing.jpg" text="https://pdx.eater.com/2017/9/21/16347658/stormbreaker-brewing-st-johns-location-pdx" />

          <LinkContent
            link="https://www.voodoodoughnut.com/"
            linkText="Voodoo Donut"
            text="Voodoo Doughnut is a quirky and iconic doughnut shop with locations in Portland, Oregon, and several other cities across the United States. Founded in 2003, Voodoo Doughnut quickly gained fame for its innovative and playful approach to doughnuts, offering an array of unique flavors and eccentric designs."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/%E2%80%8B%E2%80%8BVoodoo%20Doughnut.webp" text="https://www.travelportland.com/attractions/voodoo-doughnut/" />

          <LinkContent
            link="https://saltandstraw.com/"
            linkText="Salt & Straw" 
            text="Founded in 2011, Salt & Straw has gained a devoted following for its inventive and high-quality ice cream flavors, made using locally sourced, organic, and sustainable ingredients. The shop's commitment to creative flavors is evident in its rotating menu, which features unique combinations like Honey Lavender, Sea Salt with Caramel Ribbons, and Roasted Strawberry Coconut."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Portland/image19.png" text="Salt & Straw" />



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

export default Portland;
