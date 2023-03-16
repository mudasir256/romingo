import { FC, useState } from "react";
import { Chip, Box, Typography } from "@mui/material";
import {
  Pets,
  Info,
} from '@mui/icons-material'
import DogIcon from '../assets/icon/dog.png'
import GiftIcon from '../assets/icon/gift.svg'

interface Props {
  petFeePolicy: any,
  allows_big_dogs: number,
}


const chipIconStyle = {
  fontSize: { xs: '0.72em', sm: "0.75em" },
  backgroundColor: 'transparent',
  fontFamily: 'overpass-light',
  mt: '0.35em',
  display: 'flex',
  justifyContent: 'flex-start',
  mr: '0.1em',
}

const iconSpacing = {
  mt: '0.15em', 
  ml: '0em'
}


const HotelTags: FC<Props> = ({ displayOne = false, petFeePolicy, allows_big_dogs, vipAmenity = [] }) => {
  
  const [showExtraInfo, setShowExtraInfo] = useState(false)
  const [showMobileExtraInfo, setShowMobileExtraInfo] = useState(false)

  const hasPetFeeReduction = (!!petFeePolicy?.totalFees && petFeePolicy.totalFees !== -1)

  if (displayOne) {
    const component = hasPetFeeReduction ?
        <Chip
          size="small"
          sx={{...chipIconStyle, '.MuiChip-label': { pl: 0, ml: 0} }}
          label={<Typography variant="base" sx={{ color: '#717171'}}><span style={{color: 'red', fontWeight: 900, textDecoration: 'line-through' }}>${Math.round(petFeePolicy.totalFees)}</span> $0 pet fees</Typography>}
        />
        : <Chip
          size="small"
          sx={{...chipIconStyle, '.MuiChip-label': { pl: 0, ml: 0} }}
          label={<Typography variant="base" sx={{ color: '#717171'}}>$0 pet fees</Typography>}
        />
    return component
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {hasPetFeeReduction ?
        <Chip
          size="small"
          sx={{...chipIconStyle, '.MuiChip-label': { pl: 0, ml: 0} }}
          label={<Box sx={{ ml: '0em', pl: 0}}><span style={{color: 'red', fontSize: '1.1em', fontFamily: 'overpass-bold', fontWeight: 900, textDecoration: 'line-through' }}>${Math.round(petFeePolicy.totalFees)}</span> $0 pet fees</Box>}
        />

        :  <Chip
            size="small"
            sx={{...chipIconStyle, '.MuiChip-label': { pl: 0, ml: 0} }}
            label={<Box sx={{ ml: '0em', pl: 0}}>$0 pet fees</Box>}
          />
      }

     {petFeePolicy.maxPets > 0 ?
      <Chip
        size="small"
        sx={chipIconStyle}
        icon={<Pets fontSize="small"  />}
        label={<Box sx={iconSpacing}>{petFeePolicy.maxPets} dogs</Box>}
      />
      :  <Chip
          size="small"
          sx={chipIconStyle}
          icon={<Pets fontSize="small"  />}
          label={<Box sx={iconSpacing}>No limit on number of pets</Box>}
         />
       }

      {(petFeePolicy.maxWeightPerPetInLBS === null || petFeePolicy.maxWeightPerPetInLBS === '') ?
        <>
          <Chip
            size="small"
            sx={chipIconStyle}
            icon={<img width="18px" src={DogIcon} />}
            label={<Box sx={iconSpacing}>No pet weight limits</Box>}
          />
        </> : petFeePolicy.maxWeightPerPetInLBS <= 0 ?
        ( 
          <Chip
            size="small"
            sx={chipIconStyle}
            icon={<img width="18px" src={DogIcon} />}
            label={<Box sx={iconSpacing}>75 lbs. each</Box>}
          />
        ) :
            <Chip
              size="small"
              sx={chipIconStyle}
              icon={<img width="18px" src={DogIcon} />}
              label={<Box sx={iconSpacing}>{petFeePolicy.maxWeightPerPetInLBS} lbs. each</Box>}
            />
      }

      {vipAmenity.includes('3') && //dog bowls & treats
        <>
          <Chip
            size="small"
            sx={chipIconStyle}
            icon={<img width="18px" src={GiftIcon} />}
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
      }
    

      {/*
      <Chip
        size="small"
        sx={chipIconStyle}
        icon={<CreditCardOffTwoTone fontSize="small" sx={{mr: '0.5em'}}  />}
        label="Reserve now, pay later"
      />
      */}
    </Box>
  );
};

export default HotelTags;