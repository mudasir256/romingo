import React, { useState } from 'react';
import { FC } from "react";
import { CSSObject, IconButton } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "@mui/material/Link";

import LogoImg from '../../assets/images/logo.png';
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
      text: "Romingo score",
      link: "/romingo-score",
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
  const [email, setEmail] = useState('');
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
  }
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="footer-wrapper-logo-section">
          <img src={LogoImg} alt="Romingo Logo" />
          <div className="footer-wrapper-logo-section-text">
            Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling.
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
              <Link href="/about">Our story</Link>
            </div>
            <div>
              <Link href="/faq">FAQ</Link>
            </div>
            <div>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <Link href="/romingo-score">Romingo score</Link>
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
          <div className="sign-up">
            <div className="sign-up-header">
              Newsletter signup
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input value={email} onChange={(e) => handleEmailChange(e)} type="email" required placeholder='Enter email address' />
              <button type="submit">
                <PlayArrowOutlinedIcon />
              </button>
            </form>
            <div className="sign-up-footer">
              Sign up for our newsletter to receive exclusive offers
            </div>
          </div>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="footer-wrapper-year">
          © 2022 Romingo, Inc.
        </div>
        <div className="footer-wrapper-last-sections">
          <Link href="/">
            Privacy policy
          </Link>
          <Link href="/">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
