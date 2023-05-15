import { withStyles } from "@material-ui/styles";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Link, Slider, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollToTop";
import { gql, useQuery } from "@apollo/client";
import { GetHotelsByLocation } from "../../constants/constants";
import ListingMap from "../../components/ListingMap";
import { LargeFilterBar } from '../../components/LargeFilterBar';
import { Typography } from "@material-ui/core";
import CardList from "../../components/CardList";

const ListingPageNew = ({ ...props }) => {

  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState('')
  const [hotels, setHotels] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Boston')
  console.log('came here')

  const { data } = useQuery(
    gql`${GetHotelsByLocation( 1, 1684500537798, 1684643400000 ,  0,  40.7127753, -74.0059728)}`);

  console.log(data)     
  
  useEffect(() => {
    if(data){
      setSessionId(data.getHotels.sessionId);
      const filteredotels = [];
      for(const hotel of data.getHotels.hotels){
        filteredotels.push({imageURLs: [hotel.DefaultImage.FullSize], name: hotel.DisplayName, addressLine1: hotel.Address,city: selectedCity, petFeePolicy: {maxPets: 0}, romingoScore: hotel.StarRating, lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value})
      }
      setHotels(filteredotels);
    }
  },[data])

  return (
    <Grid sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
      <ScrollToTop />
      <Navbar />
      <LargeFilterBar />
      <Grid container direction='row' spacing={2} sx={{ maxWidth: 1200, margin: 'auto', position: 'relative' }} >
        <Grid item xs={4} >
          <Typography>Search by property name</Typography>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <Typography>Filter By</Typography>
          <Typography>Popular Filters</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Pool" />
            <FormControlLabel control={<Checkbox />} label="Pet Friendly" />
            <FormControlLabel  control={<Checkbox />} label="Hot Tub" />
            <FormControlLabel  control={<Checkbox />} label="Bed & breakfast" />
            <FormControlLabel  control={<Checkbox />} label="Condo" />
          </FormGroup>  
          <Typography>Price per night</Typography>
          <Slider defaultValue={0} step={100} marks min={0} max={1000} />
          <Typography>Guest Rating</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="1" />
            <FormControlLabel control={<Checkbox />} label="2" />
            <FormControlLabel  control={<Checkbox />} label="3" />
            <FormControlLabel  control={<Checkbox />} label="4" />
            <FormControlLabel  control={<Checkbox />} label="5" />
          </FormGroup>  
        </Grid>
        <Grid item xs={8} >
          <CardList cards={hotels} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default (ListingPageNew);
