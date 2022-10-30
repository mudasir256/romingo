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
} from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { saveSearch } from "../../store/searchReducer";
import ListingCardSquare from "../../components/MobileListingsCardHome";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

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



  const { data: newData, error } = useQuery(gql`${GetHomePageProperty}`, { variables: {}})

  let marina, losAngeles, kimpton, intercontinental, 
    missionBay, regency, sonesta, zags, sanDiego, line,
    sanFrancisco, andre, monte, thompson;

  if (newData) {
    marina = newData.getHomepageProperties[0];
    losAngeles = newData.getHomepageProperties[1];
    kimpton = newData.getHomepageProperties[2];
    intercontinental = newData.getHomepageProperties[3];
    missionBay = newData.getHomepageProperties[4];
    regency = newData.getHomepageProperties[5];
    sonesta = newData.getHomepageProperties[6];
    zags = newData.getHomepageProperties[7];
    sanDiego = newData.getHomepageProperties[8];
    line = newData.getHomepageProperties[9];
    sanFrancisco = newData.getHomepageProperties[10];
    andre = newData.getHomepageProperties[11];
    monte = newData.getHomepageProperties[12];
    thompson = newData.getHomepageProperties[13];
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


  const EndingSection = () => (
    <Box className="homepage-dog">
      <div className="homepage-dog-wallpaper">
        <img className="homepage-logo" src={LogoImgWhite} alt="Romingo Logo" loading="lazy"  />
        <div className="homepage-dog-text">
          <Typography sx={{
            fontFamily: 'sansita-bold',
            fontSize: '1.75em',
            color: 'white',
            letterSpacing: '0.5px',
            mb: '0em',
            lineHeight: '1.25em',
          }}>Reserve now, pay later</Typography>
          <h3 className="no-space mb-xs space-letters-sm">Plus, free cancellations!</h3>
          <Button
            onClick={handleImFlexibleClick}
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              fontFamily: "sansita-light",
              mb: '1.5em',
            }}

          >
            Book now
          </Button>
        </div>
      </div> 
    </Box>
  )

  return (
    <div className="homepage">      
      <Helmet>
        <title>Book pet friendly hotels - Romingo</title>
        <description>Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling.</description>
        <meta property="og:title" content="Romingo | Book pet friendly hotels" />
        <meta property="og:description" content="Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling." />
        <meta property="og:url" content="https://www.romingo.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta property="og:site_name" content="Romingo" />
        <meta name="twitter:title" content="Romingo | Book pet friendly hotels" />
        <meta name="twitter:description" content="Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling." />
        <meta name="twitter:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta name="twitter:card" content="summary_large_image" />

      </Helmet>

      <Header />
      <Box sx={{  background: '#f4dac9', mx: 'auto', py: '0.5em', height: { md: 'auto', lg: '240px' } }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        mx: 'auto',
        maxWidth: '1300px',
        flexWrap: 'wrap',
      }}>
        <Box className="info-box">
          <div className="align-center">
            <img className="book-now-image" src={BookNow} alt="lowest rates" />
          </div>
          <div className="info-box-title">Book your favorite hotels</div>
          <div className="info-box-desc">Explore hundreds of our pet-friendly hotel partners such as Hilton, Hyatt, IHG, and more.</div>
        </Box>
        <Box className="info-box">
          <div className="align-center">
            <img src={LowestRates}  alt="no pet fees" />
          </div>
          <Box className="info-box-title" sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'none'} }}>
            $0 pet fees
          </Box>
          <Box className="info-box-desc" sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'none'} }}>
            Book the lowest hotel rates at your favorite pet-friendly hotels, and save on pet fees with Romingo!
          </Box>
          <Box className="info-box-title" sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
            Insider rates        
          </Box>
          <Box className="info-box-desc" sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
            Book the best rates at your favorite pet-friendly hotels, and save on fees with Romingo!
          </Box>
        </Box>
        <Box className="info-box" sx={{ mb: '1.5em'}} >
          <div className="align-center">
            <img src={AuthenticPet} alt="authentic pet" />
          </div>
          <div className="info-box-title">Truly pet-friendly</div>
          <div className="info-box-desc">Our hotel partners provide a warm and welcoming travel experience for you and your pet.</div>
        </Box>
        </Box>
      </Box>

      

      <Box className="hotels-wrapper" sx={{ 
        marginTop: { sm: 0, md: 0, lg: 0 },
        marginBottom: { sm: 0, md: 0, lg: '369px' }, 
        pb: 0,
        background: 'white' 
      }}
      >

        <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: '2em' }}>
        <Typography sx={{fontFamily: 'sansita-light', fontSize: '2em', ml: { xs: '0.5em', sm: '1em', lg: '0.6em' } }}>Fan Favorites</Typography>
        <MultiCarousel responsive={{
            desktop: {
              breakpoint: { max: 4000, min: 900},
              items: 3,
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
          {(sanFrancisco) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={0}
                {...sanFrancisco}
                name={'Hilton San Francisco'}
                city={{ name: 'San Francisco, CA' }}
                lowestTotalPriceAfterTax={143}
                highlighted={false}
              />
            </Box>: <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={0} /></Grid>
          }  

          {(sanDiego) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={1}
                {...sanDiego}
                name={"Manchester Grand Hyatt"}
                city={{ name: 'San Diego, CA' }}
                lowestTotalPriceAfterTax={161}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={1} /></Grid>
          } 

          {(line) ?
            <Box sx={{ p: '1em'}}>            
              <ListingCardSquare
                key={14}
                {...line}
                city={{ name: 'Los Angeles, CA' }}
                lowestTotalPriceAfterTax={169}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={14} /></Grid>
          } 

          {(regency) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={2}
                {...regency}
                city={{ name: 'Orange County, CA' }}
                lowestTotalPriceAfterTax={199}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={2} /></Grid>
          }  


          {(losAngeles) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={3}
                {...losAngeles}
                city={{ name: 'Los Angeles, CA' }}
                lowestTotalPriceAfterTax={299}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={3} /></Grid>
          }  

          {(sonesta) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={4}
                {...sonesta}
                city={{ name: 'Denver, CO' }}
                lowestTotalPriceAfterTax={125}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={4} /></Grid>
          }  
        </MultiCarousel>
        </Box>

        <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: '2em' }}>
        <Typography sx={{fontFamily: 'sansita-light', fontSize: '2em', ml: { xs: '0.5em', sm: '1em', lg: '0.6em' } }}>Surfs up</Typography>
        <MultiCarousel responsive={{
            desktop: {
              breakpoint: { max: 4000, min: 900},
              items: 3,
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
          {(marina) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={5}
                {...marina}
                city={{ name: 'Los Angeles, CA' }}
                lowestTotalPriceAfterTax={232}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={5} /></Grid>
          }  

          {(kimpton) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={6}
                {...kimpton}
                name={'Kimpton Shorebreak Resort'}
                city={{ name: 'Orange County, CA' }}
                lowestTotalPriceAfterTax={219}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={6} /></Grid>
          }  

          {(monte) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={7}
                {...monte}
                city={{ name: 'Santa Barbara, CA' }}
                lowestTotalPriceAfterTax={241}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={7} /></Grid>
          } 
          {(missionBay) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={8}
                {...missionBay}
                city={{ name: 'San Diego, CA' }}
                lowestTotalPriceAfterTax={219}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={8} /></Grid>
          } 
          {(intercontinental) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={9}
                {...intercontinental}
                city={{ name: 'San Francisco, CA' }}
                lowestTotalPriceAfterTax={269}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={9} /></Grid>
          } 

        </MultiCarousel>
        </Box>


        <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: '2em' }}>
        <Typography sx={{fontFamily: 'sansita-light', fontSize: '2em', ml: { xs: '0.5em', sm: '1em', lg: '0.6em' } }}>Sustainability trailblazers</Typography>
        <MultiCarousel responsive={{
            desktop: {
              breakpoint: { max: 4000, min: 900},
              items: 3,
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
          {(andre) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={10}
                {...andre}
                city={{ name: 'Seattle, WA' }}
                lowestTotalPriceAfterTax={216}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={10} /></Grid>
          } 

          {(thompson) ?
            <Box sx={{ p: '1em'}}>
              <ListingCardSquare
                key={11}
                {...thompson}
                city={{ name: 'Seattle, WA' }}
                lowestTotalPriceAfterTax={211}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={11} /></Grid>
          } 

          {(zags) ?
            <Box sx={{ p: '1em'}}>            
              <ListingCardSquare
                key={12}
                {...zags}
                city={{ name: 'Portland, OR' }}
                lowestTotalPriceAfterTax={130}
                highlighted={false}
              />
            </Box> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={12} /></Grid>
          } 
          
        </MultiCarousel>
        </Box>
      </Box>

      <EndingSection />

      <Box sx={{ textAlign: 'center', p: '2em', border: '1px solid black', m: '2em'}}>
        <Box onClick={() => setShowLocations(!showLocations)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography sx={{ fontSize: '1.2em' }}>Browse locations</Typography>
          <KeyboardArrowDownIcon color="primary" />
        </Box>

        {showLocations && (<Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <Link to="los-angeles">Los Angeles</Link>
          <Link to="san-francisco">San Francisco</Link>
          <Link to="san-diego">San Diego</Link>
          <Link to="orange-county">Orange County</Link>
          <Link to="santa-barbara">Santa Barbara</Link>
          <Link to="palm-springs">Palm Springs</Link>
        </Box>)}
      </Box>
  

      <Footer />
    </div>
  );
};

export default HomePage;
