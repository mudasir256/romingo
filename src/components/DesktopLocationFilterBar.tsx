import { FC, useState, MouseEventHandler, useEffect } from "react";
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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import OccupantSelector, {
  Occupant,
} from "./OccupantSelector/OccupantSelector";
import {
  Today,
  InsertInvitation,
} from "@mui/icons-material";
import { DateTime } from "luxon";
import { saveSearch } from "../store/searchReducer";
import SearchImage from '../assets/icon/magnify.png';

import "./Header/Header.scss";
import GooglePlaceAutoComplete from "./GooglePlaceAutoComplete";

interface FilterBarProps {
  sx?: CSSObject;
  zoomed?: boolean;
  home?: boolean;
  city?: string;
}

export const DesktopLocationFilterBar: FC<FilterBarProps> = ({ showText = false, sx, zoomed = false, city = "" }) => {
  
  const [isTextField, setIsTextField] = useState(false);
  const search = useSelector((state: any) => state.searchReducer.search);
  const cities = useSelector((state: any) => state.cityListReducer.cities);
  const [selectedCity, setSelectedCity] = useState(city ? city : search.city ? {
    city: search.city,
    lat: search.lat,
    lng: search.lng,
  } : null);

  const [formError, setFormError] = useState("");

  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [checkDate, setCheckDate] = useState<DateRange<Date | null>>(
    [
      search.checkIn ? search.checkIn : new Date(),
      search.checkOut
        ? search.checkOut
        : DateTime.local().plus({ days: 1 }).toJSDate(),
    ]
  );

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
      console.log(occupants)
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
        width: '90%',
      }}
    >  
      <Box 
        sx={{ 
          mt: '1.5em', 
          zIndex: 11,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '6px',
          gap: '0.5rem'
        }} 
      >
        <Box sx={{background: 'white',  border: '1px solid #aaabab', borderRadius: '5px'}}>
          <FormControl fullWidth>
            <GooglePlaceAutoComplete width={372} setSelectedCity={setSelectedCity} city={selectedCity} />
          </FormControl>
        </Box>

        <Box sx={{ 
          width: '100%',
          background: 'white',
        }}>    
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              format="MMM dd"
              // disableMaskedInput={true}
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
              value={checkDate || null}
              minDate={new Date()}
              onChange={(newValue: DateRange<Date>) => {
                setFormError("");
                setCheckDate(newValue);
              }}
              // renderInput={(startProps, endProps) => (
              //   <Box
              //     sx={{
              //       display: 'flex',
              //       justifyContent: 'flex-start',
              //       flexDirection: 'row',
              //       alignItems: 'center',
              //       gap: '0.3rem',
              //       height: '40px',
              //       width: '100%',
              //       border: '1px solid #aaabab', borderRadius: '5px'
              //     }}
              //     onClick={() => setOpen(true)}
              //   >
                
              //     <Box ml="0.75rem" mt="0.4rem"><Today fontSize="small" sx={{ color: 'black' }} /></Box>
              //     <Typography
              //       sx={{
              //         ml: '0.25rem',
              //         color: "black",
              //         fontFamily: "Poppins-Light",
              //         textTransform: "none",
              //         fontSize: '15px',
              //         ["@media (max-width: 600px)"]: { fontSize: '1em' }
              //       }}
              //     >
              //       {checkDate[0]
              //         ? DateTime.fromJSDate(new Date(checkDate[0])).toFormat("MMM dd")
              //         : "Check-in date"
              //       }
              //     </Typography> 
              
                  
              //     <Typography variant="base">-</Typography>

              //     <Typography
              //       sx={{
              //         color: "black",
              //         fontFamily: "Poppins-Light",
              //         textTransform: "none",
              //         fontSize: '15px',
              //         mr: '0.5rem',
              //         ["@media (max-width: 600px)"]: { fontSize: '1.25em' }
              //       }}
              //     >
              //       {checkDate[1]
              //         ? DateTime.fromJSDate(new Date(checkDate[1])).toFormat("MMM d")
              //         : "Check-out date"
              //       }
              //     </Typography> 
              
              //   </Box>
              // )}
              slotProps={{ textField: { variant: 'outlined' } }}
            />
          </LocalizationProvider>
        </Box>
          
        <Box>
          <OccupantSelector
            value={occupants}
            onChange={onOccupantChange}
            variant="standard"
            size="small"
            fullWidth={false}
            sx={{
              width: '100%',
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
      </Box>
    </Box>
  );
};