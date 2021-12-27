import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";

import Map from "../../components/UI/Map/Map";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";
import FilterBar from "../../components/FilterBar";

const OrangeCounty: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box
        component="img"
        src="https://storage.googleapis.com/romingo-development-public/images/front-end/oc-hero.jpeg"
        alt={"Orange County"}
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
            Orange County
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
              Orange County is nestled between Los Angeles and Orange County,
              home to many popular cities like Newport Beach, Anaheim, and
              Irvine. The county strikes a perfect balance between suburban life
              and tourist attractions, boosting its popularity in recent decades
              and making it an inviting destination for California travelers.
              One major reason for Orange County’s popularity is its
              accessibility to a variety of indoor and outdoor experiences,
              delivering a memorable and well-rounded travel experience.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Divider light variant="middle" sx={{ mb: 1 }}>
              <Typography variant="body1" color="text.secondary">
                BOOK YOUR GETAWAY!
              </Typography>
            </Divider>
            <FilterBar zoomed city="2714faad-9ea8-4851-9506-274710cdd51b" />
            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Not only is Orange County a melting pot of cuisines and cultures,
              you can also discover stellar beaches, luxury shopping
              experiences, and plenty of outdoor recreational activities.
              Finally, the county is a desirable place to settle and visit for
              dog owners and families because of how accommodating its
              neighborhoods are.
            </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/oc-2.jpeg"
                alt={"Sunny Orange County"}
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
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/oc-1.jpeg"
                alt={"Sunny Orange County"}
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
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/oc-3.jpeg"
                alt={"Sunny Orange County"}
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
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/oc-4.jpeg"
              alt={"Sunny Orange County"}
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
                ORANGE COUNTY ACTIVITIES
              </Typography>
            </Divider>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 2, textAlign: "justify" }}
            >
              Many of Orange County’s cities sit by the coast so you can easily
              find yourself on a paddleboard or kayak at the scenic Laguna
              Beach, Newport Beach, or Huntington Beach. Huntington Beach also
              features plenty of pet-friendly space, making it one of the most
              popular pet-friendly beaches in California. Furthermore, all the
              neighborhoods in Orange County are never too far from a
              beginner-friendly hike you and your pup can enjoy. While you’re
              visiting, you can’t skip Costa Mesa’s upscale South Coast Plaza or
              Newport Beach’s Fashion Island, or the pet-friendly,
              family-friendly outdoor shopping center The Irvine Spectrum. You
              can find amazing Asian, Mexican, and Mediterranean culinary
              experiences anywhere in Orange County, along with many up and
              coming contemporary restaurants. For thrill-seekers and
              Instagram-worthy photos, head over to the world famous Disneyland
              or Knott’s Berry Farm. Whether you’re a lover of Disney, surf
              culture, or luxury experiences, there is something for everyone
              (and every dog) in Orange County! For more Orange County
              attractions:{" "}
              <Link
                href=" https://www.tripadvisor.com/Attractions-g659482-Activities-Orange_County_California.html"
                target="_blank"
                rel="noopener noreffer"
                sx={{ fontWeight: "bold" }}
              >
                Things to do in Orange County
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
                  lat: 33.74717389132867,
                  lng: -117.9549653275616,
                }}
                height={300}
                zoom={11}
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
            <FilterBar zoomed city="2714faad-9ea8-4851-9506-274710cdd51b" />
            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default OrangeCounty;
