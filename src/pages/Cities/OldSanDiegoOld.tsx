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

const SanDiego: FC = () => {


  const cityList = useSelector((state: any) => state.cityListReducer.cities);
  const la = cityList.find(city => city.name === 'San Diego, CA')
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

  return <>
    <Helmet>
      <title>San Diego Hotels - Romingo</title>
      <description>For a change of pace in sunny California, head on over to the state’s second largest city, San Diego. San Diego is renowned for its relaxed culture, idyllic weather, miles of white-sand beaches, and a variety of things to see and do for adventurers (and dogs) of all ages. San Diego is a family-friendly city that’s especially a must visit for those who love the beach. Sitting at the most Southern part of California and by the border of Mexico, this charming city carries an abundance of Spanish influences in their culture, cuisine, and attractions.</description>
      <meta property="og:title" content="San Diego Hotels - Romingo" />
      <meta property="og:description" content="For a change of pace in sunny California, head on over to the state’s second largest city, San Diego. San Diego is renowned for its relaxed culture, idyllic weather, miles of white-sand beaches, and a variety of things to see and do for adventurers (and dogs) of all ages. San Diego is a family-friendly city that’s especially a must visit for those who love the beach. Sitting at the most Southern part of California and by the border of Mexico, this charming city carries an abundance of Spanish influences in their culture, cuisine, and attractions." />
      <meta property="og:url" content="https://www.romingo.com/san-diego" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Romingo" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>

    <ScrollToTop />
    <Navbar />
    <Box
      component="img"
      src="https://storage.googleapis.com/romingo-development-public/images/front-end/sd-hero.jpeg"
      alt={"San Diego"}
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
          San Diego
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
            For a change of pace in sunny California, head on over to the
            state’s second largest city, San Diego. San Diego is renowned for
            its relaxed culture, idyllic weather, miles of white-sand beaches,
            and a variety of things to see and do for adventurers (and dogs)
            of all ages. San Diego is a family-friendly city that’s especially
            a must visit for those who love the beach. Sitting at the most
            Southern part of California and by the border of Mexico, this
            charming city carries an abundance of Spanish influences in their
            culture, cuisine, and attractions.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Divider light variant="middle" sx={{ mb: 1 }}>
            <Typography variant="body1" color="text.secondary">
              BOOK YOUR GETAWAY!
            </Typography>
          </Divider>
          <Hidden lgDown>
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
            San Diego is often considered the most pet-friendly city in
            California with many pet-friendly spaces to enjoy throughout the
            city. Those who seek pet-friendly travel will find their hearts
            filled with what San Diego has to offer thanks to the city’s arts
            and culture, diverse culinary experiences, and the great outdoors.
          </Typography>
        </Grid>
   {/*     <Hidden mdDown>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/sd-2.jpeg"
              alt={"Sunny San Diego"}
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
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/sd-1.jpeg"
              alt={"Sunny San Diego"}
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
              src="https://storage.googleapis.com/romingo-development-public/images/front-end/sd-3.jpeg"
              alt={"Sunny San Diego"}
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
            src="https://storage.googleapis.com/romingo-development-public/images/front-end/sd-4.jpeg"
            alt={"Sunny San Diego"}
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
          <Typography sx={{fontFamily: 'sansita-light', fontSize: '2em', ml: '0.25em' }}>Explore San Diego Hotels</Typography>
          {data?.properties.map(card => (
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
              SAN DIEGO ACTIVITIES
            </Typography>
          </Divider>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 2, textAlign: "justify" }}
          >
            When you’re in San Diego, be sure to allocate time to visit Balboa
            Park where you can explore its museums, theaters, and gardens.
            Next, plan some time to lounge and dine at Mission Beach and
            Pacific Beach and its surrounding neighborhoods. The vast
            shoreline is an ideal spot for dog owners because of the
            pet-friendly restaurants and cafes. Additionally, you can rent a
            bike, have a picnic, and stroll the boardwalk. Gaslamp Quarter is
            known for its nightlife where you can find unique Victorian-style
            buildings, shops, pubs, and trendy restaurants. To appreciate San
            Diego in all its natural glory, pay a visit to Torrey Pines State
            Natural Reserve which features plenty of hiking opportunities,
            dramatic oceanfront views, and stunning flora and fauna. Discover
            more of San Diego’s best attractions here:{" "}
            <Link
              href=" https://www.tripadvisor.com/Attractions-g60750-Activities-San_Diego_California.html"
              target="_blank"
              rel="noopener noreffer"
              sx={{ fontWeight: "bold" }}
            >
              Things to do in San Diego
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
                lat: 32.743646786327545,
                lng: -117.19080348404489,
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
          <Hidden lgDown>
            <DesktopFilterBar />
          </Hidden>
          <Hidden mdUp>
            <FilterBar />
          </Hidden>            <Divider light variant="middle" sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>;
};

export default SanDiego;
