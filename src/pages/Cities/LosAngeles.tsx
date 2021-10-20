import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";

import Map from "../../components/UI/Map/Map";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FilterBar from "../../components/FilterBar";

import ScrollToTop from "../../components/ScrollToTop";

const LosAngeles: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box
        component="img"
        src="/images/la-hero.jpeg"
        alt={"Sunny Los Angeles"}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: { xs: "40vh", md: "55vh" },
          boxShadow: 0,
        }}
      />
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h2" color="text.primary">
            Los Angeles
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            CALIFORNIA
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
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Los Angeles is regarded as one of the most renowned cities in the
              whole world. This dazzling city is known as the entertainment
              capital and sits in close proximity to a number of world famous
              beaches. You can also find amusement parks, countless museums, a
              variety of dog-friendly tourist attractions, great hikes, and so
              much more! When you visit Los Angeles, there is never a shortage
              of things to see, try, and eat -- which is why there are roughly
              50 million visitors in Los Angeles every year.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Divider light variant="middle" sx={{ mb: 1 }}>
              <Typography variant="body1" color="text.secondary">
                BOOK YOUR GETAWAY!
              </Typography>
            </Divider>
            <FilterBar zoomed city="ba12d364-9b1f-48c5-9ddc-7e68b40df076" />
            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              The diverse, multiethnic population of Los Angeles today
              distinguishes the city as the cultural hub of the Pacific Rim.
              Furthermore, Los Angeles’ development makes it one of the most
              coveted cities for dog owners and dog-friendly travel. The area
              boasts a wide selection of dog-friendly accommodations,
              recreational opportunities, and attractions.
            </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/la-2.jpeg"
                alt={"Sunny Los Angeles"}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "250px",
                  boxShadow: 4,
                  borderRadius: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="/images/la-1.jpeg"
                alt={"Sunny Los Angeles"}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "250px",
                  boxShadow: 4,
                  borderRadius: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="/images/la-3.jpeg"
                alt={"Sunny Los Angeles"}
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
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="/images/la-4.jpeg"
              alt={"Sunny Los Angeles"}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "250px",
                boxShadow: 4,
                borderRadius: 3,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider light variant="middle" sx={{ mb: 2 }}>
              <Typography variant="body1" color="text.secondary">
                LOS ANGELES ACTIVITIES
              </Typography>
            </Divider>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 2, textAlign: "justify" }}
            >
              Go on a shopping spree with your pup at the famous Rodeo Drive or
              plan a few hours to discover exciting art exhibits at The Broad in
              Downtown LA. For impressive architectural views, works of art, and
              unbeatable photo ops, head on over to the Griffith Observatory and
              Getty Center. For some fun in the sun, make a stop at the Santa
              Monica Beach then grab a meal at Third Street Promenade or take a
              hike at the Angeles National Forest. Discover more of Los Angeles’
              best attractions here:{" "}
              <Link
                href="https://travel.usnews.com/Los_Angeles_CA/Things_To_Do/"
                target="_blank"
                rel="noopener noreffer"
                sx={{ fontWeight: "bold" }}
              >
                Things to do in LA
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ width: "100px" }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <Map
                center={{
                  lat: 34.07351043341975,
                  lng: -118.36388928440947,
                }}
                height={300}
                zoom={9}
                selectedMarker={0}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Divider light variant="middle" sx={{ mb: 1 }}>
              <Typography variant="body1" color="text.secondary">
                $0 PET FEES ON ROMINGO
              </Typography>
            </Divider>
            <FilterBar zoomed city="ba12d364-9b1f-48c5-9ddc-7e68b40df076" />
            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default LosAngeles;
