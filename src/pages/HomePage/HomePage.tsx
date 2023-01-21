import {Helmet} from "react-helmet";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
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

import SectionOneImage from '../../assets/images/home-hero.jpg';
import SectionTwoImage from '../../assets/images/home-hero-3.jpg';
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

 
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    { to: "los-angeles", name: 'Los Angeles' },
    { to: "san-francisco", name: 'San Francisco' },
    { to: "san-diego", name: 'San Diego' },
    { to: "orange-county", name: 'Orange County' },
    { to: "santa-barbara", name: 'Santa Barbara' },
    { to: "palm-springs", name: 'Palm Springs' },
    { to: "austin", name: 'Austin' },
    { to: "dallas", name: 'Dallas' },
    { to: "houston", name: 'Houston' },
    { to: "oceanside", name: 'Oceanside' },
    { to: "phoenix", name: 'Phoenix' },
    { to: "scottsdale", name: 'Scottsdale' },
    { to: "tucson", name: 'Tucson' },
    { to: "santa-fe", name: 'Santa Fe' },
    { to: "san-antonio", name: 'San Antonio' },
    { to: "vail", name: 'Vail' },
    { to: "colorado-springs", name: 'Colorado Springs' },
    { to: "denver", name: 'Denver' },
    { to: "seattle", name: 'Seattle' },
    { to: "portland", name: 'Portland' },
    { to: "sacramento", name: 'Sacramento' },
    { to: "salt-lake-city", name: 'Salt Lake City' },
  ]
  locationLinks.sort((a, b) => a.name.localeCompare(b.name))

  const handleEmailSubmit = () => {
		setIsSuccess(false)
		const result = subscribeToNewsletter(email)
		setIsSuccess(result.success)
  }

  const InfoBox = ({ imgSrc, imgAlt, imgWidth, header, text }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '300px', mt: '2rem', p: '1.5rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '21px 7px 63px #0000000d' }}>
      <img style={{ width: imgWidth, textAlign: 'center'}} src={imgSrc} alt={imgAlt} />
      <Box textAlign="center">
        <Typography variant="h5" pt="1rem" pb="0.5rem">{header}</Typography>
        <Typography component="p" variant="base">{text}</Typography>
      </Box>
    </Box>
  )

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
            text="Romingo has searched through thousands of pet-friendly hotels, and we have hand-selected the best for you to easily book right here." 
          />
          <InfoBox
            imgSrc={LowestRates}
            imgAlt="lowest rates"
            imgWidth="83%"
            header="Best rates + $0 pet fees"
            text="Other booking sites will charge hidden pet fees, but when you book with Romingo you receive the lowest rates, and your pets will always stay for $0."
          />
          <InfoBox
            imgSrc={AuthenticPet}
            imgAlt="trusted and accredited"
            imgWidth='85%'
            header="Trusted and accredited"
            text="You and your pets will receive VIP service at our pet-friendly partner hotels. Romingo is accredited and trusted for you to book pet-friendly hotels."
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
{/*          <MultiCarousel responsive={{
              desktop: {
                breakpoint: { max: 4000, min: 900},
                items: 0,
              },
              mobile: {
                breakpoint: { max: 900, min: 1},
                items: 1,
              }
            }}
            partialVisible={false}
            infinite={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
          </MultiCarousel>*/}

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


        <Box sx={{ width: '100%', backgroundColor: '#F4DAC9', display: { xs: 'block', sm: 'block', md: 'flex' }, justifyContent: 'center', alignItems: 'flex-start', mt: '1rem'}}> 
          <Box 
            component="img" 
            sx={{ 
              marginLeft: 'auto', 
              maxWidth: '100%',
              display: { xs: 'block', sm: 'block', md: 'none'}
            }} 
            src={SectionOneImage} 
            alt="pet-friendly travel"
          />
          <Box sx={{ p: { xs: '1.0rem', sm: '1.0rem', md: 0 },  maxWidth: { xs: 'auto', sm: 'auto', md: '480px' } , mx: 'auto', my: 'auto'}}>
            <Typography variant="h2" sx={{ textAlign: { xs: 'left', sm: 'left', md: 'left' }, mt: { xs: '1rem', sm: '1rem', md: 0 },  mb: '1.5rem'}}>Travel the world with your pup by your side</Typography>
            <Typography variant="p" sx={{ fontSize: '1.25rem', mb: '1.5rem'}}>Romingo is the future of pet-friendly travel. It’s never been easier to travel with your pup!</Typography>
            <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' }, mt: '1rem', mb: '1.5rem' }}>
              <Button sx={{ width: '300px' }} onClick={handleImFlexibleClick} variant="contained">Book Now</Button>
            </Box>
          </Box>
          <Box 
            component="img" 
            sx={{ 
              marginLeft: 'auto', 
              maxWidth: { xs: '100%', sm: '100%', md: '500px', lg: '800px', xl: '800px' },
              display: { xs: 'none', sm: 'none', md: 'block'}
            }} 
            src={SectionOneImage} 
            alt="pet-friendly travel"
          />
        </Box>

        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: '4rem', mb: '2rem' }}>
          <Typography variant="h4" sx={{ mb: '1rem', ml: { xs: '0.5em', sm: '1em', lg: '0.6em' } }}>Feeling adventurous?</Typography>

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

        <Box sx={{ position: 'relative', backgroundColor: '#A6DBE5', display: { sm: 'block', md: 'flex' }, alignItems: 'flex-start', mt: '1rem' }}> 
          <Box 
            component="img" 
            sx={{ 
              maxWidth: { xs: '100%', sm: '100%', md: '500px', lg: '800px', xl: '800px' }
            }} 
            src={SectionTwoImage} 
            alt="feeling adventurous?"
          />
          <Box sx={{ p: { xs: '1.6rem', sm: '1.6rem', md: 0}, maxWidth: '500px', mx:'auto', my: 'auto'}}>
            <Typography variant="h2" sx={{ textAlign: { xs: 'left', sm: 'left', md: 'left' }, mb: '1.5rem'}}>Experience true <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block'} }} /> pet-friendliness</Typography>
            <Typography variant="p" sx={{ mb: '1.5rem'}}>Enjoy unique pet-friendly inclusions when you book with Romingo. Pet beds, bowls, treats, and toys are provided free when you visit select hotels*.</Typography>
            <Box sx={{ mt: '1.5rem', textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
              <Button sx={{  width: '300px' }} variant="contained" onClick={() => history.push('/create-account')}>Create an account</Button>
						</Box>
            <br />
						<br />
						<Typography variant="p">*visit each hotel profile to learn more</Typography>
          </Box>
        </Box>


        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: '4rem', mb: '2rem' }}>
        <Typography variant="h4" sx={{ mb: '1rem', ml: { xs: '0.5em', sm: '1em', lg: '0.6em' } }}>Coastal retreats</Typography>
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

      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} backgroundColor="#F4DAC9" p="2rem" mt="2rem">
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
            <Typography variant="h3" mb="0.5rem">Plan your next trip with Romingo</Typography>
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

      <Box sx={{ backgroundColor: '#A6DBE5', display: { sm: 'block', md: 'flex' }, alignItems: 'flex-start' }}> 
        <Box 
          component="img" 
          sx={{ 
            marginLeft: 'auto', 
            maxWidth: '100%',
            display: { xs: 'block', sm: 'block', md: 'none'}
          }} 
          src={SectionThreeImage} 
          alt="pet-friendly travel"
        />
        <Box sx={{ p: { xs: '1.5rem', sm: '1.5rem', md: 0}, maxWidth: '580px', mx: 'auto', my: 'auto'}}>
          <Typography variant="h2" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' }, mb: { xs: '1rem', sm: '1rem', md: '2rem' } }}>Sign up for Romingo exclusive deals and pet-friendly tips</Typography>
          <Typography component="p" variant="p" sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>Enter your email address below:</Typography>
          <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
          <form style={{ marginTop: '1.25rem'}} onSubmit={(e) => {
            e.preventDefault();
            subscribeToNewsletter(email);
          }}>
            <TextField  
              sx={{ width: '300px' }} 
              variant="standard" 
              value={email} 
              onChange={(e) => setEmail(e.target?.value)} 
              type="email" 
              required 
              placeholder='Email address' 
              InputProps={{ endAdornment: 
								isSuccess ? <Box sx={{ backgroundColor: 'white', width: '24px', height: '24px', borderRadius: '100%', cursor: 'pointer'}}><CheckIcon /></Box>
									: <Box onClick={() => handleEmailSubmit()} sx={{ backgroundColor: 'white', width: '24px', height: '24px', borderRadius: '100%', cursor: 'pointer'}}><PlayArrowOutlinedIcon /></Box>
              }}
            />
          </form>
          </Box>
        </Box>
        <Box 
          component="img" 
          sx={{ 
            ml: 'auto',
            display: { xs: 'none', sm: 'none', md: 'block'},
            maxWidth: { xs: '100%', sm: '100%', md: '500px', lg: '700px', xl: '700px' }
          }} 
          src={SectionThreeImage} 
          alt="sign up for exclusive deals"
        />
      </Box>


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
