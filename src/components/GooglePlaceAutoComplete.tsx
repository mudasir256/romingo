import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Button, Dialog, IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

  //IF IS MOBILE, supply callback
  const isMobile = props.mobile;
  const callback = props.callback;

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
    if (isMobile && !newValue) {
      props.setMobileText(newValue)
    }
    if (!newValue) return

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': newValue.description }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        // console.log({
        //   city: newValue,
        //   lat: results[0].geometry.location.lat(),
        //   lng: results[0].geometry.location.lng(),
        // })
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
  }, [])

  React.useEffect(() => {
    if (isMobile) {
      console.log(props.mobileText)
      setInputValue(props.mobileText)      
    }
  }, [props.mobileText])

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      autocompleteService.current.getPlacePredictions(
        {input: inputValue},
        function(results) {
          if (active) {
            let newOptions: readonly PlaceType[] = [];

            if (value) {
              newOptions = [value];
            }

            if (results) {
              newOptions = [...newOptions, ...results];
              if (isMobile) {
                callback(results)
              } 
            }

            setOptions(newOptions);
          }
        }
      );
    }, 400)
    setTimer(newTimer)
    

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  if (props.mobile) {
    return (
      <Autocomplete
        filterOptions={(x) => x}
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
      id="google-map-demo"
      style={{ width: props.width || 280, border: '1px solid white', background: 'white', borderRadius: 5 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      clearIcon={<></>}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={props.city ? props.city?.city : search.city}
      noOptionsText="No locations"
      onChange={(event: any, newValue: PlaceType | null) => {
        console.log('change')
        console.log(newValue)
        handleLocationChange(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        console.log(newInputValue)
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Going to..." fullWidth variant='outlined' size="small" sx={{ borderRadius: 5 }} />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 22 }}>
                <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: '800', fontSize: 14 }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography color="text.secondary" style={{ fontSize: 10 }}>
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