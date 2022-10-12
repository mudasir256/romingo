import { FC, useState } from "react";
import { Grid, Box, Typography, Link } from "@mui/material";
import { useHistory } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import StarIcon from "@mui/icons-material/Star";
import { utils } from '../services/utils'
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
  currency?: string;
  dogAmenities?: string[];
  showAmenities?: boolean;
  highlighted?: boolean;
  googlePlaceId?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  city: {
    id: string;
    name: string;
  };
  showPrice?: boolean;
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
  petFeePolicy,
  alias,
  ...props
}) => {
  const history = useHistory();
  const mobileCardPadding = 1;


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
          />
        </Box>

        <Box
          onClick={() => history.push("/hotel/" + alias)}
          sx={{
            cursor: "pointer",
            px: { xs: mobileCardPadding, sm: 0 },
            pb: { xs: mobileCardPadding, sm: "0" },
            width: "100%",
            px: '0.25em',
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
                  textAlign: 'left'
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
                  textAlign: 'left'
                }}
              >
                {addressLine1}, {city?.name}
              </Typography>

              <Box sx={{ pb: '0.5em' }}>
                <HotelTags petFeePolicy={{ ...petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(2, 1, petFeePolicy)}} allows_big_dogs={allows_big_dogs} />
              </Box>  
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
