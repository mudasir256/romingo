import { FC } from "react";
import { CSSObject } from "@mui/material";
import { Chip, Box } from "@mui/material";

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

const HotelTags: FC<Props> = ({ petFeePolicy, allows_big_dogs }) => {

  const hasPetFeeReduction = (!!petFeePolicy?.totalFees && petFeePolicy.totalFees !== -1)

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {hasPetFeeReduction &&
        <Chip
          size="small"
          sx={{...chipIconStyle, '.MuiChip-label': { pl: 0, ml: 0} }}
          label={<Box sx={{ ml: '0em', pl: 0}}><span style={{color: 'green', fontSize: '1.1em', fontFamily: 'overpass-bold', fontWeight: 900 }}>${Math.round(petFeePolicy.totalFees)}</span> pet fee savings</Box>}
        />
      }

      {allows_big_dogs ?
        ( <Chip
            size="small"
            sx={chipIconStyle}
            icon={<Pets fontSize="small"  />}
            label={<Box sx={iconSpacing}>All weights accepted</Box>}
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
              label={<Box sx={iconSpacing}>75 lbs. each</Box>}
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