import { FC, useState } from "react";
import { Chip, Box, Typography } from "@mui/material";
import {
  Pets,
  Info,
  CheckCircleOutline,
} from '@mui/icons-material'
import DogIcon from '../assets/icon/dog.png'
import GiftIcon from '../assets/icon/gift.svg'

interface Props {
  pet_fee: string,
  pet_allowance: string,
  pet_fee_value: string,
  dogAmenities: [string]
}


const chipIconStyle = {
  fontSize: { xs: '0.72em', sm: "0.75em", md: '0.75rem' },
  backgroundColor: 'transparent',
  fontFamily: 'Poppins-Light',
  mt: '0.35em',
  display: 'flex',
  justifyContent: 'flex-start',
  mr: '0.1em',
}

const iconSpacing = {
  mt: '0.15em', 
  ml: '0em'
}


// const chipIconStyle = {
//   fontSize: { xs: "0.72em", sm: "0.75em" },
//   backgroundColor: "transparent",
//   fontFamily: "overpass-light",
//   mt: "0.35em",
//   display: "flex",
//   justifyContent: "flex-start",
//   mr: "0.4em",
// };

// const iconSpacing = {
//   mt: "0.15em",
//   ml: "0.15em",
// };



const HotelTags: FC<Props> = ({ pet_fee, pet_allowance, pet_fee_value, pet_size, dogAmenities = [] }) => {
  
  const [showExtraInfo, setShowExtraInfo] = useState(false)
  const [showMobileExtraInfo, setShowMobileExtraInfo] = useState(false)

  if (pet_fee === 'NONE' || pet_fee === 'No Additional Charges') {
    pet_fee = '$0 pet fee'
  } else {
    pet_fee = `${pet_fee_value?.split('.')?.find(item => true)} pet fee`
  }
  if (pet_allowance === 'Unlimited') {
    pet_allowance = 'any number of pets'
  }
  if (pet_size === 'Any Size') {
    pet_size = 'of any size or weight'
  } else if (pet_size?.includes('combined')) {
    //nothing
  } else {
    pet_size = `${pet_size} per pet`
  }

  return (
    
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Chip
        size="small"
        sx={{ ...chipIconStyle, ".MuiChip-label": { pl: 0, ml: 0 } }}
        label={<Box sx={{ ml: "0em", pl: 0 }}>{pet_fee}</Box>}
      />
      <Chip
        size="small"
        sx={chipIconStyle}
        icon={<Pets />}
        label={<Box sx={iconSpacing}>{pet_allowance}</Box>}
      />
      <Chip
        size="small"
        sx={chipIconStyle}
        icon={<img width="20px" src={DogIcon} />}
        label={<Box sx={iconSpacing}>{pet_size}</Box>}
      />

      <Chip
        size="small"
        sx={{
          ...chipIconStyle,
          ml: '-0.3rem',
          flexBasis: '100%'
        }}
        icon={<CheckCircleOutline sx={{ color: 'green' }} />}
        label={<Box sx={iconSpacing}>pet-friendly room guaranteed</Box>}
      />

      {dogAmenities.includes("dog beds & bowls") && (
        <>
          <Chip
            size="small"
            sx={chipIconStyle}
            icon={<img width="20px" src={GiftIcon} />}
            label={<Box sx={iconSpacing} display="flex" alignItems="center" gap="0.25rem">Free pet amenities 
              <Info fontSize="xs" sx={{ display: { xs: 'none' , sm: 'none', md: 'block'} }} onMouseEnter={() => setShowExtraInfo(true)} onMouseLeave={() => setShowExtraInfo(false)} /> 
              <Info fontSize="xs" sx={{ display: { xs: 'block' , sm: 'block', md: 'none'} }} onClick={() => setShowMobileExtraInfo(!showMobileExtraInfo)} /> 
            </Box>}
          />
          {showExtraInfo && <Box position="relative">
            <Box position="absolute" zIndex="20" backgroundColor="white" left="0" boxShadow="1" p="0.5rem" width="280px"><Typography variant="base">Romingo guests will receive use of free pet amenities at this hotel including pet beds, bowls, and treats (subject to availability).</Typography></Box>
          </Box>}
          {showMobileExtraInfo && <Box mt="0.5rem">
            <Typography variant="caption">*Romingo guests will receive use of free pet amenities at this hotel including pet beds, bowls, and treats (subject to availability).</Typography>
          </Box>}
        </>
      )}
    </Box>


  );
};

export default HotelTags;