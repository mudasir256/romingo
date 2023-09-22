import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Button, Dialog, IconButton, Toolbar, InputAdornment } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyDZAHqC_b5YOl00aj2LRivjvm0tNyxkZcI';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

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

export default function GoogleMaps(props) {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const search = useSelector((state: any) => state.searchReducer.search);
  const loaded = React.useRef(false);
  const dispatch: Dispatch<any> = useDispatch();
  const [showOptionsDialog, setShowOptionsDialog] = React.useState(false)
  const [timer, setTimer] = React.useState(null)
  const [focused, setFocused] = React.useState(false)

  //IF IS MOBILE, supply callback
  const isMobile = props.mobile;
  const callback = props.callback;

  const initialStates = [
    { 
      isInitial: true,
      index: 0,
      description: 'San Diego, CA, USA',
      structured_formatting: {
        main_text: "San Diego",
        secondary_text: 'CA, USA'
      }
    },
    {
      isInitial: true,
      index: 1,
      description: 'Asheville, NC, USA',
      structured_formatting: {
        main_text: "Asheville",
        secondary_text: 'NC, USA'
      }
    },
    {
      isInitial: true,
      index: 2,
      description: 'Austin, TX, USA',
      structured_formatting: {
        main_text: "Austin",
        secondary_text: 'TX, USA'
      }
    },
    {
      isInitial: true,
      index: 3,
      description: 'Seattle, WA, USA',
      structured_formatting: {
        main_text: "Seattle",
        secondary_text: 'WA, USA'
      }
    },
    {
      isInitial: true,
      index: 4,
      description: 'Santa Fe, NM, USA',
      structured_formatting: {
        main_text: "Santa Fe",
        secondary_text: 'NM, USA'
      }
    },
  ]

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  function handleLocationChange(newValue) {
    console.log('new value')
    console.log(newValue)
    if (isMobile && !newValue) {
      props.setMobileText(newValue)
    }
    if (!newValue) return

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': newValue.description }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        // props.setValue({
        //   city: newValue,
        //   lat: results[0].geometry.location.lat(),
        //   lng: results[0].geometry.location.lng(),
        // })

        props.setSelectedCity({
          city: newValue,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        })

      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    const fieldset = document.getElementsByTagName('fieldset');
    for (const set of fieldset) {
      set.setAttribute('style', 'border: none;');
    }
    setOptions(initialStates)
  }, [])

  React.useEffect(() => {
    // if (options.length === 0) {
    //   setOptions(initialStates) 
    // }
  }, [options])

  React.useEffect(() => {
    if (isMobile) {
      console.log(props.mobileText)
      setInputValue(props.mobileText)      
    }
  }, [props.mobileText])

  React.useEffect(() => {

    console.log('auto complete?')
    // console.log(autocompleteService)
    // console.log(autocompleteService?.current?.getPlacePredictions)
    // console.log(inputValue)
    clearTimeout(timer)


    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(initialStates);
      return undefined;
    }

    // clearTimeout(timer)

    console.log('timer')
    const newTimer = setTimeout(() => {
      autocompleteService.current.getPlacePredictions(
        {input: inputValue},
        function(results) {
          console.log('results!')
          let newOptions: readonly PlaceType[] = [];

          if (results) {
            newOptions = [...results];
            if (isMobile) {
              callback(results)
            } 
          }
          setOptions(newOptions || initialStates);

        }
      );
    }, 400)
    setTimer(newTimer)
    
  }, [value, inputValue, fetch]);

  if (props.mobile) {
    return (
      <Autocomplete
        filterOptions={(x) => x}
        forcePopupIcon={false}
        clearIcon={<></>}
        options={options}
        open={false}
        onOpen={(e) => { props.setShowCities(true); }}
        value={props.city ? props.city?.city : search.city}
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
      // style={{ }}
      sx={{
        "& .MuiAutocomplete-input": {
         color: 'black', 
         fontSize: '15px',
         pl: '0 !important'
        },
        "& .MuiInputBase-root": { 
          width: (props.width || 280), 
          // position: 'relative',
          height: '40px',
          border: focused ? 'none' : '1px solid white', 
          boxShadow: focused ? 5 : 0,
          background: 'white', 
     
        }
      }}
      componentsProps={{
        paper: {
          sx: {
            width: 400,
            whiteSpace: 'nowrap'
          }
        },
        popper: {
          placement: 'bottom-start',

        }

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
      value={props.city ? props.city?.city : search.city}
      noOptionsText="No locations"
      onOpen={() => {
        setFocused(true)          
      }}
      onClose={() => {
        setFocused(false)
      }}
      onChange={(event: any, newValue: PlaceType | null) => {
        handleLocationChange(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField 
          {...params}
          InputProps={{ 
            ...params.InputProps,
            startAdornment: focused ? <></> : <><InputAdornment position="start"><LocationOnIcon sx={{ color: 'black'}} /></InputAdornment></>
          }}
          placeholder="Going to..." 
          fullWidth 
          size="small" 
          variant="outlined"  
        />
      )}
      groupBy={(option) => option.isInitial}
      renderGroup={(params) => {
        return (
          <li key={params.key}>
            {params.group && <Box my="0.5rem"><Typography variant="base"ml="1rem" sx={{ fontWeight: 800}}>Popular pet-lovers</Typography></Box>}
            <Box>{params.children}</Box>
          </li>
        )
      }}
      renderOption={(props, option) => {
        console.log(option)
        // const matches =
        //   option.structured_formatting.main_text_matched_substrings || [];

        // const parts = parse(
        //   option.structured_formatting.main_text,
        //   matches.map((match: any) => [match.offset, match.offset + match.length]),
        // );
        return (
          <li {...props} key={option.structured_formatting.main_text} >

            <Grid container alignItems="center" my="0.20rem">
              <Grid item sx={{ display: 'flex', width: 22 }}>
                <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
              
                <Box
                  component="span"
                  sx={{ fontWeight: '800', fontSize: 18 }}
                >
                  {option.structured_formatting.main_text.length > 40 ? `${option.structured_formatting.main_text.slice(0,40)}...` :  option.structured_formatting.main_text} 
                </Box>
           
                <Typography color="text.secondary" style={{ fontSize: 11 }}>
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