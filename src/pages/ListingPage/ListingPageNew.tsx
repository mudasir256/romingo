import { withStyles } from "@mui/styles";
import { Box, Button, Checkbox, FormControl, Radio, RadioGroup, FormControlLabel, FormGroup, Grid, InputLabel, Link, MenuItem, Slider, TextField, Dialog, AppBar, Toolbar, IconButton, useMediaQuery, Divider } from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import FilterBar from "../../components/MobileHomePageFilterBar";
import { DesktopFilterBar } from "../Cities/DesktopFilterBar";
import { DesktopFilterBarNew } from "../Cities/DesktopFilterBarNew";
import Loader from "../../components/UI/Loader";
import Chip from '@mui/material/Chip'
import { Dispatch } from "redux";
import { saveSearch } from "../../store/searchReducer";
import { setList } from "../../store/hotelListReducer";
import { useHistory } from "react-router-dom";


const ListingPageNew = ({ ...props }) => {

  const initialAmenityFilterState = {
    pool: false,
    airportShuttle: false,
    parking: false,
    spa: false,
    kitchen: false,
    wifiIncluded: false,
    restaurant: false,
    gym: false,
    cribs: false,
    washerAndDryer: false,
    dryCleaning: false,
    wheelchairAccessible: false,
    smokeFree: false
  }

  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory();

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
  const [filterAmenities, setFilterAmenities] = useState(initialAmenityFilterState)
  const [petWeights, setPetWeights] = useState('all')  
  const [allowsCats, setAllowsCats] = useState(false)
  const [hasNoPetFees, setHasNoPetFees] = useState(false)

  const [query, setQuery] = useState('');
  const [sliderValue, setSliderValue] = useState(0)
  const [shouldFilter, setShouldFilter] = useState(false)
  const [openMap, setOpenMap] = useState(false)
  const [viewFilters, setViewFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [timer, setTimer] = useState(null)

  const mobile = useMediaQuery("(max-width:800px)");

  const childrenAge = search?.occupants?.children > 0 ? search?.occupants?.childrenAge : []

  const { data, loading } = useQuery(
    gql`${GetHotelsByLocation(search.occupants.adults + '', parseInt(moment(search.checkIn).format('x')), parseInt(moment(search.checkOut).format('x')), childrenAge, search.lat, search.lng)}`);

  const cards = useSelector((state: any) => {
    return state.hotelListReducer.hotels;
  });

  const start = search.checkIn.substring(0, 10)
  const end = search.checkOut.substring(0, 10)
  
  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


  const formatHotel = (hotel) => {

    return {
      imageURLs: [hotel.DefaultImage.FullSize],
      alias: hotel.alias,
      name: hotel.DisplayName,
      addressLine1: hotel.Address,
      city: hotel.city,
      state: hotel.state,
      zipcode: hotel.zipcode,
      petFeePolicy: { maxPets: 0 },
      romingoScore: hotel.starRating,
      numberOfReviews: hotel.numberOfReview,
      lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value / diffDays,
      id: hotel.ID,
      lat: hotel.GeoLocation.Latitude,
      lng: hotel.GeoLocation.Longitude,
      description: hotel.description,
      pets_allowed: hotel.petsAllowed,
      pet_fee_value: hotel.petFeeValue,
      pet_fee: hotel.petFee,
      pet_allowance: hotel.petAllowance,
      pet_size: hotel.petSize,
      cat_policy: hotel.catPolicy,
      travolutionaryId: hotel.travolutionaryId,
      amenities: hotel.amenities?.map(amenity => amenity.code) || [],

      //marker
      type: 'hotel',
      label: hotel.DisplayName,
      hotel: {
        imageURLs: [hotel.DefaultImage.FullSize],
        name: hotel.DisplayName,
        alias: hotel.alias,
        addressLine1: hotel.Address,
        city: hotel.city,
        state: hotel.state,
        zipcode: hotel.zipcode,
        petFeePolicy: { maxPets: 0 },
        romingoScore: hotel.starRating,
        numberOfReviews: hotel.numberOfReview,
        lowestAveragePrice: hotel.SuppliersLowestPackagePrices[0].Value / diffDays,
        id: hotel.ID,
        lat: hotel.GeoLocation.Latitude,
        lng: hotel.GeoLocation.Longitude,
        description: hotel.description,
        pets_allowed: hotel.petsAllowed,
        pet_fee_value: hotel.petFeeValue,
        pet_fee: hotel.petFee,
        pet_allowance: hotel.petAllowance,
        pet_size: hotel.petSize,
        cat_policy: hotel.catPolicy
      }

    }
  }

  useEffect(() => {
    if (history.action === 'POP') {
      loadHotels(cards)
      return
    }

    if (data && data.getHotels && data.getHotels.sessionId) {
      setSessionId(data.getHotels.sessionId);
      loadHotels(data.getHotels.hotels)
      dispatch(setList(data.getHotels.hotels))
    }

  }, [data, search, center])

  const loadHotels = (hotels) => {

    const filteredHotels = [];
    const markers = [];
    let min = 0;
    let max = 0;
    for (const hotel of hotels) {
      if (hotel.SuppliersLowestPackagePrices[0].Value / diffDays < min) {
        min = hotel.SuppliersLowestPackagePrices[0].Value / diffDays
      }
      if (hotel.SuppliersLowestPackagePrices[0].Value / diffDays > max) {
        max = hotel.SuppliersLowestPackagePrices[0].Value / diffDays
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

    min = parseFloat(Math.abs(min).toFixed(2))
    max = parseFloat(Math.abs(max).toFixed(2))

    setMinPrice(min);
    setMaxPrice(max)
    setSliderValue([min, max])

    setFormatHotels(readyHotels)
    setHotels(readyHotels.filter(hotel => hotelPetAllowance(hotel)))
    setMarkers(markers);
  }

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

  const hotelHasAmenities = (list, hotel) => {
    const amenities = Object.keys(list).filter(key => list[key])
    let passed = true
    for (let i = 0; i < amenities.length; i++) {  
      const amenity = amenities[i]
      if (amenity === 'pool') {
        passed = hotel.amenities.some(item => item == 66 || item == 71)
      } else if (amenity === 'airportShuttle') {
        passed = hotel.amenities.some(item => item == 41 || item == 282)
      } else if (amenity === 'parking') {
        passed = hotel.amenities.some(item => item == 68 || item == 42)
      } else if (amenity === 'spa') {
        passed = hotel.amenities.some(item => item == 84)
      } else if(amenity === 'kitchen') {
        passed = hotel.amenities.some(item => item == 262)
      } else if (amenity === 'wifiIncluded') {
        passed = hotel.amenities.some(item => item == 179 || item == 259 || item == 261)
      } else if (amenity === 'restaurant') {
        passed = hotel.amenities.some(item => item == 76)
      } else if (amenity === 'gym') {
        passed = hotel.amenities.some(item => item == 48)
      } else if(amenity === 'cribs') {
        passed = hotel.amenities.some(item => item == 2017)
      } else if (amenity === 'washerAndDryer') {
        passed = hotel.amenities.some(item => item == 168)
      } else if (amenity === 'dryCleaning') { 
        passed = hotel.amenities.some(item => item == 96)
      } else if (amenity === 'wheelchairAccessible') {
        passed = hotel.amenities.some(item => item == 101)
      } else if (amenity === 'smokeFree') {
        passed = hotel.amenities.some(item => item == 312)
      } else {
        //not handled
      }
      if (passed === false) {
        return false
      }
    }
    return passed;

  }

  const hotelHasWeights = (value, hotel) => {
    const weight = parseInt(`${hotel.pet_size.charAt(0)}${hotel.pet_size.charAt(1)}`)

    switch (value) {
      case 'all':
        return hotel.pet_size === 'Any Size'
      case '75':
        return weight > 75 || hotel.pet_size === 'Any Size'
      case '50':
        return weight > 25 || hotel.pet_size === 'Any Size'
      case '25':
        return true
    }
  }

  const hotelPetAllowance = (hotel) => {
    const string = hotel.pet_allowance || hotel.petAllowance
    if (string === 'Unlimited') {
      return true
    }
    const allowance =  parseInt(`${string.charAt(0)}`)
    return (allowance >= search?.occupants.dogs)
  }

  useEffect(() => {
    if (data?.getHotels?.hotels?.length > 0) {
      
      const newHotels = formatHotels.filter(hotel => {
        const starRating = hotel.romingoScore ? hotel.romingoScore.toString().charAt(0) : 0
        
        return (hotel.lowestAveragePrice >= sliderValue[0] && 
          hotel.lowestAveragePrice <= sliderValue[1] &&
          hotel.name.toLowerCase().includes(query.toLowerCase()) &&
          rating[starRating] &&
          hotelHasAmenities(filterAmenities, hotel) && 
          (allowsCats ? hotel.cat_policy === 'Yes' : true) &&
          (hasNoPetFees ? hotel.pet_fee === 'NONE' : true) &&
          hotelHasWeights(petWeights, hotel) &&
          hotelPetAllowance(hotel)
        )
      })
      const sorted = sortHotelsBy(newHotels, sort)
      setHotels(sorted)
      setMarkers(newHotels)
    }
  }, [shouldFilter, filterAmenities, rating, hasNoPetFees, petWeights, allowsCats, search?.occupants?.dogs])


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

  const handleAmenityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAmenities({
      ...filterAmenities,
      [event.target.name]: event.target.checked,
    });
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPetWeights((event.target as HTMLInputElement).value);
  };

  const handlePetNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      saveSearch({
        ...search,
        occupants: {
          ...search?.occupants,
          dogs: event.target.value
        }
      })

    )
  }


  if (loading && history.action === 'PUSH') {
    return <Loader size="400px" />
  }

  return (
    <Grid sx={{ background: "#feffff" }}>
      <Navbar />
      {mobile 
        ?<FilterBar home={false} />
        : <LargeFilterBar />
      }
      {mobile && <Box mb="1rem"><Divider /></Box>}
      <Grid container direction='row' style={{ padding: mobile ? '0' : '30px', width: mobile ? '100%' : '80%', margin: 'auto', position: 'relative', }} >
        {mobile ?
          <Grid item container justifyContent='space-between' style={{ padding: '0 10px' }}>
            <Button variant="outlined" style={{ width: '48%', marginBottom: 10 }} onClick={() => setOpenMap(true)}>
              View on full map
            </Button>
            <Button variant="outlined" style={{ width: '48%', marginBottom: 10 }} onClick={() => setViewFilters(true)}>
              View filters
            </Button>
          </Grid>:
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

            <TextField label="Search by property name" variant="filled" fullWidth value={query} onChange={handleSearch} />
      

            <Box my="1rem">
              <Typography style={{ marginTop: 10, marginBottom: 10 }}>Pet Filters</Typography>

              <Box mb="1rem">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">Number of Pets</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={search?.occupants?.dogs}
                    label="Number of Pets"
                    onChange={handlePetNumberChange}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <RadioGroup defaultValue="all" value={petWeights} onChange={handleWeightChange}>
                <FormControlLabel value="25" control={<Radio />} label="Accepts 1-25 lbs" />
                <FormControlLabel value="50" control={<Radio />} label="Accepts 26-75 lbs" />
                <FormControlLabel value="75" control={<Radio />} label="Accepts 75+ lbs" />
                <FormControlLabel value="all" control={<Radio />} label="Accepts all pet weights" />
              </RadioGroup>
  
              <FormGroup onChange={() => setAllowsCats(!allowsCats)}>
                <FormControlLabel control={<Checkbox name="25" checked={allowsCats} />} label="Accepts cats" />
              </FormGroup>

              <FormGroup onChange={() => setHasNoPetFees(!hasNoPetFees)}>
                <FormControlLabel control={<Checkbox name="25" checked={hasNoPetFees} />} label="$0 pet fees" />
              </FormGroup>
            </Box>


            <Box my="1rem">
              <Typography style={{ marginTop: 10 }}>Amenities</Typography>
              <FormGroup onChange={handleAmenityChange}>
                <FormControlLabel control={<Checkbox name="pool" checked={filterAmenities["pool"]} />} label="Pool" />
                <FormControlLabel control={<Checkbox name="airportShuttle" checked={filterAmenities["airportShuttle"]} />} label="Airport shuttle service" />
                <FormControlLabel control={<Checkbox name="parking" checked={filterAmenities["parking"]} />} label="Parking" />
                <FormControlLabel control={<Checkbox name="spa" checked={filterAmenities["spa"]} />} label="Spa" />
                <FormControlLabel control={<Checkbox name="kitchen" checked={filterAmenities["kitchen"]} />} label="Kitchen" />
                <FormControlLabel control={<Checkbox name="wifiIncluded" checked={filterAmenities["wifiIncluded"]} />} label="WiFi included" />
                <FormControlLabel control={<Checkbox name="restaurant" checked={filterAmenities["restaurant"]} />} label="Restaurant" />
                <FormControlLabel control={<Checkbox name="gym" checked={filterAmenities["gym"]} />} label="Gym" />
                <FormControlLabel control={<Checkbox name="cribs" checked={filterAmenities["cribs"]} />} label="Cribs" />
                <FormControlLabel control={<Checkbox name="washerAndDryer" checked={filterAmenities["washerAndDryer"]} />} label="Washer and Dryer" />
                <FormControlLabel control={<Checkbox name="dryCleaning" checked={filterAmenities["dryCleaning"]} />} label="Dry-cleaning service" />
                <FormControlLabel control={<Checkbox name="wheelchairAccessible" checked={filterAmenities["wheelchairAccessible"]} />} label="Wheelchair access" />
                <FormControlLabel control={<Checkbox name="smokeFree" checked={filterAmenities["smokeFree"]} />} label="Smoke-free property" />
              </FormGroup>
            </Box>

            <Box my="1rem">
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
            </Box>

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
            <Grid item container direction='row' justifyContent='space-between' alignItems="center">
              <Grid item>
                <Box sx={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                  <Typography style={{ padding: '8px 20px' }}>{hotels.length} properties</Typography>
                  {!mobile && 
                    <Chip
                     size="small"
                     label="clear all filters"
                     onDelete={() => {
                       setRating({'0': false, '1': true, '2': true, '3': true, '4': true, '5': true})
                       setQuery('')
                       setSliderValue([minPrice, maxPrice])
                       setShouldFilter(!shouldFilter)
                       setFilterAmenities(initialAmenityFilterState)
                       setHasNoPetFees(false)
                       setAllowsCats(false)
                       setPetWeights('all')
                     }}
                   />
                  }
                 </Box>
              </Grid>
              <Grid item >
                <FormControl fullWidth size="small">
                  <Select
                    value={sort}
                    onChange={handleSort}
                    variant='standard'
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
         <Chip
          size="medium"
          sx={{ py: '0.5rem', cursor: 'pointer' }}
          label="clear all filters"
          deleteIcon={<></>}
          onClick={() => {
            setRating({'0': false, '1': true, '2': true, '3': true, '4': true, '5': true})
            setQuery('')
            setSliderValue([minPrice, maxPrice])
            setShouldFilter(!shouldFilter)
            setFilterAmenities(initialAmenityFilterState)
            setHasNoPetFees(false)
            setAllowsCats(false)
            setPetWeights('all')
          }}
        />
        <Box style={{ padding: 20 }}>
          <TextField id="outlined-basic" label="Search by property name" variant="outlined" value={query} fullWidth onChange={handleSearch} />
         
          <Box my="1.5rem">
            <Typography style={{ marginTop: 10, marginBottom: 10 }}>Pet Filters</Typography>

            <Box mb="1rem">
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">Number of Pets</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={search?.occupants?.dogs}
                  label="Number of Pets"
                  onChange={handlePetNumberChange}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <RadioGroup defaultValue="all" value={petWeights} onChange={handleWeightChange}>
              <FormControlLabel value="25" control={<Radio />} label="Accepts 1-25 lbs" />
              <FormControlLabel value="50" control={<Radio />} label="Accepts 26-75 lbs" />
              <FormControlLabel value="75" control={<Radio />} label="Accepts 75+ lbs" />
              <FormControlLabel value="all" control={<Radio />} label="Accepts all pet weights" />
            </RadioGroup>
          
            <FormGroup onChange={() => setAllowsCats(!allowsCats)}>
              <FormControlLabel control={<Checkbox name="25" checked={allowsCats} />} label="Accepts cats" />
            </FormGroup>

            <FormGroup onChange={() => setHasNoPetFees(!hasNoPetFees)}>
              <FormControlLabel control={<Checkbox name="25" checked={hasNoPetFees} />} label="$0 pet fees" />
            </FormGroup>
          </Box>

          <Typography style={{ marginTop: '1.5rem' }}>Amenities</Typography>
          <FormGroup onChange={handleAmenityChange}>
            <FormControlLabel control={<Checkbox name="pool" checked={filterAmenities["pool"]} />} label="Pool" />
            <FormControlLabel control={<Checkbox name="airportShuttle" checked={filterAmenities["airportShuttle"]} />} label="Airport shuttle service" />
            <FormControlLabel control={<Checkbox name="parking" checked={filterAmenities["parking"]} />} label="Parking" />
            <FormControlLabel control={<Checkbox name="spa" checked={filterAmenities["spa"]} />} label="Spa" />
            <FormControlLabel control={<Checkbox name="kitchen" checked={filterAmenities["kitchen"]} />} label="Kitchen" />
            <FormControlLabel control={<Checkbox name="wifiIncluded" checked={filterAmenities["wifiIncluded"]} />} label="WiFi included" />
            <FormControlLabel control={<Checkbox name="restaurant" checked={filterAmenities["restaurant"]} />} label="Restaurant" />
            <FormControlLabel control={<Checkbox name="gym" checked={filterAmenities["gym"]} />} label="Gym" />
            <FormControlLabel control={<Checkbox name="cribs" checked={filterAmenities["cribs"]} />} label="Cribs" />
            <FormControlLabel control={<Checkbox name="washerAndDryer" checked={filterAmenities["washerAndDryer"]} />} label="Washer and Dryer" />
            <FormControlLabel control={<Checkbox name="dryCleaning" checked={filterAmenities["dryCleaning"]} />} label="Dry-cleaning service" />
            <FormControlLabel control={<Checkbox name="wheelchairAccessible" checked={filterAmenities["wheelchairAccessible"]} />} label="Wheelchair access" />
            <FormControlLabel control={<Checkbox name="smokeFree" checked={filterAmenities["smokeFree"]} />} label="Smoke-free property" />

          </FormGroup>

          <Box my="1rem">
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
              sx={{ ml: '1em', width: '85%', }}
            />
          </Box>

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
