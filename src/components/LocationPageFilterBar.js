import * as React from 'react';
import { useState } from 'react'
import { Box, TextField, NativeSelect, InputLabel, FormControl, Button } from '@mui/material'

import GooglePlaceAutoComplete from "./GooglePlaceAutoComplete";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DateRangePicker } from '@mui/x-date-pickers-pro'

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSearch } from "../store/searchReducer";

export default function LocationPageFilterBar({ search }) {

  const [selectedCity, setSelectedCity] = useState(search ? {
    city: search.city,
    lat: search.lat,
    lng: search.lng,
  } : null);


  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const second = new Date()
  second.setDate(second.getDate() + 2)

  const [dateRange, setDateRange] = useState([tomorrow, second])

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
    <Box display="flex" flexDirection="column" gap="0.75rem">
      <Box sx={{background: 'white',  border: '1px solid #D3D3D3', borderRadius: '5px'}}>
        <GooglePlaceAutoComplete 
          width="95%" 
          setSelectedCity={setSelectedCity} 
          city={selectedCity} 
          showShrinkText={true}
        />
      </Box>

      <LocalizationProvider 
        dateAdapter={AdapterDateFns}
        localeText={{ start: 'CHECK IN', end: 'CHECK OUT' }}
      >

        <DateRangePicker
          inputFormat="MMM dd"
          disableMaskedInput={true}
          calendars={1}
          clearable={true}
          value={dateRange}
          minDate={new Date()}
          onChange={(newValue) => {
            setDateRange(newValue)
          }}
          renderInput={(startProps, endProps) => (
              <React.Fragment>
                <Box sx={{ width: '100%', background: 'white',  border: '1px solid #D3D3D3', borderRadius: '5px', p: '0.5rem', pb: '0.25rem' }}>
                  <TextField 
                    variant="standard" 
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}

                    sx={{ width: '48.75%', borderRight: 'solid #D3D3D3', mr: '0.5rem' }} 
                    {...startProps} 
                  />

                  <TextField 
                    variant="standard" 
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      shrink: true,  
                    }}
                    sx={{ width: '48%' }}
                    {...endProps} 
                  />
                </Box>
              </React.Fragment>
            )}

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
            onChange={(e) => setAdults(e.target?.value)}
            disableUnderline={true}
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
            onChange={(e) => setChildren(e.target?.value)}
            disableUnderline={true}
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
  )
}