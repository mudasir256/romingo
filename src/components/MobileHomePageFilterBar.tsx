import { FC, useState, MouseEventHandler, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import { saveSearch } from "../store/searchReducer";
import { DateTime } from "luxon";

import InfiniteCalendar, {
  Calendar,
  withRange,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import GooglePlaceAutoComplete from './GooglePlaceAutoComplete';
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

  const [open, setOpen] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [selectedCity, setSelectedCity] = useState(
    search.city ? search.city : null
  );
  const [selectedCityText, setSelectedCityText] = useState('');
  const [showCities, setShowCities] = useState(false);

  const [formError, setFormError] = useState("");
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : new Date(),
    search.checkOut
      ? search.checkOut
      : DateTime.local().plus({ days: 1 }).toJSDate(),
  ]);
  const [newValue, setNewValue] = useState(null);

  const [occupants, setOccupants] = useState(
    search.occupants.dogs > 0
      ? search.occupants
      : { adults: 2, children: 0, dogs: 1 }
  );
  const history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();

  const getCityName = (cityId: string) => {
    if (cityId) {
      return cities.filter((city: any) => city.id === cityId)[0].name;
    }
  };
 
  const onOccupantChange = (value: Occupant) => setOccupants(value);

  useEffect(() => {
    if (!open) setIsTextField(false);
  }, [open]);

  useEffect(() => {
    if (city && city.length > 0 && cities.length > 0) {
      setSelectedCity(city);
    }
  }, [cities]);

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

      history.push("/listings", {flag, bookingId});
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

  const handleCityClick = (city: string) => {
    setSelectedCity(city.id)
    setSelectedCityText(city.name)
  }

  function groupCities(collection: any) {
      let i = 0, val, index;
      const values = [], result = [];


      for (; i < collection.length; i++) {
          val = collection[i]['state']['name'];
          index = values.indexOf(val);
          if (index > -1)
              result[index].push(collection[i]);
          else {
              values.push(val);
              result.push([collection[i]]);
          }
      }
      return result;
  }
  const groups = groupCities(cities);

  let width = (home ? "100vw" : '85vw')
  if (forceWidth) {
    width = forceWidth
  }

  const CalendarWithRange = withRange(Calendar);
  const [showMobileCalendar, setShowMobileCalendar] = useState(false)

  return (
    <>
      <Box
        sx={{
          position: (home ? "absolute" : 'block'),
          zIndex: 2,
          margin: "0px auto 0px auto",
          paddingTop: "0.1em",
          paddingBottom: "12px",
          width: width,
          backgroundColor: 'transparent',
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: (home ? ".5rem 1.70rem" : '0.5em'),
            flexDirection: "column",
            alignItems: "center",
            mb: ".5rem",
            mt: ".5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "100%",
              minHeight: "45px",
              maxHeight: "45px",
              border: "1px solid #DDDDDD",
              borderRadius: "8px",
              backgroundColor: 'white'
            }}
          >
            <Grid container>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pl: "1.9rem",
                }}
              >
                <LocationCity sx={{ height: "24px", color: "#666" }} />
              </Grid>
             
              <Grid item xs={10} sx={{ zIndex: 50, pl: { xs: '1.7rem', sm: '1.7rem', md: '1.25rem' }  }}>
                <GooglePlaceAutoComplete setSelectedCity={setSelectedCity} setValue={setNewValue} value={newValue}/>
              </Grid>


            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              transition: "all .15s ease-in-out",
              alignItems: "center",
              maxHeight: "45px",
            }}
          >
            {showMobileCalendar &&
              <Box sx={{ 
                zIndex: 100, 
                width: '100%', 
                height: '90vh',
                position: 'fixed', 
                backgroundColor: 'white',
                gap: '1rem',
                left: '0', top: '50px', mt: '0rem' }}
              >
                 <InfiniteCalendar
                    ref={calendarRef}
                    Component={CalendarWithRange}
                    width="100%"
                    displayOptions={{
                      showHeader: true
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
                      headerColor: '#03989E',
                      floatingNav: {
                        background: '#717171',
                        chevron: 'transparent',
                        color: '#FFF',
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
            }

            <Grid
              container
              onClick={() => setOpen(true)}
              sx={{
                width: "100%",
                mt: "1rem"
              }}
            >
              <Grid onClick={() => setShowMobileCalendar(true)} item xs={6} sx={{ pr: ".25rem" }}>
                <Grid
                  sx={{
                    border: "1px solid #DDDDDD",
                    borderRadius: "6px",
                    padding: ".25rem .25rem .25rem 1rem",
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row'
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
                    <Today sx={{ height: "24px" }} />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontFamily: "overpass-light",
                            mb: "-.125rem",
                            fontSize: '.5em',
                            color: "#666",
                          }}
                        >
                          Check-in
                        </Typography>
                        <Typography variant="base">
                          {checkDate[0]
                            ? DateTime.fromJSDate(
                                new Date(checkDate[0])
                              ).toFormat("MMM dd")
                            : "Check-in date"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid onClick={() => setShowMobileCalendar(true)} item xs={6} sx={{ pl: " .25rem" }}>
                <Grid
                  sx={{
                    border: "1px solid #DDDDDD",
                    borderRadius: "6px",
                    padding: ".25rem .25rem .25rem 1rem",
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row'
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
                    <Typography
                      sx={{
       
                        fontFamily: "overpass-light",
                        mb: "-.125rem",
                        textTransform: "none",
                        fontSize: '0.5em',
                        color: "#666",
                      }}
                    >
                      Check-out
                    </Typography>
                    <Typography variant="base">
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
              maxHeight: "45px",
              mt: '1em',
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
              width: "50%",
              display: "flex",
              alignItems: "center",
              padding: ".25rem 0rem",
              justifyContent: "center",
              mt: "1rem",
              borderRadius: "6px",
              textTransform: "none",
              pointerEvents: "auto",
            }}
          >
            <SearchIcon
              sx={{
                fontSize: "1.5em",
                pointerEvents: "auto",
                mr: '0.25em',
              }}
            />
            <Typography sx={{
                textTransform: "none",
                fontFamily: "sansita-light",
                color: 'white',
                fontSize: '1.25em',
                mb: '0.25em',
              }}>
              Search
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* <Slide direction='up' in={showCities} mountOnEnter unmountOnExit>
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
          <Box position="relative" width="90%" textAlign="center" sx={{ m: '1rem', mt: '1.5rem', backgroundColor: 'white', }}>
            <Typography textAlign="center" variant="h5">{selectedCity ? getCityName(selectedCity).split(',')[0] : 'Select a city'}</Typography>
            <Button sx={{ position: 'absolute', top: -6, right: 0 }}  variant="outlined" onClick={() => setShowCities(false)}>X</Button>
          </Box>
          <Box height="88%" overflow="scroll">
            {cities.map(city => 
              <Box sx={{ px: '1.25rem', py: '0.75rem', cursor: 'pointer', '&:hover': { backgroundColor: '#d9f7fc'} }} key={city.name} onClick={() => { setSelectedCity(city.id); setShowCities(false); } }> <Typography variant="p">{city.name.split(',')[0]}</Typography></Box>
            )}
          </Box>
        </Box>
      </Slide> */}
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

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
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
    setAnchorEl(null);
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
          border: "1px solid #DDDDDD",
          borderRadius: "6px",
          padding: ".5rem 0rem .5rem 0.75rem",
          backgroundColor: 'white',
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
          }}/>
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
  

      <Popover

        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ ".MuiPopover-paper": { width: "250px", mt: ".5rem" } }}
      >
        {/* arrow
        <Box sx={{
          height: '12px', 
          width: '12px', 
          position: 'absolute', 
          backgroundColor: '#666',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          zIndex: 100,
        }} 
        />
        */}
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
                      sx={{ ...popOverLabelText, textAlign: "center" }}
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
      </Popover>
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
      <IconButton onClick={() => onChange(Math.max(value - 1, minimum))}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton onClick={() => onChange(value + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Stack>
  );
};

export default FilterBar;