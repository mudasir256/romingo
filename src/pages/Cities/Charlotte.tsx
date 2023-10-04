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
    "description": "Charlotte, NC, USA",
    "matched_substrings": [
        {
            "length": 5,
            "offset": 0
        }
    ],
    "place_id": "ChIJgRo4_MQfVIgRZNFDv-ZQRog",
    "reference": "ChIJgRo4_MQfVIgRZNFDv-ZQRog",
    "structured_formatting": {
        "main_text": "Charlotte",
        "main_text_matched_substrings": [
            {
                "length": 5,
                "offset": 0
            }
        ],
        "secondary_text": "NC, USA"
    },
    "terms": [
        {
            "offset": 0,
            "value": "Charlotte"
        },
        {
            "offset": 11,
            "value": "NC"
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
"lat": 35.2270869,
"lng": -80.8431267
}

const Charlotte: FC = () => {

  //TODO:
  const cityContent = HOTEL_DESCRIPTIONS.find((obj) => obj.city === 'Charlotte');

  const city = 'Charlotte'
  const paragraphOne = "Charlotte, a vibrant city nestled in the heart of North Carolina, beckons pet owners with its warm hospitality and numerous pet-friendly travel options. Whether you're a local or a visitor, exploring this bustling city with your furry companion is a delightful experience."

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
      <title>Pet Friendly Hotels Charlotte, NC | Romingo</title>
      <description>{paragraphOne}</description>
      <meta name='keywords' content={cityContent.keywords} />
      <meta
        property='og:title'
        content={`Pet Friendly Hotels ${city}, NC | Romingo`}
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
          NORTH CAROLINA
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
            From picturesque parks and scenic walking trails to pet-welcoming cafes and restaurants, Charlotte embraces four-legged friends with open arms. Take a leisurely stroll with your dog along the charming streets of NoDa or enjoy an afternoon of outdoor fun at the Freedom Park, where dogs can romp and play freely.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
            Many accommodation options, ranging from upscale hotels to cozy bed-and-breakfasts, extend their hospitality to pets, ensuring a comfortable stay for both you and your furry friend.
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
        <Grid item my="0.5rem" xs={12} md={8}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "justify", lineHeight: 2 }}
          >
          </Typography>
        </Grid>

        {cityContent.secondaryImage &&
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
        }
      
        <Box
          mt="1rem"
          width='100%'
          display='flex'
          maxWidth="760px"
          flexDirection='column'
          gap='1.5rem'
        >
          
          <Typography component="h2" variant="h2"> The Top Pet Friendly Accommodations in Charlotte</Typography>
          <Text text="With a plethora of pet-friendly attractions, eateries, and accommodations, Charlotte stands out as an ideal destination for pet owners seeking unforgettable adventures with their beloved companions." />

    
          <Bold text="The Westin Charlotte" />
          <SingleLoadListingCard hotelName="100218922" />
          <Text text="The Westin Charlotte is a luxurious and upscale hotel situated in the heart of Uptown Charlotte, North Carolina. With its modern architecture and elegant interior, The Westin offers a sophisticated retreat for both business and leisure travelers. The hotel has an array of amenities, including spacious and well-appointed rooms with stunning city views, plush Heavenly Beds for a restful sleep, and rejuvenating Heavenly Baths to unwind after a long day." />
          <Text text="The hotel features a fitness center, rooftop pool, and multiple dining options, including a restaurant with locally inspired cuisine and a bar serving craft cocktails. Its central location allows easy access to popular attractions, cultural venues, and corporate offices, making The Westin Charlotte a prime choice for a luxurious and pet-friendly stay in the bustling city." />
          <Text text="The Westin Charlotte is pet-friendly and welcomes up to two dogs that weigh 50 pounds each for a fee of $50 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Dry cleaning service', 'Dining options']}
          />

          
          <Bold text="Kimpton Tryon Park Hotel" />
          <SingleLoadListingCard hotelName="100201780" />
          <Text text="Kimpton Tryon Park Hotel is an exquisite boutique hotel nestled in the heart of Uptown Charlotte, North Carolina. With its chic and contemporary design, this pet-friendly hotel offers a stylish haven for both business and leisure travelers. The hotel features elegant rooms with modern amenities, a rooftop bar with stunning views of the city skyline, and a trendy restaurant serving delectable dishes inspired by local flavors." />
          <Text text="Kimpton Tryon Park Hotel is pet-friendly and pets of all sizes are welcome for no additional fee. Upon arrival, your pet will receive courtesy bags for walking, pet beds, water bowls, and treats." />
          <Text text="Upon arrival, pets are greeted with special amenities, including plush pet beds, food and water bowls, and delicious treats. The hotel's dedication to pet-friendly hospitality extends to the staff, who are always ready to offer pet-sitting services and recommendations for nearby pet-friendly attractions." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Yoga mat', 'Scooters', 'Free coffee and tea service', 'Complimentary access to Wag! Premium']}
          />

          <Bold text="Aloft Charlotte Uptown at the EpiCentre" />
          <SingleLoadListingCard hotelName="100002010" />
          <Text text="Aloft Charlotte Uptown at the EpiCentre is a trendy and vibrant hotel located in the heart of Uptown Charlotte, North Carolina. The hotel's contemporary design and modern amenities ensure a comfortable and enjoyable stay for all guests." />
          <Text text="The spacious and well-appointed rooms boast stunning city views, and the vibrant lobby is a hub of activity, featuring a bar and lounge area where guests can unwind and mingle. Conveniently situated within the EpiCentre, guests can explore the city's entertainment district, which offers a plethora of dining, shopping, and nightlife options." />
          <Text text="Aloft Charlotte Uptown at the EpiCentre is pet-friendly and allows you to bring up to two pets that weigh 40 pounds or less for a fee of $50 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Fitness center', 'Laundry services', 'On-site dining', 'Dry cleaning services']}
          />

          <Bold text="The Ivey's Hotel" />
          <SingleLoadListingCard hotelName="100196448" />
          <Text text="The Ivey's Hotel is an elegant and luxurious boutique hotel located in the heart of Uptown Charlotte, North Carolina. Housed in a historic building, this pet-friendly hotel seamlessly blends modern amenities with classic charm. The hotel's beautifully designed rooms and suites exude sophistication and offer a tranquil retreat for guests and their pets." />
          <Text text="The Ivey's Hotel boasts exceptional service, personalized attention to detail, and a rooftop terrace with stunning views of the city." />
          <Text text="The Ivey's Hotel is pet-friendly and allows you to bring one dog that weighs up to 25 pounds for a fee of $150 for the first two nights; the fee is $50 per night for stays longer than two nights." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Fitness center', 'Fre breakfast', 'Pool', 'Free WiFi']}
          />

          <Bold text="The Sheraton Charlotte Hotel" />
          <SingleLoadListingCard hotelName="100388138" />
          <Text text="The Sheraton Charlotte Hotel is a prestigious and elegant accommodation located in the heart of Charlotte, North Carolina. Offering a perfect blend of modern luxury and Southern hospitality, this upscale hotel is a preferred choice for business travelers, tourists, and event attendees alike." />
          <Text text="The Sheraton Charlotte boasts an impressive array of amenities, including spacious and beautifully appointed guest rooms, state-of-the-art conference facilities, and exquisite dining options that cater to diverse palates. Guests can unwind and relax in the rooftop pool area while enjoying stunning views of the city skyline." />
          <Text text="The Sheraton Charlotte Hotel is pet-friendly and allows you to bring up to two pets that weigh 80 pounds for a fee of $50 per night." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['On-site dining options', 'Free WiFi', 'On-site bar', 'Pool', 'Free WiFi']}
          />

          <Bold text="Residence Inn Charlotte Uptown" />
          <SingleLoadListingCard hotelName="100398296" />
          <Text text="Residence Inn Charlotte Uptown is a welcoming and pet-friendly hotel located in the vibrant Uptown area of Charlotte, North Carolina. As an extended-stay hotel, Residence Inn offers spacious and well-appointed suites with fully equipped kitchens, making it an ideal choice for both short and long-term stays with pets." />
          <Text text="The hotel's amenities include a fitness center, outdoor patio with BBQ area, and a complimentary hot breakfast to kickstart the day. Its central location allows easy access to nearby attractions, dining options, and pet-friendly parks where guests can enjoy quality time with their pets." />
          <Text text="Residence Inn Charlotte Uptown is pet-friendly and allows two pets that weigh up to 150 pounds for a fee of $100 per stay." />
          <HighlightBox
            title="The hotel's amenities include:"
            highlights={['Free coffee and tea services', 'Free WiFi', 'Fitness center', 'Free breakfast', 'On-site dining options', 'On-site bar', 'Gift shop', 'Dry cleaning services']}
          />


  

          <Typography variant="h2">The Top Pet-Friendly Activities in Charlotte</Typography>
 
        
          <LinkContent
            link="https://www.charlottesgotalot.com/things-to-do/outdoors-adventure/freedom-park"
            linkText="Freedom Park"
            text="Freedom Park is a haven for pet owners and their furry pals. This sprawling urban park features walking trails, open spaces, and a beautiful lake where dogs can roam off-leash in designated areas. It's the perfect spot to enjoy a picnic, play fetch, or simply unwind amidst the scenic beauty."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image18.png" text="Freedom Park" />

          <LinkContent
            link="https://noda.org/"
            linkText="NoDa Arts District"
            text="Take your pet for a stroll through the eclectic NoDa Arts District. This vibrant neighborhood welcomes dogs on leashes and offers a lively atmosphere with art galleries, boutiques, and pet-friendly patios where you can relax and enjoy a meal together."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image2.png" text="NoDa" />

          <LinkContent
            link="https://www.dogbarcharlotte.net/"
            linkText="The Dog Bar"
            text="For a unique pet-friendly experience, head to The Dog Bar, a one-of-a-kind establishment that combines a bar with an off-leash dog park. Your pup can socialize and play with other dogs while you enjoy a cold beverage and unwind with friends."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image8.png" text="The Dog Par" />

          <LinkContent
            link="https://www.charlottesgotalot.com/things-to-do/outdoors-adventure/reedy-creek-nature-center"
            linkText="Reedy Creek Park and Nature Preserve"
            text="Located just outside of Charlotte, the Reedy Creek Park and Nature Preserve is a dog-friendly oasis. Explore the numerous hiking trails and immerse yourselves in nature as you both enjoy the sights and sounds of the outdoors."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image16.png" text="Charlotte Got a Lot" />

          <LinkContent
            link="https://www.birdsongbrewing.com/"
            linkText="Birdsong Brewing Co."
            text="Birdsong Brewing Co. is a pet-friendly brewery where you can enjoy a selection of craft beers while your furry friend relaxes by your side. The spacious outdoor patio provides a great atmosphere for mingling with other pet owners and their dogs."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image7.png" text="Birdsong Brewing Co." />

          <LinkContent
            link="https://www.visitnc.com/listing/4NBE/latta-plantation-nature-center-preserve"
            linkText="Latta Plantation Nature Preserve"
            text="Escape the hustle and bustle of the city at Latta Plantation Nature Preserve. This expansive preserve offers over 16 miles of pet-friendly hiking trails, scenic views, and opportunities for birdwatching and wildlife spotting."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/Latta%20Plantation.jpeg" text="https://charlotte.axios.com/17470/latta-plantation-nature-center-preserve-history-horses-hiking-and-the-occasional-snake/" />

          <LinkContent
            link="https://www.yelp.com/biz_photos/frazier-park-charlotte?select=8UadRHDpzV3JcvmxAR8iOA"
            linkText="Frazier Dog Park"
            text="Treat your pet to some off-leash fun at the Frazier Dog Park. Divided into separate sections for large and small dogs, this park allows your furry friend to play, run, and make new friends in a safe and secure environment."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/Frazier%20Dog%20Park.jpeg" text="http://basilstravels.com/category/boston-terriers-of-charlotte/frazier-dog-park/" />

          <LinkContent
            link="https://www.charlottesgotalot.com/blog/eat-drink/where-to-drink-beer-with-your-dog-in-charlotte"
            linkText="Pet-friendly Breweries Tour"
            text="Embark on a pet-friendly breweries tour in Charlotte. Many breweries in the city welcome well-behaved dogs in their outdoor seating areas, creating the perfect opportunity for you and your pet to socialize while savoring local brews."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/Pet%20Friendly%20Brewery.jpeg" text="https://dogclt.com/eat-drink/charlotte-dog-friendly-brewery-guide-south-end-loso/" />

          <LinkContent
            link="https://southendclt.org/about/south-ends-story"
            linkText="Historic South End"
            text="The Historic South End neighborhood is a lively area with pet-friendly patios, shops, and art installations. Take your pet on a leisurely walk along the Rail Trail and soak in the creative energy of the area."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image20.png" text="South End" />

          <LinkContent
            link="https://caninecafe.net/"
            linkText="Canine Café"
            text="Treat your pet to a special outing at the Canine Café, a unique store that offers gourmet treats, toys, and accessories for dogs. This delightful spot is a must-visit for pet owners looking to pamper their furry companions."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image3.png" text="Canine Cafe" />



          <Typography variant="h2">The Top Pet-Friendly Restaurants in Charlotte</Typography>
      

          <LinkContent
            link="https://www.sycamorebrew.com/"
            linkText="Sycamore Brewing"
            text="Sycamore Brewing is not just a brewery; it's a pet-friendly gathering spot. With an expansive outdoor patio, you can enjoy a variety of craft beers while your furry friend basks in the company of other dogs. The laid-back atmosphere and food trucks serving delicious treats make it a favorite among pet owners."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/Sycamore%20Brewing.jpeg" text="https://www.charlotteonthecheap.com/ipa-day-sycamore-brewing/" />

          <LinkContent
            link="https://www.catawbabrewing.com/"
            linkText="Catawba Brewing Company"
            text="Known for its great beer selection and relaxed ambiance, Catawba Brewing Company warmly welcomes pets on their outdoor patio. Grab a pint, indulge in some delectable bar bites, and let your dog enjoy the socializing with other patrons' pets."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image19.png" text="Catawba Brewing Company" />

          <LinkContent
            link="https://residentculturebrewing.com/"
            linkText="Resident Culture Brewing Company"
            text="This hip brewery not only serves exceptional craft beer but also provides a pet-friendly atmosphere on its outdoor patio. Bring your furry friend along and relish the communal vibe while savoring their innovative brews and food trucks offerings."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image10.png" text=" Resident Culture Brewing Company" />

          <LinkContent
            link="https://rhinomarket.com/"
            linkText="Rhino Market & Deli"
            text="Rhino Market & Deli is a charming spot with a pet-friendly patio, perfect for enjoying a delightful sandwich or salad with your pet by your side. They even offer pet treats to make your furry companion feel special."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image6.png" text="Rhino Market & Deli" />

          <LinkContent
            link="https://www.cabofishtaco.com/"
            linkText="Cabo Fish Taco"
            text="With its vibrant and inviting outdoor seating area, Cabo Fish Taco is an excellent spot for enjoying fresh and flavorful seafood dishes while your pet lounges beside you. Don't forget to check out their pet menu featuring canine-friendly treats."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image4.png" text="Cabo Fish Taco" />

          <LinkContent
            link="https://tupelohoneycafe.com/"
            linkText="Tupelo Honey"
            text="Tupelo Honey is a pet-friendly restaurant that offers a delightful Southern-inspired menu. Their outdoor patio allows you to dine with your furry friend while relishing dishes like fried chicken and sweet potato pancakes."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/Tupelo%20Honey.jpeg" text="https://www.youtube.com/watch?v=lvww2LRpxWI" />

          <LinkContent
            link="https://www.kidcashew.com/"
            linkText="Kid Cashew"
            text="Kid Cashew is a Mediterranean-inspired restaurant that extends its warm hospitality to pets on its outdoor patio. Savor the flavors of Mediterranean cuisine, and treat your pet to water and a friendly pat from the accommodating staff."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image17.png" text="Kid Cashew" />

          <LinkContent
            link="https://bangbangburgersclt.com/"
            linkText="Bang Bang Burgers"
            text="Craving a juicy burger? Bang Bang Burgers welcomes pets on their outdoor patio, providing a dog-friendly atmosphere for you and your furry friend. They even offer a special &quot;Bang Bark Burger&quot; for dogs, ensuring they have a delicious treat too."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image15.png" text="BK Magazine" />

          <LinkContent
            link="https://www.cabarruscreamery.com/"
            linkText="Cabarrus Creamery"
            text="Indulge your sweet tooth at Cabarrus Creamery, a delightful ice cream parlor that allows pets at their outdoor seating area. Savor handcrafted ice cream while your pet enjoys the attention from fellow patrons."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/image13.png" text="Cabarrus Creamery" />

          <LinkContent
            link="https://livingkitchen.com/"
            linkText="Luna’s Living Kitchen"
            text="Luna's Living Kitchen in Charlotte is a culinary gem that embraces the essence of healthy and sustainable dining. Nestled in the heart of this vibrant city, Luna's Living Kitchen offers an inviting space where food becomes an art form. With a focus on plant-based cuisine, the restaurant boasts a diverse menu filled with colorful and nourishing dishes, each crafted with a careful selection of fresh, organic, and locally-sourced ingredients."
          />
          <Img src="https://storage.googleapis.com/romingo-production-public/destination%20images/Charlotte/Luna%202.jpeg" text="https://vegcharlottenc.com/tag/lunas-living-kitchen/" />

  
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

export default Charlotte;
