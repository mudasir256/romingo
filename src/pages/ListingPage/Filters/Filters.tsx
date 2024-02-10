import {
    Box,
    Button,
    RadioGroup,
    FormGroup,
    Grid,
    Slider,
    Typography,
} from "@mui/material";
import Info from '@mui/icons-material/Info'

import FilterRadioButton from './FilterRadioButton';
import FilterCheckBox from "./FilterCheckBox";

import styles from './styles';
import { fiveRatings, petWeightPolicies, hotelAmenities } from './listData';


const Filters = ({
    search,
    handlePetNumberChange,
    showInfoBox,
    setShowInfoBox,
    petWeights,
    handleWeightChange,
    setAllowsCats,
    allowsCats,
    setHasNoPetFees,
    hasNoPetFees,
    filterAmenities,
    handleAmenityChange,
    sliderValue,
    handleSliderChange,
    setShouldFilter,
    shouldFilter,
    valuetext,
    minPrice,
    maxPrice,
    handleHotelRatingChange,
    hotelRating,
    handleRatingChange,
    rating,
}) => {
    return (
        <>
            <Box 
                sx={{...styles.filterContainer, mt: '1rem'}}
            >
                <Typography sx={styles.filterHeader}>Number of pets</Typography>
                <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }} sx={{ width: '100%' }}>
                    <Grid item md={6} lg={6} xl={6}>
                        <Button
                            onClick={() => handlePetNumberChange(1)} 
                            variant={search?.occupants?.dogs == 1 ? 'contained' : 'outlined'} 
                            color="primary"
                            sx={{ width: '100%' }}
                        >
                            1
                        </Button>
                    </Grid>
                    <Grid item md={6} lg={6} xl={6}>
                        <Button 
                            onClick={() => handlePetNumberChange(2)} 
                            variant={search?.occupants?.dogs == 2 ? 'contained' : 'outlined'} 
                            color="primary"
                            sx={{ width: '100%' }}
                        >
                            2
                        </Button>
                    </Grid>
                    <Grid item md={6} lg={6} xl={6}>
                        <Button 
                            onClick={() => handlePetNumberChange(3)} 
                            variant={search?.occupants?.dogs == 3 ? 'contained' : 'outlined'} 
                            color="primary"
                            sx={{ width: '100%' }}
                        >
                            3
                        </Button>
                    </Grid>
                    <Grid item md={6} lg={6} xl={6}>
                        <Button 
                            onClick={() => handlePetNumberChange(4)} 
                            variant={search?.occupants?.dogs == 4 ? 'contained' : 'outlined'} 
                            color="primary"
                            sx={{ width: '100%' }}
                        >
                            4+
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={styles.filterContainer}>
                <Box 
                    sx={{
                    display: "flex",
                    gap: "0.5rem",
                    flexDirection: "row",
                    alignItems: "center",
                    }}
                >
                    <Typography sx={styles.filterHeader}>
                    Pet policy
                    </Typography>
                    <Info
                        onMouseOver={() => setShowInfoBox(true)}
                        onMouseLeave={() => setShowInfoBox(false)}
                        onClick={() => setShowInfoBox(!showInfoBox)}
                        fontSize="small"
                    /> 
                    {showInfoBox &&
                        <Box position="relative">
                            <Box 
                            sx={{
                                position: "absolute",
                                zIndex: "20",
                                backgroundColor: "white",
                                left: "0",
                                boxShadow: "1",
                                p: "0.5rem",
                                width: "280px",
                            }}
                            >
                            <Typography variant="base">
                                Select the size of the pet that you 
                                are traveling with. If you are 
                                traveling with multiple pets, select 
                                the size of your largest pet.
                            </Typography>
                            </Box>
                        </Box>
                    }
                </Box>

                <RadioGroup defaultValue="all" value={petWeights} onChange={handleWeightChange}>
                    {petWeightPolicies.map((item, index) => (
                        <FilterRadioButton
                            key={index}
                            value={item.value}
                            label={item.label}
                        />
                    ))}
                </RadioGroup>
            </Box>

            <Box sx={styles.filterContainer}>
                <Typography sx={styles.filterHeader}>Features</Typography>
                <FormGroup onChange={() => setAllowsCats(!allowsCats)}>
                    <FilterCheckBox
                        label="Accepted cats"
                        inputName="25"
                        checked={allowsCats}
                    />
                </FormGroup>

                <FormGroup onChange={() => setHasNoPetFees(!hasNoPetFees)} sx={{ my: 0 }}>
                    <FilterCheckBox
                        label="$0 pet fees"
                        inputName="25"
                        checked={hasNoPetFees}
                    />
                </FormGroup>
            </Box>
            
            <Box sx={styles.filterContainer}>
                <Typography sx={styles.filterHeader}>Hotel amenities</Typography>
                <FormGroup onChange={handleAmenityChange}>
                    {hotelAmenities.map((item, index) => (
                    <FilterCheckBox 
                        key={index}
                        checked={filterAmenities[item.id]}
                        inputName={item.id}
                        label={item.label}
                    />
                    ))}
                </FormGroup>
            </Box>

            <Box sx={styles.filterContainer}>
                <Typography sx={styles.filterHeader}>Price per night</Typography>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    onChangeCommitted={() => setShouldFilter(!shouldFilter)}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={minPrice}
                    step={1}
                    max={maxPrice}
                    marks={[
                    {
                        value: sliderValue[0],
                        label: `$${sliderValue[0]}`
                    },
                    {
                        value: sliderValue[1],
                        label: `$${sliderValue[1]}`
                    }
                    ]}
                    sx={{ mx: '1em', width: '75%', maxWidth: '240px' }}
                />
            </Box>
                  
            <Box sx={styles.filterContainer}>
                <Typography sx={styles.filterHeader}>Hotel rating</Typography>
                <FormGroup onChange={handleHotelRatingChange}>
                    {fiveRatings.map(i => (
                    <FilterCheckBox
                        key={i}
                        checked={hotelRating[i]}
                        inputName={i}
                        label={i}
                    />
                    ))}
                </FormGroup>
            </Box>

            <Box sx={styles.filterContainer}>
                <Typography sx={styles.filterHeader}>Guest rating</Typography>
                <FormGroup onChange={handleRatingChange}>
                    {fiveRatings.map(i => (
                        <FilterCheckBox                      
                            key={i}
                            checked={rating[i]}
                            inputName={i}
                            label={i}
                        />
                    ))}
                </FormGroup>
            </Box>
        </>
    )
}

export default Filters