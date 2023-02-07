import { FC, useState } from "react";
import { Chip, Box, Typography, Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import ImageSlider from "../ImageSlider";
import StarIcon from "@mui/icons-material/Star";

import {
  Pets,
  ScaleTwoTone,
} from '@mui/icons-material'

export interface ListingCardProps {
  id: string;
  imageURLs: string[];
  name: string;
  addressLine1: string;
  romingoScore?: number;
  allows_big_dogs?: number;
  cancellation?: boolean;
  lowestAveragePrice?: number;
  lowestTotalPriceAfterTax?: number;
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  googlePlaceId?: string;
  duration?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  city?: {
    id: string;
    name: string;
  };
  showPrice?: boolean;
  noLink?: boolean;
  alias: string;
  petFeePolicy?: {
    maxPets: number;
    maxWeightPerPetInLBS: number;
    desc: string;
    perPet: boolean;
    perNight: boolean;
    breakup: JSON;
    totalFees: number;
  };
  amenities?: {
    code: number;
    desc: string;
    value: string;
    accessible: boolean;
    free: boolean;
  };
  flag?: string;
  bookingId?: string;
}
const ListingCard: FC<ListingCardProps> = ({
  id,
  duration,
  imageURLs,
  name,
  allows_big_dogs,
  addressLine1,
  googlePlaceId,
  romingoScore,
  city,
  cancellation = false,
  lowestAveragePrice,
  lowestTotalPriceAfterTax,
  currency = "$",
  dogAmenities = [],
  showAmenities = true,
  highlighted = false,
  showPrice = true,
  noLink = false,
  petFeePolicy,
  alias,
  amenities,
  ...props
}) => {
  const history = useHistory();
  const mobileCardPadding = 1;

  const [showRating, setShowRating] = useState(true)

  const chipIconStyle = {
    fontSize: { xs: '0.72em', sm: "0.75em" },
    backgroundColor: 'transparent',
    fontFamily: 'overpass-light',
    mt: '0.35em',
    display: 'flex',
    justifyContent: 'flex-start',
    mr: '0.4em'
  }

  const iconSpacing = {
    mt: '0.15em', 
    ml: '0.15em'
  }
  const hasPetFeeReduction = (!!petFeePolicy?.totalFees && petFeePolicy.totalFees !== -1)

  const HotelDescriptors = () => (
    <Box sx={{ display: 'flex' }}>
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
    </Box>
  )

  const PriceDetails = () => (
    <Box sx={{ ml: 'auto', mr: '0.5em', mb: '0.25em' }}>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: 'flex-end',
          alignItems: "flex-end",
        }}
      >
        {lowestAveragePrice ? 
          <Typography
            variant="body2"
            sx={{
              mr: 0,
              mt: '0.1em',
              fontFamily: "sansita-light",
              fontSize: '1.25em',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {currency}{Math.round(lowestAveragePrice)} <Typography sx={{ fontFamily:'sansita-light', ml: '0.25em', fontSize: '0.75em'}}> / night</Typography>
          </Typography>
          :  <Typography
            variant="body2"
            sx={{
              mr: 0,
              mt: '0.1em',
              fontFamily: "overpass-light",
              fontSize: '1.25em',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            
          </Typography>
        }
      </Box>
    </Box>
  )

  return (
    <>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
      <Box
        sx={{
          color: "text.primary",
          display: "flex",
          borderRadius: 3,
          flexDirection: { xs: "column", sm: "row" },
          maxWidth: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          transition: "all .25s ease-in-out",
          border: "1px solid #ddd",
          boxShadow: highlighted ? 10 : 1,
          paddingBottom: "0px",
          "&:hover": { boxShadow: 7 },
          my: highlighted ? 4 : 0,
        }}
        {...props}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: 400, md: 350, lg: 350 },
            height: { xs: "auto", sm: 211, md: 186 },
          }}
        >
          <ImageSlider
            images={imageURLs}
            name={name}
            sx={{
              borderTopRightRadius: { xs: "6px", sm: 0 },
              borderBottomRightRadius: { xs: 0, sm: 0 },
              borderBottomLeftRadius: { xs: 0, sm: "6px" },
              borderTopLeftRadius: { xs: "6px", sm: "6px" },
              boxShadow: 0,
            }}
            setShow={setShowRating}
          />
        </Box>

        <Box
          onClick={() => history.push("/hotel/" + alias, {flag: props?.flag, bookingId: props?.bookingId})}
          sx={{
            cursor: "pointer",
            px: { xs: mobileCardPadding, sm: 0 },
            pb: { xs: mobileCardPadding, sm: "0" },
            width: "100%",
            position: 'relative'
          }}
        >
          <Box
            sx={{
              minHeight: { xs: 160, sm: 170 },
              p: {
                xs: ".5rem .25rem 0rem .25rem",
                sm: ".5rem .5rem .5rem 1rem",
                md: "0rem 1rem",
              },
              ml: { xs: '0.4rem', md: 0 },
              my: { xs: 0 , md: '0.5em' },
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#222",
                fontFamily: "overpass-light",
                fontSize: '1.25em',
                fontWeight: 800,
                letterSpacing: '0px',
                width: '100%',
                whiteSpace: {xs: 'normal', sm: 'normal' },
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "95%", sm: "90%" },
                mt: { xs: "0rem", sm: ".125rem" },
                fontWeight: 500,
                whiteSpace: "nowrap",
                fontFamily: "overpass-light",
                color: "#999",
              }}
            >
              {addressLine1}, {city?.name}
            </Typography>

            <Box sx={{ 
              mb: { xs: '0.75em', sm: '1em' },
            }}>
              <HotelDescriptors />
            </Box>

            <Box sx={{
              display: { xs: 'block', sm: 'block' },
              my: 'auto'
            }}>
              <Typography sx={{        
                 fontFamily: "overpass-light",
                 color: '#036A6E', 
                 fontSize: '0.9em',
               }}>
                 Reserve now, pay later.
               </Typography>
             </Box>

            <Box
              sx={{
                display: { xs: "block", sm: 'block' },
                mt: 'auto',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '0.9em' }}>
                <Box sx={{  color: 'red'}}><StarIcon  fontSize="inherit" /></Box>
                <span style={{ marginLeft: '0.25em', marginRight: '0.1em' }}>{romingoScore}</span>
                <Link
                  href={`/hotel/${alias}#reviews`}
                  sx={{
                    color: "#666",
                    fontFamily: "overpass-light",
                    textDecoration: "underline",
                    ml: { xs: 0.25 },
                    fontWeight: 500,
                    opacity: 0.75,
                    fontSize: "70%",
                  }}
                >
                  (see reviews)
                </Link>
              </Box> 

            </Box>

          </Box>

          <Box sx={{
            position: 'absolute',
            bottom: 4,
            right: 12
          }}>
            <PriceDetails />
          </Box>

        </Box>
      </Box>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
    </>
  );
};

export default ListingCard;
