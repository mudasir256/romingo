import { FC, useState, useEffect } from "react";
import Navbar from "../Navbar";
import {
  Box,
  CSSObject,
} from "@mui/material";

import Image3 from '../../assets/images/pet-friendly-travel-french-bulldog.jpeg'
import Image4 from '../../assets/images/pet-friendly-travel-golden-retriever-2.jpeg'
import Image7 from '../../assets/images/pet-friendly-travel-jack-russell.jpeg'
import Image9 from '../../assets/images/pet-friendly-travel-jack-russell-fall.jpeg'
import Image10 from '../../assets/images/pet-friendly-travel-golden-doodle.jpeg'

import MobileFilterBar from '../MobileHomePageFilterBar'
import { LargeFilterBar } from '../LargeFilterBar'

import "./Header.scss";

interface Props {
  sx?: CSSObject;
}

const Header: FC<Props> = ({ sx }) => {

  const imagesDesktop = [
    {
      component: '/hero/five.jpeg',
      placement: 'bottom 0px left 0px'
    },
    {
      component: '/hero/two.jpeg', 
      placement: 'bottom -200px left 0px'
    },
    {
      component: '/hero/one.jpeg', 
      placement: 'bottom -120px right 0px'
    }
  ];

  const imagesMobile = [
    {
      component:  '/hero/three.jpeg', 
      placement: 'bottom -50px right 0px',
      extra: 'linear-gradient(160deg, #000000 -100%, #29292900 55%, #000000 300%),'
    },
    {
      component: '/hero/one.jpeg', 
      placement: 'bottom -50px left -120px'
    },
    {
      component: '/hero/four.jpeg',
      placement: 'bottom -50px right -0px'
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

    {/* `linear-gradient(178deg, #000000 30%, #29292900 70%, #000000 130%) */}
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
            <Box component="h1" sx={{ textAlign: { xs: 'left', sm: 'left'} }} className="filter-bar-wrapper-title">
              Book pet-friendly hotels
            </Box>
            <div className="filter-bar-wrapper-desc">
              Lowest rates. $0 pet fees.
            </div>
          </Box>
        </Box>

        <Box sx={{ 
          display: { xs: 'block', sm: 'block', md: 'none' },
          top: { sm: '30px' },
        }}>
          <MobileFilterBar />
        </Box>
        <Box sx={{ 
          display: { xs: 'none', sm: 'none', md: 'block' }
        }}>
          <LargeFilterBar showText={true} />
        </Box>
      </Box>
    </Box >
  );
};


export default Header;
