import React, { FC, useState, Children } from "react";
import { Chip, Box, Grid } from "@mui/material";
import {
  Pets,
  Info,
  CheckCircleOutline,
} from '@mui/icons-material'
import DogIcon from '../assets/icon/dog.png'
import GiftIcon from '../assets/icon/gift.svg'
import PetsIcon from '@mui/icons-material/Pets';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

const chipIconStyle = {
  // fontSize: { xs: '0.72em', sm: "0.75em", md: '0.75rem' },
  maxHeight: '100px',
  backgroundColor: 'transparent',
  fontFamily: 'Poppins-Light',
  // mt: '0.1em',
  display: 'flex',
  justifyContent: 'flex-start',
  mr: '0.1em',
}

const iconLabelStyle = {
  fontSize: '0.7rem',
  ml: "0.25rem",
}

interface LayoutProps {
  grid: boolean,
  pet_beds?: string,
  pet_bowls?: string,
}

const Layout: FC<React.PropsWithChildren<LayoutProps>> = ({grid, children, pet_beds, pet_bowls}) => {
  return (
    <>
      {grid 
        ?
          <Grid container columnSpacing={1} rowSpacing={0.5}>
            {Children.toArray(children).map((child, index) => 
              <Grid item xs={6} key={index}>
                {child}
              </Grid>
            )}
            {(pet_beds || pet_bowls) ? (
                <Grid item xs={6}>
                  <Chip
                    size="small"
                    sx={chipIconStyle}
                    icon={<img width="17px" src={GiftIcon} />}
                    label={
                      <Box 
                        sx={{ 
                          ml: '0.25rem',
                          textOverflow: 'ellipsis',
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        free pet amenities 
                      </Box>
                    }
                  />
                </Grid>
              ) : <Box sx={{ height: { xs: 0, sm: 0, md: '24px' } }} /> 
            }
          </Grid>
        : Children.toArray(children).map((child, index) => child)
      }
    </>
  )
} 



const HotelTags = ({ 
  pet_fee,
  pet_allowance,
  pet_fee_value, 
  pet_size, 
  dogAmenities = [],
  pet_bowls,
  pet_beds,
  grid = false,
}) => {
  
  if (pet_fee === 'NONE' || pet_fee === 'No Additional Charges') {
    pet_fee = '$0 pet fee'
  } else {
    pet_fee = `${pet_fee_value?.split('.')?.find(item => true)} pet fee`
  }
  if (pet_allowance === 'Unlimited') {
    pet_allowance = 'any number of pets'
  } else {
    const pet_allowance_num = pet_allowance.match(new RegExp('\\d+'));
    // const pet_allowance_num = pet_allowance;
    pet_allowance = `${pet_allowance_num} pets per reservation`;
  }
  if (pet_size === 'Any Size') {
    pet_size = 'pets of any size welcome'
  } else if (pet_size?.includes('combined')) {
    //nothing
  } else {
    pet_size = `pets up to ${pet_size} welcomed`
  }

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: 'column', 
      flexWrap: "wrap", 
      mb: '1rem' 
    }}>
      <Layout grid={grid} pet_beds={pet_beds} pet_bowls={pet_bowls}>
        {/* <Chip
          size="small"
          sx={{
            ...chipIconStyle,
          }}
          icon={<img width="17px" src="https://storage.googleapis.com/romingo-production-public/assets/Bone%20Icon.png" />}
          label={<Box sx={iconLabelStyle}>pet-friendly room guaranteed</Box>}
        />
        <Chip
          size="small"
          sx={{ ...chipIconStyle }}
          icon={<img width="17px" src="https://storage.googleapis.com/romingo-production-public/assets/Wallet%20Icon.png" />}
          label={<Box sx={iconLabelStyle}>{pet_fee}</Box>}
        />
        <Chip
          size="small"
          sx={chipIconStyle}
          icon={<img width="17px" src="https://storage.googleapis.com/romingo-production-public/assets/Dog%20Icon.png" />}
          label={<Box sx={iconLabelStyle}>{pet_allowance}</Box>}
        />
        <Chip
          size="small"
          sx={chipIconStyle}
          icon={<img width="17px" src="https://storage.googleapis.com/romingo-production-public/assets/Paw%20Icon.png" />}
          label={<Box sx={iconLabelStyle}>{pet_size}</Box>}
        /> */}
        
        {/* <Chip
          size="small"
          sx={{
            ...chipIconStyle,
          }}
          icon={<img style={{ width: "17px"}}  src="https://storage.googleapis.com/romingo-production-public/assets/Bone%20Icon.png" />}
          label={<Box sx={iconLabelStyle}>pet-friendly room guaranteed</Box>}
        /> */}
        <Chip
          size="small"
          sx={{ ...chipIconStyle }}
          icon={<img style={{ width: "17px"}}  src="https://storage.googleapis.com/romingo-production-public/assets/Wallet%20Icon.png" />}
          label={<Box sx={iconLabelStyle}>{pet_fee}</Box>}
        />
        <Chip
          size="small"
          sx={chipIconStyle}
          icon={<img style={{ width: "17px"}}  src="https://storage.googleapis.com/romingo-production-public/assets/Dog%20Icon.png" />}
          label={<Box sx={iconLabelStyle}>{pet_allowance}</Box>}
        />
        <Chip
          size="small"
          sx={chipIconStyle}
          icon={<img style={{ width: "17px"}} src="https://storage.googleapis.com/romingo-production-public/assets/Paw%20Icon.png" />}
          label={<Box sx={iconLabelStyle}>{pet_size}</Box>}
        />
       
      </Layout>
     </Box>
  );
};

export default HotelTags;