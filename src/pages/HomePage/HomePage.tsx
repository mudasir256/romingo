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
    review: 5,
    reviewCount: 18,
    title: 'Hotel Sofitel Los Angeles',
    desc: '8555 Beverly Blvd., Los Angeles, CA',
    location: 'Beverly Hills',
    price: '$305',
    unit: 'per night'
  },
  {
    review: 5,
    reviewCount: 18,
    title: 'Hotel Sofitel Los Angeles',
    desc: '8555 Beverly Blvd., Los Angeles, CA',
    location: 'Beverly Hills',
    price: '$305',
    unit: 'per night'
  },
  {
    review: 5,
    reviewCount: 18,
    title: 'Hotel Sofitel Los Angeles',
    desc: '8555 Beverly Blvd., Los Angeles, CA',
    location: 'Beverly Hills',
    price: '$305',
    unit: 'per night'
  },
  {
    review: 5,
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
    scrollTop >= 170
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
      <Box sx={{ width: '100%', height: '461px', background: '#F4DAC9', position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', position: 'absolute', bottom: '-261.5px', left: '50%', transform: 'translateX(-50%)' }}>
          <Box sx={{ width: '536px', height: '523px', boxShadow: '21px 7px 63px #0000000D', borderRadius: '15px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <img src={PetFriendlyImg} width="196.2px" height="237.2px" alt="" />
            <div style={{ fontFamily: 'sansita-light', marginTop: '5px', marginBottom: '16px', fontSize: '45px', lineHeight: '54px' }}>
              Pet-friendly
            </div>
            <div style={{ fontFamily: 'overpass-light', fontSize: '22px', lineHeight: '28px', textAlign: 'center' }}>
              Our hotel partners provide a unique pet-friendly experience by warmly welcoming you and your pet
            </div>
          </Box>
          <Box sx={{ width: '536px', height: '523px', boxShadow: '21px 7px 63px #0000000D', borderRadius: '15px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: '16px', marginRight: '16px' }}>
            <img src={PetFeesImg} width="234px" height="247px" alt="" />
            <div style={{ fontFamily: 'sansita-light', marginTop: '5px', marginBottom: '16px', fontSize: '45px', lineHeight: '54px' }}>
              $0 pet fees
            </div>
            <div style={{ fontFamily: 'overpass-light', fontSize: '22px', lineHeight: '28px', textAlign: 'center' }}>
              Romingo negotiates $0 hotel pet fees on your behalf, you will never pay a pet fee with Romingo!
            </div>
          </Box>
          <Box sx={{ width: '536px', height: '523px', boxShadow: '21px 7px 63px #0000000D', borderRadius: '15px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <img src={AllPupsImg} width="238px" height="227px" alt="" />
            <div style={{ fontFamily: 'sansita-light', marginTop: '5px', marginBottom: '16px', fontSize: '45px', lineHeight: '54px' }}>
              All pups welcome
            </div>
            <div style={{ fontFamily: 'overpass-light', fontSize: '22px', lineHeight: '28px', textAlign: 'center' }}>
              Say goodbye to weight or breed restrictions. Romingo hotels allow all pet weights and breeds!
            </div>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingTop: '369px', background: 'white' }}>
        <div style={{ fontFamily: 'sansita-light', fontSize: '55px', lineHeight: '66px', textAlign: 'center', marginBottom: '34px' }}>
          Travel with Romingo
        </div>
        <Box className="hotels">
          {
            hotels.map((hotel, index) => (
              <div className="hotel" key={index}>
                <div className="hotel-image-wrapper">
                  <img src={HotelImg} width="398px" height="398px" alt="" />
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
        <div className="homepage-dog-wallpaper"></div>
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
