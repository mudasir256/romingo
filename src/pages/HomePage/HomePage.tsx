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
    review: '5.0',
    reviewCount: 18,
    title: 'Hotel Sofitel Los Angeles',
    desc: '8555 Beverly Blvd., Los Angeles, CA',
    location: 'Beverly Hills',
    price: '$305',
    unit: 'per night'
  },
  {
    review: '5.0',
    reviewCount: 18,
    title: 'Hotel Sofitel Los Angeles',
    desc: '8555 Beverly Blvd., Los Angeles, CA',
    location: 'Beverly Hills',
    price: '$305',
    unit: 'per night'
  },
  {
    review: '5.0',
    reviewCount: 18,
    title: 'Hotel Sofitel Los Angeles',
    desc: '8555 Beverly Blvd., Los Angeles, CA',
    location: 'Beverly Hills',
    price: '$305',
    unit: 'per night'
  },
  {
    review: '5.0',
    reviewCount: 18,
    title: 'Hotel Sofitel Los Angeles',
    desc: '8555 Beverly Blvd., Los Angeles, CA',
    location: 'Beverly Hills',
    price: '$305',
    unit: 'per night'
  }
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

    scrollTop >= 680
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
      <Box className="info-boxes">
        <Box className="info-boxes-container">
          <Box className="info-box">
            <img src={PetFriendlyImg} alt="" />
            <div className="info-box-title">
              Pet-friendly
            </div>
            <div className="info-box-desc">
              Our hotel partners provide a unique pet-friendly experience by warmly welcoming you and your pet
            </div>
          </Box>
          <Box className="info-box">
            <img src={PetFeesImg} width="234px" height="247px" alt="" />
            <div className="info-box-title">
              $0 pet fees
            </div>
            <div className="info-box-desc">
              Romingo negotiates $0 hotel pet fees on your behalf, you will never pay a pet fee with Romingo!
            </div>
          </Box>
          <Box className="info-box">
            <img src={AllPupsImg} width="238px" height="227px" alt="" />
            <div className="info-box-title">
              All pups welcome
            </div>
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
        <Box className="hotels">
          {
            hotels.map((hotel, index) => (
              <div className="hotel" key={index}>
                <div className="hotel-image-wrapper">
                  <img src={HotelImg} alt="" />
                  <div className="hotel-review-wrapper">
                    <img src={StarImg} width="16px" height="14px" alt="" />
                    <div className="hotel-review-wrapper-text">
                      {hotel.review} ({hotel.reviewCount})
                    </div>
                  </div>
                </div>
                <div className="hotel-name">
                  {hotel.title}
                </div>
                <div className="hotel-desc">
                  {hotel.desc}
                </div>
                <div className="hotel-bottom-info">
                  <div className="hotel-location">
                    {hotel.location}
                  </div>
                  <div className="hotel-price">
                    <div className="hotel-price-value">
                      {hotel.price}
                    </div>
                    <div className="hotel-price-unit">
                      /{hotel.unit}
                    </div>
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
            <h1 className="no-space sansita text-lg space-letters">Reserve now,</h1>
            <h1 className="no-space sansita text-lg space-letters mb-xs">pay later</h1>
            <h3 className="no-space mb-sm space-letters-sm">Plus, free cancellations!</h3>
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: "none",
                fontFamily: "sansita-light"
              }}
            >
              Book now
            </Button>

          </div>
        </div>
      </Box>
      <Hidden mdUp>
        <Box className="sticky-header">
          <FilterBar />
        </Box>
      </Hidden>
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
      <Footer />
    </div>
  );
};

export default HomePage;
