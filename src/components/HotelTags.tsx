import { FC } from "react";
import { Chip, Box, Typography } from "@mui/material";
import {
  Pets,
  ScaleTwoTone,
} from '@mui/icons-material'

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
  mr: '0.1em'
}

const iconSpacing = {
  mt: '0.15em', 
  ml: '0em'
}

const HotelTags: FC<Props> = ({ displayOne = false, petFeePolicy, allows_big_dogs }) => {
  
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

      {petFeePolicy.maxWeightPerPetInLBS === null ?
        <>
          <Chip
            size="small"
            sx={chipIconStyle}
            icon={<Pets fontSize="small"  />}
            label={<Box sx={iconSpacing}>2 dogs</Box>}
          />
          <Chip
            size="small"
            sx={chipIconStyle}
            icon={<ScaleTwoTone fontSize="small"  />}
            label={<Box sx={iconSpacing}>75 lbs. each</Box>}
          />
        </> : petFeePolicy.maxWeightPerPetInLBS <= 0 ?
        ( <Chip
            size="small"
            sx={chipIconStyle}
            icon={<Pets fontSize="small"  />}
            label={<Box sx={iconSpacing}>All pet sizes allowed</Box>}
          />
        ) :
          <>
            <Chip
              size="small"
              sx={chipIconStyle}
              icon={<Pets fontSize="small"  />}
              label={<Box sx={iconSpacing}>2 dogs</Box>}
            />
            <Chip
              size="small"
              sx={chipIconStyle}
              icon={<ScaleTwoTone fontSize="small"  />}
              label={<Box sx={iconSpacing}>{petFeePolicy.maxWeightPerPetInLBS} lbs. each</Box>}
            />
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