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
import { DesktopFilterBar } from "./DesktopFilterBar"

const SanFrancisco: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Box
        component="img"
        src="https://storage.googleapis.com/romingo-development-public/images/front-end/sf-hero.jpeg"
        alt={"San Francisco"}
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
            San Francisco
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
              San Francisco is a lively cultural hub home to grand architectural
              buildings, world-class cuisine, cable cars, a dynamic waterfront,
              and plenty of outdoor adventures. The walkable city is adorned
              with iconic landmarks which is what truly sets San Francisco
              apart. Taking a stroll through the city’s streets is an exciting
              experience that will bring you from one unique neighborhood to
              another. San Francisco is a haven for lovers of performing arts
              and is also considered one of the United State’s greatest dining
              cities because of its rich diverse cultural influences, fresh
              ingredients, and creative chefs who come from all around the
              world.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Divider light variant="middle" sx={{ mb: 1 }}>
              <Typography variant="body1" color="text.secondary">
                BOOK YOUR GETAWAY!
              </Typography>
            </Divider>
            <Hidden mdDown>
              <DesktopFilterBar />
            </Hidden>
            <Hidden mdUp>
              <FilterBar />
            </Hidden>            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", lineHeight: 2 }}
            >
              Many of San Francisco’s attractions are outdoors, making it an
              ideal city for pet-friendly travel. Your dog will be intrigued by
              all the different landscapes and scenic views, and will be
              welcomed in many restaurants and hotels as well!
            </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/sf-2.jpeg"
                alt={"San Francisco"}
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
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/sf-1.jpeg"
                alt={"San Francisco"}
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
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/sf-3.jpeg"
                alt={"San Francisco"}
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
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/sf-4.jpeg"
              alt={"San Francisco"}
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
                SAN FRANCISCO ACTIVITIES
              </Typography>
            </Divider>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 2, textAlign: "justify" }}
            >
              When visiting San Francisco, you can’t miss the grand Golden Gate
              Bridge, considered to be one of the world’s most famous bridges.
              Fisherman’s Wharf is a pet-friendly waterfront marketplace where
              you can view sea lions and indulge in seafood and cocktails. For a
              relaxing afternoon, have a picnic at the beautiful Dolores Park
              which boasts nearly 16 acres of grass where you and your pup can
              lounge and play. A visit to the Golden Gate Park is another great
              option for a picnic and will bring you close to attractions like
              the Japanese Tea Garden and many others. If you’re looking to shop
              at every store imaginable, you can head on over to Union Square
              (which is especially festive during the Thanksgiving and Christmas
              season). Finally, explore the great outdoors and unbeatable views
              with a visit to Land’s End and Twin Peaks. Discover more of San
              Francisco:{" "}
              <Link
                href="https://travel.usnews.com/San_Francisco_CA/Things_To_Do/"
                target="_blank"
                rel="noopener noreffer"
                sx={{ fontWeight: "bold" }}
              >
                Things to do in San Francisco
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
                  lat: 37.79057588458158,
                  lng: -122.41495830286681,
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
            <Hidden mdDown>
              <DesktopFilterBar />
            </Hidden>
            <Hidden mdUp>
              <FilterBar />
            </Hidden>            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default SanFrancisco;
