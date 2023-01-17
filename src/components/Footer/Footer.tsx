import React, { useState } from 'react';
import { FC } from "react";
import { CSSObject, IconButton, Box, Dialog } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "@mui/material/Link";

import IATANLogo from '../../assets/images/IATANLogo.webp';
import BBBLogo from '../../assets/images/BBBLogo.png';

import LogoImg from '../../assets/images/logo.png';
import Pup from '../../assets/images/pup.png';
import "./Footer.scss";

interface Props {
  sx?: CSSObject;
  footerMenus?: {
    reservation: {
      text: string;
      link: string;
      target: string;
    }[];
    about: {
      text: string;
      link: string;
      target: string;
    }[];
    contact: {
      text: string;
      link: string;
      target: string;
    }[];
    blog: {
      text: string;
      link: string;
      target: string;
    }[];
    sitemap: {
      text: string;
      link: string;
      target: string;
    }[];
  };
}

const FooterMenus = {
  reservation: [
    {
      text: "Manage reservation",
      link: "/reservation/manage",
      target: "",
    },
  ],
  about: [
    {
      text: "Our story",
      link: "/about",
      target: "",
    },
    {
      text: "FAQ",
      link: "/faq",
      target: "",
    },
    {
      text: "RedRover partnership",
      link: "/romingo-partners",
      target: "",
    },
  ],
  contact: [
    {
      text: "Support",
      link: "/contact",
      target: "",
    },
    {
      text: "Facebook",
      link: "https://www.facebook.com/RomingoTravel",
      target: "_blank",
    },
    {
      text: "Instagram",
      link: "https://www.instagram.com/romingotravel/",
      target: "_blank",
    },
  ],
  blog: [
    {
      text: "Romingo Blog",
      link: "/blog",
      target: "_blank",
    },
    {
      text: "Top Travel Tips",
      link: "/blog/12",
      target: "_blank",
    },
  ],
  sitemap: [],
};

const Footer: FC<Props> = ({ sx, footerMenus = FooterMenus }) => {
  const [showEgg, setShowEgg] = useState(false);
  const [timer, setTimer] = useState(null);

  const easterEgg = () => {
    if (timer) {
      clearTimeout(timer)
    }
    const newTimer = setTimeout(() => {
      setShowEgg(true)
    }, 4000)
    setTimer(newTimer)
  }

  const handleClose = () => {
    setShowEgg(false)
  }

  return (
    <>
      {showEgg &&
        <Dialog onClose={handleClose} open={showEgg}>
          <img loading="lazy" src={Pup} />
        </Dialog>
      }
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-wrapper-logo-section">
          <Link href="/">
           <img loading="lazy" src={LogoImg} alt="Romingo Logo" />
          </Link>
          <div className="footer-wrapper-logo-section-text">
            Romingo makes it easy for pet lovers to find pet-friendly hotels without costly fees. You and your pet will enjoy the best travel experience when you book with Romingo.
          </div>
          <div className="social-icons">
            <IconButton
              edge="start"
              sx={{ mr: 1, color: "black" }}
              aria-label="menu"
              href="https://www.facebook.com/RomingoTravel/"
              target="_blank"
            >
              <FacebookRoundedIcon />
            </IconButton>
            <IconButton
              edge="start"
              sx={{ mr: 1, color: "black" }}
              aria-label="menu"
              href="https://www.instagram.com/romingotravel/"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          </div>
        </div>
        <div className="link-section">
          <div className="site-map-section">
            <div className="site-map-section-header">
              Site map
            </div>
            <div>
              <Link href="/about">About us</Link>
            </div>
            <div>
              <Link href="/faq">FAQ</Link>
            </div>
            <div>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <Link href="/romingo-partners">RedRover partnership</Link>
            </div>
          </div>
          <div className="site-map-section">
            <div className="site-map-section-header">
              Content & Blog
            </div>
            <div>
              <Link href="https://storage.googleapis.com/romingo-development-public/ebooks/Air%20Travel%20Guide.pdf"
                target="_blank">Guide to Air Travel With Your Dog</Link>
            </div>
            <div>
              <Link href="/blog" target="_blank">Romingo Blog</Link>
            </div>
            <div>
              <Link href="/blog/12" target="_blank">Top travel tips</Link>
            </div>
          </div>
          <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <img width="200px" src={IATANLogo} alt="IATAN Logo" />
            <img width="220px" src={BBBLogo} alt="BBB Logo" />
          </div>
        </div>
      </div>
      <div className="footer-wrapper">
        <Box sx={{ ml: '1.5em', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div onMouseLeave={() => clearTimeout(timer)} onMouseEnter={() => easterEgg()} className="footer-wrapper-year">© 2022 Romingo, Inc.</div>
          <Link style={{ marginLeft: '1em' }} href="/privacy">Privacy policy</Link>
          <Link style={{ marginLeft: '1em' }} href="/terms-of-use">Terms & Conditions</Link>
        </Box>
      </div>
    </div>
    </>
  );
};

export default Footer;
