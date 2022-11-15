import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Link from "@mui/material/Link";
import { FC } from "react";
import { Container, Divider, Grid, Typography } from "@mui/material";

import Map from "./UI/Map/Map";
import Navbar from "./Navbar";
import Footer from "./Footer";

import ScrollToTop from "./ScrollToTop";
import FilterBar from "./FilterBar";
import { DesktopFilterBar } from "../pages/Cities/DesktopFilterBar"

import {Helmet} from "react-helmet";
import ListingCard from "./ListingCard";
import { 
  useStore, 
  useSelector 
} from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { LocationProperties } from "../constants/constants";
import ListingCardSkeleton from "./UI/ListingCardSkeleton";

import { HOTEL_DESCRIPTIONS } from '../constants/locationPageDescriptions'

const LocationPageTemplate = ({ cityName, cityHeroImage }) => {

  const cityList = useSelector((state: any) => state.cityListReducer.cities);
  console.log(cityList)
  const foundCity = cityList.find(city => city.name === cityName)
  const cityContent = HOTEL_DESCRIPTIONS.find(obj => obj.city === cityName)

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
      ${LocationProperties}
    `,
    {
      variables: {
        cityId: foundCity.id,
      },
    }
  );

  console.log(data)
  console.log(error)

  console.log(foundCity)

  const onlyCity = foundCity.name.split(',')[0]

  return (
    <>
      <Helmet>
        <title>{foundCity.name} Hotels - Romingo</title>
      </Helmet>
      <ScrollToTop />
      <Navbar />
      <Box
        component="img"
        src={cityContent.heroImage}
        alt={foundCity.name}
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
            {onlyCity}
          </Typography>
        </Box>
        <Divider variant="middle" light sx={{ my: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {foundCity.state.name.toUpperCase()}
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
              {cityContent.paragraphOne}
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
              {cityContent.paragraphTwo}
            </Typography>
          </Grid>
      
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={cityContent.secondaryImage}
              alt={foundCity.name}
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
            <Typography sx={{fontFamily: 'sansita-light', fontSize: '2em', ml: '0.25em' }}>Explore {onlyCity} Hotels</Typography>
            {data?.propertiesByLocation.map(card => (
              <Box key={card.id} sx={{ py: '0.5em' }}>
                <ListingCard
                  {...card}
                  city={{ name: foundCity.name }}
                  duration={2}
                  highlighted={false}
                />
              </Box>
            ))}
            {loading && <Box><ListingCardSkeleton key={0} /><ListingCardSkeleton key={0} /></Box>}
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

export default LocationPageTemplate;
