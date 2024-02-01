import { FC } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  AppBar,
} from "@mui/material";

import GooglePlaceAutoComplete from '../GooglePlaceAutoComplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import FullPageDialog from './FullPageDialog';

interface LocationSelectorProps {
    mobileText: string;
    setMobileText: (arg0: string) => void;
    setShowCities: (arg0: boolean) => void;
    handlePredictions: any;
    handleCityClick: any;
    selectedCity: any;
    setSelectedCity: any;
    setNewValue: any;
    newValue: any;
    mobileTextSearchRef: any;
    showCities: boolean;
    predictions: Array<any>;
    mapOnPage?: boolean;
}

const LocationSelector: FC<LocationSelectorProps> = ({
    mobileText,
    setMobileText,
    setShowCities,
    handlePredictions,
    selectedCity,
    setSelectedCity,
    setNewValue,
    newValue,
    mobileTextSearchRef,
    handleCityClick,
    showCities,
    predictions,
    mapOnPage = false,
}) => {
    return (
        <>
            <Grid
                container
                sx={{
                    border: "1px solid #aaabab",
                    borderRadius: "6px",
                    padding: "0 0 0 20px",
                    backgroundColor: 'white',
                }}
                alignItems='center'
            >
                <Grid>
                    <LocationOnIcon />
                </Grid>
                <Grid item xs={8} sx={{ zIndex: 50, minWidth: '92%' }}>
                    <GooglePlaceAutoComplete 
                        mobile={true} 
                        mobileText={mobileText}
                        setMobileText={setMobileText}
                        setShowCities={setShowCities}
                        callback={handlePredictions}
                        city={selectedCity}
                        setSelectedCity={setSelectedCity} 
                        mapOnPage={mapOnPage}
                    />
                </Grid>
            </Grid>

            <FullPageDialog
              isOpen={showCities}
              close={() => setShowCities(false)}
            >
                <Box
                    sx={{
                        zIndex: 100,
                        width: '100%',
                        height: '90vh',
                        position: 'fixed',
                        backgroundColor: 'white',
                        gap: '1rem',
                        left: '0', top: '50px', mt: '0rem'
                    }}
                >
                    <Box position="relative" width="100%" textAlign="center" sx={{ m: '1rem', mt: '1.5rem', backgroundColor: 'white', }}>
                    <TextField 
                        sx={{ width: '90%', ml: '-2.5rem', mt: '0.5rem' }}
                        autoFocus
                        id="mobileTextSearch"
                        variant="standard"
                        value={mobileText}
                        inputRef={mobileTextSearchRef}
                        onChange={(e) => {
                            console.log('setMobileText() fired');
                            setMobileText(e.target?.value)
                        }}
                    />
                    </Box>
                    <Box height="88%" overflow="scroll">
                    {predictions?.map((address, index) => 
                        <Box 
                        sx={{ 
                            px: '1.25rem',
                            py: '0.75rem',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: '#d9f7fc'}
                        }}
                        key={address.description}
                        onClick={(e) => handleCityClick(e, predictions[index])}
                        >
                        <Typography variant="p">{address.description}</Typography>
                        </Box>
                    )}
                    {predictions?.length == 0 &&
                        <Typography
                            ml="0.75rem" 
                            variant="base"
                        >
                            No destinations found.
                        </Typography>
                    }
                    </Box>
                </Box>
            </FullPageDialog>
        </>
    )
}

export default LocationSelector;