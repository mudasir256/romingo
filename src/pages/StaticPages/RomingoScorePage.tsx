import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ScrollToTop from "../../components/ScrollToTop";

const RomingoScorePage: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Box
            component="img"
            src="https://storage.googleapis.com/romingo-development-public/images/front-end/dog_boating.jpeg"
            alt={"Dog Boat Vibes"}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "350px",
              borderRadius: 5,
            }}
          />
          <Typography variant="h2" color="text.primary" sx={{ mt: 2 }}>
            The Romingo Score
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Your Guide to Paw Forward Hotels
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
              Before you book with Romingo, or if you’re contemplating whether
              Romingo may be the right online travel platform for you, let’s get
              you familiar with the Romingo Score. Our Romingo Guarantee
              guarantees the best competitive room rates at beautiful hotels,
              waived pet fees on all reservations, and beds, bowls, and treats
              for your canine companion upon arrival. Our dog-loving,
              pet-friendly experts developed the Romingo Score to redefine what
              pet-friendly truly means. With Romingo, dogs aren’t just allowed
              or permitted. They are welcomed, loved, and cared for!
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
                &quot;But what is the Romingo Score?&quot;
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: { xs: "left", md: "justify" },
                lineHeight: 2,
                mb: 4,
              }}
            >
              Our dog-loving, pet-friendly experts developed the Romingo Score
              to redefine what pet-friendly truly means. With Romingo, dogs
              aren’t just allowed or permitted. They are welcomed, loved, and
              cared for!
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="https://storage.googleapis.com/romingo-development-public/images/front-end/dog-glasses.jpeg"
                  alt={"Our Romingo Scorer"}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "400px",
                    borderRadius: 5,
                  }}
                />
              </Grid>
              <Hidden mdDown>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src="https://storage.googleapis.com/romingo-development-public/images/front-end/dogs-beach.jpeg"
                    alt={"Dog Beach"}
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                      height: "400px",
                      borderRadius: 5,
                    }}
                  />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="text.secondary">
              The Algorithm
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }}
            >
              In a nutshell, the Romingo Score algorithm rates a hotel on its
              level of pet-friendliness based on a wide array of factors. But
              don’t worry, we haven’t forgotten about you either! Here’s our
              criteria:
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "left", lineHeight: 2 }}
              >
                <ul>
                  <li>
                    <span style={{ fontWeight: "bold" }}>
                      Location and walkability:
                    </span>{" "}
                    proximity to pet-friendly shopping centers, restaurants,
                    cafés, patios, bars, breweries, transportation, and other
                    activities
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Proximity:</span> to
                    dog parks, dog restaurants and cafés, hikes, and potty
                    relief areas
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>
                      Hotel amenities and features for you:
                    </span>{" "}
                    In-room dining, pool and jacuzzi, fitness center, spa, and
                    more!
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>
                      Hotel amenities and features for your pup:{" "}
                    </span>
                    On-site dog run, dog park, pet welcome programs,
                    towels/robes, dog room service, etc.
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>Guest reviews:</span>{" "}
                    Compiled and ranked from previous stays
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>
                      The destination’s pet-friendliness:
                    </span>{" "}
                    Some cities offer more pet-friendly offerings compared to
                    others. For instance, San Diego is considered one of the
                    most pet-friendly cities in California, so San Diego hotels
                    get a bump in Romingo Score.
                  </li>
                </ul>
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }}
            >
              Our goal with the Romingo Score is to help you navigate which
              pet-friendly accommodation is the most suitable for you and your
              pup. We encourage you to explore all of our partnered hotels and
              their offerings when selecting the best stay for you.
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: { xs: "left", md: "justify" }, lineHeight: 2 }}
            >
              With the Romingo Score and Romingo Guarantee, we hope to make your
              travel experience hassle-free, pleasant, and luxurious. Not every
              hotel is made the same, but with Romingo, you may finally roam
              free and rest easy knowing that your next trip with your pup will
              be enjoyable.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default RomingoScorePage;
