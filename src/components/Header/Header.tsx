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
} from "@mui/material";
import {
  RemoveCircleOutline,
  AddCircleOutline,
  Event,
  ExpandMore,
  LocationCity,
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
import { Shuffle } from "@mui/icons-material";
import { useMeasure } from "react-use";

interface Props {
  sx?: CSSObject;
}

const variants = [
  "Explore the world without the fees",
  "Discover your next getaway the easy way",
  "Resolve to travel in 2022",
];

const locationIds = [
  "ba12d364-9b1f-48c5-9ddc-7e68b40df076",
  "2714faad-9ea8-4851-9506-274710cdd51b",
  "d4c10666-addf-47a6-9870-767518d9ebad",
  "6f2cf61f-c769-47d9-9e46-90c5664b60b1",
  "82145909-13b4-4aab-be20-e0db474021c1",
  "58b23325-2016-44ef-886f-67e962dab17f",
];

const bgImages = [
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/background-frenchie.jpeg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/woman-with-dog-in-snow.jpg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/trees-background.jpeg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/bridge-background.jpeg")',
  'url("https://storage.googleapis.com/romingo-development-public/images/front-end/open-road.jpeg")',
];

const Header: FC<Props> = ({ sx }) => {
  const [bgImage, setBgImage] = useState("");
  const [variant] = useState(localStorage.getItem("ROMINGO_EXPERIMENT_VAR"));
  const under900 = useMediaQuery("(max-width:900px");
  const smallHeight = useMediaQuery("(max-height:700px");
  const landscapeSE = useMediaQuery(
    "(max-height: 414px) and (max-width: 940px)"
  );

  useEffect(() => {
    setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "100vh", md: "calc(100vh - 270px)" },
        paddingTop: { xs: "0px", sm: "0px", md: "270px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        ...sx,
      }}
    >
      <Navbar />
      <Box sx={{ top: 0, position: "absolute", left: 0, width: "100%" }}>
        <FilterBar
          sx={{
            zIndex: 1401,
            width: "100%",
            margin: "100px auto",
            display: "flex",
            justifyContent: "center",
          }}
        />

        <Box
          sx={{
            width: "100%",
            borderRadius: "12px",
            minHeight: { xs: "100vh", md: "calc(100vh - 220px)" },
            "&::before": {
              content: '""',
              backgroundImage:
                'url("https://storage.googleapis.com/romingo-development-public/images/front-end/compressed-hero.jpeg")',
              opacity: 0.9,
              filter: "brightness(107%)",
              backgroundSize: "cover",
              position: "absolute",
              backgroundPosition: {
                sm: landscapeSE
                  ? "right 0px top 10px"
                  : "right -145px top 10px",
                md: "center",
                xs: "right -145px top 10px",
              },
              top: { xs: 0, md: "270px" },
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 1,
            },
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: under900 ? 0 : "0px",
          bottom: "0px",
          zIndex: 1,
          paddingBottom: { xs: "0px", sm: "0px", md: "0px" },
          width: "100%",
          position: { xs: "absolute", sm: "absolute", md: "relative" },
          top: "0px",
          minHeight: { xs: "calc(100vh)", sm: "100vh", md: "100%" },
          maxHeight: { xs: "calc(100vh)", sm: "100vh", md: "100%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            zIndex: 100,
            height: "100%",
            maxWidth: { xs: "100%", md: "90%", xl: "100%" },
            mt: "auto",
            mb: { xs: "15%", sm: "0%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: { xs: "0 .5rem", sm: "0" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#333",
              maxWidth: { xs: "92%", sm: "100%" },
              margin: {
                xs: "auto 1rem 1rem 1rem",
                sm: landscapeSE
                  ? "15rem 0rem 0rem 0rem"
                  : "auto 1rem 1rem 1rem",
                lg: "-5rem auto .75rem 8rem",
                xl: "0rem auto 0rem 10rem",
              },
              fontFamily: "Roboto",
              fontWeight: 700,
              fontSize: { xs: "2.25rem", md: "4.125rem" },
              textShadow: "0px 0px 2px rgba(0, 0, 0, .15)",
            }}
          >
            Book pet-friendly hotels
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#222",
              fontWeight: 500,
              fontFamily: "Montserrat",
              textAlign: "left",
              fontSize: { xs: "1.25rem", md: "1.65rem" },
              margin: {
                xs: smallHeight ? "0rem 1rem 0rem 1rem" : "0rem 1rem 4rem 1rem",
                sm: landscapeSE ? "0rem 0rem 0rem 0rem" : "0rem 1rem 4rem 1rem",
                lg: ".5rem auto .75rem 8rem",
                xl: ".5rem auto .75rem 10rem",
              },
              textShadow: "0px 0px 2px rgba(0, 0, 0, .15)",
            }}
          >
            Easy to use.
            <Typography
              sx={{
                display: {
                  xs: "inline",
                  sm: landscapeSE ? "inline" : "block",
                  md: "inline",
                },
                color: "#222",
                fontWeight: 500,
                fontFamily: "Montserrat",
                textAlign: "left",
                fontSize: { xs: "1.25rem", md: "1.65rem" },
                margin: { xs: "0rem auto", sm: "0rem" },
                textShadow: "0px 0px 2px rgba(0, 0, 0, .15)",
              }}
            >
              {" "}
              Exclusive rates.{" "}
            </Typography>
            <Typography
              sx={{
                display: {
                  xs: "inline",
                  sm: landscapeSE ? "inline" : "block",
                  md: "inline",
                },
                color: "#222",
                fontWeight: 500,
                fontFamily: "Montserrat",
                textAlign: "left",
                fontSize: { xs: "1.25rem", md: "1.65rem" },
                margin: { xs: "0rem auto", sm: "0rem" },
                textShadow: "0px 0px 2px rgba(0, 0, 0, .15)",
              }}
            >
              {" "}
              No pet fees.
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
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

  const handleImFlexibleClick = () => {
    const oneWeek = DateTime.local().plus({ days: 7 }).toJSDate();
    const randomCheckIn = randomDate(new Date(), oneWeek);
    const oneWeekFromCheckin = DateTime.fromJSDate(randomCheckIn)
      .plus({ days: 7 })
      .toJSDate();
    const randomCheckOut = randomDate(
      new Date(randomCheckIn),
      oneWeekFromCheckin
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
    <>
      {below900 ? (
        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            margin: "0px auto 0px auto",
            paddingTop: "64px",
            paddingBottom: "12px",
            borderBottom: "1px solid #ddd",
            width: "100vw",
            background: "#fff",
          }}
        >
          <OccupantSelector
            value={occupants}
            onChange={onOccupantChange}
            variant="standard"
            size="small"
          />
          <Box
            sx={{
              display: "flex",
              padding: ".5rem 1rem",
              flexDirection: "column",
              alignItems: "center",
              mb: ".5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: "100%",
                minHeight: "49px",
                maxHeight: "47px",
                border: "2px solid #343B5380",
                borderRadius: "8px",
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
                  }}
                >
                  <LocationCity sx={{ height: "24px", color: "#666" }} />
                </Grid>
                <Grid
                  item
                  xs={11}
                  sx={{ marginRight: "auto", pl: ".5rem", pr: ".5rem" }}
                >
                  <Autocomplete
                    options={cities}
                    value={getCity(selectedCity) || null}
                    getOptionLabel={(option: any) => {
                      return option.name;
                    }}
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
                maxHeight: "47px",
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
                      border: "2px solid #343B5380",
                      borderRadius: "6px",
                      padding: ".25rem .25rem .25rem 1rem",
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
                      border: "2px solid #343B5380",
                      borderRadius: "6px",
                      padding: ".25rem .25rem .25rem 1rem",
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
        <Box sx={{ margin: "100px auto 0px auto", userSelect: "none" }}>
          <Box
            sx={{
              display: "flex",
              background: "#fff",
              flexDirection: below900 ? "column" : "row",
              alignItems: "center",
              mb: "1rem",
              borderRadius: "12px",
              margin: "0px auto",
              mt: "1rem",
              width: biggerThanTenForty ? "975px" : "837px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: "356px",
                minHeight: "34px",
                maxHeight: "47px",
                border: "2px solid #343B5380",
                padding: ".25rem .5rem",
                borderRadius: "6px",
                mr: ".5rem",
              }}
            >
              <LocationCity
                sx={{ height: "20px", color: "#444", ml: ".25rem" }}
              />
              <Autocomplete
                options={cities}
                value={getCity(selectedCity) || null}
                getOptionLabel={(option: any) => {
                  return option.name;
                }}
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
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "Roboto",
                        cursor: "pointer",
                        color: "#444",
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
            <Box
              sx={{
                display: "flex",
                cursor: "pointer",
                transition: "all .15s ease-in-out",
                alignItems: "center",
                maxHeight: "47px",
                mr: ".5rem",
                border: "2px solid #343B5380",
                padding: ".25rem .5rem",
                "&:hover": { background: "#efefef" },
                borderRadius: "6px",
              }}
            >
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
                    <Grid
                      container
                      onClick={() => setOpen(true)}
                      sx={{
                        minWidth: "235px",
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
                        <Event sx={{ height: "20px", color: "#444" }} />
                      </Grid>
                      <Grid item xs={8}>
                        <Grid
                          container
                          sx={{ justifyContent: "center", display: "flex" }}
                        >
                          <Grid item xs={5}>
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
                                color: "#444",
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
                          <Grid
                            item
                            xs={2}
                            sx={{
                              alignItems: "center",
                              fontWeight: 800,
                              fontFamily: "Roboto",
                              display: "flex",
                              justifyContent: "flex-start",
                              color: "#aaa",
                              textAlign: "center",
                            }}
                          >
                            &#8212;
                          </Grid>
                          <Grid item xs={5}>
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
                                color: "#444",
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
                        <ExpandMore sx={{ height: "20px", color: "#444" }} />
                      </Grid>
                    </Grid>
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                "&:hover": { background: "#efefef" },
                transition: "all .15s ease-in-out",
                mt: { xs: 1, md: 0 },
                mr: ".5rem",
                display: "flex",
                cursor: "pointer",
                alignItems: "top",
                border: "2px solid #343B5380",
                borderRadius: "6px",
                padding: ".25rem .5rem",
                maxHeight: "47px",
              }}
            >
              <OccupantSelector
                value={occupants}
                onChange={onOccupantChange}
                variant="standard"
                size="small"
              />
            </Box>
            {biggerThanTenForty && (
              <Box>
                <Button
                  fullWidth
                  onClick={handleFilterOutClick}
                  disableElevation
                  type="submit"
                  variant="contained"
                  sx={{
                    height: "47px",
                    width: "137px",
                    display: "flex",
                    alignItems: "center",
                    padding: ".25rem 0rem",
                    justifyContent: "center",
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    borderRadius: "6px",
                    textTransform: "none",
                  }}
                >
                  <SearchIcon sx={{ height: "20px", mr: "1rem" }} /> Search
                </Button>
              </Box>
            )}
          </Box>

          {!biggerThanTenForty && (
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
                  width: "137px",
                  display: "flex",
                  alignItems: "center",
                  padding: ".25rem 0rem",
                  justifyContent: "center",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  borderRadius: "6px",
                  textTransform: "none",
                }}
              >
                <SearchIcon sx={{ height: "20px", mr: "1rem" }} /> Search
              </Button>
            </Box>
          )}

          {biggerThanTenForty && (
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "14px",
                color: "#888",
                m: { xs: "1.5rem auto", sm: "1.5rem auto 0rem auto" },
                userSelect: "none",
              }}
            >
              Need some inspiration? <br />{" "}
              <Button
                disableElevation
                variant="contained"
                onClick={handleImFlexibleClick}
                sx={{
                  mt: { xs: "1rem", sm: ".5rem" },
                  background: "rgba(250, 250, 250, 0.9)",
                  border: "1px solid #03989E80",
                  fontSize: "12px",
                  padding: ".25rem .75rem",
                  textTransform: "none",
                  color: "#03989E",
                  borderRadius: "24px",
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": { background: "#fff" },
                }}
              >
                {" "}
                I&lsquo;m Flexible{" "}
                <Shuffle sx={{ fontSize: "20px", ml: "1rem" }} />
              </Button>
            </Typography>
          )}
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
}

const OccupantSelector: FC<OccupantSelectorProps> = ({
  value,
  onChange,
  onClose,
  fullWidth = true,
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
          display: { xs: "none", md: "flex" },
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
          <PersonIcon sx={{ height: "20px", color: "#444", ml: ".25rem" }} />
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
          height: "30px",
          display: { md: "none", xs: "flex" },
          alignItems: "center",
        }}
      >
        <Grid
          item
          onClick={handleClick}
          sx={{ display: "flex", textAlign: "left", mr: "auto", ml: "1rem" }}
        >
          <Typography
            sx={{
              color: "#03989E",
              textShadow: "0px 0px 1px rgba(0, 0, 0, 0.15)",
              fontFamily: "Roboto",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "12px" },
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

export default Header;
