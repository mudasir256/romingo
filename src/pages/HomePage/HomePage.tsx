import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  CSSObject,
  Container,
  Button,
  TextField,
  Typography,
  Hidden,
  Link,
  Grid,
} from "@mui/material";
import { Cancel, Star } from "@mui/icons-material";
import "react-alice-carousel/lib/alice-carousel.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import { saveSearch } from "../../store/searchReducer";
import nearby from "./cities";
import featured from "./featured";
import FilterBar from "../../components/FilterBar";
import { DesktopFilterBar } from "../Cities/DesktopFilterBar";
import ListingCardSquare from "../../components/MobileListingsCardHome";
import ListingCard from "../../components/ListingCard";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";

import PetFriendlyImg from '../../assets/images/pet-friendly.png';
import PetFeesImg from '../../assets/images/pet-fees.png';
import AllPupsImg from '../../assets/images/all-pups.png';
import HotelImg from '../../assets/images/hotel.png';
import StarImg from '../../assets/images/star.svg';
import LogoImgWhite from '../../assets/images/logo-white.png';

import LowestRates from '../../assets/images/icon-01.png';
import ZeroPetFees from '../../assets/images/icon-02.png';
import AuthenticPet from '../../assets/images/icon-03.png';
import BookNow from '../../assets/images/icon-04.png';

import { Carousel } from "react-responsive-carousel";

import {
  GetHotelBySearch,
  GetHotelRackBySearch,
  GetHotelDetail,
  GetPropertyDetails,
} from "../../constants/constants";
import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { randomDate } from "../../tools.js";

import "./Sticky.css";
import "./HomePage.scss";

interface Props {
  sx?: CSSObject;
  nearCities: {
    img: string;
    city: string;
    state: string;
    route: string;
  }[];
  featureHotels: {
    img: string;
    name: string;
    description: string;
    city: string;
    cityId: string;
    id: string;
  }[];
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


const HomePage: FC<Props> = ({
  nearCities = nearby,
  featureHotels = featured,
}) => {
  const history = useHistory();
  const search = useSelector((state: any) => state.searchReducer.search);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
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

  const { data: sanDiego } = useQuery(
    gql`${GetPropertyDetails}`,
    {
       variables: {
        alias: 'pet-friendly-hotels-san-diego-manchester-grand-hyatt-san-diego',
       }
    }
  );

  const { data: sanFrancisco } = useQuery(
    gql`${GetPropertyDetails}`,
    {
       variables: {
        alias: 'pet-friendly-hotels-san-francisco-hilton-san-francisco-union-square-san-francisco',
       }
    }
  );

  const { data: losAngeles } = useQuery(
    gql`${GetPropertyDetails}`,
    {
       variables: {
        alias: 'pet-friendly-hotels-los-angeles-mondrian-los-angeles',
       }
    }
  );

  const { data: losAngeles2 } = useQuery(
    gql`${GetPropertyDetails}`,
    {
       variables: {
        alias: 'pet-friendly-hotels-los-angeles-ace-hotel-downtown-los-angeles',
       }
    }
  );

  // Row 2

  const { data: marina } = useQuery(
    gql`${GetPropertyDetails}`,
    { variables: { alias: 'pet-friendly-hotels-los-angeles-marina-del-ray-hotel-los-angeles', } }
  );

  const { data: denver } = useQuery(
    gql`${GetPropertyDetails}`,
    { variables: { alias: 'pet-friendly-hotels-denver-sonesta-downtown-denver', } }
  );

  const { data: kimpton } = useQuery(
    gql`${GetPropertyDetails}`,
    { variables: { alias: 'pet-friendly-hotels-orange-county-kimpton-shorebreak-huntington-beach-resort-orange-county', } }
  );

  const { data: seattle } = useQuery(
    gql`${GetPropertyDetails}`,
    { variables: { alias: 'pet-friendly-hotels-seattle-pan-pacific-seattle', } }
  );

  const { data: monte } = useQuery(
    gql`${GetPropertyDetails}`,
    { variables: { alias: 'pet-friendly-hotels-santa-barbara-mar-monte-hotel-santa-barbara', } }
  );

  const { data: andre } = useQuery(
    gql`${GetPropertyDetails}`,
    { variables: { alias: 'pet-friendly-hotels-seattle-hotel-andra-seattle', } }
  );

  const { data: thompson } = useQuery(
    gql`${GetPropertyDetails}`,
    { variables: { alias: 'pet-friendly-hotels-seattle-thompson-seattle', } }
  ); 

  const { data: zags } = useQuery(
    gql`${GetPropertyDetails}`,
    { variables: { alias: 'pet-friendly-hotels-portland-the-hotel-zags-portland', } }
  );

  



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

  const toFeatured = (id: string, cityId: string) => {
    let city = search.city;
    let checkIn = search.checkIn;
    let checkOut = search.checkOut;
    let occupants = search.occupants;
    const today = new Date();
    if (!search.city) {
      city = cityId;
    }
    if (~checkIn) {
      checkIn = checkOut = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      ).toISOString();
      checkOut = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 9
      ).toISOString();
    }
    if (occupants.adults === 0) {
      occupants = { adults: 2, dogs: 1, children: 0 };
    }
    dispatch(
      saveSearch({
        city,
        checkIn,
        checkOut,
        occupants,
      })
    );
    history.push(`/details/${id}`);
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
        city: null,
        checkIn: fewDaysLater,
        checkOut: endTripDate,
        occupants: { adults: 1, children: 0, dogs: 1 },
      })
    );
  }

  const HotelSection = ({ title, children }) => (
    <Box sx={{
      maxWidth: '1300px',
      mx: 'auto',
      mb: { xs: 0, sm: '1em' },
      px: { xs: '0', sm: '1em', lg: '8em' },
      py: { xs: '1em', sm: '1em', lg: '1em' }  
    }}>
      <Typography sx={{fontFamily: 'sansita-light', fontSize: '2em', py: '0.5em', px: { xs: '0.9em', lg: '0.25em' } }}>{title}</Typography>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block'} }}>
        <Grid 
          onClick={() => fillSearchBar()} 
          container 
          sx={{ 
      
          }} 
          justifyContent="flex-start" 
          spacing={{ xs: 2, lg: 4}}
        >
            {children}
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'left', display: { sm: 'block', md: 'none', lg: 'none' }}}>
        <Carousel emulateTouch={true} centerMode={true} centerSlidePercentage={97} showIndicators={false} showArrows={false} showStatus={false}> 
          {children}
        </Carousel>
      </Box>
    </Box>
  )

  return (
    <div className="homepage">
      <ScrollToTop />
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
            Lowest rates        
          </Box>
          <Box className="info-box-desc" sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
            Book the lowest hotel rates at your favorite pet-friendly hotels, and save on fees with Romingo!
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
        <HotelSection title="Fan Favorites">
          {(sanFrancisco && sanFrancisco.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              ml: {xs : '1em', sm: 0},
              mr: {xs: '1em', sm: 0},

            }}>
              <ListingCardSquare
                key={0}
                {...sanFrancisco.getPropertyDetails}
                name={'Hilton San Francisco'}
                lowestTotalPriceAfterTax={143}
                highlighted={false}
              />
            </Grid>: <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={0} /></Grid>
          }  

          {(sanDiego && sanDiego.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              mr: {xs: '1em', sm: 0},

            }}>
              <ListingCardSquare
                key={1}
                {...sanDiego.getPropertyDetails}
                name={"Manchester Grand Hyatt"}
                lowestTotalPriceAfterTax={161}
                highlighted={false}
              />
            </Grid> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={1} /></Grid>
          } 


          {(losAngeles2 && losAngeles2.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              mr: {xs: '1em', sm: 0},
            }}>
              <ListingCardSquare
                key={2}
                {...losAngeles2.getPropertyDetails}
                lowestTotalPriceAfterTax={144}
                highlighted={false}
              />
            </Grid> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={2} /></Grid>
          }  
        </HotelSection>

        <HotelSection title="Surfs up">
          {(marina && marina.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              ml: {xs : '1em', sm: 0},
              mr: {xs: '0.75em', sm: 0},

            }}>
              <ListingCardSquare
                key={3}
                {...marina.getPropertyDetails}
                lowestTotalPriceAfterTax={232}
                highlighted={false}
              />
            </Grid> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={3} /></Grid>
          }  

          {(kimpton && kimpton.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              mr: {xs: '1em', sm: 0},

            }}>
              <ListingCardSquare
                key={4}
                {...kimpton.getPropertyDetails}
                name={'Kimpton Shorebreak Resort'}
                lowestTotalPriceAfterTax={219}
                highlighted={false}
              />
            </Grid> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={4} /></Grid>
          }  

          {(monte && monte.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              mr: {xs: '1em', sm: 0},
            }}>
              <ListingCardSquare
                key={5}
                {...monte.getPropertyDetails}
                lowestTotalPriceAfterTax={241}
                highlighted={false}
              />
            </Grid> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={5} /></Grid>
          } 

        </HotelSection>

        <HotelSection title="Sustainability trailblazers">
          {(andre && andre.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              ml: {xs : '1em', sm: 0},
              mr: {xs: '1em', sm: 0},

            }}>
              <ListingCardSquare
                key={6}
                {...andre.getPropertyDetails}
                lowestTotalPriceAfterTax={216}
                highlighted={false}
              />
            </Grid> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={6} /></Grid>
          } 

          {(thompson && thompson.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              mr: {xs: '1em', sm: 0},
            }}>
              <ListingCardSquare
                key={7}
                {...thompson.getPropertyDetails}
                lowestTotalPriceAfterTax={211}
                highlighted={false}
              />
            </Grid> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={7} /></Grid>
          } 

          {(zags && zags.getPropertyDetails) ?
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ 
              mr: {xs: '1em', sm: 0},
            }}>
              <ListingCardSquare
                key={8}
                {...zags.getPropertyDetails}
                lowestTotalPriceAfterTax={130}
                highlighted={false}
              />
            </Grid> : <Grid item xs={12} sm={12} md={6} lg={4}><ListingCardSkeleton key={8} /></Grid>
          } 
        </HotelSection>
      </Box>

      <Box className="homepage-dog">
        <div className="homepage-dog-wallpaper">
          <img className="homepage-logo" src={LogoImgWhite} alt="Romingo Logo" />
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
   {/*   <Box sx={{ display: { xs: 'block', sm: 'none'} }} className="sticky-header is-sticky">
        <FilterBar />
      </Box>*/}
  
      {/*
      <Hidden mdDown>
        <Box
          className="sticky-header"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: "700px",
              margin: 'auto'
            }}
          >
            <DesktopFilterBar />
          </Box>
        </Box>
      </Hidden>
      */}
      <Footer />
    </div>
  );
};

export default HomePage;
