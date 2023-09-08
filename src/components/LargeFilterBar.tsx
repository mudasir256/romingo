import { FC, useState, MouseEventHandler, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import {
  Button,
  Box,
  Typography,
  CSSObject,
  Select,
  FormControl,
  MenuItem,
  ListSubheader
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import OccupantSelector, {
  Occupant,
} from "./OccupantSelector/OccupantSelector";
import {
  Today,
  InsertInvitation,
} from "@mui/icons-material";
import { DateTime } from "luxon";
import { saveSearch } from "../store/searchReducer";
import SearchImage from '../assets/icon/magnify.png';

import "./Header/Header.scss";
import GooglePlaceAutoComplete from "./GooglePlaceAutoComplete";

interface FilterBarProps {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
}

export const LargeFilterBar: FC<FilterBarProps> = ({ showText = false, sx, zoomed = false, city = "" }) => {
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [selectedCity, setSelectedCity] = useState(city ? city : search.city ? {
    city: search.city,
    lat: search.lat,
    lng: search.lng
  } : null);


  const [formError, setFormError] = useState("");
  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : new Date(),
    search.checkOut
      ? search.checkOut
      : DateTime.local().plus({ days: 1 }).toJSDate(),
  ]);

  const [occupants, setOccupants] = useState(
    search.occupants.dogs > 0
      ? search.occupants
      : { adults: 2, children: 0, dogs: 1 }
  );


  const history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();

  const onOccupantChange = (value: Occupant) => setOccupants(value);


  const handleDateRangeClose = () => {
    setIsAccept(false);
    if (!isTextField) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) setIsTextField(false);
  }, [open]);


  useEffect(() => {
    if (search?.occupants) {
      setOccupants({
        ...search.occupants
      })

    }
  }, [search])

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    // TagManager.dataLayer({ dataLayer: { event: "clicked_search" } });

    if (
      occupants.adults !== 0 &&
      selectedCity &&
      checkDate[0] &&
      checkDate[1]
    ) {
      console.log(occupants)
      setFormError("");
      dispatch(
        saveSearch({
          city: selectedCity.city,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
          lat: selectedCity.lat,
          lng: selectedCity.lng,
        })
      );
    
      history.push("/listings");
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

  const [showSelectCity, setShowSelectCity] = useState<boolean>(false)

  const labelStyle = {
    fontFamily: 'overpass-light',
    fontSize: '0.75em', 
    fontWeight: 100, 
    ml: '0.1em',
    mb: '0.5em'
  }

  const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key].name] = rv[x[key].name] || []).push(x);
      return rv;
    }, {});
  };

  const handleCityClick = (city: any) => {
    setSelectedCity(city.id)
  }

  return (
    <Box sx={{ 
      mx: 'auto',
      mt: '0em',
      zIndex: '20',
      width: 'fit-content',
    }}>
      {showText && <Box component="h1" sx={{ ml: '0.1em', mb: '0.5em'}} className="filter-bar-wrapper-title"><b>Book pet-friendly hotels</b></Box>}
      {showText && <Box component="h2" sx={{ ml: '0.3em' }} className="filter-bar-wrapper-desc">the easiest way to travel with your pets</Box>}
      <Box sx={{ 
          mt: '1.5em', 
          border: '1px gray solid',
          boxSizing: 'border-box',
          background: "#f5f3f3",
          zIndex: 11,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '6px'
        }} 
        className="filter-bar-desktop"
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            px: '0.5rem',
          }}
        >
          <Box sx={{background: 'white',  border: '1px solid #aaabab', borderRadius: '5px', width: '50%'}}>
            <FormControl fullWidth>
              <GooglePlaceAutoComplete width={274} setSelectedCity={setSelectedCity} city={selectedCity} />
            </FormControl>
          </Box>

          <Box sx={{ 
            ml: '1em',
            ["@media (max-width: 600px)"]: { ml: '1em' },
            background: 'white',
          }}>    
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                inputFormat="MMM dd"
                disableMaskedInput={true}
                open={open}
                onAccept={() => setIsAccept(true)}
                onClose={handleDateRangeClose}
                onOpen={() => {
                  if (!isAccept) {
                    setOpen(true);
                  }
                }}
                calendars={2}
                clearable={true}
                value={checkDate || null}
                minDate={new Date()}
                onChange={(newValue) => {
                  setFormError("");
                  setCheckDate(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      alignItems: 'center',
                      ["@media (max-width: 920px)"]: { display: 'flex' },
                      ["@media (max-width: 720px)"]: { display: 'flex' },

                      height: 42,
                      border: '1px solid #aaabab', borderRadius: '5px'
                    }}
                    onClick={() => setOpen(true)}
                  >
                    <Box sx={{ mr: '1rem'}}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: "pointer",
                          transition: "all .15s ease-in-out",
                          border: 'none',
                          borderRadius: "6px",
                          backgroundColor: "#fff",
                          py: '0.25em',
                        }}
                      >
                        <Box ml="0.5rem" mt="0.1rem"><Today fontSize="small" sx={{ color: '#808080' }} /></Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontFamily: "overpass-light",
                            textTransform: "none",
                            fontSize: '1em',
                            ml: '0.5em',
                            ["@media (max-width: 600px)"]: { fontSize: '1em' }
                          }}
                        >
                          {checkDate[0]
                            ? DateTime.fromJSDate(new Date(checkDate[0])).toFormat("MM/dd/yy")
                            : "Check-in date"
                          }
                        </Typography> 
                      </Box>
                    </Box>
                    <ArrowRightAltIcon />
                    <Box sx={{ ml: '0.5rem', mr: '0.5rem'}} >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: "pointer",
                          transition: "all .15s ease-in-out",
                          border: 'none',
                          borderRadius: "6px",
                          backgroundColor: "#fff",
                          py: '0.25em',

                
                        }}
                        onClick={() => setOpen(true)}

                      >
                        <Box mt="0.1rem" ml="0.5rem"><InsertInvitation fontSize="small" sx={{ color: '#808080' }} /></Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontFamily: "overpass-light",
                            textTransform: "none",
                            fontSize: '1em',
                            ml: '0.5em',
                            ["@media (max-width: 600px)"]: { fontSize: '1.25em' }
                          }}
                        >
                          {checkDate[1]
                            ? DateTime.fromJSDate(new Date(checkDate[1])).toFormat("MM/dd/yy")
                            : "Check-out date"
                          }
                        </Typography> 
                      </Box>
                    </Box>
                  </Box>
                )}
              />
            </LocalizationProvider>
          </Box>

        </Box>
  
          
        <Box>
          <OccupantSelector
            value={occupants}
            onChange={onOccupantChange}
            variant="standard"
            size="small"
            fullWidth={false}
            sx={{
              width: '226px',
              height: '42px',
              border: '1px solid #aaabab', borderRadius: '5px',
              background: 'white',
              label: {
                fontFamily: 'overpass-light',
                fontSize: '1em',
              },
              input: {
                cursor: "pointer",
                fontFamily: 'overpass-light',
                fontSize: '1rem',
                mt: '0.05rem'
              },
            }}
          />
        </Box>
        {showText ?
        <Button
          onClick={handleFilterOutClick}
          variant="contained"
          size="medium"
          sx={{
            textTransform: "none",
            fontFamily: "overpass-light",
            m: '0.75em',
            p: '1.5em',
            height: '42px',
          }}
          startIcon={<SearchIcon sx={{ height: "24px", fill: 'white' }} />}
        >
          Search
        </Button>
        : <Box onClick={handleFilterOutClick} backgroundColor="#03989E" borderRadius="100%" p="0.5rem" m="0.5rem" sx={{ cursor: 'pointer' }} ><SearchIcon sx={{ cursor: 'pointer', height: "20px", fill: 'white' }} /></Box>

        }
      </Box>
    </Box>
  );
};