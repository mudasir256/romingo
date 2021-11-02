import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import { FC } from "react";
import { Container, Divider, Grid, Typography, Link } from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";

const Contact: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src="/images/romingo_ball.jpeg"
            alt={"Romingo Tennis Ball"}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "350px",
              borderRadius: 5,
            }}
          />
          <Typography variant="h2" color="text.primary" sx={{ mt: 2 }}>
            Contact Us
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            We&apos;re Always Here To Help
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
                color="text.secondary"
                sx={{ textAlign: "justify", lineHeight: 2 }}
              >
                Our Support Team at Romingo is ready to assist with your
                pup-friendly travel plans between Monday - Saturday, 9am - 6pm
                PST. If your inquiry requires immediate assistance regarding a
                reservation, please select “email us” to get in touch with us.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 4, mb: 8 }}>
              <Link href="mailto:hello@romingo.com" target="_blank">
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ textAlign: "center" }}
                >
                  Email Us
                </Typography>
              </Link>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                hello@romingo.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 4, mb: 8 }}>
              <Link
                href="https://form.typeform.com/to/zdVrRtxT"
                target="_blank"
              >
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ textAlign: "center" }}
                >
                  Partner Inquiry
                </Typography>
              </Link>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Want to Partner with Romingo?
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ mt: 4, mb: 8 }}>
              <Link href="">
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ textAlign: "center" }}
                >
                  Start a Chat
                </Typography>
              </Link>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                During business hours
              </Typography>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="/images/lake-dog.jpeg"
                  alt={"Dog on Lake"}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "250px",
                    boxShadow: 4,
                    borderRadius: 3,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="/images/kayak-dog.jpeg"
                  alt={"Kayak Dog"}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "250px",
                    boxShadow: 4,
                    borderRadius: 3,
                  }}
                />
              </Grid>
            </Hidden>
          </Grid>
        </>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
