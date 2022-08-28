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
import SearchImage from '../../assets/icon/magnify.png';
import CalendarImage from '../../assets/icon/calendar.png';

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
    >
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: '620px',
          marginTop: '112px',
          backgroundImage: `url(${HeroImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div style={{ fontFamily: 'sansita-light', fontSize: '85px', lineHeight: '72px', color: 'white', marginTop: '121px', marginLeft: '140px', marginBottom: '12px' }}>
          Book<br />Pet-Friendly<br />Hotels
        </div>
        <div style={{ fontFamily: 'sansita-light', fontSize: '20px', lineHeight: '24px', color: 'white', marginLeft: '140px', letterSpacing: '1.6px' }}>
          Easy to use. Lowest rates. No pet fees.
        </div>
        <FilterBar
          sx={{
            zIndex: 1401,
            width: "100%",
            margin: "100px 0",
            display: "flex",
            justifyContent: "center",
          }}
        />
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
    <>
      {below900 ? (
        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            margin: "0px auto 0px auto",
            paddingTop: "74px",
            paddingBottom: "12px",
            borderBottom: "1px solid #ddd",
            width: "100vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: ".5rem 1rem",
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
                border: 'none'
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
                    pl: "1rem",
                    border: 'none'
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
                </Grid>
                <Grid
                  item
                  xs={11}
                  sx={{
                    marginRight: "auto",
                    pl: ".5rem",
                    pr: ".5rem",
                    border: 'none'
                  }}
                >
                  <Autocomplete
                    disableClearable
                    options={cities.sort(function (a: any, b: any) {
                      if (a.state.name === b.state.name) {
                        // Price is only important when cities are the same
                        return b.name - a.name;
                      }
                      return a.state.name > b.state.name ? 1 : -1;
                    })}
                    blurOnSelect="touch"
                    groupBy={(o) => o.state.name}
                    value={getCity(selectedCity) || null}
                    getOptionLabel={(option: any) => {
                      return option.name;
                    }}
                    renderOption={(props, option: any) => (
                      <li {...props} style={{ paddingLeft: 10 }}>
                        <Box
                          sx={{
                            width: "55px",
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
                    sx={{
                      fontFamily: "Roboto",
                      width: "100%",
                      margin: "0px auto 0px 0px ",
                      fontSize: "14px",
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        color="primary"
                        variant="outlined"
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
                          input: {
                            padding: "0px",
                            fontSize: "14px",
                            fontWeight: 600,
                            fontFamily: "Roboto",
                            cursor: "pointer",
                            color: "#444",
                            border: "none",
                            "&::placeholder": {
                              textOverflow: "ellipsis !important",
                              color: "#666",
                              opacity: 1,
                              fontWeight: 600,
                            },
                          },
                        }}
                      />
                    )}
                  />
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
                  renderInput={() => <Grid sx={{ display: "none" }}></Grid>}
                />
              </LocalizationProvider>

              <Grid
                container
                onClick={() => setOpen(true)}
                sx={{
                  width: "100%",
                  mt: "1rem",
                }}
              >
                <Grid item xs={6} sx={{ pr: ".25rem" }}>
                  <Grid
                    container
                    sx={{
                      borderRadius: "6px",
                      padding: ".25rem .25rem .25rem 1rem",
                      border: 'none'
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                      sx={{
                        pr: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Event sx={{ height: "24px", color: "#666" }} />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              color: "#666",
                              fontFamily: "Roboto",
                              mb: "-.125rem",
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: { xs: "11px" },
                            }}
                          >
                            Check-in
                          </Typography>
                          <Typography
                            sx={{
                              color: "#666",
                              fontFamily: "Roboto",
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: { xs: "14px" },
                            }}
                          >
                            {checkDate[0]
                              ? DateTime.fromJSDate(
                                new Date(checkDate[0])
                              ).toFormat("MMM dd")
                              : ""}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sx={{ pl: " .25rem" }}>
                  <Grid
                    container
                    sx={{
                      borderRadius: "6px",
                      padding: ".25rem .25rem .25rem 1rem",
                      border: 'none'
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                      sx={{
                        pr: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Event sx={{ height: "24px", color: "#666" }} />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        sx={{
                          color: "#666",
                          fontFamily: "Roboto",
                          mb: "-.125rem",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: { xs: "11px" },
                        }}
                      >
                        Check-out
                      </Typography>
                      <Typography
                        sx={{
                          color: "#666",
                          fontFamily: "Roboto",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: { xs: "14px" },
                        }}
                      >
                        {checkDate[1]
                          ? DateTime.fromJSDate(
                            new Date(checkDate[1])
                          ).toFormat("MMM dd")
                          : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                fullWidth
                onClick={handleFilterOutClick}
                disableElevation
                type="submit"
                variant="contained"
                sx={{
                  height: "47px",
                  width: "47px",
                  display: "flex",
                  alignItems: "center",
                  padding: ".25rem 0rem",
                  justifyContent: "center",
                  mt: "1rem",
                  ml: ".5rem",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  borderRadius: "6px",
                  textTransform: "none",
                  pointerEvents: "auto",
                }}
              >
                <SearchIcon
                  sx={{
                    height: "32px",
                    fontSize: "28px",
                    pointerEvents: "auto",
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ margin: "0", userSelect: "none", position: 'absolute', bottom: '76px', left: '50%', transform: 'translateX(-50%)', height: '120px', background: 'white', borderRadius: '15px', border: '4px solid #009CA1', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 11 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: below900 ? "column" : "row",
              alignItems: "center",
              borderRadius: "12px",
              justifyContent: 'center',
              padding: '0 24px 0 20px'
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "356px",
                  minHeight: "34px",
                  maxHeight: "47px",
                  border: 'none',
                  padding: ".25rem .5rem",
                  borderRadius: "6px",
                  mr: ".5rem",
                  backgroundColor: "#fff",
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
                          width: "55px",
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
                  sx={{ fontFamily: "Montserrat" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="primary"
                      variant="outlined"
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
                        input: {
                          padding: "0px",
                          fontSize: "30px",
                          lineHeight: '46px',
                          fontWeight: 600,
                          fontFamily: "overpass-light",
                          cursor: "pointer",
                          color: "#000",
                          border: "none",
                          "&::placeholder": {
                            textOverflow: "ellipsis !important",
                            color: "#444",
                            opacity: 1,
                            fontWeight: 600,
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <div style={{
                fontFamily: 'overpass-light',
                fontSize: '15px',
                lineHeight: '23px',
                color: '#949494',
                marginLeft: '27px'
              }}>Select a city</div>
            </Box>
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
                  <>
                    <Box
                      sx={{
                        cursor: "pointer",
                        transition: "all .15s ease-in-out",
                        minHeight: "34px",
                        mr: ".5rem",
                        border: 'none',
                        padding: ".25rem .5rem",
                        "&:hover": { background: "#efefef" },
                        borderRadius: "6px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <Grid
                        container
                        onClick={() => setOpen(true)}
                        sx={{
                          minWidth: "200px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={2}
                          sx={{
                            pr: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img src={CalendarImage} width="22.7px" height="22.7px" alt="" />
                        </Grid>
                        <Grid item xs={8}>
                          <Grid
                            container
                            sx={{ justifyContent: "center", display: "flex" }}
                          >
                            <Grid item xs={10}>
                              {
                                checkDate[0] ?
                                  <Typography
                                    sx={{
                                      color: "black",
                                      fontFamily: "overpass-light",
                                      textTransform: "none",
                                      fontSize: '30px',
                                      lineHeight: '46px',
                                    }}
                                  >
                                    {checkDate[0]
                                      ? DateTime.fromJSDate(
                                        new Date(checkDate[0])
                                      ).toFormat("MMM dd")
                                      : ""}
                                  </Typography> : <Typography
                                    sx={{
                                      color: "black",
                                      fontFamily: "overpass-light",
                                      textTransform: "none",
                                      fontSize: '30px',
                                      lineHeight: '46px',
                                    }}
                                  >
                                    Check-in
                                  </Typography>
                              }
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <div style={{
                        fontFamily: 'overpass-light',
                        fontSize: '15px',
                        lineHeight: '23px',
                        color: '#949494',
                        marginLeft: '40px'
                      }}>Add date</div>
                    </Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        transition: "all .15s ease-in-out",
                        minHeight: "34px",
                        mr: ".5rem",
                        border: 'none',
                        padding: ".25rem .5rem",
                        "&:hover": { background: "#efefef" },
                        borderRadius: "6px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <Grid
                        container
                        onClick={() => setOpen(true)}
                        sx={{
                          minWidth: "200px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={2}
                          sx={{
                            pr: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img src={CalendarImage} width="22.7px" height="22.7px" alt="" />
                        </Grid>
                        <Grid item xs={8}>
                          <Grid
                            container
                            sx={{ justifyContent: "center", display: "flex" }}
                          >
                            <Grid item xs={10}>
                              {checkDate[1] ? <Typography
                                sx={{
                                  color: "black",
                                  fontFamily: "overpass-light",
                                  textTransform: "none",
                                  fontSize: '30px',
                                  lineHeight: '46px',
                                }}
                              >
                                {checkDate[1]
                                  ? DateTime.fromJSDate(
                                    new Date(checkDate[1])
                                  ).toFormat("MMM dd")
                                  : ""}
                              </Typography> :
                                <Typography
                                  sx={{
                                    color: "black",
                                    fontFamily: "overpass-light",
                                    textTransform: "none",
                                    fontSize: '30px',
                                    lineHeight: '46px',
                                  }}
                                >
                                  Check-out
                                </Typography>
                              }
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <div style={{
                        fontFamily: 'overpass-light',
                        fontSize: '15px',
                        lineHeight: '23px',
                        color: '#949494',
                        marginLeft: '40px'
                      }}>Add date</div>
                    </Box>
                  </>
                )}
              />
            </LocalizationProvider>
            <div style={{ marginLeft: '30px' }}>
              <NumberInput
                value={occupants.adults}
                onChange={(adults) => {
                  if (adults > 5) return;
                  onOccupantChange({ ...occupants, adults });
                }}
                minimum={1}
                type="Guest"
              />
            </div>
            <div style={{ margin: '0 86px' }}>

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
            <Hidden lgDown>
              <Box>
                <button
                  onClick={handleFilterOutClick}
                  type="submit"
                  style={{
                    height: "52px",
                    width: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    marginLeft: '40px',
                    padding: 0,
                    background: '#009CA1',
                    border: 'none'
                  }}
                >
                  <SearchIcon sx={{ height: "15px", fill: 'white' }} />
                </button>
              </Box>
            </Hidden>
          </Box>

          <Hidden lgUp>
            <Box
              sx={{
                margin: "1rem auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                fullWidth
                onClick={handleFilterOutClick}
                disableElevation
                type="submit"
                variant="contained"
                sx={{
                  height: "47px",
                  width: "150px",
                  display: "flex",
                  alignItems: "center",
                  padding: ".25rem 0rem",
                  justifyContent: "center",
                  fontFamily: "Roboto",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "120%",
                  borderRadius: "6px",
                }}
              >
                <SearchIcon sx={{ height: "20px", mr: "1rem" }} /> Search
              </Button>
            </Box>
          </Hidden>
        </Box>
      )}
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
  const [ref, { width }] = useMeasure<HTMLDivElement>();
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

  return (
    <>
      <Grid
        container
        onClick={handleClick}
        sx={{
          minWidth: "174px",
          display: variant === "outlined" ? "flex" : "none",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={2}
          sx={{
            pr: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={SearchImage} width="22.6px" height="22.5px" alt="" />
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            sx={{
              justifyContent: "center",
              display: "flex",
              textAlign: "left",
            }}
          >
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: "#666",
                  fontFamily: "Roboto",
                  mb: "-.125rem",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "11px" },
                }}
              >
                Guests
              </Typography>
              <Typography
                sx={{
                  color: "#444",
                  fontFamily: "Roboto",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "14px" },
                  cursor: "pointer",
                }}
              >
                {value.adults + value.children} Guests, {value.dogs} Pets
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            ml: "auto",
            mr: ".5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ExpandMore sx={{ height: "20px", color: "#666" }} />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          marginBottom: "-2px",
          height: "10px",
          display: variant === "standard" ? "flex" : "none",
          alignItems: "center",
        }}
      >
        <Grid
          item
          onClick={handleClick}
          sx={{
            display: "flex",
            textAlign: align,
            mr: align === "left" ? "auto" : 0,
            ml: align === "right" ? "auto" : "1rem",
          }}
        >
          <Typography
            sx={{
              color: "#03989E",
              textShadow: "0px 0px 1px rgba(0, 0, 0, 0.15)",
              fontFamily: "Roboto",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "12px" },
              cursor: "pointer",
            }}
          >
            {value.adults + value.children} Guests, {value.dogs} Pet
            {value.dogs === 1 ? "" : "s"}
          </Typography>
          <ExpandMore sx={{ height: "20px", color: "#03989E" }} />
        </Grid>
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
        <Stack sx={{ px: 2, pt: 2 }} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">Adults</Typography>
            <NumberInput
              value={value.adults}
              onChange={(adults) => {
                if (adults > 5) return;
                onChange({ ...value, adults });
              }}
              minimum={1}
              type="Adults"
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Children</Typography>
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
              type="Children"
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Typography variant="body1">Dogs</Typography>
            <NumberInput
              value={value.dogs}
              onChange={(dogs) => {
                if (dogs > 2) return;
                onChange({ ...value, dogs });
              }}
              type="Pets"
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
                      sx={{ textAlign: "center" }}
                      value={
                        value.childrenAge && value.childrenAge[i]
                          ? value.childrenAge[i].toString()
                          : "0"
                      }
                      onChange={(e: any) => {
                        if (value.childrenAge === undefined) {
                          value.childrenAge = [];
                        }
                        value.childrenAge[i] = parseInt(e.target.value);
                        onChange({ ...value });
                      }}
                    >
                      {Array.from({ length: 18 }, (_, k: number) => {
                        return (
                          <MenuItem value={k} key={k}>
                            {k}
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
          <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onChange(value + 1)}>
            <ArrowDropUpOutlined />
          </div>
          <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onChange(Math.max(value - 1, minimum))}>
            <ArrowDropDownOutlined />
          </div>
        </Stack>
      </Stack>
      <div style={{ fontFamily: 'overpass-light', fontSize: '15px', lineHeight: '23px', color: '#949494' }}>{type}</div>
    </div>
  );
};

export default Header;
