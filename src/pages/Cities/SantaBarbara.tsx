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

const SantaBarbara: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box
        component="img"
        src="/images/sb-hero.jpeg"
        alt={"Santa Barbara"}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: { xs: "40vh", md: "70vh" },
          boxShadow: 0,
        }}
      />
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h2" color="text.primary">
            Santa Barbara
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
              Located on the central coast of California, the laid-back city of
              Santa Barbara offers the perfect getaway from the hustle and
              bustle of everyday life. The lovely city features Mediterranean
              style buildings that reflect its Spanish heritage, along with
              breathtaking mountain and beach views, and surrounding vineyards.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Divider light variant="middle" sx={{ mb: 1 }}>
              <Typography variant="body1" color="text.secondary">
                BOOK YOUR GETAWAY!
              </Typography>
            </Divider>
            <FilterBar zoomed city="58b23325-2016-44ef-886f-67e962dab17f" />
            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              The breeze swept in from the ocean and its mild sunny climate
              makes this city an enjoyable destination for outdoor, pet-friendly
              activities. The city also hosts a number of impressive luxury
              stays anyone will fall in love with.
            </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/sb-2.jpeg"
                alt={"Sunny Santa Barbara"}
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
                src="/images/sb-1.jpeg"
                alt={"Sunny Santa Barbara"}
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
                src="/images/sb-3.jpeg"
                alt={"Sunny Santa Barbara"}
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
              src="/images/sb-4.jpeg"
              alt={"Sunny Santa Barbara"}
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
                SANTA BARBARA ACTIVITIES
              </Typography>
            </Divider>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 2, textAlign: "justify" }}
            >
              First and foremost, you’ll want to spend at least a few hours
              enjoying Santa Barbara’s pristine beaches. You can rent a yacht or
              a sunset cruise, or just lounge on the sand for some well deserved
              quality time with your pup, friends and family. Discover seven of
              Santa Barbara’s finest beaches here! Santa Barbara’s wine
              reputation guarantees a positive experience at any vineyard you
              decide to visit. Having trouble deciding which winery is the best
              for you and your pup? Read this. Don’t miss out on the fresh
              seafood and lively outdoor shopping at Downtown Santa Barbara’s
              State Street Promenade, which boasts rows of popular shops and
              outdoor dining experiences. For more Santa Barbara attractions:{" "}
              <Link
                href="https://www.tripadvisor.com/Attractions-g33045-Activities-Santa_Barbara_California.html"
                target="_blank"
                rel="noopener noreffer"
                sx={{ fontWeight: "bold" }}
              >
                Things to do in Santa Barbara
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
                  lat: 34.422513844337736,
                  lng: -119.70634260640723,
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
            <FilterBar zoomed city="58b23325-2016-44ef-886f-67e962dab17f" />
            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default SantaBarbara;
