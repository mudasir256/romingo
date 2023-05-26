import { Autocomplete, Box, Button, CSSObject, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { Dispatch, FC, MouseEventHandler, useEffect } from 'react';
import styles from './ReservationDetails.module.css';
import { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import dayjs, { Dayjs } from 'dayjs';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RangeInput } from '@mui/lab/DateRangePicker/RangeTypes';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';
import OccupantSelector, {
  Occupant,
} from "../OccupantSelector/OccupantSelector";
import { saveSearch } from '../../store/searchReducer';
import SearchImage from '../../assets/icon/magnify.png';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import '@mui/lab';
import { InsertInvitation, Today } from '@mui/icons-material';
import SearchIcon from "@mui/icons-material/Search";

interface ReservationDetailsProps {
    sx?: CSSObject;
    zoomed?: boolean;
    home?: boolean;
    city?: string;
    flag?: string;
    bookingId?: string; 
}

const ReservationDetails: FC<ReservationDetailsProps> = ({
  sx, zoomed = false, city = "", flag, bookingId
}) => {
  console.log({bookingId});
  
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
        
      history.push("/listings", {flag, bookingId});
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
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      rowSpacing={2}
      alignItems="center"
    >
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
              Select a city
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
          </Box>
       
          <Box sx={{ 
            ml: '1em',
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
              width: '224px',
              label: {
                fontFamily: 'overpass-light',
                fontWeight: "bold",
              },
              input: {
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: 'overpass-light'
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
      {/* <Grid
        item
        xs={12}
        sm={12}
      >
        <TextField
          id="confirmation-id"
          value={propertyConfirmationId}
          variant="standard"
          label="Confirmation ID"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="first-name"
          label="First Name"
          value={firstName}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="last-name"
          label="last Name"
          value={lastName}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="user-mail"
          label="Email"
          value={email}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="phone-number"
          label="Phone Number"
          value={mobileNumber}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="can-cancel"
          label="Can Cancel"
          value={`${data.cancelationPolicy.cancelable ? 'Yes' : 'No'}`}
          variant="standard"
          inputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <TextField
          id="total-price"
          label="Total Price"
          value={`$ ${data.totalPriceAfterTax}`}
          variant="standard"
          inputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
      >
        <TextField
          id="cancel-by-time"
          label="Cancel By Time"
          value={formatUnixLong(parseInt(deadlineLocal))}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack direction="row" spacing={2}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={defaultCheckInData}
              onChange={handleChangeDateCheckIn}
              renderInput={(params) => <TextField {...params} variant="standard" />}
            />
          </Stack>
        </LocalizationProvider>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={defaultCheckOutData}
              onChange={handleChangeDateCheckOut}
              renderInput={(params) => <TextField {...params} variant="standard" />}
            />
          </Stack>
        </LocalizationProvider>
      </Grid> */}
    </Grid>
  );
}

export default ReservationDetails;
