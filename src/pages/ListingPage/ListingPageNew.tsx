import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Select,
  Typography,
  Chip
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { LargeFilterBar } from '../../components/LargeFilterBar';
import CardList from "../../components/CardList";
import Map from "../../components/UI/Map";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import FilterBar from "../../components/MobileHomePageFilterBar/MobileHomePageFilterBar";
import Loader from "../../components/UI/Loader";
import { Dispatch } from "redux";
import { saveSearch } from "../../store/searchReducer";
import { setList } from "../../store/hotelListReducer";
import { useNavigate } from "react-router-dom";
import WhitePawsIcon from '../../assets/icon/white-paws.png';
import {
  Edit,
  Close as CloseIcon
} from '@mui/icons-material'
import useHotelsQuery from "../../hooks/UseHotelsQuery";

import Filters from "./Filters";

const styles = {
  sidebarSection: { 
    my: '3rem',
    width: '100%'
  }
}

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
  const amenityTitle = {
    pool: 'Pool',
    airportShuttle: 'Airport shuttle',
    parking: 'Parking',
    spa: 'Spa',
    kitchen: 'Kitchen',
    wifiIncluded: 'WiFi included',
    restaurant: 'Restaurant',
    gym: 'Gym',
    cribs: 'Cribs',
    washerAndDryer: 'Washer and dryer',
    dryCleaning: 'Dry cleaning',
    wheelchairAccessible: 'Wheelchair accessible',
    smokeFree: 'Smoke-free property'
  }

  const PET_LABEL_WEIGHT = {
    '25': '1-25 lbs',
    '50': '26-75 lbs',
    '75': '75+ lbs'
  }
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  // const [sessionId, setSessionId] = useState('')
  const [formatHotels, setFormatHotels] = useState([]);
  const search = useSelector((state: any) => state.searchReducer.search);
  
  const [center, setCenter] = useState({ lat: search.latitude, lng: search.longitude })
  const [markers, setMarkers] = useState([]);
  const [sort, setSort] = useState('featured');
  const [selectedCity, setSelectedCity] = useState(search.city)
  
  const [hotelRating, setHotelRating] = useState({'0': false, '1': true, '2': true, '3': true, '4': true, '5': true});
  const [rating, setRating] = useState({'0': false, '1': true, '2': true, '3': true, '4': true, '5': true});
  const [filterAmenities, setFilterAmenities] = useState(initialAmenityFilterState)
  const [petWeights, setPetWeights] = useState(null)  
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

  const [showInfoBox, setShowInfoBox] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)

  const [displayHotels, setDisplayHotels] = useState([]);
  const [displayLoader, setDisplayLoader] = useState(true);
  const {hotels, loading, loadingMore, sessionId} = useHotelsQuery({
    search: search,
    maxWaitInSeconds: 2,
    childrenAge: search?.occupants?.children > 0 ? search?.occupants?.childrenAge : []
  })

  //TODO: doesn't handle number of pets currently MOBILE
  const [previousFilterState, setPreviousFilterState] = useState({
    query,
    sliderValue,
    minPrice,
    maxPrice,
    filterAmenities,
    rating,
    allowsCats,
    hasNoPetFees,
    petWeights,
    hotelRating
  })

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const cards = useSelector((state: any) => {
    return state.hotelListReducer.hotels;
  });

  const [oldSearch, setOldSearch] = useState();

  const start = search.checkIn.substring(0, 10)
  const end = search.checkOut.substring(0, 10)

  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  // NOTE: begin helper and handler functions
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2-lat1);  // deg2rad below
      const dLon = deg2rad(lon2-lon1); 
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    const calculateCardScore = (km, rating, price, petFee) => {
      let score = 0;
      if (km < 1.60934) {
        score = score + 150
      } else if (km < 3.2) {
        score = score + 125
      } else if (km < 8.04) {
        score = score + 75
      } else if (km < 11.26) {
        score = score + 50
      } else if (km < 16.09) {
        score = score + 25
      } else if (km < 32.18) {
        score = score + 10
      }

      if (rating == '4' || rating == '4.5') {
        if ((price >= 0 && price <= 400)) {
          score = score + 150
        } else if (price > 400) {
          score = score + 50
        }
      } 
      if (rating == '3' || rating == '3.5') {
        if ((price >= 0 && price <= 250)) {
          score = score + 125
        } else if (price > 250) {
          score = score + 75
        }
      }
      if (rating == '2' || rating == '2.5') {
        score = score - 50
      }
      if (rating == '5') {
        score = score - 25
      }

      if (petFee === 'NONE' || petFee === 'No Additional Charges') {
        score = score + 40
      } else {
        const value = parseInt(petFee?.split('.')?.find(item => true)?.slice(1))
        if (value < 100) {
          score = score + 20
        }
      }
      return score
    }

    const formatHotel = (hotel, tag) => {

      const pricing = hotel?.Packages?.find(item => true)?.SimplePrice || hotel?.SuppliersLowestPackagePrices?.find(item => true)?.Value
      

      const tax = (parseFloat(hotel?.travoTaxRate || hotel?.taxRate || 0) * pricing)
      const priceWithoutTax = pricing - tax
      const markup = priceWithoutTax * .15
      const extraFees = parseFloat(hotel.extraFees?.find(fee => fee.FeeTitle === 'resort_fee')?.Value) || 0
      const total = pricing + markup + extraFees;

      const km = getDistanceFromLatLonInKm(hotel.GeoLocation.Latitude, hotel.GeoLocation.Longitude, search.lat, search.lng)
      const pointValue = calculateCardScore(km, hotel.starRating, ((pricing - tax) + markup) / diffDays, hotel.petFee)

      return {
        pointValue,
        extraFees,
        tax,
        isSelect: tag === 'IS_SELECT',
        isRomingoFavorite: tag === 'IS_ROMINGO_FAVORITE',
        isTrending: tag === 'IS_POPULAR',
        imageURLs: hotel.images || [hotel.DefaultImage.FullSize],
        alias: hotel.alias,
        name: hotel.hotelName || '',
        addressLine1: hotel.addressLine,
        city: hotel.city,
        state: hotel.state,
        zipcode: hotel.zipcode,
        petFeePolicy: { maxPets: 0 },
        hotelStarRating: hotel.StarRating,
        romingoScore: hotel.starRating,
        numberOfReviews: hotel.numberOfReviews,
        lowestAveragePrice: (priceWithoutTax) / diffDays,
        totalPrice: total,
        id: hotel.ID,
        lat: hotel.GeoLocation.Latitude,
        lng: hotel.GeoLocation.Longitude,
        distanceFromSearch: km,
        description: hotel.description,
        pets_allowed: hotel.petsAllowed,
        pet_fee_value: hotel.petFeeValue,
        pet_fee: hotel.petFee,
        pet_allowance: hotel.petAllowance,
        pet_size: hotel.petSize,
        petBowls: hotel.petBowls,
        petBeds: hotel.petBeds,
        cat_policy: hotel.catPolicy,
        travolutionaryId: hotel.travolutionaryId,
        amenities: hotel.amenities?.map(amenity => amenity.code) || [],

        //marker
        type: 'hotel',
        label: hotel.DisplayName,
        hotel: {
          pointValue,
          extraFees,
          tax,
          isSelect: tag === 'IS_SELECT',
          isRomingoFavorite: tag === 'IS_ROMINGO_FAVORITE',
          isTrending: tag === 'IS_POPULAR',
          imageURLs: hotel.images || [hotel.DefaultImage.FullSize],
          name: hotel.DisplayName,
          alias: hotel.alias,
          addressLine1: hotel.addressLine,
          city: hotel.city,
          state: hotel.state,
          zipcode: hotel.zipcode,
          petFeePolicy: { maxPets: 0 },
          hotelStarRating: hotel.StarRating,
          romingoScore: hotel.starRating,
          numberOfReviews: hotel.numberOfReview,
          lowestAveragePrice: ((priceWithoutTax) / diffDays),
          totalPrice: (pricing),
          id: hotel.ID,
          lat: hotel.GeoLocation.Latitude,
          lng: hotel.GeoLocation.Longitude,
          distanceFromSearch: km,
          description: hotel.description,
          pets_allowed: hotel.petsAllowed,
          pet_fee_value: hotel.petFeeValue,
          pet_fee: hotel.petFee,
          pet_allowance: hotel.petAllowance,
          pet_size: hotel.petSize,
          petBowls: hotel.petBowls,
          petBeds: hotel.petBeds,
          cat_policy: hotel.catPolicy
        }

      }
    }

    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    const createTenOf = () => {
      const tags = ['IS_SELECT', 'IS_SELECT', 'IS_SELECT', 'IS_SELECT', 'IS_POPULAR', 'IS_POPULAR', 'IS_ROMINGO_FAVORITE', "NONE", 'NONE', 'NONE']
      const shuffled = shuffle(tags)
      return shuffled
    }

    const loadHotels = () => {
      const hotelsWithTaxRate = hotels.filter(h => h.taxRate);

      const filteredHotels = [];
      const markers = [];
      let min = 0;
      let max = 0;

      const newHotels = hotels.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.ID === value.ID
        ))
      )

      let tags = []

      for (let z = 0; z < newHotels.length; z++) {
        if (z % 10 === 0) {
          tags = createTenOf()
        }
        const tag = tags[(z % 10)]

        const hotel = newHotels[z]
        const pricing = hotel?.Packages?.find(item => true)?.SimplePrice || hotel?.SuppliersLowestPackagePrices?.find(item => true)?.Value

        if (pricing / diffDays < min) {
          min = pricing / diffDays
        }
        if (pricing / diffDays > max) {
          max = pricing / diffDays
        }

        const restructuredHotel = formatHotel(hotel, tag)
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
      setMaxPrice(max);
      setSliderValue([min, max]);
      setFormatHotels(readyHotels);

      const sorted = sortHotelsBy(readyHotels, sort);
      const finalHotels = sorted.filter((hotel: any) => hotelPetAllowance(hotel));

      let newDisplayHotels = [];
      if(loadingMore || search != oldSearch) {
        newDisplayHotels = finalHotels;
        newDisplayHotels[0].isSelect = true;
        newDisplayHotels[0].isRomingoFavorite = false;
        newDisplayHotels[0].isTrending = false;
      } else {
        const filteredFinalHotels = finalHotels.filter((h: any)=> !displayHotels.find((val: any) => val.id == h.id));
        newDisplayHotels = displayHotels.concat(filteredFinalHotels);
      }

      setOldSearch(search);
      setDisplayHotels(newDisplayHotels);
      setMarkers(markers);
      setDisplayLoader(false);

      dispatch(setList({ hotels: newDisplayHotels, markers }));
    }

    // Util, can be removed and imported from elsewhere
    const compareNumsWithNaN = (
      a: number | typeof NaN,
      b: number | typeof NaN,
      callback: (arg0: number, arg1: number) => number
    ) => {
      const aIsNaN = Number.isNaN(a);
      const bIsNan = Number.isNaN(b);
      if(aIsNaN && bIsNan) {
        return 0;
      } else if (aIsNaN) {
        return 1;
      } else if (bIsNan) {
        return -1;
      } else {
        return callback(a,b);
      }
    }

    const sortHotelsBy = (toSortHotels, type) => {
      if (toSortHotels.length === 0) {
        return []
      }
      const sortableHotels = [...toSortHotels];

      switch (type) {
        case 'alphabetSort': {
          return sortableHotels.sort(function (a, b) {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          })
        }
        case 'priceSort_low_to_high': {
          return sortableHotels.sort((a, b) => compareNumsWithNaN(
            a.lowestAveragePrice, 
            b.lowestAveragePrice, 
            (x: number, y: number) => x - y
          ));
        }
        case 'priceSort_high_to_low': {
          return sortableHotels.sort((a, b) => compareNumsWithNaN(
            a.lowestAveragePrice, 
            b.lowestAveragePrice, 
            (x: number, y: number) => y - x
          ));
        }
        case 'featured': {
          const sortableByDistance = [...sortableHotels];
          const ordered = sortableByDistance.sort((a, b) => a.distanceFromSearch - b.distanceFromSearch)
          const closest = ordered[0]

          // ordered.shift()
          // const fourStars = ordered.filter(a =>
          //   (a.romingoScore == '4' || a.romingoScore == '4.5') && 
          //   (a.lowestAveragePrice >= 100 && a.lowestAveragePrice <= 400)
          // )
          // const threeStars = ordered.filter(a =>
          //   (a.romingoScore == '3' || a.romingoScore == '3.5') && 
          //   (a.lowestAveragePrice >= 50 && a.lowestAveragePrice <= 200)
          // )

          //does this remove from back ordered?
          const unique = [...new Set([
            closest,
            ...sortableHotels.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice).sort((a, b) => a.pointValue - b.pointValue < 0 ? 1 : -1)
            // ...fourStars.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice).sort((a, b) => b.romingoScore - a.romingoScore).sort((a, b) => a.distanceFromSearch - b.distanceFromSearch),
            // ...threeStars.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice).sort((a, b) => b.romingoScore - a.romingoScore).sort((a, b) => a.distanceFromSearch - b.distanceFromSearch),
            // ...ordered.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice).sort((a, b) => b.romingoScore - a.romingoScore)
          ])]

          return unique
          // const noFees = toSortHotels.filter(a => a.pet_fee_value === 'NONE' && (a.romingoScore == '4' || a.romingoScore == '4.5' || a.romingoScore == '3.5' || a.romingoScore == '3'))
          // const fees = toSortHotels.filter(a => a.pet_fee_value !== 'NONE' && (a.romingoScore == '4' || a.romingoScore == '4.5' || a.romingoScore == '3.5' || a.romingoScore == '3'))
          // const exclude = toSortHotels.filter(a => (a.romingoScore != '4' && a.romingoScore != '4.5' && a.romingoScore != '3.5' && a.romingoScore != '3'))
          // return [...noFees.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice).sort((a, b) => b.romingoScore - a.romingoScore), ...fees.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice).sort((a, b) => b.romingoScore - a.romingoScore), ...exclude.sort((a, b) => a.lowestAveragePrice - b.lowestAveragePrice)]
        }
        case 'highest_rating': {
          return sortableHotels.sort((a, b) => b.romingoScore - a.romingoScore);
        }
        default: {
          return sortableHotels
        }
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
        case '75':
          return weight > 75 || hotel.pet_size === 'Any Size'
        case '50':
          return weight > 25 || hotel.pet_size === 'Any Size'
        case '25':
          return true
        default:
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
      const sorted = sortHotelsBy(displayHotels, e.target.value)
      setDisplayHotels(sorted)
    }

    const valuetext = (value: number) => {
      return value;
    }

    const handleSliderChange = (e) => {
      setSliderValue(e.target.value);
    }

    const handleHotelRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHotelRating({
        ...hotelRating,
        [event.target.name]: event.target.checked,
      });
    };

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

    const handlePetNumberChange = (number) => {
      dispatch(
        saveSearch({
          ...search,
          occupants: {
            ...search?.occupants,
            dogs: number
          }
        })

      )
    }

    const commitToFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setViewFilters(false)
    }

    const handleViewFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setViewFilters(true)
      setPreviousFilterState({
        query,
        sliderValue,
        minPrice,
        maxPrice,
        filterAmenities,
        rating,
        allowsCats,
        hasNoPetFees,
        petWeights,
        hotelRating
      })
    }

    const handleCancelFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
      setViewFilters(false)
      setQuery(previousFilterState.query)
      setSliderValue(previousFilterState.sliderValue)
      setMinPrice(previousFilterState.minPrice)
      setMaxPrice(previousFilterState.maxPrice)
      setFilterAmenities(previousFilterState.filterAmenities)
      setRating(previousFilterState.rating)
      setAllowsCats(previousFilterState.allowsCats)
      setHasNoPetFees(previousFilterState.hasNoPetFees)
      setPetWeights(previousFilterState.petWeights)
      setHotelRating(previousFilterState.hotelRating)
    }
  // NOTE: end helper and handler functions

  useEffect(() => {
    if (!loading && hotels.length > 0) {
      const newHotels = formatHotels.filter(hotel => {
        const starRating = hotel.romingoScore ? hotel.romingoScore.toString().charAt(0) : 0
        const hotelRatingR = hotel.hotelStarRating ? hotel.hotelStarRating.toString().charAt(0) : 0

        return (hotel.lowestAveragePrice >= sliderValue[0]
          && hotel.lowestAveragePrice <= sliderValue[1]
          && hotel.name.toLowerCase().includes(query.toLowerCase())
          && rating[starRating]
          && hotelHasAmenities(filterAmenities, hotel)
          && (allowsCats ? hotel.cat_policy === 'Yes' : true)
          && (hasNoPetFees ? hotel.pet_fee_value === 'NONE' : true)
          && hotelHasWeights(petWeights, hotel)
          && hotelPetAllowance(hotel)
          && hotelRating[hotelRatingR]
        )
      })
      const sorted = sortHotelsBy(newHotels, sort)
      setDisplayHotels(sorted)
      setMarkers(newHotels)
    }
  }, [shouldFilter, filterAmenities, rating, hotelRating, hasNoPetFees, petWeights, allowsCats, search?.occupants?.dogs])

  // useEffect(() => {
  //   if (history.action === 'POP') {
  //     setMarkers(cards?.markers)
  //     setDisplayHotels(cards?.hotels)
  //   }
  // })

  useEffect(() => {
    // if (history.action === 'POP') {
    //   return
    // }
    if(!loading && hotels?.length) {
      setDisplayLoader(true);
      loadHotels();
      setShowSearchBar(false);
    }
  }, [hotels, center, search])

  useEffect(() => {
    sessionId && sessionStorage.setItem('sessionId', sessionId)
  },[sessionId]);

  if(loading || displayLoader) {
    return <Loader size="400px"/>
  }

  const Banner = () => (
    <Box sx={{
      width: "100%",
      backgroundColor: "#03989E",
      borderRadius: "6px",
      gap: "1rem",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      px: "0.5rem",
      py: "0.5rem",
    }}>
      <img width="40px" src={WhitePawsIcon} alt="White Paws Icon" />
      <Box sx={{ display: "flex", flexDirection: "column", color: "white", maxWidth: { xs: '300px', sm: '300px', md: '9999px', lg: '9999px' } }}>
        <Box sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
          <Typography variant="base" component="span">
            Save $20 off your reservation by using promo code&nbsp;
          </Typography>
          <Typography 
            component="span"
            sx={{
              fontWeight: 800,
              fontSize: '1.25rem',
              fontFamily: "sans-serif",
            }}
          >
            SUMMERPROMO20
          </Typography>
        </Box>
        <Typography variant="base" sx={{ fontSize: '0.8rem', mt: 1, ml: "auto" }}>
          *$400 minimum spend required
        </Typography>
      </Box>
    </Box>
  );
  

  return (
    <Box sx={{ background: "#feffff" }}>
      <Navbar />
      {mobile && 
        <Box>
          {!showSearchBar && 
            <Box 
              sx={{
                borderRadius: 5,
                border: '1px solid black',
                p: '1rem',
                m: '0.5rem',
                my: '1rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onClick={() => setShowSearchBar(true)}
            >
              <Box>
                <Typography variant="base"><b>{search.city?.description}</b></Typography>
                <Box display="flex" flexDirection="row" gap="2rem">
                  <Typography sx={{ fontSize: '12px'}}>{moment(search.checkIn).format('MMM DD')} - {moment(search.checkOut).format('MMM DD')}</Typography>
                  <Typography sx={{ fontSize: '12px'}}>{search.occupants.adults + search.occupants.children} Guests, {search.occupants.dogs} Pets</Typography>
                </Box>
              </Box>  
              <Box ml="auto">
                <Edit sx={{ fontSize: '18px', color: 'gray' }} />
              </Box>
            </Box>
          }
          {showSearchBar && 
            <Box mb="1rem">
              <FilterBar 
                home={false}
                mapOnPage
              />
              <Button fullWidth onClick={() => setShowSearchBar(false)}>Close</Button>
            </Box>
          }
        </Box>
      }

      <Grid
        container 
        direction='row' 
        justifyContent="center" 
        sx={{ 
          mt: "1rem", 
          px: { xs: 0, sm: 0, md: 0, lg: '6rem'},
        }} 
        style={{ margin: 'auto', position: 'relative', }} 
      >
        {mobile ? (
          <Grid item container justifyContent='space-between' style={{ padding: '0 10px' }}>
            <Button variant="outlined" style={{ width: '48%', marginBottom: 10 }} onClick={() => setOpenMap(true)}>
              View on full map
            </Button>
            <Button variant="outlined" style={{ width: '48%', marginBottom: 10 }} onClick={(e) => handleViewFilters(e)}>
              View filters
            </Button>
          </Grid>
        ) : ( 
          <Grid 
            item 
            xs={0} 
            sm={0} 
            md={2}
          >
            <Box sx={styles.sidebarSection}>
              <Box 
                sx={{ 
                  display: "flex",
                  width: '100%',
                  mb: 2
                }}
                onClick={() => setOpenMap(true)}
              >
                <Map 
                  center={{ lat: search.lat, lng: search.lng }}
                  height={250}
                  zoom={11}
                  selectedMarker={0}
                  markers={markers}
                  disabled
                />
              </Box>
              <Button variant="outlined" sx={{ width: '100%' }} onClick={() => setOpenMap(true)}>
                View on full map
              </Button>
            </Box>

            <Box 
              sx={styles.sidebarSection}
            >
              <TextField label="Search by property name" variant="filled" fullWidth value={query} onChange={handleSearch} />
            </Box>

            <Box 
              sx={styles.sidebarSection}
            >
              <Filters 
                search={search}
                handlePetNumberChange={handlePetNumberChange}
                showInfoBox={showInfoBox}
                setShowInfoBox={setShowInfoBox}
                petWeights={petWeights}
                handleWeightChange={handleWeightChange}
                setAllowsCats={setAllowsCats}
                allowsCats={allowsCats}
                setHasNoPetFees={setHasNoPetFees}
                hasNoPetFees={hasNoPetFees}
                filterAmenities={filterAmenities}
                handleAmenityChange={handleAmenityChange}
                sliderValue={sliderValue}
                handleSliderChange={handleSliderChange}
                setShouldFilter={setShouldFilter}
                shouldFilter={shouldFilter}
                valuetext={valuetext}
                minPrice={minPrice}
                maxPrice={maxPrice}
                handleHotelRatingChange={handleHotelRatingChange}
                hotelRating={hotelRating}
                handleRatingChange={handleRatingChange}
                rating={rating}
              />
            </Box>
          </Grid>
        )}
        <Grid 
          item 
          xs={12} 
          sm={12} 
          md={8} 
          sx={{ 
            p: '0.5rem',
            ml: { xs: 0, sm: 0, md: 0, lg: "2.5rem" },
          }}
        >
          <Grid
            item
            container
            direction='row'
            sx={{
              maxWidth: {xs: '650px', md: "760px"},
              mx: {xs: 'auto', md: 0}
            }}
          >
            {!mobile && 
              <Box textAlign="left" maxWidth="780px">
                <LargeFilterBar mapOnPage />
              </Box>
            }
            <Box my="0.75rem" textAlign="left" width="100%" maxWidth="742px" mr="1rem">
              <Banner />
            </Box>

            <Grid maxWidth="750px" item container direction='row' justifyContent='space-between' alignItems="center">
              <Grid item>
                <Box mt="0.5rem" sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Typography my="1rem">{displayHotels.length} properties</Typography>
                  {!mobile &&
                    <Chip
                      size="small"
                      label="clear all filters"
                      onDelete={() => {
                        setRating({'0': false, '1': true, '2': true, '3': true, '4': true, '5': true})
                        setHotelRating({'0': false, '1': true, '2': true, '3': true, '4': true, '5': true})
                        setQuery('')
                        setSliderValue([minPrice, maxPrice])
                        setShouldFilter(!shouldFilter)
                        setFilterAmenities(initialAmenityFilterState)
                        setHasNoPetFees(false)
                        setAllowsCats(false)
                        setPetWeights(null)
                      }}
                    />
                  }
                  {!mobile &&
                    <Box>
                      {petWeights &&
                        <Chip
                          size="small"
                          label={PET_LABEL_WEIGHT[petWeights]}
                          onDelete={() => setPetWeights(null)}
                        />
                      }
                      {allowsCats &&
                        <Chip
                          size="small"
                          label="Accepts cats"
                          onDelete={() => setAllowsCats(false)}
                        />
                      }
                      {hasNoPetFees &&
                        <Chip
                          size="small"
                          label="$0 pet fees"
                          onDelete={() => setHasNoPetFees(false)}
                        />
                      }
                      {(sliderValue[0] != minPrice || sliderValue[1] != maxPrice) &&
                        <Chip
                          size="small"
                          label="Custom Price Range"
                          onDelete={() => setValue([minPrice, maxPrice])}
                        />
                      }
                      {Object.keys(filterAmenities).map(filter => {
                        if (filterAmenities[filter]) {
                          return (
                            <Chip key={filter} size="small" label={amenityTitle[filter]} onDelete={() => {
                              const object = { ...filterAmenities }
                              object[filter] = false
                              setFilterAmenities(object)
                            }}/>
                          )
                        }
                      })}


                      {rating > 0 &&
                        <Chip
                          size="small"
                          label={`${rating} star hotel`}
                          onDelete={() => setRating(0)}
                        />
                      }
                    </Box>
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
                    <MenuItem value={'featured'}>Featured</MenuItem>
                    <MenuItem value={'priceSort_low_to_high'}>Price sort (low to high)</MenuItem>
                    <MenuItem value={'priceSort_high_to_low'}>Price sort (high to low)</MenuItem>
                    <MenuItem value={'highest_rating'}>Highest Rating</MenuItem>
                    <MenuItem value={'alphabetSort'}>Alphabet sort</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              maxWidth: {xs: '650px', md: "760px"},
              mx: {xs: 'auto', md: 0}
            }}
          >
            <CardList cards={displayHotels} sessionId={sessionId} search={search} />
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
        <Map 
          center={{ lat: search.lat, lng: search.lng }}
          zoom={11}
          selectedMarker={0}
          markers={markers}
          isFullScreen
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
              onClick={() => handleCancelFilters()}
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
        
          <Filters 
            search={search}
            handlePetNumberChange={handlePetNumberChange}
            showInfoBox={showInfoBox}
            setShowInfoBox={setShowInfoBox}
            petWeights={petWeights}
            handleWeightChange={handleWeightChange}
            setAllowsCats={setAllowsCats}
            allowsCats={allowsCats}
            setHasNoPetFees={setHasNoPetFees}
            hasNoPetFees={hasNoPetFees}
            filterAmenities={filterAmenities}
            handleAmenityChange={handleAmenityChange}
            sliderValue={sliderValue}
            handleSliderChange={handleSliderChange}
            setShouldFilter={setShouldFilter}
            shouldFilter={shouldFilter}
            valuetext={valuetext}
            minPrice={minPrice}
            maxPrice={maxPrice}
            handleHotelRatingChange={handleHotelRatingChange}
            hotelRating={hotelRating}
            handleRatingChange={handleRatingChange}
            rating={rating}
          />

          <Box mt="1rem">
            <Button fullWidth variant="contained" onClick={(e) => commitToFilters(e)} >Update</Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}

export default (ListingPageNew);
