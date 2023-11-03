import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography, useMediaQuery } from "@mui/material";

import Map from "../../components/UI/Map/Map";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";
import {Helmet} from "react-helmet";
import ListingCard from "../../components/ListingCard";
import { 
  useStore, 
  useSelector 
} from "react-redux";
import { gql, useQuery } from "@apollo/client";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

import IconTags from '../../components/IconTags';

import { HOTEL_DESCRIPTIONS } from '../../constants/locationPageDescriptions';
import HighlightBox from '../../components/CitiesContent/HighlightBox';
import SingleLoadListingCard from '../../components/SingleLoadListingCard';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import LocationPageFilterBar from '../../components/LocationPageFilterBar'


const searchData = {
  "city": {
    "description": "Seattle, WA, USA",
    "matched_substrings": [
        {
            "length": 7,
            "offset": 0
        }
    ],
    "place_id": "ChIJVTPokywQkFQRmtVEaUZlJRA",
    "reference": "ChIJVTPokywQkFQRmtVEaUZlJRA",
    "structured_formatting": {
        "main_text": "Seattle",
        "main_text_matched_substrings": [
            {
                "length": 7,
                "offset": 0
            }
        ],
        "secondary_text": "WA, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Seattle"
        },
        {
            "offset": 9,
            "value": "WA"
        },
        {
            "offset": 13,
            "value": "USA"
        }
    ],
    "types": [
        "locality",
        "political",
        "geocode"
    ]
},
"lat": 47.6062095,
"lng": -122.3320708
}

const Seattle: FC = () => {

  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Seattle, WA');

  const city = 'Seattle'
  const paragraphOne = 'Seattle is a pet-friendly city that warmly welcomes travelers with their four-legged companions. The city has numerous parks, trails, and outdoor spaces, creating plenty of opportunities for you and your pet to enjoy Seattle. Many cafes, restaurants, and breweries have pet-friendly options, so you can eat meals with your best friend by your side.'

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

  const Img = ({ src, text }) => (<>
    <img loading="lazy" style={{ marginTop: "-1rem", borderRadius: 6, maxHeight: '480px', objectFit: 'cover' }} src={src} />
    <Typography mt="-1.25rem" variant="base" component="p">Photo Credit: {text}</Typography>
  </>)

  const mobile = useMediaQuery("(max-width:800px)");


  return <>
    <Helmet>
      <title>Pet Friendly Hotels Seattle, WA | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, WA | Romingo`}
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
          width: { xs: '95%', sm: '95%', md: "85%" },
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
          WASHINGTON
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
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            {paragraphOne}
          </Typography>
          <Typography
            variant="base"
            sx={{ fontSize: '0.9rem' }}
          >
            Whether you&apos;re exploring iconic sights or relaxing at a dog beach, pet-friendly travel in Seattle will be a memorable experience. Here are some of the best pet-friendly hotels, activities, and restaurants for you to enjoy in Seattle.
          </Typography>
        </Grid>
        <Grid my="1.5rem" item xs={12}>
            <IconTags />
        </Grid>

        
    

      
        <Box
          width='100%'
          mt="1rem"
          display='flex'
          flexDirection='column'
          gap='1.5rem'
          maxWidth="900px"
        >
    
          <Typography component="h2" variant="h2">The Top Pet Friendly Accommodations in Seattle</Typography>

          
          <SingleLoadListingCard 
            hotelName="100482909" 
            paragraphs={[
              "The Hyatt Regency Seattle welcomes pets to their hotel with open arms. This pet-friendly hotel has a modern design and offers upscale amenities for its guests. The hotel is in a great location, allowing visitors to easily explore Pike Place Market, the Space Needle, and the waterfront.",
              "When traveling to Seattle, the Hyatt Regency Seattle is a great pet-friendly hotel option. This hotel allows you to bring one dog with you and there is a $50 pet fee. The hotel provides a range of pet-friendly amenities, including a pet welcome kit, a bed, food, and water bowls. The hotel is close to pet-friendly parks and walking trails, so you can go on many adventures together.",

            ]}
          />
      

          <SingleLoadListingCard 
            hotelName="100212948" 
            paragraphs={[
              "Kimpton Hotel Monaco is a pet-friendly hotel in downtown Seattle that offers a relaxing trip for guests and their pets. You can easily walk to the Pike Place Market and to the waterfront from this hotel, allowing for exploring and adventures. Kimpton Hotel Monaco offers spacious pet-friendly rooms, allowing your furry companion to stay comfortably with you. Immerse yourself in the city's dynamic charm and enjoy a pet-friendly stay at Kimpton Hotel Monaco.",
              "The Kimpton Hotel Monaco Seattle loves when you bring your pets on your trip. This is a great option because they allow pets of all sizes and breeds with no extra fees. When you check-in, your pet will receive treats, food, water bowls, and a comfy bed to enjoy during their stay!",

            ]}
          />
          
          <SingleLoadListingCard 
            hotelName="100309614" 
            paragraphs={[
              "Hyatt at Olive 8 is a pet-friendly hotel in downtown Seattle that offers sustainable practices for guests and their pets. When you stay at Hyatt at Olive 8, you can enjoy the Space Needle, Seattle Center, or the Climate Pledge Arena.",
              "When you travel to Seattle, Hyatt at Olive 8 is a great hotel option. This hotel is pet-friendly and offers cozy spaces for your pet to unwind. When you arrive, your dog will receive a welcome letter, a bed, food, water bowls, and a welcome biscuit. The Hyatt team is always available to provide information on walking routes, pet shops, groomers, vets, and local pet-friendly establishments.",
              "Hyatt at Olive 8 allows you to bring two dogs with you and there is a $50 fee per stay."
            ]}
          />
          
          <SingleLoadListingCard 
            hotelName="100208648" 
            paragraphs={[
              "The Kimpton Hotel Vintage Seattle is an elegant and sophisticated boutique hotel located in the heart of downtown Seattle, Washington. This chic hotel is pet-friendly and offers a unique blend of modern luxury and vintage charm. The hotel is close to Pike Place Market, Museum of Pop Culture, Capitol Hill, and more.",
              "Like other Kimpton Hotels, The Kimpton Hotel Vintage Seattle is very pet-friendly. You're welcome to bring your pet to the hotel for no additional cost. The Kimpton Hotel Monaco Seattle also allows pets of all sizes and breeds. Your furry friend will enjoy treats, food, bowls, and a bed so that they can have a great vacation in Seattle!",
            ]}
          />
          
          <SingleLoadListingCard 
            hotelName="100220096" 
            paragraphs={[
              "The ACE Hotel Seattle is a trendy and vibrant boutique hotel located in the heart of the Belltown neighborhood. With its chic and eclectic design, the hotel offers a unique and artistic ambiance that sets it apart from traditional accommodations. This vibrant hotel boasts stylish accommodations, a lively bar, and a prime location within Seattle's bustling arts and entertainment district.",
              "The ACE Hotel Seattle is pet-friendly and does not charge extra for your pet to stay. Immerse yourself in the artistic spirit of the city and relish a pet-friendly sojourn at ACE Hotel Seattle.",

            ]}
          />
          

          
          <SingleLoadListingCard 
            hotelName="100050766"
            paragraphs={[
              "Hotel Ändra is a stylish and sophisticated pet-friendly hotel located in downtown Seattle, Washington. Embodying the essence of Scandinavian design, this luxury hotel offers a warm and inviting ambiance, making guests feel right at home. Hotel Ändra offers stylish rooms, a cozy fireplace lounge, and a popular restaurant serving Nordic-inspired cuisine.",
              "Hotel Ändra does not charge any additional fees for two pets weighing up to 50 pounds at their hotel. The central location of this hotel makes it a great option for your trip to Seattle."
            ]} 
          /> 
          
          <Typography variant="h2">The Top Pet-Friendly Activities in Seattle</Typography>

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
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Magnuson%20Park%20Off-Leash%20Area.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.seattle.gov/parks/allparks/magnuson-park/off-leash-area"
                      linkText="Magnuson Park Off-Leash Area"
                      text="Treat your pet to an adventure at Magnuson Park Off-Leash Area, one of Seattle's largest and most popular dog parks. There are over eight acres of land where your pet can roam freely and enjoy a dog swimming area."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Discovery%20Park.webp',
                  component: (
                    <LinkContent
                      link="https://www.seattle.gov/parks/allparks/discovery-park"
                      linkText="Discovery Park"
                      text="Head to Discovery Park, Seattle's largest city park, for a scenic adventure with your pet. Leashed pets are welcome to explore the park's many trails, offering breathtaking views of Puget Sound and the Olympic Mountains."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image13.png',
                  component: (
                    <LinkContent
                      link="https://www.seattle.gov/parks/allparks/volunteer-park"
                      linkText="Volunteer Park"
                      text="Stroll through Volunteer Park, a charming urban oasis in Capitol Hill, with your leashed pet. Enjoy the picturesque scenery, including the iconic Space Needle, beautifully landscaped gardens, and the historic water tower."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image12.png',
                  component: (
                    <LinkContent
                      link="https://www.seattle.gov/parks/allparks/westcrest-park"
                      linkText="Westcrest Park Off-Leash Area"
                      text="Westcrest Park Off-Leash Area is another excellent dog park. This area features large open spaces and trails for your pet to run and play off-leash. The park's elevated location also provides stunning views of the city skyline."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Seattle%20Great%20Wheel.webp',
                  component: (
                    <LinkContent
                      link="https://seattlewaterfront.org/"
                      linkText="Seattle Waterfront"
                      text="Take a leisurely walk along the Seattle Waterfront with your leashed pet. Enjoy the sights and sounds of Elliott Bay while exploring attractions like the Seattle Great Wheel and the Olympic Sculpture Park."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image20.png',
                  component: (
                    <LinkContent
                      link="http://www.fremontmarket.com/"
                      linkText="Fremont Sunday Market"
                      text="Bring your pet along to the Fremont Sunday Market where you can enjoy a lively open-air market featuring local vendors, food trucks, and artisanal goods. Your furry friend can soak up the vibrant atmosphere and meet new people while you shop and indulge in delicious treats."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Alki%20Beach.jpeg',
                  component: (
                    <LinkContent
                      link="https://www.seattle.gov/parks/allparks/alki-beach-park"
                      linkText="Alki Beach"
                      text="Unwind at Alki Beach, a pet-friendly destination where your leashed pet can frolic on the sandy shores and dip their paws in the refreshing waters of Puget Sound."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image15.png',
                  component: (
                    <LinkContent
                      link="https://www.seattle.gov/parks/allparks/green-lake-park"
                      linkText="Green Lake Park"
                      text="Take a leisurely stroll around Green Lake Park, a popular spot for pet owners. The paved path surrounding the lake provides a picturesque route for you and your pet to enjoy a peaceful walk together."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image2.png',
                  component: (
                   <LinkContent
                     link="https://www.argosycruises.com/argosy-cruises/harbor-cruise/"
                     linkText="Argosy Cruises Harbor Tour"
                     text="Embark on an Argosy Cruises Harbor Tour with your leashed pet and explore Seattle from the water. The tour offers stunning views of the city's skyline, waterfront, and famous landmarks like the Space Needle and Pike Place Market."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image4.png',
                  component: (
                   <LinkContent
                     link="https://woodinvillewinecountry.com/"
                     linkText="Woodinville Wine Country"
                     text="Explore Woodinville Wine Country, just a short drive from Seattle, with your leashed pet. Many wineries in the area welcome pets in their outdoor areas, allowing you to savor delicious wines and enjoy a lovely day with your furry companion."
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

          


          <Typography variant="h2">The Top Pet-Friendly Restaurants in Seattle</Typography>
          <Text text="Seattle's vibrant dining scene extends its warm hospitality to four-legged patrons as well, making it a haven for pet owners seeking delightful dining experiences with their furry companions. From upscale eateries to cozy cafes, the Emerald City offers an array of pet-friendly restaurants that cater to both human and pet tastes. In this article, we'll explore the top pet-friendly restaurants in Seattle, where you and your beloved pet can indulge in delectable cuisine and create lasting memories together." />

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
                  src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Norm's%20Eatery%20%26%20Ale%20House.jpeg",
                  component: (
                   <LinkContent
                     link="https://www.facebook.com/profile.php?id=100063526092093"
                     linkText="Norm's Eatery & Ale House"
                     text="Situated in Fremont, Norm's Eatery & Ale House is a beloved pet-friendly spot that boasts a welcoming atmosphere for both patrons and their pets. The restaurant offers an outdoor patio where dogs are more than welcome to accompany their owners. Norm's serves up mouthwatering American pub fare and an impressive selection of craft beers, ensuring a delightful dining experience for all."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image18.png',
                  component: (
                   <LinkContent
                     link="https://thefathenseattle.com/"
                     linkText="The Fat Hen"
                     text="Nestled in the Ballard neighborhood, The Fat Hen is a quaint and charming cafe that welcomes pets in its outdoor seating area. Known for its delectable brunch offerings and Mediterranean-inspired dishes, this cozy spot provides a relaxing setting for you and your furry friend to enjoy a leisurely meal together."
                   />
                  )
                },
                {
                  src: "https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Ray's%20Cafe.jpeg",
                  component: (
                   <LinkContent
                     link="https://www.rays.com/cafe/"
                     linkText="Ray's Cafe"
                     text="Located on the shores of Puget Sound, Ray's Cafe offers breathtaking waterfront views and a pet-friendly patio for a memorable dining experience. Leashed pets are welcome to join their owners as they savor fresh seafood and classic Pacific Northwest cuisine, all while enjoying the soothing sound of the waves."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Blue%20Moon%20Burgers.jpg',
                  component: (
                    <LinkContent
                      link="https://bluemoonburgers.com/"
                      linkText="Blue Moon Burgers"
                      text="With multiple locations throughout the city, Blue Moon Burgers is a pet-friendly burger joint that has something for everyone. The restaurant offers a designated outdoor area where pets can enjoy the company of fellow canine patrons while you indulge in a variety of mouthwatering burgers, including delicious vegetarian options."
                    />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/The%20Station.jpeg',
                  component: (
                   <LinkContent
                     link="https://www.thestationbh.com/"
                     linkText="The Station"
                     text="The Station is a hip and welcoming coffee shop in Beacon Hill that warmly welcomes pets. This pet-friendly establishment offers an inviting outdoor patio, making it an ideal spot for pet owners to sip on coffee, savor tasty pastries, and socialize with their four-legged companions."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Portage%20Bay%20Cafe.jpeg',
                  component: (
                   <LinkContent
                     link="https://www.portagebaycafe.com/south-lake-union"
                     linkText="Portage Bay Cafe"
                     text="With multiple locations in Seattle, Portage Bay Cafe is a popular choice for breakfast and brunch lovers, and it's also pet-friendly. The restaurant offers outdoor seating where leashed pets can relax while their owners enjoy a hearty farm-to-table breakfast experience."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Poquitos.jpeg',
                  component: (
                   <LinkContent
                     link="https://www.vivapoquitos.com/"
                     linkText="Poquitos"
                     text="In Capitol Hill, Poquitos is a lively Mexican restaurant with a pet-friendly patio where your furry companion can join you for some south-of-the-border flavors. The restaurant serves up delicious tacos, enchiladas, and refreshing cocktails, creating a festive and enjoyable dining experience."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/Barking%20Dog%20Alehouse.jpeg',
                  component: (
                   <LinkContent
                     link="https://thebarkingdogalehouse.com/"
                     linkText="Barking Dog Alehouse"
                     text="As the name suggests, Barking Dog Alehouse is a dog-friendly gastropub in Ballard that caters to both two-legged and four-legged guests. With its dog-friendly outdoor patio, the pub offers a diverse menu and an extensive selection of beers for a relaxing and enjoyable time with your pet."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image1.png',
                  component: (
                   <LinkContent
                     link="https://www.chuckshopshop.com/"
                     linkText="Chuck’s Hop Shop"
                     text="Chuck's Hop Shop is a beloved and vibrant beer store and taproom in Seattle, Washington, that has become a go-to destination for beer enthusiasts and pet owners alike. With its welcoming and pet-friendly environment, Chuck's Hop Shop warmly welcomes furry companions, making it a paw-some spot to hang out with your four-legged friend."
                   />
                  )
                },
                {
                  src: 'https://storage.googleapis.com/romingo-production-public/destination%20images/Seattle/image8.png',
                  component: (
                    <LinkContent
                      link="https://fiddlers-inn.squarespace.com/"
                      linkText="Fiddler’s Inn"
                      text="Fiddler's Inn in Seattle, Washington, is a pet-friendly hotel and restaurant that warmly welcomes guests and their furry companions. This cozy inn offers a comfortable and convenient stay for both humans and pets alike where you can both relax and enjoy a delicious meal."
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

        

          <Text text="Seattle's culinary landscape embraces pet-friendly dining, ensuring that both you and your furry companion can indulge in a delightful gastronomic journey together. From trendy cafes to waterfront eateries and charming bistros, the top pet-friendly restaurants in Seattle offer an inclusive and memorable dining experience for all patrons, making the Emerald City a paw-some destination for foodies and pet owners alike. So, leash up your pet, explore the city's culinary delights, and savor the joy of dining with your furry friend by your side." />

        </Box>


      </Grid>
    </Container>
    <Footer />
  </>;
};

export default Seattle;
