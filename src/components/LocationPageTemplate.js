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
import { LargeFilterBar } from '../components/LargeFilterBar'
import "./Header/Header.scss";

import PetsIcon from '@mui/icons-material/Pets';
import DoneAllIcon from '@mui/icons-material/DoneAll';

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

  const onlyCity = foundCity.name.split(',')[0]

  const IconTags = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '1em'}}>
      <Box sx={{ maxWidth: '240px'}}>
        <Typography sx={{ display: 'flex', alignItems: 'center'}} variant="h6"><PetsIcon />&nbsp;&nbsp;Pet-friendly</Typography>
        <Typography sx={{ fontSize: '0.9em'}}>We have searched thousands of hotels to find you the pet-friendliest.</Typography>
      </Box>
      <Box sx={{ maxWidth: '200px'}}>
        <Typography variant="h6">$0 pet fees</Typography>
        <Typography sx={{ fontSize: '0.9em'}}>You will always pay $0 in hotel pet fees with Romingo.</Typography>
      </Box>
      <Box sx={{ maxWidth: '240px'}}>
        <Typography sx={{ display: 'flex', alignItems: 'center'}} variant="h6"><DoneAllIcon />&nbsp;&nbsp;Romingo guarentee</Typography>
        <Typography sx={{ fontSize: '0.9em'}}>Every hotel on Romingo welcomes up to 2 pets of 50 or 75 lbs. each.</Typography>
      </Box>
    </Box>
  )

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
              <Box sx={{ml: '-1.25em', mb: '0.75em'}}>
               <LargeFilterBar city={foundCity.id} />
              </Box>
              <IconTags />
            </Hidden>
            <Hidden mdUp>
              <FilterBar city={foundCity.id} />
            </Hidden>            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
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
              <Box sx={{ml : '-1.25em', mb: '0.75em'}}>
                <LargeFilterBar city={foundCity.id} />
              </Box>
              <IconTags />
            </Hidden>
            <Hidden mdUp>
              <FilterBar city={foundCity.id} />
            </Hidden>            <Divider light variant="middle" sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default LocationPageTemplate;
