import { FC, useState, MouseEventHandler, useEffect } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  Typography,
  CSSObject,
  useMediaQuery,
  Stack,
} from "@mui/material";

import {
  ArrowDropUpOutlined,
  ArrowDropDownOutlined,
  Today,
  InsertInvitation,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import { randomDate } from "../../tools.js";
import { saveSearch } from "../../store/searchReducer";
import { DateTime } from "luxon";

import Image3 from '../../assets/images/pet-friendly-travel-french-bulldog.jpeg'
import Image4 from '../../assets/images/pet-friendly-travel-golden-retriever-2.jpeg'
import Image7 from '../../assets/images/pet-friendly-travel-jack-russell.jpeg'
import Image9 from '../../assets/images/pet-friendly-travel-jack-russell-fall.jpeg'
import Image10 from '../../assets/images/pet-friendly-travel-golden-doodle.jpeg'


import SearchImage from '../../assets/icon/magnify.png';

import MobileFilterBar from '../MobileHomePageFilterBar'

import OccupantSelector, {
  Occupant,
} from "../OccupantSelector/OccupantSelector";

import "./Header.scss";

interface Props {
  sx?: CSSObject;
}

const Header: FC<Props> = ({ sx }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const imagesDesktop = [
    {
      component: Image7,
      placement: 'bottom 0px left 0px'
    },
    {
      component: Image10, 
      placement: 'bottom -200px left 0px'
    },
    {
      component: Image3, 
      placement: 'bottom -120px right 0px'
    }
  ];

  const imagesMobile = [
    {
      component:  Image4, 
      placement: 'bottom -50px right 0px',
      extra: 'linear-gradient(160deg, #000000 -100%, #29292900 55%, #000000 300%),'
    },
    {
      component: Image3, 
      placement: 'bottom -50px left -120px'
    },
    {
      component: Image9,
      placement: 'bottom -50px right -0px'
    }
  ];

  const [mobileImage, setMobileImage] = useState({})
  const [desktopImage, setDesktopImage] = useState({})

  useEffect(() => {
    setMobileImage(imagesMobile[Math.floor(Math.random()*imagesMobile.length)])
    setDesktopImage(imagesDesktop[Math.floor(Math.random()*imagesDesktop.length)])
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "0px" },
        height: "100%",
        display: "flex",
        justifyContent: "start",
        flexDirection: 'column',
        top: 0,
        left: 0,
        ...sx,
      }}
      className="header-wrapper"
    >
      <Navbar />

    {/* `linear-gradient(178deg, #000000 30%, #29292900 70%, #000000 130%) */}
      <Box
        className="filter-bar-wrapper"
        sx={{
          backgroundImage: { xs: `${mobileImage.extra ? mobileImage.extra : ''} url(${mobileImage.component})`, sm: `url(${mobileImage.component})`, md: `url(${desktopImage.component})` },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: { xs: mobileImage.placement, sm: mobileImage.placement, md: desktopImage.placement },
          backgroundSize: 'cover',
        }}
      >

        <Box sx={{ 
          ml: { xs: '1.75em', sm: '1.5em', md: '1.5em', lg: '0em' },
          mt: { xs: '6em', sm: '8em', md: '9em', lg: '9em' },  
          mb: { xs: '0em', sm: '0em', md: '0em', lg: '2em' },
        }}>
          
          <Box sx={{
            display: { xs: 'block', sm: 'block', md: 'none' }
          }}>
            <Box sx={{ textAlign: { xs: 'left', sm: 'left'} }} className="filter-bar-wrapper-title">
              Book pet-friendly hotels
            </Box>
            <div className="filter-bar-wrapper-desc">
              Lowest rates. $0 pet fees.
            </div>
          </Box>
        </Box>

        <Box sx={{ 
          display: { xs: 'block', sm: 'block', md: 'none' },
          top: { sm: '30px' },
        }}>
          <MobileFilterBar />
        </Box>
        <Box sx={{ 
          display: { xs: 'none', sm: 'none', md: 'block' }
        }}>
          <FilterBar />
        </Box>
      </Box>
    </Box >
  );
};

interface FilterBarProps {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
}

const FilterBar: FC<FilterBarProps> = ({ sx, zoomed = false, city = "" }) => {
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

  const labelStyle = {
    fontFamily: 'overpass-light',
    fontSize: '0.75em', 
    fontWeight: 100, 
    ml: '0.1em',
    mb: '0.5em'
  }

  return (
    <Box sx={{ 
      mx: 'auto',
      mt: '0em',
      zIndex: '20',
      width: '920px',
    }}>
      <Box sx={{ ml: '0.1em', mb: '0.5em'}} className="filter-bar-wrapper-title">Book pet-friendly hotels</Box>
      <Box sx={{ mt: '1.5em'}} className="filter-bar-desktop">
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
                mb: 0
              }}>
              Where to
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: 'none',
                ["@media (max-width: 600px)"]: { mx: '0.75em' },
                borderRadius: "6px",
                backgroundColor: "#fff",
                minWidth: '250px',
                "&:hover": { background: "#efefef" },
              }}
            >
              {selectedCity ? (
                <img
                  src={`/public/images/location-icons/${getCity(selectedCity)
                    ?.name.substring(
                      0,
                      getCity(selectedCity)?.name.indexOf(",")
                    )
                    .toLowerCase()
                    .replace(/ /g, "_")}.svg`}
                  height="24px"
                  style={{ marginLeft: "5px" }}
                />
              ) : (
                <img src={SearchImage} width="22.6px" height="22.5px" alt="" />
              )}
              <Autocomplete
                options={cities.sort(function (a: any, b: any) {
                  if (a.state.name === b.state.name) {
                    // Price is only important when cities are the same
                    return b.name - a.name;
                  }
                  return a.state.name > b.state.name ? 1 : -1;
                })}
                groupBy={(o) => o.state.name}         
                disableClearable
                blurOnSelect="touch"
                value={getCity(selectedCity) || null}
                getOptionLabel={(option: any) => {
                  return option.name;
                }}
                componentsProps={{
                  paper: {
                    style: {
                      opacity: 1,
                      backgroundColor: 'white',
                      fontFamily: 'sansita-light',
                      padding: '0 1em',
                    }
                  },
                }}
                renderOption={(props, option: any) => (
                  <li {...props} style={{ paddingLeft: 0, fontFamily: 'overpass-light', color: '#009CA1', fontSize: '0.8em' }}>
                      {option.name}
                  </li>
                )}
                // eslint-disable-next-line
                onChange={(e, values: any) => {
                  if (values) {
                    setFormError("");
                    setSelectedCity(values.id);
                  }
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="primary"
                    variant="outlined"
                    className="auto-complete-input"
                    placeholder="Select a city"
                    size="small"
                    sx={{    
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
                  />
                )}
              />
            </Box>
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
                allowSameDateSelection
                calendars={1}
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

export default Header;
