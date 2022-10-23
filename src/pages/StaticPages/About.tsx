import {Helmet} from "react-helmet";
import Box from "@mui/material/Box";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";

const About: FC = () => {
  return (
    <>
      <Helmet>
        <title>Book pet friendly hotels - Romingo</title>
        <description>Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling.</description>
        <meta property="og:title" content="Book pet friendly hotels - Romingo" />
        <meta property="og:description" content="Romingo is revolutionizing travel by encouraging dog owners everywhere to never leave their dog home alone again while traveling." />
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
            Our Story
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            The Romingo Story
          </Typography>
        </Divider>
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
              color="text.secondary"
              sx={{ textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }}
            >
              As a California native, there is nothing as relaxing and
              refreshing as driving up and down the California Coastline. Travel
              has always been one of my life&apos;s greatest joys, and during a
              prolonged global pandemic, weekend and car travel escapes with my
              partner, Jonathan, became a welcomed new outlet. Being near the
              ocean and feeling that fresh, crisp air recharges and inspires us.
              But I’ve always struggled leaving my French Bulldog, Maddie, at
              home when I travel.
            </Typography>
            <Box
              sx={{
                backgroundColor: "#efefef",
                px: 4,
                py: 2,
                mt: 2,
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                &quot;I love traveling with our Maddie, but finding pet-friendly
                hotels has always been a challenge&quot;
              </Typography>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item xs={6} md={6}>
                <Box
                  component="img"
                  src="https://storage.googleapis.com/romingo-development-public/images/front-end/maddie8.jpeg"
                  alt={"Maddie, Beach Bulldog"}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: 5,
                  }}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <Box
                  component="img"
                  src="https://storage.googleapis.com/romingo-development-public/images/front-end/jonathan_zach_maddie.jpeg"
                  alt={"Zach, Jonathan, and Maddie"}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: 5,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="text.secondary">
              Travelling with dogs shouldn&apos;t be this difficult!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }}
            >
              One thing has always stood in our way when planning those restful
              getaways; finding places that will allow Maddie. I spent countless
              hours searching for travel solutions to support pet-friendly
              hotels that would not charge expensive pet fees, and they simply
              do not exist. When it comes to hotels, there has never been a
              “one-stop-shop” that allows travelers to book hotels that provide
              a warm, welcoming experience when traveling with dogs.
            </Typography>
            <Box
              sx={{
                backgroundColor: "#efefef",
                px: 4,
                py: 2,
                my: 2,
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  lineHeight: 2,
                }}
              >
                &quot;So, we started asking ourselves: What does pet-friendly
                travel mean?&quot;
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }}
            >
              Most hotels have weight and/or breed restrictions, or they charge
              expensive pet fees. Many do not even provide dog beds and bowls! I
              always thought pet-friendly meant not paying expensive pet fees,
              allowing any and all dogs, plus providing customer service that
              made me feel welcomed with my pup.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="text.secondary">
              Hospitality is in Romingo&apos;s DNA
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }}
            >
              I have spent a long career in the hospitality industry, working
              for, and with, small and large hotels for nearly two decades. I
              have always enjoyed meeting and interacting with travelers,
              hearing their stories, their passions, and their struggles. And I
              found that many shared the same struggles that I found when
              travelling with dogs.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="text.secondary">
              Why not build it?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }}
            >
              So I set out to change the reality of travelling with dogs, for
              myself and for dog owners across the world. We reached out to pet
              owners and hotels, received an immediate and overwhelming
              response, and decided to get to work. We built the hotel booking
              platform that we always wanted. Romingo partners with dozens of
              hand-selected, beautiful, and pet forward hotels that allow you to
              finally roam free and rest easy with your pup. And by partnering
              with Romingo, hotels agree to provide truly pet-friendly
              accomodations to our users. Your Romingo reservation will always
              include:
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textAlign: "left" }}
              >
                <ul>
                  <li>Competitive guestroom rates</li>
                  <li>Waived non-refundable pet fees</li>
                  <li>Bring up to (2) dogs weighing 75 lbs. each</li>
                  <li>Dog beds, bowls, and treats included</li>
                </ul>
              </Typography>
              Team Romingo is committed to a future where we may finally roam
              free with our beloved canine companions, and our pups will never
              be left at home again. Welcome to pet-friendly travel with
              Romingo!
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mt: 1, ml: 0, textAlign: "left", fontWeight: 600 }}
            >
              Zach Somers
              <i
                style={{
                  fontSize: "14px",
                  marginTop: ".25rem",
                  marginBottom: "-.25rem",
                  display: "block",
                }}
              >
                Founder & CEO
              </i>
              <span style={{ fontSize: "14px" }}>Romingo</span>
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mt: 5,
                ml: 0,
                textAlign: "left",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: "14px",
              }}
            >
              We would love to hear from you! Feel free to contact us at{" "}
              <a style={{ color: "#03989e" }} href="mailto:hello@romingo.com">
                hello@romingo.com
              </a>{" "}
              for partnership, press, and any other inquiries.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            mb: "2rem",
          }}
        >
          <Grid item xs={6} md={6}>
            <Box
              component="img"
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/about/IMG_0074%20(1).JPG"
              alt={"Maddie, Beach Bulldog"}
              sx={{
                objectFit: "cover",
                width: "100%",
                borderRadius: 5,
              }}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <Box
              component="img"
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/about/Maddie_Cream%20(1).jpeg"
              alt={"Zach, Jonathan, and Maddie"}
              sx={{
                objectFit: "cover",
                width: "100%",
                borderRadius: 5,
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default About;
