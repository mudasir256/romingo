import React, { FC, useState, MouseEventHandler, useEffect, useRef } from "react";
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
  Stack,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Popover,
  ListSubheader,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  TextField,
} from "@mui/material";

import {
  RemoveCircleOutline,
  AddCircleOutline,
  Event,
  LocationCity,
  People,
  Today,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import { saveSearch } from "../store/searchReducer";
import { DateTime } from "luxon";

import InfiniteCalendar, {
  Calendar,
  withRange,
} from 'react-infinite-calendar';
import '../mobileCalendar.css';
import GooglePlaceAutoComplete from './GooglePlaceAutoComplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface FilterBarProps {
  sx?: CSSObject;
  home?: boolean;
  city?: string;
  onSearch?: any;
  forceWidth?: string;
  flag?: string;
  bookingId?: string;
}

const initialStates = [
  { 
    isInitial: true,
    index: 0,
    description: 'San Diego, CA, USA',
    structured_formatting: {
      main_text: "San Diego",
      secondary_text: 'CA, USA'
    }
  },
  {
    isInitial: true,
    index: 1,
    description: 'Asheville, NC, USA',
    structured_formatting: {
      main_text: "Asheville",
      secondary_text: 'NC, USA'
    }
  },
  {
    isInitial: true,
    index: 2,
    description: 'Austin, TX, USA',
    structured_formatting: {
      main_text: "Austin",
      secondary_text: 'TX, USA'
    }
  },
  {
    isInitial: true,
    index: 3,
    description: 'Seattle, WA, USA',
    structured_formatting: {
      main_text: "Seattle",
      secondary_text: 'WA, USA'
    }
  },
  {
    isInitial: true,
    index: 4,
    description: 'Santa Fe, NM, USA',
    structured_formatting: {
      main_text: "Santa Fe",
      secondary_text: 'NM, USA'
    }
  },
]

const FilterBar: FC<FilterBarProps> = ({ sx, home = true, city = "", onSearch, forceWidth, flag, bookingId }) => {

  const calendarRef = useRef(null)
  const mobileTextSearchRef = useRef(null)

  const [open, setOpen] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  const search = useSelector((state: any) => state.searchReducer.search);
  const [selectedCity, setSelectedCity] = useState(city ? city : search.city ? {
    city: search.city,
    lat: search.lat,
    lng: search.lng
  } : null);
  
  const [showCities, setShowCities] = useState(false);

  const [formError, setFormError] = useState("");
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
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
    if (!open) setIsTextField(false);
  }, [open]);

  useEffect(() => {
    if (showCities) {
      setTimeout(() => {
        mobileTextSearchRef.current.focus()
      }, 100)
    }
  }, [showCities])

 

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    // TagManager.dataLayer({ dataLayer: { event: "clicked_search" } });
    console.log('handle click')
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

      navigate("/listings", { flag, bookingId });
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



  let width = (home ? "100vw" : '85vw')
  if (forceWidth) {
    width = forceWidth
  }

  const CalendarWithRange = withRange(Calendar);
  const [showMobileCalendar, setShowMobileCalendar] = useState(false)
  const [predictions, setPredictions] = useState([])


  const handlePredictions = (newPredictions) => {
    console.log(search.city)
    if (!newPredictions.some(prediction => prediction.description === search.city.description)) {
      console.log('not same search')
      setPredictions(newPredictions)
      setShowCities(true)     
    }

  }

  const handleCityClick = (e, city) => {
  
    const geocoder = new google.maps.Geocoder();



    console.log(geocoder)
    geocoder.geocode({ 'address': city.description}, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)

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
            mb: ".5rem",
            mt: ".5rem",
            py: '0.75rem',
            backgroundColor: (home ? 'rgba(235, 236, 236, 0.7)' : 'transparent'),
          }}
        >
          <Grid container style={{ padding: "0 0 0 20px", background: 'white', width: '95%', border: '1px solid #aaabab', borderRadius: '5px' }} alignItems='center'>
            <Grid>
              <LocationOnIcon xs={4} />
            </Grid>
            <Grid item xs={8} sx={{ zIndex: 50, minWidth: '92%' }}>
              <GooglePlaceAutoComplete 
                mobile={true} 
                mobileText={mobileText}
                setMobileText={setMobileText}
                setShowCities={setShowCities}
                callback={handlePredictions}
                city={selectedCity}
                setSelectedCity={setSelectedCity} 
                setValue={setNewValue}
                value={newValue} 
                styles={{ width: '100%' }} 
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              transition: "all .15s ease-in-out",
              alignItems: "center",
              maxHeight: "45px",
            }}
          >

            <Dialog
              fullScreen
              open={showMobileCalendar}
              onClose={() => setShowMobileCalendar(false)}
            >
              <AppBar sx={{ position: 'relative', backgroundColor: 'white' }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setShowMobileCalendar(false)}
                    aria-label="close"
                  >
                    <CloseIcon sx={{ color: '#03989E' }} />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Box sx={{
                zIndex: 100,
                width: '100%',
                height: '90vh',
                position: 'fixed',
                backgroundColor: 'white',
                gap: '1rem',
                left: '0', top: '50px', mt: '0rem'
              }}
              >
                <InfiniteCalendar
                  ref={calendarRef}
                  Component={CalendarWithRange}
                  width="100%"
                  displayOptions={{
                    showHeader: true,
                    showWeekdays: false,
                  }}
                  minDate={new Date()}
                  selected={{
                    start: checkDate[0],
                    end: checkDate[1],
                  }}
                  locale={{
                    headerFormat: 'MMM Do',
                  }}
           
                  theme={{
                    headerColor: 'white',
                    floatingNav: {
                      background: '#f0f0f0',
                      chevron: 'transparent',
                      color: 'black',
                    },
                    accentColor: '#03989E',
                    selectionColor: '#03989E',
                    weekdayColor: '#03989E',
                  }}
                />
                <Box zIndex="900" position="fixed" width="94%" backgroundColor="white" bottom="0" p="1rem">
                  <Button onClick={() => {
                    const { start, end } = calendarRef.current.state.selected
                    setCheckDate([start, end])
                    setShowMobileCalendar(false)
                  }} fullWidth variant="contained">Done</Button>
                </Box>
              </Box>
            </Dialog>

            <Grid
              container
              onClick={() => setOpen(true)}
              sx={{
                width: "100%",
                mt: "1rem"
              }}
            >
              <Grid onClick={() => setShowMobileCalendar(true)} item xs={6} sx={{  width: '100%', minWidth: '100%' }}>
                <Grid
                  sx={{
                    border: "1px solid #aaabab",
                    borderRadius: "6px",
                    padding: ".25rem .25rem .25rem 1rem",
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '45px',
                    alignItems: 'center',
                    width: '95%',
                    margin: 'auto',
                    mt: '0.5rem'
                  }}
                >
                  <Grid
                    item
                    sx={{
                      pl: '0.1em',
                      pr: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Event sx={{ height: "24px" }} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="base">
                      {checkDate[0]
                        ? DateTime.fromJSDate(
                          new Date(checkDate[0])
                        ).toFormat("MMM dd")
                        : "Check-in date"}
                      &nbsp;&#8212;&nbsp;
                      {checkDate[1]
                        ? DateTime.fromJSDate(
                          new Date(checkDate[1])
                        ).toFormat("MMM dd")
                        : "Check-out date"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              transition: "all .15s ease-in-out",
              alignItems: "center",
              maxHeight: "26px",
              width: '95%',
              margin: 'auto',
              mt: '0.75rem'
            }}
          >
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
              marginTop: '50px',
              fontSize: '18px'
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Box>

       <Slide direction='up' in={showCities} mountOnEnter unmountOnExit>
        <Box sx={{ 
          position: 'fixed', 
          overflow: 'auto',
          left: '0',
          bottom: '0', 
          height: '80%', 
          width: '100%', 
          backgroundColor: 'white',
          borderTopRightRadius: '20px',
          borderTopLeftRadius: '20px',
          zIndex: 1000
        }}>

          <Box position="relative" width="100%" textAlign="center" sx={{ m: '1rem', mt: '1.5rem', backgroundColor: 'white', }}>
            <IconButton  sx={{ position: 'absolute', top: -25, left: -10, zIndex: 90, color: '#03989E' }} onClick={() => setShowCities(false)}><CloseIcon /></IconButton>
            <TextField 
              sx={{ width: '90%', ml: '-2.5rem', mt: '0.5rem' }}
              autoFocus
              id="mobileTextSearch"
              variant="standard"
              value={mobileText}
              inputRef={mobileTextSearchRef}
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ visibility: mobileText ? "visible" : "hidden" }}
                    onClick={() => setMobileText('')}
                  >
                    <CancelIcon />
                  </IconButton>
                )
              }}
              onChange={(e) => setMobileText(e.target?.value)}
            />
          </Box>
          <Box height="88%" overflow="scroll">

            {predictions?.map((address, index) => 
              <Box sx={{ px: '1.25rem', py: '0.75rem', cursor: 'pointer', '&:hover': { backgroundColor: '#d9f7fc'} }} key={address.description} onClick={(e) => handleCityClick(e, predictions[index])}><Typography variant="p">{address.description}</Typography></Box>
            )}
            {predictions?.length == 0 &&
             <Typography ml="0.75rem" variant="base">No destinations found.</Typography>
            }
         {/*   {predictions?.length === 0 &&
              initialStates.map(address => (
                <Box sx={{ px: '1.25rem', py: '0.75rem', cursor: 'pointer', '&:hover': { backgroundColor: '#d9f7fc'} }} key={address.description} onClick={(e) => handleCityClick(e, initialStates[address.index])}><Typography variant="p">{address.description}</Typography></Box>
              ))
            }*/}
          </Box>
        </Box>
      </Slide> 
    </>
  );
};

export interface Occupant {
  adults: number;
  children: number;
  dogs: number;
  childrenAge?: number[];
  disabled?: boolean;
}

interface OccupantSelectorProps {
  value: Occupant;
  onChange: (value: Occupant) => void;
  onClose?: () => void;
  fullWidth?: boolean;
  size?: "small" | "medium" | undefined;
  variant?: "filled" | "outlined" | "standard" | undefined;
  disabled?: boolean;
  align?: "left" | "right";
}

const OccupantSelector: FC<OccupantSelectorProps> = ({
  value,
  onChange,
  onClose,
  fullWidth = true,
  align = "left",
  size = "medium",
  variant = "outlined",
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [error, setError] = useState("");
  const [showOccupantDialog, setShowOccupantDialog] = useState(false)

  const handleClick = (event: any) => {
    setShowOccupantDialog(true);
  };

  const handleClose = () => {
    setError("");
    if (value.adults === 0) {
      setError("At least 1 adult is required");
      return;
    }
    if (onClose) {
      onClose();
    }
    setShowOccupantDialog(false);
  };

  const popOverLabelText = {
    fontSize: '1em',
    fontFamily: 'overpass-light',
    color: 'black',
  }

  return (
    <>

      <Grid
        container
        onClick={handleClick}
        sx={{
          border: "1px solid #aaabab",
          borderRadius: "6px",
          padding: ".5rem 0rem .5rem 0.75rem",
          backgroundColor: 'white',
          marginTop: '50px'
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            ml: '0.5em',
            mr: '0.25em',
          }}
        >

          <People sx={{
            fontSize: "1.5em",
            pointerEvents: "auto",
            mr: '0.25em',
            height: '24px',
            p: '0.1em',
            pl: 0,
          }} />
        </Grid>
        <Typography variant="base"
          sx={{
            mt: '0.25em',
            ml: '0.25em',
          }}
        >
          {value.adults + value.children} Guests, {value.dogs} Pet
          {value.dogs === 1 ? "" : "s"}
        </Typography>
      </Grid>

      <Dialog
        fullScreen
        open={showOccupantDialog}
        onClose={() => setShowOccupantDialog(false)}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setShowOccupantDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{
          zIndex: 100,
          width: '100%',
          height: '90vh',
          position: 'fixed',
          backgroundColor: 'white',
          gap: '1rem',
          left: '0', top: '50px', mt: '0rem'
        }}
        >
          <Stack sx={{ px: 2, pt: 2 }} spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={popOverLabelText}>Adults</Typography>
              <NumberInput
                value={value.adults}
                onChange={(adults) => {
                  if (adults > 5) return;
                  onChange({ ...value, adults });
                }}
                minimum={1}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Typography sx={popOverLabelText}>Children</Typography>
              <NumberInput
                value={value.children}
                onChange={(children) => {
                  if (children > 6) return;
                  if (value.childrenAge && value.childrenAge.length > children) {
                    value.childrenAge = value.childrenAge.slice(0, children);
                  } else if (
                    value.childrenAge &&
                    value.childrenAge.length <= children
                  ) {
                    while (value.childrenAge.length !== children) {
                      value.childrenAge.push(0);
                    }
                  }
                  onChange({ ...value, children });
                }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Typography sx={popOverLabelText}>Dogs</Typography>
              <NumberInput
                value={value.dogs}
                onChange={(dogs) => {
                  if (dogs > 2) return;
                  onChange({ ...value, dogs });
                }}
              />
            </Stack>
            {error.length > 0 && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: "center", fontSize: "80%" }}
              >
                {error}
              </Typography>
            )}
            <Box
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              {Array.from({ length: value.children }, (_, i: number) => {
                return (
                  <Box
                    sx={{
                      mx: "5px",
                      mt: "0px",
                      mb: "15px",
                      width: "calc(50% - 10px)",
                      display: "inline-block",
                    }}
                    key={i}
                  >
                    <FormControl variant="standard" fullWidth>
                      <InputLabel sx={{ textAlign: "center" }}>
                        Child {i + 1} Age
                      </InputLabel>
                      <Select
                        key={i}
                        color="primary"
                        variant="outlined"
                        size="small"
                        sx={{ ...popOverLabelText, textAlign: "center", marginTop: '20px' }}
                        value={
                          value.childrenAge && value.childrenAge[i]
                            ? value.childrenAge[i].toString()
                            : "1"
                        }
                        onChange={(e: any) => {
                          if (value.childrenAge === undefined) {
                            value.childrenAge = [];
                          }
                          value.childrenAge[i] = parseInt(e.target.value);
                          onChange({ ...value });
                        }}
                      >
                        {Array.from({ length: 17 }, (_, k: number) => {
                          return (
                            <MenuItem value={k + 1} key={k + 1}>
                              {k + 1}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                );
              })}
            </Box>
          </Stack>
          <Button
            sx={{ pt: 1.5, pb: 1.5, width: "100%", mt: -1.25 }}
            onClick={handleClose}
          >
            Done
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  minimum?: number;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  onChange,
  minimum = 0,
}) => {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <IconButton onClick={() => onChange(Math.max(value - 1, minimum))} size="large">
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton onClick={() => onChange(value + 1)} size="large">
        <AddCircleOutline />
      </IconButton>
    </Stack>
  );
};

export default FilterBar;