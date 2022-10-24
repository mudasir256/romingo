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

import {Helmet} from "react-helmet";
import ListingCard from "../../components/ListingCard";
import { 
  useStore, 
  useSelector 
} from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { GetHotelBySearch } from "../../constants/constants";
import ListingCardSkeleton from "../../components/UI/ListingCardSkeleton";


const PalmSprings: FC = () => {

  const cityList = useSelector((state: any) => state.cityListReducer.cities);
  const la = cityList.find(city => city.name === 'Palm Springs, CA')
  const today = new Date();
  const fewDaysLater = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 2
  ).toISOString();

  const endTripDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 4
  ).toISOString();

  const { loading, error, data, refetch } = useQuery(
    gql`
      ${GetHotelBySearch}
    `,
    {
      variables: {
        adults: 1,
        cityId: la.id,
        checkIn: fewDaysLater.slice(0,10),
        checkOut: endTripDate.slice(0,10),
        children: [],
        dogs: 1,
        allows_big_dogs: 0
      },
    }
  );

  return (
    <>
      <Helmet>
        <title>Palm Springs Hotels - Romingo</title>
      </Helmet>
      <ScrollToTop />
      <Navbar />
      <Box
        component="img"
        src="https://storage.googleapis.com/romingo-development-public/images/front-end/ps-hero.jpeg"
        alt={"Palm Springs"}
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
            Palm Springs
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
              Palm Springs offers something unique and different from many of
              the famous coastal cities in California. Located in the Sonoran
              Desert, this city is most known for its golf courses, mountainous
              views, mid-century architecture, and first-class spa resorts. For
              those who enjoy warm weather and discovering the charm of locally
              owned and operated businesses, Palm Springs has more than enough
              to offer.
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
              Some of the city&apos;s main highlights include its art and
              culture scene and outdoor adventures where you can find miles of
              pet-friendly trails, canyons, mountain streams, and beautiful
              waterfalls. Finally, the cherry on top getting pampered at one of
              Palm Spring’s luxury stays!
            </Typography>
          </Grid>
          {/*<Hidden mdDown>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/ps-2.jpeg"
                alt={"Palm Springs"}
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
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/ps-1.jpeg"
                alt={"Palm Springs"}
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
                src="https://storage.googleapis.com/romingo-development-public/images/front-end/ps-3.jpeg"
                alt={"Palm Springs"}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "250px",
                  boxShadow: 4,
                  borderRadius: 3,
                }}
              />
            </Grid>
          </Hidden>*/}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/ps-4.jpeg"
              alt={"Palm Springs"}
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
            <Typography sx={{fontFamily: 'sansita-light', fontSize: '2em', ml: '0.25em' }}>Explore Palm Springs Hotels</Typography>
            {data?.properties.slice(0, 4).map(card => (
              <Box key={card.id} sx={{ py: '0.5em' }}>
                <ListingCard
                  {...card}
                  duration={2}
                  highlighted={false}
                />
              </Box>
            ))}
            {loading && <Box><ListingCardSkeleton key={0} /><ListingCardSkeleton key={0} /></Box>}
          </Grid>

          <Grid item xs={12}>
            <Divider light variant="middle" sx={{ mb: 2 }}>
              <Typography variant="body1" color="text.secondary">
                PALM SPRINGS ACTIVITIES
              </Typography>
            </Divider>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 2, textAlign: "justify" }}
            >
              To start, visit Palm Spring’s Downtown district which is a compact
              hub filled with one-of-a-kind boutiques, gardens, coffee shops,
              and classic Italian restaurants. On Palm Canyon drive, you’ll also
              find a nice range of chain stores and if you go further north,
              you’ll land in the Uptown Design District that features retail
              stores selling mid-century modern pieces. To discover the
              outdoors, plan a day to visit the city’s reserves with your pup.
              We recommend Whitewater Preserve which boasts remote trails and
              top-of-the-world views. For another pet-friendly destination, head
              over to Moorten Botanical Garden to appreciate all the cacti and
              desert plants. If you’re willing to travel a little further, you
              can find unbeatable desert landscape and wildlife in Coachella
              Valley and Joshua Tree.{" "}
              <Link
                href="https://www.planetware.com/california/visitors-guide-to-exploring-downtown-palm-springs-ca-us-ca-558.htm"
                target="_blank"
                rel="noopener noreffer"
                sx={{ fontWeight: "bold" }}
              >
                More things to do in Palm Springs
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
                  lat: 33.826291140277625,
                  lng: -116.52769996292206,
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

export default PalmSprings;
