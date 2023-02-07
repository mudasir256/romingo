import { FC } from "react";
import { Grid, Box, Typography } from "@mui/material";
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
    <Box textAlign="right" mr="0.5rem">
      <Typography variant="base" sx={{ fontSize: '0.75rem'}}>rates from</Typography>
      <Typography variant="h5">
        {currency}{Math.round(lowestTotalPriceAfterTax)} <span style={{ fontSize: '1rem', fontWeight: 400}}>/ night</span>
      </Typography>
    </Box>
  )

  return (
    <>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
      <Box
        sx={{
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          borderRadius: 3,
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          transition: "all .25s ease-in-out",
          paddingBottom: "0px",
          // "&:hover": { boxShadow: 7 },
          my: highlighted ? 4 : 0,
        }}
        {...props}
      >
  
        <ImageSlider
          images={imageURLs}
          name={name}
          forceLarge={true}
        />

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
                mt: '1rem'
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#222",
                    whiteSpace: 'normal',
                    textOverflow: "ellipsis",
                    textAlign: 'left'
                  }}
                >
                  {name}
                </Typography>
                <Box onClick={() => history.push(`/hotel/${alias}#reviews`)} sx={{ ml: 'auto', mt: '0.25rem', mr: '0.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
                  <Box sx={{ color: 'red'}}><StarIcon fontSize="inherit" /></Box>
                  <Typography variant="base" mb="2px">{romingoScore}</Typography>
                </Box> 
              </Box>

              <Typography
                variant="base"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  color: "#717171",
                  textAlign: 'left'
                }}
              >
                {addressLine1}, {city?.name}
              </Typography>

              <Box mb="-1rem">
                <HotelTags displayOne={true} petFeePolicy={{ ...petFeePolicy, totalFees: utils.computePetFeePolicyTotalFees(2, 1, petFeePolicy)}} allows_big_dogs={allows_big_dogs} />
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
