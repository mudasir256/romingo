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

import SectionOneImage from '../../assets/images/section-one.jpg';
import SectionTwoImage from '../../assets/images/home-hero.jpg';
import SectionThreeImage from '../../assets/images/homepage-dog.jpg';

import LogoImgWhite from '../../assets/images/logo-white.png';
import LowestRates from '../../assets/images/icon-01.png';
import AuthenticPet from '../../assets/images/icon-03.png';
import BookNow from '../../assets/images/icon-04.png';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { GetPropertyDetails, GetHomePageProperty } from "../../constants/constants";
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


const HomePage: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false)
  const history = useHistory();
  const search = useSelector((state: any) => state.searchReducer.search);
  const dispatch: Dispatch<any> = useDispatch();
  const { width } = useWindowSize()

  const today = new Date();
  const fewDaysLater = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 2
  ).toISOString();

  const endTripDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 4
  ).toISOString();

  useEffect(() => {
    window.Intercom("boot", {
      app_id: "qa6datd3",
      alignment: "right",
      custom_launcher_selector: "#CUSTOM",
    });
    window.Intercom("update");
    if (width < 700) {
      const intercomId = "CUSTOM"
      const domNode = document.getElementById(intercomId);
      if (domNode) {
        domNode.style.display = 'none';
      }
      return () => { if (domNode) { domNode.style.display = 'flex' } }
    }
  }, [])

  const { data: newData, error } = useQuery(gql`${GetHomePageProperty}`, { variables: {}})

  let ghSanDiego, westin, plazaResort, saguaro, hiltonSf, hrMissionBay,
  avalon, ghVail, elRey, element, olive, andaz,
  seabird, leMerdien, paradisePoint, hiltonLongBeach, hrOrange, marina

  if (newData) {
    const sorted = [...newData.getHomepagePropertiesTwo].sort((a, b) => a.name.localeCompare(b.name))
    andaz = sorted[0];
    avalon = sorted[1];
    elRey = sorted[2];
    element = sorted[3];
    ghVail = sorted[4];
    hiltonLongBeach = sorted[5];
    hiltonSf = sorted[6];
    olive = sorted[7];
    hrMissionBay = sorted[8];
    hrOrange = sorted[9];
    leMerdien = sorted[10];
    ghSanDiego = sorted[11];
    marina = sorted[12];
    paradisePoint = sorted[13];
    plazaResort = sorted[14];
    saguaro = sorted[15];
    seabird = sorted[16];
    westin = sorted[17]
  }

  const [showLocations, setShowLocations] = useState(false)

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

     dispatch(
       saveSearch({
         city: locationIds[Math.floor(Math.random() * locationIds.length)],
         checkIn: new Date(randomCheckIn).toISOString(),
         checkOut: new Date(randomCheckOut).toISOString(),
         occupants: { adults: 2, children: 0, dogs: 1 },
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

  const fillSearchBar = () => {
    dispatch(
      saveSearch({
        city: '',
        checkIn: fewDaysLater,
        checkOut: endTripDate,
        occupants: { adults: 1, children: 0, dogs: 1 },
      })
    );
  }

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <Box className="shadow-rounded" sx={{ cursor: 'pointer', backgroundColor: 'white', position: 'absolute', left: "3px"}} onClick={() => onClick()} ><Box sx={{ display: 'flex', justifyContent: 'center', mt: '0.25em' }}><KeyboardArrowLeftIcon fontSize="large" /></Box></Box>
  };
  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <Box className="shadow-rounded" sx={{ cursor: 'pointer', backgroundColor: 'white', position: 'absolute', right: "3px"}} onClick={() => onClick()} ><Box sx={{ display: 'flex', justifyContent: 'center', mt: '0.25em' }}><KeyboardArrowRightIcon fontSize="large" /></Box></Box>
  };

  const locationLinks = [
    { to: "pet-friendly-hotels-los-angeles-california", name: 'Los Angeles' },
    { to: "pet-friendly-hotels-san-francisco-california", name: 'San Francisco' },
    { to: "pet-friendly-hotels-san-diego-california", name: 'San Diego' },
    { to: "pet-friendly-hotels-orange-county-california", name: 'Orange County' },
    { to: "pet-friendly-hotels-santa-barbara-california", name: 'Santa Barbara' },
    { to: "pet-friendly-hotels-palm-springs-california", name: 'Palm Springs' },
    { to: "pet-friendly-hotels-austin-texas", name: 'Austin' },
    { to: "pet-friendly-hotels-dallas-texas", name: 'Dallas' },
    { to: "pet-friendly-hotels-houston-texas", name: 'Houston' },
    { to: "pet-friendly-hotels-oceanside-california", name: 'Oceanside' },
    { to: "pet-friendly-hotels-phoenix-arizona", name: 'Phoenix' },
    { to: "pet-friendly-hotels-scottsdale-arizona", name: 'Scottsdale' },
    { to: "pet-friendly-hotels-tucson-arizona", name: 'Tucson' },
    { to: "pet-friendly-hotels-santa-fe-new-mexico", name: 'Santa Fe' },
    { to: "pet-friendly-hotels-san-antonio-texas", name: 'San Antonio' },
    { to: "pet-friendly-hotels-vail-colorado", name: 'Vail' },
    { to: "pet-friendly-hotels-colorado-springs-colorado", name: 'Colorado Springs' },
    { to: "pet-friendly-hotels-denver-colorado", name: 'Denver' },
    { to: "pet-friendly-hotels-seattle-washington", name: 'Seattle' },
    { to: "pet-friendly-hotels-portland-oregon", name: 'Portland' },
    { to: "pet-friendly-hotels-sacramento-california", name: 'Sacramento' },
    { to: "pet-friendly-hotels-salt-lake-city-utah", name: 'Salt Lake City' },
  ]
  locationLinks.sort((a, b) => a.name.localeCompare(b.name))


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
        <description>Romingo makes it easy for pet lovers to find pet-friendly hotels without costly fees. You and your pet will enjoy the best travel experience when you book with Romingo.</description>
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

      <Box sx={{ display: { sm: 'block', md: 'none'}, boxShadow: 2, "&:hover": { boxShadow: 3 } , textAlign: 'center', p: '2em', borderRadius: '20px', mx: '1rem', mt: '2rem', mb: '0.25rem'}}>
        <Box onClick={() => setShowLocations(!showLocations)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography sx={{ fontSize: '1.2em' }}>Explore destinations</Typography>
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

            {(hrMissionBay) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={5}
                  {...hrMissionBay}
                  city={{ name: 'San Diego, CA' }}
                  lowestTotalPriceAfterTax={219}
                  highlighted={false}
                />
              </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={5} /></Grid>
            } 
          </Box>
        </Box>

        <Box mt="1rem">
          <LeftPhotoBox
            imgSrc={SectionOneImage}
            imgAlt="pet-friendly travel"
            backgroundColor="#F3F0D2"
            header="Spring break on sale!"
            text=" Book pet-friendly hotels and hit the road with your pet in the passenger seat. Enjoy up to 20% off all hotels and pay $0 pet fees!"
            cta={<Button sx={{ width: '300px' }} onClick={handleImFlexibleClick} variant="contained">Book Now</Button>}
          />
        </Box>

        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: '4rem', mb: '2rem' }}>
          <Typography variant="h4" sx={{ mb: '1rem', ml: { xs: '0.9em', sm: '1em', lg: '0.6em' } }}>Feeling adventurous?</Typography>

          <Box sx={{ display: { xs: 'block', 'sm': 'block', md: 'block', lg: 'flex' }, mb: {xs : 0, sm: 0, md: '0.5rem'} }}>
            {(avalon) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={6}
                  {...avalon}
                  name="Avalon Hotel Palm Springs"
                  city={{ name: 'Palm Springs, CA' }}
                  lowestTotalPriceAfterTax={199}
                  highlighted={false}
                />
              </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={6} /></Grid>
            }  

            {(ghVail) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={7}
                  {...ghVail}
                  city={{ name: 'Vail, CO' }}
                  lowestTotalPriceAfterTax={219}
                  highlighted={false}
                />
              </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={7} /></Grid>
            }  

            {(elRey) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={8}
                  {...elRey}
                  city={{ name: 'Santa Fe, NM' }}
                  lowestTotalPriceAfterTax={109}
                  highlighted={false}
                />
              </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={8} /></Grid>
            } 
          </Box>
          <Box sx={{ display: { xs: 'block', 'sm': 'block', md: 'block', lg: 'flex' }, mb: '0.5rem' }}>
            {(element) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={9}
                  {...element}
                  name="Element Colorado Springs"
                  city={{ name: 'Colorado Springs, CO' }}
                  lowestTotalPriceAfterTax={149}
                  highlighted={false}
                />
              </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={9} /></Grid>
            } 

            {(olive) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={10}
                  {...olive}
                  city={{ name: 'Seattle, WA' }}
                  lowestTotalPriceAfterTax={169}
                  highlighted={false}
                />
              </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={10} /></Grid>
            } 
            {(andaz) ?
              <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
                <ListingCardSquare
                  key={11}
                  {...andaz}
                  city={{ name: 'Colorado Springs, CO' }}
                  lowestTotalPriceAfterTax={199}
                  highlighted={false}
                />
              </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={11} /></Grid>
            } 
          </Box>
        </Box>

        <Box mt="1rem">
          <RightPhotoBox
            imgSrc={SectionTwoImage}
            imgAlt="romingo rewards"
            backgroundColor="#A259D4"
            fontColor="white"
            header="Romingo Rewards 🐶"
            text="Enjoy unique pet-friendly amenities with Romingo. Pet beds, bowls, treats, and toys are free when visiting select hotels*."
            cta={<Button sx={{  width: '300px', backgroundColor: 'black' }} variant="contained" onClick={() => history.push('/create-account')}>Create an account</Button>}
            extraText="*visit each hotel profile to learn more"
          />
        </Box>

        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: '4rem', mb: '2rem' }}>
        <Typography variant="h4" sx={{ mb: '1rem', ml: { xs: '0.9em', sm: '1em', lg: '0.6em' } }}>Coastal retreats</Typography>
        <Box sx={{ display: { xs: 'block', 'sm': 'block', md: 'block', lg: 'flex' }, mb: {xs : 0, sm: 0, md: '0.5rem'} }}>
          {(seabird) ?
            <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
              <ListingCardSquare
                key={12}
                {...seabird}
                city={{ name: 'Oceanside, CA' }}
                lowestTotalPriceAfterTax={299}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={12} /></Grid>
          } 

          {(leMerdien) ?
            <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>
              <ListingCardSquare
                key={13}
                {...leMerdien}
                name="Le Meridien Delfina"
                city={{ name: 'Santa Monica, CA' }}
                lowestTotalPriceAfterTax={259}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={13} /></Grid>
          } 

          {(paradisePoint) ?
            <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>           
              <ListingCardSquare
                key={14}
                {...paradisePoint}
                city={{ name: 'San Diego, CA' }}
                lowestTotalPriceAfterTax={189}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={14} /></Grid>
          } 
        </Box>
        <Box sx={{ display: { xs: 'block', 'sm': 'block', md: 'block', lg: 'flex' }, mb: {xs : 0, sm: 0, md: '0.5rem'} }}>

          {(hiltonLongBeach) ?
            <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>            
              <ListingCardSquare
                key={15}
                {...hiltonLongBeach}
                city={{ name: 'Orange County, CA' }}
                lowestTotalPriceAfterTax={199}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={15} /></Grid>
          } 

          {(hrOrange) ?
            <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>           
              <ListingCardSquare
                key={16}
                {...hrOrange}
                name="Hyatt Regency OC"
                city={{ name: 'Orange County, CA' }}
                lowestTotalPriceAfterTax={189}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={16} /></Grid>
          } 
          {(marina) ?
            <Box sx={{ p: '1em', width: { xs: '90%', sm: '90%', md: '400px'} , mx: 'auto'}}>           
              <ListingCardSquare
                key={17}
                {...marina}
                city={{ name: 'Los Angeles, CA' }}
                lowestTotalPriceAfterTax={232}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={17} /></Grid>
          } 
        </Box>
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} backgroundColor="#A6DBE5" p="2rem" mt="2rem">
        <Box sx={{ 
          mx: 'auto', maxWidth: '760px', 
          overflow: 'auto', 
          my: '1rem', 
          pl: '2em',
          pt: '2em', 
          boxShadow: 2, 
          gap: '1rem',
          borderRadius: '20px',
          backgroundColor: 'white',
  
        }}>
          <Box>
            <Typography variant="h2" mb="0.5rem">Plan your next trip with Romingo</Typography>
            <Typography variant="p" fontSize="1.25rem">Explore our destinations</Typography>
          </Box>
          <hr />
          <Grid ml="auto" mt="1rem" mb="1rem" container spacing={2} sx={{ overflow: 'auto' }}>
          {locationLinks.map(link => 
            <Grid key={link.to} item xs={6}><Link key={link.to} to={link.to}><Typography variant="base">{link.name} pet-friendly hotels</Typography></Link></Grid>
          )}
          </Grid>
        </Box>
      </Box>

      <RightPhotoBox
        imgSrc={SectionThreeImage}
        imgAlt="sign up for romingo exclusive deals"
        backgroundColor="#009CA1"
        fontColor="white"
        header="Sign up for Romingo exclusive deals and pet-friendly tips"
        text="Enter your email address below:"
        cta={<SignUpEmail />}
      />


      <Slide direction='up' in={showLocations} mountOnEnter unmountOnExit>
        <Box sx={{ 
          position: 'fixed', 
          overflow: 'auto',
          bottom: '0', 
          height: '80%', 
          width: '100%', 
          backgroundColor: 'white',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px'
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', margin: '1rem', fontSize: '1.25rem'}}>
            <Button sx={{ ml: 'auto', float: 'right', border: '1px solid black' }} onClick={() => setShowLocations(false)}>X</Button>
            {locationLinks.map(link => 
              <Box sx={{ my: '0.5rem' }} key={link.to}> <Link key={link.to} to={link.to}>{link.name} hotels</Link></Box>
            )}
          </Box>
        </Box>
      </Slide>

  
      <Footer />
    </div>
  );
};

export default HomePage;
