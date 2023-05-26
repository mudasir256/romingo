import { withStyles } from "@material-ui/styles";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, Link, MenuItem, Slider, TextField, Dialog, AppBar, Toolbar, IconButton, useMediaQuery } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollToTop";
import { gql, useQuery } from "@apollo/client";
import { GetHotelsByLocation } from "../../constants/constants";
import ListingMap from "../../components/ListingMap";
import { LargeFilterBar } from '../../components/LargeFilterBar';
import { Select, Typography } from "@material-ui/core";
import CardList from "../../components/CardList";
import Map from "../../components/UI/Map";
import { useSelector } from "react-redux";
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import FilterBar from "../../components/MobileHomePageFilterBar";
import { DesktopFilterBar } from "../Cities/DesktopFilterBar";
import { DesktopFilterBarNew } from "../Cities/DesktopFilterBarNew";

const ListingPageNew = ({ ...props }) => {

  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState('')
  const [hotels, setHotels] = useState([]);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const search = useSelector((state: any) => state.searchReducer.search);
  const [center, setCenter] = useState({ lat: search.latitude, lng: search.longitude })
  const [markers, setMarkers] = useState([]);
  const [sort, setSort] = useState('alphabetSort');
  const [selectedCity, setSelectedCity] = useState(cities.find(x => x.id === search.city).name)
  const [rating, setRating] = useState([]);
  const [query, setQuery] = useState('');
  const [sliderValue, setSliderValue] = useState(1000)
  const [openMap, setOpenMap] = useState(false)
  const [viewFilters, setViewFilters] = useState(false)
  const mobile = useMediaQuery("(max-width:800px)");

  const { data } = useQuery(
    gql`${GetHotelsByLocation(search.occupants.adults, parseInt(moment(search.checkIn).format('x')), parseInt(moment(search.checkOut).format('x')), search.occupants.children, search.lat, search.lng)}`);


  useEffect(() => {
    if (data && data.getHotels.sessionId) {
      setSessionId(data.getHotels.sessionId);
      const filteredHotels = [];
      const markers = [];
      for (const hotel of data.getHotels.hotels) {
        filteredHotels.push({ imageURLs: [hotel.DefaultImage.FullSize], name: hotel.DisplayName, addressLine1: hotel.Address, city: selectedCity, petFeePolicy: { maxPets: 0 }, romingoScore: hotel.StarRating, lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value })
        markers.push({ lat: hotel.GeoLocation.Latitude, lng: hotel.GeoLocation.Longitude, type: 'hotel', label: hotel.DisplayName })
      }
      setHotels(filteredHotels.sort(function (a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }))
      setMarkers(markers);
    }

  }, [data, search, center])

  const handleSearch = (e) => {
    const filteredHotels = [];
    const markers = [];

    for (const hotel of data.getHotels.hotels) {
      if (hotel.DisplayName.includes(e.target.value) && hotel.SuppliersLowestPackagePrices[0].Value <= sliderValue && (rating.length === 0 || rating.includes(hotel.StarRating))) {
        filteredHotels.push({ imageURLs: [hotel.DefaultImage.FullSize], name: hotel.DisplayName, addressLine1: hotel.Address, city: selectedCity, petFeePolicy: { maxPets: 0 }, romingoScore: hotel.StarRating, lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value, lat: hotel.GeoLocation.Latitude, lng: hotel.GeoLocation.Longitude })
      }
    }
    for (const hotel of filteredHotels) {
      markers.push({ lat: hotel.lat, lng: hotel.lng, type: 'hotel', label: hotel.name })
    }
    setMarkers(markers)
    setHotels(filteredHotels)
    setQuery(e.target.value);
  }

  const handleSort = (e) => {
    let newHotelsAfterFiltering = [];
    const filteredHotels = [];
    for (const hotel of data.getHotels.hotels) {
      if (hotel.DisplayName.includes(query) && hotel.SuppliersLowestPackagePrices[0].Value <= sliderValue && (rating.length === 0 || rating.includes(hotel.StarRating))) {
        filteredHotels.push({ imageURLs: [hotel.DefaultImage.FullSize], name: hotel.DisplayName, addressLine1: hotel.Address, city: selectedCity, petFeePolicy: { maxPets: 0 }, romingoScore: hotel.StarRating, lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value, lat: hotel.GeoLocation.Latitude, lng: hotel.GeoLocation.Longitude })
      }
    }
    if (e.target.value === 'alphabetSort') {
      newHotelsAfterFiltering = filteredHotels.sort(function (a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    } else {
      newHotelsAfterFiltering = filteredHotels.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice);

    }
    setHotels(newHotelsAfterFiltering)
    setSort(e.target.value)
  }

  const handleSliderChange = (e) => {
    const filteredHotels = [];
    const hotelsAfterFiltering = []
    const markers = []
    for (const hotel of data.getHotels.hotels) {
      if (hotel.DisplayName.includes(query) && hotel.SuppliersLowestPackagePrices[0].Value <= e.target.value && (rating.length === 0 || rating.includes(hotel.StarRating))) {
        filteredHotels.push(hotel)
      }
    }

    for (const hotel of filteredHotels) {
      hotelsAfterFiltering.push({ imageURLs: [hotel.DefaultImage.FullSize], name: hotel.DisplayName, addressLine1: hotel.Address, city: selectedCity, petFeePolicy: { maxPets: 0 }, romingoScore: hotel.StarRating, lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value })
      markers.push({ lat: hotel.GeoLocation.Latitude, lng: hotel.GeoLocation.Longitude, type: 'hotel', label: hotel.DisplayName })
    }

    setHotels(hotelsAfterFiltering);
    setMarkers(markers);
    setSliderValue(e.target.value);
  }

  const handleRatingChange = (e) => {
    const newRatings = rating;
    if (!rating.includes(e.target.name) && e.target.checked) {
      newRatings.push(e.target.name)
    }

    if (rating.includes(e.target.name) && !e.target.checked) {
      const index = newRatings.indexOf(e.target.name);
      if (index > -1) {
        newRatings.splice(index, 1);
      }
    }

    const filteredHotels = [];
    const hotelsAfterFiltering = []
    const markers = []
    for (const hotel of data.getHotels.hotels) {
      if (hotel.DisplayName.includes(query) && hotel.SuppliersLowestPackagePrices[0].Value <= sliderValue && (rating.length === 0 || rating.includes(hotel.StarRating))) {
        filteredHotels.push(hotel)
      }
    }

    for (const hotel of filteredHotels) {
      hotelsAfterFiltering.push({ imageURLs: [hotel.DefaultImage.FullSize], name: hotel.DisplayName, addressLine1: hotel.Address, city: selectedCity, petFeePolicy: { maxPets: 0 }, romingoScore: hotel.StarRating, lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value })
      markers.push({ lat: hotel.GeoLocation.Latitude, lng: hotel.GeoLocation.Longitude, type: 'hotel', label: hotel.DisplayName })
    }

    setHotels(hotelsAfterFiltering);
    setMarkers(markers)
    setRating(newRatings)
  }

  return (
    <Grid sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
      <ScrollToTop />
      <Navbar />
      {mobile ?
        <Box sx={{ width: '95%', margin: '10px auto' }}>
          <DesktopFilterBarNew city={search.city} />
        </Box> : <LargeFilterBar />}
      <Grid container direction='row' style={{ padding: mobile ? '0' : '30px', width: mobile ? '100%': '80%',margin: 'auto', position: 'relative', }} >
        {mobile ?         
        <Grid item container justifyContent='space-between' style={{padding: '0 10px'}}>
          <Button variant="outlined" style={{ width: '48%', marginBottom: 10 }} onClick={() => setOpenMap(true)}>
            View on full map
          </Button>
          <Button variant="outlined" style={{ width: '48%', marginBottom: 10 }} onClick={() => setViewFilters(true)}>
            View filters
          </Button>
        </Grid> : 
        <Grid item xs={0} sm={4} >
          <Box sx={{ display: "flex", my: 2, width: "100%" }}>
            <Map center={{ lat: search.lat, lng: search.lng }}
              height={300}
              zoom={11}
              selectedMarker={0}
              markers={markers}
            />
          </Box>
          <Button variant="outlined" style={{ width: '100%', marginBottom: 10,  }} onClick={() => setOpenMap(true)}>
            View on full map
          </Button>

          <TextField id="outlined-basic" label="Search by property name" variant="outlined" fullWidth onChange={handleSearch} />
          <Typography style={{marginTop: 10}}>Filter By</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Pool" />
            <FormControlLabel control={<Checkbox />} label="Pet Friendly" />
            <FormControlLabel control={<Checkbox />} label="Hot Tub" />
            <FormControlLabel control={<Checkbox />} label="Bed & breakfast" />
            <FormControlLabel control={<Checkbox />} label="Condo" />
          </FormGroup>
          <Typography>Price per night</Typography>
          <Slider defaultValue={0} step={100} marks min={0} max={1000} onChange={handleSliderChange} />
          <Typography>Guest Rating</Typography>
          <FormGroup onChange={handleRatingChange}>
            <FormControlLabel control={<Checkbox name="1" checked={rating.includes("1")} />} label="1" />
            <FormControlLabel control={<Checkbox name="2" checked={rating.includes("2")} />} label="2" />
            <FormControlLabel control={<Checkbox name="3" checked={rating.includes("3")} />} label="3" />
            <FormControlLabel control={<Checkbox name="4" checked={rating.includes("4")} />} label="4" />
            <FormControlLabel control={<Checkbox name="5" checked={rating.includes("5")} />} label="5" />
          </FormGroup>
        </Grid>}

        <Grid item xs={12} sm={8} style={{padding: mobile ? '0 10px' : '0 30px', width: '96%'}}>
          <Grid item container direction='row'>
            <Grid item container direction='row' justifyContent='space-between'>
              <Grid item>
                <Typography style={{ padding: '8px 20px' }}>{hotels.length} properties</Typography>
              </Grid>
              <Grid item >
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={sort}
                    label="Sort"
                    onChange={handleSort}
                    variant='outlined'
                    
                  >
                    <MenuItem value={'alphabetSort'}>Alphabet sort</MenuItem>
                    <MenuItem value={'priceSort'}>Price sort</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
          <CardList cards={hotels} />
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        fullScreen
        open={openMap}
        onClose={() => setOpenMap(false)}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenMap(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Full screen map
            </Typography>
          </Toolbar>
        </AppBar>
        <Map center={{ lat: search.lat, lng: search.lng }}
          zoom={11}
          selectedMarker={0}
          markers={markers}
        />
      </Dialog>
      <Dialog
        fullScreen
        open={viewFilters}
        onClose={() => setOpenMap(false)}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setViewFilters(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filters
            </Typography>
          </Toolbar>
        </AppBar>
        <Box style={{padding: 20}}>
          <TextField id="outlined-basic" label="Search by property name" variant="outlined" value={query} fullWidth onChange={handleSearch} />
          <Typography style={{marginTop: 10}}>Filter By</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Pool" />
            <FormControlLabel control={<Checkbox />} label="Pet Friendly" />
            <FormControlLabel control={<Checkbox />} label="Hot Tub" />
            <FormControlLabel control={<Checkbox />} label="Bed & breakfast" />
            <FormControlLabel control={<Checkbox />} label="Condo" />
          </FormGroup>
          <Typography>Price per night</Typography>
          <Slider defaultValue={0} step={100} marks min={0} max={1000} value={sliderValue} onChange={handleSliderChange} />
          <Typography>Guest Rating</Typography>
          <FormGroup onChange={handleRatingChange}>
            <FormControlLabel control={<Checkbox name="1" checked={rating.includes("1")} />} label="1" />
            <FormControlLabel control={<Checkbox name="2" checked={rating.includes("2")} />} label="2" />
            <FormControlLabel control={<Checkbox name="3" checked={rating.includes("3")} />} label="3" />
            <FormControlLabel control={<Checkbox name="4" checked={rating.includes("4")} />} label="4" />
            <FormControlLabel control={<Checkbox name="5" checked={rating.includes("5")} />} label="5" />
          </FormGroup>
        </Box>
      </Dialog>
    </Grid>
  )
}

export default (ListingPageNew);
