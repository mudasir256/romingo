import Box from "@mui/material/Box";
import { FC, useState, MouseEventHandler, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { Dialog, CSSObject, Divider } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { RangeInput } from "@mui/lab/DateRangePicker/RangeTypes";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import { DateTime } from "luxon";

import OccupantSelector, {
  Occupant,
} from "../OccupantSelector/OccupantSelector";

import { saveSearch } from "../../store/searchReducer";

interface Props {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
  searchOnClose?: boolean;
}

const FilterBar: FC<Props> = ({
  sx,
  zoomed = false,
  city = "",
  searchOnClose = true,
}) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isTextField, setIsTextField] = useState(false);

  const [zoomIn, setZoomIn] = useState(zoomed);
  // eslint-disable-next-line
  const search = useSelector((state: any) => state.searchReducer.search);
  // eslint-disable-next-line
  const cities = useSelector((state: any) => state.cityListReducer.cities);

  const [selectedCity, setSelectedCity] = useState(
    search.city ? search.city : ""
  );
  const [formError, setFormError] = useState("");

  const [checkDate, setCheckDate] = useState<RangeInput<Date | null>>([
    search.checkIn ? search.checkIn : null,
    search.checkOut ? search.checkOut : null,
  ]);

  const [occupants, setOccupants] = useState(search.occupants);

  const getCityName = (cityId: string) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id === cityId) return cities[i].name;
    }
  };

  const getCity = (cityId: string) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id === cityId) return cities[i];
    }
  };

  const onOccupantChange = (value: Occupant) => {
    setOccupants(value);
  };

  const handleFilterInClick: MouseEventHandler<Element> = () => {
    setFormError("");
    setZoomIn(true);
  };

  useEffect(() => {
    if (city && city.length > 0 && cities.length > 0) {
      setSelectedCity(city);
    }
  }, [cities]);

  // eslint-disable-next-line
  const dispatch: Dispatch<any> = useDispatch();

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    if (!searchOnClose) {
      setZoomIn(false);
      return;
    }
    if (
      occupants.adults !== 0 &&
      selectedCity &&
      checkDate[0] &&
      new Date(checkDate[0]) >=
        new Date(new Date().setDate(new Date().getDate() - 1)) &&
      checkDate[1] &&
      new Date(checkDate[1]) >= new Date()
    ) {
      setFormError("");
      setZoomIn(false);
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

  const handleSearch: MouseEventHandler<Element> = () => {
    if (
      occupants.adults !== 0 &&
      selectedCity &&
      checkDate[0] &&
      new Date(checkDate[0]) >=
        new Date(new Date().setDate(new Date().getDate() - 1)) &&
      checkDate[1] &&
      new Date(checkDate[1]) >= new Date()
    ) {
      setFormError("");
      setZoomIn(false);
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
          width: { xs: "100%", sm: "auto" },
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            minWidth: { xs: "95%" },
            margin: "0px auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              minHeight: "45px",
              boxShadow: { xs: "1px 2px 2px rgba(0, 0, 0, 0.15)", sm: "0" },
              justifyContent: "space-evenly",
              alignItems: "center",
              border: "1px solid #DDDDDD",
              borderRadius: 3,
              backgroundColor: "white",
              pr: { xs: "0", sm: ".5rem" },
            }}
          >
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "12px" },
                }}
              >
                {getCityName(selectedCity) || "Choose City"}
              </Typography>
            </Button>
            <Box
              sx={{
                backgroundColor: "#DDDDDD",
                flex: "0 0 1px",
                height: "24px",
                width: "1px",
              }}
            ></Box>
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "12px" },
                }}
              >
                {checkDate[0]
                  ? DateTime.fromJSDate(new Date(checkDate[0])).toFormat(
                      "MMM dd"
                    )
                  : ""}
                &nbsp;&#8212;&nbsp;
                {checkDate[1]
                  ? DateTime.fromJSDate(new Date(checkDate[1])).toFormat(
                      "MMM dd"
                    )
                  : ""}
              </Typography>
            </Button>
            <Box
              sx={{
                backgroundColor: "#DDDDDD",
                flex: "0 0 1px",
                height: "24px",
                width: "1px",
              }}
            ></Box>
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography sx={{ textTransform: "none", fontSize: "87%" }}>
                {occupants.adults + occupants.children}
              </Typography>
              <PersonIcon
                sx={{ color: "primary.main", fontSize: "100%", mb: 0, ml: 0.1 }}
              />
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <Typography
                sx={{ textTransform: "none", fontSize: { xs: "87%" } }}
              >
                {occupants.dogs}
              </Typography>
              <PetsIcon
                sx={{
                  color: "primary.main",
                  fontSize: "100%",
                  mb: 0.2,
                  ml: 0.3,
                }}
              />
            </Button>
            <IconButton onClick={handleFilterInClick}>
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={zoomIn}
        onClose={handleFilterOutClick}
        BackdropProps={{
          style: {
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        }}
      >
        <Box
          sx={{
            borderRadius: 3,
            backgroundColor: { xs: "#ffffffEB", md: "transparent" },
            maxWidth: { xs: "95%", sm: "100%" },
            margin: "0px auto",
            WebkitBackdropFilter: "blur(6px)",
            py: { xs: 1.5, md: 0 },
            pb: "1rem",
          }}
        >
          <Box sx={{ pt: { xs: 1, md: 0 }, pb: 1, px: 2.5, my: { xs: 0 } }}>
            <Box
              sx={{
                display: { md: "flex", xs: "block" },
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  minWidth: "150px",
                  mb: {
                    xs: 1,
                    md: 0,
                  },
                  display: "flex",
                  alignItems: "end",
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
                  groupBy={(o) => o.state.name}
                  value={getCity(selectedCity)}
                  // eslint-disable-next-line
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
                    width: { xs: "100%", md: "180px" },
                    minWidth: "180px",
                    fontWeight: 600,
                    ml: { xs: 0, md: 2 },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="primary"
                      variant="standard"
                      label="Location"
                      size="small"
                      sx={{
                        label: {
                          fontWeight: 600,
                        },
                        input: {
                          cursor: "pointer",
                          fontWeight: 600,
                          color: "primary.main",
                          border: "none",
                          mt: 0.55,
                          mb: 0.25,
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  fontFamily: "Roboto",
                  display: "flex",
                  alignItems: "end",
                  fontWeight: 600,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateRangePicker
                    inputFormat="MMM dd, yyyy"
                    disableMaskedInput={true}
                    open={open}
                    onAccept={() => {
                      setIsAccept(true);
                    }}
                    onClose={() => {
                      setIsAccept(false);
                      if (!isTextField) {
                        setOpen(false);
                        setIsTextField(false);
                      }
                    }}
                    onOpen={() => {
                      if (!isAccept) {
                        setOpen(true);
                      }
                    }}
                    startText="Check-in"
                    endText="Check-out"
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
                      <Box sx={{ display: { xs: "block", md: "flex" } }}>
                        <TextField
                          {...startProps}
                          onFocus={() => {
                            setIsTextField(true);
                          }}
                          onBlur={() => {
                            setIsTextField(false);
                          }}
                          onClick={() => {
                            setOpen(true);
                          }}
                          size="small"
                          color="primary"
                          variant="standard"
                          ref={
                            startProps.inputRef as React.Ref<HTMLInputElement>
                          }
                          sx={{
                            width: { xs: "50%", md: "100px" },
                            my: { xs: 0.5, md: 0 },
                            label: {
                              fontWeight: "600",
                            },
                            input: {
                              fontWeight: 600,
                              cursor: "pointer",
                              color: "primary.main",
                              border: "none",
                            },
                          }}
                        />
                        <TextField
                          {...endProps}
                          onFocus={() => {
                            setIsTextField(true);
                          }}
                          onBlur={() => {
                            setIsTextField(false);
                          }}
                          onClick={() => {
                            setOpen(true);
                          }}
                          size="small"
                          color="primary"
                          variant="standard"
                          ref={endProps.inputRef as React.Ref<HTMLInputElement>}
                          sx={{
                            width: { xs: "50%", md: "100px" },
                            my: { xs: 0.5, md: 0 },
                            label: {
                              fontWeight: "bold",
                            },
                            input: {
                              fontWeight: 600,
                              color: "primary.main",
                              cursor: "pointer",
                            },
                          }}
                        />
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  minWidth: "240px",
                  mt: {
                    xs: 1,
                    md: 0,
                  },
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <OccupantSelector
                  value={occupants}
                  onChange={onOccupantChange}
                  variant="standard"
                  size="small"
                  sx={{
                    label: {
                      fontWeight: "bold",
                    },
                    input: {
                      fontWeight: 600,
                      color: "primary.main",
                      cursor: "pointer",
                    },
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  onClick={handleSearch}
                  disableElevation
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    pb: { xs: 1.5, md: 1.5 },
                    pt: { xs: 1.5, md: 1.5 },
                    mx: "auto",
                    mt: "1rem",
                    width: "65%",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Search <SearchIcon sx={{ ml: "1rem" }} />
                </Button>
              </Box>
            </Box>
            {formError.length > 0 && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: "center", mt: 1 }}
              >
                {formError}
              </Typography>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default FilterBar;
