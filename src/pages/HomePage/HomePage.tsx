import { Helmet } from "react-helmet";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useWindowSize } from "react-use";
import { useHistory, Link } from "react-router-dom";
import {
  Box,
  CSSObject,
  Button,
  Typography,
  Grid,
  Slide,
  TextField,
} from "@mui/material";

import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import CheckIcon from '@mui/icons-material/Check';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { saveSearch } from "../../store/searchReducer";
import ListingCardSquare from "../../components/MobileListingsCardHome";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

// import SectionOneImage from '../../assets/images/section-one.jpg';
// import SectionTwoImage from '../../assets/images/home-hero.jpg';
// import SectionThreeImage from '../../assets/images/homepage-dog.jpg';

// import LowestRates from '../../assets/images/icon-01.png';
// import AuthenticPet from '../../assets/images/icon-03.png';
// import BookNow from '../../assets/images/icon-04.png';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { GetHomePageProperty } from "../../constants/constants";
import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { randomDate } from "../../tools.js";
import { subscribeToNewsletter } from '../../services/endpoints'

import winterPromo from '../../assets/images/Winter-Promo.jpg'
import "./Sticky.css";
import "./HomePage.scss";

interface Props {
  sx?: CSSObject;
  footerMenus: {
    about: {
      text: string;
      link: string;
    }[];
    contact: {
      text: string;
      link: string;
    }[];
    blog: {
      text: string;
      link: string;
    }[];
    sitemap: {
      text: string;
      link: string;
    }[];
  };
}

const SectionOneImage = winterPromo
const SectionTwoImage = 'https://www.romingo.com/public/sections-icons/home-hero.jpg'
const SectionThreeImage = 'https://www.romingo.com/public/sections-icons/homepage-dog.jpg'

const LowestRates = 'https://www.romingo.com/public/sections-icons/lowest-rates.svg' //icon-01.png'
const AuthenticPet = 'https://www.romingo.com/public/sections-icons/pet-friendly.svg'//'icon-03.png'
const BookNow = 'https://www.romingo.com/public/sections-icons/trusted.svg' //icon-04.png'

const HomePage: FC<Props> = () => {
  const history = useHistory();
  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const dispatch: Dispatch<any> = useDispatch();
  const { width } = useWindowSize()

  const today = new Date();

  const { data: newData, loading, error } = useQuery(gql`${GetHomePageProperty}`, { variables: {}})

  const [showLocations, setShowLocations] = useState(false)
  const [showPetPolicies, setShowPetPolicies] = useState(false)
  const [showFull, setShowFull] = useState(false)
  const [showSticky, setShowSticky] = useState(false)


  const handleImFlexibleClick = () => {
     const thirtyDays = DateTime.local().plus({ days: 21 }).toJSDate();
     const randomCheckIn = randomDate(new Date(), thirtyDays);
     const threeDaysFromCheckIn = DateTime.fromJSDate(randomCheckIn)
       .plus({ days: 3 })
       .toJSDate();
     const randomCheckOut = randomDate(
       DateTime.fromJSDate(randomCheckIn).plus({ days: 1 }).toJSDate(),
       threeDaysFromCheckIn
     );

    const laSearchData = {
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

     dispatch(
       saveSearch({
         city: laSearchData.city,
         checkIn: new Date(randomCheckIn).toISOString(),
         checkOut: new Date(randomCheckOut).toISOString(),
         occupants: { adults: 2, children: 0, dogs: 1 },
         lat: laSearchData.lat,
         lng: laSearchData.lng,
       })
     );
     setTimeout(() => {
       history.push("/listings");
     }, 250);
   };

  /* Method that will fix header after a specific scrollable */
  const isSticky = () => {
    const scrollTop = window.scrollY;
    scrollTop >= 200
      ? setShowSticky(true)
      : setShowSticky(false)
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);


  const locationLinks = [
    { to: "pet-friendly-hotels/los-angeles-california", name: 'Los Angeles' },
    { to: "pet-friendly-hotels/san-francisco-california", name: 'San Francisco' },
    { to: "pet-friendly-hotels/san-diego-california", name: 'San Diego' },
    { to: "pet-friendly-hotels/palm-springs-california", name: 'Palm Springs' },
    { to: "pet-friendly-hotels/austin-texas", name: 'Austin' },
    { to: "pet-friendly-hotels/dallas-texas", name: 'Dallas' },
    { to: "pet-friendly-hotels/houston-texas", name: 'Houston' },
    { to: "pet-friendly-hotels/phoenix-arizona", name: 'Phoenix' },
    { to: "pet-friendly-hotels/scottsdale-arizona", name: 'Scottsdale' },
    { to: "pet-friendly-hotels/tucson-arizona", name: 'Tucson' },
    { to: "pet-friendly-hotels/santa-fe-new-mexico", name: 'Santa Fe' },
    { to: "pet-friendly-hotels/san-antonio-texas", name: 'San Antonio' },
    { to: "pet-friendly-hotels/denver-colorado", name: 'Denver' },
    { to: "pet-friendly-hotels/seattle-washington", name: 'Seattle' },
    { to: "pet-friendly-hotels/portland-oregon", name: 'Portland' },
    { to: "pet-friendly-hotels/salt-lake-city-utah", name: 'Salt Lake City' },
   
    { to: "pet-friendly-hotels/atlanta-georgia", name: 'Atlanta' },
    { to: "pet-friendly-hotels/baltimore-maryland", name: 'Baltimore' },
    { to: "pet-friendly-hotels/boston-massachusetts", name: 'Boston' },
    { to: "pet-friendly-hotels/charlotte-north-carolina", name: 'Charlotte' },
    { to: "pet-friendly-hotels/chicago-illinois", name: 'Chicago' },
    { to: "pet-friendly-hotels/cleveland-ohio", name: 'Cleveland' },
    { to: "pet-friendly-hotels/detroit-michigan", name: 'Detroit' },
    { to: "pet-friendly-hotels/indianapolis-indiana", name: 'Indianapolis' },
    { to: "pet-friendly-hotels/miami-florida", name: 'Miami' },
    { to: "pet-friendly-hotels/milwaukee-wisconsin", name: 'Milwaukee' },
    { to: "pet-friendly-hotels/minneapolis-minnesota", name: 'Minneapolis' },
    { to: "pet-friendly-hotels/new-orleans-louisiana", name: 'New Orleans' },
    { to: "pet-friendly-hotels/new-york-new-york", name: 'New York City' },
    { to: "pet-friendly-hotels/washington-dc", name: 'Washington D.C.' },

  ]
  locationLinks.sort((a, b) => a.name.localeCompare(b.name))

  const policyLinks = [
    { to: 'marriott-pet-policy', name: "Marriott hotels pet policy" },
    { to: 'hilton-pet-policy', name: "Hilton hotels pet policy" },
    { to: 'ihg-pet-policy', name: "IHG hotels pet policy" },
    { to: 'hyatt-pet-policy', name: "Hyatt hotels pet policy" },
    { to: "motel-6-pet-policy", name: "Motel 6 hotels pet policy" },
    { to: "boutique-pet-policy", name: "Boutique hotels pet policy" }
  ]


  const InfoBox = ({ imgSrc, imgAlt, imgWidth, header, text }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '300px', mt: '2rem', p: '1.5rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '21px 7px 63px #0000000d' }}>
      <img style={{ width: imgWidth, textAlign: 'center'}} src={imgSrc} alt={imgAlt} />
      <Box textAlign="center">
        <Typography variant="h5" pb="0.5rem">{header}</Typography>
        <Typography component="p" variant="base">{text}</Typography>
      </Box>
    </Box>
  )

  const RightPhotoBox = ({ imgSrc, imgAlt, backgroundColor, fontColor = 'black', header, text, cta, extraText }) => (
    <Box sx={{ width: '100%', backgroundColor: backgroundColor, display: { xs: 'block', sm: 'block', md: 'flex' }, justifyContent: 'center', alignItems: 'flex-start' }}> 
      <Box 
        component="img" 
        sx={{ 
          marginLeft: 'auto', 
          maxWidth: '100%',
          display: { xs: 'block', sm: 'block', md: 'none'}
        }} 
        src={imgSrc} 
        alt={imgAlt}
        loading="lazy"
      />
      <Box sx={{ p: { xs: '1.5rem', sm: '1.5rem', md: 0 },  maxWidth: { xs: 'auto', sm: 'auto', md: '440px' } , mx: 'auto', my: 'auto'}}>
        <Typography variant="h2" sx={{ color: fontColor, textAlign: { xs: 'left', sm: 'left', md: 'left' }, mt: { xs: '1rem', sm: '1rem', md: 0 },  mb: '1.5rem'}}>{header}</Typography>
        <Typography variant="p" sx={{ color: fontColor, fontSize: '1.25rem', mb: '2rem'}}>{text}</Typography>
        <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' }, mt: '2rem', mb: '1.5rem' }}>
          {cta}
        </Box>
        {extraText && <Typography variant="base" sx={{ color: fontColor }}>{extraText}</Typography>}
      </Box>
      <Box 
        component="img" 
        sx={{ 
          marginLeft: 'auto', 
          maxWidth: { xs: '100%', sm: '100%', md: '500px', lg: '800px', xl: '800px' },
          display: { xs: 'none', sm: 'none', md: 'block'}
        }} 
        src={imgSrc} 
        alt={imgAlt}
        loading="lazy"
      />
    </Box>
  )

  const LeftPhotoBox = ({ imgSrc, imgAlt, fontColor = 'black', backgroundColor, header, text, cta, extraText }) => (
    <Box sx={{ position: 'relative', backgroundColor: backgroundColor, display: { sm: 'block', md: 'flex' }, alignItems: 'flex-start'}}> 
      <Box 
        component="img" 
        sx={{ 
          maxWidth: { xs: '100%', sm: '100%', md: '500px', lg: '800px', xl: '800px' }
        }} 
        src={imgSrc} 
        alt={imgAlt}
        loading="lazy"
      />
      <Box sx={{ p: { xs: '1.5rem', sm: '1.5rem', md: '2rem'}, maxWidth: '500px', mx:'auto', my: 'auto'}}>
        <Typography variant="h2" sx={{ color: fontColor, textAlign: { xs: 'left', sm: 'left', md: 'left' }, mb: '1.5rem'}}>{header}</Typography>
        <Typography variant="p" sx={{ color: fontColor, mb: '1.5rem'}}>{text}</Typography>
        <Box sx={{ mt: '1.5rem', textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
          {cta}
        </Box>
        <br />
        <br />
        {extraText && <Typography variant="base" sx={{ color: fontColor }}>{extraText}</Typography>}
      </Box>
    </Box>
  )

  const SignUpEmail = () => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [email, setEmail] = useState('')
    return (
      <form style={{ marginTop: '1.25rem'}} onSubmit={(e) => {
        e.preventDefault();
        subscribeToNewsletter(email);
      }}>
        <TextField  
          sx={{ 
            '& .MuiInput-underline:before': { borderBottomColor: 'white' },
             '& .MuiInput-underline:after': { borderBottomColor: 'white' },
            input: { color: 'white'  },  
            width: { xs: '100%', sm: '100%', md: '300px' } }} 
          variant="standard" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target?.value)}
          required 
          placeholder='Email address' 
          InputProps={{ endAdornment: 
            isSuccess ? <Box sx={{ backgroundColor: 'white', width: '24px', height: '24px', borderRadius: '100%', cursor: 'pointer'}}><CheckIcon /></Box>
              : <Box onClick={() => {
                setIsSuccess(false)
                const result = subscribeToNewsletter(email)
                setIsSuccess(result.success)
              }} sx={{ backgroundColor: 'white', width: '24px', height: '24px', borderRadius: '100%', cursor: 'pointer'}}><PlayArrowOutlinedIcon /></Box>
          }}
        />
      </form>
    )
  }

  
  const LocationBox = ({ imageUrl, cityName, locationUrl }) => (
    <Link to={locationUrl} underline="none">
      <Box 
        display="flex" 
        flexDirection="column" 
        boxShadow={5} 
        borderRadius={2} 
        sx={{ 
          mr: { xs: '1rem', sm: '1rem', md: 0 },
          '&:hover': { boxShadow: 7 } 
        }}
      >
        <Box
           component="img"
           sx={{
             borderRadius: '6px 6px 0px 0px',
             height: '280px',
             width: { xs: '100%', sm: '100%', md: '370px', lg: '370px' },
           }}
           alt={cityName}
           src={imageUrl}
         />
        <Typography pl="0.3rem" pb="0.25rem" pt="0.5rem" variant='p' color="black" sx={{ textDecoration: 'none'}}>{cityName}</Typography>
      </Box>
    </Link>
  )

  console.log(newData?.getHomepagePropertiesThree)

  const pricesOne = [149, 129, 99]
  const pricesTwo = [175, 189, 199]

  return (
    <div className="homepage">      
      <Helmet>
        <title>Book pet friendly hotels - Romingo</title>
        <description>Romingo is the easiest way to book pet-friendly travel. Hand-selected hotels, responsive customer service, and the lowest rates guaranteed provide a truly pet-friendly experience. Roam the world freely with Romingo.</description>
        <meta property="og:title" content="Book pet friendly hotels — Romingo" />
        <meta property="og:url" content="https://www.romingo.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta property="og:site_name" content="Romingo" />
        <meta name="twitter:title" content="Book pet friendly hotels — Romingo" />
        <meta name="twitter:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {showSticky && <>
        <Box sx= {{ display: { xs: 'none', sm: 'none', md: 'block'} }} 
          position="fixed" 
          top="30px" 
          left="280px" 
          zIndex="9999"
        >
          <Box 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})} 
            color="blue" 
            sx={{ 
            cursor: 'pointer',
            '&:hover': {
              color: '#0000A3'
            }

          }}>Book Now</Box>
        </Box>

        <Box sx= {{ display: { xs: 'block', sm: 'block', md: 'none'} }} 
          position="fixed" 
          bottom="20px" 
          right="30px" 
          zIndex="9999"
        >
          <Button
            variant="contained"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})} 
          >Book Now</Button>
        </Box>

      </>}

      <Header />
      <Box sx={{  background: { xs: '#A6DBE5', sm: 'white', md: '#A6DBE5' }, mx: 'auto', py: '1rem', height: { md: 'auto', lg: '240px' },  }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          mx: 'auto',
          maxWidth: '1300px',
          flexWrap: 'wrap',
          gap: { xs: '1.5rem', sm: '1.5rem', md: '2.5rem' },
          mt: '2rem',
          mb: { xs: '1.5rem', sm: '1.5rem', md: 0 }
        }}>
          <InfoBox 
            imgSrc={BookNow}
            imgAlt="pet-friendly guarantee"
            imgWidth="82%"
            header="Pet-friendly guarantee"
            text="Our team hand-selects hotel partners that offer a warm and welcoming stay for your four-legged friends."
          />
          <InfoBox
            imgSrc={AuthenticPet}
            imgAlt="accurate pet policies"
            imgWidth='82%'
            header="Accurate pet policies"
            text="Experience enjoyable and stress-free travels with your pets with our accurate and verified hotel pet policies."
          />
          <InfoBox
            imgSrc={LowestRates}
            imgAlt="lowest rates"
            imgWidth="90%"
            header="Lowest rates"
            text="Unlike other sites, Romingo negotiates the lowest hotel rates, allowing you to travel with your pets without breaking the bank."
          />
        </Box>
      </Box>

      <Box onClick={() => setShowLocations(!showLocations)} sx={{ display: { sm: 'block', md: 'none'}, boxShadow: 2, "&:hover": { boxShadow: 3 } , textAlign: 'center', p: '2em', borderRadius: '20px', mx: '1rem', mt: '2rem', mb: '0.25rem'}}>
        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography sx={{ fontSize: '1.2em' }}>Explore destinations</Typography>
          <KeyboardArrowDownIcon color="primary" />
        </Box>
      </Box>

      <Box onClick={() => setShowPetPolicies(!showPetPolicies)} sx={{ display: { sm: 'block', md: 'none'}, boxShadow: 2, "&:hover": { boxShadow: 3 } , textAlign: 'center', p: '2em', borderRadius: '20px', mx: '1rem', mt: '2rem', mb: '0.25rem'}}>
        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography sx={{ fontSize: '1.2em' }}>Hotel pet policies</Typography>
          <KeyboardArrowDownIcon color="primary" />
        </Box>
      </Box>


      <Box  sx={{ 
        mt: { xs: '3rem', sm: '3rem', md: "20rem" },
        marginBottom: { sm: 0, md: 0, lg: 0 }, 
        pb: 0,
        background: 'white',

      }}
      >

        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: { xs: '0rem', sm: '0rem', md: '4rem' }, mb: '2rem' }}>
          <Typography variant="h4" sx={{ mb: '1rem', ml: { xs: '0.5em', sm: '1em', lg: '0.6em' } }}>Where to next?</Typography>
          <Box sx={{ 
            display: 'flex',
            mb: {xs : 0, sm: 0, md: '0.5rem'},
            ml: '1rem',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', 'sm': 'column', md: 'row', lg: 'row' }, 
            gap: '2rem'
          }}>
            
            <LocationBox 
              imageUrl="https://storage.googleapis.com/romingo-production-public/San%20Diego%20Pet-Friendly%20Travel.jpg "
              cityName="Escape to San Diego"
              locationUrl="/pet-friendly-hotels/san-diego-california"
            />
            <LocationBox 
              imageUrl="https://storage.googleapis.com/romingo-production-public/Portland%20Pet-Friendly%20Travel.jpg "
              cityName="Discover Portland"
              locationUrl="/pet-friendly-hotels/portland-oregon"
            />
            <LocationBox 
              imageUrl="https://storage.googleapis.com/romingo-production-public/Denver%20Pet-Friendly%20Travel.jpg "
              cityName="Roam to Denver"
              locationUrl="/pet-friendly-hotels/denver-colorado"
            />

          </Box>

        </Box>

        <Box sx={{ mt: { xs: '1rem', sm: '1rem', md: '8rem'} }}>
          <LeftPhotoBox
            imgSrc={SectionOneImage}
            imgAlt="pet-friendly travel"
            backgroundColor="#f0ddec"
            header="Winter is here! 🍁🎃"
            text="Book your next pet-friendly trip with Romingo and enjoy up to 20% off the lowest rates."
            cta={<Button sx={{ width: '300px' }} onClick={handleImFlexibleClick} variant="contained">Book Now</Button>}
          />
        </Box>


        <Box backgroundColor="#F4DAC9" py="4rem">
          <Box sx={{ mx: { xs: '1rem', sm: '1rem', md: 'auto'}  }} display="flex" flexDirection="column" gap="1.5rem" maxWidth="720px" backgroundColor="white" p="2rem"  borderRadius="40px 40px 40px 40px">
            <Typography variant="h6">Welcome to Romingo!</Typography>
            <Typography variant="base">As a pet-friendly travel lover, I&apos;ve always struggled when booking trips for me and my pup. I founded Romingo with the goal to make pet-friendly travel more enjoyable and accessible for everyone.</Typography>
            <Typography variant="base">Romingo partners with the best pet-friendly hotels to provide you with a warm and welcoming travel experience. When you book with Romingo, you&apos;re investing in an unforgettable travel experience with your pets.</Typography>
            <Typography variant="base">Thank you for supporting our small business, and safe travels!</Typography>
            <Typography variant="base">Zach Somers, Founder</Typography>
          </Box>
        </Box>
        



        <Box sx={{ maxWidth: '1240px', mx: 'auto', mt: { xs: '2rem', sm: '2rem', md: '4rem' }, mb: '2rem' }}>
          <Typography variant="h4" sx={{ mb: '1rem', ml: { xs: '0.9em', sm: '1em', lg: '0.6em' } }}>Pet-approved favorites</Typography>

          <Box sx={{ display: { xs: 'block', 'sm': 'block', md: 'flex', lg: 'flex' }, mb: {xs : 0, sm: 0, md: '0.5rem'} }}>
            
            {loading && <>
              <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={0} /></Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={1} /></Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={2} /></Grid>
            </>}

            {!loading && newData.getHomepagePropertiesThree.slice(0,3).map((hotel, i) => (
              <Box key={i} sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  {...hotel}
                  name={hotel.hotelName === 'Margaritaville Resort Palm Springs' ? 'Margitaville Resort' : hotel.hotelName}
                  lowestTotalPriceAfterTax={pricesOne[i]}
                  highlighted={false}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'block', 'sm': 'block', md: 'block', lg: 'flex' }, mb: '0.5rem' }}>
            {loading && <>
              <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={3} /></Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={4} /></Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={5} /></Grid>
            </>}

            {!loading && newData.getHomepagePropertiesThree.slice(3).map((hotel, i) => (
              <Box key={i} sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  {...hotel}
                  name={hotel.hotelName === 'Margaritaville Resort Palm Springs' ? 'Margitaville Resort' : hotel.hotelName}
                  lowestTotalPriceAfterTax={pricesTwo[i]}
                  highlighted={false}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ my: { xs: '1rem', sm: '1rem', md: '8rem'} }}>
          <RightPhotoBox
            imgSrc={SectionTwoImage}
            imgAlt="romingo rewards"
            backgroundColor="#f4ebe3"
            fontColor="black"
            header="Romingo rewards 🐶"
            text="Get rewarded with Romingo. Earn free travel 
            credits for every 5 qualified* reservations booked 
            with our pet-friendly hotel partners!"
            cta={<Button sx={{  width: '300px' }} variant="contained" onClick={() => history.push('/create-account')}>Create an account</Button>}
            extraText="*Guests will earn a $100 travel voucher when a minimum of 5 
            reservations are actually consumed. Each reservation must have a 
            minimum net spend of $200, exclusive of taxes/fees. Cancellation 
            fees do not count towards stays or spend requirements. Travel 
            vouchers will be sent within 7 days post-stay and must be used 
            within one (1) calendar year from issue date."
          />
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} backgroundColor="#ffffff" p="2rem" mt="2rem">
        <Box sx={{ 
          mx: 'auto', maxWidth: '760px', 
          mt: '4rem',
          mb: '8rem', 
          p: '1.5rem',
          boxShadow: 2, 
          gap: '1rem',
          borderRadius: '20px',
          backgroundColor: 'white',
          height: showFull ? 'auto' : '220px',
          overflow: 'hidden'
        }}>
          <Box>
            <Typography variant="h2" mb="1rem" textAlign="center">Plan your next trip with Romingo</Typography>
          </Box>
          {!showFull && <Box position="relative">
            <Box onClick={() => setShowFull(!showFull)} textAlign="center" position="absolute" top="160px" backgroundColor="white" width="100%" py="0.25rem" clickable sx={{ '&:hover': { backgroundColor: '#D3D3D3' } }}>
              <KeyboardArrowDownIcon color="white" />
            </Box>
          </Box>
          }
          <Box display="flex" flexDirection="row" sx={{ justifyContent: 'space-around'}}>
            <Box display="flex" flexDirection="column" gap="0.5rem">
              <Typography borderBottom="1px solid black" variant="p" fontSize="1.25rem">Explore our destinations</Typography>
              {locationLinks.map(link => 
                <Box key={link.to}><Link key={link.to} to={link.to}><Typography variant="base">{link.name} pet-friendly hotels</Typography></Link></Box>
              )}
            </Box>
            <Box display="flex" flexDirection="column" gap="0.5rem">
              <Typography borderBottom="1px solid black" variant="p" fontSize="1.25rem">Hotel pet policies</Typography>
              {policyLinks.map(link => 
                <Box key={link.to}><Link key={link.to} to={link.to}><Typography variant="base">{link.name} pet-friendly hotels</Typography></Link></Box>
              )}
            </Box>
          </Box>   
        </Box>
      </Box>

      <div id="cta">
      <RightPhotoBox
        imgSrc={SectionThreeImage}
        imgAlt="sign up for romingo exclusive deals"
        backgroundColor="#009CA1"
        fontColor="white"
        header="Sign up for Romingo exclusive deals and pet-friendly tips"
        text="Enter your email address below:"
        cta={<SignUpEmail />}
      />
      </div>


      <Slide direction='up' in={showLocations} mountOnEnter unmountOnExit>
        <Box sx={{ 
          position: 'fixed', 
          overflow: 'auto',
          bottom: '0', 
          height: '80%', 
          width: '100%', 
          backgroundColor: 'white',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px',
          zIndex: 1000
        }}>
          <Box position="relative" width="90%" textAlign="center" sx={{ m: '1rem', mt: '1.5rem', backgroundColor: 'white', }}>
            <Typography textAlign="center" variant="h5">Explore destinations</Typography>
            <Button sx={{ position: 'absolute', top: -6, right: 0 }}  variant="outlined" onClick={() => setShowLocations(false)}>X</Button>
          </Box>
          <Box height="88%" overflow="scroll">
            {locationLinks.map(link => 
              <Link key={link.to} to={link.to} style={{ textDecoration: 'none', color: 'black'}}><Box sx={{ px: '1.25rem', py: '0.75rem', cursor: 'pointer', '&:hover': { backgroundColor: '#d9f7fc'} }}><Typography variant="p">{link.name}</Typography></Box></Link>
            )}
          </Box>
        </Box>
      </Slide>

      <Slide direction='up' in={showPetPolicies} mountOnEnter unmountOnExit>
        <Box sx={{ 
          position: 'fixed', 
          overflow: 'auto',
          bottom: '0', 
          height: '80%', 
          width: '100%', 
          backgroundColor: 'white',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px',
          zIndex: 1000
        }}>
          <Box position="relative" width="90%" textAlign="center" sx={{ m: '1rem', mt: '1.5rem', backgroundColor: 'white', }}>
            <Typography textAlign="center" variant="h5">Hotel pet policies</Typography>
            <Button sx={{ position: 'absolute', top: -6, right: 0 }}  variant="outlined" onClick={() => setShowPetPolicies(false)}>X</Button>
          </Box>
          <Box height="88%" overflow="scroll">
            {policyLinks.map(link => 
              <Link key={link.to} to={link.to} style={{ textDecoration: 'none', color: 'black'}}><Box sx={{ px: '1.25rem', py: '0.75rem', cursor: 'pointer', '&:hover': { backgroundColor: '#d9f7fc'} }}><Typography variant="p">{link.name}</Typography></Box></Link>
            )}
          </Box>
        </Box>
      </Slide>

  
      <Footer />
    </div>
  );
};

export default HomePage;
