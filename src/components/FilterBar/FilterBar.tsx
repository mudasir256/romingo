import Box from "@material-ui/core/Box";
import { FC, useState, MouseEventHandler, useEffect } from "react";
import { connect, useStore, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { CSSObject } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Autocomplete from "@material-ui/core/Autocomplete";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import DateRangePicker from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { RangeInput } from "@material-ui/lab/DateRangePicker/RangeTypes";

import OccupantSelector, {
  Occupant,
} from "../OccupantSelector/OccupantSelector";

import { saveSearch } from "../../store/searchReducer";

interface Props {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
}

const FilterBar: FC<Props> = ({ sx, zoomed = false, home = false }) => {
  const history = useHistory();

  const [zoomIn, setZoomIn] = useState(zoomed);
  const search = useSelector((state: any) => state.searchReducer.search);
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

  const [cityObject, setCityObject] = useState({
    name: "",
    id: "0",
  });

  const getCityName = (cityId: string) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id === selectedCity) return cities[i].name;
    }
  };

  const getCity = (cityId: string) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id === selectedCity) return cities[i];
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

  const dispatch: Dispatch<any> = useDispatch();

  const handleFilterOutClick: MouseEventHandler<Element> = () => {
    if (selectedCity && checkDate[0] && checkDate[1]) {
      setFormError("");
      setZoomIn(false);
      dispatch(
        saveSearch({
          city: selectedCity,
          checkIn: dateToString(checkDate[0]),
          checkOut: dateToString(checkDate[1]),
          occupants,
        })
      );

      if (home) history.push("/listings");
    } else {
      if (!selectedCity) {
        setFormError("Location required");
      }
      if (!checkDate[0]) {
        setFormError("Check-in date required");
      }
      if (!checkDate[1]) {
        setFormError("Check-out date required");
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
            <Button onClick={handleFilterInClick} sx={{ px: { xs: 1, md: 3 } }}>
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: {
                    xs: "85%",
                  },
                }}
              >
                {occupants.adults} guests
              </Typography>
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
                my: { xs: 0, md: -0.35 },
              }}
            >
              <Box
                sx={{
                  display: {
                    md: "flex",
                    xs: "block",
                  },
                  alignItems: "center",
                }}
              >
                <Box sx={{ minWidth: "180px" }}>
                  <Autocomplete
                    disablePortal
                    color="primary"
                    size="small"
                    options={cities}
                    sx={{
                      input: {
                        color: "primary.main",
                      },
                    }}
                    getOptionLabel={(option: any) => {
                      return option.name;
                    }}
                    onChange={(e, values: any) => {
                      if (values) {
                        setFormError("");
                        setSelectedCity(values.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Location"
                        variant="standard"
                      />
                    )}
                    value={getCity(selectedCity)}
                  />
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Check-in"
                      endText="Check-out"
                      calendars={2}
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
                            fullWidth={true}
                            size="small"
                            color="primary"
                            variant="standard"
                            required
                            ref={
                              startProps.inputRef as React.Ref<HTMLInputElement>
                            }
                            sx={{
                              width: { xs: "50%", md: "105px" },
                              my: { xs: 0.5, md: 0 },
                              input: {
                                color: "primary.main",
                                border: "none",
                              },
                            }}
                          />
                          <TextField
                            {...endProps}
                            fullWidth={true}
                            size="small"
                            color="primary"
                            variant="standard"
                            required
                            ref={
                              endProps.inputRef as React.Ref<HTMLInputElement>
                            }
                            sx={{
                              width: { xs: "50%", md: "105px" },
                              my: { xs: 0.5, md: 0 },
                              input: {
                                color: "primary.main",
                              },
                            }}
                          />
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <OccupantSelector
                    value={occupants}
                    onChange={onOccupantChange}
                    variant="standard"
                    fullWidth={true}
                    size="small"
                    sx={{
                      minWidth: "240px",
                      input: {
                        color: "primary.main",
                      },
                      my: { xs: 0.5, md: 0 },
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    onClick={handleFilterOutClick}
                    type="submit"
                    color="primary"
                    size="large"
                    sx={{
                      pb: { xs: 1.5, md: 0.46 },
                      pt: { xs: 1.5, md: 1.8 },
                      px: 2,
                      borderRadius: "0px",
                      my: { xs: 0.5, md: 0 },
                      width: { xs: "100%" },
                      fontWeight: "bold",
                      borderBottom: {
                        xs: "none",
                        md: "1px solid rgba(0, 0, 0, 0.42)",
                      },
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
