import { FC, useState, MouseEventHandler, useEffect } from "react";
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
  Autocomplete,
  TextField,
  useMediaQuery,
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from "@mui/icons-material/Search";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import OccupantSelector, {
  Occupant,
} from "./OccupantSelector/OccupantSelector";
import {
  ArrowDropUpOutlined,
  ArrowDropDownOutlined,
  Today,
  InsertInvitation,
} from "@mui/icons-material";
import { DateTime } from "luxon";
import { saveSearch } from "../store/searchReducer";
import SearchImage from '../assets/icon/magnify.png';

import "./Header/Header.scss";

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
  const [zoomIn, setZoomIn] = useState(zoomed);
  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [selectedCity, setSelectedCity] = useState(
    search.city ? search.city : null
  );
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
  const biggerThanTenForty = useMediaQuery("(min-width:1040px)");

  const dispatch: Dispatch<any> = useDispatch();

  const getCityName = (cityId: string) => {
    if (cityId) {
      return cities.filter((city: any) => city.id === cityId)[0].name;
    }
  };
  const getCity = (cityId: string) =>
    cities.filter((city: any) => city.id === cityId)[0];
  const onOccupantChange = (value: Occupant) => setOccupants(value);

  const dateToString = (isoString: string | Date | number) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  };

  const handleFilterInClick: MouseEventHandler<Element> = () => {
    setFormError("");
    setZoomIn(true);
  };

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
      setFormError("");
      dispatch(
        saveSearch({
          city: selectedCity,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
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

  const DesktopSelectCity = () => {
    cities.sort(function (a: any, b: any) {
      if (a.state.name === b.state.name) {
        // Price is only important when cities are the same
        return b.name - a.name;
      }
      return a.state.name > b.state.name ? 1 : -1;
    })

    const grouped = groupBy(cities, 'state')
    console.log(grouped)
    return (
      <Box sx={{ position: 'absolute', mt: '0.65rem', display: 'flex', gap: '1rem', flexDirection: 'row', width: '800px', backgroundColor: 'white', p: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', boxShadow: 4, borderRadius: 3,}} >
        <Box onClick={() => setShowSelectCity(false)} position="absolute" right="8px" top="8px" sx={{ cursor: 'pointer'}} ><HighlightOffIcon /></Box>
        {Object.keys(grouped).map(cityKey => (
          <Box key={cityKey} width="160px" my="0.25rem">
            <Typography variant="h5">{cityKey}</Typography>
            {grouped[cityKey].map(city => (
              <Typography onClick={() => {
                console.log(city.id)
                setSelectedCity(city.id)
                setShowSelectCity(false)
              }} component="p" key={city.name} variant="base" color="primary" sx={{ '&:hover': { backgroundColor: '#d9f7fc' }, cursor: 'pointer' }}>{city.name.split(',')[0]}</Typography>
            ))}
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Box sx={{ 
      mx: 'auto',
      mt: '0em',
      zIndex: '20',
      width: '886px',
    }}>
      {showText && <Box component="h1" sx={{ ml: '0.1em', mb: '0.5em'}} className="filter-bar-wrapper-title">Book pet-friendly hotels</Box>}
      {showText && <Box component="h2" sx={{ ml: '0.3em' }} className="filter-bar-wrapper-desc">Lowest rates. $0 pet fees.</Box>}
      <Box sx={{ 
          mt: '1.5em', 
          borderRadius: '15px', 
          border: '4px solid #D3D3D3',
          boxSizing: 'border-box',
          zIndex: 11,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }} 
        className="filter-bar-desktop"
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: '0.5em',
            px: '1em',
          }}
        >
          <Box>
            <Typography
              sx={{
                ...labelStyle,
                mb: '0.7em',
                ml: '1em'
              }}>
              Where to
            </Typography>
            <Box
              sx={{
                mb: '0.3rem',
                ml: '0.5rem',
                display: "flex",
                alignItems: "center",
                gap: '0.5rem',
                border: 'none',
                ["@media (max-width: 600px)"]: { mx: '0.75em' },
                borderRadius: "6px",
                backgroundColor: "#fff",
                minWidth: '220px',
                "&:hover": { background: "#efefef" },
              }}
              onClick={() => setShowSelectCity(!showSelectCity)}
            >
              
              <img src={SearchImage} width="22.6px" height="22.5px" alt="" />
              <Typography
                variant="base"
                className="auto-complete-input"
                sx={{   
                  cursor: 'pointer', 
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              >{selectedCity ? getCity(selectedCity).name : 'Select a city'}</Typography>
            </Box>
            {showSelectCity && <DesktopSelectCity />}

          </Box>

          <Box sx={{ 
            ml: '1em',
            ["@media (max-width: 600px)"]: { ml: '1em' }
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


                    }}
                    onClick={() => setOpen(true)}
                  >
                    <Box sx={{ mr: '1.5em'}}>
                      <Typography sx={labelStyle}>Check-in date</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: "pointer",
                          transition: "all .15s ease-in-out",
                          border: 'none',
                          "&:hover": { background: "#efefef" },
                          borderRadius: "6px",
                          backgroundColor: "#fff",
                          py: '0.25em',
                  
                        }}
                      >
                
                        <Today />
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
                    <Box sx={{ ml: '1em', mr: '1.5em',}} >
                      <Typography
                        sx={labelStyle}>
                        Check-out date
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          cursor: "pointer",
                          transition: "all .15s ease-in-out",
                          border: 'none',
                          "&:hover": { background: "#efefef" },
                          borderRadius: "6px",
                          backgroundColor: "#fff",
                          py: '0.25em',

                
                        }}
                        onClick={() => setOpen(true)}

                      >
                        <InsertInvitation />
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
          <Typography
            sx={{
              ...labelStyle,
              mb: '0.55em'
            }}>
            Guests
          </Typography>
          <OccupantSelector
            value={occupants}
            onChange={onOccupantChange}
            variant="standard"
            size="small"
            fullWidth={false}
            sx={{
              width: '214px',
              label: {
                fontFamily: 'overpass-light',
                fontSize: '1em',
              },
              input: {
                cursor: "pointer",
                fontFamily: 'overpass-light',
                fontSize: '1em',
              },
            }}
          />
        </Box>

        <Button
          onClick={handleFilterOutClick}
          variant="contained"
          size="medium"
          sx={{
            textTransform: "none",
            fontFamily: "overpass-light",
            m: '0.75em',
            p: '1.5em',
            height: '44px',
          }}
          startIcon={<SearchIcon sx={{ height: "24px", fill: 'white' }} />}
        >
          Search
        </Button>

      </Box>
    </Box>
  );
};


interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  minimum?: number;
  type: string;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  onChange,
  minimum = 0,
  type = 'Guest'
}) => {
  return (
    <div>
      <Stack spacing={2} direction="row" alignItems="center">
        <Typography variant="body1" sx={{ width: 16, textAlign: "center" }}>
          {value}
        </Typography>
        <Stack alignItems="center" sx={{ margin: '0 !important' }}>
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onChange(value + 1)}>
            <ArrowDropUpOutlined fontSize="large" />
          </div>
          <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onChange(Math.max(value - 1, minimum))}>
            <ArrowDropDownOutlined fontSize="large" />
          </div>
        </Stack>
      </Stack>
      <div style={{ fontFamily: 'overpass-light', fontSize: '15px', lineHeight: '23px', color: '#949494' }}>{type}</div>
    </div>
  );
};