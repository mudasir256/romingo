import { FC, useState, useEffect } from "react";
import Navbar from "../Navbar";
import {
  Box,
  CSSObject,
} from "@mui/material";

import MobileFilterBar from '../MobileHomePageFilterBar'
import { LargeFilterBar } from '../LargeFilterBar'

import "./Header.scss";

import hero1 from '../../assets/public/hero/one.jpg'
import hero2 from '../../assets/public/hero/two.jpg'
import hero3 from '../../assets/public/hero/three.jpg'

interface Props {
  sx?: CSSObject;
}

const Header: FC<Props> = ({ sx }) => {

  const imagesDesktop = [
    {
      component: hero1, 
      placement: 'bottom -120px right 0px'
    },
    {
      component: hero2,
      placement: 'bottom -40px right 0px'
    },
    {
      component: hero3,
      placement: 'bottom -80px right 0px'
    }
  ];
  const imagesMobile = [
    {
      component: hero1, 
      placement: 'bottom -50px left -120px',
    },
    {
      component: hero2, 
      placement: 'bottom -50px left 50%'
    },
    {
      component: hero3,
      placement: 'bottom -50px left 50%'
    }
  ];

  const [mobileImage, setMobileImage] = useState({})
  const [desktopImage, setDesktopImage] = useState({})

  useEffect(() => {
    setMobileImage(imagesMobile[Math.floor(Math.random()*imagesMobile.length)])
    setDesktopImage(imagesDesktop[Math.floor(Math.random()*imagesDesktop.length)])
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "0px" },
        height: "100%",
        display: "flex",
        justifyContent: "start",
        flexDirection: 'column',
        top: 0,
        left: 0,
        ...sx,
      }}
      className="header-wrapper"
    >
      <Navbar />
      <Box
        className="filter-bar-wrapper"
        sx={{
          backgroundImage: { xs: `${mobileImage.extra ? mobileImage.extra : ''} url(${mobileImage.component})`, sm: `url(${mobileImage.component})`, md: `url(${desktopImage.component})` },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: { xs: mobileImage.placement, sm: mobileImage.placement, md: desktopImage.placement },
          backgroundSize: 'cover',
        }}
      >

        <Box sx={{ 
          ml: { xs: '1.75em', sm: '1.5em', md: '1.5em', lg: '0em' },
          mt: { xs: '6em', sm: '8em', md: '9em', lg: '9em' },  
          mb: { xs: '0em', sm: '0em', md: '0em', lg: '2em' },
        }}>
          
          <Box sx={{
            display: { xs: 'block', sm: 'block', md: 'none' }
          }}>
            <Box sx={{ textAlign: { xs: 'left', sm: 'left'} }} className="filter-bar-wrapper-title">
              <b>Book pet-friendly hotels</b>
            </Box>
            <div className="filter-bar-wrapper-desc">
              the hassle-free way to travel with your pets
            </div>
          </Box>
        </Box>

        <Box sx={{ 
          display: { xs: 'block', lg: 'none' },
          top: { sm: '30px' },
        }}>
          <MobileFilterBar />
        </Box>
        <Box sx={{ 
          display: { xs: 'none', lg: 'block' }
        }}>
          <LargeFilterBar showText={true} />
        </Box>
      </Box>
    </Box >
  );
};


export default Header;
