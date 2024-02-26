import { FC } from 'react';
import { useState } from 'react'

import { Box, TextField, NativeSelect, InputLabel, FormControl, Button } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { Today, InsertInvitation } from "@mui/icons-material";

import { DateTime } from "luxon";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSearch } from "../store/searchReducer";

import GooglePlaceAutoComplete from "./GooglePlaceAutoComplete";


interface Props {
  search: any;
}

const CustomTextField = (props) => (<TextField {...props} />)

const LocationPageFilterBar: FC<Props> = ({ search }) => {

  const [selectedCity, setSelectedCity] = useState(search ? {
    city: search.city,
    lat: search.lat,
    lng: search.lng,
  } : null);


  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const second = new Date()
  second.setDate(second.getDate() + 2)

  const [dateRange, setDateRange] = useState<DateRange<Date | null>>([tomorrow, second])

  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {

    if (selectedCity && dateRange && adults) {
      dispatch(
        saveSearch({
          city: selectedCity.city,
          checkIn: new Date(dateRange[0]).toISOString(),
          checkOut: new Date(dateRange[1]).toISOString(),
          occupants: {
            adults,
            children: children,
            numChildren: children,
            childrenAge: new Array(children).fill(1),
            dogs: 1
          },
          lat: selectedCity.lat,
          lng: selectedCity.lng,
        })
      );
      
      navigate("/listings");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
      
    >
      <Box 
        sx={{
          background: 'white',  
          border: '1px solid #D3D3D3', 
          borderRadius: '5px'
        }}
      >
        <GooglePlaceAutoComplete 
          width="95%" 
          setSelectedCity={setSelectedCity} 
          city={selectedCity} 
          showShrinkText={true}
        />
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          localeText={{ start: 'CHECK IN', end: 'CHECK OUT' }}
          format="MMM dd"
          calendars={2}
          value={dateRange}
          minDate={new Date()}
          onChange={(newValue) => setDateRange(newValue)}
          slots={{
            textField: (params) => CustomTextField(params)
          }}
          slotProps={{ 
            textField: ({ position }) => ({
              variant: 'outlined'
            }),
          }}
        />
      </LocalizationProvider>

      <Box sx={{ border: '1px solid #D3D3D3', display: 'flex', p: '0.5rem', pb: '0.25rem', borderRadius: '6px' }}>
        <FormControl 
          fullWidth
          sx={{ borderRight: 'solid #D3D3D3', mr: '0.5rem' }} 
        >
          <InputLabel variant="standard" htmlFor="adults">
            ADULTS
          </InputLabel>
          <NativeSelect
            inputProps={{
              name: 'adults',
              id: 'adults',
            }}
            value={adults}
            onChange={(e) => setAdults(Number(e.target?.value))}
            disableUnderline
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={3}>3</option>
            <option value={3}>4</option>
            <option value={3}>5</option>
            <option value={3}>6</option>
          </NativeSelect>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="children">
            CHILDREN
          </InputLabel>
          <NativeSelect
            inputProps={{
              name: 'children',
              id: 'children',
            }}
            value={children}
            onChange={(e) => setChildren(Number(e.target?.value))}
            disableUnderline
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={3}>3</option>
            <option value={3}>4</option>
            <option value={3}>5</option>
            <option value={3}>6</option>
          </NativeSelect>
        </FormControl>
      </Box>

      <Button variant="contained" onClick={() => handleSearch()}>Search</Button>
    </Box>
  );
}

export default LocationPageFilterBar;