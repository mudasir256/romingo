import { FC, useState, MouseEventHandler, useEffect } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import {
  Autocomplete,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  CSSObject,
  useMediaQuery,
  Stack,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Popover,
  Hidden,
  Container,
} from "@mui/material";
import {
  RemoveCircleOutline,
  AddCircleOutline,
  Event,
  ExpandMore,
  LocationCity,
  BeachAccess,
  Waves,
  ArrowDropUpOutlined,
  ArrowDropDownOutlined
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import PersonIcon from "@mui/icons-material/Person";
import { randomDate } from "../../tools.js";
import { saveSearch } from "../../store/searchReducer";
import { DateTime } from "luxon";
import { useMeasure } from "react-use";
import HeroImage from '../../assets/images/home-hero.jpg';
import HeroImage2 from '../../assets/images/home-hero-2.jpg';
import HeroImage3 from '../../assets/images/home-hero-3.jpg';


import SearchImage from '../../assets/icon/magnify.png';
import CalendarImage from '../../assets/icon/calendar.png';


import "./Header.scss";

interface Props {
  sx?: CSSObject;
}

const locationIds = [
  "ba12d364-9b1f-48c5-9ddc-7e68b40df076",
  "2714faad-9ea8-4851-9506-274710cdd51b",
  "d4c10666-addf-47a6-9870-767518d9ebad",
  "6f2cf61f-c769-47d9-9e46-90c5664b60b1",
  "82145909-13b4-4aab-be20-e0db474021c1",
  "58b23325-2016-44ef-886f-67e962dab17f",
];

const Header: FC<Props> = ({ sx }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory();
  const [viewHeight, setViewHeight] = useState("");

  useEffect(() => {
    setViewHeight(`${window.innerHeight}px`);
  }, []);

  const handleImFlexibleClick = () => {
    const thirtyDays = DateTime.local().plus({ days: 21 }).toJSDate();
    const randomCheckIn = randomDate(new Date(), thirtyDays);
    const threeDaysFromCheckIn = DateTime.fromJSDate(randomCheckIn)
      .plus({ days: 3 })
      .toJSDate();
    const randomCheckOut = randomDate(
      DateTime.fromJSDate(randomCheckIn).plus({ days: 1 }).toJSDate(),
      threeDaysFromCheckIn
    );

    dispatch(
      saveSearch({
        city: locationIds[Math.floor(Math.random() * locationIds.length)],
        checkIn: new Date(randomCheckIn).toISOString(),
        checkOut: new Date(randomCheckOut).toISOString(),
        occupants: { adults: 2, children: 0, dogs: 1 },
      })
    );
    setTimeout(() => {
      history.push("/listings");
    }, 250);
  };

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
      <Box
        className="filter-bar-wrapper"
        sx={{
          backgroundImage: { xs: `linear-gradient(180deg, #000000 0%, #29292900 52%, #000000 130%), url(${HeroImage3})`, sm: `linear-gradient(180deg, #000000 -10%, #29292900 49%, #000000 130%), url(${HeroImage3})` },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Box sx={{ 
          ml: { xs: '1.5em', sm: '0em' },
          mt: { xs: '5em', sm: '4em' },  
          mb: { xs: '0em', sm: '2em' },
        }}>
          <Box sx={{ textAlign: { xs: 'left', sm: 'center'} }} className="filter-bar-wrapper-title">
            Book pet-friendly hotels
          </Box>
          <Box sx={{
            display: { xs: 'block', sm: 'none' }
          }}>
            <div className="filter-bar-wrapper-desc">
              Easy to use. Lowest rates. No pet fees.
            </div>
          </Box>
        </Box>

        <Box sx={{ 
          display: { xs: 'none', sm: 'block' }
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
  const below900 = useMediaQuery("(max-width:900px)");

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

  return (
    <Box sx={{ 
      mx: 'auto',
      mt: '0em',
      zIndex: '20',
      width: '1200px',
      ["@media (max-width: 1220px)"]: { width: '1000px' },
      ["@media (max-width: 1000px)"]: { width: '800px' },
      ["@media (max-width: 920px)"]: { mt: '0em', width: '800px' },
      ["@media (max-width: 800px)"]: { mt: '0em', width: '600px' },
      ["@media (max-width: 720px)"]: { width: '480px' },

    }}>
      <Box className="filter-bar-desktop">
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            ["@media (max-width: 1220px)"]: { display: 'block', mb: '0.5em', mt: '0.5em' },
            ["@media (max-width: 1000px)"]: { display: 'flex' },
            ["@media (max-width: 920px)"]: { justifyContent: 'center' },
            ["@media (max-width: 720px)"]: { display: 'block' },

          }}
        >

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: 'none',
              ml: '2em',
              ["@media (max-width: 600px)"]: { mx: '0.75em' },
              borderRadius: "6px",
              backgroundColor: "#fff",
              minWidth: '270px',
              "&:hover": { background: "#efefef" },
            }}
          >
            {selectedCity ? (
              <img
                src={`/images/location-icons/${getCity(selectedCity)
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
              renderOption={(props, option: any) => (
                <li {...props} style={{ paddingLeft: 10 }}>
                  <Box
                    sx={{
                      width: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                    }}
                  >
                    <img
                      src={`/images/location-icons/${option?.name
                        .substring(0, option.name.indexOf(","))
                        .toLowerCase()
                        .replace(/ /g, "_")}.svg`}
                      height="25px"
                      style={{ marginRight: "10px" }}
                    />
                  </Box>
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
              sx={{ fontFamily: "Montserrat", }}
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
                      color: "#444",
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
       
          <Box sx={{ 
            ml: '2.25em',
            ["@media (max-width: 600px)"]: { ml: '1em' }
          }}>    
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                PaperProps={{
                  sx: {
                    fontWeight: 700,
                    "& .MuiTypography-root": { fontWeight: 500 },
                  },
                }}
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
                   
                      }}
                    >
              
                      <img src={CalendarImage} width="22.7px" height="22.7px" alt="" />
                      <Typography
                        sx={{
                          color: "black",
                          fontFamily: "overpass-light",
                          textTransform: "none",
                          fontSize: '1em',
                          lineHeight: '46px',
                          ml: '1em',
                          ["@media (max-width: 600px)"]: { fontSize: '1em' }
                        }}
                      >
                        {checkDate[0]
                          ? DateTime.fromJSDate(new Date(checkDate[0])).toFormat("MMMM dd")
                          : "Check-in date"
                        }
                      </Typography> 
                    </Box>

                    <Box
                      sx={{
                        p: '1em',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: "pointer",
                        transition: "all .15s ease-in-out",
                        border: 'none',
                        "&:hover": { background: "#efefef" },
                        borderRadius: "6px",
                        backgroundColor: "#fff",
                        ml: '2em',
                        ["@media (max-width: 920px)"]: { ml: '1em' },

                      }}
                      onClick={() => setOpen(true)}

                    >
                      <img src={CalendarImage} width="22.7px" height="22.7px" alt="" />
                      <Typography
                        sx={{
                          color: "black",
                          fontFamily: "overpass-light",
                          textTransform: "none",
                          fontSize: '1em',
                          ml: '1em',
                          ["@media (max-width: 600px)"]: { fontSize: '1.25em' }
                        }}
                      >
                        {checkDate[1]
                          ? DateTime.fromJSDate(new Date(checkDate[1])).toFormat("MMMM dd")
                          : "Check-out date"
                        }
                      </Typography> 
                    </Box>
                  </Box>
                )}
              />
            </LocalizationProvider>
          </Box>

        </Box>
      
        <Box 
          sx={{ 
            my: '0.5em',
            ml: 'auto',
            mr: '2em',
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'center',
            ["@media (max-width: 600px)"]: { mx: 'auto' }
          }}
        >
          <NumberInput
            value={occupants.adults}
            onChange={(adults) => {
              if (adults > 5) return;
              onOccupantChange({ ...occupants, adults });
            }}
            minimum={1}
            type="Guest"
          />
    
          <div style={{ margin: '0 3em' }}>
            <NumberInput
              value={occupants.children}
              onChange={(children) => {
                if (children > 6) return;
                if (occupants.childrenAge && occupants.childrenAge.length > children) {
                  occupants.childrenAge = occupants.childrenAge.slice(0, children);
                } else if (
                  occupants.childrenAge &&
                  occupants.childrenAge.length <= children
                ) {
                  while (occupants.childrenAge.length !== children) {
                    occupants.childrenAge.push(0);
                  }
                }
                onOccupantChange({ ...occupants, children });
              }}
              type="Children"
            />
          </div>

          <NumberInput
            value={occupants.dogs}
            onChange={(dogs) => {
              if (dogs > 2) return;
              onOccupantChange({ ...occupants, dogs });
            }}
            type="Pet"
          />
          <button
            onClick={handleFilterOutClick}
            type="submit"
            style={{
              height: "48px",
              width: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              cursor: 'pointer',
              padding: 0,
              background: '#009CA1',
              border: 'none',
              alignSelf: "flex-end",
              marginBottom: '1em',
              marginLeft: '5em',
              marginRight: '1em'
            }}
          >
            <SearchIcon sx={{ height: "15px", fill: 'white' }} />
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export interface Occupant {
  adults: number;
  children: number;
  dogs: number;
  childrenAge?: number[];
  disabled?: boolean;
}


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
