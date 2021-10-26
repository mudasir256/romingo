import Box from "@mui/material/Box";
import { FC, useState, MouseEventHandler, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { CSSObject, Divider } from "@mui/material";
import Zoom from "@mui/material/Zoom";
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

import OccupantSelector, {
  Occupant,
} from "../OccupantSelector/OccupantSelector";

import { saveSearch } from "../../store/searchReducer";

interface Props {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
}

const FilterBar: FC<Props> = ({ sx, zoomed = false, city = "" }) => {
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

  const dateToString = (isoString: string | Date | number) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
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
    <Box
      sx={{
        ...sx,
      }}
    >
      {!zoomIn && (
        <Box
          sx={{
            display: "inline-block",
            minWidth: "300px",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #DDDDDD",
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                {getCityName(selectedCity)}
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
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                {checkDate[0] ? dateToString(checkDate[0]) : ""} -{" "}
                {checkDate[1] ? dateToString(checkDate[1]) : ""}
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
            <Button
              onClick={handleFilterInClick}
              sx={{
                px: { xs: 1, md: 3 },
              }}
            >
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                {occupants.dogs}
              </Typography>
              <PetsIcon
                sx={{
                  color: "primary.main",
                  fontSize: "75%",
                  mb: -0.15,
                  ml: 0.3,
                }}
              />
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                {occupants.adults + occupants.children}
              </Typography>
              <PersonIcon
                sx={{
                  color: "primary.main",
                  fontSize: "85%",
                  mb: -0.23,
                  ml: 0,
                }}
              />
            </Button>
            <IconButton onClick={handleFilterInClick}>
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      {zoomIn && (
        <Box
          sx={{
            borderRadius: 3,
            backgroundColor: {
              xs: "white",
              md: "transparent",
            },
            py: { xs: 1.5, md: 0 },
          }}
        >
          <Zoom
            in={zoomIn}
            timeout={{
              enter: 200,
            }}
          >
            <Box
              sx={{
                pt: { xs: 1, md: 0 },
                pb: 0,
                px: 2.5,
                my: { xs: 0 },
              }}
            >
              <Box
                sx={{
                  display: {
                    md: "flex",
                    xs: "block",
                  },
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
                    options={cities}
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
                            fontWeight: "bold",
                          },
                          input: {
                            cursor: "pointer",
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
                    fontWeight: 400,
                    display: "flex",
                    alignItems: "end",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
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
                      calendars={1}
                      allowSameDateSelection={false}
                      clearable={true}
                      value={checkDate}
                      minDate={new Date()}
                      onChange={(newValue) => {
                        setFormError("");
                        setCheckDate(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <Box
                          sx={{
                            display: {
                              xs: "block",
                              md: "flex",
                            },
                          }}
                        >
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
                                fontWeight: "bold",
                              },
                              input: {
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
                            ref={
                              endProps.inputRef as React.Ref<HTMLInputElement>
                            }
                            sx={{
                              width: { xs: "50%", md: "100px" },
                              my: { xs: 0.5, md: 0 },
                              label: {
                                fontWeight: "bold",
                              },
                              input: {
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
                        color: "primary.main",
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    onClick={handleFilterOutClick}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      pb: { xs: 1.5, md: 1.5 },
                      pt: { xs: 1.5, md: 1.5 },
                      pr: 6,
                      mx: 0,
                      borderBottomRightRadius: { xs: 0, md: "30px" },
                      borderTopRightRadius: { xs: 0, md: "30px" },
                      borderBottomLeftRadius: "0px",
                      borderTopLeftRadius: "0px",
                      my: { xs: 0.5, md: 0 },
                      width: { xs: "100%" },
                      fontWeight: "bold",
                    }}
                  >
                    <SearchIcon /> Search
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
          </Zoom>
        </Box>
      )}
    </Box>
  );
};

export default FilterBar;
