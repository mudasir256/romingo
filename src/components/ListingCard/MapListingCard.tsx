import { FC, useState } from "react";
import { Chip, Box, Typography, Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import ImageSlider from "../ImageSlider";
import StarIcon from "@mui/icons-material/Star";

import {
  Pets,
  Info,
} from '@mui/icons-material'

import DogIcon from '../../assets/icon/dog.png'
import GiftIcon from '../../assets/icon/gift.svg'
import HotelTags from '../../components/HotelTags'

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
  amenities?: {
    code: number;
    desc: string;
    value: string;
    accessible: boolean;
    free: boolean;
  };
  flag?: string;
  bookingId?: string;
  pet_fee?: string;
  pet_fee_value?: string;
  pet_allowance?: string;
  pet_size?: string;
}
const MapListingCard: FC<ListingCardProps> = ({
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
  alias,
  amenities,
  limitImages = false,
  sessionId,
  pet_fee,
  pet_fee_value,
  pet_allowance,
  pet_size,
  ...props
}) => {
  const history = useHistory();
  const mobileCardPadding = 1;

  const [showRating, setShowRating] = useState(true)

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
              alignItems: 'center',
              color: 'black'
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

  let starRatingFormat = romingoScore
  if (romingoScore?.toString().length === 1) {
    starRatingFormat = `${romingoScore}.0`
  }

  return (
    <>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
      <Box
        sx={{
          color: "text.primary",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          maxWidth: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          transition: "all .25s ease-in-out",
          paddingBottom: "0px",
          my: highlighted ? 4 : 0,
        }}
        {...props}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: 400, md: 350, lg: 350 },
            height: { xs: "auto", sm: 245, md: 186 },
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
            imageCount={limitImages ? 3 : 10}
          />
        </Box>

        <Box
          component="a"
          href={`/hotel/${id}`}

          onClick={() => history.push("/hotel/" + id, {sessionId: sessionId, hotelDetails: hotel})}
          sx={{
            cursor: "pointer",
            px: { xs: mobileCardPadding, sm: 0 },
            pb: { xs: mobileCardPadding, sm: "0" },
            width: "100%",
            position: 'relative',
            textDecoration: 'none'
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
              <HotelTags pet_fee={pet_fee} pet_allowance={pet_allowance} pet_fee_value={pet_fee_value} pet_size={pet_size} />
            </Box>

            <Box sx={{
              display: { xs: 'block', sm: 'block' },
              my: 'auto'
            }}>
          {/*    <Typography sx={{        
                 fontFamily: "overpass-light",
                 color: '#036A6E', 
                 fontSize: '0.9em',
               }}>
                 Reserve now, pay later.
               </Typography>*/}
             </Box>

            <Box
              sx={{
                display: { xs: "block", sm: 'block' },
                mt: 'auto',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '0.9em' }}>
                <Box sx={{  color: 'black'}}><StarIcon  fontSize="inherit" /></Box>
                <span style={{ marginLeft: '0.25em', marginRight: '0.1em', color: 'black' }}>{starRatingFormat}</span>
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

export default MapListingCard;
