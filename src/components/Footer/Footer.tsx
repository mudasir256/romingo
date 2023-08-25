import React, { useState } from 'react';
import { FC } from "react";
import { CSSObject, IconButton, Box, Dialog, Typography } from "@mui/material";
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
}

const Footer: FC<Props> = ({ sx }) => {
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

  const SiteLinkSection = ({ header, links }) => (
    <Box>
      <Typography variant="h5">{header}</Typography>
      <Box display="flex" flexDirection="column">
        {links.map(link => {
          if (link.isBlank) {
            return <Link my="0.75rem" key={link.href} href={link.href} target="_blank">{link.text}</Link>
          }
          return <Link my="0.75rem" key={link.href} href={link.href}>{link.text}</Link>
        })}
      </Box>
    </Box>
  )

  return (
    <>
      {showEgg &&
        <Dialog onClose={handleClose} open={showEgg}>
          <img loading="lazy" src={Pup} />
        </Dialog>
      }
    <Box mt="4rem" mb="1.5rem">
    
        <Box sx={{ p: '2rem', gap: '2rem', display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, justifyContent: 'space-around', flexWrap: 'wrap'}}>
          <Box>
            <Link href="/"><img loading="lazy" width="220px" src={LogoImg} alt="Romingo Logo" /></Link>
            <Typography component="p" variant="base" maxWidth="400px" mt="0.5rem" mb="0.5rem">
              Romingo is the easiest way to book pet-friendly travel. Hand-selected hotels, responsive customer service, and the lowest rates guaranteed provide a truly pet-friendly experience. Roam the world freely with Romingo.
            </Typography>
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
          </Box>
          <SiteLinkSection header="Site map" links={[
            { href: "/about", text: 'About us'},
            { href: "/faq", text: 'FAQ'},
            { href: '/list-your-property', text: 'List your property'},
            { href: "/contact", text: 'Contact'},
            { href: "/romingo-partners", text: 'Community'},
          ]} />
          <SiteLinkSection header="Content & Blog" links={[
            { href: 'https://storage.googleapis.com/romingo-development-public/ebooks/Air%20Travel%20Guide.pdf', text: 'Guide to Air Travel With Your Dog'},
            { href: '/blog', text: 'Romingo Blog', isBlank: true },
            { href: '/blog?tag=12', text: 'Top travel tips', isBlank: true }
          ]} />

          <Box sx={{ marginTop: 0, paddingTop: 0, marginLeft: '1rem', display: 'flex', flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'column' }, justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
            <img width="140px" src={IATANLogo} alt="IATAN Logo" loading="lazy" />
            <img style={{ marginLeft: '-1rem'}} width="160px" src={BBBLogo} alt="BBB Logo" loading="lazy" />
          </Box>
        </Box>
      </Box>

    <Box sx={{ m: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <div onMouseLeave={() => clearTimeout(timer)} onMouseEnter={() => easterEgg()} className="footer-wrapper-year">© 2023 Romingo, Inc.</div>
      <Link style={{ marginLeft: '1em' }} href="/privacy">Privacy policy</Link>
      <Link style={{ marginLeft: '1em' }} href="/terms-of-use">Terms & Conditions</Link>
    </Box>
  </>);
};

export default Footer;
