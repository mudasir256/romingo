import {Helmet} from "react-helmet";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import { FC, useEffect } from "react";
import { Container, Divider, Grid, Typography, Link } from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Message } from "@mui/icons-material";

import ScrollToTop from "../../components/ScrollToTop";
import { ChatBubble, Email, Send } from "@mui/icons-material";
import { useIntercom } from 'react-use-intercom';

const Contact: FC = () => {

  const { boot, shutdown, hide, show, update } = useIntercom();

  const startChat = () => {
    boot()
    update()
    show()
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://paperform.co/__embed.min.js";
    document.body.appendChild(script);
  }, []);

  return <>
    <Helmet>
      <title>Book pet friendly hotels - Romingo</title>
      <description>Romingo is the easiest way to book pet-friendly travel. Hand-selected hotels, responsive customer service, and our lowest rates guaranteed ensure that our guests enjoy a true pet-friendly experience. Roam the world freely with Romingo.</description>
      <meta property="og:title" content="Book pet friendly hotels - Romingo" />
      <meta property="og:description" content="Romingo is the easiest way to book pet-friendly travel. Hand-selected hotels, responsive customer service, and our lowest rates guaranteed ensure that our guests enjoy a true pet-friendly experience. Roam the world freely with Romingo." />
      <meta property="og:url" content="https://romingo.com/contact" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://romingo.com/static/media/logo.11150e63.png" />
      <meta property="og:site_name" content="Romingo" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>

    <ScrollToTop />
    <Navbar />

    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" color="text.primary" sx={{ mt: 2 }}>
          Contact Us
        </Typography>
      </Box>
      <Divider variant="middle" light sx={{ my: 2 }}>
        <Typography variant="body1" color="text.secondary">
          We&apos;re always here to help
        </Typography>
      </Divider>
      <>
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Our support team is here for all of your pet-friendly travel needs. Please get in touch with us using one of the below methods. If you require immediate assistance, we recommend using our chat feature, which is available Monday-Friday 9am-5pm PST.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              mt: 4,
              mb: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Link href="mailto:hello@romingo.com" target="_blank">
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  mb: ".5rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Email sx={{ mb: "1rem" }} />
                Email us
              </Typography>
            </Link>
            <Typography
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              hello@romingo.com
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ mt: 4, mb: 8, textAlign: "center" }}
          >
            <Link
              onClick={() =>
                window.scrollTo({ top: 500, left: 0, behavior: "smooth" })
              }
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  mb: ".5rem",
                  cursor: "pointer",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Send sx={{ mb: "1rem" }} />
                Contact us
              </Typography>
            </Link>
            <Typography
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              Please complete the form below
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ mt: 4, mb: 8 }}>
            <Link href="#" onClick={startChat}>
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  mb: ".5rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <ChatBubble sx={{ mb: ".5rem" }} />
                Start a Chat
              </Typography>
            </Link>
            <Typography
              variant="body1"
              sx={{ textAlign: "center" }}
            >
              During business hours
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div data-paperform-id="5rnusmd7"></div>
          </Grid>
          <Hidden lgDown>
            <Box
              component="img"
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/romingo_ball.jpeg"
              alt={"Romingo Tennis Ball"}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "350px",
                borderRadius: 5,
              }}
            />
          </Hidden>
        </Grid>
      </>
    </Container>
    
      <div
        id="CUSTOM"
        onClick={startChat}
        style={{
          padding: ".5rem 1rem .5rem .5rem",
          fontFamily: "Roboto",
          zIndex: 1501,
          position: "fixed",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          bottom: "1.25rem",
          right: "1.25rem",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
          background: "#03989Ebf",
          border: "1px solid #a6dbe5",
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          fontSize: "14px",
          color: "#fff",
        }}
      >
        <Message sx={{ fontSize: "18px", color: "#fff", mr: ".5rem" }} />
        Chat with us
      </div>
    
    <Footer />
  </>;
};

export default Contact;
