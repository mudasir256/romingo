import { withStyles } from "@mui/styles";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, Link, MenuItem, Slider, TextField, Dialog, AppBar, Toolbar, IconButton, useMediaQuery } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollToTop";
import { gql, useQuery } from "@apollo/client";
import { GetHotelsByLocation } from "../../constants/constants";
import ListingMap from "../../components/ListingMap";
import { LargeFilterBar } from '../../components/LargeFilterBar';
import { Select, Typography } from "@mui/material";
import CardList from "../../components/CardList";
import Map from "../../components/UI/Map";
import { useSelector } from "react-redux";
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import FilterBar from "../../components/MobileHomePageFilterBar";
import { DesktopFilterBar } from "../Cities/DesktopFilterBar";
import { DesktopFilterBarNew } from "../Cities/DesktopFilterBarNew";
import Loader from "../../components/UI/Loader";
import Chip from '@mui/material'

const ListingPageNew = ({ ...props }) => {

  const [sessionId, setSessionId] = useState('')
  const [formatHotels, setFormatHotels] = useState([]);
  const [hotels, setHotels] = useState([]);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const search = useSelector((state: any) => state.searchReducer.search);
  const [center, setCenter] = useState({ lat: search.latitude, lng: search.longitude })
  const [markers, setMarkers] = useState([]);
  const [sort, setSort] = useState('alphabetSort');
  const [selectedCity, setSelectedCity] = useState(search.city)
  const [rating, setRating] = useState({'0': false, '1': true, '2': true, '3': true, '4': true, '5': true});
  const [query, setQuery] = useState('');
  const [sliderValue, setSliderValue] = useState(0)
  const [shouldFilter, setShouldFilter] = useState(false)
  const [openMap, setOpenMap] = useState(false)
  const [viewFilters, setViewFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [timer, setTimer] = useState(null)

  const mobile = useMediaQuery("(max-width:800px)");

  const childrenAge = search?.occupants?.children > 0 ? search?.occupants?.childrenAge.join(',') : ''

  const { data, loading } = useQuery(
    gql`${GetHotelsByLocation(search.occupants.adults + '', parseInt(moment(search.checkIn).format('x')), parseInt(moment(search.checkOut).format('x')), childrenAge, search.lat, search.lng)}`);

  console.log(data)

  const formatHotel = (hotel) => {
    return {
      imageURLs: [hotel.DefaultImage.FullSize],
      name: hotel.DisplayName,
      addressLine1: hotel.Address,
      city: hotel.city,
      state: hotel.state,
      zipcode: hotel.zipcode,
      petFeePolicy: { maxPets: 0 },
      romingoScore: hotel.starRating,
      numberOfReviews: hotel.numberOfReview,
      lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value,
      id: hotel.ID,
      lat: hotel.GeoLocation.Latitude,
      lng: hotel.GeoLocation.Longitude,
      description: hotel.description,
      pets_allowed: hotel.petsAllowed,
      pet_fee_value: hotel.petFeeValue,
      pet_fee: hotel.petFee,
      pet_allowance: hotel.petAllowance,
      pet_size: hotel.petSize,

      //marker
      type: 'hotel',
      label: hotel.DisplayName,
      hotel: {
        imageURLs: [hotel.DefaultImage.FullSize],
        name: hotel.DisplayName,
        addressLine1: hotel.Address,
        city: hotel.city,
        state: hotel.state,
        zipcode: hotel.zipcode,
        petFeePolicy: { maxPets: 0 },
        romingoScore: hotel.starRating,
        numberOfReviews: hotel.numberOfReview,
        lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value,
        id: hotel.ID,
        lat: hotel.GeoLocation.Latitude,
        lng: hotel.GeoLocation.Longitude,
        description: hotel.description,
        pets_allowed: hotel.petsAllowed,
        pet_fee_value: hotel.petFeeValue,
        pet_fee: hotel.petFee,
        pet_allowance: hotel.petAllowance,
        pet_size: hotel.petSize,
      }

    }
  }

  useEffect(() => {
    if (data && data.getHotels && data.getHotels.sessionId) {
      setSessionId(data.getHotels.sessionId);
      const filteredHotels = [];
      const markers = [];
      let min = 0;
      let max = 0;

      for (const hotel of data.getHotels.hotels) {
        if (hotel.SuppliersLowestPackagePrices[0].Value < min) {
          min = hotel.SuppliersLowestPackagePrices[0].Value
        }
        if (hotel.SuppliersLowestPackagePrices[0].Value > max) {
          max = hotel.SuppliersLowestPackagePrices[0].Value
        }

        const restructuredHotel = formatHotel(hotel)
        filteredHotels.push(restructuredHotel)
        markers.push(restructuredHotel)
      }

      const readyHotels = filteredHotels.sort(function (a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })

      setMinPrice(min);
      setMaxPrice(max)
      setSliderValue([min, max])

      setFormatHotels(readyHotels)
      setHotels(readyHotels)
      setMarkers(markers);
    }

  }, [data, search, center])

  const sortHotelsBy = (toSortHotels, type) => {
    switch (type) {
      case 'alphabetSort':
        return toSortHotels.sort(function (a, b) {
          const textA = a.name.toUpperCase();
          const textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
      case 'priceSort_low_to_high':
        return toSortHotels.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice);
      case 'priceSort_high_to_low':
        return toSortHotels.sort((a, b) => b.lowestAveragePrice - a.lowestAveragePrice);
      case 'featured':
        return toSortHotels
      case 'highest_rating':
        return toSortHotels.sort((a, b) => b.romingoScore - a.romingoScore);
      default:
        return toSortHotels
    }
  }

  //TODO: add amenities
  useEffect(() => {
    if (data?.getHotels?.hotels?.length > 0) {
      
      const newHotels = formatHotels.filter(hotel => {
        const starRating = hotel.romingoScore ? hotel.romingoScore.toString().charAt(0) : 0
        return (hotel.lowestAveragePrice >= sliderValue[0] && 
          hotel.lowestAveragePrice <= sliderValue[1] &&
          hotel.name.toLowerCase().includes(query.toLowerCase()) &&
          rating[starRating])
      })
      const sorted = sortHotelsBy(newHotels, sort)
      setHotels(sorted)
      setMarkers(newHotels)
    }
  }, [shouldFilter, rating])


  const handleSearch = (e) => {
    setQuery(e.target.value);
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      setShouldFilter(!shouldFilter)
    }, 300)
    setTimer(newTimer)
  }

  const handleSort = (e) => {
    setSort(e.target.value)
    const sorted = sortHotelsBy(hotels, e.target.value)
    setHotels(sorted)
  }

  const valuetext = (value: number) => {
    return value;
  }

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  }

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setRating({
       ...rating,
       [event.target.name]: event.target.checked,
     });
   };


  if (loading) {
    return <Loader size="400px" />
  }

  return (
    <Grid sx={{ background: "#feffff" }}>
      <Navbar />
      {mobile ?
        <Box sx={{ width: '95%', margin: '10px auto' }}>
          <DesktopFilterBarNew city={search.city} />
        </Box> : <LargeFilterBar />}
      <Grid container direction='row' style={{ padding: mobile ? '0' : '30px', width: mobile ? '100%' : '80%', margin: 'auto', position: 'relative', }} >
        {mobile ?
          <Grid item container justifyContent='space-between' style={{ padding: '0 10px' }}>
            <Button variant="outlined" style={{ width: '48%', marginBottom: 10 }} onClick={() => setOpenMap(true)}>
              View on full map
            </Button>
            <Button variant="outlined" style={{ width: '48%', marginBottom: 10 }} onClick={() => setViewFilters(true)}>
              View filters
            </Button>
          </Grid> :
          <Grid item xs={0} sm={0} md={4} >
            <Box sx={{ display: "flex", my: 2, width: "100%" }}>
              <Map center={{ lat: search.lat, lng: search.lng }}
                height={300}
                zoom={11}
                selectedMarker={0}
                markers={markers}
              />
            </Box>
            <Button variant="outlined" style={{ width: '100%', marginBottom: 10, }} onClick={() => setOpenMap(true)}>
              View on full map
            </Button>

            <TextField label="Search by property name" variant="filled" fullWidth onChange={handleSearch} />
      
            <Typography style={{ marginTop: 10 }}>Filter By</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Pool" />
              <FormControlLabel control={<Checkbox />} label="Pet Friendly" />
              <FormControlLabel control={<Checkbox />} label="Hot Tub" />
              <FormControlLabel control={<Checkbox />} label="Bed & breakfast" />
              <FormControlLabel control={<Checkbox />} label="Condo" />
            </FormGroup>
            <Typography>Price per night</Typography>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={sliderValue}
              onChange={handleSliderChange}
              onChangeCommitted={() => setShouldFilter(!shouldFilter)}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={minPrice}
              step={1}
              max={maxPrice}
              marks={[
                {
                  value: sliderValue[0],
                  label: `$${sliderValue[0]}`
                },
                {
                  value: sliderValue[1],
                  label: `$${sliderValue[1]}`
                }
              ]}
              sx={{ ml: '1em', width: '90%', maxWidth: '240px' }}
            />
            <Typography>Guest Rating</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox name="1" checked={rating['1']} />} onChange={handleRatingChange} label="1" />
              <FormControlLabel control={<Checkbox name="2" checked={rating['2']} />} onChange={handleRatingChange} label="2" />
              <FormControlLabel control={<Checkbox name="3" checked={rating["3"]} />} onChange={handleRatingChange} label="3" />
              <FormControlLabel control={<Checkbox name="4" checked={rating["4"]} />} onChange={handleRatingChange} label="4" />
              <FormControlLabel control={<Checkbox name="5" checked={rating["5"]} />} onChange={handleRatingChange} label="5" />
            </FormGroup>
          </Grid>}

        <Grid item xs={12} sm={12} md={8} style={{ padding: mobile ? '0 10px' : '0 30px', width: '96%' }}>
          <Grid item container direction='row'>
            <Grid item container direction='row' justifyContent='space-between'>
              <Grid item>
                <Typography style={{ padding: '8px 20px' }}>{hotels.length} properties</Typography>
                <Chip
                   size="small"
                   label="Clear all filters"
                   onDelete={() => {
                     
                     setRating({'0': false, '1': true, '2': true, '3': true, '4': true, '5': true})
                     setQuery('')
                     setSliderValue([min, max])
                     //TODO: amenities
                   }}
                 />
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
                    <MenuItem value={'priceSort_low_to_high'}>Price sort (low to high)</MenuItem>
                    <MenuItem value={'priceSort_high_to_low'}>Price sort (high to low)</MenuItem>
                    <MenuItem value={'highest_rating'}>Highest Rating</MenuItem>
                    <MenuItem value={'featured'}>Featured</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CardList cards={hotels} sessionId={sessionId} />
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
              size="large">
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
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filters
            </Typography>
          </Toolbar>
        </AppBar>
        <Box style={{ padding: 20 }}>
          <TextField id="outlined-basic" label="Search by property name" variant="outlined" value={query} fullWidth onChange={handleSearch} />
          <Typography style={{ marginTop: 10 }}>Filter By</Typography>
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
            <FormControlLabel control={<Checkbox name="1" checked={rating["1"]} />} label="1" />
            <FormControlLabel control={<Checkbox name="2" checked={rating["2"]} />} label="2" />
            <FormControlLabel control={<Checkbox name="3" checked={rating["3"]} />} label="3" />
            <FormControlLabel control={<Checkbox name="4" checked={rating["4"]} />} label="4" />
            <FormControlLabel control={<Checkbox name="5" checked={rating["5"]} />} label="5" />
          </FormGroup>
        </Box>
      </Dialog>
    </Grid>
  );
}

export default (ListingPageNew);
