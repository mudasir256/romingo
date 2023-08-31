import { FC } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import StarIcon from "@mui/icons-material/Star";
import { utils } from '../services/utils'
import HotelTags from './HotelTags';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const stateCodes = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

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
  alias,
  state,
  city,
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

  function slugify(str) {
    if (!str) {
      return ''
    }
    // Convert all non-word characters to hyphens
    str = str.replace(/[^\w-]/g, '-');

    // Remove all consecutive hyphens
    str = str.replace(/-+/g, '-');

    // Trim leading and trailing hyphens
    str = str.trim('-');

    return str.toLowerCase();
  }

  const hotelUrl = `/pet-friendly-hotels/${slugify(stateCodes[state])}/${slugify(city)}/${alias}`
  let starRatingFormat = starRating
  if (starRating?.toString().length === 1) {
    starRatingFormat = `${starRating}.0`
  }


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
          "&:hover": { boxShadow: 7 },
          my: highlighted ? 4 : 0,
          boxShadow: 5,
        }}
        // {...props}
      >
  
        <ImageSlider
          images={images}
          name={name}
          forceLarge={true}
        />

        <Box
          onClick={() => history.push(hotelUrl)}
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
                mt: '1rem',
                ml: '0.3rem',
                px: '0.2rem',
                pb: '0.25rem'
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#222",
                    whiteSpace: 'normal',
                    textOverflow: "ellipsis",
                    textAlign: 'left',
                    flexWrap: 'none'
                  }}
                >
                  {name}
                </Typography>
                <Box onClick={() => history.push(`${hotelUrl}#reviews`)} sx={{ ml: 'auto', mt: '0.25rem', mr: '0.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
                  <Box sx={{ color: 'black'}}><StarIcon fontSize="inherit" /></Box>
                  <Typography variant="base" mb="2px">{starRatingFormat}</Typography>
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
                {city}, {state}
              </Typography>
            

              <Box mb="0.5rem">
                <HotelTags displayOne={true} pet_fee={petFee} pet_allowance={petAllowance} pet_fee_value={petFeeValue} pet_size={petSize} />
              </Box>  

           
              <Box mt="-0.5rem">
                <PriceDetails />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {highlighted && <Box sx={{ borderTop: "1px solid #ddd" }} />}
    </>
  );
};

export default ListingCardSquare;
