import {Helmet} from "react-helmet";
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

const SectionOneImage = 'https://www.romingo.com/public/sections-icons/section-one.jpg'
const SectionTwoImage = 'https://www.romingo.com/public/sections-icons/home-hero.jpg'
const SectionThreeImage = 'https://www.romingo.com/public/sections-icons/homepage-dog.jpg'

const LowestRates = 'https://www.romingo.com/public/sections-icons/icon-01.png'
const AuthenticPet = 'https://www.romingo.com/public/sections-icons/icon-03.png'
const BookNow = 'https://www.romingo.com/public/sections-icons/icon-04.png'

const HomePage: FC<Props> = () => {
  const history = useHistory();
  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const dispatch: Dispatch<any> = useDispatch();
  const { width } = useWindowSize()

  const today = new Date();

  const { data: newData, error } = useQuery(gql`${GetHomePageProperty}`, { variables: {}})

  let ghSanDiego, westin, plazaResort, saguaro, hiltonSf, hrMissionBay, thompson,
  avalon, ghVail, elRey, element, olive, andaz,
  seabird, leMerdien, paradisePoint, hiltonLongBeach, hrOrange, marina

  if (newData) {
    const sorted = [...newData.getHomepagePropertiesThree].sort((a, b) => a.name.localeCompare(b.name))
    andaz = sorted[0];
    avalon = sorted[1];
    elRey = sorted[2];
    element = sorted[3];
    ghVail = sorted[4];
    hiltonLongBeach = sorted[5];
    hiltonSf = sorted[6];
    olive = sorted[7];
    hrOrange = sorted[8];
    leMerdien = sorted[9];
    ghSanDiego = sorted[10];
    marina = sorted[11];
    paradisePoint = sorted[12];
    plazaResort = sorted[13];
    saguaro = sorted[14];
    seabird = sorted[15];
    westin = sorted[16];
    thompson = sorted[17]
  }

  const [showLocations, setShowLocations] = useState(false)
  const [showPetPolicies, setShowPetPolicies] = useState(false)
  const [showFull, setShowFull] = useState(false)

  const locationIds = [
    "ba12d364-9b1f-48c5-9ddc-7e68b40df076",
    "2714faad-9ea8-4851-9506-274710cdd51b",
    "d4c10666-addf-47a6-9870-767518d9ebad",
    "6f2cf61f-c769-47d9-9e46-90c5664b60b1",
    "82145909-13b4-4aab-be20-e0db474021c1",
    "58b23325-2016-44ef-886f-67e962dab17f",
  ];

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
     const cityId = locationIds[Math.floor(Math.random() * locationIds.length)];
     const center = cities.find(x => x.id === cityId).center

     dispatch(
       saveSearch({
         city: cityId,
         checkIn: new Date(randomCheckIn).toISOString(),
         checkOut: new Date(randomCheckOut).toISOString(),
         occupants: { adults: 2, children: 0, dogs: 1 },
         lat: center.latitude,
         lng: center.longitude,
       })
     );
     setTimeout(() => {
       history.push("/listings");
     }, 250);
   };

  /* Method that will fix header after a specific scrollable */
  const isSticky = () => {
    const header = document.querySelector(".sticky-header");
    const scrollTop = window.scrollY;

    scrollTop >= 0
      ? header && header.classList.add("is-sticky")
      : header && header.classList.remove("is-sticky");
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
    { to: "pet-friendly-hotels/orange-county-california", name: 'Orange County' },
    { to: "pet-friendly-hotels/santa-barbara-california", name: 'Santa Barbara' },
    { to: "pet-friendly-hotels/palm-springs-california", name: 'Palm Springs' },
    { to: "pet-friendly-hotels/austin-texas", name: 'Austin' },
    { to: "pet-friendly-hotels/dallas-texas", name: 'Dallas' },
    { to: "pet-friendly-hotels/houston-texas", name: 'Houston' },
    { to: "pet-friendly-hotels/oceanside-california", name: 'Oceanside' },
    { to: "pet-friendly-hotels/phoenix-arizona", name: 'Phoenix' },
    { to: "pet-friendly-hotels/scottsdale-arizona", name: 'Scottsdale' },
    { to: "pet-friendly-hotels/tucson-arizona", name: 'Tucson' },
    { to: "pet-friendly-hotels/santa-fe-new-mexico", name: 'Santa Fe' },
    { to: "pet-friendly-hotels/san-antonio-texas", name: 'San Antonio' },
    { to: "pet-friendly-hotels/vail-colorado", name: 'Vail' },
    { to: "pet-friendly-hotels/colorado-springs-colorado", name: 'Colorado Springs' },
    { to: "pet-friendly-hotels/denver-colorado", name: 'Denver' },
    { to: "pet-friendly-hotels/seattle-washington", name: 'Seattle' },
    { to: "pet-friendly-hotels/portland-oregon", name: 'Portland' },
    { to: "pet-friendly-hotels/sacramento-california", name: 'Sacramento' },
    { to: "pet-friendly-hotels/salt-lake-city-utah", name: 'Salt Lake City' },
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
        <Typography variant="h5" pt="1rem" pb="0.5rem">{header}</Typography>
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

  return (
    <div className="homepage">      
      <Helmet>
        <title>Book pet friendly hotels - Romingo</title>
        <description>Romingo is the easiest way to book pet-friendly travel. Hand-selected hotels, responsive customer service, and our lowest rates guaranteed ensure that our guests enjoy a true pet-friendly experience. Roam the world freely with Romingo.</description>
        <meta property="og:title" content="Book pet friendly hotels — Romingo" />
        <meta property="og:url" content="https://www.romingo.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta property="og:site_name" content="Romingo" />
        <meta name="twitter:title" content="Book pet friendly hotels — Romingo" />
        <meta name="twitter:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />
      <Box sx={{  background: { xs: '#A6DBE5', sm: 'white', md: '#f4dac9' }, mx: 'auto', py: '1rem', height: { md: 'auto', lg: '240px' },  }}>
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
            imgAlt="pet-friendly travel"
            imgWidth="70%"
            header="Pet-friendly travel"
            text="Romingo has searched thousands of pet-friendly hotels and we've picked the best for travelers and their pets to enjoy." 
          />
          <InfoBox
            imgSrc={LowestRates}
            imgAlt="lowest rates"
            imgWidth="83%"
            header="Best rates + $0 pet fees"
            text="Many travel sites have hidden fees, but Romingo offers the lowest rates and pets always stay for $0 pet fees."
          />
          <InfoBox
            imgSrc={AuthenticPet}
            imgAlt="trusted and accredited"
            imgWidth='85%'
            header="Trusted and accredited"
            text="Travelers and pets receive VIP amenities at our partner hotels. Plan your next pet-friendly trip with Romingo!"
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
          <Typography variant="h4" sx={{ mb: '1rem', ml: { xs: '0.9em', sm: '1em', lg: '0.6em' } }}>Where to next?</Typography>
        {/* todo add locations */}

        </Box>

        <Box mt="1rem">
          <LeftPhotoBox
            imgSrc={SectionOneImage}
            imgAlt="pet-friendly travel"
            backgroundColor="#A6DBE5"
            header="Book your next pet-friendly trip with Romingo and enjoy up to 20% off the lowest rates."
            text="Book your favorite pet-friendly hotels with Romingo and enjoy up to 20% off all hotels... plus $0 pet fees!"
            cta={<Button sx={{ width: '300px' }} onClick={handleImFlexibleClick} variant="contained">Book Now</Button>}
          />
        </Box>

        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: { xs: '0rem', sm: '0rem', md: '4rem' }, mb: '2rem' }}>
          <Typography variant="h4" sx={{ mb: '1rem', ml: { xs: '0.9em', sm: '1em', lg: '0.6em' } }}>Pet-approved favorites</Typography>

          <Box sx={{ display: { xs: 'block', 'sm': 'block', md: 'flex', lg: 'flex' }, mb: {xs : 0, sm: 0, md: '0.5rem'} }}>
            {(ghSanDiego) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={0}
                  {...ghSanDiego}
                  name="Manchester Grand Hyatt"
                  city={{ name: 'San Diego, CA' }}
                  lowestTotalPriceAfterTax={161}
                  highlighted={false}
                />
              </Box>: <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={0} /></Grid>
            }  
            {(westin) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={1}
                  {...westin}
                  name={'The Westin Bonaventure LA'}
                  city={{ name: 'Los Angeles, CA' }}
                  lowestTotalPriceAfterTax={119}
                  highlighted={false}
                />
              </Box>: <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={1} /></Grid>
            }  
            {(plazaResort) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={2}
                  {...plazaResort}
                  city={{ name: 'Scottsdale, AZ' }}
                  lowestTotalPriceAfterTax={149}
                  highlighted={false}
                />
              </Box>: <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={2} /></Grid>
            }  
          </Box>

          <Box sx={{ display: { xs: 'block', 'sm': 'block', md: 'block', lg: 'flex' }, mb: '0.5rem' }}>
            {(saguaro) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={3}
                  {...saguaro}
                  city={{ name: 'Palm Springs, CA' }}
                  lowestTotalPriceAfterTax={135}
                  highlighted={false}
                />
              </Box>: <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={3} /></Grid>
            }  

            {(hiltonSf) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={4}
                  {...hiltonSf}
                  name={'Hilton San Francisco'}
                  city={{ name: 'San Francisco, CA' }}
                  lowestTotalPriceAfterTax={143}
                  highlighted={false}
                />
              </Box>: <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={4} /></Grid>
            }  

            {(thompson) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={5}
                  {...thompson}
                  city={{ name: 'San Antonio, TX' }}
                  lowestTotalPriceAfterTax={199}
                  highlighted={false}
                />
              </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={5} /></Grid>
            } 
          </Box>
        </Box>

        <Box mt="1rem">
          <RightPhotoBox
            imgSrc={SectionTwoImage}
            imgAlt="romingo rewards"
            backgroundColor="#ffa57f"
            fontColor="white"
            header="Romingo Rewards 🐶"
            text="Get rewarded when you book with Romingo. Simple create a free account, book travel with your furry friend, and earn points towards future stays. For  every 5 reservations that are booked and stayed, guests will receive a $100 Romingo Reward towards a future hotel reservation."
            cta={<Button sx={{  width: '300px' }} variant="contained" onClick={() => history.push('/create-account')}>Create an account</Button>}
          />
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} backgroundColor="#ffffff" p="2rem" mt="2rem">
        <Box sx={{ 
          mx: 'auto', maxWidth: '760px', 
          my: '1rem', 
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
