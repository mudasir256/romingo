import { FC, useState, MouseEventHandler, useEffect } from "react";
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
  People,
  Today,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import PersonIcon from "@mui/icons-material/Person";
import { randomDate } from "../tools.js";
import { saveSearch } from "../store/searchReducer";
import { DateTime } from "luxon";
import { useMeasure } from "react-use";

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
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          margin: "0px auto 0px auto",
          paddingTop: "0.1em",
          paddingBottom: "12px",
          width: "100vw",
          backgroundColor: 'transparent',
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: ".5rem 1.70rem",
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
                  pl: "1rem",
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
                  <LocationCity sx={{ height: "24px", color: "#666" }} />
                )}
              </Grid>
              <Grid
                item
                xs={11}
                sx={{
                  marginRight: "auto",
                  pl: ".5rem",
                  pr: ".5rem",
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
                    <li {...props} style={{ paddingLeft: 10, fontFamily: 'overpass-light' }}>
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
                    fontFamily: "overpass-light",
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
                          fontFamily: "overpass-light",
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
              <Box sx={{ position: 'absolute', left: '50%', mt: '0em' }}>
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
              </Box>
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
                    border: "1px solid #DDDDDD",
                    borderRadius: "6px",
                    padding: ".25rem .25rem .25rem 1rem",
                    backgroundColor: 'white'
                  }}
                >
                  <Grid
                    item
                    sx={{
                      pl: '0.5em',
                      pr: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Today sx={{ height: "24px", color: "#666" }} />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            color: "#666",
                            fontFamily: "overpass-light",
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
                            fontFamily: "overpass-light",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: { xs: "14px" },
                          }}
                        >
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
              <Grid item xs={6} sx={{ pl: " .25rem" }}>
                <Grid
                  container
                  sx={{
                    border: "1px solid #DDDDDD",
                    borderRadius: "6px",
                    padding: ".25rem .25rem .25rem 1rem",
                    backgroundColor: 'white'
                  }}
                >
                  <Grid
                    item
                    sx={{
                      pl: '0.5em',
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
                        fontFamily: "overpass-light",
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
                        fontFamily: "overpass-light",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: { xs: "14px" },
                      }}
                    >
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
              fontWeight: 500,
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
          border: "1px solid #DDDDDD",
          borderRadius: "6px",
          padding: ".5rem .25rem .5rem 1rem",
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
            color: '#666',
            height: '24px',
            p: '0.1em',
            pl: 0,
          }}/>
        </Grid>
          <Typography
            sx={{
              mt: '0.25em',
              ml: '0.25em',
              color: "#666",
              fontFamily: "overpass-light",
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "14px" },
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

export default FilterBar;