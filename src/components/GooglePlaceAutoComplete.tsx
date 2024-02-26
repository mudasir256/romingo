import { useState, useEffect, useMemo, useRef, FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Button, Dialog, IconButton, Toolbar, InputAdornment } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

interface Props {
  mobile?: boolean;
  callback?: any;
  mobileText?: any;
  setMobileText?: any;
  setSelectedCity?: any;
  setShowCities?: any;
  city?: any;
  width?: any;
  showShrinkText?: any;
  mapOnPage?: boolean;
}

const GoogleMaps: FC<Props> = ({
  mobile = false,
  callback,
  mobileText,
  setMobileText,
  setSelectedCity,
  setShowCities,
  city,
  width,
  showShrinkText,
  mapOnPage = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const search = useSelector((state: any) => state.searchReducer.search);
  const loaded = useRef(false);
  const [timer, setTimer] = useState(null)
  const [focused, setFocused] = useState(false)

  const initialStates = [
    { 
      isInitial: true,
      index: 0,
      description: 'San Diego, CA, USA',
      structured_formatting: {
        main_text: "San Diego",
        secondary_text: 'CA, USA'
      },
      types: ['locality']
    },
    {
      isInitial: true,
      index: 1,
      description: 'Asheville, NC, USA',
      structured_formatting: {
        main_text: "Asheville",
        secondary_text: 'NC, USA'
      },
      types: ['locality']
    },
    {
      isInitial: true,
      index: 2,
      description: 'Austin, TX, USA',
      structured_formatting: {
        main_text: "Austin",
        secondary_text: 'TX, USA'
      },
      types: ['locality']
    },
    {
      isInitial: true,
      index: 3,
      description: 'Seattle, WA, USA',
      structured_formatting: {
        main_text: "Seattle",
        secondary_text: 'WA, USA'
      },
      types: ['locality']
    },
    {
      isInitial: true,
      index: 4,
      description: 'Santa Fe, NM, USA',
      structured_formatting: {
        main_text: "Santa Fe",
        secondary_text: 'NM, USA'
      },
      types: ['locality']
    },
  ]

  const loadScript = () => {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', 'google-maps');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
    document.querySelector('head').appendChild(script);
  }

  function handleLocationChange(newValue) {
    if (mobile && !newValue) {
      setMobileText(newValue)
    }
    if (!newValue) return

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': newValue.description }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        setSelectedCity({
          city: newValue,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        })
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }


  useEffect(() => {
    if (mobile) {
      setInputValue(mobileText)      
    }
  }, [mobileText])

  useEffect(() => {
    clearTimeout(timer)

    if (!autocompleteService.current && (window as any).google?.maps?.places) {
      autocompleteService.current =  new (window as any).google.maps.places.AutocompleteService()
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(initialStates);
      return undefined;
    }

    const newTimer = setTimeout(() => {
      autocompleteService.current.getPlacePredictions(
        {input: inputValue},
        function(results) {
          let newOptions: readonly PlaceType[] = [];

          if (results) {
            newOptions = [...results];
            if (mobile) {
              callback(results)
            } 
          }
          setOptions(newOptions || initialStates);
        }
      );
    }, 400)
    setTimer(newTimer)
  }, [inputValue]);

  useEffect(() => {
    const fieldset = document.getElementsByTagName('fieldset');
    for (const set of fieldset) {
      set.setAttribute('style', 'border: none;');
    }
    setOptions(initialStates)

    // Load google maps script if it is not already loaded on the page.
    if(!mapOnPage) {
      const startOfGoogleMapsScriptSrc = "https://maps.googleapis.com/maps/api/js"
      const scripts = document.getElementsByTagName('script');

      let alreadyLoaded = false;
      Array.from(scripts).forEach(script => {
        if (script.src.startsWith(startOfGoogleMapsScriptSrc)) {
          alreadyLoaded = true
        }
      });

      if (!alreadyLoaded) {
        loadScript();
        loaded.current = true;
      }
    }
  }, [])
  
  if (mobile) {
    return (
      <Autocomplete
        filterOptions={(x) => x}
        forcePopupIcon={false}
        clearIcon={<></>}
        options={options}
        open={false}
        onOpen={(e) => { setShowCities(true); }}
        value={city ? city?.city : search.city}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.description
        }
        onChange={(event: any, newValue: PlaceType | null) => {
          handleLocationChange(newValue)
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Going to..." fullWidth variant='outlined' size="small" sx={{ borderRadius: 5 }} />
        )}
      />
    )
  }

  return (
    <Autocomplete
      id="google-map-input"
      forcePopupIcon={false}
      sx={{
        "& .MuiAutocomplete-input": {
         color: 'black', 
         fontSize: '15px',
         pl: '0 !important',
         fontFamily: 'Poppins-Light'
        },
        "& .MuiInputBase-root": { 
          width: (width || 280), 
          // position: 'relative',
          height: '40px',
          border: focused ? 'none' : '1px solid white', 
          boxShadow: (focused && !showShrinkText) ? 5 : 0,
          background: 'white', 
     
        }
      }}
      componentsProps={{
        paper: {
          sx: {
            width: 400,
            whiteSpace: 'nowrap'
          },
        },
        popper: {
          placement: 'bottom-start',

        },
      }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      clearIcon={(focused && inputValue) ? <HighlightOffIcon /> : <></>}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={city ? city?.city : search.city}
      noOptionsText="No locations"
      onOpen={() => setFocused(true)}
      onClose={() => setFocused(false)}
      onChange={(event: any, newValue: PlaceType | null) => handleLocationChange(newValue)}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={showShrinkText ? "LOCATION" : ""}
          sx={{ ml: '0.5rem', mt: showShrinkText ? '0.5rem': 0 }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: showShrinkText ? true : false,
            startAdornment: (focused || showShrinkText) ? <></> : <><InputAdornment position="start"><LocationOnIcon sx={{ color: 'black'}} /></InputAdornment></>
          }}
          placeholder="Going to..."
          fullWidth 
          size="small" 
          variant={showShrinkText ? "standard" : "outlined"}
          InputLabelProps={{
            shrink: true
          }} 
        />
      )}
      groupBy={(option) => option.isInitial}
      renderGroup={(params) => {
        return (
          <>
            {params.group && 
              <li key={'list-header-text'}>
                <Box my="0.5rem">
                    <Typography variant="base" ml="1rem" sx={{ fontWeight: 800}}>Where in the United States are you traveling?</Typography>
                </Box>
              </li>
            }
            {params.children}
          </>
        )
      }}
      renderOption={(props, option) => {  
        return (
          <li {...props} key={option.place_id || option.description} >
            <Grid container alignItems="center" my="0.20rem">
              <Grid item sx={{ display: 'flex', width: '1.75rem' }}>
                <LocationOnIcon sx={{ fontSize: '1.25rem' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
              
                <Box
                  component="span"
                  sx={{ fontFamily: 'Poppins', fontSize: '1rem', color: 'black' }}
                >
                  {option.structured_formatting.main_text.length > 45 ? `${option.structured_formatting.main_text.slice(0,45)}...` :  option.structured_formatting.main_text} 
                </Box>
           
                <Typography style={{ fontSize: '0.75rem' }}>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default GoogleMaps