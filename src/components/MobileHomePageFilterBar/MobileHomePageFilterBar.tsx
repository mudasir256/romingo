import { FC, useState, MouseEventHandler, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import {
  IconButton,
  Button,
  Box,
  Typography,
  Grid,
  CSSObject,
  TextField,
  Dialog,
  AppBar,
  Toolbar
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { saveSearch } from "../../store/searchReducer";
import { DateTime } from "luxon";

import {
  Calendar,
  withRange,
} from 'react-infinite-calendar';
import '../../mobileCalendar.css';
import GooglePlaceAutoComplete from '../GooglePlaceAutoComplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import OccupantSelector, { Occupant } from './OccupantSelector/OccupantSelector';
import DateRangeSelector from "./DateRangeSelector";
import LocationSelector from './LocationSelector';

interface FilterBarProps {
  sx?: CSSObject;
  home?: boolean;
  city?: string;
  onSearch?: any;
  forceWidth?: string;
  flag?: string;
  bookingId?: string;
}

const FilterBar: FC<FilterBarProps> = ({ sx, home = true, city = "", onSearch, forceWidth, flag, bookingId }) => {

  const calendarRef = useRef(null)
  const mobileTextSearchRef = useRef(null)

  const search = useSelector((state: any) => state.searchReducer.search);
  const [selectedCity, setSelectedCity] = useState(city ? city : search.city ? {
    city: search.city,
    lat: search.lat,
    lng: search.lng
  } : null);
  
  const [showCities, setShowCities] = useState(false);

  const [formError, setFormError] = useState("");
  const [checkDate, setCheckDate] = useState<Array<Date | null>>([
    search.checkIn ? search.checkIn : new Date(),
    search.checkOut
      ? search.checkOut
      : DateTime.local().plus({ days: 1 }).toJSDate(),
  ]);
  const [newValue, setNewValue] = useState(search.city ? {
    city: search.city,
    lat: search.lat,
    lng: search.lng
  } : null);
  const [mobileText, setMobileText] = useState(search?.city?.description || '')

  const [occupants, setOccupants] = useState(
    search.occupants.dogs > 0
      ? search.occupants
      : { adults: 2, children: 0, dogs: 1 }
  );
  const navigate = useNavigate();

  const dispatch: Dispatch<any> = useDispatch();


  const onOccupantChange = (value: Occupant) => setOccupants(value);

  useEffect(() => {
    if (showCities) {
      setTimeout(() => {
        mobileTextSearchRef.current.focus()
      }, 100)
    }
  }, [showCities])

 

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    // TagManager.dataLayer({ dataLayer: { event: "clicked_search" } });
    if (
      occupants.adults !== 0 &&
      selectedCity &&
      checkDate[0] &&
      checkDate[1]
    ) {

      if (onSearch) {
        onSearch(selectedCity, checkDate[0], checkDate[1], occupants)
        return
      }
      setFormError("");
      dispatch(
        saveSearch({
          city: newValue.city,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
          lat: newValue.lat,
          lng: newValue.lng,
        })
      );

      navigate("/listings", { state: { flag, bookingId } });
    } else {
      alert("error");
      if (!selectedCity) {
        setFormError("Location required");
      }
      if (!checkDate[0]) {
        setFormError("Check-in date required");
      }
      if (
        checkDate[0] &&
        new Date(checkDate[0]) <= new Date(new Date().setHours(23, 59, 59, 0))
      ) {
        setFormError("Check-in date must be today at the earliest");
      }
      if (!checkDate[1]) {
        setFormError("Check-out date required");
      }
      if (
        checkDate[1] &&
        new Date(checkDate[1]) <= new Date(new Date().setHours(23, 59, 59, 0))
      ) {
        setFormError("Check-out date must be after today");
      }
      if (occupants.adults === 0) {
        setFormError("Search must include at least 1 adult guest");
      }
    }
  };


  const CalendarWithRange = withRange(Calendar);
  const [showMobileCalendar, setShowMobileCalendar] = useState(false)
  const [predictions, setPredictions] = useState([])


  const handlePredictions = (newPredictions) => {
    if (!newPredictions.some(prediction => prediction.description === search.city.description)) {
      setPredictions(newPredictions)
      setShowCities(true)
    }
  }

  const handleCityClick = (e, city) => {  
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': city.description}, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        dispatch(
          saveSearch({
            city: city,
            checkIn: new Date(checkDate[0]).toISOString(),
            checkOut: new Date(checkDate[1]).toISOString(),
            occupants,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          })
        );

        setSelectedCity({
          city: city,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        })
        setNewValue({
          city: city,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        })
        setShowCities(false)
        setMobileText(city?.description)

      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  const inputContainerStyle={
    display: "flex",
    width: '95%',
    transition: "all .15s ease-in-out",
    alignItems: "center",
    maxHeight: "45px",
    mt: "1rem",
  }

  return (
    <>
      <Box
        sx={{
          zIndex: 2,
          width: (home ? '90%': '100%'),
          ml: (home ? '1.5rem': 0),
          mt: '1rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: (home ? "0rem" : '0.5em'),
            mt: ".5rem",
            py: '0.75rem',
            backgroundColor: (home ? 'rgba(235, 236, 236, 0.7)' : 'transparent'),
            borderRadius: '5px'
          }}
        >
          <Box sx={inputContainerStyle}>
            <LocationSelector 
              mobileText={mobileText}
              setMobileText={setMobileText}
              setShowCities={setShowCities}
              handlePredictions={handlePredictions}
              handleCityClick={handleCityClick}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              setNewValue={setNewValue}
              newValue={newValue}
              mobileTextSearchRef={mobileTextSearchRef}
              showCities={showCities}
              predictions={predictions}
            />
          </Box>

          <Box sx={inputContainerStyle}>
            <DateRangeSelector 
              showMobileCalendar={showMobileCalendar}
              setShowMobileCalendar={setShowMobileCalendar}
              calendarRef={calendarRef}
              CalendarWithRange={CalendarWithRange}
              setCheckDate={setCheckDate}
              checkDate={checkDate}
            />
          </Box>

          <Box sx={inputContainerStyle}>
            <OccupantSelector
              value={occupants}
              onChange={onOccupantChange}
              variant="standard"
              size="small"
            />
          </Box>

          <Button
            fullWidth
            onClick={handleFilterOutClick}
            disableElevation
            type="submit"
            variant="contained"
            sx={{
              height: "40px",
              width: "94%",
              display: "flex",
              alignItems: "center",
              padding: ".25rem 0rem",
              justifyContent: "center",
              mt: "1rem",
              borderRadius: "20px",
              textTransform: "none",
              pointerEvents: "auto",
              fontSize: '18px'
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FilterBar;