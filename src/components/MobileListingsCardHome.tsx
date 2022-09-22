import { FC, useState } from "react";
import { MonetizationOn, VerifiedUser } from "@mui/icons-material";
import { Grid, Chip, Box, Typography, Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import RomingoScore from "./RomingoScore/RomingoScore";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StarIcon from "@mui/icons-material/Star";
import { utils } from '../services/utils'
import {
  Pets,
  CreditCardOffTwoTone,
  MoneyOffCsredTwoTone,
  ScaleTwoTone,
} from '@mui/icons-material'

import HotelTags from './HotelTags';

export interface ListingCardProps {
  id: string;
  imageURLs: string[];
  name: string;
  addressLine1: string;
  romingoScore: number;
  allows_big_dogs: number;
  cancellation?: boolean;
  lowestAveragePrice: number;
  lowestTotalPriceAfterTax: number;
  listingsPagePromoText?: string;
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  googlePlaceId?: string;
  duration?: number;
  location: {
    latitude: number;
    longitude: number;
  };
  city: {
    id: string;
    name: string;
  };
  neighborhood: string;
  showPrice?: boolean;
  noLink?: boolean;
  alias: string;
  petFeePolicy: {
    maxPets: number;
    maxWeightPerPetInLBS: number;
    desc: string;
    perPet: boolean;
    perNight: boolean;
    breakup: JSON;
    totalFees: number;
  };
}
const ListingCardSquare: FC<ListingCardProps> = ({
  id,
  duration,
  imageURLs,
  name,
  allows_big_dogs,
  addressLine1,
  listingsPagePromoText,
  googlePlaceId,
  romingoScore,
  city,
  neighborhood,
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
      <Typography
        variant="body2"
        sx={{
          mr: 0,
          color: "#222",
          fontFamily: "overpass-light",
          fontSize: ".75em",
          fontWeight: 800,
        }}
      >

        rates from
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mr: 0,
          mt: '0.1em',
          fontFamily: "overpass-bold",
          fontSize: '1.25em',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {currency}{Math.round(lowestTotalPriceAfterTax)} <Typography sx={{ fontFamily:'overpass-light', ml: '0.25em', fontSize: '0.75em'}}> / night</Typography>
      </Typography>
    </Box>
 
    {/*
    {!!petFeePolicy?.totalFees && petFeePolicy.totalFees !== -1 && (
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontFamily: "Montserrat",
          fontSize: "65%",
          opacity: 0.8,
          fontWeight: 600,
        }}
      >
        Save{" "}
        <Typography
          component="span"
          sx={{
            // textDecoration: "line-through",
            // textDecorationColor: "#BC4749AA",
            // textDecorationThickness: "1px",
            color: "#4B7D2F",
            fontFamily: "Montserrat",
            fontSize: "120%",
            position: "relative",
            fontWeight: 600,
          }}
        >
          ${Math.round(petFeePolicy.totalFees)}
        </Typography>{" "}
        in pet fees
      </Typography>
    )}
  */}
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
          flexDirection: "column",
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
            width: '100%',
            height: 'auto',
          }}
        >
          <ImageSlider
            images={imageURLs}
            name={name}
            sx={{
              width: '100%',
              height: 240,
              borderTopRightRadius: "6px", 
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: '6px',
              boxShadow: 0,
            }}
            setShow={setShowRating}
          />
        </Box>

        <Box
          onClick={() => history.push("/hotel/" + alias)}
          sx={{
            cursor: "pointer",
            px: { xs: mobileCardPadding, sm: 0 },
            pb: { xs: mobileCardPadding, sm: "0" },
            width: "100%",
          }}
        >
          <Grid
            container
            sx={{
              minHeight: 120,
              p: ".5rem .25rem 0rem .25rem",
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-between',
                p: "0.5em",
            
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
                  whiteSpace: 'normal',
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: '1em',
                  mt: 0,
                  overflow: "hidden",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  fontFamily: "overpass-light",
                  textOverflow: "ellipsis",
                  color: "#999",
                }}
              >
                {addressLine1}, {city?.name}
              </Typography>

  
              <HotelTags petFeePolicy={{ ...petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(2, 1, petFeePolicy)}} allows_big_dogs={allows_big_dogs} />
    
            </Grid>


            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                display: "flex",
                flexDirection: 'row',
                minHeight: 54,
                p: "0rem .5rem",
                mb: '0.5em',
                alignItems: "end",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >


          
              <Box
                sx={{
                  display: 'block',
                  ml: '0.25em',
                  mb: '0.25em',
                }}
              >

                <Box sx={{ my: 'auto', py: '0.5em' }}>
                  <Typography sx={{        
                     fontFamily: "overpass-light",
                     color: '#036A6E', 
                     fontSize: '0.9em',
                   }}>
                     Reserve now, pay later.
                   </Typography>
                 </Box>
    
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '0.9em' }}>
                  <Box sx={{  color: 'red'}}><StarIcon  fontSize="inherit" /></Box>
                  <span style={{ marginBottom: '0.2em', marginLeft: '0.25em', marginRight: '0.1em' }}>{romingoScore}</span>
                  <Link
                    onClick={() => history.push(`/hotel/${alias}#reviews`)}
                    sx={{
                      color: "#666",
                      fontFamily: "overpass-light",
                      textDecoration: "underline",
                      mr: -0.5,
                      ml: '0.25em',
                      mt: 0,
                      fontWeight: 500,
                      opacity: 0.75,
                      fontSize: "70%",
                    }}
                  >
                    (see reviews)
                  </Link>
                </Box> 

              </Box>
              <PriceDetails />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
    </>
  );
};

export default ListingCardSquare;
