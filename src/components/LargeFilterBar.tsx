import { FC, useState, MouseEventHandler, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import {
  Button,
  Box,
  Typography,
  CSSObject,
  Select,
  FormControl,
  MenuItem,
  ListSubheader
} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import OccupantSelector, { Occupant } from "./OccupantSelector/OccupantSelector";
import { Today, InsertInvitation } from "@mui/icons-material";
import { DateTime } from "luxon";
import { saveSearch } from "../store/searchReducer";
import SearchImage from '../assets/icon/magnify.png';

import "./Header/Header.scss";
import GooglePlaceAutoComplete from "./GooglePlaceAutoComplete";

import { parseISO } from 'date-fns';

interface FilterBarProps {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
  showText?: boolean;
}

const LargeFilterBar: FC<FilterBarProps> = ({ showText = false, sx, zoomed = false, city = "" }) => {
  
  const [isTextField, setIsTextField] = useState(false);
  const search: ISearch = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [selectedCity, setSelectedCity] = useState(city ? city : search.city ? {
    city: search.city,
    lat: search.lat,
    lng: search.lng,
  } : null);

  const [formError, setFormError] = useState("");

  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);

  const [checkDate, setCheckDate] = useState<DateRange<Date | null>>([
    search.checkIn 
      ? parseISO(search.checkIn)
      : new Date(),
    search.checkOut
      ? parseISO(search.checkOut)
      : DateTime.local().plus({ days: 1 }).toJSDate(),
  ]);

  const [occupants, setOccupants] = useState(
    search.occupants.dogs > 0
      ? search.occupants
      : { adults: 2, children: 0, dogs: 1 }
  );

  const [showSelectCity, setShowSelectCity] = useState<boolean>(false)

  const navigate = useNavigate();

  const dispatch: Dispatch<any> = useDispatch();

  const onOccupantChange = (value: Occupant) => setOccupants(value);

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
    if (search?.occupants) {
      setOccupants({
        ...search.occupants
      })

    }
  }, [search])

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
          city: selectedCity.city,
          checkIn: new Date(checkDate[0]).toISOString(),
          checkOut: new Date(checkDate[1]).toISOString(),
          occupants,
          lat: selectedCity.lat,
          lng: selectedCity.lng,
        })
      );
      
      navigate("/listings");
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
    fontFamily: 'Poppins-Light',
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

  const handleCityClick = (city: any) => {
    setSelectedCity(city.id)
  }

  return (
    <Box 
      sx={{ 
        mx: 'auto',
        mt: '0em',
        zIndex: '20',
        width: 'fit-content',
      }}
    >
      {showText &&
        <Box>
          <Box component="h1" sx={{ ml: '0.1em', mb: '0.5em' }} className="filter-bar-wrapper-title"><b>Book pet-friendly hotels</b></Box>
          <Box component="h2" sx={{ ml: '0.3em'  }} className="filter-bar-wrapper-desc">the hassle-free way to travel with your pets</Box>
        </Box>
      }
      
      <Box 
        sx={{ 
          mt: '1.5em', 
          border: '1px gray solid',
          boxSizing: 'border-box',
          background: "#f5f3f3",
          zIndex: 11,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '6px'
        }} 
        className="filter-bar-desktop"
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.5rem',
            px: '0.75rem',
          }}
        >
          <Box sx={{background: 'white',  border: '1px solid #aaabab', borderRadius: '5px'}}>
            <FormControl fullWidth>
              <GooglePlaceAutoComplete width={290} setSelectedCity={setSelectedCity} city={selectedCity} />
            </FormControl>
          </Box>

          <Box
            sx={{
              background: 'white',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                format="MMM dd"
                open={open}
                onAccept={() => setIsAccept(true)}
                onClose={handleDateRangeClose}
                onOpen={() => {
                  if (!isAccept) {
                    setOpen(true);
                  }
                }}
                calendars={2}
                // clearable={true}
                value={checkDate}
                minDate={new Date()}
                onChange={(newValue: DateRange<Date>) => {
                  setFormError("");
                  setCheckDate(newValue);
                }}
                slots={{
                  field: SingleInputDateRangeField,
                }}
                slotProps={{ 
                  textField: ({ position }) => {
                    const isStart = position == 'start';

                    const startValue = checkDate[0]
                      ? DateTime.fromJSDate(new Date(checkDate[0])).toFormat("MMM dd")
                      : "Check-in date";
                    const endValue = checkDate[1]
                      ? DateTime.fromJSDate(new Date(checkDate[1])).toFormat("MMM dd")
                      : isStart ? "Check-in date" : "Check-out date";

                    return ({
                      variant: 'standard',
                      sx: { // wrapper styles
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '0.3rem',
                        height: '40px',
                        width: showText ? '290px' : '170px',
                        border: '1px solid #aaabab', 
                        borderRadius: '5px',
                        cursor: 'pointer',
                      },
                      InputProps: { // internal input styles
                        value: `${startValue} - ${endValue}`,
                        startAdornment: (
                          <Box ml="0.75rem" mr="0.75rem" mt="0.4rem">
                            <Today fontSize="small" sx={{ color: 'black' }} />
                          </Box>
                        ),
                        sx: {
                          color: "black",
                          fontFamily: "Poppins-Light",
                          textTransform: "none",
                          fontSize: '15px',
                          ["@media (max-width: 600px)"]: { fontSize: '1em' },
                          width: '100%',
                          border: 'none'
                        },
                        disableUnderline: true,
                      },
                    })
                  },
                  actionBar: {
                    actions: ['clear'],
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Box>
          <OccupantSelector
            value={occupants}
            onChange={onOccupantChange}
            variant="standard"
            size="small"
            fullWidth={false}
            sx={{
              width: showText ? '290px' : 'auto',
              height: '40px',
              border: '1px solid #aaabab', borderRadius: '5px',
              background: 'white',
              label: {
                fontFamily: 'Poppins-Light',
                fontSize: '15px',
                color: 'black',
              },
              input: {
                cursor: "pointer",
                fontFamily: 'Poppins-Light',
                fontSize: '15px',
                color: 'black',
                mt: '0.05rem'
              },
            }}
          />
        </Box>

        {showText ? (
          <Button
            onClick={handleFilterOutClick}
            variant="contained"
            size="medium"
            sx={{
              textTransform: "none",
              fontFamily: "Poppins-Light",
              m: '0.75em',
              p: '1rem',
              height: '41.5px',
            }}
            startIcon={<SearchIcon sx={{ height: "24px", fill: 'white' }} />}
          >
            Search
          </Button>
          ) : (
          <Box 
            onClick={handleFilterOutClick} 
            sx={{ 
              cursor: 'pointer',
              backgroundColor: "#03989E",
              borderRadius: "100%",
              p: "0.5rem",
              m: "0.5rem",
            }}
          >
            <SearchIcon sx={{ cursor: 'pointer', height: "20px", fill: 'white' }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export { LargeFilterBar };