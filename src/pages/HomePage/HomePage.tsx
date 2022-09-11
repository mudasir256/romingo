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

import PetFriendlyImg from '../../assets/images/pet-friendly.png';
import PetFeesImg from '../../assets/images/pet-fees.png';
import AllPupsImg from '../../assets/images/all-pups.png';
import HotelImg from '../../assets/images/hotel.png';
import StarImg from '../../assets/images/star.svg';
import LogoImgWhite from '../../assets/images/logo-white.png';

import LowestRates from '../../assets/images/icon-01.png';
import ZeroPetFees from '../../assets/images/icon-02.png';
import AuthenticPet from '../../assets/images/icon-03.png';




import {
  GetHotelBySearch,
  GetHotelRackBySearch,
  GetHotelDetail
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

const hotels = [
  {
    review: '4.3',
    reviewCount: 210,
    title: 'Laurel Inn',
    desc: '444 Presidio Avenue, San Francisco, CA',
    location: 'Pacific Heights',
    price: '$250 - $400',
    unit: 'per night',
    url: '/hotel/the_laurel_inn',
    image: 'https://storage.googleapis.com/romingo-production-public/images/The%20Laurel%20Inn/Laurel%20Inn_Exterior_Facade%20CRPD1600x450.jpg'
  },
  {
    review: '4.6',
    reviewCount: 3375,
    title: 'Hotel Sofitel Los Angeles',
    desc: '8555 Beverly Blvd, Los Angeles, CA',
    location: 'Beverly Hills',
    price: '$300 - $400',
    unit: 'per night',
    url: '/hotel/sofitel_los_angeles_at_beverly_hills',
    image: 'https://storage.googleapis.com/romingo-production-public/images/Sofitel%20Los%20Angeles/d8edb87b.webp'
  },
  {
    review: '4.5',
    reviewCount: 570,
    title: 'Canopy By Hilton Dallas',
    desc: '2950 Cityplace West Blvd, Dallas, TX',
    location: 'Uptown',
    price: '$250 - $400',
    unit: 'per night',
    url: '/hotel/canopy_by_hilton_dallas_uptown',
    image: 'https://storage.googleapis.com/romingo-production-public/images/Canopy%20by%20Hilton%20Dallas%20Uptown/18-bluelogic3014cc04-1-.webp'
  },
  {
    review: '4.4',
    reviewCount: 2160,
    title: 'The Nines Portland',
    desc: '525 Sw Morrison, Portland, OR',
    location: 'Downtown',
    price: '$250 - $500',
    unit: 'per night',
    url: '/hotel/the_nines',
    image: 'https://storage.googleapis.com/romingo-production-public/images/The%20Nines/6fee32a5.webp'
  },
]
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

  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const losAngeles = cities.find((city: any) => city.name === 'Los Angeles, CA')
  const sanDiego = cities.find((city: any) => city.name === 'San Diego, CA')
  const sanFrancisco = cities.find((city: any) => city.name === 'San Francisco, CA')
  const dallas = cities.find((city: any) => city.name === 'Dallas, TX')

  //TODO: Add Hilton San Franscisco, Grand Hyatt San Diego, Mondrian Los Angeles, Saguaro Palm Springs
  // console.log(cities)

  //TODO: fix dynamic fetch
  // const { data, error } = useQuery(
  //   gql`${GetHotelDetail}`,
  //   {
  //      variables: {
  //       id: 'ba772c6c-7fae-492a-85c0-6232eff50852',
  //       checkIn: fewDaysLater.substring(0, 10),
  //       checkOut: endTripDate.substring(0, 10),
  //       adults: 1,
  //       children: 0,
  //       dogs: 1,
  //       alias: 'San-Francisco-Pet-Friendly-Hotels-Hilton-San-Francisco-Union-Square',
  //      }
  //   }
  // );


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

  return (
    <div className="homepage">
      <ScrollToTop />
      <Header />
      <Box sx={{  background: '#f4dac9', mx: 'auto', py: '0.5em', height: { md: 'auto', lg: '300px' } }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        mx: 'auto',
        maxWidth: '1240px',
        flexWrap: 'wrap',
      }}>
        <Box className="info-box">
          <div className="align-center">
            <img src={LowestRates} alt="lowest rates" />
          </div>
          <div className="info-box-title">Lowest Rates</div>
          <div className="info-box-desc">
            Our hotel partners provide a unique pet-friendly experience by warmly welcoming you and your pet.
          </div>
        </Box>
        <Box className="info-box">
          <div className="align-center">
            <img src={ZeroPetFees}  alt="no pet fees" />
          </div>
          <div className="info-box-title">$0 Pet Fees</div>
          <div className="info-box-desc">Romingo negotiates $0 hotel pet fees on your behalf, you will never pay a pet fee with Romingo!</div>
        </Box>
        <Box className="info-box" sx={{ mb: '1.5em'}} >
          <div className="align-center">
            <img src={AuthenticPet} alt="authentic pet" />
          </div>
          <div className="info-box-title">Authentic Pet</div>
          <div className="info-box-desc">
            Say goodbye to weight or breed restrictions. Romingo hotels allow all pet weights and breeds!
          </div>
        </Box>
        </Box>
      </Box>
      <Box className="hotels-wrapper" sx={{ paddingTop: '369px', background: 'white' }}>
        <div className="hotels-wrapper-header">
          Travel with Romingo
        </div>
        <Box className="hotels" sx={{ cursor: 'pointer' }}>
          {
            hotels.map((hotel, index) => (
              <div onClick={() => history.push(hotel.url)} className="hotel" key={index}>
                <div className="hotel-image-wrapper">
                  <img src={hotel.image || HotelImg} alt="hotel picture" />
                  <div className="hotel-review-wrapper">
                    <img src={StarImg} width="16px" height="14px" alt="star" />
                    <div className="hotel-review-wrapper-text">
                      {hotel.review} ({hotel.reviewCount})
                    </div>
                  </div>
                </div>
                <div className="hotel-text mb-sm">
                  <h2 className="hotel-name no-space space-letters mb-xs">{hotel.title}</h2>
                  <p className="hotel-desc no-space">{hotel.desc}</p>
                  <div className="flex-row">
                    <Link sx={{ fontSize: '1em' }} href={hotel.url}>{hotel.location}</Link>
                    <Typography sx={{ fontSize: '1.25em', fontFamily: 'overpass-light',  }} className="ml-auto mr-xs">
                      <span>{hotel.price}</span>
                      <span> / per night</span>
                    </Typography>
                  </div>
                </div>
              </div>
            ))
          }
        </Box>
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
