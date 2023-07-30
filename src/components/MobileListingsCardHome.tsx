import { FC } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import StarIcon from "@mui/icons-material/Star";
import { utils } from '../services/utils'
import HotelTags from './HotelTags';


const ListingCardSquare = ({
  id,
  travolutionaryId,
  images,
  name,
  fullAddressLine,
  starRating,
  cancellation = false,
  lowestTotalPriceAfterTax,
  currency = "$",
  showAmenities = true,
  highlighted = false,
  showPrice = true,
  petFee,
  petAllowance,
  petFeeValue,
  petSize,
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
          images={images}
          name={name}
          forceLarge={true}
        />

        <Box
          onClick={() => history.push("/hotel/" + travolutionaryId)}
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
                  variant="h6"
                  sx={{
                    color: "#222",
                    whiteSpace: 'normal',
                    textOverflow: "ellipsis",
                    textAlign: 'left'
                  }}
                >
                  {name}
                </Typography>
                <Box onClick={() => history.push(`/hotel/${travolutionaryId}#reviews`)} sx={{ ml: 'auto', mt: '0.25rem', mr: '0.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
                  <Box sx={{ color: 'red'}}><StarIcon fontSize="inherit" /></Box>
                  <Typography variant="base" mb="2px">{starRating}</Typography>
                </Box> 
              </Box>

              <Typography
                mb="0.25rem"
                variant="base"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  color: "#717171",
                  textAlign: 'left'
                }}
              >
                {fullAddressLine}
              </Typography>

              <Box mb="1rem">
                <HotelTags displayOne={true} pet_fee={petFee} pet_allowance={petAllowance} pet_fee_value={petFeeValue} pet_size={petSize} />
              </Box>  
              {/* <PriceDetails /> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
    </>
  );
};

export default ListingCardSquare;
